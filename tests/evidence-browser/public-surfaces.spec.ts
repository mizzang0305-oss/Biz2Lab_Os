import { expect, test } from "@playwright/test";

import evidenceManifest from "../../data/evidence-manifest.json";

const reviewableEvidenceCount = evidenceManifest.filter(
  (item) => item.status === "candidate" || item.status === "approved",
).length;

const routes = [
  "/ko",
  "/ko/author/biz2lab",
  "/ko/about",
  "/ko/projects",
  "/ko/automation/ai-business-automation-guide",
  "/ko/automation/automation-priority-method",
  "/ko/small-business/unify-order-channels",
  "/ko/small-business/daily-numbers-for-small-business",
  "/ko/warehouse-logistics/separate-picking-inspection-loading-status",
  "/ko/automation",
  "/ko/sales-ops",
  "/ko/small-business",
  "/ko/warehouse-logistics",
  "/ko/resources",
  "/ko/ops/evidence-review",
  "/ko/privacy",
  "/ko/terms",
  "/ko/does-not-exist",
];

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 900 },
  { width: 1440, height: 960 },
];

for (const viewport of viewports) {
  test.describe(`${viewport.width}px public QA`, () => {
    test.use({ viewport });

    for (const route of routes) {
      test(`${route} has no overflow or broken image`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        const errors: string[] = [];
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(message.text());
        });
        const response = await page.goto(route, {
          waitUntil: "domcontentloaded",
        });
        if (route === "/ko/does-not-exist") {
          expect(response?.status()).toBe(404);
        } else {
          expect(response?.status()).toBeLessThan(500);
        }
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
        const actionableErrors = errors.filter(
          (error) =>
            !(
              error.includes("Framing 'https://www.google.com/'") &&
              error.includes("report-only Content Security Policy")
            ),
        );
        const unexpectedErrors =
          route === "/ko/does-not-exist"
            ? actionableErrors.filter(
                (error) =>
                  error !==
                  "Failed to load resource: the server responded with a status of 404 (Not Found)",
              )
            : actionableErrors;
        expect(unexpectedErrors).toEqual([]);
      });
    }
  });
}

test("preview shows candidate review badge on five case studies", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes.slice(4, 9)) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.getByText("공개 전 검토 중").first()).toBeVisible();
  }
});

test("preview project cards label candidate evidence", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ko/projects", { waitUntil: "domcontentloaded" });

  await expect(page.getByText("공개 전 검토 중 · Preview 전용")).toHaveCount(3);
  await expect(page.locator("img[src*='evidence-01']")).toHaveCount(3);
});

test("preview review page is read-only and its evidence remains legible at 390px", async ({
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
    expect(dimensions.renderedHeight).toBeGreaterThan(120);
  }
});
