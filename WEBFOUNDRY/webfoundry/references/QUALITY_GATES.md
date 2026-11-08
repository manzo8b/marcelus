# WebFoundry quality gates

## Deterministic static checks (automated)

- HTML document includes a non-empty `<title>`, exactly one H1, a meaningful `lang`, viewport and description.
- A main region is present; links have targets that do not use `javascript:` or an insecure HTTP URL.
- Internal `#anchor` links refer to unique element IDs; local script and stylesheet paths exist.
- Every `img` has an `alt` attribute, including `alt=""` for decorative illustrations.
- CSS contains signs of responsive, focus-visible and reduced-motion support (heuristic checks only).
- External links with `target="_blank"` contain `noopener`.
- Output includes the list of warnings, failures and not-tested risks.

## Human checks (required before publishing)

| Test | Minimum evidence |
|---|---|
| 320 / 390 / 768 / 1280 CSS px | Screenshots and no unintended page-level overflow |
| Keyboard-only | Reachable controls, visible focus, no keyboard trap, correct open/close menu |
| Screen reader | Landmark hierarchy, controls and announcements checked with a real assistive tool |
| Contrast | Evaluate all *rendered* text and component states against WCAG 2.2 |
| Content verification | Every factual claim and outbound URL checked by a human |
| Performance | Real browser Lighthouse and network checks, with measured date and device |
| Security | Review headers, CSP, dependencies, external integrations; this starter includes no forms |
| SEO | Inspect robots, canonicals, sitemap, language alternates if applicable, indexability |
| Privacy/legal | Check actual data collection, ownership, cookie and contact requirements |

An automated report may be useful evidence but does not replace these human checks. Do not describe the static checklist as a full WCAG 2.2 audit.
