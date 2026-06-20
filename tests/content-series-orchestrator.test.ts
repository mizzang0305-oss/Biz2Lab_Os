import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  assertTopicCanPublish,
  assertValidCodexImageArtifact,
  buildContentIndexEntry,
  buildContentSeriesPlan,
  buildImageAssetEntry,
  buildImagePaths,
  buildInternalLinkRoutes,
  CONTENT_SERIES_VALIDATION_COMMANDS,
  ContentSeriesError,
  readContentSeriesState,
  readContentSeriesTopics,
  resolveContentSeriesTopic,
  runContentSeriesOrchestrator,
} from "@/scripts/content-series-orchestrator";

function tempSeriesRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-series-"));
  fs.mkdirSync(path.join(root, "data"), { recursive: true });
  fs.copyFileSync(
    path.join(process.cwd(), "data", "content-series-state.json"),
    path.join(root, "data", "content-series-state.json"),
  );
  fs.copyFileSync(
    path.join(process.cwd(), "data", "content-series-topics.json"),
    path.join(root, "data", "content-series-topics.json"),
  );
  return root;
}

function nodeRedTopic() {
  const state = readContentSeriesState();
  const topics = readContentSeriesTopics();
  return {
    state,
    topic: resolveContentSeriesTopic(topics.topics, state, "node-red"),
  };
}

test("content series state parses and keeps safety gates closed", () => {
  const state = readContentSeriesState();

  assert.equal(state.series, "free-open-source-automation-tools");
  assert.deepEqual(state.completed.slice(0, 3), [
    "opencut-free-open-source-video-editor-ai-content-automation",
    "free-open-source-automation-tools-series",
    "activepieces-ai-business-automation-n8n-alternative",
  ]);
  assert.equal(state.gates.manualDeploy, false);
  assert.equal(state.gates.autoMerge, false);
  assert.equal(state.gates.dbWrite, false);
  assert.equal(state.gates.externalBusinessApi, false);
  assert.equal(state.gates.placeholderImages, false);
  assert.equal(state.gates.requireRealHeroImage, true);
});

test("content series topic config parses required upcoming topics", () => {
  const topics = readContentSeriesTopics();
  const slugs = topics.topics.map((topic) => topic.slug);

  assert.ok(slugs.includes("node-red-local-business-automation-server"));
  assert.ok(slugs.includes("huginn-monitoring-automation-agent"));
  assert.ok(slugs.includes("baserow-open-source-database-automation"));
  assert.ok(slugs.includes("appsmith-internal-dashboard-automation"));
  assert.ok(slugs.includes("windmill-developer-workflow-automation"));
  assert.ok(slugs.includes("kestra-data-ai-workflow-orchestration"));
});

test("duplicate completed topics are rejected", () => {
  const { state, topic } = nodeRedTopic();
  const duplicateState = {
    ...state,
    completed: [...state.completed, topic.slug],
  };

  assert.throws(
    () => assertTopicCanPublish(duplicateState, topic),
    (error) => error instanceof ContentSeriesError && error.code === "TOPIC_ALREADY_COMPLETED",
  );
});

test("missing Codex image artifact blocks publication without writing article", async () => {
  const root = tempSeriesRoot();

  await assert.rejects(
    () => runContentSeriesOrchestrator({ rootDir: root, topic: "node-red", noCommit: true }),
    (error) =>
      error instanceof ContentSeriesError &&
      error.code === "CODEX_GENERATED_IMAGE_ARTIFACT_MISSING",
  );

  const { topic } = nodeRedTopic();
  assert.equal(fs.existsSync(path.join(root, ...buildImagePaths(topic).articleRepoPath.split("/"))), false);
});

test("placeholder-named artifacts are rejected before publication", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactDir = path.join(root, "artifacts", "codex-images");
  fs.mkdirSync(artifactDir, { recursive: true });
  const artifactPath = path.join(artifactDir, `${topic.slug}-hero-placeholder.jpg`);
  const fakeJpeg = Buffer.alloc(5000);
  fakeJpeg[0] = 0xff;
  fakeJpeg[1] = 0xd8;
  fs.writeFileSync(artifactPath, fakeJpeg);

  assert.throws(
    () => assertValidCodexImageArtifact(artifactPath, topic, state),
    (error) => error instanceof ContentSeriesError && error.code === "PLACEHOLDER_IMAGE_REJECTED",
  );
});

test("internal link generation includes series hub and existing public articles", () => {
  const { topic } = nodeRedTopic();
  const routes = buildInternalLinkRoutes(topic);

  assert.ok(routes.includes("/ko/automation/free-open-source-automation-tools-series"));
  assert.ok(routes.includes("/ko/automation/activepieces-ai-business-automation-n8n-alternative"));
  assert.ok(routes.includes("/ko/automation/opencut-free-open-source-video-editor-ai-content-automation"));
});

test("content index helper emits the expected public route and hero image", () => {
  const { topic } = nodeRedTopic();
  const entry = buildContentIndexEntry(topic, "2026-06-20");

  assert.equal(entry.slug, topic.slug);
  assert.equal(entry.route, `/ko/automation/${topic.slug}`);
  assert.equal(entry.heroImage, `/images/posts/${topic.slug}-hero.webp`);
  assert.equal(entry.category, "automation");
});

test("image registry helper keeps raw and public paths in guarded directories", () => {
  const { topic } = nodeRedTopic();
  const entry = buildImageAssetEntry(topic, { width: 1200, height: 675 });

  assert.equal(entry.id, `${topic.slug}-hero`);
  assert.equal(entry.rawPath, `assets/images/raw/${topic.slug}-hero.jpg`);
  assert.equal(entry.src, `/images/posts/${topic.slug}-hero.webp`);
  assert.equal(entry.status, "active");
});

test("validation command list includes all required gates", () => {
  assert.deepEqual([...CONTENT_SERIES_VALIDATION_COMMANDS], [
    "npm run image-skill:plan",
    "npm run image-skill:validate",
    "npm run optimize-images",
    "npm run validate:posts",
    "npm run validate:images",
    "npm test",
    "npm run lint",
    "npm run typecheck",
    "npm run build",
    "npm run check:links",
    "npm run validate:seo",
    "npm run audit:image-briefs",
    "npm run audit:image-prompts",
    "npm run audit:content-authority",
    "git diff --check",
  ]);
});

test("plan-only can inspect a later topic but reports publication blockers", () => {
  const state = readContentSeriesState();
  const topics = readContentSeriesTopics();
  const topic = resolveContentSeriesTopic(topics.topics, state, "huginn");
  const plan = buildContentSeriesPlan(state, topic, { planOnly: true });

  assert.equal(plan.topic.slug, "huginn-monitoring-automation-agent");
  assert.ok(plan.publicationBlockers.some((blocker) => blocker.includes("previous article is not public yet")));
});

test("orchestrator source does not contain merge or manual deploy commands", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "scripts", "content-series-orchestrator.ts"), "utf8");

  assert.doesNotMatch(source, /gh\s+pr\s+merge/);
  assert.doesNotMatch(source, /vercel\s+deploy/);
});
