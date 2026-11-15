import Link from 'next/link';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, GraduationCap, House, GitBranch, MapPinned, Music2, Newspaper, Sparkles } from 'lucide-react';
import { type Locale, localizedPath } from '@/data/i18n';
import { assetUrl } from '@/data/portfolio';
import s from './link-hub.module.css';

type Trilingual = Record<Locale, string>;
type Project = { name: string; url: string; category: Trilingual; description: Trilingual; icon: typeof Sparkles; accent: string };
const projects: Project[] = [
  { name: 'RISTO-LAB', url: 'https://manzo8b.github.io/risto-lab/', icon: GraduationCap, accent: 'blue', category: { it: 'Formazione professionale', en: 'Professional training', es: 'Formación profesional' }, description: { it: 'Didattica, strumenti e risorse pratiche per il mondo della ristorazione', en: 'Practical teaching, tools and resources for hospitality professionals', es: 'Didáctica, herramientas y recursos prácticos para la hostelería' } },
  { name: 'S-COMODO', url: 'https://manzo8b.github.io/s-comodo/', icon: Newspaper, accent: 'coral', category: { it: 'Blog indipendente', en: 'Independent editorial', es: 'Editorial independiente' }, description: { it: 'Uno spazio di idee, analisi e articoli che interrogano il presente', en: 'An independent space for ideas, analysis and thoughtful journalism', es: 'Un espacio independiente de ideas, análisis y artículos' } },
  { name: 'Lune_X', url: 'https://manzo8b.github.io/Lune_X/', icon: Music2, accent: 'rose', category: { it: 'Progetto musicale', en: 'Music project', es: 'Proyecto musical' }, description: { it: 'Identità sonora, produzione musicale e creatività con AI generativa', en: 'Sound identity, music production and generative-AI creativity', es: 'Identidad sonora, producción musical y creatividad con IA generativa' } },
  { name: 'TORREMOLINOS', url: 'https://manzo8b.github.io/Torremolinos/', icon: MapPinned, accent: 'aqua', category: { it: 'Guida digitale indipendente', en: 'Independent digital guide', es: 'Guía digital independiente' }, description: { it: 'Una guida contemporanea alla città, alle esperienze e agli eventi', en: 'A contemporary guide to the city, its experiences and events', es: 'Una guía contemporánea de la ciudad, sus experiencias y eventos' } },
  { name: 'Villa All’Ombra dei Pitosfori', url: 'https://www.villapitosfori.com/', icon: House, accent: 'sage', category: { it: 'Ospitalità · Salento', en: 'Hospitality · Salento', es: 'Hospitalidad · Salento' }, description: { it: 'Il sito ufficiale della villa: un’esperienza di ospitalità nel Salento', en: 'The villa’s official website: a hospitality experience in Salento', es: 'La web oficial de la villa: una experiencia de hospitalidad en Salento' } },
];
const profiles = [
  { name: 'GitHub', url: 'https://github.com/manzo8b', icon: GitBranch, description: { it: 'Codice e repository', en: 'Code and repositories', es: 'Código y repositorios' } },
  { name: 'Agensi', url: 'https://www.agensi.io/creators/marcelo-javier-fernandez-caballero', icon: Sparkles, description: { it: 'Profilo creator · Skill AI', en: 'Creator profile · AI skills', es: 'Perfil de creador · Skills IA' } },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/marcelo-fernandez-cab/', icon: BriefcaseBusiness, description: { it: 'Profilo professionale', en: 'Professional profile', es: 'Perfil profesional' } },
];
const copy = {
  it: { eyebrow: 'MARCELUS / DIGITAL ECOSYSTEM', titleA: 'Tutto ciò che creo.', titleB: 'In un solo posto.', intro: 'Tecnologia, formazione, idee, musica e ospitalità. Un unico punto di accesso ai progetti e ai profili professionali di Marcelo Fernandez.', scroll: 'Esplora i collegamenti', featured: 'PROGETTO IN EVIDENZA', featuredTag: 'AI · WEB · STRUMENTI DIGITALI', featuredText: 'MANZO AI', featuredDescription: 'Il laboratorio digitale per costruire, imparare e sperimentare nuove possibilità con l’intelligenza artificiale.', visit: 'Visita il sito', projectsLabel: '01 / PROGETTI', projectsTitle: 'Esplora l’ecosistema', projectsIntro: 'Ogni progetto ha una propria identità. Scopri quello che ti interessa.', profilesLabel: '02 / PROFILI', profilesTitle: 'Rimaniamo connessi', profilesIntro: 'Repository, Skill e percorso professionale', back: 'Torna al portfolio', close: 'Più di un elenco di link', closeText: 'Questo spazio è parte di MARCELUS: un’identità, progetti distinti e un modo concreto di trasformare idee in strumenti.', external: 'Si apre in una nuova scheda' },
  en: { eyebrow: 'MARCELUS / DIGITAL ECOSYSTEM', titleA: 'Everything I create.', titleB: 'In one place.', intro: 'Technology, education, ideas, music and hospitality. One place to explore Marcelo Fernandez’s projects and professional profiles.', scroll: 'Explore the links', featured: 'FEATURED PROJECT', featuredTag: 'AI · WEB · DIGITAL TOOLS', featuredText: 'MANZO AI', featuredDescription: 'A digital laboratory for building, learning and exploring new possibilities with artificial intelligence.', visit: 'Visit website', projectsLabel: '01 / PROJECTS', projectsTitle: 'Explore the ecosystem', projectsIntro: 'Each project has its own identity. Discover what interests you.', profilesLabel: '02 / PROFILES', profilesTitle: 'Stay connected', profilesIntro: 'Repositories, Skills and professional experience', back: 'Back to portfolio', close: 'More than a list of links', closeText: 'This page is part of MARCELUS: one identity, distinct projects and a practical way of turning ideas into tools.', external: 'Opens in a new tab' },
  es: { eyebrow: 'MARCELUS / ECOSISTEMA DIGITAL', titleA: 'Todo lo que creo.', titleB: 'En un solo lugar.', intro: 'Tecnología, formación, ideas, música y hospitalidad. Un punto de acceso a los proyectos y perfiles profesionales de Marcelo Fernandez.', scroll: 'Explorar enlaces', featured: 'PROYECTO DESTACADO', featuredTag: 'IA · WEB · HERRAMIENTAS DIGITALES', featuredText: 'MANZO AI', featuredDescription: 'Un laboratorio digital para crear, aprender y explorar nuevas posibilidades con inteligencia artificial.', visit: 'Visitar sitio', projectsLabel: '01 / PROYECTOS', projectsTitle: 'Explora el ecosistema', projectsIntro: 'Cada proyecto tiene su propia identidad. Descubre lo que más te interesa.', profilesLabel: '02 / PERFILES', profilesTitle: 'Sigamos conectados', profilesIntro: 'Repositorios, Skills y experiencia profesional', back: 'Volver al portafolio', close: 'Más que una lista de enlaces', closeText: 'Este espacio forma parte de MARCELUS: una identidad, proyectos diferentes y una forma práctica de convertir ideas en herramientas.', external: 'Se abre en otra pestaña' },
} satisfies Record<Locale, Record<string,string>>;

export function LinkHub({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <div className={s.hub}>
    <section className={s.hero} aria-labelledby="links-title">
      <div className={s.heroGlow} aria-hidden="true" />
      <div className={s.heroContent}>
        <div className={s.eyebrow}><span className={s.statusDot} aria-hidden="true" />{c.eyebrow}</div>
        <h1 id="links-title">{c.titleA}<span>{c.titleB}</span></h1>
        <p>{c.intro}</p>
        <a href="#ecosystem-projects" className={s.heroJump}>{c.scroll}<ArrowDownRight size={19} aria-hidden="true" /></a>
      </div>
      <div className={s.heroArtwork} aria-hidden="true">
        <span className={s.artOrbitOne} /><span className={s.artOrbitTwo} />
        <div className={s.artCore}><img src={assetUrl('/media/manzo-mark.svg')} alt="" width={91} height={91} /><span>MARCELUS</span></div>
        <span className={s.artChipA}>DESIGN <span>✳</span></span><span className={s.artChipB}>AI <span>↗</span></span><span className={s.artChipC}>CREATE <span>✦</span></span>
      </div>
    </section>

    <section className={s.catalogue} id="ecosystem-projects" aria-labelledby="links-projects-title">
      <div className={s.sectionHeading}>
        <div><span className={s.sectionKicker}>{c.projectsLabel}</span><h2 id="links-projects-title">{c.projectsTitle}</h2><p>{c.projectsIntro}</p></div>
        <div className={s.sectionCount} aria-hidden="true">06<span>PROJECTS</span></div>
      </div>
      <a className={s.featured} href="https://manzo8b.github.io/manzo-ai/it/" target="_blank" rel="noopener noreferrer" aria-label={c.featuredText + ' — ' + c.visit + '. ' + c.external}>
        <div className={s.featuredCopy}>
          <span className={s.featuredEyebrow}><Sparkles size={16} aria-hidden="true" />{c.featured}</span>
          <span className={s.featuredTag}>{c.featuredTag}</span>
          <h3>{c.featuredText}</h3>
          <p>{c.featuredDescription}</p>
          <span className={s.visitPill}>{c.visit}<ArrowUpRight size={17} aria-hidden="true" /></span>
        </div>
        <div className={s.featuredGraphic} aria-hidden="true"><span className={s.featuredRing} /><span className={s.featuredSpark}>✳</span><span className={s.featuredLetter}>M<span>.</span></span></div>
      </a>

      <div className={s.projectGrid}>
        {projects.map((item, index) => {
          const Icon = item.icon;
          return <a href={item.url} target="_blank" rel="noopener noreferrer" className={s.projectCard} data-accent={item.accent} key={item.name} aria-label={item.name + '. ' + item.category[locale] + '. ' + c.external}>
            <div className={s.cardHead}><span className={s.cardIcon}><Icon size={25} strokeWidth={1.65} aria-hidden="true" /></span><ArrowUpRight className={s.cardArrow} size={20} aria-hidden="true" /></div>
            <span className={s.cardIndex}>{String(index+2).padStart(2,'0')} / {item.category[locale]}</span>
            <h3>{item.name}</h3><p>{item.description[locale]}</p>
            <div className={s.cardBottom}><span>{c.visit}</span><ArrowRight size={18} aria-hidden="true" /></div>
          </a>;
        })}
      </div>
    </section>

    <section className={s.profiles} id="professional-profiles" aria-labelledby="links-profiles-title">
      <div className={s.sectionHeading}><div><span className={s.sectionKicker}>{c.profilesLabel}</span><h2 id="links-profiles-title">{c.profilesTitle}</h2><p>{c.profilesIntro}</p></div></div>
      <div className={s.profileGrid}>{profiles.map(item => {
        const Icon = item.icon;
        return <a key={item.name} className={s.profileCard} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name + '. ' + item.description[locale] + '. ' + c.external}>
          <span className={s.profileIcon}><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
          <span className={s.profileContent}><strong>{item.name}</strong><small>{item.description[locale]}</small></span>
          <ArrowUpRight className={s.profileArrow} size={21} aria-hidden="true" />
        </a>;
      })}</div>
    </section>

    <aside className={s.outro}><div><span className={s.sectionKicker}>MARCELUS</span><h2>{c.close}</h2><p>{c.closeText}</p></div><Link className={s.backLink} href={localizedPath('/',locale)}>{c.back}<ArrowRight size={18} aria-hidden="true" /></Link></aside>
    <div className={s.signoff}><BookOpen size={15} aria-hidden="true" /><span>MARCELUS · Marcelo Fernandez</span><BriefcaseBusiness size={15} aria-hidden="true" /></div>
  </div>;
}
