# MARCELUS — visual refresh and URL migration

The portfolio moves to https://manzo8b.github.io/marcelus/ (Italian: /it/, Spanish: /es/). The GitHub repository is renamed in place; history and existing branches remain. GitHub repository links redirect, but GitHub Pages does not redirect the former project URL automatically. External portfolio bookmarks need updating.

The visual layer uses white and pearl surfaces, cobalt accents, larger type, a two-column project showcase and restrained pointer effects. The shared header, mobile menu, footer and inner page presentation are aligned. Existing copy, project examples, legal pages, translations, logo, image assets and reviewed CV remain. Only URL references in active navigation/download templates and the README change.

Home module styles replace the accumulated experimental styles. Shared overrides are isolated in `app/marcelus-design.css`, after the existing learning palette. Theme and reduced-motion preferences remain supported. No font CDN, analytics, new tracking or image dependencies are introduced.

Next.js is patched from 16.4.0 to 16.4.5 following the npm security audit; pinned lockfile retained. Existing CSS selector checks are adjusted for the new module class structure.

Validation: 50 existing tests; TypeScript; production static export; privacy gate including the reviewed CV hash; 64 exported HTML files checked for local anchor destinations/assets; npm audit reports zero vulnerabilities at release time. Browser checks cover representative Home/project/lab/library/resources routes and three languages at mobile width, mobile menu open/Escape and theme/language interactions. This is not an exhaustive accessibility or field-performance audit.

Rollback: restore the previous source tree with a new commit, retaining history. A URL rollback also requires changing the repository name and build-time base path together. Historical archives and evidence are not rewritten.

The owner-supplied MANZO logo is exported as 32/192 px PNG, multi-size ICO and 180 px Apple touch icon on a light tile for legibility in both browser themes. The source logo is not redrawn.
