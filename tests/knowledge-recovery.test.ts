import "./helpers/register-pocket-css";
import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextRequest } from "next/server";
import robots from "../app/robots";
import { proxy } from "../proxy";
import { EssayProvenance } from "../components/essays/EssayProvenance";

test("retired Korean routes can be crawled to observe permanent retirement while admin stays protected", () => {
  const rules = robots().rules;
  const all = Array.isArray(rules) ? rules : [rules];
  const generic = all.find(rule => rule.userAgent === "*")!;
  assert.ok(Array.isArray(generic.disallow));
  assert.ok(!generic.disallow.includes("/ko/"));
  assert.ok(generic.disallow.includes("/admin/"));
  assert.ok(generic.disallow.includes("/api/"));
  for (const path of ["/ko/about", "/ko/automation", "/ko/sales-ops", "/ko/old-article"]) {
    const response = proxy(new NextRequest(`https://www.biz2lab.com${path}`));
    assert.equal(response.status, 410, path);
    assert.match(response.headers.get("x-robots-tag")!, /noindex/);
  }
});

test("source record date is explicit, converts to KST, and is not called a publication date", () => {
  const html = renderToStaticMarkup(createElement(EssayProvenance, { sourceCheckedAt: "2026-10-04T22:57:19Z" }));
  assert.match(html, /dateTime="2026-10-05"/);
  assert.match(html, /자료 대조 기록/);
  assert.match(html, /글의 발행일이나 모든 출처의 최신성을 뜻하지 않습니다/);
  assert.match(html, /href="\/contact"/);
  for (const sourceCheckedAt of [null, "invalid"]) {
    assert.doesNotMatch(renderToStaticMarkup(createElement(EssayProvenance, { sourceCheckedAt })), /<time/);
  }
});
