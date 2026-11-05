import { ServicesPage } from '@/components/services';
import { type LocalizedProps } from '@/data/i18n';
import { pageMetadata } from '@/data/site-metadata';
import { presentation } from '@/data/presentation';
export const metadata = pageMetadata('/services/','en',presentation.en.nav.services,presentation.en.servicesPageIntro);
export default async function Page({params}:LocalizedProps) { const {locale='en'}=await params;return <ServicesPage locale={locale}/>; }
