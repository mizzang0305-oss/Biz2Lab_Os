import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";
import { healthArticles, healthTools, trustPages } from "../lib/health-v3/content";
import { healthSupportGuides } from "../lib/health-v3/support-guides";

// Read-only HTTP audit. No Google APIs, authentication, indexing requests or deploys.
const args = process.argv.slice(2);
const option = (name: string, fallback: string) => {
  const at = args.indexOf(name);
  return at < 0 ? fallback : args[at + 1] ?? fallback;
};
const base = new URL(option("--base", "http://localhost:3212"));
const out = path.resolve(option("--out", "output/onurim-seo-audit.json"));
if (!out.endsWith(".json")) throw new Error("--out must end in .json so JSON and CSV evidence use distinct files");
const singleRoute = option("--route", "");
const canonicalOrigin = "https://www.biz2lab.com";
const routes = ["/", "/health", ...Object.keys(healthArticles).map(s => `/health/${s}`),
  ...healthSupportGuides.map(g => `/health/guides/${g.slug}`),
  ...healthTools.map(t => `/health/tools/${t.slug}`), ...trustPages.map(t => `/health/trust/${t.slug}`)];

function csv(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const fields = Object.keys(rows[0]);
  const cell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [fields.map(cell).join(","), ...rows.map(row => fields.map(f => cell(row[f])).join(","))].join("\n") + "\n";
}

async function get(route: string) {
  const start = performance.now();
  const response = await fetch(new URL(route, base), { redirect: "manual", signal: AbortSignal.timeout(30000),
    headers: { "User-Agent": "ONURIM-SEO-Audit/2.0 (read-only; not Googlebot)" } });
  return { status: response.status, text: await response.text(), durationMs: Math.round(performance.now()-start),
    location: response.headers.get("location"), robotsHeader: response.headers.get("x-robots-tag") ?? "" };
}

async function inspect(page: Page, route: string, sitemap: Map<string, string>) {
  const response = await get(route);
  // No executable page scripts or asset requests: this measures server-returned HTML.
  await page.setContent(response.text, { waitUntil: "domcontentloaded" });
  // tsx preserves function names with this helper; it is needed only in this
  // isolated audit document, never injected into the application or Production.
  await page.evaluate("globalThis.__name = (value) => value");
  const dom = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    const text = (node: Element) => (node.textContent ?? "").replace(/\s+/g, " ").trim();
    const clean = main.cloneNode(true) as Element;
    clean.querySelectorAll("script,style,nav").forEach(n=>n.remove());
    const bodyText = text(clean);
    const metadata = (name: string) => document.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ?? "";
    const schemas: unknown[] = [];
    let schemaErrors = 0;
    document.querySelectorAll('script[type="application/ld+json"]').forEach(n=>{
      try { schemas.push(JSON.parse(n.textContent ?? "")); } catch { schemaErrors++; }
    });
    return {
      title: document.title, description: metadata("description"), robots: metadata("robots"),
      h1: [...document.querySelectorAll("h1")].map(text),
      headings: [...main.querySelectorAll("h2,h3")].map(text),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
      text: bodyText, wordCount: bodyText.split(/\s+/).filter(Boolean).length,
      faq: [...main.querySelectorAll("summary")].map(text), schemas, schemaErrors,
      sourceUrls: [...main.querySelectorAll<HTMLAnchorElement>(".onurim-source-list a[href]")].map(a=>a.getAttribute("href") ?? "").filter(href=>/^https?:/.test(href)),
      images: [...main.querySelectorAll("img")].map(img=>({src:img.getAttribute("src"), alt:img.getAttribute("alt"),
        width:img.getAttribute("width"),height:img.getAttribute("height"),loading:img.getAttribute("loading"),sizes:img.getAttribute("sizes")})),
      links: [...document.querySelectorAll("a[href]")].map(a=>({href:a.getAttribute("href") ?? "",anchor:text(a),
        context:a.closest("header,footer,nav") ? "navigation" : "content"})),
    };
  });
  const url = new URL(route, canonicalOrigin).href;
  const links = dom.links.map(link=>{
    try { const u = new URL(link.href,url); return {...link,url:u.href,route:u.pathname,internal:u.origin===canonicalOrigin||u.origin===base.origin}; }
    catch { return {...link,url:link.href,route:"",internal:false}; }
  }).filter(link=>/^https?:/.test(link.url));
  const robots = [dom.robots,response.robotsHeader].filter(Boolean).join("; ");
  const pageType = route.includes("/tools/") ? "tool" : route.includes("/trust/") ? "trust" : route.includes("/guides/") ? "support" : route==="/" ? "home" : route==="/health" ? "hub" : "disease";
  return {url,route,pageType,httpStatus:response.status,durationMs:response.durationMs,location:response.location,
    ...dom,robots,indexable:response.status===200&&!/\bnoindex\b/i.test(robots),
    sitemapPresent:sitemap.has(url),lastmod:sitemap.get(url) ?? "",links,
    // Count the page's declared citations, not a closed list of institutions.
    // Older surfaces without a source block keep a labelled host heuristic.
    sourceCount:new Set(dom.sourceUrls.length ? dom.sourceUrls : links.filter(l=>!l.internal&&/(^|\.)(gov|nhs\.uk|kdca\.go\.kr|heart\.org|who\.int|ngsp\.org|amc\.seoul\.kr|snuh\.org|iscd\.org)$/.test(new URL(l.url).hostname)).map(l=>l.url)).size,
    sourceCountMethod:dom.sourceUrls.length ? "DECLARED_SOURCE_BLOCK_NOT_QUALITY_VERDICT" : "RECOGNIZED_EXTERNAL_HOST_HEURISTIC",
    toolCount:new Set(links.filter(l=>l.internal&&l.route.startsWith("/health/tools/")).map(l=>l.route)).size};
}

function overlap(a: string[], b: string[]) {
  const x=new Set(a), y=new Set(b); const intersection=[...x].filter(t=>y.has(t)).length;
  return +(intersection / Math.max(1,x.size+y.size-intersection)).toFixed(3);
}

async function run() {
  if(singleRoute&&!routes.includes(singleRoute)) throw new Error("Route is not in the existing ONURIM inventory");
  const sitemapResponse = await get("/sitemap.xml");
  if(sitemapResponse.status!==200) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
  const sitemap = new Map([...sitemapResponse.text.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>[
    m[1].match(/<loc>(.*?)<\/loc>/)?.[1].replaceAll("&amp;","&") ?? "",
    m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? "",
  ]));
  const robotsResponse = await get("/robots.txt");
  const browser = await chromium.launch({headless:true});
  const context = await browser.newContext({javaScriptEnabled:false,serviceWorkers:"block"});
  await context.route("**/*",r=>r.abort());
  const work=[...(singleRoute?[singleRoute]:routes)];
  const records: Awaited<ReturnType<typeof inspect>>[]=[];
  try {
    await Promise.all(Array.from({length:Math.min(4,work.length)},async()=>{
      const page=await context.newPage(); let route:string|undefined;
      while((route=work.shift())!==undefined) {
        records.push(await inspect(page,route,sitemap));
        console.log(`audited ${records.length}/${singleRoute?1:routes.length} ${route}`);
      }
    }));
  } finally { await browser.close(); }
  records.sort((a,b)=>a.route.localeCompare(b.route));
  const graph=records.flatMap(r=>r.links.filter(l=>l.internal&&routes.includes(l.route)).map(l=>({from:r.route,to:l.route,anchor:l.anchor,context:l.context})));
  const depth=new Map([["/",0]]); let changed=true;
  while(changed){changed=false;for(const edge of graph){const from=depth.get(edge.from);if(from!==undefined&&(depth.get(edge.to)??Infinity)>from+1){depth.set(edge.to,from+1);changed=true;}}}
  const flat=records.map(r=>({url:r.url,route:r.route,page_type:r.pageType,title:r.title,description:r.description,h1:r.h1.join(" | "),h1_count:r.h1.length,
    canonical:r.canonical,http_status:r.httpStatus,indexable:r.indexable,robots:r.robots,sitemap_present:r.sitemapPresent,lastmod:r.lastmod,
    word_count:r.wordCount,source_count:r.sourceCount,image_count:r.images.length,tool_count:r.toolCount,
    internal_inlinks:singleRoute?"NOT_AUDITED_SINGLE_ROUTE":new Set(graph.filter(e=>e.to===r.route&&e.from!==r.route).map(e=>e.from)).size,
    content_inlinks:singleRoute?"NOT_AUDITED_SINGLE_ROUTE":new Set(graph.filter(e=>e.to===r.route&&e.from!==r.route&&e.context==="content").map(e=>e.from)).size,
    internal_outlinks:new Set(graph.filter(e=>e.from===r.route&&e.to!==r.route).map(e=>e.to)).size,
    depth_from_home:singleRoute?"NOT_AUDITED_SINGLE_ROUTE":depth.get(r.route)??"UNREACHABLE",structured_data:JSON.stringify(r.schemas.map(s=>(s as Record<string,unknown>)["@type"])),
    schema_errors:r.schemaErrors,missing_alt:r.images.filter(i=>i.alt===null).length,duration_ms:r.durationMs}));
  const duplicates=(field:"title"|"description")=>records.filter((r,i)=>records.findIndex(x=>x[field]===r[field])!==i).map(r=>r.route);
  const disease=records.filter(r=>r.pageType==="disease");
  const similarity=disease.flatMap((a,i)=>disease.slice(i+1).map(b=>({a:a.route,b:b.route,
    first300WordJaccard:overlap(a.text.split(/\s+/).slice(0,300),b.text.split(/\s+/).slice(0,300)),
    headingJaccard:overlap(a.headings,b.headings),faqJaccard:overlap(a.faq,b.faq)})));
  const failures=records.flatMap(r=>[
    ...(r.httpStatus!==200?[`${r.route}: HTTP ${r.httpStatus}`]:[]),
    ...(r.h1.length!==1?[`${r.route}: H1 count ${r.h1.length}`]:[]),
    ...((r.canonical ? new URL(r.canonical,canonicalOrigin).href : "")!==r.url?[`${r.route}: canonical mismatch ${r.canonical}`]:[]),
    ...(!r.title||!r.description?[`${r.route}: missing metadata`]:[]),
    ...(r.schemaErrors?[`${r.route}: malformed JSON-LD`]:[]),
    ...(r.images.some(i=>i.alt===null)?[`${r.route}: missing image alt`]:[]),
    ...(r.sitemapPresent&&!r.indexable?[`${r.route}: nonindexable sitemap entry`]:[]),
  ]);
  const report={observedAt:new Date().toISOString(),base:base.origin,mode:args.includes("--baseline")?"BASELINE_OBSERVATION":"VALIDATION",
    methodology:"Server HTML only; scripts and asset requests disabled. Word counts, Jaccard similarity and graph metrics are INTERNAL_HEURISTIC, not Google thresholds. No field CWV measurement.",
    sitemapCount:sitemap.size,sitemapUrls:[...sitemap.keys()],robotsText:robotsResponse.text,records,flat,graph,similarity,
    duplicateTitles:duplicates("title"),duplicateDescriptions:duplicates("description"),failures};
  await mkdir(path.dirname(out),{recursive:true});
  await writeFile(out,JSON.stringify(report,null,2)+"\n");
  await writeFile(out.replace(/\.json$/,".csv"),csv(flat));
  await writeFile(out.replace(/\.json$/,"-links.csv"),csv(graph));
  console.log(JSON.stringify({out,pages:records.length,sitemap:sitemap.size,failures,duplicateTitles:report.duplicateTitles.length,duplicateDescriptions:report.duplicateDescriptions.length},null,2));
  if(failures.length&&!args.includes("--baseline")) process.exitCode=1;
}
run().catch(error=>{console.error(error);process.exitCode=1;});
