import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  assertTopicCanPublish,
  assertValidCodexImageArtifact,
  buildArticleMarkdown,
  buildContentIndexEntry,
  buildContentSeriesPlan,
  buildImageAssetEntry,
  buildOptimizedHeroImageMetadata,
  buildImagePaths,
  buildInternalLinkRoutes,
  CONTENT_SERIES_VALIDATION_COMMANDS,
  ContentSeriesError,
  filterCommittablePaths,
  findCodexImageArtifact,
  insertArticleImageConceptEntry,
  readContentSeriesState,
  readContentSeriesTopics,
  resolveExecFileInvocation,
  resolveContentSeriesTopic,
  runContentSeriesOrchestrator,
} from "@/scripts/content-series-orchestrator";

const secondAutomationQueue = [
  "dify-llm-app-builder-business-automation",
  "open-webui-local-llm-admin-portal",
  "flowise-ai-agent-workflow-automation",
  "directus-headless-cms-data-automation",
  "pocketbase-lightweight-backend-saas-mvp",
  "supabase-self-hosting-cost-operations-caution",
  "meilisearch-blog-product-search-automation",
  "typesense-product-document-search-automation",
  "umami-open-source-analytics-ga-alternative",
];

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

function currentSeriesTopic() {
  const state = readContentSeriesState();
  const topics = readContentSeriesTopics();
  return {
    state,
    topic: resolveContentSeriesTopic(topics.topics, state, state.currentTopic),
  };
}

function writeJpegLikeArtifact(filePath: string, size = 5000) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const fakeJpeg = Buffer.alloc(size);
  fakeJpeg[0] = 0xff;
  fakeJpeg[1] = 0xd8;
  fs.writeFileSync(filePath, fakeJpeg);
}

function withIsolatedGeneratedImagesDir<T>(root: string, callback: (generatedRoot: string) => T) {
  const previousRoot = process.env.CODEX_GENERATED_IMAGE_ROOT;
  const previousDir = process.env.CODEX_GENERATED_IMAGES_DIR;
  const generatedRoot = path.join(root, "isolated-generated-images");
  process.env.CODEX_GENERATED_IMAGE_ROOT = generatedRoot;
  delete process.env.CODEX_GENERATED_IMAGES_DIR;
  try {
    return callback(generatedRoot);
  } finally {
    if (previousRoot === undefined) {
      delete process.env.CODEX_GENERATED_IMAGE_ROOT;
    } else {
      process.env.CODEX_GENERATED_IMAGE_ROOT = previousRoot;
    }
    if (previousDir === undefined) {
      delete process.env.CODEX_GENERATED_IMAGES_DIR;
    } else {
      process.env.CODEX_GENERATED_IMAGES_DIR = previousDir;
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
  assert.ok(state.completed.includes("node-red-local-business-automation-server"));
  assert.ok(state.completed.includes("huginn-monitoring-automation-agent"));
  assert.ok(state.completed.includes("baserow-open-source-database-automation"));
  assert.ok(state.completed.includes("appsmith-internal-dashboard-automation"));
  assert.ok(state.completed.includes("windmill-developer-workflow-automation"));
  assert.ok(state.completed.includes("kestra-data-ai-workflow-orchestration"));
  assert.ok(state.completed.includes("n8n-workflow-automation-license-caution"));
  assert.ok(state.completed.includes("nocodb-airtable-alternative-license-caution"));
  assert.ok(state.completed.includes("crawl4ai-blog-research-automation"));
  assert.ok(state.completed.includes("langflow-ai-workflow-automation"));
  assert.equal(state.currentTopic, "dify-llm-app-builder-business-automation");
  assert.deepEqual(state.next, secondAutomationQueue);
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
  assert.ok(slugs.includes("n8n-workflow-automation-license-caution"));
  assert.ok(slugs.includes("nocodb-airtable-alternative-license-caution"));
  assert.ok(slugs.includes("crawl4ai-blog-research-automation"));
  assert.ok(slugs.includes("langflow-ai-workflow-automation"));
  for (const slug of secondAutomationQueue) {
    assert.ok(slugs.includes(slug), `missing ${slug}`);
  }
  for (const topic of topics.topics.filter((topic) => secondAutomationQueue.includes(topic.slug))) {
    assert.doesNotMatch(topic.title, /\?\?/);
    assert.doesNotMatch(topic.description, /\?\?/);
  }
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

  await withIsolatedGeneratedImagesDir(root, async () => {
    await assert.rejects(
      () => runContentSeriesOrchestrator({ rootDir: root, topic: "dify", noCommit: true }),
      (error) =>
        error instanceof ContentSeriesError &&
        error.code === "CODEX_GENERATED_IMAGE_ARTIFACT_MISSING",
    );
  });

  const { topic } = currentSeriesTopic();
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

test("explicit artifact selector accepts a slugged artifact under the approved Codex root", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();

  const found = withIsolatedGeneratedImagesDir(root, (generatedRoot) => {
    const artifactPath = path.join(generatedRoot, `${topic.slug}-hero.jpg`);
    writeJpegLikeArtifact(artifactPath);

    return findCodexImageArtifact(root, topic, state, {
      explicitArtifact: artifactPath,
    });
  });

  assert.equal(found, path.join(root, "isolated-generated-images", `${topic.slug}-hero.jpg`));
});

test("explicit artifact selector rejects paths outside the approved Codex root", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactPath = path.join(root, "outside-user-drop", `${topic.slug}-hero.jpg`);
  writeJpegLikeArtifact(artifactPath);

  assert.throws(
    () =>
      withIsolatedGeneratedImagesDir(root, () =>
        findCodexImageArtifact(root, topic, state, {
          explicitArtifact: artifactPath,
        }),
      ),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_PROVENANCE_REJECTED",
  );
});

test("explicit artifact selector still requires slug or manifest matching", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();

  assert.throws(
    () =>
      withIsolatedGeneratedImagesDir(root, (generatedRoot) => {
        const artifactPath = path.join(generatedRoot, "image-0001.jpg");
        writeJpegLikeArtifact(artifactPath);
        return findCodexImageArtifact(root, topic, state, {
          explicitArtifact: artifactPath,
        });
      }),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_SLUG_MISMATCH",
  );
});

test("manual drop and common desktop/download paths are rejected as non-Codex artifacts", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const manualPaths = [
    path.join(root, "outside-user-drop", "user-selected-image.jpg"),
    path.join(root, "Downloads", `${topic.slug}-hero.png`),
    path.join(root, "Desktop", `${topic.slug}-hero.webp`),
  ];
  for (const artifactPath of manualPaths) {
    writeJpegLikeArtifact(artifactPath);
    assert.throws(
      () =>
        withIsolatedGeneratedImagesDir(root, () =>
          findCodexImageArtifact(root, topic, state, {
            explicitArtifact: artifactPath,
          }),
        ),
      (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_PROVENANCE_REJECTED",
    );
  }
});

test("artifact-dir selector accepts one valid single-image directory under the approved Codex root", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();

  const found = withIsolatedGeneratedImagesDir(root, (generatedRoot) => {
    const artifactDir = path.join(generatedRoot, "single-image-drop");
    const artifactPath = path.join(artifactDir, "codex-output.jpg");
    writeJpegLikeArtifact(artifactPath);

    return findCodexImageArtifact(root, topic, state, {
      artifactDir,
    });
  });

  assert.equal(found, path.join(root, "isolated-generated-images", "single-image-drop", "codex-output.jpg"));
});

test("artifact-dir selector rejects directories outside the approved Codex root", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  const artifactDir = path.join(root, "manual-image-folder");
  writeJpegLikeArtifact(path.join(artifactDir, `${topic.slug}-hero.jpg`));

  assert.throws(
    () =>
      withIsolatedGeneratedImagesDir(root, () =>
        findCodexImageArtifact(root, topic, state, {
          artifactDir,
        }),
      ),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_PROVENANCE_REJECTED",
  );
});

test("artifact-dir selector accepts manifest-mapped image when filenames are not slugged", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();

  const found = withIsolatedGeneratedImagesDir(root, (generatedRoot) => {
    const artifactDir = path.join(generatedRoot, "manifest-drop");
    const artifactPath = path.join(artifactDir, "image-0001.png");
    writeJpegLikeArtifact(artifactPath);
    fs.writeFileSync(
      path.join(artifactDir, "manifest.json"),
      JSON.stringify({ images: [{ file: "image-0001.png", slug: topic.slug }] }, null, 2),
      "utf8",
    );

    return findCodexImageArtifact(root, topic, state, {
      artifactDir,
    });
  });

  assert.equal(found, path.join(root, "isolated-generated-images", "manifest-drop", "image-0001.png"));
});

test("latest Codex artifact selector finds one valid slug-matched image", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();

  const found = withIsolatedGeneratedImagesDir(root, (generatedRoot) => {
    const artifactPath = path.join(generatedRoot, `${topic.slug}-hero.png`);
    writeJpegLikeArtifact(artifactPath);

    return findCodexImageArtifact(root, topic, state, {
      useLatestCodexArtifact: true,
    });
  });

  assert.equal(found, path.join(root, "isolated-generated-images", `${topic.slug}-hero.png`));
});

test("latest Codex artifact selector ignores broad repo artifact folders", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();
  writeJpegLikeArtifact(path.join(root, "artifacts", "codex-images", `${topic.slug}-hero.png`));

  assert.throws(
    () =>
      withIsolatedGeneratedImagesDir(root, () =>
        findCodexImageArtifact(root, topic, state, {
          useLatestCodexArtifact: true,
        }),
      ),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_GENERATED_IMAGE_ARTIFACT_MISSING",
  );
});

test("artifact auto-discovery blocks ambiguous target matches", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();

  assert.throws(
    () =>
      withIsolatedGeneratedImagesDir(root, (generatedRoot) => {
        writeJpegLikeArtifact(path.join(generatedRoot, `${topic.slug}-hero-a.jpg`));
        writeJpegLikeArtifact(path.join(generatedRoot, `${topic.slug}-hero-b.jpg`));
        return findCodexImageArtifact(root, topic, state, { useLatestCodexArtifact: true });
      }),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_AUTO_DISCOVERY_AMBIGUOUS",
  );
});

test("manifest slug mismatch blocks artifact-dir selection", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();

  assert.throws(
    () =>
      withIsolatedGeneratedImagesDir(root, (generatedRoot) => {
        const artifactDir = path.join(generatedRoot, "mismatch-drop");
        const artifactPath = path.join(artifactDir, `${topic.slug}-hero.png`);
        writeJpegLikeArtifact(artifactPath);
        fs.writeFileSync(
          path.join(artifactDir, "manifest.json"),
          JSON.stringify({ images: [{ file: path.basename(artifactPath), slug: "huginn-monitoring-automation-agent" }] }, null, 2),
          "utf8",
        );
        return findCodexImageArtifact(root, topic, state, { artifactDir });
      }),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_SLUG_MISMATCH",
  );
});

test("unsupported artifact extension blocks selection", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();

  assert.throws(
    () =>
      withIsolatedGeneratedImagesDir(root, (generatedRoot) => {
        const artifactPath = path.join(generatedRoot, `${topic.slug}-hero.gif`);
        writeJpegLikeArtifact(artifactPath);
        return findCodexImageArtifact(root, topic, state, { explicitArtifact: artifactPath });
      }),
    (error) => error instanceof ContentSeriesError && error.code === "CODEX_ARTIFACT_UNSUPPORTED_FORMAT",
  );
});

test("tiny image-like artifacts are rejected as placeholder-like", () => {
  const root = tempSeriesRoot();
  const { state, topic } = nodeRedTopic();

  assert.throws(
    () =>
      withIsolatedGeneratedImagesDir(root, (generatedRoot) => {
        const artifactPath = path.join(generatedRoot, `${topic.slug}-hero.jpg`);
        writeJpegLikeArtifact(artifactPath, 128);
        return findCodexImageArtifact(root, topic, state, { useLatestCodexArtifact: true });
      }),
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
      "data/content-series-run-state.json",
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

test("generated article markdown includes authority sections and Korean related labels", () => {
  const state = readContentSeriesState();
  const topics = readContentSeriesTopics();
  const topic = resolveContentSeriesTopic(topics.topics, state, "windmill");
  const markdown = buildArticleMarkdown(topic, "2026-06-20");

  for (const heading of ["문제 정의", "핵심 개념", "현장 시나리오", "실행 절차", "자동화 구조", "리스크와 방지책", "도입 순서"]) {
    assert.ok(markdown.includes(`## ${heading}`), `missing ${heading}`);
  }
  assert.ok((markdown.match(/question:/g) ?? []).length >= 3);
  assert.match(markdown, /\[무료 오픈소스 자동화 도구 시리즈\]\(\/ko\/automation\/free-open-source-automation-tools-series\)/);
  assert.doesNotMatch(markdown, /\[free-open-source-automation-tools-series\]\(\/ko\/automation\/free-open-source-automation-tools-series\)/);
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

test("optimized hero metadata derives public WebP dimensions without reading the output file", () => {
  const { topic } = nodeRedTopic();

  assert.deepEqual(buildOptimizedHeroImageMetadata(topic, { width: 1600, height: 900 }), {
    path: `public/images/posts/${topic.slug}-hero.webp`,
    width: 1200,
    height: 675,
    format: "webp",
  });
  assert.deepEqual(buildOptimizedHeroImageMetadata(topic, { width: 800, height: 600 }), {
    path: `public/images/posts/${topic.slug}-hero.webp`,
    width: 800,
    height: 600,
    format: "webp",
  });
});

test("article image concept insertion preserves typed entries export", () => {
  const state = readContentSeriesState();
  const topics = readContentSeriesTopics();
  const baseTopic = resolveContentSeriesTopic(topics.topics, state, "windmill");
  const topic = {
    ...baseTopic,
    slug: "test-generated-topic",
    imageConcept: {
      ...baseTopic.imageConcept,
      visualFamily: "test-visual-family",
      promptSummaryKo: "테스트 자동화 이미지 콘셉트",
      altKo: "테스트 자동화 대표 이미지",
      captionKo: "테스트 자동화 대표 이미지 설명",
      mustInclude: ["workflow", "approval", "dashboard"],
      mustAvoid: ["official logo"],
    },
  };
  const current = fs.readFileSync(path.join(process.cwd(), "lib", "article-image-concepts.ts"), "utf8");

  const next = insertArticleImageConceptEntry(current, topic);

  assert.match(next, /"test-generated-topic":/);
  assert.match(next, /export const articleImageConceptEntries: ArticleImageConcept\[\] = Object\.values\(articleImageConcepts\);/);
});

test("Windows npm script execution resolves through cmd.exe", () => {
  assert.deepEqual(resolveExecFileInvocation("npm", ["--version"], "win32"), {
    program: "cmd.exe",
    args: ["/d", "/s", "/c", "npm", "--version"],
  });
  assert.deepEqual(resolveExecFileInvocation("npx", ["tsx", "--version"], "win32"), {
    program: "cmd.exe",
    args: ["/d", "/s", "/c", "npx", "tsx", "--version"],
  });
  assert.deepEqual(resolveExecFileInvocation("gh", ["--version"], "win32"), {
    program: "gh",
    args: ["--version"],
  });
  assert.deepEqual(resolveExecFileInvocation("npm", ["--version"], "linux"), {
    program: "npm",
    args: ["--version"],
  });
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

test("plan-only can inspect the current stacked topic without publication blockers", () => {
  const state = readContentSeriesState();
  const topics = readContentSeriesTopics();
  const topic = resolveContentSeriesTopic(topics.topics, state, "dify");
  const plan = buildContentSeriesPlan(state, topic, { planOnly: true });

  assert.equal(plan.topic.slug, "dify-llm-app-builder-business-automation");
  assert.deepEqual(plan.publicationBlockers, []);
});

test("orchestrator source does not contain merge or manual deploy commands", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "scripts", "content-series-orchestrator.ts"), "utf8");

  assert.doesNotMatch(source, /gh\s+pr\s+merge/);
  assert.doesNotMatch(source, /vercel\s+deploy/);
});
