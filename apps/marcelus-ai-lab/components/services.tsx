import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, GraduationCap, Globe2, Mail, Check, ScanSearch, Workflow } from 'lucide-react';
import { type Locale, localizedPath } from '@/data/i18n';
import { presentation, projectEmail } from '@/data/presentation';
import { profile } from '@/data/portfolio';
import { Breadcrumbs } from './breadcrumbs';
import style from './services-page.module.css';

export const serviceIcons = {web:Globe2,instructions:Workflow,review:ScanSearch,training:GraduationCap};

export function ServiceCards({locale}:{locale:Locale}) {
  const c=presentation[locale];
  return <div className="service-grid">{c.services.map(service=>{
    const Icon=serviceIcons[service.id];
    return <Link className="service-card" data-service={service.id} id={service.id==='instructions'?'skills':undefined} key={service.id} href={`${localizedPath('/services/',locale)}#${service.id}`}>
      <Icon className="service-symbol" size={27} strokeWidth={1.5} aria-hidden="true"/>
      <h3>{service.title}</h3><p>{service.short}</p><span>{c.detail}<ArrowUpRight size={16} aria-hidden="true"/></span>
    </Link>;
  })}</div>;
}

export function ServicesPage({locale='en'}:{locale?:Locale}) {
  const c=presentation[locale];
  return <article className={`offer-page ${style.page}`}>
    <Breadcrumbs locale={locale} items={[{name:c.nav.services,path:'/services/'}]}/>
    <header className={style.hero}>
      <div className={style.heroCopy}>
        <p className={style.eyebrow}>{profile.name} · {c.nav.services}</p>
        <h1>{c.servicesPageTitle}</h1><p className={style.lead}>{c.servicesPageIntro}</p>
        <div className={style.heroActions}>
          <Link className={`${style.button} ${style.primary}`} href={localizedPath('/contact/',locale)}>{c.nav.contact}<ArrowRight size={17} aria-hidden="true"/></Link>
          <a className={`${style.button} ${style.secondary}`} href="#service-details">{c.allServices}<ArrowRight size={17} aria-hidden="true"/></a>
        </div>
      </div>
      <nav className={style.directory} aria-label={c.nav.services}>{c.services.map(service=>{
        const Icon=serviceIcons[service.id];
        return <a href={`#${service.id}`} key={service.id}><span className={style.directoryIcon}><Icon size={25} strokeWidth={1.6} aria-hidden="true"/></span><span>{service.title}</span><ArrowUpRight className={style.directoryArrow} size={18} aria-hidden="true"/></a>;
      })}</nav>
    </header>
    <div id="service-details" className={style.details}>{c.services.map(service=>{
      const Icon=serviceIcons[service.id];
      return <section className={style.panel} data-service-panel={service.id} key={service.id} id={service.id} aria-labelledby={`service-${service.id}`}>
        <div className={style.intro}>
          <span className={style.badge}><Icon size={36} strokeWidth={1.4} aria-hidden="true"/></span>
          <h2 id={`service-${service.id}`}>{service.title}</h2><p className={style.short}>{service.short}</p>
          <div className={style.audience}><h3>{c.audience}</h3><p>{service.audience}</p></div>
        </div>
        <div className={style.delivery}>
          <h3>{c.delivery}</h3><ul>{service.delivery.map(item=><li key={item}><span><Check size={17} strokeWidth={2} aria-hidden="true"/></span>{item}</li>)}</ul>
          <Link className={style.example} href={localizedPath(service.path,locale)}><span><small>{c.proof}</small><strong>{service.proof}</strong></span><ArrowUpRight size={21} aria-hidden="true"/></Link>
        </div>
        <footer className={style.panelFooter}>
          <Link className={`${style.button} ${style.primary}`} href={localizedPath('/contact/',locale)}>{c.nav.contact}<ArrowRight size={17} aria-hidden="true"/></Link>
          <p><strong>{c.scope}.</strong> {service.scope}</p>
        </footer>
      </section>;
    })}</div>
    <div className={style.closing}><ProjectContact locale={locale}/></div>
  </article>;
}

export function ProjectContact({locale}:{locale:Locale}) {
  const c=presentation[locale];
  return <section className="project-enquiry" aria-labelledby="project-enquiry-title"><div><h2 id="project-enquiry-title">{c.contactTitle}</h2><p>{c.contactText}</p></div><div><Link className="button button-primary" href={localizedPath('/contact/',locale)}>{c.nav.contact}<ArrowRight size={17} aria-hidden="true"/></Link><p className="small-note">{c.contactNote}</p></div></section>;
}

export function ContactPage({locale='en'}:{locale?:Locale}) {
  const c=presentation[locale];
  return <article className="offer-page">
    <Breadcrumbs locale={locale} items={[{name:c.nav.contact,path:'/contact/'}]}/>
    <header className="page-heading"><p className="eyebrow">{profile.name} · {c.nav.contact}</p><h1>{c.contactPageTitle}</h1><p className="lead">{c.contactPageIntro}</p></header>
    <div className="contact-page-grid"><section><h2>{c.briefTitle}</h2><ol>{c.brief.map(item=><li key={item}>{item}</li>)}</ol><p>{c.contactText}</p></section>
      <section className="contact-panel" aria-label={c.email}><a className="button button-primary" href={`mailto:${profile.email}${projectEmail(locale)}`}><Mail size={18} aria-hidden="true"/>{c.email}</a><a className="public-email" href={`mailto:${profile.email}`}>{profile.email}</a><p>{c.emailHint}</p><a className="text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">{c.linkedin}<ArrowUpRight size={15} aria-hidden="true"/></a></section>
    </div><p className="enquiry-note">{c.contactNote}</p>
    <aside className="career-link"><BookOpen size={20} aria-hidden="true"/><div><p>{c.careerNote}</p><Link className="text-link" href={localizedPath('/recruiter/',locale)}>{c.recruiter}<ArrowRight size={15} aria-hidden="true"/></Link></div></aside>
  </article>;
}

export function ResourceLinks({locale}:{locale:Locale}) {
  const c=presentation[locale];
  return <nav className="resource-directory" aria-label={c.nav.resources}>
    <Link href={localizedPath('/library/',locale)}>{c.library}<ArrowUpRight size={15} aria-hidden="true"/></Link>
    <Link href={localizedPath('/lab/',locale)}>{c.lab}<ArrowUpRight size={15} aria-hidden="true"/></Link>
    <a href="https://www.agensi.io/creators/marcelo-javier-fernandez-caballero" target="_blank" rel="noopener noreferrer">{c.skills}<ArrowUpRight size={15} aria-hidden="true"/></a>
    <a href="https://www.agensi.io/skills/verum-output-reviewer" target="_blank" rel="noopener noreferrer">{locale==='it'?'Prova VERUM Output Reviewer (gratis)':locale==='es'?'Probar VERUM Output Reviewer (gratis)':'Try VERUM Output Reviewer (free)'}<ArrowUpRight size={15} aria-hidden="true"/></a>
  </nav>;
}

export function WorkInProgress({locale}:{locale:Locale}) {
  const c=presentation[locale];
  return <section className="work-in-progress" id="in-development" aria-labelledby="wip-heading"><p className="eyebrow">{c.nav.resources}</p><h2 id="wip-heading">{c.wipTitle}</h2><p>{c.wipIntro}</p><div>{c.wip.map(([title,desc])=><article key={title}><h3>{title}</h3><p>{desc}</p></article>)}</div></section>;
}
