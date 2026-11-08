"""Checks that the canonical generator cannot be overridden by auxiliary skills."""
from pathlib import Path
import sys
import json
import tempfile
import unittest

HERE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(HERE / "scripts"))
import multipage
import skill_router


class AuxiliaryRoutingTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.source = HERE / "examples" / "studio" / "education.json"

    def tearDown(self):
        self.tmp.cleanup()

    def test_authority_always_webfoundry(self):
        plan = skill_router.make_plan(self.source)
        self.assertEqual(plan["authority"], "marcelus-webfoundry")
        self.assertEqual(plan["immutable"]["canonical_generator"], "marcelus-webfoundry")
        self.assertFalse(plan["immutable"]["no_unapproved_deployment"] is False)
        self.assertEqual(plan["status"], "advisory-routing-only")

    def test_three_modules_in_stable_order(self):
        p = skill_router.make_plan(self.source, ["apple-design", "impeccable", "design-taste-frontend"])
        self.assertEqual([x["id"] for x in p["selected_modules"]],
                         ["design-taste-frontend", "impeccable", "apple-design"])
        self.assertTrue(all(x["execution"] == "guidance-only" for x in p["selected_modules"]))

    def test_selected_subset_is_allowed(self):
        p = skill_router.make_plan(self.source, ["apple-design"])
        self.assertEqual([x["id"] for x in p["selected_modules"]], ["apple-design"])
        self.assertEqual(skill_router.validate_plan(p, self.source), p)

    def test_duplicate_and_unknown_module_rejected(self):
        for items in [[], ["apple-design", "apple-design"], ["potentially-unsafe-plugin"]]:
            with self.subTest(items=items), self.assertRaises(ValueError):
                skill_router.make_plan(self.source, items)

    def test_tampered_plan_rejected(self):
        p = skill_router.make_plan(self.source)
        p["authority"] = "impeccable"
        with self.assertRaises(ValueError):
            skill_router.validate_plan(p, self.source)

    def test_changed_blueprint_rejected(self):
        p = skill_router.make_plan(self.source)
        data = json.loads(self.source.read_text())
        data["project"]["name"] = "Other Demo Brand"
        f = self.root / "modified.json"
        f.write_text(json.dumps(data))
        with self.assertRaises(ValueError):
            skill_router.validate_plan(p, f)

    def test_optional_plan_embedded_without_executing_external_skills(self):
        p = skill_router.make_plan(self.source)
        f = self.root / "skill-plan.json"
        f.write_text(json.dumps(p))
        out = self.root / "site"
        report = multipage.build(self.source, out, skill_plan_path=f)
        self.assertEqual(report["counts"]["errors"], 0)
        self.assertEqual(report["counts"]["passes"], 86)
        manifest = json.loads((out / "site-manifest.json").read_text())
        prov = manifest["auxiliary_skill_plan"]
        self.assertFalse(prov["external_modules_executed"])
        self.assertTrue(prov["human_review_required"])
        self.assertEqual(len(prov["selected_modules"]), 3)

    def test_invalid_plan_blocks_output(self):
        p = skill_router.make_plan(self.source)
        p["selected_modules"][0]["execution"] = "run-shell"
        f = self.root / "bad.json"
        f.write_text(json.dumps(p))
        with self.assertRaises(ValueError):
            multipage.build(self.source, self.root / "site", skill_plan_path=f)
        self.assertFalse((self.root / "site").exists())

    def test_cli_roundtrip(self):
        f = self.root / "skill-plan.json"
        self.assertEqual(skill_router.main(["plan", "--blueprint", str(self.source), "--out", str(f)]), 0)
        self.assertEqual(skill_router.main(["validate", "--blueprint", str(self.source), "--plan", str(f)]), 0)
        self.assertEqual(skill_router.main(["plan", "--blueprint", str(self.source), "--out", str(f)]), 2)


if __name__ == "__main__":
    unittest.main()
