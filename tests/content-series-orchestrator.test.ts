import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import * as contentSeriesOrchestrator from "@/scripts/content-series-orchestrator";
import {
  assertTopicCanPublish,
  assertValidCodexImageArtifact,
  buildArticleMarkdown,
  buildContentIndexEntry,
  buildContentSeriesPlan,
  buildImageAssetEntry,
  buildOptimizedHeroImageMetadata,
  advanceContentSeriesStateAfterPublication,
  buildImagePaths,
  buildInternalLinkRoutes,
  buildSeoKeywordMapEntry,
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
  upsertSeoKeywordMapEntry,
} from "@/scripts/content-series-orchestrator";

const staleFlowiseQueue = [
  "flowise-ai-agent-workflow-automation",
  "directus-headless-cms-data-automation",
  "pocketbase-lightweight-backend-saas-mvp",
  "supabase-self-hosting-cost-operations-caution",
  "meilisearch-blog-product-search-automation",
  "typesense-product-document-search-automation",
  "umami-open-source-analytics-ga-alternative",
];
const secondAutomationQueue = staleFlowiseQueue.slice(1);
const thirdAutomationQueue = staleFlowiseQueue.slice(2);
const completedDifySlug = "dify-llm-app-builder-business-automation";
const completedOpenWebUISlug = "open-webui-local-llm-admin-portal";
const completedDirectusSlug = "directus-headless-cms-data-automation";
const completedPocketBaseSlug = "pocketbase-lightweight-backend-saas-mvp";
const completedSupabaseSlug = "supabase-self-hosting-cost-operations-caution";
const completedMeilisearchSlug = "meilisearch-blog-product-search-automation";
const completedTypesenseSlug = "typesense-product-document-search-automation";
const currentAutomationTopicSlug = "umami-open-source-analytics-ga-alternative";
const plausibleAnalyticsSlug = "plausible-open-source-analytics-ga-alternative";
const matomoAnalyticsSlug = "matomo-self-hosted-analytics-privacy-caution";
const posthogAnalyticsSlug = "posthog-product-analytics-automation";
const metabaseDashboardSlug = "metabase-dashboard-automation-for-small-business";
const supersetDashboardSlug = "apache-superset-bi-dashboard-automation";
const redashDashboardSlug = "redash-open-source-dashboard-automation";
const dashboardQueue = [metabaseDashboardSlug, supersetDashboardSlug, redashDashboardSlug];
const allAnalyticsTopicSlugs = [plausibleAnalyticsSlug, matomoAnalyticsSlug, posthogAnalyticsSlug];
const pocketBaseQueue = staleFlowiseQueue.slice(2);
const currentAutomationQueue = staleFlowiseQueue.slice(6);

function tempSeriesRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-series-"));
  fs.mkdirSync(path.join(root, "data"), { recursive: true });
  fs.copyFileSync(
    path.join(process.cwd(), "data", "content-series-state.json"),
    path.join(root, "data", "content-series-state.json"),
  );
  const statePath = path.join(root, "data", "content-series-state.json");
  const state = JSON.parse(fs.readFileSync(statePath, "utf8")) as { completed: string[] };
  fs.writeFileSync(
    statePath,
    `${JSON.stringify(
      {
        ...state,
        currentTopic: metabaseDashboardSlug,
        completed: state.completed.filter((slug) => slug !== metabaseDashboardSlug),
        next: dashboardQueue,
      },
      null,
      2,
    )}\n`,
    "utf8",
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

test("current topic image concept avoids forbidden visual terms", () => {
  const { topic } = currentSeriesTopic();
  const visualPolicyText = [
    topic.imageConcept.visualFamily,
    topic.imageConcept.promptSummaryKo,
    topic.imageConcept.mustInclude.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const allowedProductAnalyticsText = visualPolicyText.replace(/\bproduct[- ]analytics\b/g, "analytics");
  assert.doesNotMatch(allowedProductAnalyticsText, /\b(?:amazon|products?|affiliate|reviews?|lotto)\b/);
});

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
  assert.ok(state.completed.includes(completedDifySlug));
  assert.ok(state.completed.includes(completedOpenWebUISlug));
  assert.ok(state.completed.includes("flowise-ai-agent-workflow-automation"));
  assert.ok(state.completed.includes(completedDirectusSlug));
  assert.ok(state.completed.includes(completedPocketBaseSlug));
  assert.ok(state.completed.includes(completedSupabaseSlug));
  assert.ok(state.completed.includes(completedMeilisearchSlug));
  assert.ok(state.completed.includes(completedTypesenseSlug));
  assert.ok(state.completed.includes(currentAutomationTopicSlug));
  assert.ok(state.completed.includes(plausibleAnalyticsSlug));
  assert.ok(state.completed.includes(matomoAnalyticsSlug));
  assert.ok(state.completed.includes(posthogAnalyticsSlug));
  assert.ok(state.completed.includes(metabaseDashboardSlug));
  assert.ok(state.completed.includes(supersetDashboardSlug));
  assert.ok(state.completed.includes(redashDashboardSlug));
  assert.equal(state.currentTopic, redashDashboardSlug);
  assert.deepEqual(state.next, []);
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
  assert.ok(slugs.includes(completedDifySlug), `missing ${completedDifySlug}`);
  for (const slug of allAnalyticsTopicSlugs) {
    assert.ok(slugs.includes(slug), `missing ${slug}`);
  }
  for (const slug of dashboardQueue) {
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
  const state = readContentSeriesState(root);
  const topics = readContentSeriesTopics(root);
  const topic = resolveContentSeriesTopic(topics.topics, state, state.currentTopic);

  await withIsolatedGeneratedImagesDir(root, async () => {
    await assert.rejects(
      () => runContentSeriesOrchestrator({ rootDir: root, topic: topic.slug, noCommit: true }),
      (error) =>
        error instanceof ContentSeriesError &&
        error.code === "CODEX_GENERATED_IMAGE_ARTIFACT_MISSING",
    );
  });

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

test("series link insertion reuses the existing section and stays idempotent", () => {
  const insert = (
    contentSeriesOrchestrator as {
      insertSeriesLinkIntoSection?: (content: string, topic: ReturnType<typeof currentSeriesTopic>["topic"]) => string;
    }
  ).insertSeriesLinkIntoSection;
  assert.equal(typeof insert, "function");
  if (!insert) {
    return;
  }
  const topics = readContentSeriesTopics();
  const state = readContentSeriesState();
  const topic = resolveContentSeriesTopic(topics.topics, state, "open-webui-local-llm-admin-portal");
  const content = [
    "# Existing article",
    "",
    "## 무료 오픈소스 자동화 도구 시리즈",
    "",
    "- [Existing tool](/ko/automation/existing-tool)",
    "",
    "## 다음 섹션",
    "",
    "본문",
    "",
  ].join("\n");

  const once = insert(content, topic);
  const twice = insert(once, topic);

  assert.equal((once.match(/## 무료 오픈소스 자동화 도구 시리즈/g) ?? []).length, 1);
  assert.match(once, /\[Existing tool\]\(\/ko\/automation\/existing-tool\)/);
  assert.match(once, /\[Open WebUI 분석: 로컬 LLM 운영 UI를 사내 AI 포털로 쓸 수 있을까\?\]\(\/ko\/automation\/open-webui-local-llm-admin-portal\)/);
  assert.match(once, /open-webui-local-llm-admin-portal\)\n\n## 다음 섹션/);
  assert.equal(twice, once);
});

test("series link insertion normalizes duplicate generated headings without duplicating links", () => {
  const insert = (
    contentSeriesOrchestrator as {
      insertSeriesLinkIntoSection?: (content: string, topic: ReturnType<typeof currentSeriesTopic>["topic"]) => string;
    }
  ).insertSeriesLinkIntoSection;
  assert.equal(typeof insert, "function");
  if (!insert) {
    return;
  }
  const topics = readContentSeriesTopics();
  const state = readContentSeriesState();
  const topic = resolveContentSeriesTopic(topics.topics, state, "open-webui-local-llm-admin-portal");
  const link = "- [Open WebUI 분석: 로컬 LLM 운영 UI를 사내 AI 포털로 쓸 수 있을까?](/ko/automation/open-webui-local-llm-admin-portal)";
  const content = [
    "# Existing article",
    "",
    "## 무료 오픈소스 자동화 도구 시리즈",
    "",
    "- [Existing tool](/ko/automation/existing-tool)",
    "",
    "한 줄 결론입니다.",
    "",
    "## 무료 오픈소스 자동화 도구 시리즈",
    "",
    link,
    "",
  ].join("\n");

  const next = insert(content, topic);

  assert.equal((next.match(/## 무료 오픈소스 자동화 도구 시리즈/g) ?? []).length, 1);
  assert.equal((next.match(/open-webui-local-llm-admin-portal/g) ?? []).length, 1);
  assert.match(next, /\[Existing tool\]\(\/ko\/automation\/existing-tool\)/);
  assert.match(next, /한 줄 결론입니다\./);
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

test("SEO keyword map helper creates coverage for generated publication topics", () => {
  const topics = readContentSeriesTopics();
  const state = readContentSeriesState();
  const topic = resolveContentSeriesTopic(topics.topics, state, metabaseDashboardSlug);
  const entry = buildSeoKeywordMapEntry(topic);

  assert.equal(entry.slug, topic.slug);
  assert.equal(entry.route, `/ko/automation/${topic.slug}`);
  assert.match(entry.primaryKeyword, /Metabase/);
  assert.match(entry.primaryKeyword, /대시보드|dashboard/i);
  assert.equal(entry.searchIntent, "business-use");
  assert.equal(entry.cluster, "business-automation");
  assert.equal(entry.hookStatus, "strong");
  assert.ok(entry.secondaryKeywords.length >= 3);
  assert.ok(entry.lossAvoidanceAngle.length >= 10);
  for (const forbiddenKey of ["clicks", "impressions", "ctr", "ranking", "pageviews"]) {
    assert.equal(Object.hasOwn(entry, forbiddenKey), false);
  }
});

test("SEO keyword map upsert adds a generated publication entry before validation", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-keyword-map-"));
  const dataDir = path.join(root, "data");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, "seo-keyword-map.json"), "[]\n", "utf8");
  const topics = readContentSeriesTopics();
  const state = readContentSeriesState();
  const topic = resolveContentSeriesTopic(topics.topics, state, metabaseDashboardSlug);

  const first = upsertSeoKeywordMapEntry(root, topic);
  const second = upsertSeoKeywordMapEntry(root, topic);
  const keywordMap = JSON.parse(fs.readFileSync(path.join(dataDir, "seo-keyword-map.json"), "utf8")) as Array<{
    slug: string;
    route: string;
    primaryKeyword: string;
  }>;

  assert.equal(first.slug, metabaseDashboardSlug);
  assert.deepEqual(second, first);
  assert.equal(keywordMap.length, 1);
  assert.equal(keywordMap[0].slug, metabaseDashboardSlug);
  assert.equal(keywordMap[0].route, `/ko/automation/${metabaseDashboardSlug}`);
  assert.equal(fs.existsSync(path.join(root, "data", "content-series-run-state.json")), false);
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
  const baseState = readContentSeriesState();
  const state = {
    ...baseState,
    currentTopic: currentAutomationTopicSlug,
    completed: baseState.completed.filter((slug) => slug !== currentAutomationTopicSlug),
    next: [currentAutomationTopicSlug],
  };
  const topics = readContentSeriesTopics();
  const topic = resolveContentSeriesTopic(topics.topics, state, state.currentTopic);
  const plan = buildContentSeriesPlan(state, topic, { planOnly: true });

  assert.equal(plan.topic.slug, currentAutomationTopicSlug);
  assert.deepEqual(plan.publicationBlockers, []);
});

test("publication state advancement marks the topic completed and selects the next queued topic", () => {
  const state = readContentSeriesState();
  const topics = readContentSeriesTopics();
  const topic = resolveContentSeriesTopic(topics.topics, state, "flowise-ai-agent-workflow-automation");
  const staleFlowiseState = {
    ...state,
    currentTopic: topic.slug,
    completed: state.completed.filter(
      (slug) =>
        slug !== topic.slug &&
        slug !== completedDirectusSlug &&
        slug !== completedPocketBaseSlug &&
        slug !== completedSupabaseSlug &&
        slug !== currentAutomationTopicSlug,
    ),
    next: staleFlowiseQueue,
  };

  const nextState = advanceContentSeriesStateAfterPublication(staleFlowiseState, topics.topics, topic);

  assert.ok(nextState.completed.includes(topic.slug));
  assert.equal(nextState.completed.filter((slug) => slug === topic.slug).length, 1);
  assert.equal(nextState.currentTopic, "directus-headless-cms-data-automation");
  assert.equal(nextState.next[0], "directus-headless-cms-data-automation");
  assert.equal(nextState.completed.includes("directus-headless-cms-data-automation"), false);
  assert.deepEqual(
    nextState.next,
    staleFlowiseQueue.slice(1).filter((slug) => slug !== completedMeilisearchSlug && slug !== completedTypesenseSlug),
  );
  assert.equal(nextState.gates.autoMerge, false);
  assert.equal(nextState.gates.manualDeploy, false);
});

test("Directus publication state advancement marks Directus completed and selects PocketBase", () => {
  const state = readContentSeriesState();
  const topics = readContentSeriesTopics();
  const topic = resolveContentSeriesTopic(topics.topics, state, completedDirectusSlug);
  const pendingDirectusState = {
    ...state,
    currentTopic: topic.slug,
    completed: state.completed.filter(
      (slug) =>
        slug !== topic.slug &&
        slug !== completedPocketBaseSlug &&
        slug !== completedSupabaseSlug &&
        slug !== currentAutomationTopicSlug,
    ),
    next: secondAutomationQueue,
  };

  const nextState = advanceContentSeriesStateAfterPublication(pendingDirectusState, topics.topics, topic);

  assert.ok(nextState.completed.includes(completedDirectusSlug));
  assert.equal(nextState.completed.filter((slug) => slug === completedDirectusSlug).length, 1);
  assert.equal(nextState.currentTopic, completedPocketBaseSlug);
  assert.equal(nextState.next[0], completedPocketBaseSlug);
  assert.deepEqual(
    nextState.next,
    thirdAutomationQueue.filter((slug) => slug !== completedMeilisearchSlug && slug !== completedTypesenseSlug),
  );
  assert.equal(nextState.gates.autoMerge, false);
  assert.equal(nextState.gates.manualDeploy, false);
});

test("PocketBase publication state advancement skips completed Supabase, Meilisearch, and Typesense", () => {
  const state = readContentSeriesState();
  const topics = readContentSeriesTopics();
  const topic = resolveContentSeriesTopic(topics.topics, state, completedPocketBaseSlug);
  const pendingPocketBaseState = {
    ...state,
    currentTopic: topic.slug,
    completed: state.completed.filter((slug) => slug !== topic.slug && slug !== currentAutomationTopicSlug),
    next: pocketBaseQueue,
  };

  const nextState = advanceContentSeriesStateAfterPublication(pendingPocketBaseState, topics.topics, topic);

  assert.ok(nextState.completed.includes(completedPocketBaseSlug));
  assert.equal(nextState.completed.filter((slug) => slug === completedPocketBaseSlug).length, 1);
  assert.equal(nextState.currentTopic, currentAutomationTopicSlug);
  assert.equal(nextState.next[0], currentAutomationTopicSlug);
  assert.deepEqual(nextState.next, currentAutomationQueue);
  assert.equal(nextState.gates.autoMerge, false);
  assert.equal(nextState.gates.manualDeploy, false);
});

test("orchestrator source does not contain merge or manual deploy commands", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "scripts", "content-series-orchestrator.ts"), "utf8");

  assert.doesNotMatch(source, /gh\s+pr\s+merge/);
  assert.doesNotMatch(source, /vercel\s+deploy/);
});
