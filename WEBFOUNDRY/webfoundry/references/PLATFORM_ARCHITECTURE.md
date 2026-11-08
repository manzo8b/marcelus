# MANZO AI Studio — phased platform architecture

**Project boundary:** the published MANZO AI Academy remains separate. The cinematic Studio is a preview and site-briefing interface. WebFoundry is the deterministic Python site generator and QA script.

```text
STUDIO (browser)                     WEBFOUNDRY (Python, local)
Project / sector / style / goal  →   Strict schema validation
           ↓                                    ↓
Live preview + JSON download     →   Normalized, source-backed brief
                                                ↓
                                      Static site HTML/CSS/JS
                                                ↓
                                      Deterministic QA report
                                                ↓
                                           Human review
                                                ↓
                                    Publication only if approved
```

## Already demonstrated in v0.2

- Premium cinematic Studio page with sector selection, live concept preview and JSON export.
- Validated bridge (`studio_bridge.py`) between the exported JSON and a Python site builder.
- Five different sector outputs, each a *single* static landing page.
- No keys, account, tracking, server service, remote AI model or payment API.
- Python and in-memory Chromium regression tests. These are **not** a full hosted-site QA or WCAG certification.

## Next milestones (not yet built)

1. **SKILL v0.3: genuine multi-page generator.** Route manifest, active navigation, assets and automatic broken-link audit. Complete content fidelity for each generated page.
2. **Platform v0.1: local visual builder.** A local Python service bound to `127.0.0.1`, per-project sandbox, preview updates, safe downloads and non-overwriting version history. User can operate the frontend without terminal commands; no accounts or public endpoints.
3. **Design intelligence.** Human-approved brand system, industry rules, semantic color/spacing tokens and accessibility thresholds; optional LLM only if model credentials and controlled cost budget are explicitly provided.
4. **Full browser QA.** Playwright screenshots across viewport/device matrix, keyboard, browser console, link integrity, accessibility rule checks, image optimization and Lighthouse where supported. Manual WCAG review still needed.
5. **Hosted service / monetization.** Auth, user data processing, secure storage, quotas, billing and hosting outside free GitHub Pages for a commercial SaaS. Complete privacy/security/legal review first.

## Threat model and release gates

- Treat project input, images, external websites and model output as untrusted.
- Never execute generated code server-side by default; isolate builds and use allowlisted templates.
- Restrict paths, file sizes, MIME types and archive extraction; prevent arbitrary filesystem writes and network access by default.
- Protect model keys on the server, never in browser source. Enforce quotas and explicit cost ceilings before adding paid inference.
- Require human approval before deployment. Keep an immutable change log and rollback in hosted versions.
- For hospitality/tourism, avoid fabricated operating hours; for compliance, do not simulate legal certifications; for creators, verify rights to music and imagery.

## Business framing

The initial skill can be demonstrated free of charge as a software portfolio case study. Revenue may later come from human web design, custom templates, QA and integrations; a paid SaaS is a **future hypothesis**, not a current offering. No license for third-party redistribution is implied by publication of the source code without an explicit code-licensing decision.
