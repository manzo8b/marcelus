import Link from 'next/link';
import { type Locale, localizedPath } from '@/data/i18n';
import { absoluteUrl } from '@/data/site-metadata';
import { presentation } from '@/data/presentation';

type Crumb = {name:string;path:string};
export function Breadcrumbs({locale,items}:{locale:Locale;items:Crumb[]}) {
  const trail=[{name:presentation[locale].nav.home,path:'/'},...items];
  const data={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:trail.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:absoluteUrl(localizedPath(item.path,locale))}))};
  return <><nav className="breadcrumb-trail" aria-label={locale==='it'?'Percorso di navigazione':locale==='es'?'Ruta de navegación':'Breadcrumb'}><ol>{trail.map((item,index)=><li key={item.path}>{index>0&&<span aria-hidden="true">/</span>}{index===trail.length-1?<span aria-current="page">{item.name}</span>:<Link href={localizedPath(item.path,locale)}>{item.name}</Link>}</li>)}</ol></nav><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/></>;
}
