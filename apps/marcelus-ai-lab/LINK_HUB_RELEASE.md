# MARCELUS Link Hub — release checklist

Source: `main` · Next.js app: `apps/marcelus-ai-lab`

## Routes
- EN: `https://manzo8b.github.io/marcelus/links/`
- IT: `https://manzo8b.github.io/marcelus/it/links/`
- ES: `https://manzo8b.github.io/marcelus/es/links/`

## Content
Nine external destinations: MANZO AI, RISTO-LAB, S-COMODO, Lune_X, Torremolinos, Villa All'Ombra dei Pitosfori, GitHub, Agensi and LinkedIn. All URLs were sourced from the portfolio's existing project documentation or previously approved public profiles. No new tracking, remote scripts, cookies, forms or third-party fonts are introduced.

## Build and local acceptance
Use the current **/marcelus** base path (not the retired `/marcelus-v-v01` path in historical deployment notes).

```sh
cd apps/marcelus-ai-lab
npm ci
npm run test
npm run typecheck
NEXT_PUBLIC_SITE_ORIGIN=https://manzo8b.github.io NEXT_PUBLIC_BASE_PATH=/marcelus npm run build
test -s out/links/index.html
test -s out/it/links/index.html
test -s out/es/links/index.html
grep -q 'MANZO AI' out/it/links/index.html
grep -q 'Agensi' out/es/links/index.html
```

Inspect the generated pages at 320, 390, 768, 1024 and 1440 px. Verify navigation/locale changes, external destinations, keyboard focus, reduced motion, no horizontal overflow, all three canonical/hreflang URLs and mobile card interactions.

## Publish
The source branch **does not deploy automatically**. Publish only the complete reviewed `out/` static export to the existing `gh-pages` branch using the repository's approved release procedure, keeping `.nojekyll` and a manifest identifying the exact source SHA. Preserve branch history and do not force-push. Do not publish source files, private materials, node_modules or CV originals. Confirm the Pages deployment and all three public routes over HTTPS before marking the release live.

This checklist documents the publication requirements; writing source code to `main` is not proof of production deployment.
