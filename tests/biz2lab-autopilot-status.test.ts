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
  assert.match(guide, /CODEX_HERO_ARTIFACT_GENERATED/);
  assert.match(guide, /production smoke after merge/i);
  assert.match(guide, /BIZ2LAB_AUTOPILOT_VERIFIED_AUTO_MERGE_APPROVED/);
  assert.match(guide, /--approve-publication-merge/);
  assert.match(guide, /PRODUCTION_SMOKE_FAILED/);
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

test("Biz2Lab autopilot helper reports missing artifact as executable generation action", async () => {
  const helper = await importStatusModule();
  const base = {
    status: { cleanEnough: true },
    promptPackage: { complete: true },
    publicationFiles: { article: false, raw: false, publicHero: false },
    artifact: { exists: false },
    matchingPrs: [],
    scheduler: { parsed: { status: "WAITING_FOR_CODEX_IMAGE_ARTIFACT" } },
    openPrCount: 0,
    greenZoneCandidates: [],
    yellowZonePrs: [],
    redZonePrs: [],
  };

  assert.equal(helper.nextAction(base), "generate_codex_hero_artifact");
  assert.match(helper.recommend(base), /generate the approved local Codex hero artifact/i);
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
  assert.match(runner, /approvePublicationMerge/);
  assert.match(runner, /PRODUCTION_SMOKE_FAILED/);
  assert.match(runner, /verifyPublicationStateAdvancement/);

  assert.doesNotMatch(runner, /vercel.+deploy/i);
  assert.doesNotMatch(runner, /BIZ2LAB_ADMIN_TOKEN|SECRET|PASSWORD/);
  assert.doesNotMatch(runner, /setInterval|while\s*\(\s*true\s*\)/);
});

test("Biz2Lab autopilot runner parses explicit merge approval flags", async () => {
  const runner = await importRunnerModule();
  const defaults = runner.parseRunnerArgs([]);
  const approved = runner.parseRunnerArgs([
    "--approve-prompt-package-merge",
    "--approve-publication-merge",
  ]);

  assert.equal(defaults.approvePromptPackageMerge, false);
  assert.equal(defaults.approvePublicationMerge, false);
  assert.equal(approved.approvePromptPackageMerge, true);
  assert.equal(approved.approvePublicationMerge, true);
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

test("Biz2Lab autopilot runner generates a local Codex PNG artifact without article or public image files", async () => {
  const runner = await importRunnerModule();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-autopilot-artifact-"));
  const slug = "metabase-dashboard-automation-for-small-business";
  const heroKey = `${slug}-hero`;
  const artifactDir = path.join(tempDir, ".codex", "generated_images", heroKey);
  const briefDir = path.join(tempDir, "image-briefs", "generated");
  fs.mkdirSync(briefDir, { recursive: true });
  fs.writeFileSync(
    path.join(briefDir, `${heroKey}.json`),
    JSON.stringify(
      {
        postSlug: slug,
        articleTitle: "Metabase dashboard automation",
        promptKo: "small business dashboard automation, permissions, reports, no logo, no screenshot",
        altKo: "Metabase dashboard automation concept image",
        captionKo: "Metabase dashboard automation concept",
        negativePromptKo: "official logo, copied screenshot, placeholder, fake analytics, watermark",
        textPolicy: "minimal text",
        visualDifferentiationHint: "dashboard reporting command center",
      },
      null,
      2,
    ),
    "utf8",
  );

  try {
    const result = await runner.generateCodexHeroArtifact({
      rootDir: tempDir,
      currentTopic: slug,
      topicName: "Metabase",
      artifact: { artifactDir, exists: false },
      promptPackage: { complete: true },
    }, { validate: false });

    assert.equal(result.action, "CODEX_HERO_ARTIFACT_GENERATED");
    assert.equal(result.createsArticle, false);
    assert.equal(result.importsRawOrPublicImage, false);
    assert.equal(result.placeholderImage, false);
    assert.equal(fs.existsSync(result.artifactPath), true);
    assert.equal(fs.existsSync(path.join(tempDir, "content", "ko", "automation", `${slug}.md`)), false);
    assert.equal(fs.existsSync(path.join(tempDir, "assets", "images", "raw", `${heroKey}.jpg`)), false);
    assert.equal(fs.existsSync(path.join(tempDir, "public", "images", "posts", `${heroKey}.webp`)), false);
    assert.ok(result.dimensions.width >= 1200);
    assert.ok(result.dimensions.height >= 675);
    assert.ok(fs.statSync(result.artifactPath).size > 4096);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Biz2Lab autopilot classifier does not auto-merge publication PRs by default", async () => {
  const helper = await importStatusModule();
  const result = helper.nextAction({
    status: { cleanEnough: true },
    promptPackage: { complete: true },
    publicationFiles: { article: false, raw: false, publicHero: false },
    artifact: { exists: true },
    matchingPrs: [
      {
        number: 123,
        kind: "publication",
        zone: "green",
        greenZoneAutomergeCandidate: false,
      },
    ],
    scheduler: { parsed: { status: "EXISTING_TOPIC_PR" } },
    openPrCount: 1,
    greenZoneCandidates: [],
    yellowZonePrs: [],
    redZonePrs: [],
  });

  assert.equal(result, "publication PR review");
});

test("Biz2Lab autopilot runner blocks failed and pending remote checks", async () => {
  const runner = await importRunnerModule();
  const failed = {
    statusCheckRollup: [
      { __typename: "StatusContext", context: "Vercel", state: "FAILURE" },
      {
        __typename: "CheckRun",
        name: "Vercel Preview Comments",
        status: "COMPLETED",
        conclusion: "SUCCESS",
      },
    ],
  };
  const pending = {
    statusCheckRollup: [
      { __typename: "StatusContext", context: "Vercel", state: "SUCCESS" },
      { __typename: "CheckRun", name: "Vercel Preview Comments", status: "IN_PROGRESS", conclusion: null },
    ],
  };
  const passed = {
    statusCheckRollup: [
      { __typename: "StatusContext", context: "Vercel", state: "SUCCESS" },
      { __typename: "CheckRun", name: "Vercel Preview Comments", status: "COMPLETED", conclusion: "SUCCESS" },
    ],
  };
  const missingPreview = {
    statusCheckRollup: [{ __typename: "StatusContext", context: "Vercel", state: "SUCCESS" }],
  };

  assert.equal(runner.statusChecksPassed(failed), false);
  assert.equal(runner.statusChecksPassed(pending), false);
  assert.equal(runner.statusChecksPassed(missingPreview), false);
  assert.equal(runner.statusChecksPassed(passed), true);
});

test("Biz2Lab autopilot publication state advancement requires the next topic", async () => {
  const runner = await importRunnerModule();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-state-advance-"));
  const stateDir = path.join(tempDir, "data");
  fs.mkdirSync(stateDir, { recursive: true });
  fs.writeFileSync(
    path.join(stateDir, "content-series-state.json"),
    JSON.stringify(
      {
        completed: ["metabase-dashboard-automation-for-small-business"],
        currentTopic: "apache-superset-bi-dashboard-automation",
        next: ["apache-superset-bi-dashboard-automation", "redash-open-source-dashboard-automation"],
      },
      null,
      2,
    ),
    "utf8",
  );

  try {
    const result = runner.verifyPublicationStateAdvancement(
      tempDir,
      "metabase-dashboard-automation-for-small-business",
    );
    assert.equal(result.completed, true);
    assert.equal(result.currentTopic, "apache-superset-bi-dashboard-automation");
    assert.equal(result.nextTopic, "apache-superset-bi-dashboard-automation");

    fs.writeFileSync(
      path.join(stateDir, "content-series-state.json"),
      JSON.stringify(
        {
          completed: [],
          currentTopic: "metabase-dashboard-automation-for-small-business",
          next: ["metabase-dashboard-automation-for-small-business"],
        },
        null,
        2,
      ),
      "utf8",
    );
    assert.throws(
      () => runner.verifyPublicationStateAdvancement(
        tempDir,
        "metabase-dashboard-automation-for-small-business",
      ),
      /does not mark/,
    );
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
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
