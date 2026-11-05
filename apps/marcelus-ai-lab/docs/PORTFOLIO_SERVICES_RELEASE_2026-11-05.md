# MARCELUS — personal portfolio, services and search structure

Owner-authorized refinement following the portfolio audit. Public display name: **Marcelo Fernandez**. New copy is available in Italian, English and Spanish, with no terminal full stops in headings.

## Visitor experience

The Home now introduces Marcelo Fernandez and the three broad areas of work before a clear project enquiry link. Six sections replace the previous ten: introduction, four service areas, three selected works, method, personal background and contact.

New static pages: `/services/` and `/contact/`, plus `/it/` and `/es/` equivalents. Each service describes its audience, possible deliverables, scope and a documented project. The contact page uses a transparent mailto link and a short brief template; it does not submit messages, collect form input or introduce tracking.

The header prioritizes Home, Services, Projects, About and Resources, with an enquiry CTA. Library, lab, Skills and the recruiter/CV path remain accessible through Resources and the footer. The Home highlights Villa Pitosfori, Prometeus and RISTO-LAB. All projects remain available; OIKO and HACCP SMART now appear in the lab. S-COMODO is consistently labelled as online in the catalogue. The Villa case explains the actual Wix work without claiming booking, traffic or revenue outcomes.

The legal notice's description of the website is aligned with enquiries and project-based services. Existing legal owner identity, privacy/cookie notices, retention claims, source evidence and approved CV are retained. No online payment or contract-acceptance flow is added.

## Presentation and search

Service cards use HP-inspired pale blue panels, blue borders, white icon surfaces and clear light-blue action pills, with small hover and press effects. The whole card is one accessible link. Reduced-motion behavior is retained. At the owner’s request, the final release uses light surfaces only, including pastel blue action buttons. The theme switch is removed; stored dark preferences are ignored without deleting browser data. Privacy/cookie descriptions reflect that change.

Metadata describes the actual page in each language, including services, contact, projects and legal documents. Canonicals and language alternates retain the `/marcelus/` base path. Visible breadcrumbs and matching BreadcrumbList data are added to services, contact and project details. Person and WebSite data identify the portfolio without claiming an organization, ratings, prices or search functionality.

The sitemap contains **66 unique content URLs**, with revision dates only for the editorial routes changed on 5 November. GitHub Pages uses a project subdirectory: a robots.txt inside that subdirectory would not control the host and was not fabricated. A sitemap submission or indexing request was not made through Search Console; no connected Search Console tool was available.

Sitelinks are chosen by Google. The changes improve the navigation, descriptive titles and internal links used to understand the site; neither sitelinks, indexing nor search positions are guaranteed. Google's site-name feature does not support separate names at subdirectory level, so valid WebSite data does not promise a separate Google site name for this project path.

References:
- https://developers.google.com/search/docs/appearance/sitelinks
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/appearance/site-names

## Validation

- TypeScript and 50 existing automated tests pass
- Production static export succeeds; pre-build privacy gate passes
- 70 exported HTML files checked: local links, assets and fragments resolve
- 66 sitemap entries checked: canonical, three language alternates, one H1 and description
- All generated heading elements have no terminal full stop
- All 87 generated JSON-LD script blocks parse
- 36 browser route/viewport checks at 320, 390 and 1280 px show no horizontal overflow, missing H1, heading full stops or failed loaded images
- A further 24 checks on the final light-only layout confirm no overflow or large dark surfaces in the sampled pages, including a reload after a previously selected dark preference
- Mobile menu opens and closes on navigation; contact language switch verified; final light-only behavior checked
- Mailto recipient, subject and real line breaks verified without sending a message
- Approved public CV SHA-256 remains `c737892d5aeec7ffc479a72769c750e235899a1343994145ac7aa725b3bc2189`

These checks are not field performance measurements, a complete accessibility audit, legal certification or evidence of commercial outcomes. Publication provenance remains recorded by the existing GitHub workflow; rollback uses a normal revert, not a history rewrite.
