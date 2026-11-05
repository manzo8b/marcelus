import { ContactPage } from '@/components/services';
import { type LocalizedProps } from '@/data/i18n';
import { pageMetadata } from '@/data/site-metadata';
import { presentation } from '@/data/presentation';
export const metadata = pageMetadata('/contact/','en',presentation.en.nav.contact,presentation.en.contactPageIntro);
export default async function Page({params}:LocalizedProps) { const {locale='en'}=await params;return <ContactPage locale={locale}/>; }
