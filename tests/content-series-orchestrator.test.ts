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
  filterCommittablePaths,
  findCodexImageArtifact,
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

function writeJpegLikeArtifact(filePath: string, size = 5000) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const fakeJpeg = Buffer.alloc(size);
  fakeJpeg[0] = 0xff;
  fakeJpeg[1] = 0xd8;
  fs.writeFileSync(filePath, fakeJpeg);
}

function withIsolatedGeneratedImagesDir<T>(root: string, callback: () => T) {
  const previous = process.env.CODEX_GENERATED_IMAGES_DIR;
  process.env.CODEX_GENERATED_IMAGES_DIR = path.join(root, "isolated-generated-images");
  try {
    return callback();
  } finally {
    if (previous === undefined) {
      delete process.env.CODEX_GENERATED_IMAGES_DIR;
    } else {
      process.env.CODEX_GENERATED_IMAGES_DIR = previous;
    }
  }
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
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_PLACEHOLDER_REJECTED",
  );
});

test("explicit artifact selector still accepts a real user-provided image", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactPath = path.join(root, "outside-user-drop", "user-selected-image.jpg");
  writeJpegLikeArtifact(artifactPath);

  const found = findCodexImageArtifact(root, topic, state, {
    explicitArtifact: artifactPath,
  });

  assert.equal(found, artifactPath);
});

test("artifact-dir selector accepts one valid single-image directory", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactDir = path.join(root, "single-image-drop");
  const artifactPath = path.join(artifactDir, "codex-output.jpg");
  writeJpegLikeArtifact(artifactPath);

  const found = findCodexImageArtifact(root, topic, state, {
    artifactDir,
  });

  assert.equal(found, artifactPath);
});

test("artifact-dir selector accepts manifest-mapped image when filenames are not slugged", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactDir = path.join(root, "manifest-drop");
  const artifactPath = path.join(artifactDir, "image-0001.png");
  writeJpegLikeArtifact(artifactPath);
  fs.writeFileSync(
    path.join(artifactDir, "manifest.json"),
    JSON.stringify({ images: [{ file: "image-0001.png", slug: topic.slug }] }, null, 2),
    "utf8",
  );

  const found = findCodexImageArtifact(root, topic, state, {
    artifactDir,
  });

  assert.equal(found, artifactPath);
});

test("latest Codex artifact selector finds one valid slug-matched image", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactPath = path.join(root, "artifacts", "codex-images", `${topic.slug}-hero.png`);
  writeJpegLikeArtifact(artifactPath);

  const found = withIsolatedGeneratedImagesDir(root, () =>
    findCodexImageArtifact(root, topic, state, {
      useLatestCodexArtifact: true,
    }),
  );

  assert.equal(found, artifactPath);
});

test("artifact auto-discovery blocks ambiguous target matches", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  writeJpegLikeArtifact(path.join(root, "artifacts", "codex-images", `${topic.slug}-hero-a.jpg`));
  writeJpegLikeArtifact(path.join(root, "artifacts", "codex-images", `${topic.slug}-hero-b.jpg`));

  assert.throws(
    () => withIsolatedGeneratedImagesDir(root, () => findCodexImageArtifact(root, topic, state, { useLatestCodexArtifact: true })),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_AUTO_DISCOVERY_AMBIGUOUS",
  );
});

test("manifest slug mismatch blocks artifact-dir selection", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactDir = path.join(root, "mismatch-drop");
  const artifactPath = path.join(artifactDir, `${topic.slug}-hero.png`);
  writeJpegLikeArtifact(artifactPath);
  fs.writeFileSync(
    path.join(artifactDir, "manifest.json"),
    JSON.stringify({ images: [{ file: path.basename(artifactPath), slug: "huginn-monitoring-automation-agent" }] }, null, 2),
    "utf8",
  );

  assert.throws(
    () => findCodexImageArtifact(root, topic, state, { artifactDir }),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_SLUG_MISMATCH",
  );
});

test("unsupported artifact extension blocks selection", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactPath = path.join(root, "outside-user-drop", `${topic.slug}-hero.gif`);
  writeJpegLikeArtifact(artifactPath);

  assert.throws(
    () => findCodexImageArtifact(root, topic, state, { explicitArtifact: artifactPath }),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_UNSUPPORTED_FORMAT",
  );
});

test("tiny image-like artifacts are rejected as placeholder-like", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactPath = path.join(root, "artifacts", "codex-images", `${topic.slug}-hero.jpg`);
  writeJpegLikeArtifact(artifactPath, 128);

  assert.throws(
    () => withIsolatedGeneratedImagesDir(root, () => findCodexImageArtifact(root, topic, state, { useLatestCodexArtifact: true })),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_PLACEHOLDER_REJECTED",
  );
});

test("local Codex artifact source directories are excluded from commit staging", () => {
  assert.deepEqual(
    filterCommittablePaths([
      ".codex-remote-attachments/image.png",
      ".codex/config.toml",
      ".codex/generated_images/node-red-local-business-automation-server-hero.png",
      "artifacts/codex-images/node-red-local-business-automation-server-hero.png",
      "generated/node-red-local-business-automation-server-hero.png",
      "output/node-red-local-business-automation-server-hero.png",
      "tmp/node-red-local-business-automation-server-hero.png",
      "content/ko/automation/node-red-local-business-automation-server.md",
    ]),
    ["content/ko/automation/node-red-local-business-automation-server.md"],
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
