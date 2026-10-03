import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { healthArticles,healthClaims,healthSources,healthTools,trustPages } from "../lib/health-v3/content";
import { healthSupportGuides } from "../lib/health-v3/support-guides";
import { currentMedicalReviewState,medicalReviewClaims } from "../lib/health-v3/medical-review";
export const sha256=(value:string|Buffer)=>createHash("sha256").update(value).digest("hex");
export function healthInventory(){
 return {articles:[...Object.keys(healthArticles).map(s=>`/health/${s}`),...healthSupportGuides.map(g=>`/health/guides/${g.slug}`)].sort(),
 tools:healthTools.map(t=>`/health/tools/${t.slug}`).sort(),trust:trustPages.map(t=>`/health/trust/${t.slug}`).sort()};
}
export function assertSnapshotBaseline(expected:string,actual:string,inventory:ReturnType<typeof healthInventory>){
 if(!/^[a-f0-9]{40}$/.test(expected)||actual!==expected)throw new Error("Snapshot HEAD must equal approved baseline SHA");
 if(inventory.articles.length!==39||new Set(inventory.articles).size!==39||inventory.tools.length!==34||inventory.trust.length!==12)throw new Error("Snapshot requires health39/tool34/trust12");
}
export function healthDataHash(){return sha256(JSON.stringify({healthArticles,healthClaims,healthSources,healthTools,trustPages,healthSupportGuides,currentMedicalReviewState,medicalReviewClaims}));}
export function protectedSourceHashes(root=process.cwd()){
 const files=execFileSync("git",["-c",`safe.directory=${root.replaceAll("\\","/")}`,"ls-files"],{cwd:root,encoding:"utf8"}).trim().split("\n");
 return Object.fromEntries(files.filter(f=>/^(lib\/health-v3\/|components\/health\/|app\/health\/|public\/images\/onurim\/)/.test(f)||["lib/seo.ts","lib/site.ts","lib/site-settings.ts","lib/google-setup.ts","app/globals.css","proxy.ts","app/rss.xml/route.ts"].includes(f)).sort().map(f=>[f,sha256(fs.readFileSync(path.join(root,f)))]));
}
export async function captureHealthRoutes(baseUrl:string){
 const url=new URL(baseUrl);if(!["127.0.0.1","localhost","[::1]"].includes(url.hostname))throw new Error("Health capture is local only");
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext();
  const attempts:string[]=[];
  await context.route("**/*",async route=>{const request=route.request(),u=new URL(request.url());if(u.origin!==url.origin){attempts.push(request.url());await route.abort();}else await route.continue();});
  const page=await context.newPage();
  const entries=[];
  for(const route of healthInventory().articles){
   const response=await page.goto(new URL(route,baseUrl).href,{waitUntil:"networkidle"});if(response?.status()!==200)throw new Error(`Health route not 200: ${route}`);
   const captured=await page.evaluate(()=>{
    const body=document.querySelector(".onurim-app");if(!body)throw new Error("Missing health body");
    return {body:body.outerHTML,
     metadata:[...document.querySelectorAll('head title,head meta[name],head meta[property],head link[rel="canonical"]')].map(n=>n.outerHTML).filter(s=>!s.includes('name="viewport"')),
     schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(n=>JSON.parse(n.textContent??"{}")),
     sourceLinks:[...body.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')].map(a=>a.href).sort()};
   });
   entries.push({route,bodySha256:sha256(captured.body),metadata:captured.metadata,schemas:captured.schemas,sourceLinks:captured.sourceLinks});
  }
  const auxiliary=[];
  for(const route of [...healthInventory().tools,...healthInventory().trust]){
   const response=await page.goto(new URL(route,baseUrl).href,{waitUntil:"domcontentloaded"});auxiliary.push({route,status:response?.status()});
   if(response?.status()!==200)throw new Error(`Aux route not 200: ${route}`);
  }
  if(attempts.length)throw new Error("Automatic external requests attempted: "+attempts.map(v=>new URL(v).hostname).join(","));
  await context.close();return {entries,auxiliary,externalRequestAttempts:attempts.length};
 }finally{await browser.close();}
}
async function main(){
 const args=process.argv.slice(2),get=(k:string)=>args[args.indexOf(k)+1];
 const root=process.cwd(),expected=get("--base-sha"),baseUrl=get("--base-url"),output=get("--output");
 if(!expected||!baseUrl||!output)throw new Error("Required: --base-sha --base-url --output");
 const actual=execFileSync("git",["-c",`safe.directory=${root.replaceAll("\\","/")}`,"rev-parse","HEAD"],{encoding:"utf8"}).trim();
 assertSnapshotBaseline(expected,actual,healthInventory());
 const dirty=execFileSync("git",["-c",`safe.directory=${root.replaceAll("\\","/")}`,"diff","--name-only","HEAD"],{encoding:"utf8"}).trim();if(dirty)throw new Error("Refusing baseline from modified tracked source");
 if(fs.existsSync(output))throw new Error("Baseline is immutable; refusing overwrite");
 const routes=await captureHealthRoutes(baseUrl);
 const snapshot={baseSha:actual,baseUrl,capturedAt:new Date().toISOString(),inventory:healthInventory(),dataSha256:healthDataHash(),protectedSources:protectedSourceHashes(root),...routes};
 fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(snapshot,null,2)+"\n");
 console.log(JSON.stringify({baseSha:actual,articles:routes.entries.length,tools:healthInventory().tools.length,trust:healthInventory().trust.length,output,externalRequestAttempts:0}));
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(import.meta.filename))main().catch(e=>{console.error(e);process.exitCode=1;});

