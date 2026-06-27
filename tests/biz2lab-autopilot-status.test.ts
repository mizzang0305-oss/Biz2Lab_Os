import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const guidePath = path.join(root, "docs", "ops", "biz2lab-content-autopilot.md");
const helperPath = path.join(root, "scripts", "biz2lab-autopilot-status.mjs");
const runnerPath = path.join(root, "scripts", "biz2lab-autopilot-runner.mjs");
const taskSetupPath = path.join(root, "scripts", "setup-biz2lab-autopilot-hourly-task.ps1");

async function importRunnerModule() {
  return await import(pathToFileURL(runnerPath).href);
}

async function importStatusModule() {
  return await import(pathToFileURL(helperPath).href);
}

test("Biz2Lab autopilot guide documents Green-Zone and hourly approval", () => {
  const guide = fs.readFileSync(guidePath, "utf8");

  assert.match(guide, /Biz2Lab 오토파일럿 계속 진행해\./);
  assert.match(guide, /BIZ2LAB_GREEN_ZONE_AUTOMERGE_APPROVED/);
  assert.match(guide, /BIZ2LAB_HOURLY_AUTOPILOT_APPROVED/);
  assert.match(guide, /Biz2Lab Autopilot Hourly/);
  assert.match(guide, /npm run ops:autopilot-run/);
  assert.match(guide, /Green Zone: Auto-Merge Allowed/);
  assert.match(guide, /Yellow Zone: Owner Review Required/);
  assert.match(guide, /Red Zone: Hard Stop/);
  assert.match(guide, /artifactOnlyPreparationReady/);
  assert.match(guide, /requiresOwnerReview/);
  assert.match(guide, /ARTIFACT_ONLY_PREPARATION_STARTED/);
  assert.match(guide, /production smoke after merge/i);
  assert.doesNotMatch(guide, /Biz2Lab \?ㅽ넗\?뚯씪/);
  assert.equal(guide.includes("????筌???"), false);
});

test("Biz2Lab autopilot helper stays read-only and exposes zone fields", () => {
  const helper = fs.readFileSync(helperPath, "utf8");

  assert.match(helper, /"read-only"/);
  assert.match(helper, /greenZoneAutomergeCandidate/);
  assert.match(helper, /artifactOnlyPreparationReady/);
  assert.match(helper, /requiresOwnerReview/);
  assert.match(helper, /yellowZoneOwnerReview/);
  assert.match(helper, /redZoneBlocked/);
  assert.match(helper, /BIZ2LAB_GREEN_ZONE_AUTOMERGE_APPROVED/);
  assert.match(helper, /public\/images\/posts\/\$\{slug\}-400\.webp/);
  assert.match(helper, /public\/images\/posts\/\$\{slug\}-800\.webp/);
  assert.match(helper, /public\/images\/posts\/\$\{slug\}-1200\.webp/);

  assert.doesNotMatch(helper, /writeFileSync|copyFileSync|rmSync|unlinkSync|mkdirSync/);
  assert.doesNotMatch(helper, /gh", \["pr", "merge"/);
  assert.doesNotMatch(helper, /git", \["push"/);
  assert.doesNotMatch(helper, /git", \["commit"/);
  assert.doesNotMatch(helper, /git", \["add"[\s\S]*data\/content-series-run-state\.json/);
  assert.doesNotMatch(helper, /vercel", \["deploy"/);
  assert.doesNotMatch(helper, /fake analytics/i);
  assert.doesNotMatch(helper, /BIZ2LAB_ADMIN_TOKEN|SECRET|PASSWORD/);
});

test("Biz2Lab autopilot helper reports exhausted clean queue as series complete", async () => {
  const helper = await importStatusModule();
  const base = {
    status: { cleanEnough: true },
    promptPackage: { complete: true },
    publicationFiles: { article: true, raw: true, publicHero: true },
    artifact: { exists: true },
    matchingPrs: [],
    scheduler: { parsed: { status: "CONTENT_SERIES_QUEUE_EXHAUSTED" } },
    openPrCount: 0,
    greenZoneCandidates: [],
    yellowZonePrs: [],
    redZonePrs: [],
  };

  assert.equal(helper.isSeriesQueueComplete(base), true);
  assert.equal(helper.nextAction(base), "series complete");
  assert.equal(helper.recommend(base), helper.seriesQueueCompleteRecommendedAction);
  assert.equal(
    helper.recommend(base),
    "Current content series queue is exhausted. Add new topics or run evergreen hardening/search verification tasks.",
  );
});

test("Biz2Lab autopilot helper does not recommend publication prep for exhausted queue files", async () => {
  const helper = await importStatusModule();
  const result = helper.nextAction({
    status: { cleanEnough: true },
    promptPackage: { complete: true },
    publicationFiles: { article: true, raw: true, publicHero: true },
    artifact: { exists: true },
    matchingPrs: [],
    scheduler: { parsed: { status: "CONTENT_SERIES_QUEUE_EXHAUSTED" } },
    openPrCount: 0,
    greenZoneCandidates: [],
    yellowZonePrs: [],
    redZonePrs: [],
  });

  assert.notEqual(result, "publication PR preparation");
});

test("Biz2Lab autopilot helper treats protected untracked paths as clean enough", async () => {
  const helper = await importStatusModule();
  const status = helper.summarizeGitStatusLines([
    "?? .codex-remote-attachments/",
    "?? .codex/config.toml",
  ]);

  assert.deepEqual(status.tracked, []);
  assert.deepEqual(status.untrackedUnexpected, []);
  assert.deepEqual(status.protectedUntrackedPresent, [
    ".codex-remote-attachments/",
    ".codex/config.toml",
  ]);
  assert.equal(status.cleanEnough, true);
});

test("Biz2Lab autopilot runner keeps one-action and safety gates explicit", () => {
  const runner = fs.readFileSync(runnerPath, "utf8");

  assert.match(runner, /biz2lab-autopilot-status/);
  assert.match(runner, /PROMPT_PACKAGE_PR_CREATED/);
  assert.match(runner, /ARTIFACT_ONLY_PREPARATION_STARTED/);
  assert.match(runner, /OWNER_REVIEW_REQUIRED/);
  assert.match(runner, /artifactOnlyPreparationPlan/);
  assert.match(runner, /data\/content-series-run-state\.json/);
  assert.match(runner, /currentBranch\(\)/);
  assert.match(runner, /branch !== expectedMasterBranch/);
  assert.match(runner, /promptPackageValidationCommands/);
  assert.match(runner, /publicationValidationCommands/);

  assert.doesNotMatch(runner, /vercel.+deploy/i);
  assert.doesNotMatch(runner, /BIZ2LAB_ADMIN_TOKEN|SECRET|PASSWORD/);
  assert.doesNotMatch(runner, /setInterval|while\s*\(\s*true\s*\)/);
});

test("Biz2Lab autopilot runner treats a missing artifact as artifact-only preparation", async () => {
  const runner = await importRunnerModule();
  const plan = runner.artifactOnlyPreparationPlan({
    currentTopic: "typesense-product-document-search-automation",
    artifact: {
      exists: false,
      artifactDir: path.join(
        "C:",
        "Users",
        "LOVE",
        ".codex",
        "generated_images",
        "typesense-product-document-search-automation-hero",
      ),
    },
    promptPackage: {
      complete: true,
    },
  });

  assert.equal(plan.action, "ARTIFACT_ONLY_PREPARATION_STARTED");
  assert.equal(plan.topic, "typesense-product-document-search-automation");
  assert.equal(plan.promptPackage.complete, true);
  assert.equal(plan.createsArticle, false);
  assert.equal(plan.importsRawOrPublicImage, false);
  assert.equal(plan.runsPublicationNonDry, false);
  assert.equal(plan.manualDeploy, false);
  assert.match(
    plan.expectedArtifactPath,
    /typesense-product-document-search-automation-hero[\\/]typesense-product-document-search-automation-hero\.png$/,
  );
});

test("Biz2Lab hourly task setup uses the canonical safe runner command", () => {
  const setup = fs.readFileSync(taskSetupPath, "utf8");

  assert.match(setup, /Biz2Lab Autopilot Hourly/);
  assert.match(setup, /New-TimeSpan -Hours 1/);
  assert.match(setup, /C:\\Users\\LOVE\\MyProjects\\Biz2Lab_Os/);
  assert.match(setup, /npm run ops:continue/);
  assert.match(setup, /biz2lab-continuous-orchestrator-task-output\.log/);
  assert.match(setup, /biz2lab-continuous-orchestrator\.log/);
  assert.match(setup, /MultipleInstances IgnoreNew/);

  assert.doesNotMatch(setup, /vercel\s+deploy/i);
  assert.doesNotMatch(setup, /BIZ2LAB_ADMIN_TOKEN|SECRET|PASSWORD/);
});

test("Biz2Lab autopilot runner and task use separate log files", async () => {
  const runner = await importRunnerModule();

  assert.equal(runner.runnerLogFileName, "biz2lab-autopilot-runner.log");
  assert.equal(runner.taskOutputLogFileName, "biz2lab-autopilot-task-output.log");
  assert.notEqual(runner.runnerLogFileName, runner.taskOutputLogFileName);
});

test("Biz2Lab autopilot runner lock blocks a fresh overlapping run", async () => {
  const runner = await importRunnerModule();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-autopilot-lock-"));
  const lockPath = path.join(tempDir, runner.lockFileName);
  const nowMs = Date.now();

  try {
    const first = runner.acquireAutopilotLock(lockPath, { nowMs });
    const second = runner.acquireAutopilotLock(lockPath, {
      nowMs: nowMs + 1000,
      staleMs: runner.lockStaleMs,
    });

    assert.equal(first.acquired, true);
    assert.equal(second.acquired, false);
    assert.equal(second.status, "AUTOPILOT_ALREADY_RUNNING");
  } finally {
    runner.releaseAutopilotLock(lockPath);
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Biz2Lab autopilot runner recovers a stale lock", async () => {
  const runner = await importRunnerModule();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-autopilot-stale-lock-"));
  const lockPath = path.join(tempDir, runner.lockFileName);
  const nowMs = Date.now();
  const staleDate = new Date(nowMs - runner.lockStaleMs - 5000);

  try {
    fs.writeFileSync(lockPath, "stale", "utf8");
    fs.utimesSync(lockPath, staleDate, staleDate);
    const result = runner.acquireAutopilotLock(lockPath, {
      nowMs,
      staleMs: runner.lockStaleMs,
    });

    assert.equal(result.acquired, true);
    assert.equal(result.staleRemoved, true);
  } finally {
    runner.releaseAutopilotLock(lockPath);
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Biz2Lab autopilot runner logging failure does not throw", async () => {
  const runner = await importRunnerModule();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-autopilot-log-"));
  const logPath = path.join(tempDir, runner.runnerLogFileName);
  const busyError = Object.assign(new Error("busy"), { code: "EBUSY" });

  try {
    const result = runner.appendLogLineSafely(logPath, "line", {
      retries: 1,
      retryDelayMs: 0,
      appendFile: () => {
        throw busyError;
      },
    });

    assert.equal(result.ok, false);
    assert.equal(result.code, "EBUSY");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
