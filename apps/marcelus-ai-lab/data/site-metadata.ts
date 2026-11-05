import { type Locale, localizedPath, t } from './i18n.ts';

export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'http://127.0.0.1:3210';
export function absoluteUrl(path: string) { return new URL(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`, siteOrigin).href; }
export function pageMetadata(path: string, locale: Locale = 'en', title = 'Marcelo Fernandez', description = t(locale, 'Prompt design, content evaluation and practical training, with documentary evidence and explicit limits.')) {
  const absolute = absoluteUrl;
  const localeIndex = locale === 'en' ? 0 : locale === 'it' ? 1 : 2;
  const routeTitles: Record<string, readonly string[]> = {
    '/services/':['Services — Websites, AI and training','Servizi — Siti web, AI e formazione','Servicios — Sitios web, IA y formación'],
    '/contact/':['Contact Marcelo Fernandez','Contatti — Marcelo Fernandez','Contacto — Marcelo Fernandez'],
    '/projects/verum/':['VERUM — AI evaluation and fact-checking','VERUM — Valutazione AI e verifica dei fatti','VERUM — Evaluación de IA y verificación de hechos'],
    '/projects/prometeus/':['Prometeus Marcelus — AI instructions and workflows','Prometeus Marcelus — Istruzioni e procedure AI','Prometeus Marcelus — Instrucciones y procesos de IA'],
    '/projects/risto-lab/':['RISTO-LAB — Training and procedures','RISTO-LAB — Formazione e procedure','RISTO-LAB — Formación y procedimientos'],
    '/projects/villa-pitosfori/':["Villa All’Ombra dei Pitosfori — Website project","Villa All’Ombra dei Pitosfori — Progetto web","Villa All’Ombra dei Pitosfori — Proyecto web"],
    '/projects/s-comodo/':['S-COMODO — Independent editorial','S-COMODO — Editoria indipendente','S-COMODO — Editorial independiente'],
    '/library/':['AI instruction library — Prometeus','Biblioteca di istruzioni AI — Prometeus','Biblioteca de instrucciones de IA — Prometeus'],
  };
  if (routeTitles[path]) title=routeTitles[path][localeIndex];
  const legalDescriptions: Record<string, readonly string[]> = {
    '/legal/':['Ownership, project-based services, content scope and material rights for the portfolio of Marcelo Fernandez.','Identità, servizi su progetto, ambito dei contenuti e diritti sui materiali del portfolio di Marcelo Fernandez.','Identidad, servicios por proyecto, alcance de los contenidos y derechos sobre los materiales del portafolio de Marcelo Fernandez.'],
    '/legal/privacy/':['How the portfolio handles technical visits and email correspondence, with information about providers, retention and privacy rights.','Come il portfolio tratta i dati tecnici di visita e le comunicazioni email: fornitori, conservazione e diritti sulla privacy.','Cómo trata el portafolio los datos técnicos de visita y los correos: proveedores, conservación y derechos de privacidad.'],
    '/legal/cookies/':['Information about the local theme preference, cookies and external links on the portfolio.','Informazioni sulla preferenza del tema salvata nel browser, sui cookie e sui collegamenti esterni del portfolio.','Información sobre la preferencia de tema guardada en el navegador, las cookies y los enlaces externos del portafolio.'],
  };
  if (legalDescriptions[path]) description=legalDescriptions[path][localeIndex];

  if (path === '/recruiter/') description = t(locale, 'Recruiter overview: background, selected evidence, languages and collaboration.');
  if (path === '/library/') description = t(locale, 'Structured instructions, training and documented workflows. Original library entries in Italian.');
  const canonical = absolute(localizedPath(path, locale));
  const project = path.match(/^\/projects\/(verum|prometeus|risto-lab)\/$/)?.[1];
  const image = absolute(`/media/og-${project || 'portfolio'}.png`);
  return {
    title, description,
    alternates: { canonical, languages: Object.fromEntries((['en', 'it', 'es'] as const).map(language => [language, absolute(localizedPath(path, language))])) },
    icons: { icon: [{ url: absolute('/favicon-32.png'), type: 'image/png', sizes: '32x32' }, { url: absolute('/favicon.ico'), type: 'image/x-icon', sizes: '16x16 32x32 48x48' }, { url: absolute('/favicon-192.png'), type: 'image/png', sizes: '192x192' }], apple: [{ url: absolute('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' }] },
    openGraph: { title, description, url: canonical, siteName: 'MARCELUS', type: 'website' as const, locale: locale === 'en' ? 'en_US' : locale === 'it' ? 'it_IT' : 'es_ES', images: [{ url: image, width: 1200, height: 630, alt: project ? title : 'Marcelo Fernandez / AI Evaluation, Training & Workflow Design' }] },
    twitter: { card: 'summary_large_image' as const, title, description, images: [image] },
  };
}
