# Auxiliary skill architecture — MARCELUS WebFoundry v0.3

## Immutable authority

**MARCELUS WebFoundry (`SKILL.md`) is the only primary agent skill.** Its Python engine owns the JSON schema, page/site architecture, input sanitation, generator, deterministic audit, release gating and provenance. A supporting skill can only *advise* on its area of expertise. The human owner retains the final decision.

This is a curated adapter to the three **previously supplied** skill families, not a copy of their external repositories or their full scripts. Duplicates were collapsed by `name`; their original libraries/binaries are neither packaged nor silently run. Registry: `config/auxiliary_skills.json`.

| Sequence | Supporting skill | Scope | Not allowed |
| --- | --- | --- | --- |
| 0 | **MARCELUS WebFoundry (core)** | Architecture, brief schema, generation, QA, safety, publication decision | Never bypass validation or owner approval |
| 1 | **design-taste-frontend** (tasteskill v2) | Art direction, distinctive structure, typography, composition, screenshot critique | Replacing approved MANZO cinematic concept with generic/minimal patterns |
| 2 | **impeccable** (v4.8) | UI/UX audit, design tokens, layout, responsive hierarchy, usability/accessibility review | External CLI automatic execution, claiming UX certification |
| 3 | **apple-design** | Interruptible gesture interaction, meaningful motion, translucent materials, reduced-motion behavior | Copying Apple branding or making animation mandatory |
| 4 | **WebFoundry quality gates** | Local HTML/source validation and explicit manual/browser QA gate | Declaring production or WCAG compliance based on static checks |

## Collision and priority rules

1. Security, privacy, accurate claims, client intellectual property, accessibility and user-approved requirements override every stylistic suggestion.
2. Approved client-specific identity always wins. **MANZO AI Studio** uses the approved cinematic black / crimson / magenta / violet design and bull emblem; generated sites for other clients use their own brief and brand.
3. Architecture, routing, code generation and audits are owned solely by WebFoundry. Auxiliary skills cannot mutate validated input schemas or directly publish.
4. design-taste's general taste rules do not override a deliberately cinematic concept. Use its subject-specific ideas, copy and design critique, not its default no-ornament recommendations as universal rules.
5. Impeccable's tooling is a separate runtime and cannot be assumed available merely from its Markdown; no network fetch or installer is run on the user's behalf.
6. Apple's motion principles apply primarily to interaction. The automatic MANZO orbit is optional decorative motion and must honor `prefers-reduced-motion`, remain pausable and never block content.
7. A module result requires **human review** before it becomes part of source code; a generated plan is advisory metadata, not a certification of execution.

## Technical integration

Generate a plan from the same validated Studio JSON used for building the site:

```sh
python3 scripts/skill_router.py plan --blueprint examples/studio/education.json --out skill-plan.json
python3 scripts/skill_router.py validate --blueprint examples/studio/education.json --plan skill-plan.json
python3 scripts/multipage.py new --blueprint examples/studio/education.json --out demo-education --skill-plan skill-plan.json
python3 scripts/multipage.py audit --site demo-education
```

The plan locks a deterministic hash of the **validated blueprint** and the module registry. A changed blueprint, unknown module, duplicate, altered priority or false claim causes rejection. The generator embeds a provenance summary into `site-manifest.json` **only when a valid plan is provided**; it does not run the supporting skills and does not rewrite the already-approved UI. The original generator works unchanged without `--skill-plan`.

## Testing and evidence

- Unit tests check routing, module order, duplicates, tampered plans and changed blueprints.
- Generator tests check invalid/stale plan failure before output and optional provenance record.
- Manual checkpoints must record real screenshot review at mobile, tablet and desktop, keyboard/gesture navigation, readable contrast, motion reduction, performance measurements, truthful content, rights/license and publication signoff.

## Source mapping

These names are taken from the previously provided files: `SKILL (2).md` (`design-taste-frontend`), `SKILL (1).md` (`impeccable`), and `SKILL.md` (`apple-design`). The Library also contains duplicate separately named versions of the last two; these are not separate orchestration modules. This package contains **new adapter guidance only** rather than redistributing their full source content. Any optional external toolkit use requires obtaining and verifying its actual implementation, dependencies and terms separately.
