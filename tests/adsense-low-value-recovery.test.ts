import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import AboutPage from "@/app/ko/about/page";
import OnurimHomePage, { metadata as healthMetadata } from "@/app/health/page";
import { GET as getRss } from "@/app/rss.xml/route";
import sitemap from "@/app/sitemap";
import { CategoryHubPage } from "@/components/layout/CategoryHubPage";
import { categories } from "@/lib/categories";
import {
  editorialIdentity,
  getEditorialEvidence,
  getEditorialEvidenceEntries,
} from "@/lib/editorial-evidence";
import { getEvidenceForPost } from "@/lib/evidence";
import { healthArticles, healthTools, trustPages } from "@/lib/health-v3/content";
import { healthSupportGuides } from "@/lib/health-v3/support-guides";
import { getAllPosts, getPostsByCategory, getPublicPosts } from "@/lib/posts";
import { staticPublicRoutes } from "@/lib/seo";
import { siteSettings } from "@/lib/site-settings";

function read(filePath: string) {
  return fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
}

function extractDownloadLinks(source: string) {
  return [...source.matchAll(/\/downloads\/[a-z0-9-]+\.csv/g)].map((match) => match[0]);
}

test("public portfolio contains only the reviewed evidence-first article set", async () => {
  const allPosts = getAllPosts();
  const publicPosts = getPublicPosts();
  const heldPosts = allPosts.filter((post) => post.frontmatter.draft);
  const publicCounts = publicPosts.reduce<Record<string, number>>((counts, post) => {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
    return counts;
  }, {});

  assert.equal(publicPosts.length, 11);
  assert.deepEqual(publicCounts, {
    automation: 2,
    "sales-ops": 6,
    "small-business": 2,
    "warehouse-logistics": 1,
  });
  assert.equal(heldPosts.length, 65);
  assert.equal(
    heldPosts.every(
      (post) =>
        post.frontmatter.status === "draft" &&
        post.frontmatter.draft === true &&
        post.frontmatter.noindex === true,
    ),
    true,
  );
  assert.equal(publicPosts.some((post) => post.category === "contracts-payments"), false);
  assert.equal(staticPublicRoutes.includes("/ko/contracts-payments" as never), false);

  const sitemapUrls = sitemap().map((entry) => entry.url);
  const rss = await getRss().text();
  for (const post of heldPosts) {
    assert.equal(sitemapUrls.some((url) => url.endsWith(post.route)), false);
    assert.equal(rss.includes(post.route), false);
  }
});

test("sitewide surfaces no longer promise unpublished contract content or entertainment branding", () => {
  const layout = read("app/layout.tsx");
  const openGraphImage = read("app/opengraph-image.tsx");
  const home = read("app/health/page.tsx");

  assert.doesNotMatch(siteSettings.description, /전자계약/);
  assert.doesNotMatch(siteSettings.hero.title, /전자계약/);
  assert.doesNotMatch(siteSettings.hero.description, /계약 미작성/);
  assert.doesNotMatch(openGraphImage, /Biz2Lab PLAY|영화 추천|결말 해석|OTT 생활/);
  assert.match(openGraphImage, /ONURIM|건강 안내/);
  assert.doesNotMatch(layout, /alternates:\s*{\s*canonical:\s*siteConfig\.url/);
  assert.match(layout, /href="#site-content"/);
  assert.match(layout, /id="site-content"/);
  assert.match(home, /20개 주요 질환 안내/);
  assert.match(home, /의료인 검수는 미완료/);
  assert.doesNotMatch(home, /lossNumberLinks|pathLinks/);
});

test("a one-article category hub hides the empty cluster section and states its evidence boundary", () => {
  const html = renderToStaticMarkup(
    createElement(CategoryHubPage, {
      category: categories["warehouse-logistics"],
      posts: getPostsByCategory("warehouse-logistics"),
    }),
  );

  assert.doesNotMatch(html, /함께 읽을 실무 글/);
  assert.match(html, /현재 공개 범위/);
  assert.match(html, /mock WMS/);
  assert.match(html, /실제 재고 정확도와 작업 생산성은 검증하지 않았습니다/);
});

test("every public article has distinct practical value and an appropriate evidence form", () => {
  for (const post of getPublicPosts()) {
    const downloads = extractDownloadLinks(post.content);

    assert.equal(post.frontmatter.status, "published");
    assert.equal(post.frontmatter.draft, false);
    assert.equal(post.frontmatter.noindex, false);
    assert.equal(post.frontmatter.title.includes("분석:"), false);
    assert.equal(post.frontmatter.templateCta, undefined);
    assert.ok(post.headings.filter((heading) => heading.level === 2).length >= 5);
    assert.ok(/\|.+\|/.test(post.content) || /^\d+\.\s+/m.test(post.content));
    const evidence = getEvidenceForPost(post.slug, "preview");
    if (post.frontmatter.type === "case-study") {
      assert.ok(
        post.frontmatter.evidenceRequired && evidence.length >= 1,
        `${post.slug} needs reviewable implementation evidence`,
      );
      assert.equal(downloads.length, 0);
    } else if (post.frontmatter.type === "checklist") {
      assert.ok(/^\d+\.\s+/m.test(post.content) || /\|.+\|/.test(post.content));
    } else if (post.frontmatter.type === "how-to") {
      assert.ok(/^\d+\.\s+/m.test(post.content) || /(?:계산|단계|순서|절차)/.test(post.content));
    } else {
      assert.ok(/\|.+\|/.test(post.content) && /(?:공식|식|계산)/.test(post.content));
    }
    for (const download of downloads) {
      const downloadPath = path.join(process.cwd(), "public", download.replace(/^\//, ""));
      assert.equal(fs.existsSync(downloadPath), true, `${post.slug} download is missing`);
    }
  }
});

test("ONURIM hub exposes every public guide and tool while retired resources stay undiscoverable", () => {
  const html = renderToStaticMarkup(createElement(OnurimHomePage));
  const sitemapUrls = new Set(sitemap().map((entry) => entry.url));

  assert.equal(staticPublicRoutes.includes("/health"), true);
  assert.equal(healthMetadata.alternates?.canonical, "https://www.biz2lab.com/health");
  assert.equal(Object.keys(healthArticles).length, 20);
  assert.equal(healthSupportGuides.length, 9);
  assert.equal(healthTools.length, 34);
  assert.doesNotMatch(html, /AdSense|재심사/);

  for (const article of Object.values(healthArticles)) {
    assert.match(html, new RegExp(`/health/${article.slug}`));
  }
  for (const guide of healthSupportGuides) {
    assert.match(html, new RegExp(`/health/guides/${guide.slug}`));
  }
  for (const tool of healthTools) {
    assert.match(html, new RegExp(`/health/tools/${tool.slug}`));
  }

  assert.equal(sitemapUrls.has("https://www.biz2lab.com/ko/resources"), false);
  assert.equal(sitemapUrls.has("https://www.biz2lab.com/health"), true);
});

test("homepage recommends only reviewed public articles", () => {
  const source = read("components/layout/HomePage.tsx");
  const publicRoutes = new Set(getPublicPosts().map((post) => post.route));
  const articleLinks = [...source.matchAll(/href:\s*"(\/ko\/(?:automation|sales-ops|small-business|warehouse-logistics)\/[^"]+)"/g)].map(
    (match) => match[1],
  );

  assert.match(source, /자동화 우선순위 정하기/);
  assert.match(source, /실패 로그와 수동 확인 기준/);
  assert.match(source, /\/ko\/resources/);
  assert.doesNotMatch(source, /free-open-source-automation-tools-series/);
  assert.doesNotMatch(source, /metabase-dashboard-automation-for-small-business/);
  assert.doesNotMatch(source, /contracts-payments/);
  assert.equal(articleLinks.every((route) => publicRoutes.has(route)), true);
  assert.equal(siteSettings.featureFlags.downloadsEnabled, true);
});

test("about page explains real work, evidence boundaries, and update policy for readers", () => {
  const html = renderToStaticMarkup(createElement(AboutPage));

  assert.match(html, /직접 다루는 문제/);
  assert.match(html, /공개 프로젝트와 검증 범위/);
  assert.match(html, /누가 작성하고 검토하나요/);
  assert.match(html, /글을 만드는 기준/);
  assert.match(html, /AI 도구는 구조화와 누락 점검/);
  assert.match(html, /고객사 이름, 개인정보와 내부 매출은 공개하지 않습니다/);
  assert.match(html, /단순 오탈자 수정만으로 최신 글처럼 보이게 날짜를 바꾸지 않습니다/);
  assert.match(html, new RegExp(editorialIdentity.operatorName));
  assert.doesNotMatch(html, /20개 핵심 글|55개|AdSense|재심사|검토 보류/);
  assert.match(html, /\/ko\/contact/);
  assert.match(html, /\/ko\/privacy/);
  assert.doesNotMatch(html, /박사|수상|공인 전문가|공식 파트너/);
});

test("every public article has unique evidence, an honest scope, and official sources when claimed", () => {
  const publicPosts = getPublicPosts();
  const entries = getEditorialEvidenceEntries();
  const summaries = new Set<string>();

  assert.ok(entries.length >= publicPosts.length);

  for (const post of publicPosts) {
    const evidence = getEditorialEvidence(post.slug);

    assert.ok(evidence.summary.length >= 40, `${post.slug} evidence summary is too short`);
    assert.ok(evidence.scope.length >= 35, `${post.slug} scope is too short`);
    assert.equal(summaries.has(evidence.summary), false, `${post.slug} repeats another evidence summary`);
    summaries.add(evidence.summary);

    if (evidence.type === "official-document-review") {
      assert.ok(evidence.sources.length >= 1, `${post.slug} needs an official source`);
    }

    for (const source of evidence.sources) {
      assert.match(source.url, /^https:\/\//);
      assert.match(source.reviewedAt, /^\d{4}-\d{2}-\d{2}$/);
    }
  }
});

test("article template no longer injects the same generic checklist and CTA into every post", () => {
  const articleSource = read("app/ko/[category]/[slug]/page.tsx");

  assert.doesNotMatch(articleSource, /ChecklistBox/);
  assert.doesNotMatch(articleSource, /TemplateCTA/);
  assert.doesNotMatch(articleSource, /checklistForPost/);
  assert.match(articleSource, /EditorialEvidenceBox/);
  assert.match(articleSource, /editorialIdentity\.authorName/);
  assert.match(articleSource, /isAccessibleForFree/);
});

test("reader-facing ONURIM trust surfaces disclose authorship, corrections, and review limits", () => {
  const trustPage = read("app/health/trust/[slug]/page.tsx");
  const home = read("app/health/page.tsx");
  const layout = read("app/layout.tsx");

  assert.equal(staticPublicRoutes.includes("/health/trust/author"), true);
  assert.equal(staticPublicRoutes.includes("/health/trust/corrections-policy"), true);
  assert.match(trustPage, /박영훈\(비의료인 건강정보 편집자\)/);
  const corrections = trustPages.find(page => page.slug === "corrections-policy")!;
  assert.ok(corrections.sections.flatMap(section => section.links ?? [])
    .some(link => link.href === "https://github.com/mizzang0305-oss/Biz2Lab_Os/issues"));
  assert.match(corrections.sections.map(section => section.body).join(" "), /실제 접수 가능 여부는 확인되지 않았습니다/);
  assert.doesNotMatch(trustPage, /issues\/new/);
  assert.match(home, /현재 의료인 검수는 미완료/);
  assert.match(home, /AI 활용 공개/);
  assert.match(layout, /\/health\/trust\/author/);
});

test("five representative articles expose public sources or commit-pinned private evidence", () => {
  const requiredSources = new Map([
    ["ai-business-automation-guide", "commerce-automation"],
    ["automation-priority-method", "commerce-automation"],
    ["daily-numbers-for-small-business", "mybizLab"],
  ]);

  for (const [slug, repository] of requiredSources) {
    const evidence = getEditorialEvidence(slug);
    assert.equal(
      evidence.sources.some((source) => source.url.includes(`/${repository}`)),
      true,
      `${slug} needs a public repository source`,
    );
  }

  for (const slug of [
    "unify-order-channels",
    "separate-picking-inspection-loading-status",
  ]) {
    const evidence = getEvidenceForPost(slug, "preview");
    assert.ok(evidence.length >= 1, `${slug} needs reviewable WMS evidence`);
    assert.ok(evidence.every((item) => item.repositoryName === "CN_WMS"));
    assert.ok(evidence.every((item) => /^[a-f0-9]{40}$/.test(item.sourceCommit)));
    assert.ok(evidence.every((item) => item.sourceDirty === false));
  }
});

test("two operational articles expose deterministic fixture, CSV, test, and visual evidence contracts", () => {
  const contracts = [
    {
      slug: "accounts-receivable-tracker",
      content: "content/ko/sales-ops/accounts-receivable-tracker.md",
      fixture: "data/evidence-fixtures/accounts-receivable.json",
      download: "/downloads/accounts-receivable-aging.csv",
    },
    {
      slug: "sales-revenue-ar-structure",
      content: "content/ko/sales-ops/sales-revenue-ar-structure.md",
      fixture: "data/evidence-fixtures/cash-conversion.json",
      download: "/downloads/cash-conversion-bridge.csv",
    },
  ];

  for (const contract of contracts) {
    const source = read(contract.content);
    const evidence = getEvidenceForPost(contract.slug, "preview");

    assert.equal(fs.existsSync(path.join(process.cwd(), contract.fixture)), true);
    assert.equal(
      fs.existsSync(
        path.join(process.cwd(), "public", contract.download.replace(/^\//, "")),
      ),
      true,
    );
    assert.match(source, /재현용 익명 예시 데이터/);
    assert.match(source, /tests\/operational-evidence\.test\.ts/);
    assert.match(source, new RegExp(contract.download.replaceAll("/", "\\/")));
    assert.match(source, /실운영 성과|실제 회수율/);
    assert.equal(evidence.length, 1);
    assert.equal(evidence[0]?.dataMode, "fixture");
    assert.equal(evidence[0]?.piiScan, "pass");
    assert.equal(evidence[0]?.repositoryName, "Biz2Lab_Os");
  }
});

test("seven independent flagships pass an evidence quality gate without a fixed eight-page minimum", () => {
  const auditSource = read("scripts/audit-adsense-recovery.ts");
  const inventory = JSON.parse(
    read("docs/adsense-recovery/2026-08-05/url-inventory.json"),
  ) as {
    flagshipQualityGate: {
      status: string;
      count: number;
      recommendedRange: string;
      officialGoogleMinimum: number | null;
      countAloneCanPass: boolean;
      issues: string[];
    };
    rows: Array<Record<string, string | number | boolean>>;
  };
  const flagships = inventory.rows.filter((row) => row.classification === "FLAGSHIP");
  const scoreFields = [
    "topic_fit",
    "originality",
    "evidence",
    "reproducibility",
    "actionability",
    "trust",
    "ux",
    "index_readiness",
  ];

  assert.match(auditSource, /recommendedRange: "6-8"/);
  assert.match(auditSource, /countAloneCanPass: false/);
  assert.doesNotMatch(auditSource, /독립적인 FLAGSHIP 8개 기준에는/);
  assert.equal(flagships.length, 7);
  assert.equal(new Set(flagships.map((row) => row.url)).size, 7);
  assert.equal(
    flagships.every((row) => scoreFields.every((field) => Number(row[field]) >= 3)),
    true,
  );
  assert.equal(
    flagships.every(
      (row) =>
        row.http_status === 200 &&
        row.canonical === row.url &&
        row.sitemap_included === true &&
        Number(row.inbound_internal_links) > 0 &&
        row.privacy_risk === "manual_review_pass_current_sha",
    ),
    true,
  );
  assert.deepEqual(inventory.flagshipQualityGate, {
    ...inventory.flagshipQualityGate,
    status: "PASS_EVIDENCE_QUALITY_GATE",
    count: 7,
    recommendedRange: "6-8",
    officialGoogleMinimum: null,
    countAloneCanPass: false,
    issues: [],
  });
});

test("content reset report records the scope and keeps deployment outside this change", () => {
  const report = read("reports/adsense-content-reset-2026-07-16.md");

  assert.match(report, /합계 \| 20/);
  assert.match(report, /33개 글/);
  assert.match(report, /20개 CSV/);
  assert.match(report, /외부 배포: 하지 않음/);
  assert.match(report, /AdSense 재검토 요청: 하지 않음/);
  assert.match(report, /가짜 조회수, 검색 순위, 고객 성과를 추가하지 않음/);
});
