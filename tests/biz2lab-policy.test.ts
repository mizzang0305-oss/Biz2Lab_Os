import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  forbiddenPublicRoutePrefixes,
  plannedLocales,
  publicLocales,
} from "@/lib/locales";
import { categorySlugs, postFrontmatterSchema } from "@/lib/schema";
import {
  getAllPosts,
  getPublicPosts,
  getSitemapPosts,
} from "@/lib/posts";
import { createMetadata, staticPublicRoutes } from "@/lib/seo";
import { getSupabaseAdmin } from "@/lib/supabase";
import { siteSettings } from "@/lib/site-settings";

test("only Korean is public before AdSense approval", () => {
  const routes: readonly string[] = staticPublicRoutes;
  assert.deepEqual(publicLocales, ["ko"]);
  assert.deepEqual(plannedLocales, ["en", "ja"]);
  assert.equal(routes.includes("/en"), false);
  assert.equal(routes.includes("/ja"), false);
});

test("public route registry excludes forbidden MVP prefixes", () => {
  const routes: readonly string[] = staticPublicRoutes;
  const prefixes: readonly string[] = forbiddenPublicRoutePrefixes;
  for (const route of routes) {
    for (const prefix of prefixes) {
      assert.equal(
        route === prefix || route.startsWith(`${prefix}/`),
        false,
        `${route} must not expose forbidden prefix ${prefix}`,
      );
    }
  }
});

test("frontmatter schema enforces Korean-only approval categories", () => {
  assert.deepEqual(categorySlugs, [
    "automation",
    "sales-ops",
    "small-business",
    "contracts-payments",
    "pillar",
  ]);

  const parsed = postFrontmatterSchema.safeParse({
    title: "테스트 글",
    description: "테스트 설명",
    slug: "test-post",
    locale: "ko",
    category: "automation",
    cluster: "automation-basics",
    type: "how-to",
    status: "published",
    draft: false,
    author: "Biz2Lab",
    publishedAt: "2026-06-15",
    updatedAt: "2026-06-15",
    tags: ["AI 업무 자동화"],
    heroImage: "/images/posts/test-post-1200.webp",
    heroAlt: "테스트 글 대표 이미지",
    canonical: "https://biz2lab.com/ko/automation/test-post",
    noindex: false,
    relatedPosts: ["other-post", "another-post"],
  });

  assert.equal(parsed.success, true);
});

test("Phase 2 content set has 25 public Korean posts and excludes drafts/noindex from sitemap", () => {
  const allPosts = getAllPosts();
  const publicPosts = getPublicPosts();
  const sitemapPosts = getSitemapPosts();

  assert.equal(publicPosts.length, 25);
  assert.equal(publicPosts.filter((post) => post.category === "automation").length, 7);
  assert.equal(publicPosts.filter((post) => post.category === "sales-ops").length, 7);
  assert.equal(publicPosts.filter((post) => post.category === "small-business").length, 6);
  assert.equal(publicPosts.filter((post) => post.category === "contracts-payments").length, 5);
  assert.equal(publicPosts.every((post) => post.frontmatter.locale === "ko"), true);
  assert.equal(publicPosts.every((post) => post.frontmatter.status === "published"), true);
  assert.equal(publicPosts.every((post) => post.frontmatter.draft === false), true);
  assert.equal(sitemapPosts.every((post) => post.frontmatter.noindex === false), true);
  assert.equal(allPosts.some((post) => post.frontmatter.draft), false);
});

test("each public post is a connected information node", () => {
  const slugs = new Set(getPublicPosts().map((post) => post.slug));

  for (const post of getPublicPosts()) {
    assert.ok(post.frontmatter.title);
    assert.ok(post.frontmatter.description);
    assert.ok(post.frontmatter.canonical);
    assert.ok(post.frontmatter.heroAlt);
    assert.equal(post.frontmatter.heroImage.startsWith("http"), false);
    for (const relatedSlug of post.frontmatter.relatedPosts) {
      assert.ok(slugs.has(relatedSlug), `${post.slug} references missing ${relatedSlug}`);
    }
    assert.ok(
      post.internalLinks.length + post.frontmatter.relatedPosts.length >= 2,
      `${post.slug} needs at least two internal links or related references`,
    );
  }
});

test("Supabase admin client is disabled gracefully when env vars are missing", () => {
  const previousUrl = process.env.SUPABASE_URL;
  const previousKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    assert.equal(getSupabaseAdmin(), null);
  } finally {
    if (previousUrl) process.env.SUPABASE_URL = previousUrl;
    if (previousKey) process.env.SUPABASE_SERVICE_ROLE_KEY = previousKey;
  }
});

test("metadata titles avoid duplicate Biz2Lab branding", () => {
  const contactMetadata = createMetadata({
    title: "문의",
    description: "문의 페이지",
    path: "/ko/contact",
  });
  const homeMetadata = createMetadata({
    title: "Biz2Lab",
    description: "홈",
    path: "/ko",
  });

  assert.equal(contactMetadata.title, "문의");
  assert.equal(contactMetadata.openGraph?.title, "문의 | Biz2Lab");
  assert.deepEqual(homeMetadata.title, { absolute: "Biz2Lab" });
});

test("Pagefind search is explicit about index availability and avoids HTML excerpt injection", () => {
  const searchBoxSource = fs.readFileSync(
    path.join(process.cwd(), "components", "search", "SearchBox.tsx"),
    "utf8",
  );
  const searchStatusDocPath = path.join(
    process.cwd(),
    "docs",
    "architecture",
    "pagefind-search-status.md",
  );
  const envExample = fs.readFileSync(path.join(process.cwd(), ".env.example"), "utf8");

  assert.equal(searchBoxSource.includes("dangerouslySetInnerHTML"), false);
  assert.ok(
    siteSettings.messages.searchIndexPending ===
      "검색 색인은 정적 배포 색인 생성 후 활성화됩니다.",
  );
  assert.ok(searchBoxSource.includes("siteSettings.messages.searchIndexPending"));
  assert.ok(searchBoxSource.includes("NEXT_PUBLIC_PAGEFIND_ENABLED"));
  assert.equal(siteSettings.featureFlags.searchEnabled, false);
  assert.match(searchBoxSource, /method:\s*"HEAD"/);
  assert.match(envExample, /^NEXT_PUBLIC_PAGEFIND_ENABLED=false$/m);
  assert.ok(fs.existsSync(searchStatusDocPath));

  const searchStatusDoc = fs.readFileSync(searchStatusDocPath, "utf8");
  assert.match(searchStatusDoc, /Pagefind/);
  assert.match(searchStatusDoc, /정적 배포 색인 생성/);
  assert.match(searchStatusDoc, /placeholder/);
});

test("static settings keep future admin and feature surfaces disabled", () => {
  assert.equal(siteSettings.featureFlags.adminEnabled, false);
  assert.equal(siteSettings.featureFlags.aiEnabled, false);
  assert.equal(siteSettings.featureFlags.commerceEnabled, false);
  assert.equal(siteSettings.featureFlags.downloadsEnabled, false);
  assert.equal(siteSettings.featureFlags.multilingualEnabled, false);
  assert.equal(siteSettings.featureFlags.newsletterEnabled, false);

  const publicLinks = [
    ...siteSettings.navItems.map((item) => item.href),
    ...siteSettings.footer.sections.flatMap((section) =>
      section.links.map((link) => link.href),
    ),
    siteSettings.hero.primaryCta.href,
    siteSettings.hero.secondaryCta.href,
  ];

  for (const href of publicLinks) {
    const route = String(href);
    assert.equal(
      route.startsWith("/ko") || route === "/",
      true,
      `${route} must stay Korean-only`,
    );
    assert.equal(route.startsWith("/admin"), false);
    assert.equal(route.startsWith("/login"), false);
    assert.equal(route.startsWith("/en"), false);
    assert.equal(route.startsWith("/ja"), false);
  }
});
