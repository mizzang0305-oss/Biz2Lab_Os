import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { GET as getRss } from "@/app/rss.xml/route";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getPublicPosts } from "@/lib/posts";
import { auditSeoAnswerReadiness } from "@/lib/seo-answer-readiness";
import { auditSeoKeywords } from "@/lib/seo-keyword-audit";

const requiredFiles = [
  "reports/search-console-naver-registration-readiness.md",
  "reports/ai-answer-source-readiness-audit.md",
  "reports/webmaster-registration-owner-action-pack.md",
  "reports/webmaster-verification-token-intake.md",
  "reports/google-search-console-next-actions.md",
  "reports/ai-answer-source-hardening-backlog.md",
  "docs/ops/search-console-naver-owner-checklist.md",
  "docs/ops/ai-answer-source-policy.md",
];

function readRepoFile(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("search and AI visibility docs exist and keep registration manual", () => {
  for (const relativePath of requiredFiles) {
    assert.equal(fs.existsSync(path.join(process.cwd(), relativePath)), true, `${relativePath} must exist`);
  }

  const registrationReport = readRepoFile("reports/search-console-naver-registration-readiness.md");
  const ownerChecklist = readRepoFile("docs/ops/search-console-naver-owner-checklist.md");

  for (const content of [registrationReport, ownerChecklist]) {
    assert.match(content, /Search Console과 Naver Search Advisor 연결 상태는 실제 계정\/API가 연결되기 전까지 수동 확인 항목/);
    assert.match(content, /https:\/\/www\.biz2lab\.com\/sitemap\.xml/);
    assert.match(content, /https:\/\/www\.biz2lab\.com\/rss\.xml/);
    assert.match(content, /https:\/\/www\.biz2lab\.com\/robots\.txt/);
    assert.doesNotMatch(content, /BIZ2LAB_[A-Z0-9_]*=(?!CONFIGURED|MISSING)/);
    assert.doesNotMatch(content, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR)\b/i);
  }
});

test("webmaster owner action pack keeps verification owner-driven", () => {
  const ownerActionPack = readRepoFile("reports/webmaster-registration-owner-action-pack.md");
  const tokenIntake = readRepoFile("reports/webmaster-verification-token-intake.md");
  const googleNextActions = readRepoFile("reports/google-search-console-next-actions.md");
  const hardeningBacklog = readRepoFile("reports/ai-answer-source-hardening-backlog.md");
  const dashboard = readRepoFile("lib/seo-ops-dashboard.ts");

  assert.match(ownerActionPack, /Google Search Console/);
  assert.match(ownerActionPack, /Naver Search Advisor/);
  assert.match(ownerActionPack, /OWNER_ACTION_REQUIRED/);
  assert.match(ownerActionPack, /https:\/\/www\.biz2lab\.com\/sitemap\.xml/);
  assert.match(ownerActionPack, /https:\/\/www\.biz2lab\.com\/rss\.xml/);
  assert.match(ownerActionPack, /site:www\.biz2lab\.com/);
  assert.match(ownerActionPack, /NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED|FILE ADDED, OWNER VERIFY REQUIRED/);
  assert.match(tokenIntake, /naver30b0597bfd90831b38cf281c10ce53c0\.html/);
  assert.match(tokenIntake, /NAVER_VERIFICATION_FILE_DEPLOYED_OWNER_VERIFY_REQUIRED/);
  assert.match(googleNextActions, /GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(googleNextActions, /sitemap\.xml/);
  assert.match(hardeningBacklog, /P0/);
  assert.match(hardeningBacklog, /P1/);
  assert.match(hardeningBacklog, /P2/);
  assert.match(dashboard, /GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(dashboard, /GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT/);
  assert.match(dashboard, /NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(dashboard, /NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED/);
  assert.match(dashboard, /CONNECTED_API_NOT_CONFIGURED/);

  const publicVerificationFiles = fs
    .readdirSync(path.join(process.cwd(), "public"))
    .filter((fileName) => /^(google|naver).+\.html$/i.test(fileName));
  assert.deepEqual(publicVerificationFiles, ["naver30b0597bfd90831b38cf281c10ce53c0.html"]);
  assert.equal(
    readRepoFile("public/naver30b0597bfd90831b38cf281c10ce53c0.html"),
    "naver-site-verification: naver30b0597bfd90831b38cf281c10ce53c0.html",
  );
  assert.equal(fs.existsSync(path.join(process.cwd(), "data", "content-series-run-state.json")), true);
  assert.doesNotMatch(ownerActionPack, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR)\b/i);
  assert.doesNotMatch(ownerActionPack, /meta keywords/i);
  assert.doesNotMatch(hardeningBacklog, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR)\b/i);
  assert.doesNotMatch(tokenIntake, /\b\d+\s*(clicks|impressions|sessions|pageviews|CTR)\b/i);
  assert.match(googleNextActions, /Search Console showing 0 clicks is normal for a new property/);
});

test("search discovery files cover published posts without exposing ops dashboard", async () => {
  const posts = getPublicPosts();
  const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
  const rss = await getRss().text();
  const robotsConfig = robots();

  for (const post of posts) {
    const absoluteRoute = `https://www.biz2lab.com${post.route}`;
    assert.equal(sitemapUrls.has(absoluteRoute), true, `${post.route} must be in sitemap`);
    assert.equal(rss.includes(absoluteRoute), true, `${post.route} must be in RSS`);
    assert.equal(post.frontmatter.canonical, absoluteRoute, `${post.route} must use www canonical`);
    assert.equal(post.frontmatter.noindex, false, `${post.route} must be indexable`);
  }

  assert.equal(sitemapUrls.has("https://www.biz2lab.com/ko/ops/seo-dashboard"), false);
  assert.equal(rss.includes("/ko/ops/seo-dashboard"), false);
  assert.equal(robotsConfig.sitemap, "https://www.biz2lab.com/sitemap.xml");
});

test("AI answer source audit remains evidence-based and avoids overclaiming", () => {
  const keywordAudit = auditSeoKeywords();
  const answerAudit = auditSeoAnswerReadiness();
  const answerPolicy = readRepoFile("docs/ops/ai-answer-source-policy.md");
  const answerReport = readRepoFile("reports/ai-answer-source-readiness-audit.md");

  assert.equal(keywordAudit.summary.missingKeywordMap, 0);
  assert.equal(keywordAudit.summary.mappedArticles, keywordAudit.summary.totalArticles);
  assert.equal(answerAudit.summary.totalArticles, keywordAudit.summary.totalArticles);
  assert.equal(answerAudit.summary.needsFaq, 0);
  assert.equal(answerAudit.summary.overclaimingFaq, 0);
  assert.ok(answerAudit.summary.readyArticles >= 6);

  assert.match(answerPolicy, /Fake analytics/);
  assert.match(answerPolicy, /무조건 추천/);
  assert.match(answerPolicy, /완전 무료/);
  assert.match(answerPolicy, /상업 사용 보장/);
  assert.match(answerReport, /Fake analytics used \| NO/);
  assert.match(answerReport, /Meta keywords used \| NO/);
});
