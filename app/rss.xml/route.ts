import {opportunities} from "@/lib/pocket-money/opportunities";
import {pocketBrand} from "@/lib/pocket-money/seo";
import {absoluteUrl} from "@/lib/site";
const escapeXml=(value:string)=>value.replace(/[<>&"']/g,char=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"}[char]!));
export function GET(){
  const items=opportunities.map(item=>`<item><title>${escapeXml(`${item.service} · ${item.task}`)}</title><link>${escapeXml(absoluteUrl(`/#${item.id}`))}</link><guid>${escapeXml(absoluteUrl(`/#${item.id}`))}</guid><description>${escapeXml(`${item.reward}. ${item.conditions}`)}</description></item>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${pocketBrand}</title><link>${absoluteUrl("/")}</link><description>용돈벌이와 부업의 참여 조건 및 공식 안내</description>${items}</channel></rss>`,{headers:{"Content-Type":"application/rss+xml; charset=utf-8"}});
}
