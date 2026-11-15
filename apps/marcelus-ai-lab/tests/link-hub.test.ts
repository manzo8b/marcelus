import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const hub = readFileSync('components/link-hub.tsx', 'utf8');
const css = readFileSync('components/link-hub.module.css', 'utf8');
const nav = readFileSync('components/navigation.tsx', 'utf8');
const footer = readFileSync('components/site-layout.tsx', 'utf8');
const localized = readFileSync('app/[locale]/[[...segments]]/page.tsx', 'utf8');
const english = readFileSync('app/(english)/links/page.tsx', 'utf8');
const sitemap = readFileSync('app/sitemap.ts', 'utf8');

test('every requested project and professional profile has an official destination', () => {
  const destinations = [
    'https://manzo8b.github.io/manzo-ai/it/',
    'https://manzo8b.github.io/risto-lab/',
    'https://manzo8b.github.io/s-comodo/',
    'https://manzo8b.github.io/Lune_X/',
    'https://manzo8b.github.io/Torremolinos/',
    'https://www.villapitosfori.com/',
    'https://github.com/manzo8b',
    'https://www.agensi.io/creators/marcelo-javier-fernandez-caballero',
    'https://www.linkedin.com/in/marcelo-fernandez-cab/',
  ];
  for (const url of destinations) assert.ok(hub.includes(url), 'missing: ' + url);
});
test('links are available in three languages from header, footer and sitemap', () => {
  assert.match(nav, /localizedPath\('\/links\/', locale\)/);
  assert.match(footer, /localizedPath\('\/links\/',locale\)/);
  assert.match(localized, /'links'/);
  assert.match(localized, /route === 'links'/);
  assert.match(localized, /LinkHub locale=\{locale\}/);
  assert.match(english, /LinkHub locale="en"/);
  assert.match(sitemap, /'\/links\/'/);
  for (const locale of ['it', 'en', 'es']) assert.match(hub, new RegExp('  ' + locale + ': \\{'));
});
test('external links are safe and layout accommodates mobile and reduced motion', () => {
  assert.ok(hub.includes('rel="noopener noreferrer"'));
  assert.ok(hub.includes('target="_blank"'));
  assert.ok(css.includes('@media(max-width:560px)'));
  assert.ok(css.includes('prefers-reduced-motion:reduce'));
  assert.ok(hub.includes('aria-label='));
  assert.ok(hub.includes('id="ecosystem-projects"'));
});
