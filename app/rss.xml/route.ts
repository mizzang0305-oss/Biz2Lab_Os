import {knowledgeBrand} from "@/lib/essays/antikythera";
import {knowledgeUrl,knowledgeIsPublished} from "@/lib/essays/seo";
import {getSeriesEssays} from "@/lib/essays/series";
const escapeXml=(value:string)=>value.replace(/[<>&"']/g,char=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"}[char]!));
export function GET(){
  const item=knowledgeIsPublished() ? getSeriesEssays().map(essay => {const url=escapeXml(knowledgeUrl(essay.path));return `<item><title>${escapeXml(essay.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(essay.description)}</description></item>`;}).join("") : "";
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${knowledgeBrand}</title><link>${knowledgeUrl("/")}</link><description>철학·과학·역사의 질문을 원자료에서 시작해 읽는 이야기</description>${item}</channel></rss>`,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","X-Robots-Tag":knowledgeIsPublished()?"index, follow":"noindex, nofollow"}});
}
