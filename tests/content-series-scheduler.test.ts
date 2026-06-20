import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  readContentSeriesRunState,
  readContentSeriesSchedule,
  runContentSeriesScheduler,
  type OpenPullRequest,
} from "@/scripts/content-series-scheduler-runner";

const nodeRedSlug = "node-red-local-business-automation-server";

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

function withGeneratedRoot<T>(root: string, callback: (generatedRoot: string) => T) {
  const previousRoot = process.env.CODEX_GENERATED_IMAGE_ROOT;
  const generatedRoot = path.join(root, "codex-generated");
  process.env.CODEX_GENERATED_IMAGE_ROOT = generatedRoot;
  try {
    return callback(generatedRoot);
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
      runPublication: (topicSlug: string) => {
        publishedTopics.push(topicSlug);
        return { prUrl: `https://github.com/example/repo/pull/${publishedTopics.length}` };
      },
    },
  };
}

const activeNow = new Date("2026-06-20T03:00:00.000Z"); // 12:00 Asia/Seoul
const outsideActiveNow = new Date("2026-06-19T20:00:00.000Z"); // 05:00 Asia/Seoul

test("180-minute cadence is accepted and missing artifact waits safely", () => {
  const root = tempSchedulerRoot();
  const { deps } = schedulerDeps();

  const result = withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, deps),
  );

  assert.equal(result.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
  assert.equal(readContentSeriesSchedule(root).cadenceMinutes, 180);
});

test("cadence below the configured minimum blocks", () => {
  const root = tempSchedulerRoot();
  updateSchedule(root, { cadenceMinutes: 30 });

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "CADENCE_BELOW_MINIMUM");
});

test("disabled scheduler exits safely", () => {
  const root = tempSchedulerRoot();
  updateSchedule(root, { enabled: false });

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "SCHEDULER_DISABLED");
});

test("outside active hours exits safely", () => {
  const root = tempSchedulerRoot();

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: outsideActiveNow }, schedulerDeps().deps);

  assert.equal(result.status, "OUTSIDE_ACTIVE_HOURS");
});

test("completed topic blocks duplicate publication", () => {
  const root = tempSchedulerRoot();
  const statePath = path.join(root, "data", "content-series-state.json");
  const state = readJson<{ completed: string[] }>(statePath);
  writeJson(statePath, { ...state, completed: [...state.completed, nodeRedSlug] });

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "TOPIC_ALREADY_COMPLETED");
});

test("already published article file blocks duplicate publication", () => {
  const root = tempSchedulerRoot();
  const articlePath = path.join(root, "content", "ko", "automation", `${nodeRedSlug}.md`);
  fs.mkdirSync(path.dirname(articlePath), { recursive: true });
  fs.writeFileSync(articlePath, "---\nstatus: published\ndraft: false\n---\n", "utf8");

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "ARTICLE_ALREADY_PUBLISHED");
});

test("content index slug duplicate blocks publication", () => {
  const root = tempSchedulerRoot();
  writeJson(path.join(root, "content", "ko", "content-index.json"), [{ slug: nodeRedSlug }]);

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "CONTENT_INDEX_DUPLICATE");
});

test("existing topic PR blocks duplicate publication", () => {
  const root = tempSchedulerRoot();
  const openPrs = [{ number: 7, title: "Node-RED article", headRefName: `codex/${nodeRedSlug}-automation-series-article` }];

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps(openPrs).deps);

  assert.equal(result.status, "EXISTING_TOPIC_PR");
});

test("max open PRs blocks scheduler", () => {
  const root = tempSchedulerRoot();
  const openPrs = [{ number: 9, title: "unrelated", headRefName: "codex/unrelated" }];

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps(openPrs).deps);

  assert.equal(result.status, "MAX_OPEN_PRS_REACHED");
});

test("max articles per day blocks scheduler", () => {
  const root = tempSchedulerRoot();
  updateRunState(root, { today: "2026-06-20", todayPublishedCount: 2 });

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "DAILY_LIMIT_REACHED");
});

test("fresh lock file blocks concurrent run", () => {
  const root = tempSchedulerRoot();
  writeJson(path.join(root, ".tmp", "content-series-scheduler.lock"), {
    createdAt: activeNow.toISOString(),
    pid: 123,
  });

  const result = runContentSeriesScheduler({ rootDir: root, dryRun: false, now: activeNow }, schedulerDeps().deps);

  assert.equal(result.status, "RUN_ALREADY_IN_PROGRESS");
});

test("stale lock is removed before a safe check continues", () => {
  const root = tempSchedulerRoot();
  const lockPath = path.join(root, ".tmp", "content-series-scheduler.lock");
  writeJson(lockPath, {
    createdAt: "2026-06-19T03:00:00.000Z",
    pid: 123,
  });

  const result = withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: false, now: activeNow }, schedulerDeps().deps),
  );

  assert.equal(result.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
  assert.equal(fs.existsSync(lockPath), false);
});

test("force-check bypasses cadence only", () => {
  const root = tempSchedulerRoot();
  updateRunState(root, { lastRunAt: "2026-06-20T01:00:00.000Z" });

  const cadenceResult = runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps);
  const forcedResult = withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, forceCheck: true, now: activeNow }, schedulerDeps().deps),
  );

  assert.equal(cadenceResult.status, "CADENCE_NOT_DUE");
  assert.equal(forcedResult.status, "WAITING_FOR_CODEX_IMAGE_ARTIFACT");
});

test("dry-run changes no run state", () => {
  const root = tempSchedulerRoot();
  const before = readContentSeriesRunState(root);

  withGeneratedRoot(root, () =>
    runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, schedulerDeps().deps),
  );

  assert.deepEqual(readContentSeriesRunState(root), before);
});

test("one run publishes at most one topic when a Codex artifact exists", () => {
  const root = tempSchedulerRoot();
  const { deps, publishedTopics } = schedulerDeps();

  const result = withGeneratedRoot(root, (generatedRoot) => {
    writeJpegLikeArtifact(path.join(generatedRoot, `${nodeRedSlug}-hero.jpg`));
    return runContentSeriesScheduler({ rootDir: root, dryRun: false, now: activeNow }, deps);
  });

  const runState = readContentSeriesRunState(root);
  assert.equal(result.status, "PUBLICATION_PR_CREATED");
  assert.deepEqual(publishedTopics, [nodeRedSlug]);
  assert.equal(runState.todayPublishedCount, 1);
  assert.equal(runState.lastTopic, nodeRedSlug);
});

test("placeholder-like artifacts block instead of falling back", () => {
  const root = tempSchedulerRoot();
  const { deps, publishedTopics } = schedulerDeps();

  const result = withGeneratedRoot(root, (generatedRoot) => {
    writeJpegLikeArtifact(path.join(generatedRoot, `${nodeRedSlug}-hero-placeholder.jpg`));
    return runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, deps);
  });

  assert.equal(result.status, "CODEX_ARTIFACT_PLACEHOLDER_REJECTED");
  assert.deepEqual(publishedTopics, []);
});

test("unsupported artifact formats are rejected", () => {
  const root = tempSchedulerRoot();
  const { deps, publishedTopics } = schedulerDeps();

  const result = withGeneratedRoot(root, (generatedRoot) => {
    writeJpegLikeArtifact(path.join(generatedRoot, `${nodeRedSlug}-hero.gif`));
    return runContentSeriesScheduler({ rootDir: root, dryRun: true, now: activeNow }, deps);
  });

  assert.equal(result.status, "CODEX_ARTIFACT_UNSUPPORTED_FORMAT");
  assert.deepEqual(publishedTopics, []);
});

test("scheduler source does not contain auto-merge or manual deploy commands", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "scripts", "content-series-scheduler-runner.ts"), "utf8");
  const schedule = readContentSeriesSchedule();

  assert.equal(schedule.autoMerge, false);
  assert.equal(schedule.manualDeploy, false);
  assert.doesNotMatch(source, /gh\s+pr\s+merge/);
  assert.doesNotMatch(source, /vercel\s+deploy/);
});
