import fs from "node:fs";
import path from "node:path";

import { expect, test, type Page } from "@playwright/test";

import evidenceManifest from "../../data/evidence-manifest.json";
import { getPublicPosts } from "../../lib/posts";
import { staticPublicRoutes } from "../../lib/seo";

const reviewableEvidenceCount = evidenceManifest.filter(
  (item) => item.status === "candidate" || item.status === "approved",
).length;
const approvedEvidenceCount = evidenceManifest.filter(
  (item) => item.status === "approved",
).length;
const candidateEvidenceCount = evidenceManifest.filter(
  (item) => item.status === "candidate",
).length;

const routes = [
  ...staticPublicRoutes.map((route) => ({ route, expectedStatus: 200 })),
  ...getPublicPosts().map((post) => ({ route: post.route, expectedStatus: 200 })),
  { route: "/ko/ops/seo-dashboard", expectedStatus: 200 },
  { route: "/ko/ops/evidence-review", expectedStatus: 200 },
  { route: "/ko/does-not-exist", expectedStatus: 404 },
];

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];

const flagshipRoutes = [
  "/ko",
  "/ko/automation/ai-business-automation-guide",
  "/ko/automation/automation-priority-method",
  "/ko/sales-ops/accounts-receivable-tracker",
  "/ko/small-business/unify-order-channels",
  "/ko/small-business/daily-numbers-for-small-business",
  "/ko/warehouse-logistics/separate-picking-inspection-loading-status",
];

type SameOriginFailure = {
  method: string;
  resourceType: string;
  url: string;
  failure: string;
};

function collectPageSignals(page: Page, baseURL: string) {
  const origin = new URL(baseURL).origin;
  const sameOriginFailures: SameOriginFailure[] = [];
  const sameOriginServerErrors: Array<{ status: number; url: string }> = [];
  const consoleErrors: Array<{ text: string; url: string }> = [];
  const pageErrors: string[] = [];

  page.on("requestfailed", (request) => {
    if (new URL(request.url()).origin === origin) {
      sameOriginFailures.push({
        method: request.method(),
        resourceType: request.resourceType(),
        url: request.url(),
        failure: request.failure()?.errorText ?? "unknown",
      });
    }
  });
  page.on("response", (response) => {
    if (new URL(response.url()).origin === origin && response.status() >= 500) {
      sameOriginServerErrors.push({
        status: response.status(),
        url: response.url(),
      });
    }
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push({
        text: message.text(),
        url: message.location().url,
      });
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  return {
    sameOriginFailures,
    sameOriginServerErrors,
    consoleErrors,
    pageErrors,
  };
}

function actionableConsoleErrors(
  errors: Array<{ text: string; url: string }>,
  allowNotFound: boolean,
) {
  return errors.filter(({ text }) => {
    if (
      text.includes("Framing 'https://www.google.com/'") &&
      text.includes("report-only Content Security Policy")
    ) {
      return false;
    }
    return !(
      allowNotFound &&
      /^Failed to load resource: the server responded with a status of 404(?: \([^)]*\))?$/.test(
        text,
      )
    );
  });
}

for (const viewport of viewports) {
  test.describe(`${viewport.width}px public QA`, () => {
    test.use({ viewport });

    for (const { route, expectedStatus } of routes) {
      test(`${route} has exact status, no overflow, and no broken image`, async ({
        page,
        baseURL,
      }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        expect(baseURL).toBeTruthy();
        const signals = collectPageSignals(page, baseURL!);
        const response = await page.goto(route, {
          waitUntil: "domcontentloaded",
        });
        expect(response?.status()).toBe(expectedStatus);
        await page.evaluate(() => document.fonts.ready);
        const dimensions = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          brokenImages: Array.from(document.images).filter(
            (image) => image.complete && image.naturalWidth === 0,
          ).length,
        }));
        expect(dimensions.scrollWidth).toBeLessThanOrEqual(
          dimensions.innerWidth + 1,
        );
        expect(dimensions.brokenImages).toBe(0);
        expect(signals.sameOriginFailures).toEqual([]);
        expect(signals.sameOriginServerErrors).toEqual([]);
        expect(signals.pageErrors).toEqual([]);
        expect(
          actionableConsoleErrors(
            signals.consoleErrors,
            expectedStatus === 404,
          ),
        ).toEqual([]);
        if (expectedStatus === 404) {
          await expect(page.locator("meta[name='robots']")).toHaveAttribute(
            "content",
            /noindex/i,
          );
          await expect(page.locator("link[rel='canonical']")).toHaveCount(0);
        }
      });
    }
  });
}

test("preview shows no candidate review badges after final approval", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(candidateEvidenceCount).toBe(0);
  for (const route of flagshipRoutes.slice(1, 6)) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.getByText("공개 전 검토 중")).toHaveCount(0);
  }
});

test("preview project cards render approved evidence without candidate labels", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ko/projects", { waitUntil: "domcontentloaded" });

  await expect(page.getByText("공개 전 검토 중 · Preview 전용")).toHaveCount(0);
  const evidenceImageCount = await page.locator("img").evaluateAll((images) =>
    images.filter((image) => {
      try {
        return decodeURIComponent((image as HTMLImageElement).src).includes(
          "/images/evidence/",
        );
      } catch {
        return false;
      }
    }).length,
  );
  expect(evidenceImageCount).toBe(3);
});

test("preview review page is read-only and all approved evidence remains legible at 390px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const response = await page.goto("/ko/ops/evidence-review", {
    waitUntil: "domcontentloaded",
  });

  expect(response?.status()).toBe(200);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute(
    "content",
    "noindex, nofollow, nocache",
  );
  await expect(page.locator("article")).toHaveCount(reviewableEvidenceCount);
  await expect(page.locator("article[data-evidence-status='approved']")).toHaveCount(
    approvedEvidenceCount,
  );
  await expect(page.locator("article[data-evidence-status='candidate']")).toHaveCount(0);
  await expect(page.locator("main form, main button, main input")).toHaveCount(0);
  await expect(page.getByText("--apply", { exact: false })).toHaveCount(0);

  const images = page.locator("article img");
  await expect(images).toHaveCount(reviewableEvidenceCount);
  for (let index = 0; index < reviewableEvidenceCount; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((element) => {
          const imageElement = element as HTMLImageElement;
          return imageElement.complete && imageElement.naturalWidth > 0;
        }),
      )
      .toBe(true);
    const dimensions = await image.evaluate((element) => {
      const imageElement = element as HTMLImageElement;
      const bounds = imageElement.getBoundingClientRect();
      return {
        naturalWidth: imageElement.naturalWidth,
        naturalHeight: imageElement.naturalHeight,
        renderedWidth: bounds.width,
        renderedHeight: bounds.height,
      };
    });
    expect(dimensions.naturalWidth).toBeGreaterThan(0);
    expect(dimensions.naturalHeight).toBeGreaterThan(0);
    expect(dimensions.renderedWidth).toBeGreaterThanOrEqual(280);
    expect(dimensions.renderedHeight).toBeGreaterThan(190);
  }
});

test("font assets remain available across repeated 350px navigations", async ({
  browser,
  baseURL,
}) => {
  expect(baseURL).toBeTruthy();

  for (let index = 0; index < 5; index += 1) {
    const context = await browser.newContext({
      viewport: { width: 360, height: 800 },
    });
    try {
      const page = await context.newPage();
      const signals = collectPageSignals(page, baseURL!);
      const response = await page.goto("/ko/warehouse-logistics", {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBeLessThan(500);
      await page.evaluate(() => document.fonts.ready);

      const fontUrls = await page
        .locator('link[rel="preload"][as="font"]')
        .evaluateAll((links) =>
          links.map((link) => (link as HTMLLinkElement).href),
        );
      expect(fontUrls.length).toBeGreaterThan(0);
      for (const fontUrl of fontUrls) {
        const fontResponse = await context.request.get(fontUrl);
        expect(fontResponse.status(), fontUrl).toBe(200);
        expect(
          fontResponse.headers()["content-type"] ?? "",
          fontUrl,
        ).toMatch(/^font\/woff2(?:;|$)/i);
        expect((await fontResponse.body()).byteLength, fontUrl).toBeGreaterThan(
          0,
        );
      }
      expect(signals.sameOriginFailures, `context ${index + 1}`).toEqual([]);
      expect(signals.sameOriginServerErrors, `context ${index + 1}`).toEqual(
        [],
      );
      expect(signals.pageErrors, `context ${index + 1}`).toEqual([]);
    } finally {
      await context.close();
    }
  }
});

test("the permanent order-channel redirect has one hop and the verified destination", async ({
  request,
}) => {
  const response = await request.get(
    "/ko/sales-ops/unify-order-channels-for-sales",
    { maxRedirects: 0 },
  );
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe(
    "/ko/small-business/unify-order-channels",
  );
});

test("keyboard users can skip to the main content with a visible focus target", async ({
  page,
}) => {
  await page.goto("/ko", { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "본문으로 건너뛰기" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("#site-content")).toBeFocused();
});

for (const viewport of [
  { width: 390, height: 844, label: "mobile" },
  { width: 1440, height: 900, label: "desktop" },
]) {
  test(`capture ${viewport.label} flagship evidence when requested`, async ({ page }) => {
    const captureRoot = process.env.ADSENSE_QA_CAPTURE_DIR;
    test.skip(!captureRoot, "ADSENSE_QA_CAPTURE_DIR is not set");
    await page.setViewportSize(viewport);
    fs.mkdirSync(captureRoot!, { recursive: true });
    for (const route of flagshipRoutes) {
      await page.goto(route, { waitUntil: "networkidle" });
      await page.screenshot({
        path: path.join(
          captureRoot!,
          `${viewport.label}-${route.replace(/^\/ko\/?/, "").replaceAll("/", "-") || "home"}.png`,
        ),
        fullPage: true,
      });
    }
  });
}
