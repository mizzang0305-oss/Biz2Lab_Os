import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import AboutPage from "@/app/ko/about/page";
import ResourcesPage, { metadata as resourcesMetadata } from "@/app/ko/resources/page";
import { GET as getRss } from "@/app/rss.xml/route";
import sitemap from "@/app/sitemap";
import {
  editorialIdentity,
  getEditorialEvidence,
  getEditorialEvidenceEntries,
} from "@/lib/editorial-evidence";
import { getEvidenceForPost } from "@/lib/evidence";
import { getAllPosts, getPublicPosts } from "@/lib/posts";
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

  assert.equal(publicPosts.length, 21);
  assert.deepEqual(publicCounts, {
    automation: 7,
    "sales-ops": 7,
    "small-business": 6,
    "warehouse-logistics": 1,
  });
  assert.equal(heldPosts.length, 55);
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
    if (getEvidenceForPost(post.slug).length > 0) {
      assert.ok(
        getEvidenceForPost(post.slug).length >= 1,
        `${post.slug} needs reviewable implementation evidence`,
      );
    } else {
      assert.ok(post.frontmatter.faq && post.frontmatter.faq.length >= 3);
      assert.equal(downloads.length, 1, `${post.slug} needs one download`);
      const downloadPath = path.join(process.cwd(), "public", downloads[0].replace(/^\//, ""));
      assert.equal(fs.existsSync(downloadPath), true, `${post.slug} download is missing`);
    }
  }
});

test("resources hub exposes all public guides and real downloads without approval-facing copy", () => {
  const html = renderToStaticMarkup(createElement(ResourcesPage));
  const source = read("app/ko/resources/page.tsx");
  const articleRoutes = getPublicPosts()
    .filter((post) => post.frontmatter.type !== "case-study")
    .map((post) => post.route);
  const downloads = [...new Set(extractDownloadLinks(source))];

  assert.equal(staticPublicRoutes.includes("/ko/resources"), true);
  assert.equal(resourcesMetadata.alternates?.canonical, "https://www.biz2lab.com/ko/resources");
  assert.match(html, /가이드와 함께 쓰는 CSV 양식/);
  assert.match(html, /CSV 내려받기/);
  assert.equal(downloads.length, 20);
  assert.doesNotMatch(html, /20개 핵심 글|AdSense|재심사/);

  for (const route of articleRoutes) {
    assert.match(html, new RegExp(route.replaceAll("/", "\\/")));
  }
  for (const download of downloads) {
    assert.equal(fs.existsSync(path.join(process.cwd(), "public", download.replace(/^\//, ""))), true);
  }

  assert.doesNotMatch(html, /free-open-source-automation-tools-series/);
  assert.doesNotMatch(html, /metabase-dashboard-automation-for-small-business/);
  assert.doesNotMatch(html, /contracts-payments/);
  assert.equal(sitemap().some((entry) => entry.url === "https://www.biz2lab.com/ko/resources"), true);
});

test("homepage recommends only reviewed public articles", () => {
  const source = read("components/layout/HomePage.tsx");
  const publicRoutes = new Set(getPublicPosts().map((post) => post.route));
  const articleLinks = [...source.matchAll(/href:\s*"(\/ko\/(?:automation|sales-ops|small-business|warehouse-logistics)\/[^"]+)"/g)].map(
    (match) => match[1],
  );

  assert.match(source, /자동화 우선순위 정하기/);
  assert.match(source, /Google Sheets 자동화 기준/);
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

  assert.equal(entries.length, publicPosts.length);

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

test("reader-facing trust surfaces link authorship and public project evidence", () => {
  const author = read("app/ko/author/biz2lab/page.tsx");
  const projects = read("app/ko/projects/page.tsx");
  const home = read("components/layout/HomePage.tsx");
  const evidence = read("components/article/EditorialEvidenceBox.tsx");

  assert.equal(staticPublicRoutes.includes("/ko/author/biz2lab"), true);
  assert.equal(staticPublicRoutes.includes("/ko/projects"), true);
  assert.match(author, /공개 코드로 확인 가능한 작업/);
  assert.match(projects, /무엇을 만들었고 어디까지 검증했는가/);
  assert.match(home, /공개 코드에서 나온 운영 기준/);
  assert.match(evidence, /검증 메모/);
  assert.match(evidence, /확인 가능한 근거/);
  assert.doesNotMatch(evidence, /AI 사용 공개/);
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
    const evidence = getEvidenceForPost(slug);
    assert.equal(evidence.length, 1, `${slug} needs one reviewable WMS evidence item`);
    assert.equal(evidence[0].repositoryName, "CN_WMS");
    assert.match(evidence[0].sourceCommit, /^[a-f0-9]{40}$/);
    assert.equal(evidence[0].sourceDirty, false);
  }
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
