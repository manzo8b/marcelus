"""Regression tests for the zero-dependency generator and static checker."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("webfoundry", ROOT / "scripts" / "webfoundry.py")
webfoundry = importlib.util.module_from_spec(spec)
spec.loader.exec_module(webfoundry)


class WebFoundryTests(unittest.TestCase):
    def setUp(self):
        self.work = tempfile.TemporaryDirectory()
        self.addCleanup(self.work.cleanup)
        self.root = Path(self.work.name)
        self.brief = json.loads((ROOT / "examples" / "brief.json").read_text(encoding="utf-8"))

    def generate(self):
        source = self.root / "brief.json"
        source.write_text(json.dumps(self.brief), encoding="utf-8")
        target = self.root / "site"
        webfoundry.build_site(source, target)
        return target

    def test_example_generates_and_audits(self):
        site = self.generate()
        report = webfoundry.audit_site(site)
        self.assertEqual(report["counts"]["errors"], 0, report)
        self.assertEqual(report["counts"]["warnings"], 0, report)
        self.assertEqual(report["result"], "pass-static-only")
        self.assertTrue((site / "index.html").exists())
        self.assertFalse((site / "sitemap.xml").exists())

    def test_escapes_html_in_brief(self):
        self.brief["headline"] = '<img src=x onerror="alert(1)">'
        site = self.generate()
        markup = (site / "index.html").read_text(encoding="utf-8")
        self.assertIn("&lt;img", markup)
        self.assertNotIn('<img src=x onerror=', markup)

    def test_blocks_script_url(self):
        self.brief["primary_cta"]["href"] = "javascript:alert(1)"
        with self.assertRaises(ValueError):
            self.generate()

    def test_bad_type_for_theme_and_sector_is_rejected(self):
        for field in ("theme", "sector", "direction"):
            with self.subTest(field=field):
                self.brief[field] = ["not-a-string"]
                with self.assertRaises(ValueError):
                    self.generate()
                self.brief.pop(field, None)

    def test_refuses_overwrite(self):
        self.generate()
        with self.assertRaises(ValueError):
            self.generate()

    def test_detects_missing_alt_and_bad_anchor(self):
        site = self.generate()
        source = site / "index.html"
        text = source.read_text(encoding="utf-8")
        text = text.replace("</main>", '<a href="#no-such-id">Missing</a><img src="missing.png"></main>')
        source.write_text(text, encoding="utf-8")
        report = webfoundry.audit_site(site)
        self.assertGreaterEqual(report["counts"]["errors"], 2)

    def test_detects_duplicate_h1(self):
        site = self.generate()
        source = site / "index.html"
        text = source.read_text(encoding="utf-8").replace("</main>", "<h1>Unexpected heading</h1></main>")
        source.write_text(text, encoding="utf-8")
        report = webfoundry.audit_site(site)
        self.assertIn("one-h1", [x["check"] for x in report["checks"] if x["status"] == "error"])

    def test_canonical_creates_sitemap(self):
        self.brief["canonical_url"] = "https://example.org/demo/"
        site = self.generate()
        self.assertTrue((site / "sitemap.xml").exists())
        self.assertIn('rel="canonical"', (site / "index.html").read_text())


if __name__ == "__main__":
    unittest.main()
