import Link from 'next/link';
import { profile } from '@/data/portfolio';
import { legalOwnerName } from '@/data/legal-identity';
import { type Locale, localizedPath } from '@/data/i18n';

export type LegalKind = 'notice' | 'privacy' | 'cookies';
type Section = { heading: string; paragraphs: string[] };
type PageCopy = { title: string; subtitle: string; sections: Section[] };
type Labels = { updated: string; controller: string; contact: string; more: string; notice: string; privacy: string; cookies: string };
const labels: Record<Locale, Labels> = {
  it: {
    updated: 'Ultimo aggiornamento: 5 novembre 2026',
    controller: 'Titolare del trattamento / responsabile del portfolio',
    contact: 'Contatto pubblico',
    more: 'Altre informazioni',
    notice: 'Informazioni legali',
    privacy: 'Privacy',
    cookies: 'Cookie e tecnologie locali',
  },
  en: {
    updated: 'Last updated: 5 November 2026',
    controller: 'Data controller / portfolio owner',
    contact: 'Public contact',
    more: 'Related information',
    notice: 'Legal notice',
    privacy: 'Privacy',
    cookies: 'Cookies and local technologies',
  },
  es: {
    updated: 'Última actualización: 5 de noviembre de 2026',
    controller: 'Responsable del tratamiento / titular del portafolio',
    contact: 'Contacto público',
    more: 'Información relacionada',
    notice: 'Aviso legal',
    privacy: 'Privacidad',
    cookies: 'Cookies y tecnologías locales',
  },
};

const documents: Record<Locale, Record<LegalKind, PageCopy>> = {
  it: {
    notice: {
      title: 'Informazioni legali',
      subtitle: 'Identità, natura del portfolio, limiti delle dimostrazioni e diritti sui materiali.',
      sections: [
        { heading: 'Natura del progetto', paragraphs: [
          'MARCELUS è il portfolio personale di Marcelo Fernandez. Presenta lavori, servizi su progetto e un laboratorio indipendente, con strumenti ed esempi sviluppati anche con assistenza AI.',
          'Il sito permette di conoscere il lavoro e chiedere informazioni via email o LinkedIn. Non gestisce ordini, acquisti, pagamenti o sottoscrizioni di contratti online. Disponibilità, ambito, tempi e condizioni di ogni collaborazione si concordano direttamente prima dell’avvio.',
        ] },
        { heading: 'Contenuti, esempi e limitazioni', paragraphs: [
          'I casi sintetici e le dimostrazioni preparate sono identificati come tali. Non costituiscono automaticamente risultati di clienti, prove di impiego produttivo, misure indipendenti di accuratezza o verifiche universali dal vivo.',
          'I materiali sono informativi e formativi e non sostituiscono valutazioni specialistiche, consulenze professionali o controlli richiesti dalla normativa applicabile.',
        ] },
        { heading: 'Autori, copyright e risorse di terzi', paragraphs: [
          'Le condizioni di riutilizzo dei materiali sono quelle delle licenze esplicitamente associate ai singoli file e progetti. La presenza di una licenza in un repository non autorizza automaticamente il riutilizzo di marchi, fotografie o materiali di terzi.',
          'I nomi dei prodotti e i marchi di altre organizzazioni appartengono ai rispettivi titolari. I crediti e gli avvisi relativi alle dipendenze open source restano consultabili nella documentazione del progetto.',
        ] },
        { heading: 'Collegamenti esterni e aggiornamenti', paragraphs: [
          'I collegamenti verso repository, siti di terzi e social network conducono a servizi autonomi con condizioni proprie. I contenuti possono essere corretti o aggiornati per riflettere lo stato documentato dei progetti.',
          'Le descrizioni dei servizi illustrano gli ambiti di collaborazione. Eventuali nuove modalità di acquisto, pagamento o raccolta dei dati richiederanno informazioni aggiornate prima dell’attivazione.',
        ] },
      ],
    },
    privacy: {
      title: 'Informativa sulla privacy',
      subtitle: 'Come possono essere trattati i dati durante la visita e quando si scrive al contatto pubblico.',
      sections: [
        { heading: 'Dati trattati e finalità', paragraphs: [
          'Il sito è un portfolio statico: non offre account visitatore, moduli di registrazione, checkout o una API che riceve i testi inseriti nelle dimostrazioni. Le interazioni locali delle demo non sono destinate all’invio al titolare.',
          'Per la sicurezza e l’erogazione delle pagine, GitHub Pages dichiara di registrare l’indirizzo IP dei visitatori, anche senza accesso a GitHub. Il relativo trattamento tecnico dipende dall’infrastruttura del fornitore.',
          'Se un visitatore invia volontariamente un messaggio all’indirizzo email pubblico, saranno trattati l’indirizzo del mittente e i dati inclusi nel messaggio per leggere e gestire la comunicazione.',
        ] },
        { heading: 'Basi giuridiche', paragraphs: [
          'Il trattamento delle comunicazioni inviate volontariamente si fonda sul legittimo interesse del titolare a leggere i messaggi, rispondere e proteggere il proprio portfolio (art. 6, par. 1, lett. f, GDPR), nel rispetto dei diritti degli interessati. Il fornitore di hosting gestisce autonomamente i dati tecnici raccolti per la sicurezza dei suoi servizi, secondo la propria informativa.',
          'Non si richiede un consenso generale alla privacy per consultare il sito. L’eventuale introduzione futura di tecnologie non necessarie soggette a consenso richiederà una verifica e un meccanismo appropriato prima dell’attivazione.',
        ] },
        { heading: 'Destinatari e fornitori', paragraphs: [
          'Le pagine sono ospitate su GitHub Pages; i messaggi inviati al contatto pubblico sono ricevuti tramite Gmail (Google). GitHub e Google operano secondo le condizioni e le informative privacy dei rispettivi servizi. Il sito non trasmette al titolare i testi immessi nelle demo locali.',
          'Informative: GitHub https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement — Google https://policies.google.com/privacy?hl=it — Hosting https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages',
        ] },
        { heading: 'Trasferimenti internazionali', paragraphs: [
          'GitHub e Google utilizzano infrastrutture e organizzazioni internazionali: alcuni trattamenti possono avvenire anche fuori dallo Spazio economico europeo. I meccanismi e le garanzie relativi ai trasferimenti internazionali sono descritti nelle informative privacy aggiornate dei rispettivi fornitori, consultabili dai collegamenti riportati in questa pagina.',
        ] },
        { heading: 'Conservazione', paragraphs: [
          'Il sito attuale non legge né salva preferenze grafiche. Eventuali preferenze di versioni precedenti possono restare nei dati locali del browser fino alla loro rimozione. I dati tecnici registrati da GitHub seguono le condizioni e i periodi definiti dal fornitore.',
          'Per le email inviate volontariamente al contatto del portfolio si adotta, come regola di conservazione, la cancellazione entro 12 mesi dall’ultima comunicazione pertinente, oppure prima se il messaggio non è più necessario. I messaggi indesiderati privi di interesse vengono eliminati normalmente entro 30 giorni. Eventuali comunicazioni da conservare per un obbligo di legge o per una specifica controversia sono gestite separatamente per il solo tempo giustificato dalla relativa finalità. Il titolare verifica la casella di posta almeno ogni tre mesi per applicare questi criteri.',
        ] },
        { heading: 'Diritti degli interessati', paragraphs: [
          'Nei casi e nei limiti previsti dal GDPR, si possono richiedere accesso, rettifica, cancellazione, limitazione del trattamento e opposizione; quando ne ricorrono i presupposti, anche portabilità e altri diritti applicabili.',
          'Le richieste possono essere inviate al contatto email pubblico. Verrà fornito riscontro senza ingiustificato ritardo, di regola entro un mese dal ricevimento, salvo proroghe consentite dal GDPR. È possibile presentare reclamo al Garante per la protezione dei dati personali (https://www.garanteprivacy.it/).',
        ] },
        { heading: 'Conferimento dei dati e decisioni automatizzate', paragraphs: [
          'Non è necessario inviare dati personali per consultare il portfolio. Il contenuto delle email è fornito volontariamente, ma un recapito di risposta è normalmente necessario per rispondere al messaggio.',
          'Il sito non effettua decisioni automatizzate sui visitatori né profilazione tramite sistemi sviluppati dal portfolio, secondo le funzionalità attualmente documentate.',
        ] },
        { heading: 'Aggiornamenti', paragraphs: [
          'Questa informativa verrà aggiornata in caso di introduzione di nuovi servizi, moduli, misurazioni, account o sistemi di trattamento.',
        ] },
      ],
    },
    cookies: {
      title: 'Cookie e tecnologie locali',
      subtitle: 'Informazioni sulle preferenze del browser e sui possibili strumenti di tracciamento.',
      sections: [
        { heading: 'Aspetto e dati locali', paragraphs: [
          'Il portfolio utilizza un aspetto chiaro e non salva nuove preferenze grafiche. Le versioni precedenti potevano salvare la chiave “marcelus-theme”: il sito attuale non la legge e non la utilizza.',
          'Eventuali preferenze precedenti possono essere eliminate dalle impostazioni dei dati del sito nel browser.',
        ] },
        { heading: 'Cookie, analytics e pubblicità', paragraphs: [
          'Nel codice attualmente esaminato non risultano strumenti pubblicitari, pixel di profilazione o integrazioni di analytics. Non è previsto un banner di consenso per tecnologie non installate.',
          'Le risorse caricate dal browser e le impostazioni dei servizi esterni possono variare nel tempo: la presente informativa sarà aggiornata qualora vengano introdotti ulteriori strumenti.',
        ] },
        { heading: 'Servizi esterni', paragraphs: [
          'L’apertura volontaria di collegamenti a GitHub, LinkedIn o altri siti conduce a servizi esterni che applicano politiche e tecnologie proprie.',
        ] },
        { heading: 'Come eliminare i dati locali', paragraphs: [
          'Eventuali dati locali di versioni precedenti possono essere eliminati tramite le funzioni di cancellazione dei dati del proprio browser.',
        ] },
        { heading: 'Modifiche future', paragraphs: [
          'Qualora vengano introdotti analytics non esenti, tecnologie pubblicitarie o altri strumenti che richiedano consenso, verranno aggiornate l’informativa e la gestione preventiva del consenso prima dell’attivazione.',
        ] },
      ],
    },
  },
  en: {
    notice: {
      title: 'Legal notice',
      subtitle: 'Ownership, portfolio status, limitations of demonstrations and intellectual property.',
      sections: [
        { heading: 'Nature of the project', paragraphs: [
          'MARCELUS is the personal portfolio of Marcelo Fernandez. It presents work, project-based services and an independent lab, including tools and examples developed with AI assistance.',
          'The website lets visitors explore the work and enquire by email or LinkedIn. It does not process orders, purchases, payments or online contract acceptance. Availability, scope, timing and terms are agreed directly before a collaboration begins.',
        ] },
        { heading: 'Content and limitations', paragraphs: [
          'Synthetic case studies and prepared demonstrations are clearly labelled. They do not automatically establish client work, production deployment, independent accuracy measurements or universal live verification.',
          'Materials are informational and educational; they are not a substitute for specialist assessment or compliance checks.',
        ] },
        { heading: 'Rights and third-party materials', paragraphs: [
          'Reuse conditions depend on the licences expressly attached to each file or project. A repository licence does not automatically grant rights to third-party images, names or marks.',
          'Third-party trademarks belong to their owners. Open-source notices can be found in the project documentation.',
        ] },
        { heading: 'External links and updates', paragraphs: [
          'Links to other sites and social platforms lead to independently operated services. Project descriptions may be updated to reflect documented evidence and development status.',
          'Service descriptions explain possible areas of collaboration. New purchasing, payment or data-collection features would require updated information before activation.',
        ] },
      ],
    },
    privacy: {
      title: 'Privacy notice',
      subtitle: 'Information about data involved in visiting the website and contacting the portfolio owner.',
      sections: [
        { heading: 'Data and purposes', paragraphs: [
          'This is a static portfolio with no visitor accounts, registration forms, checkout or API collecting demonstration input. Documented local demo interactions are not intended to be transmitted to the owner.',
          'GitHub Pages states that it logs visitors’ IP addresses for security purposes even when they are not signed into GitHub.',
          'If you voluntarily send an email to the public contact address, your sender address and message content are processed to read and respond to that communication.',
        ] },
        { heading: 'Legal bases', paragraphs: [
          'Voluntary correspondence is handled on the basis of the owner’s legitimate interests in reading and replying to messages and protecting the portfolio (Article 6(1)(f) GDPR), subject to data-subject rights. The hosting provider separately handles technical data collected for its own service security in accordance with its privacy notice.',
          'No blanket privacy consent is required merely to browse the website. Optional technologies requiring consent would need appropriate assessment and controls before being introduced.',
        ] },
        { heading: 'Providers and recipients', paragraphs: [
          'Pages are hosted on GitHub Pages; email sent to the public contact is received through Gmail (Google). GitHub and Google each operate under the terms and privacy notices of their own services. Local demonstration inputs are not sent to the portfolio owner.',
          'Provider notices: GitHub https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement — Google https://policies.google.com/privacy?hl=en — Hosting https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages',
        ] },
        { heading: 'International transfers', paragraphs: [
          'GitHub and Google operate global infrastructures and organizations: some processing may take place outside the European Economic Area. The providers describe applicable international transfer mechanisms and safeguards in their current privacy notices, linked in this page.',
        ] },
        { heading: 'Retention', paragraphs: [
          'The current site does not read or store display preferences. Preferences saved by older versions may remain in browser storage until removed. GitHub retains security logs according to its own policies.',
          'As a retention rule, ordinary emails sent voluntarily to the portfolio contact will be deleted within 12 months after the last relevant exchange, or earlier if no longer needed. Unwanted messages without a legitimate purpose will normally be deleted within 30 days. Messages that must be retained to meet a specific legal duty or for a concrete dispute will be handled separately and only for the necessary justified period. The owner reviews the mailbox at least every three months to apply this rule.',
        ] },
        { heading: 'Your rights', paragraphs: [
          'Where applicable under GDPR, you may request access, rectification, erasure, restriction or objection, and portability where its legal conditions apply.',
          'Send relevant requests to the published email contact. A response will be provided without undue delay, generally within one month of receipt, subject to extensions permitted by GDPR. You may lodge a complaint with the Italian data protection authority: https://www.garanteprivacy.it/.',
        ] },
        { heading: 'Voluntary information and automated decisions', paragraphs: [
          'No personal information needs to be submitted to read this portfolio. Emails are voluntary; a return address is normally necessary for a response.',
          'The documented website does not perform automated decisions about visitors or profiling through portfolio-controlled systems.',
        ] },
        { heading: 'Changes', paragraphs: [
          'This notice will be updated if accounts, contact forms, tracking, payment options or other personal-data processing features are introduced.',
        ] },
      ],
    },
    cookies: {
      title: 'Cookies and local technologies',
      subtitle: 'How browser preferences and optional tracking technologies are handled.',
      sections: [
        { heading: 'Appearance and local data', paragraphs: [
          'The portfolio uses a light appearance and does not save new display preferences. Earlier versions could store the key “marcelus-theme”; the current site does not read or use it.',
          'Any previous display preferences can be removed through the browser’s site-data settings.',
        ] },
        { heading: 'Cookies and analytics', paragraphs: [
          'No advertising pixels, profiling tools or analytics integrations were identified in the reviewed application code. A consent banner for tools that are not installed is not planned.',
          'Browser-loaded resources and third-party service settings may change over time; this notice will be updated if additional technologies are introduced.',
        ] },
        { heading: 'External services', paragraphs: [
          'Following links to GitHub, LinkedIn or other external websites takes visitors to services with their own policies and technologies.',
        ] },
        { heading: 'Managing storage', paragraphs: [
          'Visitors can remove any local data saved by earlier versions through their browser controls.',
        ] },
        { heading: 'Future changes', paragraphs: [
          'If non-exempt analytics, advertising or other consent-based tracking are introduced, this notice and prior-consent controls will be updated before activation.',
        ] },
      ],
    },
  },
  es: {
    notice: {
      title: 'Aviso legal',
      subtitle: 'Responsabilidad del sitio, naturaleza del portafolio, límites de las demostraciones y propiedad intelectual.',
      sections: [
        { heading: 'Naturaleza del proyecto', paragraphs: [
          'MARCELUS es el portafolio personal de Marcelo Fernandez. Presenta trabajos, servicios por proyecto y un laboratorio independiente, con herramientas y ejemplos desarrollados con asistencia de IA.',
          'El sitio permite conocer el trabajo y solicitar información por email o LinkedIn. No tramita pedidos, compras, pagos ni aceptación de contratos en línea. La disponibilidad, el alcance, los plazos y las condiciones se acuerdan directamente antes de empezar.',
        ] },
        { heading: 'Contenidos y límites', paragraphs: [
          'Los casos sintéticos y las demostraciones preparadas se identifican expresamente. No acreditan por sí mismos trabajos para clientes, despliegues productivos, mediciones independientes de precisión ni verificaciones universales en tiempo real.',
          'Los materiales son informativos y educativos; no sustituyen evaluaciones especializadas ni verificaciones normativas.',
        ] },
        { heading: 'Derechos y materiales de terceros', paragraphs: [
          'Las condiciones de reutilización dependen de las licencias expresamente asociadas a cada archivo o proyecto. Una licencia del repositorio no concede automáticamente derechos sobre imágenes, nombres o marcas de terceros.',
          'Las marcas pertenecen a sus respectivos titulares. Los avisos de software libre figuran en la documentación del proyecto.',
        ] },
        { heading: 'Enlaces y actualizaciones', paragraphs: [
          'Los enlaces externos conducen a sitios gestionados por otros responsables. Las descripciones pueden actualizarse de acuerdo con el estado documentado de los proyectos.',
          'Las descripciones de los servicios explican las áreas de colaboración. Las nuevas funciones de compra, pago o recogida de datos requerirán información actualizada antes de activarse.',
        ] },
      ],
    },
    privacy: {
      title: 'Política de privacidad',
      subtitle: 'Información sobre los datos implicados en la navegación y el contacto con el responsable.',
      sections: [
        { heading: 'Datos y finalidades', paragraphs: [
          'El portafolio es estático y no ofrece cuentas de visitantes, formularios de registro, pagos ni una API que reciba entradas de las demostraciones. Las interacciones locales documentadas no se envían deliberadamente al titular.',
          'GitHub Pages indica que registra las direcciones IP de los visitantes por motivos de seguridad, incluso sin iniciar sesión en GitHub.',
          'Si se envía voluntariamente un correo a la dirección pública, se tratan los datos del remitente y el contenido para leer y responder a la comunicación.',
        ] },
        { heading: 'Bases jurídicas', paragraphs: [
          'La correspondencia voluntaria se trata sobre la base del interés legítimo del titular en leer y contestar mensajes y proteger el portafolio (artículo 6.1.f del RGPD), respetando los derechos de las personas. El proveedor de alojamiento gestiona por separado los datos técnicos que recoge para la seguridad del servicio, según su política de privacidad.',
          'La visita no requiere un consentimiento general de privacidad. Si se incorporan tecnologías opcionales que requieran consentimiento, deberán evaluarse y controlarse antes de activarlas.',
        ] },
        { heading: 'Destinatarios y proveedores', paragraphs: [
          'Las páginas se alojan en GitHub Pages; el correo enviado al contacto público se recibe mediante Gmail (Google). GitHub y Google se rigen por las condiciones y políticas de privacidad de sus servicios. Las entradas de las demostraciones locales no se envían al titular.',
          'Políticas: GitHub https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement — Google https://policies.google.com/privacy?hl=es — Alojamiento https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages',
        ] },
        { heading: 'Transferencias internacionales', paragraphs: [
          'GitHub y Google utilizan infraestructuras y organizaciones internacionales: parte del tratamiento puede producirse fuera del Espacio Económico Europeo. Los mecanismos y garantías aplicables a las transferencias internacionales se explican en las políticas de privacidad actuales de ambos proveedores, enlazadas en esta página.',
        ] },
        { heading: 'Conservación', paragraphs: [
          'El sitio actual no lee ni guarda preferencias visuales. Las preferencias de versiones anteriores pueden permanecer en el navegador hasta que se eliminen. Los registros de seguridad de GitHub siguen las políticas de ese proveedor.',
          'Como criterio de conservación, los correos enviados voluntariamente al contacto del portafolio se eliminarán dentro de los 12 meses siguientes a la última comunicación pertinente, o antes si dejan de ser necesarios. Los mensajes no deseados sin finalidad legítima se eliminarán normalmente dentro de 30 días. Los mensajes que deban conservarse por una obligación legal específica o una controversia concreta se gestionarán por separado únicamente durante el plazo justificado. El titular revisa el buzón al menos cada tres meses para aplicar estos criterios.',
        ] },
        { heading: 'Derechos de las personas', paragraphs: [
          'Cuando proceda según el RGPD, pueden ejercerse derechos de acceso, rectificación, supresión, limitación u oposición, así como portabilidad cuando corresponda.',
          'Las solicitudes pueden enviarse al correo de contacto público. Se responderá sin dilación indebida, por regla general dentro de un mes de su recepción, salvo las prórrogas permitidas por el RGPD. También se puede reclamar ante el Garante italiano: https://www.garanteprivacy.it/.',
        ] },
        { heading: 'Carácter voluntario y decisiones automatizadas', paragraphs: [
          'No es obligatorio comunicar datos personales para consultar el portafolio. Los correos se envían voluntariamente; normalmente se necesita una dirección de respuesta para contestar.',
          'El sitio documentado no toma decisiones automatizadas sobre visitantes ni crea perfiles mediante sistemas controlados por el portafolio.',
        ] },
        { heading: 'Cambios', paragraphs: [
          'Esta política se actualizará si se añaden cuentas, formularios, mediciones, pagos u otras funciones que traten datos.',
        ] },
      ],
    },
    cookies: {
      title: 'Cookies y tecnologías locales',
      subtitle: 'Preferencias del navegador y posibles tecnologías de seguimiento.',
      sections: [
        { heading: 'Apariencia y datos locales', paragraphs: [
          'El portafolio utiliza un aspecto claro y no guarda nuevas preferencias visuales. Las versiones anteriores podían guardar la clave “marcelus-theme”; el sitio actual no la lee ni la utiliza.',
          'Las preferencias anteriores pueden eliminarse desde los ajustes de datos del sitio en el navegador.',
        ] },
        { heading: 'Cookies y analítica', paragraphs: [
          'No se han identificado píxeles publicitarios, sistemas de perfilado ni integraciones de analítica en el código de la aplicación revisada. No se prevé un banner para herramientas que no estén instaladas.',
          'Los recursos cargados por el navegador y los ajustes de servicios externos pueden cambiar con el tiempo; esta política se actualizará cuando se incorporen otras tecnologías.',
        ] },
        { heading: 'Servicios externos', paragraphs: [
          'Los enlaces a GitHub, LinkedIn y otros sitios conducen a servicios que aplican sus propias políticas y tecnologías.',
        ] },
        { heading: 'Gestión del almacenamiento', paragraphs: [
          'Los datos locales guardados por versiones anteriores pueden eliminarse desde la configuración del navegador.',
        ] },
        { heading: 'Cambios futuros', paragraphs: [
          'Antes de añadir analítica no exenta, publicidad o seguimiento sujeto a consentimiento, se actualizarán esta política y los controles de consentimiento previo.',
        ] },
      ],
    },
  },
};

export function LegalPage({ locale, kind }: { locale: Locale; kind: LegalKind }) {
  const copy = documents[locale][kind];
  const l = labels[locale];
  return (
    <article className="mx-auto max-w-[840px] py-12">
      <p className="eyebrow">MARCELUS AI LAB / LEGAL</p>
      <h1 className="mt-3">{copy.title}</h1>
      <p className="lead">{copy.subtitle}</p>
      <p className="mt-5 text-sm text-[var(--muted)]">{kind==='notice'?(locale==='it'?'Ultimo aggiornamento: 5 novembre 2026':locale==='es'?'Última actualización: 5 de noviembre de 2026':'Last updated: 5 November 2026'):l.updated}</p>
      <section className="my-8 border-y border-[var(--line)] py-5 text-sm">
        <h2 className="mb-3 text-base">{l.controller}</h2>
        <p>{legalOwnerName}</p>
        <p className="mt-2">
          {l.contact}: <a className="underline underline-offset-4" href={'mailto:' + profile.email}>{profile.email}</a>
        </p>
      </section>
      {copy.sections.map((section, index) => (
        <section key={index} className="my-9">
          <h2 className="mb-3 text-xl">{section.heading}</h2>
          {section.paragraphs.map((p, i) => <p key={i} className="mt-3 leading-7 text-[var(--muted)]">{p}</p>)}
        </section>
      ))}
      <nav aria-label={l.more} className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--line)] pt-6 text-sm">
        <Link className="underline underline-offset-4" href={localizedPath('/legal/', locale)}>{l.notice}</Link>
        <Link className="underline underline-offset-4" href={localizedPath('/legal/privacy/', locale)}>{l.privacy}</Link>
        <Link className="underline underline-offset-4" href={localizedPath('/legal/cookies/', locale)}>{l.cookies}</Link>
      </nav>
    </article>
  );
}
