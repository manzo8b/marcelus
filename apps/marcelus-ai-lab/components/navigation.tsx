'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { assetUrl, profile } from '@/data/portfolio';
import { type Locale, localizedPath, unlocalizedPath, t } from '@/data/i18n';
import { presentation } from '@/data/presentation';

const links = [['/', 'home'], ['/services/', 'services'], ['/projects/', 'projects'], ['/about/', 'about'], ['/resources/', 'resources']] as const;

export function Navigation({ locale }: { locale: Locale }) {
  const path = usePathname();
  const c = presentation[locale];
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  useEffect(() => { document.documentElement.dataset.theme = 'light'; }, []);
  function active(href: string) { const clean = unlocalizedPath(path); return href === '/' ? clean === '/' : clean.startsWith(href.replace(/\/$/, '')); }
  return <header className="site-header">
    <div className="header-inner">
      <Link href={localizedPath('/', locale)} className="brand" aria-label="Marcelus — Marcelo Fernandez"><img className="brand-symbol" src={assetUrl('/media/manzo-mark.svg')} alt="" aria-hidden="true" width={35} height={34} /><span>MARCELUS <span className="brand-detail">{profile.name}</span></span></Link>
      <nav id="main-navigation" aria-label={t(locale, 'Main navigation')} className={`main-nav ${open ? 'is-open' : ''}`}>
        {links.map(([href, label]) => <Link key={href} href={localizedPath(href, locale)} aria-current={active(href) ? 'page' : undefined} onClick={() => setOpen(false)}>{c.nav[label]}</Link>)}
        <Link className="nav-enquiry" href={localizedPath('/contact/',locale)} aria-current={active('/contact/')?'page':undefined} onClick={()=>setOpen(false)}>{c.nav.contact}</Link>
      </nav>
      <div className="header-tools">
        <label className="language-control"><span className="sr-only">{t(locale, 'Language')}</span><select aria-label={t(locale, 'Language')} value={locale} onChange={event => {
          const selected = event.target.value as Locale;
          const target = localizedPath(path, selected);
          // Root-layout changes deliberately reload, preserving the route and hash.
          window.location.assign(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${target}${window.location.hash}`);
        }}><option value="en" lang="en">EN</option><option value="it" lang="it">IT</option><option value="es" lang="es">ES</option></select></label>
        <button ref={menuButton} className="icon-button menu-button" aria-expanded={open} aria-controls="main-navigation" aria-label={t(locale, open ? 'Close navigation' : 'Open navigation')} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
    <div className="marcelus-contact-strip"><a href={`mailto:${profile.email}`} aria-label={`${locale === 'es' ? 'Contacto y servicios' : locale === 'it' ? 'Contatti e servizi' : 'Contact and services'}: ${profile.email}`}><span>{locale === 'es' ? 'Contacto y servicios' : locale === 'it' ? 'Contatti e servizi' : 'Contact & services'}</span><strong>{profile.email}</strong></a></div>
  </header>;
}
