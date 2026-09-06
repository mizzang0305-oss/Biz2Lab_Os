import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { chromium } from "playwright";
import { healthArticles, healthTools, trustPages } from "../lib/health-v3/content";
import { healthSupportGuides } from "../lib/health-v3/support-guides";
import { toolEditorial } from "../lib/health-v3/tool-editorial";

const args = process.argv.slice(2);
const option = (key: string, fallback: string) => args.includes(key) ? args[args.indexOf(key)+1] ?? fallback : fallback;
const route = option("--route", "");
const base = option("--base", "http://127.0.0.1:3212");
const inventory = ["/", "/health", ...Object.keys(healthArticles).map(s=>`/health/${s}`),
  ...healthSupportGuides.map(s=>`/health/guides/${s.slug}`), ...healthTools.map(t=>`/health/tools/${t.slug}`), ...trustPages.map(t=>`/health/trust/${t.slug}`)];
const slug = route.split("/").filter(Boolean).at(-1) ?? "home";
const expectedNoindex = route.startsWith("/health/tools/") && toolEditorial[slug]?.indexDecision === "NOINDEX_FOLLOW";
const out = path.resolve(option("--out", `reports/local/onurim-seo-v2/${slug}`));

async function run() {
  if (!inventory.includes(route)) throw new Error("Choose one existing ONURIM route with --route");
  await mkdir(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const records = [];
  try {
    for (const width of [360, 390, 430, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: width >= 768 ? 1024 : 844 } });
      // Local/Preview QA must not generate third-party analytics or ad traffic.
      await page.route("**/*", request => new URL(request.request().url()).origin === new URL(base).origin ? request.continue() : request.abort());
      const consoleErrors: string[] = [];
      page.on("pageerror", error=>consoleErrors.push(error.message));
      const response = await page.goto(new URL(route, base).href, { waitUntil: "networkidle" });
      await page.evaluate(async () => { await document.fonts.ready; });
      await page.screenshot({ path: path.join(out, `${width}-top.png`) });
      for (const image of await page.locator("main img").all()) {
        await image.scrollIntoViewIfNeeded();
        // Lazy loading starts asynchronously after scrolling. decode() alone
        // can reject before a request starts; retain the final loaded check.
        await page.waitForFunction(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0,
          await image.elementHandle(), { timeout: 15000 }).catch(() => undefined);
        await image.evaluate((img: HTMLImageElement) => img.decode().catch(()=>undefined));
      }
      const details = await page.evaluate(() => ({
        title: document.title, h1: [...document.querySelectorAll("h1")].map(e=>e.textContent?.trim()),
        h2: [...document.querySelectorAll("main h2")].map(e=>e.textContent?.trim()),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
        overflow: document.documentElement.scrollWidth - innerWidth,
        navigationVisible: [...document.querySelectorAll("body > header, body > footer")].length === 2 && [...document.querySelectorAll("body > header, body > footer")].every(e=>getComputedStyle(e).display!=="none"),
        navigationDiagnostics: [...document.querySelectorAll("body > header, body > footer")].map(e=>({ tag:e.tagName,display:getComputedStyle(e).display,height:e.getBoundingClientRect().height })),
        paragraphsBelow14px: [...document.querySelectorAll("main p, main li, main td")].filter(e=>parseFloat(getComputedStyle(e).fontSize)<14).map(e=>e.className),
        images: [...document.querySelectorAll<HTMLImageElement>("main img")].map(i=>({ src:i.getAttribute("src"),alt:i.alt,loaded:i.complete&&i.naturalWidth>0,width:i.width,height:i.height })),
        tableCount: document.querySelectorAll("main table").length,
        captionCount: document.querySelectorAll("main table caption").length,
        faqCount: document.querySelectorAll("main details summary").length,
        sourceCount: document.querySelectorAll(".onurim-source-list a").length,
        schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent ?? "{}")),
        duplicateIds: [...document.querySelectorAll("[id]")].map(e=>e.id).filter((id,index,ids)=>ids.indexOf(id)!==index),
        brokenLocalAnchors: [...document.querySelectorAll<HTMLAnchorElement>('main a[href^="#"]')].map(a=>a.getAttribute("href")!).filter(h=>h!=="#"&&!document.getElementById(decodeURIComponent(h.slice(1)))),
        articleText: document.querySelector("main article")?.textContent?.replace(/\s+/g," ").trim() ?? "",
      }));
      const faq = page.locator("main details").first();
      let faqKeyboard = true;
      if (await faq.count()) {
        await faq.locator("summary").focus(); await page.keyboard.press("Enter");
        faqKeyboard = await faq.evaluate(e=>e.hasAttribute("open"));
      }
      for (const [name, selector] of [["comparison", ".onurim-explainer-table"], ["faq", ".onurim-faq-list"], ["sources", ".onurim-source-list"], ["urgent", "#urgent-action"]]) {
        const sections = await page.locator(selector).all();
        for (const [index, section] of sections.entries()) {
          // Component evidence uses the same width but a taller viewport when
          // needed so the real sticky header does not obscure the clipped image.
          const size = await section.boundingBox();
          const normalHeight = width >= 768 ? 1024 : 844;
          await page.setViewportSize({ width, height: Math.max(normalHeight, Math.ceil(size?.height ?? 0) + 400) });
          await section.evaluate(e=>e.scrollIntoView({ block: "center" }));
          await section.screenshot({ path: path.join(out, `${width}-${name}${index ? `-${index + 1}` : ""}.png`) });
          await page.setViewportSize({ width, height: normalHeight });
        }
      }
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({ path: path.join(out, `${width}-full.png`), fullPage: true });
      records.push({ width, status: response?.status(), ...details, faqKeyboard, consoleErrors });
      await page.close();
    }
  } finally { await browser.close(); }
  const failures = records.flatMap(r=>[
    ...(r.status!==200?[`${r.width}: HTTP ${r.status}`]:[]),
    ...(r.h1.length!==1?[`${r.width}: H1 count`]:[]),
    ...(/\bnoindex\b/i.test(r.robots) !== expectedNoindex ? [`${r.width}: index decision mismatch`] : []),
    ...(expectedNoindex && /\bnofollow\b/i.test(r.robots) ? [`${r.width}: expected noindex follow`] : []),
    ...(r.overflow>0?[`${r.width}: document overflow ${r.overflow}`]:[]),
    ...(!r.navigationVisible?[`${r.width}: hidden site navigation/footer`]:[]),
    ...(r.canonical ? new URL(r.canonical).href!==new URL(route,"https://www.biz2lab.com").href ? [`${r.width}: canonical`] : [] : [`${r.width}: missing canonical`]),
    ...(r.images.some(i=>!i.loaded||!i.alt.trim())?[`${r.width}: image load/alt`]:[]),
    ...(!r.faqKeyboard?[`${r.width}: FAQ keyboard`]:[]),
    ...r.duplicateIds.map(id=>`${r.width}: duplicate id ${id}`),
    ...r.brokenLocalAnchors.map(h=>`${r.width}: broken anchor ${h}`),
    ...r.consoleErrors.map(e=>`${r.width}: pageerror ${e}`),
  ]);
  await writeFile(path.join(out,"result.json"), JSON.stringify({ route, base, observedAt: new Date().toISOString(),
    limitations:"Machine UI checks only. Screenshots require human/agent visual review. No clinical review, real reader test, field CWV, Google indexing or SEO certification inferred.", records, failures },null,2)+"\n");
  const evidenceDir = path.resolve("docs/health-v3/onurim/seo-v2/raw/page-qa");
  await mkdir(evidenceDir, { recursive: true });
  const screenshotHashes = await Promise.all(records.map(async r=>({ width:r.width,
    top:createHash("sha256").update(await readFile(path.join(out,`${r.width}-top.png`))).digest("hex"),
    full:createHash("sha256").update(await readFile(path.join(out,`${r.width}-full.png`))).digest("hex") })));
  await writeFile(path.join(evidenceDir,`${slug}.json`),JSON.stringify({ route, base, observedAt:new Date().toISOString(),
    scope:"LOCAL_OR_PREVIEW_MACHINE_QA_NOT_MEDICAL_OR_READER_VALIDATION", screenshotHashes, failures,
    records:records.map(({articleText,schemas,...r})=>({...r,articleTextPresent:Boolean(articleText),schemaTypes:schemas.map(s=>s["@type"])})) },null,2)+"\n");
  console.log(JSON.stringify({ route, out, widths: records.map(r=>r.width), failures },null,2));
  if (failures.length) process.exitCode = 1;
}
run().catch(error=>{console.error(error);process.exitCode=1;});
