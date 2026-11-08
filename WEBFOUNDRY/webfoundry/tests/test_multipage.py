"""Regression coverage for deterministic five-route generator."""
import copy
import json
from pathlib import Path
import sys
import tempfile
import unittest

HERE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(HERE / "scripts"))
import multipage


class MultiPageTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.source = HERE / "examples" / "studio" / "education.json"

    def tearDown(self):
        self.tmp.cleanup()

    def site(self, source=None):
        out = self.root / "site"
        report = multipage.build(source or self.source, out)
        return out, report

    def test_five_actual_routes(self):
        site, report = self.site()
        self.assertEqual(report["routes"], 5)
        for slug in multipage.SLUGS["education"]:
            self.assertTrue(multipage.page_path(site, slug).is_file())

    def test_all_links_and_routes_audit(self):
        _, report = self.site()
        self.assertEqual(report["counts"]["errors"], 0)
        self.assertEqual(report["counts"]["passes"], 85)

    def test_distinct_titles_and_real_page_content(self):
        site, _ = self.site()
        titles = []
        for page in [site / "index.html", *(site / slug / "index.html" for slug in multipage.SLUGS["education"][1:])]:
            text = page.read_text()
            self.assertIn('aria-current="page"', text)
            self.assertIn('noindex,nofollow', text)
            self.assertIn('href="../"', text) if page != site / 'index.html' else None
            titles.append(text.split('<title>')[1].split('</title>')[0])
        self.assertEqual(len(set(titles)), 5)

    def test_not_overwrite(self):
        self.site()
        with self.assertRaisesRegex(ValueError, "overwrite"):
            multipage.build(self.source, self.root / "site")

    def test_tampered_html_detected(self):
        site, _ = self.site()
        f = site / "percorsi" / "index.html"
        original = f.read_text()
        f.write_text(original.replace('href="../metodo/"', 'href="../missing/"'), encoding='utf-8')
        result = multipage.audit(site)
        self.assertGreater(result['counts']['errors'], 0)

    def test_tampered_assets_detected(self):
        site, _ = self.site()
        (site / 'assets' / 'app.js').unlink()
        self.assertGreater(multipage.audit(site)['counts']['errors'],0)

    def test_injection_is_escaped(self):
        data = json.loads(self.source.read_text())
        data['project']['name'] = '<img src=x onerror=alert(1)>'
        data['website']['headline'] = '<script>alert(1)</script>'
        source = self.root / 'unsafe.json'
        source.write_text(json.dumps(data))
        site, _ = self.site(source)
        text = (site / 'index.html').read_text()
        self.assertIn('&lt;script&gt;',text)
        self.assertNotIn('<script>alert(1)</script>',text)
        self.assertNotIn('<img src=x',text)

    def test_bad_schema_rejected(self):
        data = json.loads(self.source.read_text())
        data['quality']['production_ready']=True
        source = self.root / 'bad.json'
        source.write_text(json.dumps(data))
        with self.assertRaises(ValueError):
            self.site(source)
        self.assertFalse((self.root/'site').exists())

    def test_no_network_or_secret_inputs(self):
        site, _ = self.site()
        source = (site / 'index.html').read_text()
        self.assertNotIn('src="https://',source)
        self.assertNotIn('action="https://',source)
        self.assertNotIn('api_key',source.lower())

    def test_manifest_truth_boundaries(self):
        site, _ = self.site()
        data = json.loads((site / 'site-manifest.json').read_text())
        self.assertFalse(data['production_ready'])
        self.assertFalse(data['ai_model_used'])
        self.assertTrue(data['human_review_required'])

    def test_all_five_sectors(self):
        for sector in multipage.SECTORS:
            out = self.root / sector
            input_file = HERE / 'examples' / 'studio' / (sector+'.json')
            report = multipage.build(input_file,out)
            self.assertEqual(report['routes'],5)
            self.assertEqual(report['counts']['errors'],0)
            self.assertEqual(len(list(out.rglob('index.html'))),5)

    def test_cli_exit_code_on_missing(self):
        self.assertEqual(multipage.main(['audit','--site',str(self.root/'unknown')]),2)


if __name__ == '__main__':
    unittest.main()
