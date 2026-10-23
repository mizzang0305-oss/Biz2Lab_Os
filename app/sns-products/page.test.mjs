import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

const page = new URL("./page.tsx", import.meta.url);
const expectedLinks = [
  "https://link.coupang.com/a/h46gxgapB6",
  "https://link.coupang.com/a/h46nILxxqS",
  "https://link.coupang.com/a/h48ZvkRi3M",
  "https://link.coupang.com/a/h488C5JQ7w",
  "https://link.coupang.com/a/h4898AeTTM",
];

// Regression target: an absent route, hidden disclosure, wrong product URL,
// unsafe outbound link, or invented product benefit must fail this check.
test("the product route discloses advertising before five verified direct product links", async () => {
  assert.ok(existsSync(page), "The approved /sns-products route is missing");
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { default: ProductsPage, metadata } = await import(page.href);
  const output = renderToStaticMarkup(createElement(ProductsPage));
  const text = output.replace(/<[^>]*>/g, " ");
  const anchors = [...output.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  const affiliateAnchors = anchors.filter((anchor) => anchor[1].includes("link.coupang.com"));
  assert.equal(affiliateAnchors.length, 5);
  assert.deepEqual(affiliateAnchors.map((anchor) => anchor[1].match(/href="([^"]+)"/)[1]), expectedLinks);
  for (const anchor of affiliateAnchors) {
    assert.match(anchor[1], /target="_blank"/);
    assert.match(anchor[1], /rel="sponsored noopener noreferrer"/);
    assert.match(anchor[1], /\bstyle="[^"]*\bcolor:#ffffff(?:;|")/i);
    assert.match(anchor[2], /상품·옵션 확인/);
  }
  const disclosure = "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";
  assert.ok(text.includes(disclosure));
  assert.ok(output.indexOf(disclosure) < output.indexOf(expectedLinks[0]));
  for (const required of ["JNL-S350K-PK", "350ml", "TKLF-1200F", "피치핑크", "TKLG-901", "885ml", "수저는 포함되지 않습니다", "전체 무카페인 세트는 아닙니다", "총 24입", "총 18입", "11/11", "11/19", "가격·할인·재고·배송 조건", "2026년 10월 23일"]) {
    assert.ok(text.includes(required), `Missing useful product detail: ${required}`);
  }
  assert.equal((output.match(/data-product=/g) ?? []).length, 5);
  assert.doesNotMatch(output, /<img\b|<form\b|<input\b|<script\b|<iframe\b|onclick=/i);
  assert.doesNotMatch(text, /최저가|가성비\s*1위|성적\s*향상|숙면\s*효과|써\s*봤|사용해\s*봤/);
  assert.equal(metadata.alternates.canonical, "https://www.biz2lab.com/sns-products");
  assert.deepEqual(metadata.robots, { index: false, follow: true });
});
