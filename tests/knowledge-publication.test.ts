import "./helpers/register-pocket-css";
import assert from "node:assert/strict";
import { essayMedia } from "../lib/essays/media";
import { essayPhotos, essayPhotoSrc, getEssayPhoto } from "../lib/essays/photos";
import fs from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parseEssayManuscript, getSeriesEssay, getSeriesEssays, getChronologicalEssays, getRelatedEssays, plannedEssays, safeEssayHref, splitEssaySections, sha256, essayThemes } from "../lib/essays/series";
import { SeriesEssay } from "../components/essays/SeriesEssay";
import { KnowledgeHome } from "../components/essays/KnowledgeHome";
import { EssayCollection } from "../components/essays/EssayCollection";
import { EssayStructuredData } from "../components/essays/EssayStructuredData";
import { knowledgeMetadata, knowledgeSchemas, knowledgeUrl } from "../lib/essays/seo";
import sitemap from "../app/sitemap";
import { GET as rss } from "../app/rss.xml/route";
import coverage from "../assets/fonts/series-font-provenance.json";
const source = fs.readFileSync("content/knowledge-essays/frankenstein-ai.md", "utf8");
const preservedEssaySlugs = [
  "antikythera", "frankenstein-ai", "eratosthenes", "calendar", "longitude", "maps",
  "relativity", "telescope", "microscope", "evolution", "mendel", "periodic-table",
  "entropy", "quantum", "plate-tectonics", "dna-code", "printing", "steam-work",
  "electromagnetism", "shannon", "feedback", "programmable-weaving", "turing-computation",
  "germ-theory", "reproducibility", "atomic-age", "archives-silence", "earthrise",
  "climate-ice", "model-limits",
] as const;
const preservedGenericSlugs = preservedEssaySlugs.filter(slug => slug !== "antikythera");
test.beforeEach(() => { delete process.env.VERCEL_ENV; delete process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED; });
test.afterEach(() => { delete process.env.VERCEL_ENV; delete process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED; });

test("series plan preserves the original thirty identities and admits additional completed essays", () => {
  assert.equal(new Set(plannedEssays.map(entry => entry.slug)).size, plannedEssays.length);
  assert.equal(new Set(plannedEssays.map(entry => entry.order)).size, plannedEssays.length);
  assert.equal(essayThemes.length, 6);
  for (const [index, slug] of preservedEssaySlugs.entries()) {
    assert.equal(plannedEssays.find(entry => entry.slug === slug)?.order, index + 1, slug);
    assert.ok(getSeriesEssay(slug), slug);
  }
  assert.equal(getSeriesEssay("simpson-paradox")?.order, 31);
  assert.deepEqual(getSeriesEssays().map(essay => essay.slug), plannedEssays.map(entry => entry.slug));
  for (const entry of plannedEssays) { assert.ok(essayThemes.some(theme => theme.name === entry.theme)); for (const slug of entry.related) assert.ok(plannedEssays.some(other => other.slug === slug)); }
});
test("publication dates come from a separate ledger and never from source verification dates", () => {
  const dates = JSON.parse(fs.readFileSync("data/knowledge-release-dates.json", "utf8")) as Record<string, { publishedAt: string; updatedAt?: string }>;
  const preservedSlugs = new Set<string>(preservedEssaySlugs);
  for (const essay of getSeriesEssays()) {
    if (!preservedSlugs.has(essay.slug)) assert.ok(essay.publishedAt, `${essay.slug} requires a recorded publication date`);
  }
  const publicationDates = Object.values(dates).map(record => record.publishedAt);
  // The user raised the daily target on 2026-11-06; retain the previous historical limit.
  const counts = new Map<string, number>();
  for (const date of publicationDates) counts.set(date, (counts.get(date) ?? 0) + 1);
  for (const [date, count] of counts) {
    const limit = date < "2026-11-06" ? 1 : 3;
    assert.ok(count <= limit, `Publish at most ${limit} new essays on Korean date ${date}, found ${count}`);
  }
  for (const slug of preservedEssaySlugs) {
    const essay = getSeriesEssay(slug)!;
    assert.equal(essay.publishedAt, undefined, slug);
    assert.equal(essay.updatedAt, undefined, slug);
  }
  assert.equal(getSeriesEssay("simpson-paradox")?.publishedAt, "2026-11-02");
  for (const [slug, record] of Object.entries(dates)) {
    const essay = getSeriesEssay(slug);
    assert.ok(essay, slug);
    assert.deepEqual(Object.keys(record).sort(), record.updatedAt ? ["publishedAt", "updatedAt"] : ["publishedAt"]);
    for (const date of [record.publishedAt, record.updatedAt].filter((date): date is string => Boolean(date))) {
      assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(new Date(date).toISOString().slice(0, 10), date);
    }
    assert.equal(essay.publishedAt, record.publishedAt);
    assert.equal(essay.updatedAt, record.updatedAt);
    if (record.updatedAt) assert.ok(record.updatedAt >= record.publishedAt);
  }
});
test("chronological discovery puts dated essays first while preserving stable order for undated essays", () => {
  const chronological = getChronologicalEssays();
  assert.deepEqual(new Set(chronological.map(essay => essay.slug)), new Set(getSeriesEssays().map(essay => essay.slug)));
  const dated = chronological.filter(essay => essay.publishedAt);
  const undated = chronological.filter(essay => !essay.publishedAt);
  assert.deepEqual(chronological.map(essay => essay.slug), [...dated, ...undated].map(essay => essay.slug));
  assert.ok(dated.some(essay => essay.slug === "simpson-paradox"));
  for (let index = 1; index < dated.length; index++) {
    assert.ok(dated[index - 1].publishedAt! >= dated[index].publishedAt!);
    if (dated[index - 1].publishedAt === dated[index].publishedAt) assert.ok(dated[index - 1].order < dated[index].order);
  }
  assert.deepEqual(undated.map(essay => essay.slug), getSeriesEssays().filter(essay => !essay.publishedAt).map(essay => essay.slug));
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
  const latest = getChronologicalEssays().filter(essay => essay.publishedAt).slice(0, 3);
  assert.deepEqual([...html.matchAll(/data-latest-essay="([^"]+)"/g)].map(match => match[1]), latest.map(essay => essay.slug));
  for (const essay of latest) assert.ok(html.includes(`<time dateTime="${essay.publishedAt}"`) || html.includes(`<time datetime="${essay.publishedAt}"`));
  assert.doesNotMatch(html, /data-official-item=|아직 쓰지 않은 이야기|정책 카드|부업|앱테크|<form|<iframe/);
});
test("generic essay renders the full text, a matching version and usable heading/source navigation", () => {
  const essay = getSeriesEssay("frankenstein-ai")!;
  const html = renderToStaticMarkup(createElement(SeriesEssay, { essay }));
  assert.match(html, /data-body-sha256="[a-f0-9]{64}"/); assert.ok(html.includes(essay.title)); assert.equal((html.match(/<h1/g) ?? []).length, 1);
  for (const section of essay.sections) { assert.ok(html.includes(`id="${section.id}"`)); assert.ok(html.includes(`href="#${section.id}"`)); }
  for (const citation of essay.sources) assert.ok(html.includes(citation.url.replaceAll("&", "&amp;")));
  assert.doesNotMatch(html, /<iframe|<form|<textarea|<input/);
  assert.equal((html.match(/data-source-photo=/g) ?? []).length, 1);
  assert.equal((html.match(/<img\b/g) ?? []).length, 1 + getRelatedEssays(essay.slug).length);
  assert.deepEqual([...html.matchAll(/data-preview-photo="([^"]+)"/g)].map(match => match[1]), getRelatedEssays(essay.slug).map(related => related.slug));
  assert.match(html, /data-source-photo="frankenstein-ai"/);
});
test("malicious manuscript labels stay text and body links cannot execute script or reach a missing essay", () => {
  const raw = source.replace(/^title:.*$/m, 'title: "</script><script>alert(1)</script>"') + "\n[메모](javascript:alert%281%29)\n[미작성 글](/essays/unwritten)\n";
  const essay = { ...parseEssayManuscript(raw, "frankenstein-ai"), sourceCheckedAt: null, authorRecordMatches: false };
  const html = renderToStaticMarkup(createElement(SeriesEssay, { essay }));
  assert.match(html, /&lt;script&gt;/); assert.doesNotMatch(html, /<script|href="javascript|href="\/essays\/unwritten|<input|<form/);
  assert.equal((html.match(/data-source-photo=/g) ?? []).length, 1);
  assert.equal((html.match(/<img\b/g) ?? []).length, 1 + getRelatedEssays(essay.slug).length);
  assert.deepEqual([...html.matchAll(/data-preview-photo="([^"]+)"/g)].map(match => match[1]), getRelatedEssays(essay.slug).map(related => related.slug));
  assert.match(html, /data-source-photo="frankenstein-ai"/);
  const structured = renderToStaticMarkup(createElement(EssayStructuredData, { path: essay.path, article: essay }));
  const scripts = [...structured.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 3); assert.equal((structured.match(/<script/g) ?? []).length, 3); assert.doesNotMatch(structured, /<script>alert/); assert.match(structured, /\\u003c/);
  assert.equal(JSON.parse(scripts[1][1]).headline, essay.title);
});
test("each essay receives article metadata with only recorded publication dates and no manufactured metrics", () => {
  for (const essay of getSeriesEssays()) {
    const metadata = knowledgeMetadata(essay.title, essay.description, essay.path); assert.deepEqual(metadata.robots, { index: false, follow: false }); assert.equal((metadata.openGraph as { type: string }).type, "article");
    const schemas = knowledgeSchemas(essay.path, essay) as Record<string, unknown>[]; const serialized = JSON.stringify(schemas);
    assert.match(serialized, /BlogPosting/); assert.match(serialized, /BreadcrumbList/); assert.ok(serialized.includes(essay.title)); assert.doesNotMatch(serialized, /interactionStatistic|aggregateRating|reviewCount/);
    assert.equal(schemas[1].datePublished, essay.publishedAt);
    assert.equal(schemas[1].dateModified, essay.updatedAt);
    if (!essay.publishedAt) assert.ok(!Object.hasOwn(schemas[1], "datePublished"));
    if (!essay.updatedAt) assert.ok(!Object.hasOwn(schemas[1], "dateModified"));
    if (essay.slug === "antikythera") assert.equal((schemas[1].image as string[]).length, 2);
    else if (getEssayPhoto(essay.slug)) {
      const photo = getEssayPhoto(essay.slug)!;
      const image = schemas[1].image as Record<string, unknown>;
      assert.equal(image["@type"], "ImageObject");
      assert.equal(image.contentUrl, knowledgeUrl(essayPhotoSrc(photo, photo.width, "jpg")));
      assert.equal(image.creditText, photo.credit); assert.equal(image.license, photo.licenseUrl);
    }
  }
});
test("article schema distinguishes first publication from a recorded later revision", () => {
  const essay = getSeriesEssay("simpson-paradox")!;
  const firstPublication = (knowledgeSchemas(essay.path, { ...essay, publishedAt: "2026-11-02", updatedAt: undefined }) as Record<string, unknown>[])[1];
  assert.equal(firstPublication.datePublished, "2026-11-02");
  assert.ok(!Object.hasOwn(firstPublication, "dateModified"));
  const laterRevision = (knowledgeSchemas(essay.path, { ...essay, publishedAt: "2026-11-02", updatedAt: "2026-11-03" }) as Record<string, unknown>[])[1];
  assert.equal(laterRevision.datePublished, "2026-11-02");
  assert.equal(laterRevision.dateModified, "2026-11-03");
});
test("candidate discovery remains empty and release discovery lists every real manuscript only", async () => {
  assert.deepEqual(sitemap(), []); assert.doesNotMatch(await rss().text(), /<item>/);
  process.env.VERCEL_ENV = "production"; process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED = "true";
  const entries = sitemap(); const all = getSeriesEssays(); const feed = await rss().text();
  assert.equal(entries.filter(entry => entry.url.includes("/essays/")).length, all.length); assert.equal((feed.match(/<item>/g) ?? []).length, all.length);
  assert.doesNotMatch(JSON.stringify(entries) + feed, /health|admin|review\//);
  const items = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(match => match[1]);
  assert.deepEqual(items.map(item => item.match(/<link>([^<]+)<\/link>/)?.[1]), getChronologicalEssays().map(essay => knowledgeUrl(essay.path)));
  for (const essay of all) {
    const item = items.find(item => item.includes(`<guid>${knowledgeUrl(essay.path)}</guid>`));
    assert.ok(item, essay.slug);
    if (essay.publishedAt) {
      assert.equal(item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1], new Date(`${essay.publishedAt}T00:00:00+09:00`).toUTCString());
      const entry = entries.find(entry => entry.url === knowledgeUrl(essay.path));
      assert.equal(new Date(entry!.lastModified!).toISOString().slice(0, 10), essay.updatedAt ?? essay.publishedAt);
    } else assert.doesNotMatch(item, /<pubDate>/, essay.slug);
  }
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
  const all = getSeriesEssays(); assert.equal(all.length, plannedEssays.length);
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
  const all = getSeriesEssays();
  const populatedThemes = essayThemes.filter(theme => all.some(essay => essay.theme === theme.name));
  const expectedPaths = ["/", ...all.map(essay => essay.path), ...populatedThemes.map(theme => `/topics/${theme.slug}`), "/about", "/contact", "/privacy"];
  assert.equal(sitemap().length, plannedEssays.length + populatedThemes.length + 4);
  assert.deepEqual(new Set(sitemap().map(entry => entry.url)), new Set(expectedPaths.map(knowledgeUrl)));
});

test("original twenty-nine manuscripts retain their credited source photographs and diagrams as the collection grows", () => {
  assert.equal(new Set(essayMedia.map(figure => figure.slug)).size, essayMedia.length);
  assert.equal(new Set(essayMedia.map(figure => figure.src)).size, essayMedia.length);
  assert.equal(new Set(essayPhotos.map(photo => photo.slug)).size, essayPhotos.length);
  for (const slug of preservedGenericSlugs) {
    const essay = getSeriesEssay(slug)!;
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
    const openingPhoto = html.match(/<figure\b[^>]*data-source-photo="[^"]+"[\s\S]*?<\/figure>/)?.[0];
    assert.ok(openingPhoto, essay.slug);
    assert.ok(openingPhoto.includes(photo.alt) && openingPhoto.includes(photo.credit.replaceAll("&", "&amp;")));
    assert.ok(openingPhoto.includes(`href="${photo.sourceUrl.replaceAll("&", "&amp;")}"`));
    assert.ok(openingPhoto.includes(`href="${photo.licenseUrl}"`));
    assert.match(openingPhoto, /<source type="image\/avif"/); assert.match(openingPhoto, /<source type="image\/webp"/);
    assert.match(openingPhoto, /loading="eager"/);
    assert.ok(html.indexOf(`data-source-photo="${essay.slug}"`) < html.indexOf(`id="${essay.sections[0].id}-title"`));
    for (const width of photo.widths) for (const format of ["avif", "webp", "jpg"] as const)
      assert.ok(fs.existsSync(`public${essayPhotoSrc(photo, width, format)}`));
    assert.match(openingPhoto, /<figcaption>/);
  }
});

test("new essays can publish original diagrams without borrowing a source photograph or linking missing reflections", () => {
  const essay = getSeriesEssay("simpson-paradox")!;
  const figure = essayMedia.find(item => item.slug === essay.slug)!;
  assert.ok(figure);
  assert.equal(getEssayPhoto(essay.slug), undefined);
  const html = renderToStaticMarkup(createElement(SeriesEssay, { essay }));
  assert.equal((html.match(/data-source-photo=/g) ?? []).length, 0);
  assert.equal((html.match(/data-essay-body-media=/g) ?? []).length, 1);
  assert.ok(html.includes(`src="${figure.src}"`) && html.includes(figure.alt));
  assert.match(html, /<time dateTime="2026-11-02"|<time datetime="2026-11-02"/);
  assert.doesNotMatch(html, /href="#reflection"|id="reflection"/);
  for (const section of essay.sections) {
    assert.ok(html.includes(`id="${section.id}"`));
    assert.ok(html.includes(`href="#${section.id}"`));
  }
  assert.match(html, /role="region" aria-label="비교표[^"]*" tabindex="0"><table>/);
});

test("body diagrams are original self-contained vectors without external loads or active content", () => {
  for (const figure of essayMedia) {
    const essay = getSeriesEssay(figure.slug);
    assert.ok(essay, figure.slug);
    assert.ok(essay.sections.some(section => section.id === figure.afterSection), figure.slug);
    assert.ok(essay.sources.some(source => source.url === figure.sourceUrl), figure.slug);
    assert.ok(figure.alt.length > 15 && figure.caption.length > 40, figure.slug);
    assert.match(figure.src, /^\/images\/essays\/[a-z0-9-]+\/concept\.svg$/);
    const svg = fs.readFileSync(`public${figure.src}`, "utf8");
    assert.ok(svg.includes(`viewBox="0 0 ${figure.width} ${figure.height}"`));
    if (preservedGenericSlugs.some(slug => slug === figure.slug)) assert.match(svg, /viewBox="0 0 640 460"/);
    assert.ok(svg.includes(figure.title));
    assert.doesNotMatch(svg, /<script|<foreignObject|<image|<!DOCTYPE|\son\w+=|(?:href|src)=|@import|<animate|<set\b/);
  }
});

test("calendar image credits follow the museum record without assigning an unverified artist", () => {
  const essay = getSeriesEssay("calendar")!;
  const photo = getEssayPhoto("calendar")!;
  const image = (knowledgeSchemas(essay.path, essay)[1] as { image: Record<string, unknown> }).image;
  assert.equal(image.creator, undefined);
  assert.match(photo.caption, /작가 미상.*1582년 7월–1583년 6월/);
  assert.ok(essay.sources.some(source => source.url === "https://brunelleschi.imss.fi.it/galileopalazzostrozzi/oggetto/CommissioneRiformaCalendario.html"));
});

test("Faraday replacement matches the credited Commons original and share-alike terms", () => {
  const photo = getEssayPhoto("electromagnetism")!;
  const provenance = JSON.parse(fs.readFileSync("assets/images/raw/faraday-magnetic-laboratory-andyscott.provenance.json", "utf8"));
  assert.equal(sha256(fs.readFileSync("assets/images/raw/faraday-magnetic-laboratory-andyscott.jpg")), provenance.sourceSha256);
  assert.equal(photo.assetVersion, provenance.sourceSha256.slice(0, 12));
  assert.equal(photo.creator, "AndyScott");
  assert.equal(photo.sourceUrl, provenance.sourceUrl);
  assert.equal(photo.licenseUrl, "https://creativecommons.org/licenses/by-sa/4.0/");
  const html = renderToStaticMarkup(createElement(SeriesEssay, { essay: getSeriesEssay("electromagnetism")! }));
  assert.match(html, /1831년 고리 장치의 실험 당시 사진은 아닙니다/);
  assert.match(html, /변환본에도 CC BY-SA 4.0을 적용합니다/);
  assert.doesNotMatch(html, /Faraday_ring_transformer/);
});

