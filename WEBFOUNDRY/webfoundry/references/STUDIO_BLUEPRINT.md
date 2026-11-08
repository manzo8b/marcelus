# Studio → WebFoundry data contract (v0.2)

This is the actual contract used by `scripts/studio_bridge.py` in version 0.2. Browser exports are **untrusted input** and must be validated locally.

| Field | Accepted values | Notes |
| --- | --- | --- |
| `schema_version` | exactly `"0.2"` | Not the product/UI version |
| `product` | exactly `"MANZO AI Studio"` | Branding of the demo |
| `generator` | `"deterministic_browser_blueprint"` | No LLM calls |
| `project.name` | UTF-8 text 1–70 characters | HTML escaped |
| `project.sector` | `education`, `hospitality`, `compliance`, `tourism`, `creators` | Curated examples |
| `project.style` | `cinematic`, `editorial`, `refined` | Cinematic uses dark orbital UI |
| `project.goal` | `present`, `leads`, `learn`, `explore` | Descriptive intent, no real lead capture |
| `website.headline`, `subheadline`, `recommended_cta` | UTF-8 strings with limits | Not independently verified facts |
| `website.pages` | Exact sector list | Planned navigation only; v0.2 generates 1 page |
| `quality.human_review_required` | `true` | Mandatory |
| `quality.ai_model_used` | `false` | Mandatory truth boundary |
| `quality.website_generated` | `false` | Source blueprint state, before Python runs |
| `quality.production_ready` | `false` | Mandatory truth boundary |
| `quality.checks_to_perform` | 1–6 strings | Human review checklist |

No arbitrary code or HTML is accepted from the JSON. The adapter maps a curated subset to the general WebFoundry brief and generates one responsive page with 3 sector-specific conceptual feature cards. This does **not** prove the five proposed pages were built or make them live.

## Example from Studio

```bash
python3 webfoundry/scripts/studio_bridge.py \
  --blueprint examples/blueprints/education.json \
  --site my-education-site \
  --brief-out my-education-brief.json \
  --report my-education-audit.json
```

The generated site has `index.html`, `style.css`, `app.js` and `.nojekyll`. No canonical URLs or sitemaps are invented. CLI refuses to overwrite existing output content.

## Adaptation by sector

- **Education:** clarify instructional methods and accessibility; no invented accreditation.
- **Hospitality:** services and facilities require verification; no fabricated guest reviews.
- **Compliance:** avoid legal certifications or specialist claims without evidence.
- **Tourism:** verify addresses, event dates and official sources; no invented availability.
- **Creators:** confirm commercial rights to music, photography and visual assets.

The copy included in examples is entirely **synthetic**. Replace it with approved project copy before use.
