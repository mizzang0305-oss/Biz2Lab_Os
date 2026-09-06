import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import OnurimHomePage from "@/components/health/OnurimHomePage";
import sitemap from "@/app/sitemap";
import { healthArticles, healthTools, trustPages } from "@/lib/health-v3/content";
import { healthSupportGuides } from "@/lib/health-v3/support-guides";
import { homeUpdatedAt } from "@/lib/health-v3/entry-pages";

test("home has its own server-rendered reader choices instead of importing the full hub", () => {
  const root = readFileSync("app/page.tsx", "utf8");
  const html = renderToStaticMarkup(createElement(OnurimHomePage));
  assert.doesNotMatch(root, /from ["']\.\/health\/page/);
  assert.equal((html.match(/<h1>/g) ?? []).length, 1);
  for (const copy of ["진료 질문을 준비하세요", "지금 필요한 안내", "HbA1c", "NGSP", "가족과 진료", "현재 의료인 검수는 미완료", "새 글 접수 가능 여부는 확인되지 않았습니다"]) assert.ok(html.includes(copy), copy);
  assert.doesNotMatch(html, /실제 사람이 제보를 확인|issues\/new|저장하고 출력|의료 검수 완료|onurim-orbit/);
  assert.ok(html.indexOf("지금 위급하다면") < html.indexOf("알아보려는 질환이"));
  assert.match(html, /즉시 119에 연락/);
  assert.match(html, /기록을 완성하며 기다리지/);
});

test("every home content destination belongs to the existing inventory", () => {
  const routes = new Set(["/", "/health", ...Object.keys(healthArticles).map(s => `/health/${s}`),
    ...healthTools.map(t => `/health/tools/${t.slug}`), ...trustPages.map(p => `/health/trust/${p.slug}`),
    ...healthSupportGuides.map(g => `/health/guides/${g.slug}`)]);
  const html = renderToStaticMarkup(createElement(OnurimHomePage));
  for (const [, href] of html.matchAll(/href="(\/[^\"]*)"/g)) assert.ok(routes.has(href.split("#")[0]), href);
  assert.match(html, /href="\/health#tools"/);
  assert.doesNotMatch(html, /<input|<form|<textarea/);
});

test("home date matches sitemap without inventing other entry-page freshness", () => {
  const html = renderToStaticMarkup(createElement(OnurimHomePage));
  assert.ok(html.includes(`<time dateTime="${homeUpdatedAt}">${homeUpdatedAt}</time>`));
  const home = sitemap().find(entry => new URL(entry.url).pathname === "/")!;
  assert.equal(new Date(home.lastModified!).toISOString().slice(0, 10), homeUpdatedAt);
});
