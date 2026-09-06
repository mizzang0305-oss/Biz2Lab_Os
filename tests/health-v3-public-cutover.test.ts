import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { healthArticles, healthClaims, healthSources, healthTools, trustPages } from "../lib/health-v3/content";
import { currentMedicalReviewState, medicalReviewClaims } from "../lib/health-v3/medical-review";
import { publicMedicalSafetyState, publicReleaseAdjudications } from "../lib/health-v3/public-safety";
import { healthSupportGuides } from "../lib/health-v3/support-guides";

const root = process.cwd();
const read = (file: string) => readFileSync(path.join(root, file), "utf8");

const expectedSlugs = [
  "hypertension", "type-2-diabetes", "dyslipidemia", "obesity",
  "metabolic-dysfunction-associated-steatotic-liver-disease", "gastroesophageal-reflux-disease",
  "irritable-bowel-syndrome", "allergic-rhinitis", "asthma", "sleep-apnea",
  "osteoarthritis", "osteoporosis", "gout", "migraine", "kidney-stones",
  "urinary-tract-infection", "depression", "anxiety-disorder", "stroke",
  "acute-myocardial-infarction",
].sort();

test("ONURIM portfolio keeps twenty disease guides and source-audited SEO additions", () => {
  assert.deepEqual(Object.keys(healthArticles).sort(), expectedSlugs);
  assert.equal(healthSupportGuides.length, 9);
  assert.equal(healthTools.length, 34);
  assert.equal(healthClaims.length, 144);
  assert.equal(healthSources.length, 101);
  assert.equal(trustPages.length, 12);
  for (const article of Object.values(healthArticles)) {
    assert.ok(article.sections.length >= 6, article.slug);
    assert.ok(article.sourceIds.length >= 3, article.slug);
    assert.ok(article.imageIds.length >= 3, article.slug);
    assert.ok(article.toolSlugs.length >= 1, article.slug);
  }
});

test("legacy public P0/P1 Claim registry is adjudicated without fabricating licensed review", () => {
  assert.equal(publicMedicalSafetyState.unresolvedPublicHighRiskClaims, 0);
  assert.equal(publicMedicalSafetyState.licensedReviewerAssigned, false);
  assert.equal(publicMedicalSafetyState.licensedMedicalReviewCompleted, false);
  assert.equal(publicMedicalSafetyState.realHumanReaderTestPerformed, false);
  assert.equal(publicReleaseAdjudications.length, 75);
  assert.ok(publicReleaseAdjudications.every((item) => item.sourceUrls.length > 0));
  assert.ok(publicReleaseAdjudications
    .filter((item) => item.claimId.includes("-P3-") && item.riskClass === "P0_EMERGENCY")
    .every((item) => item.sourceUrls.length >= 2));
  assert.equal(medicalReviewClaims.length, 47);
  assert.equal(currentMedicalReviewState.reviewerAssigned, false);
  assert.equal(currentMedicalReviewState.medicalReviewCompleted, false);
});

test("root and discovery surfaces are health-only while legacy source stays archived", () => {
  const rootPage = read("app/page.tsx");
  const sitemap = read("app/sitemap.ts");
  const rss = read("app/rss.xml/route.ts");
  const proxy = read("proxy.ts");
  assert.doesNotMatch(rootPage, /permanentRedirect\("\/ko"\)/);
  assert.match(rootPage, /OnurimHomePage/);
  assert.match(sitemap, /healthArticles/);
  assert.doesNotMatch(sitemap, /getSitemapPosts/);
  assert.match(rss, /healthArticles/);
  assert.doesNotMatch(rss, /getPublicPosts/);
  assert.match(proxy, /LEGACY_BIZ2LAB_PUBLIC_ROUTE_RETIRED/);
  assert.match(proxy, /status: 410/);
});

test("public privacy disclosure matches the enabled Google scripts", () => {
  const content = read("lib/health-v3/content.ts");
  const trustPage = read("app/health/trust/[slug]/page.tsx");
  const layout = read("app/layout.tsx");

  assert.match(layout, /googleSetup\.adsenseScriptUrl/);
  assert.match(layout, /googleSetup\.ga4ScriptUrl/);
  assert.match(content, /Google Analytics/);
  assert.match(content, /Google AdSense/);
  assert.match(content, /쿠키/);
  assert.match(trustPage, /adssettings\.google\.com/);
  assert.match(trustPage, /policies\.google\.com\/technologies\/partner-sites/);
});

test("public health routes are indexable and internal review remains fail-closed", () => {
  const healthLayout = read("app/health/layout.tsx");
  const reviewLayout = read("app/health/review/layout.tsx");
  assert.doesNotMatch(healthLayout, /VERCEL_ENV/);
  assert.doesNotMatch(healthLayout, /index: false/);
  assert.match(reviewLayout, /VERCEL_ENV/);
  assert.match(reviewLayout, /notFound/);
  assert.match(reviewLayout, /index: false/);
});

test("visual manifest has three original mapped assets per disease", () => {
  const manifest = JSON.parse(read("docs/health-v3/onurim/visual-assets.json")) as Array<{
    file: string;
    claimIds: string[];
    altText: string;
    sha256: string;
    state: string[];
  }>;
  assert.equal(manifest.length, 62);
  for (const slug of expectedSlugs) {
    assert.ok(manifest.filter((item) => item.file.includes(`/onurim/${slug}/`)).length >= 3, slug);
  }
  assert.ok(manifest.every((item) => item.claimIds.length > 0));
  assert.ok(manifest.every((item) => item.altText.length >= 20));
  assert.ok(manifest.every((item) => /^[a-f0-9]{64}$/.test(item.sha256)));
  assert.ok(manifest.every((item) => item.state.includes("PRIVACY_SAFE")));
});
