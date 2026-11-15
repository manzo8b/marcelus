import { LinkHub } from '@/components/link-hub';
import { pageMetadata } from '@/data/site-metadata';

export const metadata = pageMetadata('/links/', 'en', 'All projects & profiles — MARCELUS', 'Explore the digital ecosystem of Marcelo Fernandez: MANZO AI, RISTO-LAB, S-COMODO, Lune_X, Torremolinos, Villa All’Ombra dei Pitosfori, GitHub, Agensi and LinkedIn.');
export default function LinksPage() { return <LinkHub locale="en" />; }
