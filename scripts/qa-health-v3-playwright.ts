import { chromium } from "playwright";

import { healthArticles, healthTools, trustPages } from "../lib/health-v3/content";
import { healthSupportGuides } from "../lib/health-v3/support-guides";

const baseUrl = process.env.HEALTH_QA_URL ?? "http://localhost:3212";
const guideRoutes = Object.keys(healthArticles).map((slug) => `/health/${slug}`);
const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];
const trustAndHomeRoutes = [
  "/",
  "/health",
  ...trustPages.map((page) => `/health/trust/${page.slug}`),
  ...healthSupportGuides.map((guide) => `/health/guides/${guide.slug}`),
];
const toolSlugs = healthTools.map((tool) => tool.slug);

type QaRecord = {
  route: string;
  viewport: string;
  status: number;
  kind: "guide" | "tool" | "trust";
  h1: number;
  h2?: number;
  overflow: number;
  images?: boolean;
  sources?: number;
  urgent?: boolean;
  author?: boolean;
  noindex?: boolean;
  keyboard?: boolean;
};

async function run() {
  const browser = await chromium.launch({ headless: true });
  const records: QaRecord[] = [];

  for (const viewport of viewports) {
    for (const route of guideRoutes) {
      const page = await browser.newPage({ viewport });
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
      await page.evaluate(async () => {
        const step = Math.max(window.innerHeight * 0.7, 300);
        for (let offset = 0; offset < document.body.scrollHeight; offset += step) {
          window.scrollTo(0, offset);
          await new Promise((resolve) => window.setTimeout(resolve, 60));
        }
        await Promise.all([...document.images].map((image) => image.complete ? undefined : new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
          window.setTimeout(resolve, 3000);
        })));
      });
      const details = await page.evaluate(() => ({
        h1: document.querySelectorAll("h1").length,
        h2: document.querySelectorAll("h2").length,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        images: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
        sources: document.querySelectorAll(".onurim-source-list a").length,
        urgent: Boolean(document.querySelector("#urgent-action")),
        author: document.body.textContent?.includes("비의료인 건강정보 편집자") ?? false,
        noindex: document.querySelector('meta[name="robots"]')?.getAttribute("content")?.includes("noindex") ?? false,
      }));
      await page.keyboard.press("Tab");
      const keyboard = await page.evaluate(() => document.activeElement?.tagName === "A");
      records.push({
        route,
        viewport: `${viewport.width}x${viewport.height}`,
        status: response?.status() ?? 0,
        kind: "guide",
        ...details,
        keyboard,
      });
      await page.close();
    }
  }

  for (const route of trustAndHomeRoutes) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    records.push({
      route,
      viewport: "390x844",
      status: response?.status() ?? 0,
      kind: "trust",
      h1: await page.locator("h1").count(),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
    });
    await page.close();
  }

  for (const slug of toolSlugs) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const response = await page.goto(`${baseUrl}/health/tools/${slug}`, { waitUntil: "domcontentloaded" });
    records.push({
      route: `/health/tools/${slug}`,
      viewport: "390x844",
      status: response?.status() ?? 0,
      kind: "tool",
      h1: await page.locator("h1").count(),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
    });
    await page.close();
  }

  await browser.close();
  const failures = records.filter((record) =>
    record.status !== 200 ||
    record.h1 !== 1 ||
    record.overflow > 0 ||
    (record.kind === "guide" && (
      record.h2 === undefined || record.h2 < 4 || !record.images || (record.sources ?? 0) < 3 ||
      !record.urgent || !record.author || record.noindex || !record.keyboard
    )),
  );

  console.log(JSON.stringify({
    baseUrl,
    guideViewportChecks: guideRoutes.length * viewports.length,
    toolChecks: toolSlugs.length,
    trustAndHomeChecks: trustAndHomeRoutes.length,
    totalChecks: records.length,
    failures,
    status: failures.length === 0 ? "PASS" : "FAIL",
  }, null, 2));
  if (failures.length > 0) process.exitCode = 1;
}

run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
