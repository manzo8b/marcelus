# Services page — brighter visual presentation

The Services page now opens with a light-blue hero, two clear actions and a four-tile service selector. Each service retains its existing audience, description, deliverables and scope in a framed blue panel, with a white delivery card, a larger project-example link and a dedicated contact action.

Styling is isolated in `components/services-page.module.css`; Home cards, contact content, service copy, metadata, canonical URLs, language alternates and the 66-URL sitemap retain their current behavior. Existing service anchor IDs remain valid. No images, fonts, tracking or client-side animation libraries are introduced.

The presentation is light only, in all three languages. Hover and press feedback respect reduced-motion preferences. Headings retain no terminal full stop.

Validation: TypeScript, production build and 50 existing tests pass. The export check confirms local links, assets, fragments, canonical/alternate metadata and JSON-LD; approved CV remains unchanged. Twelve service-page checks across English, Italian and Spanish at 320, 390, 768 and 1280 px show no horizontal overflow, four panels, one H1 and contact targets at least 44 px high. The quick-access website link reaches its intended service section. Desktop and mobile screenshots were inspected before publication.
