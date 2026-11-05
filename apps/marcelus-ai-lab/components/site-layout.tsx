import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { assetUrl, profile, repository } from '@/data/portfolio';
import { siteOrigin, absoluteUrl } from '@/data/site-metadata';
import { type Locale, localizedPath, t } from '@/data/i18n';
import { presentation } from '@/data/presentation';
import '@/app/globals.css';
import '@/app/learning-colors.css';
import '@/app/marcelus-design.css';

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: 'Marcelo Fernandez — Websites, AI and training', template: '%s | MARCELUS' },
  description: 'The personal portfolio of Marcelo Fernandez: websites, AI instructions, content review and practical training.',
  openGraph: { title: 'Marcelus AI Lab - Marcelo Fernandez', description: 'Websites, AI instructions, content review and practical training. Explore the work of Marcelo Fernandez.', type: 'website' },
};

export default function SiteLayout({ children, locale }: Readonly<{ children: React.ReactNode; locale: Locale }>) {
  const c = presentation[locale];
  const person = { '@context': 'https://schema.org', '@type': 'Person', '@id': absoluteUrl('/#marcelo-fernandez'), name: profile.name, url: absoluteUrl(localizedPath('/about/', locale)), sameAs: [profile.linkedin, 'https://github.com/manzo8b'] };
  const website={'@context':'https://schema.org','@type':'WebSite','@id':absoluteUrl('/#website'),name:'MARCELUS',alternateName:`${profile.name} — ${c.portfolio}`,url:absoluteUrl('/'),inLanguage:['en','it','es'],publisher:{'@id':person['@id']}};
  return <html lang={locale} data-theme="light" suppressHydrationWarning><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({'@context':'https://schema.org','@graph':[person,website]}).replace(/</g, '\\u003c') }} />
    <a className="skip-link" href="#main-content">{t(locale, 'Skip to content')}</a>
    <Navigation locale={locale} />
    <main id="main-content" className="page-container">{children}</main>
    <footer className="site-footer"><div className="footer-inner"><div><strong>MARCELUS · Marcelo Fernandez</strong><span>{t(locale, 'Personal projects. Documented work.')}</span></div><div className="footer-links"><Link href={localizedPath('/about/', locale)}>{profile.name}</Link><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={14} /></a><a href={`mailto:${profile.email}`}><Mail size={14} aria-hidden="true"/>{profile.email}</a><a href={repository} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={14} /></a></div><a href="https://manzo8b.github.io/manzo-ai/it/" className="manzo-ecosystem-signature" target="_blank" rel="noopener noreferrer" aria-label="MANZO AI — ecosistema di progetti digitali"><img src={assetUrl('/media/manzo-mark.svg')} width="36" height="34" alt="" aria-hidden="true" loading="lazy" /><span>Un progetto dell’ecosistema <strong>MANZO AI</strong></span></a></div><nav className="footer-explore" aria-label={c.nav.resources}><Link href={localizedPath('/services/',locale)}>{c.nav.services}</Link><Link href={localizedPath('/contact/',locale)}>{c.nav.contact}</Link><Link href={localizedPath('/lab/',locale)}>{c.lab}</Link><Link href={localizedPath('/library/',locale)}>{c.library}</Link><a href="https://www.agensi.io/creators/marcelo-javier-fernandez-caballero" target="_blank" rel="noopener noreferrer">{c.skills}</a><Link href={localizedPath('/recruiter/',locale)}>{c.recruiter}</Link></nav><nav aria-label="Legal" className="mx-auto flex max-w-[1184px] flex-wrap gap-x-5 gap-y-2 px-8 pb-7 text-xs text-[var(--muted)]">
      <Link href={localizedPath('/legal/', locale)}>{locale === 'it' ? 'Informazioni legali' : locale === 'es' ? 'Aviso legal' : 'Legal notice'}</Link>
      <Link href={localizedPath('/legal/privacy/', locale)}>{locale === 'it' ? 'Privacy' : locale === 'es' ? 'Privacidad' : 'Privacy'}</Link>
      <Link href={localizedPath('/legal/cookies/', locale)}>{locale === 'it' ? 'Cookie e tecnologie locali' : locale === 'es' ? 'Cookies y tecnologías locales' : 'Cookies and local technologies'}</Link>
    </nav></footer>
  </body></html>;
}
