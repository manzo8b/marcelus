# Brief format

A brief is UTF-8 JSON. Only confirmed or intentionally synthetic facts belong here. `examples/brief.json` is synthetic and should not be presented as a real agency or commercial product.

| Field | Required | Rule |
|---|---|---|
| `project_name` | Yes | Plain text; 1–70 characters |
| `language` | Yes | Two-letter language code (`it`, `en`, `es`, etc.) |
| `eyebrow` | Yes | Short introductory label |
| `headline` | Yes | One H1, ideally under 90 characters |
| `description` | Yes | Honest public description, not a claim of guaranteed results |
| `features` | Yes | Array of 2–4 `{title,description}` objects |
| `theme` | No | `ocean`, `orchid`, or `graphite` |
| `primary_cta` | No | `{label,href}` using `https://`, `mailto:` or an existing anchor |
| `secondary_cta` | No | Same format |
| `contact_email` | No | Only a genuinely confirmed email address; makes a contact section |
| `canonical_url` | No | Exact public HTTPS URL, only once deployed to this address |

No arbitrary HTML, JavaScript or CSS is accepted from brief fields. All copy is escaped. Existing generated directories cannot be overwritten. The output directory contains a static `index.html`, `style.css`, `app.js`, `.nojekyll` and optionally `sitemap.xml`.

For a real project, replace synthetic content, verify external links, test browsers and obtain approval before deploying.
