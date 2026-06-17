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
  getFeaturedHomePosts,
  getPublicPosts,
  getSitemapPosts,
} from "@/lib/posts";
import { createMetadata, staticPublicRoutes } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
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
    canonical: "https://www.biz2lab.com/ko/automation/test-post",
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

test("public posts use approved local hero images without requiring generated fallback assets", () => {
  const publicPosts = getPublicPosts();
  const optionalAssetManifestPath = path.join(process.cwd(), "data", "image-assets.json");

  for (const post of publicPosts) {
    const heroImage = post.frontmatter.heroImage;

    assert.match(heroImage, /^\/images\/posts\/[a-z0-9][a-z0-9-]*\.webp$/);
    assert.equal(heroImage.includes(".."), false);
    assert.equal(heroImage.includes("?"), false);
    assert.equal(heroImage.includes("#"), false);
    assert.equal(/^https?:\/\//i.test(heroImage), false);
    assert.ok(fs.existsSync(path.join(process.cwd(), "public", heroImage.replace(/^\//, ""))));
  }

  if (fs.existsSync(optionalAssetManifestPath)) {
    const imageAssets = JSON.parse(fs.readFileSync(optionalAssetManifestPath, "utf8")) as Array<{
      id?: string;
      licenseStatus?: string;
      status?: string;
    }>;

    for (const asset of imageAssets) {
      assert.notEqual(
        `${asset.status}:${asset.licenseStatus}`,
        "active:local-generated-diagram",
        `${asset.id ?? "asset"} must not keep rejected fallback visuals active`,
      );
    }
  }
});

test("content index carries hero image metadata for visual audits", () => {
  const indexPath = path.join(process.cwd(), "content", "ko", "content-index.json");
  const indexRows = JSON.parse(fs.readFileSync(indexPath, "utf8")) as Array<{
    slug?: string;
    heroImage?: string;
    heroAlt?: string;
  }>;
  const bySlug = new Map(indexRows.map((row) => [row.slug, row]));

  for (const [slug, expectedHeroImage] of [
    ["ai-business-automation-guide", "/images/posts/ai-business-automation-guide-hero.webp"],
    ["accounts-receivable-tracker", "/images/posts/accounts-receivable-tracker-hero.webp"],
    [
      "electronic-contract-system-basics",
      "/images/posts/electronic-contract-system-basics-hero.webp",
    ],
  ] as const) {
    const row = bySlug.get(slug);

    assert.ok(row, `${slug} must be listed in content-index.json`);
    assert.equal(row.heroImage, expectedHeroImage);
    assert.ok(row.heroAlt, `${slug} must keep image alt text in content-index.json`);
  }
});

test("home article grid surfaces the three premium visual posts first", () => {
  const homePosts = getFeaturedHomePosts();

  assert.deepEqual(
    homePosts.slice(0, 3).map((post) => post.slug),
    [
      "ai-business-automation-guide",
      "accounts-receivable-tracker",
      "electronic-contract-system-basics",
    ],
  );
  assert.deepEqual(
    homePosts.slice(0, 3).map((post) => post.frontmatter.heroImage),
    [
      "/images/posts/ai-business-automation-guide-hero.webp",
      "/images/posts/accounts-receivable-tracker-hero.webp",
      "/images/posts/electronic-contract-system-basics-hero.webp",
    ],
  );
  assert.equal(homePosts.length, 6);
  assert.equal(new Set(homePosts.map((post) => post.slug)).size, homePosts.length);
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

test("official canonical metadata uses the www production domain", () => {
  const metadata = createMetadata({
    title: "Biz2Lab",
    description: "Biz2Lab metadata smoke",
    path: "/ko",
  });

  assert.equal(siteConfig.url, "https://www.biz2lab.com");
  assert.equal(metadata.alternates?.canonical, "https://www.biz2lab.com/ko");
  assert.equal(metadata.openGraph?.url, "https://www.biz2lab.com/ko");
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

test("article hero image follows Next 16 image loading API", () => {
  const articlePageSource = fs.readFileSync(
    path.join(process.cwd(), "app", "ko", "[category]", "[slug]", "page.tsx"),
    "utf8",
  );
  const articleImagePath = path.join(
    process.cwd(),
    "components",
    "article",
    "ArticleImage.tsx",
  );

  assert.match(articlePageSource, /\bpreload\b/);
  assert.doesNotMatch(articlePageSource, /\bpriority\b/);
  assert.equal(fs.existsSync(articleImagePath), false);
});

test("markdown inline images render through the Next Image component", () => {
  const markdownRendererSource = fs.readFileSync(
    path.join(process.cwd(), "components", "article", "MarkdownRenderer.tsx"),
    "utf8",
  );

  assert.match(markdownRendererSource, /import Image from "next\/image"/);
  assert.match(markdownRendererSource, /\bimg:\s*\(/);
  assert.match(markdownRendererSource, /\bfill\b/);
  assert.match(markdownRendererSource, /sizes=/);
  assert.doesNotMatch(markdownRendererSource, /<figure\b/);
});

test("Phase 4.0 content authority guard is wired and enforceable", () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8")) as {
    scripts?: Record<string, string>;
  };
  const auditScriptPath = path.join(process.cwd(), "scripts", "audit-content-authority.ts");
  const top3 = new Set([
    "ai-business-automation-guide",
    "accounts-receivable-tracker",
    "electronic-contract-system-basics",
  ]);
  const p1 = new Set([
    "automation-priority-method",
    "chatgpt-document-cleanup",
    "google-sheets-ai-automation",
    "sales-revenue-ar-structure",
    "connect-contract-payment-customer-management",
    "payment-reminder-message",
    "unify-order-channels",
    "customer-memory-system",
  ]);

  assert.equal(packageJson.scripts?.["audit:content-authority"], "tsx scripts/audit-content-authority.ts");
  assert.ok(fs.existsSync(auditScriptPath));

  for (const post of getPublicPosts()) {
    const inlineImages = [...post.content.matchAll(/!\[[^\]]+\]\((\/images\/posts\/[^)\s]+\.webp)/g)];
    const headings = post.headings.map((heading) => heading.text);

    assert.ok([...post.content].length >= 1200, `${post.slug} needs practical depth`);
    assert.ok(post.frontmatter.faq && post.frontmatter.faq.length >= 3, `${post.slug} needs FAQ coverage`);
    assert.equal(new Set(headings).size, headings.length, `${post.slug} has duplicate headings`);

    if (top3.has(post.slug)) {
      assert.ok(inlineImages.length >= 3, `${post.slug} needs three Phase 4 inline images`);
    } else if (p1.has(post.slug)) {
      assert.ok(inlineImages.length >= 1, `${post.slug} needs a Phase 4 inline image`);
    }
  }
});

test("related reading labels resolve to Korean post metadata instead of slug text", () => {
  const publicPosts = getPublicPosts();
  const postsBySlug = new Map(publicPosts.map((post) => [post.slug, post]));
  const slugLabelPattern = /^[a-z0-9]+(?:-[a-z0-9]+)+$/;

  for (const post of publicPosts) {
    for (const relatedSlug of post.frontmatter.relatedPosts) {
      const relatedPost = postsBySlug.get(relatedSlug);
      assert.ok(relatedPost, `${post.slug} references missing ${relatedSlug}`);
      assert.notEqual(relatedPost.frontmatter.title, relatedPost.slug);
      assert.match(relatedPost.frontmatter.title, /[가-힣]/);
      assert.match(relatedPost.frontmatter.description, /[가-힣]/);
      assert.match(relatedPost.categoryName, /[가-힣]/);
      assert.ok(relatedPost.readingTime.includes("읽기"));
    }

    for (const match of post.content.matchAll(/\[([^\]]+)\]\(\/ko\/[^)]+\)/g)) {
      assert.equal(
        slugLabelPattern.test(match[1]),
        false,
        `${post.slug} exposes slug-only markdown link label: ${match[1]}`,
      );
    }
  }
});

test("related reading cards expose category, Korean title, description, and reading time", () => {
  const articleCardSource = fs.readFileSync(
    path.join(process.cwd(), "components", "cards", "ArticleCard.tsx"),
    "utf8",
  );
  const relatedReadingSource = fs.readFileSync(
    path.join(process.cwd(), "components", "article", "RelatedReadingBox.tsx"),
    "utf8",
  );

  assert.match(articleCardSource, /post\.categoryName/);
  assert.match(articleCardSource, /post\.frontmatter\.title/);
  assert.match(articleCardSource, /post\.frontmatter\.description/);
  assert.match(articleCardSource, /post\.readingTime/);
  assert.match(relatedReadingSource, /sm:grid-cols-2/);
  assert.match(relatedReadingSource, /lg:grid-cols-3/);
});

test("markdown tables use responsive row cards instead of overflow-only table styling", () => {
  const markdownRendererSource = fs.readFileSync(
    path.join(process.cwd(), "components", "article", "MarkdownRenderer.tsx"),
    "utf8",
  );
  const responsiveTablePath = path.join(
    process.cwd(),
    "components",
    "article",
    "ResponsiveTable.tsx",
  );
  const globalCssSource = fs.readFileSync(
    path.join(process.cwd(), "app", "globals.css"),
    "utf8",
  );

  assert.ok(fs.existsSync(responsiveTablePath));
  const responsiveTableSource = fs.readFileSync(responsiveTablePath, "utf8");

  assert.match(markdownRendererSource, /ResponsiveTable/);
  assert.match(markdownRendererSource, /\btable:\s*\(/);
  assert.match(responsiveTableSource, /md:hidden/);
  assert.match(responsiveTableSource, /md:block/);
  assert.match(responsiveTableSource, /word-break:\s*keep-all|break-keep/);
  assert.doesNotMatch(globalCssSource, /word-break:\s*break-all/);
  assert.doesNotMatch(globalCssSource, /\.prose-biz2lab table[\s\S]*overflow-x:\s*auto/);
});

test("article header does not globally expose the disabled search placeholder", () => {
  const siteHeaderSource = fs.readFileSync(
    path.join(process.cwd(), "components", "layout", "SiteHeader.tsx"),
    "utf8",
  );
  const searchBoxSource = fs.readFileSync(
    path.join(process.cwd(), "components", "search", "SearchBox.tsx"),
    "utf8",
  );

  assert.doesNotMatch(siteHeaderSource, /SearchBox/);
  assert.match(searchBoxSource, /DisabledSearchBox/);
  assert.doesNotMatch(siteHeaderSource, /검색은 승인 후 활성화 예정입니다/);
});
