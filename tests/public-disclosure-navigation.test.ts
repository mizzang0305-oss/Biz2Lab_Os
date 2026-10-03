import "./helpers/register-pocket-css";
import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { PublicRouteChrome } from "../components/layout/PublicRouteChrome";
import { LivingArticle } from "../components/living/LivingArticle";
import { livingPosts } from "../lib/living-posts";
import PrivacyPage, { metadata } from "../app/privacy/page";
import { config } from "../proxy";

function chrome(pathname: string) {
  return renderToStaticMarkup(createElement(PathnameContext.Provider, { value: pathname },
    createElement(PublicRouteChrome, null, createElement("p", null, "page content"))));
}

test("every surviving public surface links to an unblocked privacy disclosure", () => {
  for (const path of ["/", "/privacy", "/pocket-money/guides/example", "/living", `/living/${livingPosts[0].slug}`]) {
    const html = chrome(path);
    assert.match(html, /<footer[\s\S]*href="\/privacy"/);
    assert.doesNotMatch(html, /href="\/(?:health|ko)(?:\/|")/);
  }
  assert.equal(unstable_doesMiddlewareMatch({ config, url: "/privacy" }), false);
  assert.equal(metadata.alternates?.canonical, "https://www.biz2lab.com/privacy");
  const html = renderToStaticMarkup(createElement(PrivacyPage));
  for (const copy of ["Google Analytics", "Google AdSense", "광고", "쿠키", "제3자", "개인 맞춤 광고"]) assert.ok(html.includes(copy), copy);
  assert.match(html, /href="https:\/\/adssettings.google.com\/"/);
  assert.match(html, /href="https:\/\/policies.google.com\/technologies\/partner-sites\?hl=ko"/);
  assert.doesNotMatch(html, /<form|<input|<textarea|href="\/ko\/contact"/);
});

test("living routes retain their own identity and working index navigation", () => {
  for (const path of ["/living", `/living/${livingPosts[0].slug}`]) {
    const html = chrome(path);
    assert.match(html, /<header[\s\S]*Biz2Lab 생활용품/);
    assert.match(html, /<header[\s\S]*href="\/living"/);
    assert.doesNotMatch(html, /보상 읽는 법|즐거운 용돈벌이|pocket-organization/);
    assert.equal(unstable_doesMiddlewareMatch({ config, url: path }), false);
  }
  assert.match(chrome("/"), /즐거운 용돈벌이/);
  const article = renderToStaticMarkup(createElement(LivingArticle, { post: livingPosts[0] }));
  assert.match(article, /href="\/living"[^>]*>생활용품 목록으로 돌아가기/);
  assert.match(article, /data-affiliate-disclosure/);
  assert.ok(article.includes(livingPosts[0].affiliateUrl.replaceAll("&", "&amp;")));
});
