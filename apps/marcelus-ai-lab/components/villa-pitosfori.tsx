import { Breadcrumbs } from '@/components/breadcrumbs';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Globe2, ExternalLink, Mail } from 'lucide-react';
import { type Locale, localizedPath } from '@/data/i18n';
import { profile } from '@/data/portfolio';
import s from './villa-pitosfori.module.css';

const content = {
  en: {
    label: 'WEBSITE PROJECT',
    title: "Villa All'Ombra dei Pitosfori",
    subtitle: 'Hospitality and accommodation · Capilungo, Salento',
    intro: 'A website-creation project for a holiday villa in the Salento area. The site presents the property and lets visitors find accommodation information through its public website.',
    scopeTitle: 'What this project shows',
    scope: 'Experience applying clear information, visual hierarchy and practical navigation to a real hospitality website.',
    accuracyTitle: 'Project evidence',
    accuracy: 'The linked website is available to visit. This portfolio does not claim unverified traffic, conversion results, ratings, bookings or a specific technology stack.',
    action: 'Visit the website',
    contactTitle: 'Need a website for your project?',
    contactDesc: 'Tell me what you need. We can discuss the content, structure and next steps.',
    contactButton: 'Send me an email',
    contactSubject: 'Website project enquiry',
    back: 'All projects'
  },
  it: {
    label: 'PROGETTO DI REALIZZAZIONE WEB',
    title: "Villa All'Ombra dei Pitosfori",
    subtitle: 'Ospitalità e accoglienza · Capilungo, Salento',
    intro: 'Un progetto di realizzazione del sito web per una villa nel Salento. Il sito presenta la struttura e permette ai visitatori di consultare le informazioni dedicate al soggiorno.',
    scopeTitle: 'Che cosa mostra questo progetto',
    scope: 'Un’applicazione pratica della comunicazione chiara, della gerarchia visiva e di una navigazione semplice nel settore dell’ospitalità.',
    accuracyTitle: 'Stato e verificabilità',
    accuracy: 'Il sito collegato è consultabile. Il portfolio non attribuisce a questo lavoro risultati non verificati su visite, prenotazioni, conversioni o tecnologie utilizzate.',
    action: 'Visita il sito web',
    contactTitle: 'Hai bisogno di un sito web?',
    contactDesc: 'Raccontami il tuo progetto. Possiamo valutare insieme struttura, contenuti e una soluzione adatta alle tue esigenze.',
    contactButton: 'Scrivimi via email',
    contactSubject: 'Richiesta realizzazione sito web',
    back: 'Tutti i progetti'
  },
  es: {
    label: 'PROYECTO DE CREACIÓN WEB',
    title: "Villa All'Ombra dei Pitosfori",
    subtitle: 'Alojamiento y hospitalidad · Capilungo, Salento',
    intro: 'Un proyecto de creación del sitio web de una villa en Salento. Presenta el alojamiento y permite consultar información sobre la estancia.',
    scopeTitle: 'Qué demuestra el proyecto',
    scope: 'Una aplicación práctica de la comunicación clara, la jerarquía visual y una navegación sencilla para el sector turístico.',
    accuracyTitle: 'Estado y evidencias',
    accuracy: 'El sitio enlazado se puede visitar. El portfolio no atribuye resultados no verificados sobre visitas, reservas, conversiones o tecnologías utilizadas.',
    action: 'Visitar el sitio web',
    contactTitle: '¿Necesitas una página web?',
    contactDesc: 'Cuéntame tu proyecto. Podemos hablar sobre contenido, estructura y los próximos pasos.',
    contactButton: 'Escríbeme por email',
    contactSubject: 'Consulta sobre creación web',
    back: 'Todos los proyectos'
  }
} as const;

const contribution = {
  it: {title:'Il mio contributo',items:[['L’esigenza','Presentare una villa nel Salento con informazioni ordinate e percorsi semplici per chi cerca un soggiorno.'],['Il lavoro','Struttura e rifinitura dell’esperienza web su Wix, con sviluppo assistito da AI e verifiche delle pagine.'],['Gli interventi','Menu e footer più essenziali, gerarchia delle informazioni, layout desktop e mobile e metadati di base.'],['Cosa puoi vedere','Il sito pubblicato: puoi esplorare la navigazione, le pagine della villa e i collegamenti per chiedere informazioni.']]},
  en: {title:'My contribution',items:[['The need','Present a villa in Salento with well-organized information and clear paths for people planning a stay.'],['The work','Structure and refinement of the Wix website experience, with AI-assisted development and page checks.'],['The changes','A more focused menu and footer, information hierarchy, desktop and mobile layouts and essential metadata.'],['What you can explore','The published website: its navigation, property pages and links for accommodation enquiries.']]},
  es: {title:'Mi aportación',items:[['La necesidad','Presentar una villa en Salento con información ordenada y recorridos claros para quien busca alojamiento.'],['El trabajo','Estructura y mejora de la experiencia web en Wix, con desarrollo asistido por IA y revisión de las páginas.'],['Los cambios','Menú y pie de página más concisos, jerarquía de información, diseño móvil y de escritorio y metadatos básicos.'],['Qué puedes explorar','El sitio publicado: su navegación, las páginas del alojamiento y los enlaces para solicitar información.']]}
} as const;

const site = 'https://www.villapitosfori.com/';

export function VillaPitosforiOverview({ locale='en' }: { locale?: Locale }) {
  const c=content[locale];
  return <article className={s.root}>
    <Breadcrumbs locale={locale} items={[{name:c.back,path:'/projects/'},{name:c.title,path:'/projects/villa-pitosfori/'}]}/>
    <div className={s.hero}>
      <span className={s.label}><Globe2 size={17} aria-hidden="true" />{c.label}</span>
      <h1>{c.title}</h1>
      <p className={s.subtitle}>{c.subtitle}</p>
      <p className={s.lead}>{c.intro}</p>
      <a href={site} target="_blank" rel="noreferrer" className={s.action}>{c.action}<ExternalLink size={17} aria-hidden="true"/></a>
    </div>
    <section className="villa-contribution" aria-labelledby="villa-contribution"><h2 id="villa-contribution">{contribution[locale].title}</h2><dl>{contribution[locale].items.map(([label,text])=><div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl></section>
    <div className={s.twoColumns}>
      <section><h2>{c.scopeTitle}</h2><p>{c.scope}</p></section>
      <section><h2>{c.accuracyTitle}</h2><p>{c.accuracy}</p></section>
    </div>
    <a className={s.siteText} href={site} target="_blank" rel="noreferrer">www.villapitosfori.com<ArrowUpRight size={16} aria-hidden="true" /></a>
    <aside className={s.contactCard} aria-label={c.contactTitle}>
      <div><h2>{c.contactTitle}</h2><p>{c.contactDesc}</p></div>
      <a href={`mailto:${profile.email}?subject=${encodeURIComponent(c.contactSubject)}`} className={s.contactButton}>
        <Mail size={17} aria-hidden="true"/>{c.contactButton}
      </a>
    </aside>
  </article>;
}
