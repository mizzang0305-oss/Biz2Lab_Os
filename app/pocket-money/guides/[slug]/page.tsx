import {notFound} from "next/navigation";
import {PocketGuide} from "@/components/pocket-money/PocketGuide";
import {getPocketGuide,getPublishedPocketGuides} from "@/lib/pocket-money/guide";
import {createPocketMetadata} from "@/lib/pocket-money/seo";
export const dynamicParams=false;
export function generateStaticParams(){return getPublishedPocketGuides().map(g=>({slug:g.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const{slug}=await params;const guide=getPocketGuide(slug);if(!guide)notFound();return createPocketMetadata({title:guide.title,description:guide.description,path:`/pocket-money/guides/${guide.slug}`});}
export default async function GuidePage({params}:Props){const{slug}=await params;const guide=getPocketGuide(slug);if(!guide)notFound();return <PocketGuide guide={guide}/>;}

