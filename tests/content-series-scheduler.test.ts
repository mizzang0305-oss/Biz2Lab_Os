import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { ContentSeriesError } from "@/scripts/content-series-orchestrator";
import {
  readContentSeriesRunState,
  readContentSeriesSchedule,
  runContentSeriesScheduler,
  type OpenPullRequest,
} from "@/scripts/content-series-scheduler-runner";

const completedLangflowSlug = "langflow-ai-workflow-automation";
const completedDifySlug = "dify-llm-app-builder-business-automation";
const currentTopicSlug = "open-webui-local-llm-admin-portal";
const nextTopicAfterCurrentSlug = "flowise-ai-agent-workflow-automation";
const finalTopicSlug = "umami-open-source-analytics-ga-alternative";
const partialQueueTopicSlug = "windmill-developer-workflow-automation";
const partialQueueCompleted = [
  "opencut-free-open-source-video-editor-ai-content-automation",
  "free-open-source-automation-tools-series",
  "activepieces-ai-business-automation-n8n-alternative",
  "node-red-local-business-automation-server",
  "huginn-monitoring-automation-agent",
  "baserow-open-source-database-automation",
  "appsmith-internal-dashboard-automation",
];

function writeJson(filePath: string, value: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function readJson<T>(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function tempSchedulerRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-scheduler-"));
  fs.mkdirSync(path.join(root, "data"), { recursive: true });
  fs.mkdirSync(path.join(root, "content", "ko"), { recursive: true });
  fs.copyFileSync(
    path.join(process.cwd(), "data", "content-series-state.json"),
    path.join(root, "data", "content-series-state.json"),
  );
  fs.copyFileSync(
    path.join(process.cwd(), "data", "content-series-topics.json"),
    path.join(root, "data", "content-series-topics.json"),
  );
  writeJson(path.join(root, "content", "ko", "content-index.json"), []);
  writeJson(path.join(root, "data", "content-series-schedule.json"), {
    enabled: true,
    cadenceMinutes: 180,
    minCadenceMinutes: 60,
    maxArticlesPerDay: 2,
    maxOpenPrs: 1,
    requireCodexArtifact: true,
    autoMerge: false,
    manualDeploy: false,
    activeHours: {
      timezone: "Asia/Seoul",
      start: "06:00",
      end: "23:30",
    },
  });
  writeJson(path.join(root, "data", "content-series-run-state.json"), {
    lastRunAt: null,
    lastAttemptAt: null,
    lastPublishedAt: null,
    todayPublishedCount: 0,
    today: null,
    lastStatus: null,
    lastTopic: null,
  });
  return root;
}

function updateSchedule(root: string, patch: Record<string, unknown>) {
  const schedulePath = path.join(root, "data", "content-series-schedule.json");
  writeJson(schedulePath, { ...readJson<Record<string, unknown>>(schedulePath), ...patch });
}

function updateRunState(root: string, patch: Record<string, unknown>) {
  const statePath = path.join(root, "data", "content-series-run-state.json");
  writeJson(statePath, { ...readJson<Record<string, unknown>>(statePath), ...patch });
}

function updateContentSeriesState(root: string, patch: Record<string, unknown>) {
  const statePath = path.join(root, "data", "content-series-state.json");
  writeJson(statePath, { ...readJson<Record<string, unknown>>(statePath), ...patch });
}

function usePartialQueueState(root: string) {
  updateContentSeriesState(root, {
    currentTopic: partialQueueTopicSlug,
    completed: partialQueueCompleted,
    next: [partialQueueTopicSlug, currentTopicSlug],
  });
}

async function withGeneratedRoot<T>(root: string, callback: (generatedRoot: string) => T | Promise<T>) {
  const previousRoot = process.env.CODEX_GENERATED_IMAGE_ROOT;
  const generatedRoot = path.join(root, "codex-generated");
  process.env.CODEX_GENERATED_IMAGE_ROOT = generatedRoot;
  try {
    return await callback(generatedRoot);
  } finally {
    if (previousRoot === undefined) {
      delete process.env.CODEX_GENERATED_IMAGE_ROOT;
    } else {
      process.env.CODEX_GENERATED_IMAGE_ROOT = previousRoot;
    }
  }
}

function writeJpegLikeArtifact(filePath: string, size = 5000) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const fakeJpeg = Buffer.alloc(size);
  fakeJpeg[0] = 0xff;
  fakeJpeg[1] = 0xd8;
  fs.writeFileSync(filePath, fakeJpeg);
}

function schedulerDeps(openPrs: OpenPullRequest[] = []) {
  const publishedTopics: string[] = [];
  return {
    publishedTopics,
    deps: {
      listOpenPullRequests: () => openPrs,
      runPublication: (options: { topicSlug: string }) => {
        publishedTopics.push(options.topicSlug);
        return { prUrl: `https://github.com/example/repo/pull/${publishedTopics.length}` };
      },
    },
  };
}

const activeNow = new Date("2026-06-20T03:00:00.000Z"); // 12:00 Asia/Seoul
const outsideActiveNow = new Date("2026-06-19T20:00:00.000Z"); // 05:00 Asia/Seoul

test("180-minute cadence is accepted and missing artifact waits safely", async () => {
  const root = tempSchedulerRoot();
  const { deps } = schedulerDeps();

  const result = await withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, deps),
  );

  assert.equal(result.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
  assert.equal(result.topic, currentTopicSlug);
  assert.equal(readContentSeriesSchedule(root).cadenceMinutes, 180);
});

test("completed Dify advances the default scheduler topic to Open WebUI", async () => {
  const root = tempSchedulerRoot();
  const state = readJson<{ completed: string[]; currentTopic: string; next: string[] }>(
    path.join(root, "data", "content-series-state.json"),
  );

  const result = await withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps),
  );

  assert.ok(state.completed.includes(completedLangflowSlug));
  assert.ok(state.completed.includes(completedDifySlug));
  assert.equal(state.currentTopic, currentTopicSlug);
  assert.equal(state.next[0], currentTopicSlug);
  assert.equal(result.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
  assert.equal(result.topic, currentTopicSlug);
});

test("already-published completed Dify does not keep scheduler stuck on Dify", async () => {
  const root = tempSchedulerRoot();
  const articlePath = path.join(root, "content", "ko", "automation", `${completedDifySlug}.md`);
  fs.mkdirSync(path.dirname(articlePath), { recursive: true });
  fs.writeFileSync(articlePath, "---\nstatus: published\ndraft: false\n---\n", "utf8");

  const result = await withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps),
  );

  assert.equal(result.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
  assert.equal(result.topic, currentTopicSlug);
});

test("Open WebUI artifact-gate dry-run does not generate article or image files", async () => {
  const root = tempSchedulerRoot();

  const result = await withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps),
  );

  assert.equal(result.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
  assert.equal(fs.existsSync(path.join(root, "content", "ko", "automation", `${currentTopicSlug}.md`)), false);
  assert.equal(fs.existsSync(path.join(root, "assets", "images", "raw", `${currentTopicSlug}-hero.jpg`)), false);
  assert.equal(fs.existsSync(path.join(root, "public", "images", "posts", `${currentTopicSlug}-hero.webp`)), false);
});

test("cadence below the configured minimum blocks", async () => {
  const root = tempSchedulerRoot();
  updateSchedule(root, { cadenceMinutes: 30 });

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "CADENCE_BELOW_MINIMUM");
});

test("disabled scheduler exits safely", async () => {
  const root = tempSchedulerRoot();
  updateSchedule(root, { enabled: false });

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "SCHEDULER_DISABLED");
});

test("outside active hours exits safely", async () => {
  const root = tempSchedulerRoot();

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: outsideActiveNow }, schedulerDeps().deps);

  assert.equal(result.status, "OUTSIDE_ACTIVE_HOURS");
});

test("completed topic blocks duplicate publication", async () => {
  const root = tempSchedulerRoot();
  usePartialQueueState(root);

  const result = await runContentSeriesScheduler(
    { rootDir: root, dryRun: true, topic: "node-red-local-business-automation-server", now: activeNow },
    schedulerDeps().deps,
  );

  assert.equal(result.status, "TOPIC_ALREADY_COMPLETED");
});

test("already published article file blocks duplicate publication", async () => {
  const root = tempSchedulerRoot();
  usePartialQueueState(root);
  const articlePath = path.join(root, "content", "ko", "automation", `${partialQueueTopicSlug}.md`);
  fs.mkdirSync(path.dirname(articlePath), { recursive: true });
  fs.writeFileSync(articlePath, "---\nstatus: published\ndraft: false\n---\n", "utf8");

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "ARTICLE_ALREADY_PUBLISHED");
});

test("content index slug duplicate blocks publication", async () => {
  const root = tempSchedulerRoot();
  usePartialQueueState(root);
  writeJson(path.join(root, "content", "ko", "content-index.json"), [{ slug: partialQueueTopicSlug }]);

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "CONTENT_INDEX_DUPLICATE");
});

test("all configured topics completed returns explicit queue exhausted state", async () => {
  const root = tempSchedulerRoot();
  const topicFile = readJson<{ topics: { slug: string }[] }>(path.join(root, "data", "content-series-topics.json"));
  updateContentSeriesState(root, {
    completed: topicFile.topics.map((topic) => topic.slug),
    next: [currentTopicSlug],
  });

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "CONTENT_SERIES_QUEUE_EXHAUSTED");
  assert.equal(result.topic, undefined);
});

test("final published article is terminal queue exhaustion, not active work", async () => {
  const root = tempSchedulerRoot();
  const topicFile = readJson<{ topics: { slug: string }[] }>(path.join(root, "data", "content-series-topics.json"));
  updateContentSeriesState(root, {
    completed: topicFile.topics.map((topic) => topic.slug).filter((slug) => slug !== finalTopicSlug),
    currentTopic: finalTopicSlug,
    next: [finalTopicSlug],
  });
  const articlePath = path.join(root, "content", "ko", "automation", `${finalTopicSlug}.md`);
  fs.mkdirSync(path.dirname(articlePath), { recursive: true });
  fs.writeFileSync(articlePath, "---\nstatus: published\ndraft: false\n---\n", "utf8");

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "CONTENT_SERIES_QUEUE_EXHAUSTED");
  assert.equal(result.topic, undefined);
});

test("partial queue still selects the next incomplete topic", async () => {
  const root = tempSchedulerRoot();
  usePartialQueueState(root);

  const result = await withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps),
  );

  assert.equal(result.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
  assert.equal(result.topic, partialQueueTopicSlug);
});

test("topic order still blocks topics after Open WebUI until Open WebUI is completed", async () => {
  const root = tempSchedulerRoot();

  const result = await runContentSeriesScheduler(
    { rootDir: root, dryRun: true, topic: nextTopicAfterCurrentSlug, useLatestCodexArtifact: true, now: activeNow },
    schedulerDeps().deps,
  );

  assert.equal(result.status, "TOPIC_ORDER_BLOCKED");
  assert.equal(result.topic, nextTopicAfterCurrentSlug);
  assert.match(result.message ?? "", /next queue starts with open-webui-local-llm-admin-portal/);
  assert.match(result.message ?? "", /previous article is not public yet: open-webui-local-llm-admin-portal/);
});

test("existing topic PR blocks duplicate publication", async () => {
  const root = tempSchedulerRoot();
  const openPrs = [{ number: 7, title: "current article", headRefName: `codex/${currentTopicSlug}-automation-series-article` }];

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps(openPrs).deps);

  assert.equal(result.status, "EXISTING_TOPIC_PR");
});

test("explicit topic with latest artifact selector still respects existing topic PR gate", async () => {
  const root = tempSchedulerRoot();
  const openPrs = [{ number: 7, title: "current article", headRefName: `codex/${currentTopicSlug}-automation-series-article` }];

  const result = await runContentSeriesScheduler(
    { rootDir: root, dryRun: true, topic: currentTopicSlug, useLatestCodexArtifact: true, now: activeNow },
    schedulerDeps(openPrs).deps,
  );

  assert.equal(result.status, "EXISTING_TOPIC_PR");
  assert.equal(result.topic, currentTopicSlug);
});

test("explicit completed topic cannot bypass duplicate gate", async () => {
  const root = tempSchedulerRoot();

  const result = await runContentSeriesScheduler(
    { rootDir: root, dryRun: true, topic: "windmill-developer-workflow-automation", useLatestCodexArtifact: true, now: activeNow },
    schedulerDeps().deps,
  );

  assert.equal(result.status, "TOPIC_ALREADY_COMPLETED");
  assert.equal(result.topic, "windmill-developer-workflow-automation");
});

test("max open PRs blocks scheduler", async () => {
  const root = tempSchedulerRoot();
  const openPrs = [{ number: 9, title: "unrelated", headRefName: "codex/unrelated" }];

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps(openPrs).deps);

  assert.equal(result.status, "MAX_OPEN_PRS_REACHED");
});

test("max articles per day blocks scheduler", async () => {
  const root = tempSchedulerRoot();
  updateRunState(root, { today: "2026-06-20", todayPublishedCount: 2 });

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "DAILY_LIMIT_REACHED");
});

test("fresh lock file blocks concurrent run", async () => {
  const root = tempSchedulerRoot();
  writeJson(path.join(root, ".tmp", "content-series-scheduler.lock"), {
    createdAt: activeNow.toISOString(),
    pid: 123,
  });

  const result = await runContentSeriesScheduler({ rootDir: root, dryRun: false, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "RUN_ALREADY_IN_PROGRESS");
});

test("stale lock is removed before a safe check continues", async () => {
  const root = tempSchedulerRoot();
  const lockPath = path.join(root, ".tmp", "content-series-scheduler.lock");
  writeJson(lockPath, {
    createdAt: "2026-06-19T03:00:00.000Z",
    pid: 123,
  });

  const result = await withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: false, now: activeNow }, schedulerDeps().deps),
  );

  assert.equal(result.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
  assert.equal(fs.existsSync(lockPath), false);
});

test("force-check bypasses cadence only", async () => {
  const root = tempSchedulerRoot();
  updateRunState(root, { lastRunAt: "2026-06-20T01:00:00.000Z" });

  const cadenceResult = await runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);
  const forcedResult = await withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, forceCheck: true, now: activeNow }, schedulerDeps().deps),
  );

  assert.equal(cadenceResult.status, "CADENCE_NOT_DUE");
  assert.equal(forcedResult.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
});

test("dry-run changes no run state", async () => {
  const root = tempSchedulerRoot();
  const before = readContentSeriesRunState(root);
  await withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps),
  );

  assert.deepEqual(readContentSeriesRunState(root), before);
});

test("non-dry run with missing artifact does not call publication workflow", async () => {
  const root = tempSchedulerRoot();
  const { deps, publishedTopics } = schedulerDeps();

  const result = await withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: false, useLatestCodexArtifact: true, now: activeNow }, deps),
  );

  assert.equal(result.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
  assert.deepEqual(publishedTopics, []);
});

test("one run publishes at most one topic when a Codex artifact exists", async () => {
  const root = tempSchedulerRoot();
  const { deps, publishedTopics } = schedulerDeps();

  const result = await withGeneratedRoot(root, (generatedRoot) => {
    writeJpegLikeArtifact(path.join(generatedRoot, `${currentTopicSlug}-hero.jpg`));
    return runContentSeriesScheduler({ rootDir: root, dryRun: false, now: activeNow }, deps);
  });

  const runState = readContentSeriesRunState(root);
  assert.equal(result.status, "PUBLICATION_PR_CREATED");
  assert.deepEqual(publishedTopics, [currentTopicSlug]);
  assert.equal(runState.todayPublishedCount, 1);
  assert.equal(runState.lastTopic, currentTopicSlug);
});

test("artifact-ready non-dry run passes structured options to the publication workflow", async () => {
  const root = tempSchedulerRoot();
  const publicationCalls: unknown[][] = [];
  const deps = {
    listOpenPullRequests: () => [],
    runPublication: ((...args: unknown[]) => {
      publicationCalls.push(args);
      return { prUrl: "https://github.com/example/repo/pull/1" };
    }) as never,
  };

  const result = await withGeneratedRoot(root, (generatedRoot) => {
    writeJpegLikeArtifact(path.join(generatedRoot, `${currentTopicSlug}-hero.jpg`));
    return runContentSeriesScheduler(
      { rootDir: root, dryRun: false, useLatestCodexArtifact: true, now: activeNow },
      deps,
    );
  });

  assert.equal(result.status, "PUBLICATION_PR_CREATED");
  assert.equal(publicationCalls.length, 1);
  assert.deepEqual(publicationCalls[0][0], {
    rootDir: root,
    topicSlug: currentTopicSlug,
    useLatestCodexArtifact: true,
  });
});

test("publication validation failure returns status without marking publish success", async () => {
  const root = tempSchedulerRoot();
  const before = readContentSeriesRunState(root);
  const deps = {
    listOpenPullRequests: () => [],
    runPublication: (() => {
      throw new ContentSeriesError("VALIDATION_FAILED", "validation failed");
    }) as never,
  };

  const result = await withGeneratedRoot(root, (generatedRoot) => {
    writeJpegLikeArtifact(path.join(generatedRoot, `${currentTopicSlug}-hero.jpg`));
    return runContentSeriesScheduler(
      { rootDir: root, dryRun: false, useLatestCodexArtifact: true, now: activeNow },
      deps,
    );
  });

  const runState = readContentSeriesRunState(root);
  assert.equal(result.status, "VALIDATION_FAILED");
  assert.equal(result.prUrl, undefined);
  assert.deepEqual(runState, before);
});

test("placeholder-like artifacts block instead of falling back", async () => {
  const root = tempSchedulerRoot();
  const { deps, publishedTopics } = schedulerDeps();

  const result = await withGeneratedRoot(root, (generatedRoot) => {
    writeJpegLikeArtifact(path.join(generatedRoot, `${currentTopicSlug}-hero-placeholder.jpg`));
    return runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, deps);
  });

  assert.equal(result.status, "CODEX_ARTIFACT_PLACEHOLDER_REJECTED");
  assert.deepEqual(publishedTopics, []);
});

test("unsupported artifact formats are rejected", async () => {
  const root = tempSchedulerRoot();
  const { deps, publishedTopics } = schedulerDeps();

  const result = await withGeneratedRoot(root, (generatedRoot) => {
    writeJpegLikeArtifact(path.join(generatedRoot, `${currentTopicSlug}-hero.gif`));
    return runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, deps);
  });

  assert.equal(result.status, "CODEX_ARTIFACT_UNSUPPORTED_FORMAT");
  assert.deepEqual(publishedTopics, []);
});

test("scheduler source does not contain auto-merge or manual deploy commands", async () => {
  const source = fs.readFileSync(path.join(process.cwd(), "scripts", "content-series-scheduler-runner.ts"), "utf8");
  const schedule = readContentSeriesSchedule();

  assert.equal(schedule.autoMerge, false);
  assert.equal(schedule.manualDeploy, false);
  assert.doesNotMatch(source, /gh\s+pr\s+merge/);
  assert.doesNotMatch(source, /vercel\s+deploy/);
  assert.doesNotMatch(source, /content:series:auto/);
});
