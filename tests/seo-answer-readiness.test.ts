import assert from "node:assert/strict";
import test from "node:test";

import { getPublicPosts } from "@/lib/posts";
import { auditSeoAnswerReadiness } from "@/lib/seo-answer-readiness";

test("AI answer readiness audits every published article without changing routes", () => {
  const posts = getPublicPosts();
  const audit = auditSeoAnswerReadiness();

  assert.equal(audit.summary.totalArticles, posts.length);
  assert.equal(audit.articles.length, posts.length);
  assert.deepEqual(
    audit.articles.map((article) => article.route).sort(),
    posts.map((post) => post.route).sort(),
  );
  assert.equal(audit.summary.needsFaq, 0);
  assert.equal(audit.summary.overclaimingFaq, 0);
  assert.ok(audit.summary.readyArticles >= 6);
});

test("FAQ answer-source checks reject overclaim wording", () => {
  const audit = auditSeoAnswerReadiness();

  for (const article of audit.articles) {
    assert.equal(article.faqPresent, true, `${article.slug} must expose FAQ content`);
    assert.equal(article.overclaimingFaq, false, `${article.slug} FAQ must avoid overclaim wording`);
  }
});

test("recent automation tool reviews expose answer-friendly sections", () => {
  const requiredReadySlugs = new Set([
    "flowise-ai-agent-workflow-automation",
    "directus-headless-cms-data-automation",
    "pocketbase-lightweight-backend-saas-mvp",
    "supabase-self-hosting-cost-operations-caution",
    "meilisearch-blog-product-search-automation",
    "typesense-product-document-search-automation",
  ]);
  const auditsBySlug = new Map(auditSeoAnswerReadiness().articles.map((article) => [article.slug, article]));

  for (const slug of requiredReadySlugs) {
    const article = auditsBySlug.get(slug);

    assert.ok(article, `${slug} must have an AI answer readiness row`);
    assert.equal(article?.aiAnswerReadinessStatus, "AI 답변 준비 좋음");
    assert.equal(article?.conclusionFirstPresent, true);
    assert.equal(article?.citationFriendlySummaryPresent, true);
    assert.equal(article?.checklistPresent, true);
    assert.equal(article?.comparisonTablePresent, true);
    assert.equal(article?.fitAvoidPresent, true);
  }
});
