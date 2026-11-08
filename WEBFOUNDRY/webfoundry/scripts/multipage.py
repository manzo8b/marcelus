#!/usr/bin/env python3
"""WebFoundry v0.3: build five real, accessible-minded static routes from a Studio blueprint.

No network calls, API keys, model claims, generated legal/business facts, or deployment.
Requires Python 3.9+. The source audit is structural, not a WCAG certification.
"""
from __future__ import annotations

import argparse
from html import escape
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import shutil
import sys
import tempfile
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

from studio_bridge import read_blueprint, SECTORS

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
SLUGS = {
    "education": ("", "percorsi", "metodo", "risorse", "contatti"),
    "hospitality": ("", "esperienze", "servizi", "galleria", "contatti"),
    "compliance": ("", "servizi", "metodo", "trasparenza", "contatti"),
    "tourism": ("", "luoghi", "itinerari", "storie", "contatti"),
    "creators": ("", "progetti", "catalogo", "media-kit", "contatti"),
}
SECTOR_COPY = {
    "education": ("KNOWLEDGE · EXPERIENCE", "Un percorso da immaginare, insieme.", "Una struttura per programmi, metodi e strumenti di apprendimento.", ["Obiettivi e destinatari", "Progettazione didattica", "Verifica dei risultati"], "Preparare contenuti formativi con fonti e obiettivi approvati."),
    "hospitality": ("HOSPITALITY · EXPERIENCE", "L'ospitalità prende una nuova forma.", "Un sistema di contenuti per raccontare servizi ed esperienze.", ["La prima impressione", "Servizi e accoglienza", "Percorso dell'ospite"], "Controllare servizi, prezzi e disponibilità prima della pubblicazione."),
    "compliance": ("EVIDENCE · TRUST", "La chiarezza è parte del progetto.", "Informazioni professionali organizzate con limiti e fonti esplicite.", ["Informazioni verificabili", "Processi trasparenti", "Responsabilità professionale"], "Ogni affermazione giuridica o normativa richiede verifica qualificata."),
    "tourism": ("DESTINATIONS · DISCOVERY", "Nuove storie da esplorare.", "Un'esperienza editoriale per luoghi, percorsi e cultura.", ["Luoghi e contesto", "Itinerari intelligibili", "Fonti aggiornate"], "Indirizzi, orari ed eventi devono avere fonti e date reali."),
    "creators": ("CREATIVE · FUTURE", "Un'identità che si vede e si ascolta.", "Uno spazio per progetti, cataloghi e contenuti creativi.", ["Identità visiva", "Catalogo delle opere", "Press kit e contatti"], "I file, le immagini e le opere devono essere autorizzati dal titolare."),
}
REQUIRED_HTML = {"title", "lang", "viewport", "description", "h1", "main", "nav", "skip-link", "links", "local-assets", "ids", "safe-schemes", "no-inline-handlers"}


def h(value: str) -> str:
    return escape(str(value), quote=True)


def page_path(root: Path, slug: str) -> Path:
    return root / slug / "index.html" if slug else root / "index.html"


def rel_to_root(slug: str) -> str:
    return "../" if slug else "./"


def sector_pages(data: dict) -> list[dict]:
    sector = data["project"]["sector"]
    return [dict(label=label, slug=slug) for label, slug in zip(SECTORS[sector]["pages"], SLUGS[sector])]


def nav_html(pages: list[dict], current: str, prefix: str) -> str:
    nodes = []
    for page in pages:
        href = prefix + (page["slug"] + "/" if page["slug"] else "")
        selected = ' aria-current="page"' if current == page["slug"] else ""
        nodes.append(f'<a href="{h(href)}"{selected}>{h(page["label"])}</a>')
    return "\n".join(nodes)


def icon_svg() -> str:
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" fill="none" aria-hidden="true">'
            '<path d="M28 4 50 17v22L28 52 6 39V17L28 4Z" stroke="currentColor" stroke-width="2.5"/>'
            '<path d="m28 12 14 8v16l-14 8-14-8V20l14-8Zm0 0v32m-14-24 14 8 14-8" stroke="currentColor" stroke-width="1.6"/></svg>')


def shell(data: dict, page: dict, content: str, index: int) -> str:
    sector = data["project"]["sector"]
    name = data["project"]["name"]
    is_home = not page["slug"]
    prefix = rel_to_root(page["slug"])
    title = name + (" · " + page["label"] if not is_home else " · " + data["website"]["headline"])
    meta = data["website"]["subheadline"] if is_home else f"{page['label']}: struttura dimostrativa per il settore {SECTORS[sector]['label']}. Contenuti da verificare prima della pubblicazione."
    if not is_home:
        meta = meta[:155]
    return f'''<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <meta name="theme-color" content="#090710">
  <meta name="description" content="{h(meta[:160])}">
  <title>{h(title)}</title>
  <link rel="stylesheet" href="{prefix}assets/style.css">
  <script src="{prefix}assets/app.js" defer></script>
</head>
<body data-sector="{h(sector)}" data-direction="{h(data['project']['style'])}">
  <a class="skip-link" href="#main">Vai al contenuto principale</a>
  <div class="site-shell"><div class="ambient ambient-one" aria-hidden="true"></div><div class="ambient ambient-two" aria-hidden="true"></div>
  <header class="site-header" id="top"><div class="container nav-wrap">
    <a class="brand" href="{prefix}" aria-label="{h(name)} — Home">{icon_svg()}<span>{h(name)}</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Apri il menu">☰</button>
    <nav id="primary-navigation" class="primary-navigation" aria-label="Navigazione principale">{nav_html(sector_pages(data), page['slug'], prefix)}</nav>
    <span class="top-marker">WEBFOUNDRY <i></i> PROTOTYPE</span>
  </div></header>
  <main id="main">{content}</main>
  <footer class="site-footer"><div class="container footer-inner">
    <div class="footer-brand">{icon_svg()} <strong>{h(name)}</strong><span>Project demonstration · No live service</span></div>
    <p>Generato da un blueprint strutturato. Le informazioni non sono state verificate per la pubblicazione.</p>
    <a href="{prefix}">Torna alla Home <span aria-hidden="true">↗</span></a>
  </div></footer>
  </div>
</body>
</html>'''


def render_core(name: str) -> str:
    return f'''<div class="visual-stage" aria-label="Scultura digitale astratta con orbite luminose" role="img">
      <div class="stage-aurora" aria-hidden="true"></div>
      <div class="orbit orbit-back" aria-hidden="true"></div>
      <div class="core-3d" aria-hidden="true"><span class="core-mark">{icon_svg()}</span><span class="core-caption">DIGITAL EXPERIENCE</span></div>
      <div class="orbit orbit-front" aria-hidden="true"></div>
      <div class="stage-ring" aria-hidden="true"></div>
      <div class="floating-note floating-note-top" aria-hidden="true"><b>01 / DESIGN</b><small>STRUCTURED BLUEPRINT</small></div>
      <div class="floating-note floating-note-bottom" aria-hidden="true"><b>02 / BUILD</b><small>HUMAN APPROVAL</small></div>
      <button class="motion-toggle" type="button" aria-pressed="false" aria-label="Metti in pausa le animazioni">Ⅱ <span>Pausa movimento</span></button>
    </div>'''


def render_home(data: dict, pages: list[dict]) -> str:
    project = data["project"]
    website = data["website"]
    label, title, lead, bullets, notice = SECTOR_COPY[project["sector"]]
    route = pages[1]["slug"]
    method_slug = next((p["slug"] for p in pages if p["label"].lower() == "metodo"), pages[2]["slug"])
    showcase = "".join(
        f'<a class="sector-tile" href="./{h(p["slug"])}/"><span class="tile-number">{i:02d}</span>'
        f'<span class="tile-glow" aria-hidden="true"></span><strong>{h(p["label"])}</strong>'
        f'<span>Esplora questa pagina <span aria-hidden="true">↗</span></span></a>'
        for i, p in enumerate(pages[1:], 1)
    )
    bullet_cards = "".join(f'<article class="capability-card"><span class="cap-number">0{i}</span><h3>{h(x)}</h3><p>Struttura dimostrativa da completare con contenuti e prove approvate.</p></article>' for i, x in enumerate(bullets,1))
    return f'''<section class="hero container" aria-labelledby="hero-heading">
      <div class="hero-copy"><p class="eyebrow"><span></span>{h(label)}</p><div class="overline">A NEW KIND OF WEB EXPERIENCE</div>
      <h1 id="hero-heading">{h(website['headline'])}</h1>
      <p class="hero-lead">{h(website['subheadline'])}</p>
      <div class="hero-actions"><a class="btn btn-primary" href="./{h(route)}/">{h(website['recommended_cta'])} <span aria-hidden="true">↗</span></a>
      <a class="btn btn-outline" href="./{h(method_slug)}/">Scopri il metodo <span aria-hidden="true">↗</span></a></div>
      <div class="proof-row"><span><i>✦</i> Settore: {h(SECTORS[project['sector']]['label'])}</span><span><i>◇</i> 5 pagine reali</span><span><i>◎</i> Revisione umana</span></div>
      </div>{render_core(project['name'])}
    </section>
    <section class="section chapter-section"><div class="container">
      <div class="section-head"><div><p class="eyebrow"><span></span>EXPLORE THE EXPERIENCE</p><h2>Un progetto.<br><em>Molte possibilità.</em></h2></div><p>{h(lead)}</p></div>
      <div class="route-grid">{showcase}</div>
    </div></section>
    <section class="section capabilities"><div class="container">
      <div class="section-head"><div><p class="eyebrow"><span></span>BUILT WITH PURPOSE</p><h2>Design che si vede.<br><em>Metodo che si verifica.</em></h2></div><p>Questa versione genera file locali separati: navigazione, contenuti dimostrativi e controlli per ciascuna pagina.</p></div>
      <div class="capability-grid">{bullet_cards}</div>
      <div class="integrity-banner"><b>NOTA DI TRASPARENZA</b><p>{h(notice)} Il sito è un prototipo e non contiene integrazioni AI, account, analytics o pagamenti.</p></div>
    </div></section>'''


def render_detail(data: dict, pages: list[dict], index: int) -> str:
    sector = data["project"]["sector"]
    _, title, lead, bullets, notice = SECTOR_COPY[sector]
    page = pages[index]
    steps = {
        1: ("Scoprire", "Organizzare ciò che conta", "La struttura orienta la consultazione e mette in primo piano le informazioni utili."),
        2: ("Progettare", "Dare forma al percorso", "Ogni sezione deve rispondere a un obiettivo concreto, non soltanto riempire uno spazio."),
        3: ("Documentare", "Verificare i contenuti", "Ogni testo deve essere approvato; fatti, servizi, diritti e dati non vengono inventati."),
        4: ("Connettere", "Un punto di contatto verificabile", "Questa demo non raccoglie messaggi e non presenta un modulo fittizio."),
    }
    step, head, desc = steps[index]
    items = [
        ("01", "Una base chiara", f"{page['label']} presenta una struttura editoriale da personalizzare con materiali verificati."),
        ("02", "Esperienza coerente", "Navigazione reale, componenti condivisi e adattamento allo schermo."),
        ("03", "Qualità e responsabilità", notice),
    ]
    cards = "".join(f'<article class="detail-card"><span class="cap-number">{n}</span><h2>{h(t)}</h2><p>{h(c)}</p></article>' for n,t,c in items)
    next_item = pages[(index % (len(pages)-1))+1] if index<4 else pages[0]
    next_url = "../" + (next_item["slug"] + "/" if next_item["slug"] else "")
    next_label = next_item["label"]
    return f'''<section class="detail-hero container" aria-labelledby="detail-heading">
      <div class="detail-intro"><p class="eyebrow"><span></span>{h(SECTORS[sector]['label'])} / {index+1:02d} OF 05</p>
      <p class="breadcrumb"><a href="../">Home</a><span aria-hidden="true">/</span>{h(page['label'])}</p>
      <h1 id="detail-heading">{h(page['label'])}<span class="heading-emphasis">.</span></h1>
      <p class="detail-lead">{h(head)}: {h(desc)}</p>
      <div class="hero-actions"><a class="btn btn-primary" href="{h(next_url)}">Continua: {h(next_label)} <span aria-hidden="true">↗</span></a><a class="btn btn-outline" href="../">Torna al progetto</a></div>
      </div><aside class="detail-visual" aria-label="Pannello dimostrativo di progettazione"><span class="panel-index">{index+1:02d} / 05</span><div class="detail-geometry" aria-hidden="true">{icon_svg()}</div><p>{h(step.upper())} / DESIGN SYSTEM</p><strong>{h(title)}</strong><span class="panel-foot">WEBFOUNDRY · PAGE SYSTEM</span></aside>
    </section>
    <section class="section detail-sections"><div class="container"><div class="section-head"><div><p class="eyebrow"><span></span>STRUCTURED EXPERIENCE</p><h2>Una pagina vera.<br><em>Contenuti da verificare.</em></h2></div><p>{h(lead)}</p></div><div class="detail-grid">{cards}</div></div></section>
    <section class="section cta-band"><div class="container"><p class="eyebrow"><span></span>HUMAN FIRST</p><h2>La tecnologia dà forma.<br>Le persone danno significato.</h2><p>Il risultato è navigabile, ma ogni affermazione sul progetto deve essere confermata prima della pubblicazione.</p><a class="btn btn-outline" href="../">Esplora tutte le pagine <span aria-hidden="true">↗</span></a></div></section>'''


def build(input_path: Path, output: Path, report_path: Path | None = None,
          skill_plan_path: Path | None = None) -> dict:
    data = read_blueprint(input_path)
    optional_plan = None
    if skill_plan_path is not None:
        from skill_router import validate_plan
        skill_plan_path = skill_plan_path.expanduser().resolve()
        if skill_plan_path.stat().st_size > 100_000:
            raise ValueError("Skill plan too large")
        raw_plan = json.loads(skill_plan_path.read_text(encoding="utf-8"))
        optional_plan = validate_plan(raw_plan, input_path)
    output = output.expanduser().resolve()
    if output.exists():
        raise ValueError(f"Refusing to overwrite existing path: {output}")
    pages = sector_pages(data)
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="webfoundry-v03-", dir=output.parent) as temp:
        draft = Path(temp) / "site"
        draft.mkdir()
        (draft / "assets").mkdir()
        for index, page in enumerate(pages):
            target = page_path(draft,page["slug"])
            target.parent.mkdir(parents=True,exist_ok=True)
            section = render_home(data,pages) if index==0 else render_detail(data,pages,index)
            target.write_text(shell(data,page,section,index),encoding="utf-8")
        shutil.copyfile(ASSETS / "multipage.css",draft / "assets" / "style.css")
        shutil.copyfile(ASSETS / "multipage.js",draft / "assets" / "app.js")
        manifest = {
            "version":"0.3.0", "generator":"MARCELUS WebFoundry deterministic multi-page builder",
            "input_blueprint_schema":data["schema_version"], "project_name":data["project"]["name"],
            "sector":data["project"]["sector"],"pages":[{"name":p["label"],"path":(p["slug"]+"/" if p["slug"] else "./")} for p in pages],
            "human_review_required":True,"ai_model_used":False,"production_ready":False,
            "publication_authorized":False,"routes_generated":len(pages),
        }
        if optional_plan is not None:
            manifest["auxiliary_skill_plan"] = {
                "authority": optional_plan["authority"],
                "status": optional_plan["status"],
                "blueprint_sha256": optional_plan["blueprint_sha256"],
                "registry_sha256": optional_plan["registry_sha256"],
                "selected_modules": optional_plan["selected_modules"],
                "external_modules_executed": False,
                "human_review_required": True,
            }
        (draft / "site-manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        (draft / ".nojekyll").write_text("",encoding="utf-8")
        report = audit(draft)
        if report["counts"]["errors"]:
            raise ValueError(f"Generated site failed structural QA: {report['counts']['errors']} errors")
        (draft / "audit-report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        draft.rename(output)
    if report_path is not None:
        report_path = report_path.expanduser().resolve()
        if report_path.exists():
            raise ValueError(f"Refusing to overwrite existing report: {report_path}")
        if report_path.is_relative_to(output):
            raise ValueError("Report path must be outside generated site; audit-report.json is already included")
        report_path.parent.mkdir(parents=True,exist_ok=True)
        report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    return report


class SourceInspector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = ""; self.title = ""; self.in_title = False
        self.h1 = 0; self.main = 0; self.nav = 0
        self.ids = []; self.links = []; self.assets = []; self.img_no_alt = 0
        self.viewport = False; self.description = False; self.skip = False
        self.handlers = 0
        self.nav_selected = 0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=="html":self.lang=a.get("lang","")
        if tag=="title":self.in_title=True
        if tag=="h1":self.h1+=1
        if tag=="main":self.main+=1
        if tag=="nav":self.nav+=1
        if tag=="meta":
            if a.get("name")=="viewport":self.viewport=bool(a.get("content"))
            if a.get("name")=="description":self.description=bool(a.get("content","").strip())
        if a.get("class","") == "skip-link": self.skip=True
        if "id" in a:self.ids.append(a["id"])
        if tag=="img" and "alt" not in a:self.img_no_alt+=1
        if tag=="a":
            self.links.append(a.get("href"))
            if a.get("aria-current")=="page":self.nav_selected+=1
        if tag=="script" and "src" in a:self.assets.append(a["src"])
        if tag=="link" and a.get("rel")=="stylesheet":self.assets.append(a.get("href"))
        self.handlers+=sum(1 for key in a if key.startswith("on") and len(key)>2)
    def handle_endtag(self,tag):
        if tag=="title":self.in_title=False
    def handle_data(self,data):
        if self.in_title:self.title+=data


def audit(root: Path) -> dict:
    root = root.expanduser().resolve()
    manifest_path = root / "site-manifest.json"
    if not manifest_path.is_file():
        raise ValueError("Missing site-manifest.json")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    pages = manifest.get("pages")
    if not isinstance(pages,list) or len(pages)!=5 or any(not isinstance(p,dict) or "path" not in p for p in pages):
        raise ValueError("Invalid site manifest: five routes required")
    checks=[]
    def check(route,label,condition,detail):
        checks.append({"page":route,"check":label,"status":"pass" if condition else "error","detail":detail})
    route_files = set()
    all_links = []
    for p in pages:
        route=p["path"]
        file=(root / route / "index.html").resolve() if route!="./" else root / "index.html"
        if not file.is_relative_to(root):raise ValueError("Manifest route escapes the site")
        if file in route_files:raise ValueError("Duplicate manifest route")
        route_files.add(file)
        if not file.is_file():
            check(route,"file-exists",False,"Missing route");continue
        inspector=SourceInspector(); inspector.feed(file.read_text(encoding="utf-8"))
        check(route,"title",bool(inspector.title.strip()),"Non-empty title")
        check(route,"lang",inspector.lang=="it","HTML language it")
        check(route,"viewport",inspector.viewport,"Viewport is declared")
        check(route,"description",inspector.description,"Meta description exists")
        check(route,"h1",inspector.h1==1,"Exactly one h1")
        check(route,"main",inspector.main==1,"Exactly one main")
        check(route,"nav",inspector.nav==1 and inspector.nav_selected==1,"Navigation and active page")
        check(route,"skip-link",inspector.skip and "main" in inspector.ids,"Skip link and main anchor")
        check(route,"ids",len(inspector.ids)==len(set(inspector.ids)),"Unique element IDs")
        check(route,"no-inline-handlers",inspector.handlers==0,"No HTML event handler attributes")
        check(route,"img-alt",inspector.img_no_alt==0,"Image alt attributes")
        links=inspector.links + inspector.assets
        clean=True; local=True; anchors=True
        for href in links:
            if not isinstance(href,str) or not href.strip():clean=False;continue
            u=urlsplit(href)
            if u.scheme or u.netloc:
                if u.scheme not in {"https","mailto","tel"} or u.username or u.password: clean=False
                continue
            if href.startswith("/") or "\\" in href:clean=False;continue
            target=(file.parent / unquote(u.path)).resolve() if u.path else file
            if not target.is_relative_to(root):clean=False;continue
            if target.is_dir():target=target / "index.html"
            if not target.is_file():local=False
            if u.fragment and target.is_file() and target.suffix==".html":
                sub=SourceInspector();sub.feed(target.read_text(encoding="utf-8"))
                if u.fragment not in sub.ids:anchors=False
            all_links.append((route,href))
        check(route,"safe-schemes",clean,"Safe local or external URL schemes")
        check(route,"local-links-and-assets",local,"All local nav and asset files exist")
        check(route,"fragment-targets",anchors,"Anchor fragments resolve")
        check(route,"nav-count",len(inspector.links)>=6,"Five route links plus skip/home")
        source=file.read_text(encoding="utf-8")
        check(route,"noindex-demo",'name="robots" content="noindex,nofollow"' in source,"Demo is noindex by default")
    css=(root / "assets" / "style.css")
    js=(root / "assets" / "app.js")
    check("global","style-and-interaction",css.is_file() and js.is_file(),"Local CSS and JS exist")
    if css.is_file():
        style=css.read_text(encoding="utf-8")
        check("global","focus-visible",":focus-visible" in style,"Focus-visible selector present (heuristic)")
        check("global","responsive","@media" in style,"Responsive CSS present (heuristic)")
        check("global","reduced-motion","prefers-reduced-motion" in style,"Reduced motion rule present (heuristic)")
    check("global","source-truth",manifest.get("ai_model_used") is False and manifest.get("production_ready") is False and manifest.get("human_review_required") is True,"No unverified production/AI claims")
    if "auxiliary_skill_plan" in manifest:
        plan = manifest["auxiliary_skill_plan"]
        clean = isinstance(plan, dict) and plan.get("authority") == "marcelus-webfoundry" and plan.get("status") == "advisory-routing-only" and plan.get("external_modules_executed") is False and plan.get("human_review_required") is True
        if clean:
            from skill_router import registry
            r = registry()
            ids = [m.get("id") for m in plan.get("selected_modules", []) if isinstance(m, dict)]
            expected = [m["id"] for m in r["modules"] if m["id"] in ids]
            clean = bool(ids) and len(ids) == len(set(ids)) and ids == expected and all(m.get("execution") == "guidance-only" for m in plan["selected_modules"])
        check("global","auxiliary-skill-provenance",clean,"Optional guidance only; WebFoundry retains authority")
    errors=sum(c["status"]=="error" for c in checks)
    return {"tool":"MARCELUS WebFoundry structural multipage audit","version":"0.3.0","result":"pass-static-only" if errors==0 else "fail",
       "routes":len(pages),"counts":{"passes":len(checks)-errors,"warnings":0,"errors":errors},"checks":checks,
       "not_tested":["WCAG accessibility compliance and screen reader behavior","Real-device Safari/Android tests","Core Web Vitals and Lighthouse","Authenticity of claims, editorial data, copyright and privacy","CSP/security headers and deployment configuration","Real backend, LLM generation, payment or form sending"]}


def main(argv=None):
    parser=argparse.ArgumentParser(description=__doc__)
    commands=parser.add_subparsers(dest="command",required=True)
    pnew=commands.add_parser("new",help="Build five real routes from a MANZO AI Studio v0.2 blueprint")
    pnew.add_argument("--blueprint",type=Path,required=True)
    pnew.add_argument("--out",type=Path,required=True)
    pnew.add_argument("--report",type=Path)
    pnew.add_argument("--skill-plan",type=Path,help="Optional validated advisory routing plan")
    paudit=commands.add_parser("audit",help="Audit five generated routes, all local links and shared assets")
    paudit.add_argument("--site",type=Path,required=True)
    paudit.add_argument("--report",type=Path)
    a=parser.parse_args(argv)
    try:
        if a.command=="new":
            result=build(a.blueprint,a.out,a.report,a.skill_plan)
            print(f"Created 5 linked HTML pages in {a.out}")
        else:
            result=audit(a.site)
            if a.report:
                a.report.parent.mkdir(parents=True,exist_ok=True)
                a.report.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        print(f"WebFoundry v0.3: {result['result']}; {result['counts']['passes']} passed, {result['counts']['errors']} errors")
        return 0 if not result["counts"]["errors"] else 2
    except (OSError,ValueError,json.JSONDecodeError,KeyError) as err:
        print("ERROR:",err,file=sys.stderr)
        return 2


if __name__=="__main__":sys.exit(main())
