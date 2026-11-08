#!/usr/bin/env python3
"""MANZO AI Studio 0.2 -> MARCELUS WebFoundry static website adapter.

Reads a browser-exported deterministic blueprint, validates it strictly, and
builds a demo website with its quality report. No network, model, tracking or
account. Output must be reviewed by a person before publication.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

import webfoundry

SECTORS = {
    "education": {"label": "EDUCATION", "pages": ["Home", "Percorsi", "Metodo", "Risorse", "Contatti"]},
    "hospitality": {"label": "HOSPITALITY", "pages": ["Home", "Esperienze", "Servizi", "Galleria", "Contatti"]},
    "compliance": {"label": "COMPLIANCE", "pages": ["Home", "Servizi", "Metodo", "Trasparenza", "Contatti"]},
    "tourism": {"label": "TOURISM", "pages": ["Home", "Luoghi", "Itinerari", "Storie", "Contatti"]},
    "creators": {"label": "CREATORS / MUSIC", "pages": ["Home", "Progetti", "Catalogo", "Media kit", "Contatti"]},
}
STYLES = {"cinematic", "editorial", "refined"}
GOALS = {"present", "leads", "learn", "explore"}
GOAL_MESSAGES = {
    "present": "Presentazione del progetto e delle sue proposte.",
    "leads": "Informazioni essenziali per valutare una futura richiesta di contatto.",
    "learn": "Una struttura dedicata a percorsi di formazione e materiali didattici.",
    "explore": "Contenuti organizzati per guidare la scoperta.",
}


def _is_exact_obj(value: object, keys: set[str], optional: set[str] = frozenset()) -> bool:
    return isinstance(value, dict) and keys <= set(value) <= (keys | optional)


def read_blueprint(path: Path) -> dict:
    source = Path(path)
    if source.stat().st_size > 64_000:
        raise ValueError("Blueprint exceeds the 64 KB limit")
    data = json.loads(source.read_text(encoding="utf-8"))
    if not _is_exact_obj(data, {"schema_version", "product", "generator", "project", "website", "quality"}):
        raise ValueError("Invalid or unknown top-level Studio blueprint fields")
    if data["schema_version"] != "0.2" or data["product"] != "MANZO AI Studio" or data["generator"] != "deterministic_browser_blueprint":
        raise ValueError("Not a compatible MANZO AI Studio v0.2 blueprint")
    project = data["project"]
    website = data["website"]
    quality = data["quality"]
    if not _is_exact_obj(project, {"name", "sector", "style", "goal"}):
        raise ValueError("Invalid project fields")
    if not _is_exact_obj(website, {"headline", "subheadline", "pages", "recommended_cta"}):
        raise ValueError("Invalid website fields")
    if not _is_exact_obj(quality, {"human_review_required", "checks_to_perform", "ai_model_used", "website_generated", "production_ready"}):
        raise ValueError("Invalid quality fields")
    sector = project["sector"]
    if not all(isinstance(project[k], str) for k in ("name", "sector", "style", "goal")):
        raise ValueError("Project values must be strings")
    if sector not in SECTORS or project["style"] not in STYLES or project["goal"] not in GOALS:
        raise ValueError("Invalid sector, style or goal")
    for key, cap in (("name", 70),):
        webfoundry.text_field(project[key], "project." + key, cap)
    for key, cap in (("headline", 130), ("subheadline", 600), ("recommended_cta", 65)):
        webfoundry.text_field(website[key], "website." + key, cap)
    pages = website["pages"]
    if pages != SECTORS[sector]["pages"]:
        raise ValueError("Pages do not match approved sector blueprint for this demo")
    if not isinstance(quality["checks_to_perform"], list) or not 1 <= len(quality["checks_to_perform"]) <= 6:
        raise ValueError("Missing or oversized quality checklist")
    for item in quality["checks_to_perform"]:
        webfoundry.text_field(item, "quality.checks_to_perform[]", 140)
    if quality["human_review_required"] is not True or any(quality[k] is not False for k in ("ai_model_used", "website_generated", "production_ready")):
        raise ValueError("Blueprint must explicitly require review and identify itself as a non-AI, non-production demo")
    return data


def normalize(data: dict) -> dict:
    project = data["project"]
    website = data["website"]
    sector = project["sector"]
    pages = website["pages"]
    # These are conceptual pages: do NOT represent them as real deployed routes.
    features = [
        {"title": p, "description": f"Sezione prevista nel blueprint {SECTORS[sector]['label'].lower()}; testo, informazioni e materiali da verificare."}
        for p in pages[1:4]
    ]
    # Studio maintains the approved high-end visual baseline across all three styles;
    # direction adjusts the cinematic tokens, never downgrades to the basic starter.
    theme = "cinematic"
    return {
        "project_name": project["name"],
        "language": "it",
        "eyebrow": f"{SECTORS[sector]['label']} · PROTOTIPO DIMOSTRATIVO",
        "headline": website["headline"],
        "description": website["subheadline"] + " " + GOAL_MESSAGES[project["goal"]] + " Demo concettuale: verificare tutte le affermazioni prima di pubblicare.",
        "features": features,
        "theme": theme,
        "sector": sector,
        "direction": project["style"],
        "primary_cta": {"label": website["recommended_cta"], "href": "#features"},
        "secondary_cta": {"label": "Il metodo", "href": "#approach"},
    }


def convert(input_path: Path, out_dir: Path, brief_path: Path | None = None, report_path: Path | None = None) -> dict:
    blueprint = read_blueprint(input_path)
    brief = normalize(blueprint)
    webfoundry.validate_brief(brief)
    output = Path(out_dir).resolve()
    if output.exists() and any(output.iterdir()):
        raise ValueError(f"Refusing to overwrite nonempty folder: {output}")
    if brief_path:
        brief_path = Path(brief_path).resolve()
        if brief_path.exists():
            raise ValueError(f"Refusing to overwrite existing brief: {brief_path}")
    if report_path:
        report_path = Path(report_path).resolve()
        if report_path.exists():
            raise ValueError(f"Refusing to overwrite existing report: {report_path}")
    if brief_path:
        brief_path.parent.mkdir(parents=True, exist_ok=True)
        brief_path.write_text(json.dumps(brief, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    # Generator output does not change original source blueprint.
    webfoundry.build_site_from_data(brief, output)
    report = webfoundry.audit_site(output)
    if report_path:
        report_path.parent.mkdir(parents=True, exist_ok=True)
        report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    if report["counts"]["errors"]:
        raise ValueError("Generated site failed static audit; see quality report")
    return report


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--blueprint", required=True, type=Path, help="JSON downloaded from MANZO AI Studio")
    ap.add_argument("--site", required=True, type=Path, help="New output directory")
    ap.add_argument("--brief-out", type=Path, help="Optional normalized brief JSON")
    ap.add_argument("--report", type=Path, help="Optional quality report JSON")
    args = ap.parse_args(argv)
    try:
        report = convert(args.blueprint, args.site, args.brief_out, args.report)
        print(f"STUDIO → WEBFOUNDRY: GENERATED / {report['counts']['passes']} static checks passed; {report['counts']['warnings']} warnings; {report['counts']['errors']} errors")
        print(f"Open {args.site / 'index.html'}; this is a local one-page demo, NOT a deployed multi-page or AI-generated site.")
        return 0
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print("ERROR:", error, file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
