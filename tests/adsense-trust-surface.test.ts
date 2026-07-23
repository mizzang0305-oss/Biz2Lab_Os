import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import sitemap from "@/app/sitemap";
import { organizationJsonLd, staticPublicRoutes, websiteJsonLd } from "@/lib/seo";

const rootDir = process.cwd();

function readSource(...segments: string[]) {
  return fs.readFileSync(path.join(rootDir, ...segments), "utf8");
}

test("privacy policy discloses active Google measurement and advertising services", () => {
  const privacy = readSource("app", "ko", "privacy", "page.tsx");

  assert.match(privacy, /Google Analytics/);
  assert.match(privacy, /Google AdSense/);
  assert.match(privacy, /adssettings\.google\.com/);
  assert.match(privacy, /policies\.google\.com\/technologies\/partner-sites/);
  assert.match(privacy, /쿠키/);
});

test("public trust surfaces avoid unfinished wording and expose a working contact path", () => {
  const footer = readSource("lib", "site-settings.ts");
  const contact = readSource("app", "ko", "contact", "page.tsx");
  const about = readSource("app", "ko", "about", "page.tsx");
  const article = readSource("app", "ko", "[category]", "[slug]", "page.tsx");

  assert.doesNotMatch(footer, /최소 공개 버전/);
  assert.match(contact, /github\.com\/mizzang0305-oss\/Biz2Lab_Os\/issues\/new/);
  assert.doesNotMatch(contact, /ContactForm/);
  assert.match(about, /AI 도구/);
  assert.match(about, /독창성 검토/);
  assert.match(article, /작성·검토: Biz2Lab 편집팀/);
  assert.match(article, /\/ko\/about/);
});

test("the Korean homepage is the single indexable homepage", () => {
  const rootPage = readSource("app", "page.tsx");
  const sitemapUrls = sitemap().map((entry) => entry.url);

  assert.match(rootPage, /permanentRedirect\("\/ko"\)/);
  assert.equal(staticPublicRoutes.includes("/" as never), false);
  assert.equal(sitemapUrls.includes("https://www.biz2lab.com"), false);
  assert.equal(sitemapUrls.includes("https://www.biz2lab.com/ko"), true);
});

test("structured data only advertises real public capabilities", () => {
  const organization = organizationJsonLd();
  const website = websiteJsonLd();

  assert.equal("contactPoint" in organization, false);
  assert.deepEqual(organization.sameAs, ["https://github.com/mizzang0305-oss"]);
  assert.equal("potentialAction" in website, false);
  assert.equal(website.url, "https://www.biz2lab.com/ko");
});
