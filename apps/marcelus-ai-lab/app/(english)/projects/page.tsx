import { PageHeading, ProjectGrid } from '@/components/portfolio';
import { type LocalizedProps, t } from '@/data/i18n';

import { pageMetadata } from '@/data/site-metadata';
export const metadata = pageMetadata('/projects/', 'en', 'Projects — Marcelo Fernandez', 'Websites, AI instructions and practical training: explore published work and documented projects by Marcelo Fernandez.');
export default async function ProjectsPage({ params }: LocalizedProps) {
  const { locale = 'en' } = await params;
  return <><PageHeading locale={locale} label="Personal proof of work" title="Selected projects" description="Websites, AI instructions and practical training. Explore published work and documented examples." /><section aria-labelledby="project-list"><h2 className="sr-only" id="project-list">{t(locale, 'Projects')}</h2><ProjectGrid locale={locale} evaluationFirst /></section><div className="scope-note"><strong>{t(locale, 'Personal proof of work')}</strong><p>{t(locale, 'Project documents, historical reports and AI-assisted synthetic examples are kept distinct. They do not represent paid AI evaluator assignments or independent user validation.')}</p></div></>;
}
