import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CircleCheck, Globe2, GraduationCap, Workflow } from 'lucide-react';
import { type Locale, localizedPath } from '@/data/i18n';
import { presentation } from '@/data/presentation';
import { ServiceCards } from '@/components/services';
import s from './home-v2.module.css';

const marks=[Globe2,Workflow,GraduationCap];

export function HomeV2({locale='en'}:{locale?:Locale}) {
  const c=presentation[locale];
  return <div className={s.home}>
    <section className={s.hero} aria-labelledby="home-v2-heading">
      <div className={s.heroText}><p className={s.identity}>Marcelo Fernandez <span>{c.portfolio}</span></p>
        <h1 id="home-v2-heading">{c.first}<br/><span>{c.second}</span></h1>
        <p className={s.intro}>{c.intro}</p><p className={s.honest}>{c.signature}</p>
        <div className={s.heroActions}><Link className={s.primaryAction} href={localizedPath('/contact/',locale)}>{c.nav.contact}<ArrowRight size={17} aria-hidden="true"/></Link><a className={s.secondaryAction} href="#projects-v2">{c.explore}<ArrowRight size={17} aria-hidden="true"/></a></div>
        <p className={s.heroNote}><CircleCheck size={14} aria-hidden="true"/>{c.note}</p>
      </div>
      <div className={s.heroVisual}><div className={s.orbitOne} aria-hidden="true"/><div className={s.orbitTwo} aria-hidden="true"/>
        <div className={s.visualPanel}><div className={s.visualHead}><span className={s.visualSignal} aria-hidden="true"/>{c.visualTitle}</div>
          {c.selected.map((project,index)=>{const Mark=marks[index];return <Link className={`${s.visualRow} ${s.visualWork}`} key={project.path} href={localizedPath(project.path,locale)}><span className={s.visualIndex}><Mark size={17} aria-hidden="true"/></span><span className={s.exampleText}><strong>{project.title}</strong><span>{project.category}</span></span><ArrowUpRight size={15} aria-hidden="true"/></Link>;})}
          <p className={s.visualBottom}>{c.visualNote}</p></div>
      </div>
    </section>
    <section id="services" className={s.section} aria-labelledby="home-services"><div className={s.sectionHeading}><div><p className={s.eyebrow}>{c.servicesEyebrow}</p><h2 id="home-services">{c.servicesTitle}</h2><p className={s.sectionLead}>{c.servicesIntro}</p></div></div><ServiceCards locale={locale}/></section>
    <section id="projects-v2" className={s.section} aria-labelledby="home-v2-projects"><div className={s.sectionHeading}><div><p className={s.eyebrow}>{c.selectedEyebrow}</p><h2 id="home-v2-projects">{c.selectedTitle}</h2><p className={s.sectionLead}>{c.selectedIntro}</p></div></div>
      <div className={`${s.featuredGrid} ${s.selectedGrid}`}>{c.selected.map((project,index)=>{const Mark=marks[index];return <Link key={project.path} className={`${s.featuredCard} ${index===0?s.accentPrometeus:index===1?s.accentVerum:s.accentRisto}`} href={localizedPath(project.path,locale)}><div className={`${s.featuredBody} ${s.selectedBody}`}><p className={s.cardTag}><Mark size={20} aria-hidden="true"/>{project.category}</p><h3>{project.title}</h3><p className={s.cardDescription}>{project.desc}</p><span className={s.cardAction}>{c.proof}<ArrowUpRight size={16} aria-hidden="true"/></span></div></Link>;})}</div>
      <Link className={s.allProjects} href={localizedPath('/projects/',locale)}>{c.allProjects}<ArrowRight size={16} aria-hidden="true"/></Link>
    </section>
    <section className={s.methodSection} aria-labelledby="home-method"><div className={s.sectionHeading}><div><p className={s.eyebrow}>{c.methodEyebrow}</p><h2 id="home-method">{c.methodTitle}</h2></div></div><div className={s.methodGrid}>{c.method.map(([title,desc],i)=><div key={title} className={s.methodStep}><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>
    <section className={s.aboutBand} aria-labelledby="home-about"><div><p className={s.eyebrow}>{c.aboutEyebrow}</p><h2 id="home-about">{c.aboutTitle}</h2><p>{c.aboutText}</p></div><div className={s.aboutLinks}><Link href={localizedPath('/about/',locale)} className={s.secondaryAction}>{c.aboutLink}<ArrowRight size={16} aria-hidden="true"/></Link><Link href={localizedPath('/resources/',locale)} className="text-link">{c.nav.resources}<ArrowUpRight size={15} aria-hidden="true"/></Link></div></section>
    <section className={s.contactBand} aria-labelledby="home-contact"><div><h2 id="home-contact">{c.contactTitle}</h2><p>{c.contactText}</p></div><div className={s.contactActions}><Link className={s.contactButton} href={localizedPath('/contact/',locale)}>{c.nav.contact}<ArrowRight size={17} aria-hidden="true"/></Link><p className={s.contactNote}>{c.contactNote}</p></div></section>
  </div>;
}
