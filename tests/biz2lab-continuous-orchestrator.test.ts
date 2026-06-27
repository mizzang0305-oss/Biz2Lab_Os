import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const orchestratorPath = path.join(root, "scripts", "biz2lab-continuous-orchestrator.mjs");
const packagePath = path.join(root, "package.json");
const taskSetupPath = path.join(root, "scripts", "setup-biz2lab-autopilot-hourly-task.ps1");

const weakSlugs = [
  "sales-achievement-rate",
  "unify-order-channels-for-sales",
  "ai-knowledge-store-for-small-business",
  "customer-memory-system",
  "daily-numbers-for-small-business",
  "reservation-order-review-management",
  "solo-business-systemization",
  "unify-order-channels",
];

async function importOrchestrator() {
  return await import(`${pathToFileURL(orchestratorPath).href}?cacheBust=${Date.now()}`);
}

test("package exposes the continuous orchestrator command", () => {
  const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  assert.equal(pkg.scripts["ops:continue"], "node scripts/biz2lab-continuous-orchestrator.mjs");
});

test("continuous orchestrator blocks red-zone changed files before any action", async () => {
  const orchestrator = await importOrchestrator();
  const safety = orchestrator.evaluateRedZone({
    trackedFiles: [".env.local", "data/content-series-run-state.json"],
    stagedFiles: ["lib/payment-client.ts"],
    fileTexts: new Map(),
  });

  assert.equal(safety.redZoneBlocked, true);
  assert.match(safety.reasons.join("\n"), /\.env/);
  assert.match(safety.reasons.join("\n"), /content-series-run-state/);
  assert.match(safety.reasons.join("\n"), /payment/i);
});

test("continuous orchestrator treats protected untracked files as clean enough", async () => {
  const orchestrator = await importOrchestrator();
  const status = orchestrator.summarizeWorkingTree([
    "?? .codex-remote-attachments/",
    "?? .codex/config.toml",
  ]);

  assert.equal(status.cleanEnough, true);
  assert.deepEqual(status.trackedFiles, []);
  assert.deepEqual(status.unexpectedUntracked, []);
});

test("exhausted queue with weak articles chooses one evergreen hardening batch of five", async () => {
  const orchestrator = await importOrchestrator();
  const decision = orchestrator.decideNextContinuousAction({
    safety: { redZoneBlocked: false, reasons: [] },
    git: { cleanEnough: true },
    openPrs: [],
    scheduler: { status: "CONTENT_SERIES_QUEUE_EXHAUSTED", topic: "posthog-product-analytics-automation" },
    ai: { readyArticles: 42, totalArticles: 50, weakSlugs },
    webmaster: { google: "OWNER_UNKNOWN", naver: "OWNER_UNKNOWN" },
  });

  assert.equal(decision.decision, "EVERGREEN_HARDENING");
  assert.equal(decision.actionTaken, "PREPARE_EVERGREEN_HARDENING_PR");
  assert.deepEqual(decision.selectedSlugs, weakSlugs.slice(0, 5));
  assert.equal(decision.ownerActionRequired.length, 0);
});

test("exhausted queue with no weak articles recommends next queue instead of writing content", async () => {
  const orchestrator = await importOrchestrator();
  const decision = orchestrator.decideNextContinuousAction({
    safety: { redZoneBlocked: false, reasons: [] },
    git: { cleanEnough: true },
    openPrs: [],
    scheduler: { status: "CONTENT_SERIES_QUEUE_EXHAUSTED", topic: "posthog-product-analytics-automation" },
    ai: { readyArticles: 50, totalArticles: 50, weakSlugs: [] },
    webmaster: { google: "OWNER_UNKNOWN", naver: "OWNER_UNKNOWN" },
  });

  assert.equal(decision.decision, "QUEUE_RECOMMENDATION");
  assert.equal(decision.actionTaken, "REPORT_ONLY");
  assert.match(decision.nextRunRecommendation, /new topic queue/i);
});

test("approved exhausted queue chooses dashboard queue bootstrap instead of passive recommendation", async () => {
  const orchestrator = await importOrchestrator();
  const decision = orchestrator.decideNextContinuousAction({
    approveNextQueue: true,
    safety: { redZoneBlocked: false, reasons: [] },
    git: { cleanEnough: true },
    openPrs: [],
    scheduler: { status: "CONTENT_SERIES_QUEUE_EXHAUSTED", topic: "posthog-product-analytics-automation" },
    ai: { readyArticles: 50, totalArticles: 50, weakSlugs: [] },
    webmaster: { google: "OWNER_UNKNOWN", naver: "OWNER_UNKNOWN" },
  });

  assert.equal(decision.decision, "NEXT_QUEUE_BOOTSTRAP_APPROVED");
  assert.equal(decision.actionTaken, "PREPARE_DASHBOARD_CONTENT_QUEUE_PR");
  assert.deepEqual(decision.selectedSlugs, [
    "metabase-dashboard-automation-for-small-business",
    "apache-superset-bi-dashboard-automation",
    "redash-open-source-dashboard-automation",
  ]);
  assert.equal(decision.ownerActionRequired.length, 0);
});

test("continuous orchestrator parses safe action-count and prompt-package merge flags", async () => {
  const orchestrator = await importOrchestrator();
  const defaults = orchestrator.parseContinuousArgs([]);
  const parsed = orchestrator.parseContinuousArgs([
    "--max-actions",
    "3",
    "--approve-prompt-package-merge",
  ]);

  assert.equal(defaults.maxActions, 1);
  assert.equal(defaults.approvePromptPackageMerge, false);
  assert.equal(parsed.maxActions, 3);
  assert.equal(parsed.approvePromptPackageMerge, true);
});

test("dashboard queue bootstrap updates only topic queue state and topic definitions", async () => {
  const orchestrator = await importOrchestrator();
  const state = {
    series: "free-open-source-automation-tools",
    title: "Series",
    currentTopic: "posthog-product-analytics-automation",
    completed: ["posthog-product-analytics-automation"],
    next: [],
    gates: {
      manualDeploy: false,
      autoMerge: false,
      dbWrite: false,
      externalBusinessApi: false,
      placeholderImages: false,
      requireRealHeroImage: true,
      requireProductionSmokeAfterMerge: true,
    },
    imagePolicy: {
      rawDirectory: "assets/images/raw",
      publicDirectory: "public/images/posts",
      rawFilenamePattern: "<slug>-hero.jpg",
      publicFilenamePattern: "<slug>-hero.webp",
      requireSlugInFilename: true,
      rejectPlaceholderTerms: ["placeholder"],
      allowedArtifactExtensions: [".png"],
      artifactSearchRoots: [],
    },
    validationPolicy: {
      requiredCommands: [],
      allowValidationBypass: false,
      requireValidatePostsCountUpdateWhenPublishing: true,
    },
    mergePolicy: {
      branchPattern: "codex/<topic-slug>-automation-series-article",
      commitMessagePattern: "feat(content): publish <tool-name> automation analysis article",
      createPullRequest: true,
      targetBranch: "master",
      autoMerge: false,
      manualDeploy: false,
      requireOwnerMerge: true,
    },
  };
  const topicFile = {
    series: "free-open-source-automation-tools",
    topics: [
      {
        id: "posthog",
        slug: "posthog-product-analytics-automation",
      },
    ],
  };

  const result = orchestrator.buildDashboardQueueBootstrap(state, topicFile);

  assert.equal(result.state.currentTopic, "metabase-dashboard-automation-for-small-business");
  assert.deepEqual(result.state.next, [
    "metabase-dashboard-automation-for-small-business",
    "apache-superset-bi-dashboard-automation",
    "redash-open-source-dashboard-automation",
  ]);
  assert.deepEqual(result.state.completed, ["posthog-product-analytics-automation"]);
  assert.deepEqual(result.changedFiles, ["data/content-series-state.json", "data/content-series-topics.json"]);
  assert.equal(result.topicFile.topics.length, 4);
  assert.equal(result.topicFile.topics.at(-1).slug, "redash-open-source-dashboard-automation");
  assert.equal(
    result.topicFile.topics.some((topic: { slug?: unknown }) => String(topic.slug).includes("directus")),
    false,
  );
});

test("active content queue delegates exactly one action to the existing autopilot runner", async () => {
  const orchestrator = await importOrchestrator();
  const decision = orchestrator.decideNextContinuousAction({
    safety: { redZoneBlocked: false, reasons: [] },
    git: { cleanEnough: true },
    openPrs: [],
    scheduler: { status: "WAITING_FOR_CODEX_IMAGE_ARTIFACT", topic: "example-topic" },
    ai: { readyArticles: 42, totalArticles: 50, weakSlugs },
    webmaster: { google: "OWNER_UNKNOWN", naver: "OWNER_UNKNOWN" },
  });

  assert.equal(decision.decision, "DELEGATE_TO_AUTOPILOT");
  assert.equal(decision.actionTaken, "RUN_OPS_AUTOPILOT_RUN_ONCE");
});

test("open PRs take priority and only Green-Zone passing PRs are merge candidates", async () => {
  const orchestrator = await importOrchestrator();
  const greenDecision = orchestrator.decideNextContinuousAction({
    safety: { redZoneBlocked: false, reasons: [] },
    git: { cleanEnough: true },
    openPrs: [{ number: 91, zone: "green", checksPassed: true, url: "https://example.test/pr/91" }],
    scheduler: { status: "CONTENT_SERIES_QUEUE_EXHAUSTED", topic: "posthog-product-analytics-automation" },
    ai: { readyArticles: 42, totalArticles: 50, weakSlugs },
    webmaster: { google: "OWNER_UNKNOWN", naver: "OWNER_UNKNOWN" },
  });
  const yellowDecision = orchestrator.decideNextContinuousAction({
    safety: { redZoneBlocked: false, reasons: [] },
    git: { cleanEnough: true },
    openPrs: [{ number: 92, zone: "yellow", checksPassed: true, url: "https://example.test/pr/92" }],
    scheduler: { status: "CONTENT_SERIES_QUEUE_EXHAUSTED", topic: "posthog-product-analytics-automation" },
    ai: { readyArticles: 42, totalArticles: 50, weakSlugs },
    webmaster: { google: "OWNER_UNKNOWN", naver: "OWNER_UNKNOWN" },
  });

  assert.equal(greenDecision.decision, "OPEN_PR_GREEN_ZONE");
  assert.equal(greenDecision.actionTaken, "REVIEW_AND_MERGE_ONE_GREEN_PR");
  assert.equal(greenDecision.prUrl, "https://example.test/pr/91");
  assert.equal(yellowDecision.decision, "OWNER_REVIEW_REQUIRED");
  assert.match(yellowDecision.ownerActionRequired.join("\n"), /PR #92/);
});

test("continuous orchestrator writes markdown and ndjson reports", async () => {
  const orchestrator = await importOrchestrator();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-continuous-report-"));

  try {
    const record = {
      timestamp: "2026-06-27T00:00:00.000Z",
      decision: "QUEUE_RECOMMENDATION",
      actionTaken: "REPORT_ONLY",
      openPrs: 0,
      schedulerStatus: "CONTENT_SERIES_QUEUE_EXHAUSTED",
      aiReadyBefore: "50/50",
      aiReadyAfter: "50/50",
      changedFiles: [],
      prUrl: null,
      mergeCommit: null,
      ownerActionRequired: ["Google/Naver remain OWNER_UNKNOWN"],
      validation: [],
      productionSmoke: [],
      safety: {
        manualDeploy: false,
        fakeAnalytics: false,
        secrets: false,
        runStateCommitted: false,
      },
      nextRunRecommendation: "Recommend the next small queue.",
    };

    const result = orchestrator.writeContinuousReports(record, { rootDir: tempDir });
    assert.equal(fs.existsSync(result.markdownPath), true);
    assert.equal(fs.existsSync(result.historyPath), true);
    assert.match(fs.readFileSync(result.markdownPath, "utf8"), /A\. Overall Result/);
    assert.match(fs.readFileSync(result.markdownPath, "utf8"), /Google \/ Naver Owner Status/);
    const historyLine = fs.readFileSync(result.historyPath, "utf8").trim();
    assert.equal(JSON.parse(historyLine).decision, "QUEUE_RECOMMENDATION");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("continuous orchestrator source avoids forbidden deploy, secret, analytics, and loop behavior", () => {
  const source = fs.readFileSync(orchestratorPath, "utf8");

  assert.match(source, /CONTINUOUS_ORCHESTRATOR_ALREADY_RUNNING/);
  assert.match(source, /biz2lab-continuous-orchestrator\.log/);
  assert.match(source, /reports\/continuous-orchestrator-latest\.md/);
  assert.match(source, /--approve-next-queue/);
  assert.match(source, /codex\/add-dashboard-content-queue/);
  assert.match(source, /feat\(content\): add dashboard automation content queue/);
  assert.doesNotMatch(source, /vercel\s+deploy/i);
  assert.doesNotMatch(source, /BIZ2LAB_ADMIN_TOKEN|SECRET|PASSWORD/);
  assert.doesNotMatch(source, /Search Console.*submitted.*true/i);
  assert.doesNotMatch(source, /meta keywords/i);
  assert.doesNotMatch(source, /setInterval|while\s*\(\s*true\s*\)/);
  assert.doesNotMatch(source, /data\/content-series-run-state\.json["']?\s*,?\s*["']?\]/);
});

test("hourly task setup uses ops:continue and the continuous orchestrator log", () => {
  const setup = fs.readFileSync(taskSetupPath, "utf8");

  assert.match(setup, /npm run ops:continue/);
  assert.match(setup, /biz2lab-continuous-orchestrator\.log/);
  assert.match(setup, /git pull --ff-only origin master/);
  assert.doesNotMatch(setup, /vercel\s+deploy/i);
  assert.doesNotMatch(setup, /BIZ2LAB_ADMIN_TOKEN|SECRET|PASSWORD/);
});
