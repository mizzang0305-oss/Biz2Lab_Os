import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { chromium } from "@playwright/test";

const root = process.cwd();
const baseArgument = process.argv.find((argument) => argument.startsWith("--base="));
const base = baseArgument?.slice("--base=".length) ?? "http://127.0.0.1:3213";
const outputPath = path.join(root, "docs/health-v3/onurim/seo-v3/13-performance-audit.md");
const routes = [
  "/",
  "/health",
  "/health/hypertension",
  "/health/type-2-diabetes",
  "/health/obesity",
  "/health/stroke",
  "/health/guides/understanding-hba1c",
  "/health/tools/blood-pressure-log",
  "/health/trust/medical-review-policy",
] as const;

type RouteResult = {
  route: string;
  status: number;
  htmlBytes: number;
  lcpMs: number;
  cls: number;
  fcpMs: number;
  jsResources: number;
  jsTransferBytes: number;
  imageResources: number;
  imageTransferBytes: number;
  fontResources: number;
  fontTransferBytes: number;
  lcpElement: string;
  heroPreloaded: boolean;
  lazyImages: number;
  overflowPx: number;
  runningAnimations: number;
  consoleErrors: string[];
};

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results: RouteResult[] = [];
  const reducedMotionResults: Array<{ route: string; runningAnimations: number; runnerVisible: boolean }> = [];

  for (const route of routes) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));
    await page.addInitScript(() => {
      const metrics = { lcpMs: 0, cls: 0, lcpElement: "" };
      (window as typeof window & { __onurimMetrics?: typeof metrics }).__onurimMetrics = metrics;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries.at(-1) as PerformanceEntry & { element?: Element } | undefined;
        if (last) {
          metrics.lcpMs = last.startTime;
          metrics.lcpElement = last.element?.tagName?.toLowerCase() ?? "UNKNOWN";
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as Array<PerformanceEntry & { value?: number; hadRecentInput?: boolean }>) {
          if (!entry.hadRecentInput) metrics.cls += entry.value ?? 0;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    await page.evaluate("globalThis.__name = (value) => value");
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const htmlBytes = response ? (await response.body()).byteLength : 0;
    const metrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const byType = (type: string) => resources.filter((entry) => entry.initiatorType === type);
      const transferred = (entries: PerformanceResourceTiming[]) => entries.reduce((sum, entry) => sum + entry.transferSize, 0);
      const images = Array.from(document.images);
      const lcp = (window as typeof window & { __onurimMetrics?: { lcpMs: number; cls: number; lcpElement: string } }).__onurimMetrics;
      return {
        lcpMs: lcp?.lcpMs ?? 0,
        cls: lcp?.cls ?? 0,
        lcpElement: lcp?.lcpElement ?? "UNKNOWN",
        fcpMs: performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0,
        jsResources: byType("script").length,
        jsTransferBytes: transferred(byType("script")),
        imageResources: byType("img").length,
        imageTransferBytes: transferred(byType("img")),
        fontResources: byType("css").filter((entry) => /font/i.test(entry.name)).length
          + resources.filter((entry) => /\.(woff2?|ttf)(\?|$)/i.test(entry.name)).length,
        fontTransferBytes: transferred(resources.filter((entry) => /\.(woff2?|ttf)(\?|$)/i.test(entry.name))),
        heroPreloaded: Boolean(document.querySelector('link[rel="preload"][as="image"]')) || Boolean(document.querySelector(".onurim-hero-figure img:not([loading='lazy'])")),
        lazyImages: images.filter((image) => image.loading === "lazy").length,
        overflowPx: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
        runningAnimations: document.getAnimations().filter((animation) => animation.playState === "running").length,
      };
    });
    results.push({
      route,
      status: response?.status() ?? 0,
      htmlBytes,
      ...metrics,
      consoleErrors,
    });
    await page.close();
    await context.close();
  }

  for (const route of ["/health/hypertension", "/health/type-2-diabetes", "/health/stroke"] as const) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    reducedMotionResults.push({
      route,
      runningAnimations: await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === "running").length),
      runnerVisible: await page.locator(".onurim-theater-runner").isVisible(),
    });
    await context.close();
  }
  await browser.close();

  const failures = results.flatMap((result) => {
    const routeFailures: string[] = [];
    if (result.status !== 200) routeFailures.push(`${result.route}:HTTP_${result.status}`);
    if (result.cls > 0.1) routeFailures.push(`${result.route}:CLS_${result.cls.toFixed(3)}`);
    if (result.overflowPx > 0) routeFailures.push(`${result.route}:OVERFLOW_${result.overflowPx}`);
    if (result.consoleErrors.length > 0) routeFailures.push(`${result.route}:CONSOLE_ERROR`);
    return routeFailures;
  });
  for (const result of reducedMotionResults) {
    if (result.runningAnimations > 0 || result.runnerVisible) failures.push(`${result.route}:REDUCED_MOTION_ACTIVE`);
  }
  const table = results.map((result) => `| ${result.route} | ${result.status} | ${Math.round(result.lcpMs)} | ${result.cls.toFixed(3)} | ${Math.round(result.fcpMs)} | ${Math.round(result.jsTransferBytes / 1024)} | ${result.imageResources}/${Math.round(result.imageTransferBytes / 1024)} | ${result.heroPreloaded ? "YES" : "N/A"} | ${result.lazyImages} | ${result.overflowPx} | ${result.runningAnimations} |`).join("\n");
  const reducedTable = reducedMotionResults.map(result => `| ${result.route} | ${result.runningAnimations} | ${result.runnerVisible ? "YES" : "NO"} |`).join("\n");
  const markdown = `# ONURIM 대표군 성능 감사\n\n2026-09-07 KST · 390x844 headless Chromium · local production build · ${base}\n\n| route | HTTP | lab LCP ms | CLS | FCP ms | JS KiB | image count/KiB | hero preload | lazy images | overflow px | running animations |\n|---|---:|---:|---:|---:|---:|---:|---|---:|---:|---:|\n${table}\n\n## Reduced motion 파일럿\n\n| route | running animations | moving runner visible |\n|---|---:|---|\n${reducedTable}\n\n## 판정\n\n- PERFORMANCE_AUDIT = ${failures.length === 0 ? "PASS" : "FAIL"}\n- 실패: ${failures.length === 0 ? "없음" : failures.join(", ")}\n- HTML은 실제 응답 body 크기, JS/이미지/font는 Resource Timing transferSize 기준입니다. 브라우저 캐시·로컬 서버 조건에 따라 0 또는 변동할 수 있습니다.\n- LCP/FCP/CLS는 단일 local lab 관찰이며 실제 사용자 데이터가 아닙니다. Search Console의 field CWV는 현재 데이터 없음으로 관찰되었습니다.\n- INP와 모바일 FPS는 실제 사용자 field 데이터가 없으므로 추정하지 않습니다. BodyTheater 적용 뒤 대표 3개 route에서 reduced-motion 정적 대체를 재측정했습니다.\n`;
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, markdown, "utf8");
  console.log(JSON.stringify({ routes: results.length, failures, output: path.relative(root, outputPath) }, null, 2));
  if (failures.length > 0) process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
