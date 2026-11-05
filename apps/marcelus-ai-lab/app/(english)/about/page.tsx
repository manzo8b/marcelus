import { ArrowUpRight, Mail } from 'lucide-react';
import { type LocalizedProps, t } from '@/data/i18n';
import { PublicCv } from '@/components/portfolio';
import { profile, repository } from '@/data/portfolio';
import { pageMetadata } from '@/data/site-metadata';
import { ProjectContact } from '@/components/services';
import Link from 'next/link';
import { presentation } from '@/data/presentation';
import { localizedPath } from '@/data/i18n';
export const metadata = pageMetadata('/about/', 'en', 'About Marcelo Fernandez', presentation.en.aboutText);
export default async function AboutPage({ params }: LocalizedProps) {
  const { locale = 'en' } = await params;
  const tr = (text: string) => t(locale, text);
  const sections = [
    ['Background', 'Operations & training', 'Over ten years in operations and service. Venue management, coordination of around 20 staff, practical training and process mapping in Excel.'],
    ['Transition', 'AI-assisted workflows', 'Applying the same discipline to instructions, verification steps and documented corrections through personal projects.'],
    ['Today', 'Evaluation, training & prompt systems', 'Seeking work in content quality, language evaluation, training and process documentation. Personal proof of work remains distinct from paid AI evaluator experience.'],
  ];
  return <><header className="page-heading"><p className="eyebrow">{presentation[locale].aboutEyebrow}</p><h1>{profile.name}</h1><p className="lead">{presentation[locale].aboutText}</p></header><div className="about-grid"><div className="background-list">{sections.map(([label, title, description]) => <section key={label}><span className="eyebrow">{tr(label)}</span><h2>{tr(title)}</h2><p>{tr(description)}</p></section>)}</div><aside className="profile-aside"><h2>{tr('Languages')}</h2><ul>{profile.languages.map(language => <li key={language}>{tr(language)}</li>)}</ul><h2>{tr('Professional links')}</h2><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={16} /></a><a className="text-link" href={`mailto:${profile.email}`}><Mail size={16} aria-hidden="true" />{profile.email}</a><a className="text-link" href={repository} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={16} /></a><PublicCv locale={locale} /><Link className="text-link" href={localizedPath('/recruiter/',locale)}>{presentation[locale].recruiter}</Link></aside></div><ProjectContact locale={locale}/></>;
}
