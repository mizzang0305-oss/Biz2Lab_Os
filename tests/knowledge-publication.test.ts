import "./helpers/register-pocket-css";
import assert from "node:assert/strict";
import { essayMedia } from "../lib/essays/media";
import { essayPhotos, essayPhotoSrc, getEssayPhoto } from "../lib/essays/photos";
import fs from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parseEssayManuscript, getSeriesEssay, getSeriesEssays, getRelatedEssays, plannedEssays, safeEssayHref, splitEssaySections, sha256, essayThemes } from "../lib/essays/series";
import { SeriesEssay } from "../components/essays/SeriesEssay";
import { KnowledgeHome } from "../components/essays/KnowledgeHome";
import { EssayCollection } from "../components/essays/EssayCollection";
import { EssayStructuredData } from "../components/essays/EssayStructuredData";
import { knowledgeMetadata, knowledgeSchemas, knowledgeUrl } from "../lib/essays/seo";
import sitemap from "../app/sitemap";
import { GET as rss } from "../app/rss.xml/route";
import coverage from "../assets/fonts/series-font-provenance.json";
const source = fs.readFileSync("content/knowledge-essays/frankenstein-ai.md", "utf8");
test.beforeEach(() => { delete process.env.VERCEL_ENV; delete process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED; });
test.afterEach(() => { delete process.env.VERCEL_ENV; delete process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED; });

test("series plan has thirty distinct allowed identities and six subjects", () => {
  assert.equal(plannedEssays.length, 30); assert.equal(new Set(plannedEssays.map(entry => entry.slug)).size, 30);
  for (const entry of plannedEssays) { assert.ok(essayThemes.some(theme => theme.name === entry.theme)); for (const slug of entry.related) assert.ok(plannedEssays.some(other => other.slug === slug)); }
});
test("server loader refuses paths outside the exact manuscript allowlist", () => {
  for (const slug of ["../frankenstein-ai", "frankenstein-ai.md", "../../.env", "new-unwritten-essay", "%2e%2e", "FRANKENSTEIN-AI", "antikythera/../../.env"]) assert.equal(getSeriesEssay(slug), null);
  const essay = getSeriesEssay("frankenstein-ai")!; assert.ok(essay); assert.equal(essay.manuscriptSha256, sha256(source)); assert.equal(essay.bodySha256, sha256(essay.content));
});
test("manuscript validation excludes raw HTML, copied images, empty sections and mass-assigned frontmatter", () => {
  for (const replacement of ["<script>alert(1)</script>", "<img src=x>", "![unreviewed image](https://example.org/x.jpg)"]) assert.throws(() => parseEssayManuscript(source + "\n" + replacement, "frankenstein-ai"));
  assert.throws(() => parseEssayManuscript(source.replace('slug: "frankenstein-ai"', 'slug: "turing-computation"'), "frankenstein-ai"));
  assert.throws(() => parseEssayManuscript(source.replace('slug: "frankenstein-ai"', 'slug: "frankenstein-ai"\npublished: true'), "frankenstein-ai"));
  assert.throws(() => parseEssayManuscript(source + "\n## Empty ending\n", "frankenstein-ai"));
});
test("writer frontmatter engine markers are rejected before any JavaScript side effect", () => {
  const fixtureGlobal = globalThis as typeof globalThis & { __knowledgeEngineProbe?: number };
  fixtureGlobal.__knowledgeEngineProbe = 0;
  try {
    for (const marker of ["javascript", "js", "json", "yaml", " javascript"]) {
      const malicious = source.replace(/^---\r?\n/, `---${marker}\n(()=>{globalThis.__knowledgeEngineProbe+=1;return {}})()\n`);
      assert.throws(() => parseEssayManuscript(malicious, "frankenstein-ai"), /YAML/);
      assert.equal(fixtureGlobal.__knowledgeEngineProbe, 0);
    }
    for (const entry of plannedEssays.filter(article => article.slug !== "antikythera")) assert.equal(parseEssayManuscript(fs.readFileSync(`content/knowledge-essays/${entry.slug}.md`, "utf8"), entry.slug).slug, entry.slug);
  } finally { delete fixtureGlobal.__knowledgeEngineProbe; }
});
test("section extraction ignores example headings inside fenced text", () => {
  const result = splitEssaySections("도입\n## 첫 장면\n내용\n```text\n## 코드 예문\n```\n## 다음 장면\n마지막");
  assert.deepEqual(result.sections.map(section => section.title), ["첫 장면", "다음 장면"]); assert.equal(result.intro, "도입");
});
test("related navigation and source hrefs never link an unwritten or dangerous target", () => {
  const paths = getSeriesEssays().map(essay => essay.path);
  for (const essay of getSeriesEssays()) for (const related of getRelatedEssays(essay.slug)) assert.ok(paths.includes(related.path));
  for (const url of ["javascript:alert(1)", "data:text/html,x", "//example.org", "/admin/comments", "/essays/unwritten", "https://u:p@example.org/x"]) assert.equal(safeEssayHref(url, paths), undefined);
  assert.equal(safeEssayHref("https://www.nature.com/articles/a", paths), "https://www.nature.com/articles/a"); assert.equal(safeEssayHref("#scene-1", paths), "#scene-1");
});
test("home focuses on completed knowledge essays and keeps all official-card files preserved", () => {
  const html = renderToStaticMarkup(createElement(KnowledgeHome));
  assert.equal((html.match(/data-series-entry=/g) ?? []).length, getSeriesEssays().length);
  assert.doesNotMatch(html, /data-official-item=|아직 쓰지 않은 이야기|정책 카드|부업|앱테크|<form|<iframe/);
});
test("generic essay renders the full text, a matching version and usable heading/source navigation", () => {
  const essay = getSeriesEssay("frankenstein-ai")!;
  const html = renderToStaticMarkup(createElement(SeriesEssay, { essay }));
  assert.match(html, /data-body-sha256="[a-f0-9]{64}"/); assert.ok(html.includes(essay.title)); assert.equal((html.match(/<h1/g) ?? []).length, 1);
  for (const section of essay.sections) { assert.ok(html.includes(`id="${section.id}"`)); assert.ok(html.includes(`href="#${section.id}"`)); }
  for (const citation of essay.sources) assert.ok(html.includes(citation.url.replaceAll("&", "&amp;")));
  assert.doesNotMatch(html, /<iframe|<form|<textarea|<input/);
  assert.equal((html.match(/<img\b/g) ?? []).length, 1);
  assert.match(html, /data-source-photo="frankenstein-ai"/);
});
test("malicious manuscript labels stay text and body links cannot execute script or reach a missing essay", () => {
  const raw = source.replace(/^title:.*$/m, 'title: "</script><script>alert(1)</script>"') + "\n[메모](javascript:alert%281%29)\n[미작성 글](/essays/unwritten)\n";
  const essay = { ...parseEssayManuscript(raw, "frankenstein-ai"), sourceCheckedAt: null, authorRecordMatches: false };
  const html = renderToStaticMarkup(createElement(SeriesEssay, { essay }));
  assert.match(html, /&lt;script&gt;/); assert.doesNotMatch(html, /<script|href="javascript|href="\/essays\/unwritten|<input|<form/);
  assert.equal((html.match(/<img\b/g) ?? []).length, 1);
  assert.match(html, /data-source-photo="frankenstein-ai"/);
  const structured = renderToStaticMarkup(createElement(EssayStructuredData, { path: essay.path, article: essay }));
  const scripts = [...structured.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 3); assert.equal((structured.match(/<script/g) ?? []).length, 3); assert.doesNotMatch(structured, /<script>alert/); assert.match(structured, /\\u003c/);
  assert.equal(JSON.parse(scripts[1][1]).headline, essay.title);
});
test("each existing essay receives distinct article metadata and truthful schema without manufactured dates or metrics", () => {
  for (const essay of getSeriesEssays()) {
    const metadata = knowledgeMetadata(essay.title, essay.description, essay.path); assert.deepEqual(metadata.robots, { index: false, follow: false }); assert.equal((metadata.openGraph as { type: string }).type, "article");
    const schemas = knowledgeSchemas(essay.path, essay) as Record<string, unknown>[]; const serialized = JSON.stringify(schemas);
    assert.match(serialized, /BlogPosting/); assert.match(serialized, /BreadcrumbList/); assert.ok(serialized.includes(essay.title)); assert.doesNotMatch(serialized, /datePublished|dateModified|interactionStatistic|aggregateRating|reviewCount/);
    if (essay.slug === "antikythera") assert.equal((schemas[1].image as string[]).length, 2);
    else {
      const photo = getEssayPhoto(essay.slug)!;
      const image = schemas[1].image as Record<string, unknown>;
      assert.equal(image["@type"], "ImageObject");
      assert.equal(image.contentUrl, knowledgeUrl(essayPhotoSrc(photo, photo.width, "jpg")));
      assert.equal(image.creditText, photo.credit); assert.equal(image.license, photo.licenseUrl);
    }
  }
});
test("candidate discovery remains empty and release discovery lists every real manuscript only", async () => {
  assert.deepEqual(sitemap(), []); assert.doesNotMatch(await rss().text(), /<item>/);
  process.env.VERCEL_ENV = "production"; process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED = "true";
  const entries = sitemap(); const all = getSeriesEssays(); const feed = await rss().text();
  assert.equal(entries.filter(entry => entry.url.includes("/essays/")).length, all.length); assert.equal((feed.match(/<item>/g) ?? []).length, all.length);
  assert.doesNotMatch(JSON.stringify(entries) + feed, /health|admin|review\/|<pubDate>/);
});
test("topic cards follow h2-to-h3 while home follows h2-to-h3-to-h4", () => {
  const topic = renderToStaticMarkup(createElement<{ themeSlug?: string }>(EssayCollection, { themeSlug: "observation" }));
  assert.match(topic, /<h2/); assert.match(topic, /<h3><a/); assert.doesNotMatch(topic, /<h4/);
  const home = renderToStaticMarkup(createElement(EssayCollection)); assert.match(home, /<h2/); assert.match(home, /<h3[^>]*><a/); assert.match(home, /<h4><a/);
});
test("bundled OFL font hash and actual glyph coverage include all currently used social-card strings", () => {
  assert.equal(sha256(fs.readFileSync("assets/fonts/NotoSansKR-series-subset.woff")), coverage.sha256);
  const glyphs = new Set(coverage.coveredCodepoints);
  for (const essay of getSeriesEssays()) for (const char of `Biz2Lab 지식 에세이${essay.theme}${essay.title}${essay.question}원자료에서 시작하는 질문${essay.order}`) if (!/\s/.test(char)) assert.ok(glyphs.has(char.codePointAt(0)!), `Missing glyph ${char} in ${essay.slug}`);
  assert.match(fs.readFileSync("assets/fonts/NotoSansKR-OFL.txt", "utf8"), /SIL OPEN FONT LICENSE/);
});

test("release uses only sanitized source hashes and dates, without candidate review materials", () => {
  const manifest = JSON.parse(fs.readFileSync("data/knowledge-publication.json", "utf8"));
  const all = getSeriesEssays(); assert.equal(all.length, 30);
  for (const essay of all) {
    assert.equal(essay.manuscriptSha256, manifest[essay.slug].sha256);
    assert.equal(essay.authorRecordMatches, true); assert.equal(essay.sourceCheckedAt, manifest[essay.slug].sourceCheckedAt);
    assert.deepEqual(Object.keys(manifest[essay.slug]).sort(), ["sha256", "sourceCheckedAt"]);
  }
  for (const path of ["reports/knowledge-30", "app/review", "app/admin/knowledge", "app/admin/comments", "app/api/comments", "supabase/migrations_draft/002_essay_comments.sql"])
    assert.equal(fs.existsSync(path), false, path);
});
test("approved release includes contact while preview discovery stays protected", () => {
  assert.deepEqual(sitemap(), []);
  process.env.VERCEL_ENV="production"; process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED="true";
  assert.equal(sitemap().length, 40);
  assert.ok(sitemap().some(entry=>entry.url === "https://www.biz2lab.com/contact"));
});

test("each generic article places one credited responsive source image before its section text", () => {
  const all = getSeriesEssays().filter(essay => essay.slug !== "antikythera");
  assert.equal(essayMedia.length, all.length);
  assert.equal(new Set(essayMedia.map(figure => figure.src)).size, 29);
  assert.equal(essayPhotos.length, 29);
  assert.equal(new Set(essayPhotos.map(photo => photo.slug)).size, 29);
  for (const essay of all) {
    const figure = essayMedia.find(item => item.slug === essay.slug)!;
    assert.ok(figure && essay.sections.some(section => section.id === figure.afterSection), essay.slug);
    assert.ok(essay.sources.some(source => source.url === figure.sourceUrl));
    assert.ok(figure.alt.length > 15 && figure.caption.length > 40);
    const html = renderToStaticMarkup(createElement(SeriesEssay, { essay }));
    const photo = getEssayPhoto(essay.slug)!;
    assert.ok(photo && essay.sections.some(section => section.id === photo.section), essay.slug);
    assert.equal((html.match(/data-source-photo=/g) ?? []).length, 1);
    assert.equal((html.match(/data-essay-body-media=/g) ?? []).length, Number(photo.keepDiagram));
    if (photo.keepDiagram) assert.ok(html.includes(`src="${figure.src}"`) && html.includes(figure.alt));
    assert.ok(html.includes(photo.alt) && html.includes(photo.credit.replaceAll("&", "&amp;")));
    assert.ok(html.includes(`href="${photo.sourceUrl.replaceAll("&", "&amp;")}"`));
    assert.ok(html.includes(`href="${photo.licenseUrl}"`));
    assert.match(html, /<source type="image\/avif"/); assert.match(html, /<source type="image\/webp"/);
    assert.match(html, /loading="lazy"/);
    assert.ok(html.indexOf(`id="${photo.section}-title"`) < html.indexOf(`data-source-photo="${essay.slug}"`));
    for (const width of photo.widths) for (const format of ["avif", "webp", "jpg"] as const)
      assert.ok(fs.existsSync(`public${essayPhotoSrc(photo, width, format)}`));
    assert.match(html, /<figcaption>/);
  }
});

test("body diagrams are original self-contained vectors without external loads or active content", () => {
  for (const figure of essayMedia) {
    assert.match(figure.src, /^\/images\/essays\/[a-z0-9-]+\/concept\.svg$/);
    const svg = fs.readFileSync(`public${figure.src}`, "utf8");
    assert.match(svg, /viewBox="0 0 640 460"/);
    assert.ok(svg.includes(figure.title));
    assert.doesNotMatch(svg, /<script|<foreignObject|<image|<!DOCTYPE|\son\w+=|(?:href|src)=|@import|<animate|<set\b/);
  }
});
