import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { chromium } from "playwright";
import { healthTools } from "../lib/health-v3/content";
import { getToolSources } from "../lib/health-v3/tool-editorial";

const slug = process.argv[process.argv.indexOf("--slug") + 1];
const tool = healthTools.find(tool => tool.slug === slug);
if (!process.argv.includes("--slug") || !tool) throw new Error("Use --slug with one existing tool");
const selected = tool;

async function run() {
  const route = `/health/tools/${selected.slug}`;
  const base = "http://127.0.0.1:3212";
  const out = path.resolve(`reports/local/onurim-seo-v2/${selected.slug}`);
  await mkdir(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const failures: string[] = [];
  const requests: { method: string; url: string }[] = [];
  let printState: unknown;
  let links: unknown;
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.route("**/*", r => new URL(r.request().url()).origin === base ? r.continue() : r.abort());
    page.on("request", r => { if (r.method() !== "GET") requests.push({ method: r.method(), url: r.url() }); });
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    if (response?.status() !== 200) failures.push("Tool HTTP");
    const fields = await page.locator(".onurim-tool-fields dt").allTextContents();
    if (JSON.stringify(fields) !== JSON.stringify(selected.fields ?? [])) failures.push("Missing printed fields");
    const sourceHrefs = await page.locator(".onurim-source-list a").evaluateAll(nodes => nodes.map(n => n.getAttribute("href")));
    if (JSON.stringify(sourceHrefs) !== JSON.stringify(getToolSources(selected).map(s => s.url))) failures.push("Source mismatch");
    const table = page.locator(".onurim-table-scroll");
    let horizontalNavigation = null;
    if (await table.count()) {
      await table.focus(); await page.keyboard.press("ArrowRight");
      await page.waitForFunction(e => e instanceof HTMLElement && e.scrollLeft > 0, await table.elementHandle());
      // Wait for the real keyboard scroll to settle, rather than racing its animation.
      await table.evaluate(async e => {
        let previous = `${window.scrollY}:${e.scrollLeft}`;
        let stable = 0;
        for (let frames = 0; frames < 180; frames++) {
          await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
          const current = `${window.scrollY}:${e.scrollLeft}`;
          stable = current === previous ? stable + 1 : 0;
          previous = current;
          if (stable >= 12) return;
        }
        throw new Error("Keyboard scroll did not settle");
      });
      const keyboardMovedRight = await table.evaluate(e => e.scrollLeft > 0);
      horizontalNavigation = await table.evaluate(e => {
        e.scrollLeft = e.scrollWidth;
        return { client: e.clientWidth, total: e.scrollWidth, reachedRight: e.scrollLeft >= e.scrollWidth - e.clientWidth - 1 };
      });
      horizontalNavigation = { ...horizontalNavigation, keyboardMovedRight };
      if (!horizontalNavigation.reachedRight) failures.push("Table scroll unreachable");
      await page.setViewportSize({ width: 390, height: 1500 });
      await table.evaluate(e => window.scrollTo({ top: Math.max(0, window.scrollY + e.getBoundingClientRect().top - 180), behavior: "instant" }));
      await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      const placement = await table.evaluate(e => ({ top: e.getBoundingClientRect().top, bottom: e.getBoundingClientRect().bottom, headerBottom: document.querySelector("body > header")!.getBoundingClientRect().bottom, viewportHeight: innerHeight }));
      if (placement.top < placement.headerBottom || placement.bottom > placement.viewportHeight) failures.push("Table obscured in mobile screenshot");
      horizontalNavigation = { ...horizontalNavigation, placement };
      await page.screenshot({ path: path.join(out, "390-table-right.png"), fullPage: false });
      await page.setViewportSize({ width: 390, height: 844 });
    }
    const checkbox = page.locator('.onurim-print-sheet input[type="checkbox"]').first();
    const expectedChecks = ["guide", "warning"].includes(selected.kind) ? 0 : (selected.itemGroups?.flatMap(g => g.items) ?? selected.items ?? []).length;
    if (await page.locator('.onurim-print-sheet input[type="checkbox"]').count() !== expectedChecks) failures.push("Checkbox item count mismatch");
    let checkboxToggled = null;
    if (await checkbox.count()) {
      await checkbox.focus(); await page.keyboard.press("Space");
      checkboxToggled = await checkbox.isChecked();
      if (!checkboxToggled) failures.push("Checkbox keyboard failed");
      await page.keyboard.press("Space");
      if (await checkbox.isChecked()) failures.push("Checkbox keyboard reset failed");
    }
    await page.setViewportSize({ width: 794, height: 1123 });
    await page.emulateMedia({ media: "print" });
    printState = await page.evaluate(() => ({
      footerVisible: getComputedStyle(document.querySelector(".onurim-tool-footer")!).display !== "none",
      siteHeaderHidden: getComputedStyle(document.querySelector("body > header")!).display === "none",
      siteFooterHidden: getComputedStyle(document.querySelector("body > footer")!).display === "none",
      sourceCount: document.querySelectorAll(".onurim-source-list a").length,
      overflow: document.documentElement.scrollWidth - innerWidth,
      footerText: document.querySelector(".onurim-tool-footer")!.textContent,
      fields: document.querySelectorAll(".onurim-tool-fields dt").length,
      checkedItems: document.querySelectorAll('.onurim-print-sheet input[type="checkbox"]:checked').length,
    }));
    const state = printState as { footerVisible: boolean; siteHeaderHidden: boolean; siteFooterHidden: boolean; overflow: number; checkedItems: number };
    if (!state.footerVisible || !state.siteHeaderHidden || !state.siteFooterHidden || state.overflow > 0) failures.push("Print visibility/overflow");
    if (state.checkedItems !== 0) failures.push("Printed worksheet contains test checkmarks");
    await page.pdf({ path: path.join(out, "worksheet.pdf"), format: "A4", printBackground: true, margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" } });
    await page.screenshot({ path: path.join(out, "print-layout.png"), fullPage: true });
    const hrefs = await page.locator('main a[href^="/"]').evaluateAll(nodes => [...new Set(nodes.map(n => n.getAttribute("href")!))]);
    links = await Promise.all(hrefs.map(async href => {
      const response = await fetch(base + href, { redirect: "manual" });
      if (response.status !== 200) failures.push(`Link HTTP ${response.status}: ${href}`);
      return { href, status: response.status };
    }));
    if (requests.length) failures.push("Unexpected non-GET request");
    const bytes = await readFile(path.join(out, "worksheet.pdf"));
    const evidence = { route, observedAt: new Date().toISOString(), scope: "LOCAL_EMPTY_FORM_PRINT_AND_UI_NOT_MEDICAL_VALIDATION", fields, sourceHrefs,
      horizontalNavigation, checkboxToggled, printState, links, nonGetRequests: requests,
      pdfSha256: createHash("sha256").update(bytes).digest("hex"), pdfBytes: bytes.length, failures };
    await writeFile(path.join(out, "tool-qa.json"), JSON.stringify(evidence, null, 2) + "\n");
    await mkdir("docs/health-v3/onurim/seo-v2/raw/tool-qa", { recursive: true });
    await writeFile(`docs/health-v3/onurim/seo-v2/raw/tool-qa/${selected.slug}.json`, JSON.stringify(evidence, null, 2) + "\n");
    console.log(JSON.stringify({ route, out, failures }, null, 2));
  } finally { await browser.close(); }
  if (failures.length) process.exitCode = 1;
}
run().catch(error => { console.error(error); process.exitCode = 1; });
