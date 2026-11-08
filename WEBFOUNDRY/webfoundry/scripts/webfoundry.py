#!/usr/bin/env python3
"""MARCELUS WebFoundry: dependency-free website starter and static quality gate.

Generate from a verified JSON brief; never overwrite a non-empty directory.
Audit is structural only and DOES NOT certify WCAG, security or performance.
Requires Python 3.9+; no network or third-party packages.
"""
from __future__ import annotations

import argparse
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
import sys
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
THEMES = {"ocean": "#07564d", "orchid": "#502c91", "graphite": "#182e40", "cinematic": "#090710"}
SECTORS = {"generic", "education", "hospitality", "compliance", "tourism", "creators"}
DIRECTIONS = {"cinematic", "editorial", "refined"}
LANGUAGE = re.compile(r"^[a-z]{2}(?:-[A-Z]{2})?$")
EMAIL = re.compile(r"^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$")
PLACEHOLDER = re.compile(r"\{\{[A-Z_]+\}\}")


def text_field(value, field, maximum=1200):
    if not isinstance(value, str) or not 1 <= len(value.strip()) <= maximum:
        raise ValueError(f"'{field}' must be non-empty text, at most {maximum} characters")
    return value.strip()


def safe_url(value, field, allow_anchor=True):
    url = text_field(value, field, 1000)
    if allow_anchor and re.fullmatch(r"#[a-zA-Z][\w-]*", url):
        return url
    if url.startswith("mailto:") and EMAIL.fullmatch(url[7:]):
        return url
    parts = urlsplit(url)
    if parts.scheme == "https" and parts.netloc and not parts.username and not parts.password and " " not in url and "\\" not in url:
        return url
    raise ValueError(f"'{field}' must be an HTTPS URL, a verified mailto: address, or an internal anchor")


def validate_brief(data):
    if not isinstance(data, dict):
        raise ValueError("Brief must be a JSON object")
    allowed = {"project_name", "language", "eyebrow", "headline", "description", "features", "theme", "primary_cta", "secondary_cta", "contact_email", "canonical_url", "sector", "direction"}
    unknown = set(data) - allowed
    if unknown:
        raise ValueError("Unknown brief fields: " + ", ".join(sorted(unknown)))
    for field, cap in (("project_name", 70), ("eyebrow", 110), ("headline", 130), ("description", 1200)):
        text_field(data.get(field), field, cap)
    if not isinstance(data.get("language"), str) or not LANGUAGE.fullmatch(data["language"]):
        raise ValueError("'language' must be a two-letter code such as it, en or es")
    if not isinstance(data.get("theme", "ocean"), str) or data.get("theme", "ocean") not in THEMES:
        raise ValueError("'theme' must be ocean, orchid, graphite or cinematic")
    if not isinstance(data.get("sector", "generic"), str) or data.get("sector", "generic") not in SECTORS:
        raise ValueError("'sector' is not supported")
    if not isinstance(data.get("direction", "cinematic"), str) or data.get("direction", "cinematic") not in DIRECTIONS:
        raise ValueError("'direction' is not supported")
    features = data.get("features")
    if not isinstance(features, list) or not 2 <= len(features) <= 4:
        raise ValueError("'features' must contain 2–4 items")
    for i, item in enumerate(features):
        if not isinstance(item, dict) or set(item) != {"title", "description"}:
            raise ValueError(f"'features[{i}]' needs exactly title and description")
        text_field(item["title"], f"features[{i}].title", 90)
        text_field(item["description"], f"features[{i}].description", 400)
    for key in ("primary_cta", "secondary_cta"):
        if key in data:
            val = data[key]
            if not isinstance(val, dict) or set(val) != {"label", "href"}:
                raise ValueError(f"'{key}' needs exactly label and href")
            text_field(val["label"], f"{key}.label", 65)
            safe_url(val["href"], f"{key}.href")
    if "contact_email" in data and not EMAIL.fullmatch(text_field(data["contact_email"], "contact_email", 254)):
        raise ValueError("'contact_email' must be a confirmed email address")
    if "canonical_url" in data:
        url = safe_url(data["canonical_url"], "canonical_url", allow_anchor=False)
        if not url.startswith("https://"):
            raise ValueError("'canonical_url' requires an exact HTTPS public URL")
    return data


def load_brief(path):
    return validate_brief(json.loads(Path(path).read_text(encoding="utf-8")))


def h(value):
    return html.escape(str(value), quote=True)


def build_site(brief_path, output_dir):
    return build_site_from_data(load_brief(brief_path), output_dir)


def build_site_from_data(brief, output_dir):
    validate_brief(brief)
    out = Path(output_dir).expanduser().resolve()
    if out.exists() and any(out.iterdir()):
        raise ValueError(f"Refusing to overwrite nonempty folder: {out}")
    out.mkdir(parents=True, exist_ok=True)
    theme = brief.get("theme", "ocean")
    features = "\n".join(
        f'<article class="feature-card"><span class="feature-count">{i:02d}</span>'
        f'<h3>{h(v["title"])}</h3><p>{h(v["description"])}</p></article>'
        for i, v in enumerate(brief["features"], 1)
    )
    ctas = []
    for key, css_class in (("primary_cta", "button-primary"), ("secondary_cta", "button-secondary")):
        if key not in brief:
            continue
        action = brief[key]
        href = safe_url(action["href"], key + ".href")
        if href.startswith("#") and href not in {"#top", "#main", "#features", "#approach", "#contact"}:
            raise ValueError(f"CTA points to unknown section: {href}")
        if href == "#contact" and not brief.get("contact_email"):
            raise ValueError("#contact requires contact_email")
        rel = ' rel="noopener noreferrer"' if href.startswith("https://") else ""
        ctas.append(f'<a class="button {css_class}" href="{h(href)}"{rel}>{h(action["label"])} <span aria-hidden="true">↗</span></a>')
    contact_section, nav_contact = "", ""
    if brief.get("contact_email"):
        email = brief["contact_email"]
        contact_section = ('<section class="section contact-section" id="contact" aria-labelledby="contact-title">'
                           '<div class="container"><p class="kicker">CONTATTI</p><h2 id="contact-title">Parliamone.</h2>'
                           '<p>Scrivi per approfondire il progetto o inviare un riscontro concreto.</p>'
                           f'<a class="button" href="mailto:{h(email)}">{h(email)}</a></div></section>')
        nav_contact = '<a href="#contact">Contatti</a>'
    canonical = ""
    if brief.get("canonical_url"):
        canonical = f'<link rel="canonical" href="{h(brief["canonical_url"])}">'
    substitutions = {
        "LANG": brief["language"], "META_DESCRIPTION": h(brief["description"][:160]),
        "TITLE": h(brief["project_name"] + " · " + brief["headline"]),
        "THEME_COLOR": THEMES[theme], "CANONICAL": canonical,
        "THEME": theme, "PROJECT_NAME": h(brief["project_name"]),
        "SECTOR": h(brief.get("sector", "generic")), "DIRECTION": h(brief.get("direction", "cinematic")),
        "EYEBROW": h(brief["eyebrow"]), "HEADLINE": h(brief["headline"]),
        "DESCRIPTION": h(brief["description"]), "CTA_BUTTONS": "\n".join(ctas),
        "FEATURE_CARDS": features, "CONTACT_SECTION": contact_section, "NAV_CONTACT": nav_contact,
    }
    content = (ASSETS / ("cinematic.html.tmpl" if theme == "cinematic" else "index.html.tmpl")).read_text(encoding="utf-8")
    for key, val in substitutions.items():
        content = content.replace("{{" + key + "}}", val)
    if PLACEHOLDER.search(content):
        raise ValueError("Template has unresolved placeholders")
    (out / "index.html").write_text(content, encoding="utf-8")
    assets = ("cinematic.css", "cinematic.js") if theme == "cinematic" else ("style.css", "app.js")
    for name, source in zip(("style.css", "app.js"), assets):
        shutil.copyfile(ASSETS / source, out / name)
    (out / ".nojekyll").write_text("", encoding="utf-8")
    if brief.get("canonical_url"):
        url = h(brief["canonical_url"])
        (out / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'
            + url + '</loc></url></urlset>\n', encoding="utf-8")
    print(f"Site generated: {out}")
    print("Open index.html locally, or use: python3 -m http.server 8000 --directory " + str(out))
    print("Before publication: review content, privacy, links and real-device behavior.")


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = ""
        self.title = ""
        self.in_title = False
        self.headings = []
        self.ids = []
        self.links = []
        self.local_assets = []
        self.images_missing_alt = 0
        self.main_count = 0
        self.viewport = False
        self.description = False
        self.target_blank_rel = []
        self.inline_scripts = 0

    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if tag == "html":
            self.lang = attr.get("lang", "")
        if tag == "title":
            self.in_title = True
        if tag == "meta":
            if attr.get("name", "").lower() == "viewport" and attr.get("content", ""):
                self.viewport = True
            if attr.get("name", "").lower() == "description" and attr.get("content", "").strip():
                self.description = True
        if tag == "main":
            self.main_count += 1
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.headings.append(tag)
        if "id" in attr:
            self.ids.append(attr["id"])
        if tag == "a":
            href = attr.get("href")
            self.links.append(href)
            if attr.get("target") == "_blank" and "noopener" not in attr.get("rel", "").split():
                self.target_blank_rel.append(href)
        if tag == "img" and "alt" not in attr:
            self.images_missing_alt += 1
        if tag == "script" and "src" in attr:
            self.local_assets.append(attr["src"])
        if tag == "link" and "stylesheet" in attr.get("rel", "").split() and "href" in attr:
            self.local_assets.append(attr["href"])
        if any(k.startswith("on") and len(k) > 2 for k in attr):
            self.inline_scripts += 1

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def audit_site(site):
    folder = Path(site).expanduser().resolve()
    main = folder / "index.html"
    if not main.is_file():
        raise ValueError("Missing index.html in site folder")
    parser = PageParser()
    parser.feed(main.read_text(encoding="utf-8"))
    checks = []

    def check(label, passed, details, severity="error"):
        checks.append({"check": label, "status": "pass" if passed else severity, "details": details})

    check("document-title", bool(parser.title.strip()), "Non-empty page title")
    check("html-language", bool(LANGUAGE.fullmatch(parser.lang)), "HTML language attribute")
    check("one-h1", parser.headings.count("h1") == 1, "Exactly one H1")
    check("main-landmark", parser.main_count == 1, "Exactly one main landmark")
    check("viewport", parser.viewport, "Responsive viewport tag")
    check("meta-description", parser.description, "Non-empty meta description")
    check("img-alt-attributes", parser.images_missing_alt == 0, "All images have alt attributes")
    check("duplicate-ids", len(parser.ids) == len(set(parser.ids)), "IDs are unique")
    check("external-blank-rel", not parser.target_blank_rel, "target=_blank links use noopener")
    check("inline-event-handlers", parser.inline_scripts == 0, "No inline on* event handlers", "warning")

    missing_anchors = sorted({href for href in parser.links if isinstance(href, str) and href.startswith("#") and href[1:] not in parser.ids})
    check("internal-anchors", not missing_anchors, "Unresolved anchors: " + repr(missing_anchors) if missing_anchors else "All internal anchors resolve")
    unsafe_links = []
    missing_local = []
    for href in parser.links + parser.local_assets:
        if href is None or not str(href).strip():
            unsafe_links.append("<empty>")
            continue
        href = str(href).strip()
        if href.startswith(("#", "mailto:", "tel:")):
            continue
        parsed = urlsplit(href)
        if parsed.scheme or parsed.netloc:
            if parsed.scheme != "https" or not parsed.netloc:
                unsafe_links.append(href)
            continue
        rel = parsed.path
        if not rel.startswith("/"):
            target = (folder / rel).resolve()
            if not target.is_relative_to(folder) or not target.is_file():
                missing_local.append(rel)
        # Root-relative references require checking hosting base path manually.
    check("safe-link-schemes", not unsafe_links, "No insecure or missing link URLs: " + repr(unsafe_links) if unsafe_links else "No insecure link URL schemes")
    check("local-assets", not missing_local, "Missing: " + repr(missing_local) if missing_local else "Local linked assets present")
    css = folder / "style.css"
    if css.exists():
        sheet = css.read_text(encoding="utf-8")
        check("focus-styles-heuristic", ":focus-visible" in sheet, "Heuristic only: focus selector present", "warning")
        check("responsive-css-heuristic", "@media" in sheet, "Heuristic only: responsive media rule present", "warning")
        check("reduced-motion-heuristic", "prefers-reduced-motion" in sheet, "Heuristic only: reduced-motion rule present", "warning")
    else:
        check("style-css", False, "style.css missing; audit expects the generated starter or an adapted equivalent", "warning")
    errors = sum(x["status"] == "error" for x in checks)
    warnings = sum(x["status"] == "warning" for x in checks)
    return {
        "tool": "MARCELUS WebFoundry static checker", "version": "0.2.0",
        "result": "fail" if errors else "pass-with-warnings" if warnings else "pass-static-only",
        "counts": {"passes": sum(x["status"] == "pass" for x in checks), "warnings": warnings, "errors": errors},
        "checks": checks,
        "not_tested": ["Rendered WCAG contrast and interactions", "Screen reader and keyboard-only behavior", "Real-device breakpoints and horizontal overflow", "Core Web Vitals and Lighthouse", "Network errors and server headers", "Security vulnerabilities and privacy law", "Originality and truth of published claims"],
    }


def print_report(report):
    print("MARCELUS WebFoundry — static quality gate")
    print("Result:", report["result"], "|", report["counts"])
    for entry in report["checks"]:
        print(f"  [{entry['status'].upper():7}] {entry['check']}: {entry['details']}")
    print("Not tested automatically:")
    for item in report["not_tested"]:
        print("  -", item)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    build = commands.add_parser("new", help="Generate a static website from JSON")
    build.add_argument("--brief", required=True)
    build.add_argument("--out", required=True)
    audit = commands.add_parser("audit", help="Run offline static checks")
    audit.add_argument("--site", required=True)
    audit.add_argument("--format", choices=["text", "json"], default="text")
    audit.add_argument("--report", help="Optional JSON report file path")
    args = parser.parse_args(argv)
    try:
        if args.command == "new":
            build_site(args.brief, args.out)
            return 0
        report = audit_site(args.site)
        if args.report:
            Path(args.report).write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        if args.format == "json":
            print(json.dumps(report, indent=2, ensure_ascii=False))
        else:
            print_report(report)
        return 1 if report["counts"]["errors"] else 0
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
