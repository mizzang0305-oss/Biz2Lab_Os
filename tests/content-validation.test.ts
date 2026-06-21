import assert from "node:assert/strict";
import test from "node:test";

import {
  summarizePublishedPosts,
  validatePublishedPostInventory,
  type ContentIndexRow,
  type PublicPostValidationRecord,
} from "@/lib/content-validation";

function post(
  slug: string,
  overrides: Partial<PublicPostValidationRecord["frontmatter"]> = {},
): PublicPostValidationRecord {
  return {
    slug,
    route: `/ko/automation/${slug}`,
    category: "automation",
    frontmatter: {
      locale: "ko",
      status: "published",
      draft: false,
      noindex: false,
      title: `${slug} title`,
      heroImage: `/images/posts/${slug}-hero.webp`,
      heroAlt: `${slug} Korean alt text`,
      ...overrides,
    },
  };
}

function row(slug: string, overrides: Partial<ContentIndexRow> = {}): ContentIndexRow {
  return {
    slug,
    route: `/ko/automation/${slug}`,
    category: "automation",
    heroImage: `/images/posts/${slug}-hero.webp`,
    heroAlt: `${slug} Korean alt text`,
    title: `${slug} title`,
    ...overrides,
  };
}

const imageExists = () => true;

test("published post counts are derived from canonical post records", () => {
  const posts = [post("first-topic"), post("second-topic")];
  const summary = summarizePublishedPosts(posts);

  assert.equal(summary.total, 2);
  assert.equal(summary.categoryCounts.automation, 2);
});

test("a new valid article increments inventory without manual fixed-count edits", () => {
  const posts = [post("first-topic")];
  const contentIndexRows = [row("first-topic")];

  assert.deepEqual(
    validatePublishedPostInventory({ posts, contentIndexRows, publicFileExists: imageExists }),
    [],
  );

  assert.deepEqual(
    validatePublishedPostInventory({
      posts: [...posts, post("second-topic")],
      contentIndexRows: [...contentIndexRows, row("second-topic")],
      publicFileExists: imageExists,
    }),
    [],
  );
});

test("missing markdown article still fails when content index references it", () => {
  assert.deepEqual(
    validatePublishedPostInventory({
      posts: [post("first-topic")],
      contentIndexRows: [row("first-topic"), row("missing-topic")],
      publicFileExists: imageExists,
    }),
    ["missing-topic: content-index entry has no counted published markdown post"],
  );
});

test("missing hero image still fails", () => {
  assert.deepEqual(
    validatePublishedPostInventory({
      posts: [post("first-topic")],
      contentIndexRows: [row("first-topic")],
      publicFileExists: () => false,
    }),
    ["first-topic: missing hero image /images/posts/first-topic-hero.webp"],
  );
});

test("missing content index entry still fails", () => {
  assert.deepEqual(
    validatePublishedPostInventory({
      posts: [post("first-topic")],
      contentIndexRows: [],
      publicFileExists: imageExists,
    }),
    ["first-topic: missing content-index entry"],
  );
});

test("draft and noindex articles do not count as published inventory", () => {
  const summary = summarizePublishedPosts([
    post("published-topic"),
    post("draft-topic", { draft: true }),
    post("noindex-topic", { noindex: true }),
  ]);

  assert.equal(summary.total, 1);
  assert.deepEqual(summary.categoryCounts, { automation: 1 });
});

test("validation is not weakened for mismatched content index metadata", () => {
  assert.deepEqual(
    validatePublishedPostInventory({
      posts: [post("first-topic")],
      contentIndexRows: [row("first-topic", { route: "/ko/automation/wrong-topic" })],
      publicFileExists: imageExists,
    }),
    ["first-topic: content-index route must be /ko/automation/first-topic"],
  );
});
