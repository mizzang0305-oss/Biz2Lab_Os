import type {Metadata} from "next";
import {absoluteUrl} from "../site";
export const pocketBrand="즐거운 용돈벌이";
export const pocketUpdatedAt="2026-10-03";
export function isPocketPath(pathname:string|null){return pathname==="/"||pathname==="/pocket-money"||pathname?.startsWith("/pocket-money/")===true;}
export function createPocketMetadata(input:{title:string;description:string;path:string}):Metadata{
 const url=absoluteUrl(input.path),title=input.title===pocketBrand?input.title:`${input.title} | ${pocketBrand}`;
 return {title:{absolute:title},description:input.description,applicationName:pocketBrand,authors:[{name:`${pocketBrand} 운영자`}],creator:`${pocketBrand} 운영자`,publisher:`${pocketBrand} 운영자`,
 alternates:{canonical:url},openGraph:{title,description:input.description,url,siteName:pocketBrand,locale:"ko_KR",type:"website",images:[]},
 twitter:{card:"summary",title,description:input.description,images:[]}};
}
export function siteSchemasForPath(pathname:string|null):unknown[]{
 if(pathname===null)return [];
 if(!isPocketPath(pathname))return [];
 return [{"@context":"https://schema.org","@type":"Organization","@id":absoluteUrl("/#pocket-organization"),name:pocketBrand,url:absoluteUrl("/")},
 {"@context":"https://schema.org","@type":"WebSite","@id":absoluteUrl("/#pocket-website"),name:pocketBrand,url:absoluteUrl("/"),inLanguage:"ko-KR",publisher:{"@id":absoluteUrl("/#pocket-organization")}}];
}
