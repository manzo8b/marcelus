"""Compatibility, negative and integration tests: MANZO Studio ↔ WebFoundry."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
import sys

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
spec=importlib.util.spec_from_file_location('studio_bridge',ROOT/'scripts'/'studio_bridge.py')
bridge=importlib.util.module_from_spec(spec)
spec.loader.exec_module(bridge)


def demo_blueprint(sector='education'):
    content={
        'education':('Nova Academy','Make knowledge extraordinary.','La conoscenza diventa esperienza.','Scopri i percorsi',['Home','Percorsi','Metodo','Risorse','Contatti']),
        'hospitality':('Atelier Hospitality','Every stay, unforgettable.','L’ospitalità inizia con una storia.','Scopri i servizi',['Home','Esperienze','Servizi','Galleria','Contatti']),
        'compliance':('Atlas Advisory','Confidence starts with evidence.','Metodo, rigore e responsabilità.','Esplora il metodo',['Home','Servizi','Metodo','Trasparenza','Contatti']),
        'tourism':('Beyond Coast','Find your next perspective.','Luoghi reali. Esperienze memorabili.','Esplora la destinazione',['Home','Luoghi','Itinerari','Storie','Contatti']),
        'creators':('Sonic Motion','Create something they feel.','Identità, suono, immaginazione.','Scopri il catalogo',['Home','Progetti','Catalogo','Media kit','Contatti'])
    }
    name,headline,subline,cta,pages=content[sector]
    return {'schema_version':'0.2','product':'MANZO AI Studio','generator':'deterministic_browser_blueprint',
            'project':{'name':name,'sector':sector,'style':'cinematic','goal':'present'},
            'website':{'headline':headline,'subheadline':subline,'pages':pages,'recommended_cta':cta},
            'quality':{'human_review_required':True,'checks_to_perform':['Verifica dei contenuti','Prova smartphone'],
                       'ai_model_used':False,'website_generated':False,'production_ready':False}}


class BridgeTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name)
        self.bp=demo_blueprint()

    def write(self):
        file=self.root/'blueprint.json'
        file.write_text(json.dumps(self.bp,ensure_ascii=False),encoding='utf-8')
        return file

    def test_end_to_end_all_five_sectors(self):
        for sector in bridge.SECTORS:
            with self.subTest(sector=sector):
                self.bp=demo_blueprint(sector)
                source=self.write()
                site=self.root/sector
                report=bridge.convert(source,site)
                self.assertEqual(report['counts']['errors'],0,report)
                self.assertIn(self.bp['website']['headline'],(site/'index.html').read_text())
                self.assertTrue((site/'style.css').exists())

    def test_all_visual_directions_keep_cinematic_baseline(self):
        for direction in ('cinematic', 'editorial', 'refined'):
            with self.subTest(direction=direction):
                self.bp['project']['style'] = direction
                site = self.root / direction
                bridge.convert(self.write(), site)
                self.assertIn('data-theme="cinematic"', (site / 'index.html').read_text())
                self.assertIn(f'data-direction="{direction}"', (site / 'index.html').read_text())

    def test_production_ready_claim_rejected(self):
        self.bp['quality']['production_ready']=True
        with self.assertRaisesRegex(ValueError,'require review'):
            bridge.read_blueprint(self.write())

    def test_injection_markup_is_escaped(self):
        self.bp['project']['name']='<svg onload=alert(1)>'
        site=self.root/'site'
        bridge.convert(self.write(),site)
        html=(site/'index.html').read_text()
        self.assertIn('&lt;svg',html)
        self.assertNotIn('<svg onload',html)

    def test_unknown_sector_rejected(self):
        self.bp['project']['sector']='weapons'
        with self.assertRaisesRegex(ValueError,'Invalid sector'):
            bridge.read_blueprint(self.write())

    def test_page_mismatch_rejected(self):
        self.bp['website']['pages'].append('Checkout')
        with self.assertRaisesRegex(ValueError,'Pages'):
            bridge.read_blueprint(self.write())

    def test_schema_version_rejected(self):
        self.bp['schema_version']='v9'
        with self.assertRaisesRegex(ValueError,'compatible'):
            bridge.read_blueprint(self.write())

    def test_output_overwrite_rejected(self):
        source=self.write(); target=self.root/'target'
        bridge.convert(source,target)
        with self.assertRaisesRegex(ValueError,'overwrite'):
            bridge.convert(source,target)

    def test_site_contains_single_real_page(self):
        target=self.root/'target'
        bridge.convert(self.write(),target)
        self.assertFalse((target/'percorsi').exists())
        self.assertIn('Demo', (target/'index.html').read_text())

    def test_no_canonical_until_real_url(self):
        target=self.root/'target'
        bridge.convert(self.write(),target)
        self.assertFalse((target/'sitemap.xml').exists())

    def test_client_output_not_mutated(self):
        source=self.write();before=source.read_bytes()
        bridge.convert(source,self.root/'target')
        self.assertEqual(source.read_bytes(),before)


if __name__=='__main__':
    unittest.main()
