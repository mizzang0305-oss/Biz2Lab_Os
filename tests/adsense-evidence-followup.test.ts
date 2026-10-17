import "./helpers/register-pocket-css";
import assert from "node:assert/strict";
import test from "node:test";
import { Children, isValidElement } from "react";
import { unstable_getResponseFromNextConfig } from "next/experimental/testing/server";
import nextConfig from "../next.config";
import { SeriesEssay } from "../components/essays/SeriesEssay";
import { getSeriesEssay } from "../lib/essays/series";

test("public HTML aliases reach the served MINZ page and keep query values", async () => {
  for (const [source, destination] of [
    ["/minz-lineup/index.html", "/minz-lineup"],
    ["/minz-lineup/showcase/index.html", "/minz-lineup/showcase"],
    ["/minz-lineup/showcase/gallery/index.html", "/minz-lineup/showcase/gallery"],
    ["/minz-lineup/design-factory-v5/index.html", "/minz-lineup/design-factory-v5"],
  ]) {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://www.biz2lab.com${source}?view=example`,
      nextConfig,
    });
    assert.equal(response.status, 308, source);
    assert.equal(response.headers.get("location"), `https://www.biz2lab.com${destination}?view=example`);
  }
});

test("the internal preview shell stays accessible but excluded from indexing", async () => {
  const oldEnv = process.env.VERCEL_ENV;
  const oldApproval = process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED;
  try {
    process.env.VERCEL_ENV = "production";
    process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED = "true";
    const response = await unstable_getResponseFromNextConfig({
      url: "https://www.biz2lab.com/minz-lineup/design-factory-v5/preview.html",
      nextConfig,
    });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/);
    const article = await unstable_getResponseFromNextConfig({
      url: "https://www.biz2lab.com/essays/archives-silence",
      nextConfig,
    });
    assert.equal(article.headers.get("x-robots-tag"), null);
  } finally {
    if (oldEnv === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = oldEnv;
    if (oldApproval === undefined) delete process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED;
    else process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED = oldApproval;
  }
});

test("non-calculator essays do not instantiate a calculator client boundary", () => {
  function slugBoundaries(node: unknown): string[] {
    if (!isValidElement<{ slug?: string; children?: React.ReactNode }>(node)) return [];
    return [
      ...(typeof node.type !== "string" && node.props.slug ? [node.props.slug] : []),
      ...Children.toArray(node.props.children).flatMap(slugBoundaries),
    ];
  }
  // RelatedReading is expected on both pages; the extra slug boundary is the experiment.
  assert.deepEqual(slugBoundaries(SeriesEssay({ essay: getSeriesEssay("frankenstein-ai")! })), ["frankenstein-ai"]);
  assert.deepEqual(slugBoundaries(SeriesEssay({ essay: getSeriesEssay("eratosthenes")! })), ["eratosthenes", "eratosthenes"]);
});

