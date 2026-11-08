# MARCELUS WebFoundry — SKILL + Python engine v0.3

**Workflow:** structured brief or MANZO AI Studio JSON → validated data → original static site → offline quality report.

A working, portable **Agent Skill** (see [`SKILL.md`](SKILL.md)) and a Python 3.9+ generator without third-party dependencies. Part of MARCELUS AI LAB. It is **not** a production-ready hosted site builder, an AI model, a payment platform or a WCAG certification.

## What's new in v0.3

- **Five actual static HTML routes per sector** with active navigation, page-level metadata and route-specific content.
- **85 static checks per site**, including local route and asset linking.
- **Optional auxiliary skill router**: integrates design-taste-frontend, impeccable, apple-design as advisory stages while keeping WebFoundry authoritative.
- No external skill/toolkit is executed; generator, schema and QA stay dependency-free.

## Previous v0.2 capabilities

- Strict compatibility adapter for MANZO AI Studio exported JSON (`scripts/studio_bridge.py`).
- Distinct visual theme **cinematic**, with layered 2.5D orbit, sector color variants, animated effects, pause button and reduced-motion support.
- Five curated demo sectors and static HTML/CSS/JS outputs with source evidence.
- Explicit output truth boundary: `DEMO · NON PUBBLICATA`; no real multi-page claim.
- Negative tests for invalid schemas, source tampering and HTML escaping.

## Run on Mac (no Homebrew needed)

When using the combined v0.2 package, start at its root (`webfoundry/`, `studio/`, `examples/`). When using this v0.3 SKILL folder directly, use the multipage commands below from the directory containing `SKILL.md`:

```bash
python3 webfoundry/scripts/studio_bridge.py \
  --blueprint webfoundry/examples/studio/education.json \
  --site my-education-site \
  --brief-out my-education-brief.json \
  --report my-education-audit.json
open my-education-site/index.html
```

Or use a compatible exported Studio JSON blueprint as input. This legacy workflow creates an original **single-page site**. For **five real pages**, use the new v0.3 engine below. Both outputs remain local and unpublished.

```bash
cd webfoundry
python3 scripts/skill_router.py plan --blueprint examples/studio/education.json --out ../skill-plan.json
python3 scripts/multipage.py new --blueprint examples/studio/education.json --out ../my-five-page-site --skill-plan ../skill-plan.json
python3 scripts/multipage.py audit --site ../my-five-page-site
python3 -m unittest discover -s tests -v
```

Full priority and conflict rules: [`references/AUXILIARY_SKILLS.md`](references/AUXILIARY_SKILLS.md).

Original starter remains available:

```bash
cd webfoundry
python3 scripts/webfoundry.py new --brief examples/brief.json --out basic-demo
python3 scripts/webfoundry.py audit --site basic-demo --report audit.json
python3 -m unittest discover -s tests -v
```

## Where this leads

Read `references/PLATFORM_ARCHITECTURE.md` for the future interactive local web builder, multi-page generation, optional validated AI adapter and commercial SaaS roadmap.

**Owner review required:** visual quality, accuracy, privacy, intellectual property, legal content, full accessibility and real-device performance. Do not deploy or commercialize automatically.
