#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const protectedUntracked = new Set([".codex-remote-attachments/", ".codex/config.toml"]);
const approvedGreenZonePhrase = "BIZ2LAB_GREEN_ZONE_AUTOMERGE_APPROVED";
export const seriesQueueCompleteRecommendedAction =
  "Current content series queue is exhausted. Add new topics or run evergreen hardening/search verification tasks.";

function repoPath(...parts) {
  return path.join(root, ...parts);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(repoPath(...relativePath.split("/")), "utf8"));
}

function exists(relativePath) {
  return fs.existsSync(repoPath(...relativePath.split("/")));
}

function run(command, args, options = {}) {
  try {
    return {
      ok: true,
      stdout: execFileSync(command, args, {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        ...options,
      }),
    };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout?.toString?.() ?? "",
      stderr: error.stderr?.toString?.() ?? error.message,
      status: error.status,
    };
  }
}

function parseSchedulerOutput(output) {
  const start = output.indexOf("{");
  const end = output.lastIndexOf("}");
  if (start < 0 || end < start) {
    return null;
  }
  try {
    return JSON.parse(output.slice(start, end + 1));
  } catch {
    return null;
  }
}

export function summarizeGitStatusLines(lines) {
  const tracked = lines.filter((line) => !line.startsWith("?? "));
  const untracked = lines
    .filter((line) => line.startsWith("?? "))
    .map((line) => line.slice(3));
  const untrackedUnexpected = untracked.filter((item) => !protectedUntracked.has(item));
  return {
    raw: lines,
    tracked,
    onlyRunStateDirty:
      tracked.length === 1 && tracked[0].includes("data/content-series-run-state.json"),
    protectedUntrackedPresent: untracked.filter((item) => protectedUntracked.has(item)),
    untrackedUnexpected,
    cleanEnough:
      tracked.length === 0 && untrackedUnexpected.length === 0,
  };
}

function gitStatus() {
  const result = run("git", ["status", "--short"]);
  const lines = result.stdout
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);

  return summarizeGitStatusLines(lines);
}

function openPullRequests() {
  const result = run("gh", [
    "pr",
    "list",
    "--state",
    "open",
    "--limit",
    "50",
    "--json",
    "number,title,headRefName,url,isDraft,mergeable,statusCheckRollup",
  ]);
  if (!result.ok) {
    return { available: false, error: result.stderr || result.stdout, prs: [] };
  }
  try {
    return { available: true, prs: JSON.parse(result.stdout) };
  } catch (error) {
    return { available: false, error: error.message, prs: [] };
  }
}

function pullRequestFileNames(number) {
  const result = run("gh", ["pr", "diff", String(number), "--name-only"], {
    timeout: 60000,
  });
  if (!result.ok) {
    return {
      available: false,
      error: result.stderr || result.stdout,
      files: [],
    };
  }
  return {
    available: true,
    files: result.stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  };
}

function hasPassingRemoteChecks(pr) {
  const checks = Array.isArray(pr.statusCheckRollup) ? pr.statusCheckRollup : [];
  if (checks.length === 0) {
    return false;
  }
  return checks.every((check) => {
    if (check.__typename === "CheckRun") {
      return check.status === "COMPLETED" && check.conclusion === "SUCCESS";
    }
    if (check.__typename === "StatusContext") {
      return check.state === "SUCCESS";
    }
    return false;
  });
}

function isPromptPackagePath(file, heroKey) {
  return (
    file === `image-requests/generated/${heroKey}.md` ||
    file === `image-requests/generated/${heroKey}.prompt.md` ||
    file === `image-briefs/generated/${heroKey}.json`
  );
}

function isAllowedPromptPackagePath(file, heroKey) {
  return (
    isPromptPackagePath(file, heroKey) ||
    file === "docs/ops/biz2lab-content-autopilot.md" ||
    file === "scripts/biz2lab-autopilot-status.mjs"
  );
}

function isAllowedPublicationPath(file, slug, heroKey) {
  const responsiveHeroPaths = new Set([
    `public/images/posts/${slug}-400.webp`,
    `public/images/posts/${slug}-800.webp`,
    `public/images/posts/${slug}-1200.webp`,
  ]);
  const exactAllowed = new Set([
    `content/ko/automation/${slug}.md`,
    `assets/images/raw/${heroKey}.jpg`,
    `public/images/posts/${heroKey}.webp`,
    `image-requests/generated/${heroKey}.md`,
    `image-requests/generated/${heroKey}.prompt.md`,
    `image-briefs/generated/${heroKey}.json`,
    "content/ko/content-index.json",
    "data/image-assets.json",
    "lib/article-image-concepts.ts",
    "data/content-series-state.json",
    "data/seo-keyword-map.json",
    "content/ko/automation/free-open-source-automation-tools-series.md",
    "docs/content-engine/open-source-automation-series.md",
    "docs/image-engine/image-production-queue.md",
    "image-requests/generated/IMAGE_PRODUCTION_QUEUE.md",
    "tests/content-series-orchestrator.test.ts",
    "tests/content-series-scheduler.test.ts",
    "tests/seo-keyword-audit.test.ts",
    "tests/seo-ops-dashboard.test.ts",
  ]);
  return exactAllowed.has(file) || responsiveHeroPaths.has(file);
}

function isSmallSeoContentCleanupPath(file) {
  return (
    file.startsWith("content/ko/") ||
    file === "content/ko/content-index.json" ||
    file === "data/seo-keyword-map.json" ||
    file === "lib/seo-keyword-audit.ts" ||
    file === "lib/seo-ops-dashboard.ts" ||
    file === "tests/seo-keyword-audit.test.ts" ||
    file === "tests/seo-ops-dashboard.test.ts" ||
    file.startsWith("docs/ops/") ||
    file.startsWith("reports/")
  );
}

function pathZoneRisk(files) {
  const redPatterns = [
    /^\.env/,
    /^data\/content-series-run-state\.json$/,
    /^vercel\.json$/,
    /^\.vercel\//,
    /^\.github\/workflows\//,
    /^next\.config\./,
    /^app\/admin\//,
    /^app\/login\//,
    /^app\/api\/admin\//,
    /^app\/api\/.*(payment|message|notification|db|database)/i,
    /^lib\/.*(payment|message|notification|db|database|secret|credential)/i,
  ];
  const yellowPatterns = [
    /^app\/ko\/ops\//,
    /^lib\/ops-dashboard-auth\.ts$/,
    /^middleware\.ts$/,
    /^proxy\.ts$/,
    /^lib\/.*analytics/i,
    /^scripts\/content-series-(orchestrator|scheduler-runner)\.ts$/,
    /^package\.json$/,
  ];

  const red = files.filter((file) => redPatterns.some((pattern) => pattern.test(file)));
  const yellow = files.filter((file) => yellowPatterns.some((pattern) => pattern.test(file)));
  const articleFiles = files.filter((file) => file.startsWith("content/ko/") && file.endsWith(".md"));
  if (articleFiles.length > 3) {
    yellow.push("large article rewrite across many files");
  }
  return {
    red,
    yellow,
  };
}

function classifyPrSafety(pr, files, slug, heroKey) {
  if (!files.available) {
    return {
      zone: "owner-review",
      greenZoneAutomergeCandidate: false,
      yellowZoneOwnerReview: true,
      redZoneBlocked: false,
      reason: "PR diff unavailable; owner review required.",
      filesAvailable: false,
      files: [],
    };
  }

  const risks = pathZoneRisk(files.files);
  if (risks.red.length > 0) {
    return {
      zone: "red",
      greenZoneAutomergeCandidate: false,
      yellowZoneOwnerReview: false,
      redZoneBlocked: true,
      reason: `Red-zone files present: ${risks.red.join(", ")}`,
      filesAvailable: true,
      files: files.files,
    };
  }
  if (risks.yellow.length > 0) {
    return {
      zone: "yellow",
      greenZoneAutomergeCandidate: false,
      yellowZoneOwnerReview: true,
      redZoneBlocked: false,
      reason: `Yellow-zone owner review required: ${risks.yellow.join(", ")}`,
      filesAvailable: true,
      files: files.files,
    };
  }

  const allPromptPackage = files.files.every((file) =>
    isAllowedPromptPackagePath(file, heroKey),
  );
  const hasPromptPackage = files.files.some((file) => isPromptPackagePath(file, heroKey));
  if (hasPromptPackage && allPromptPackage) {
    return {
      zone: "green",
      greenZoneAutomergeCandidate: hasPassingRemoteChecks(pr),
      yellowZoneOwnerReview: false,
      redZoneBlocked: false,
      reason: hasPassingRemoteChecks(pr)
        ? "Green-zone prompt package PR with passing remote checks."
        : "Prompt package scope is green-zone, but remote checks are not fully passing yet.",
      filesAvailable: true,
      files: files.files,
    };
  }

  const allPublication = files.files.every((file) =>
    isAllowedPublicationPath(file, slug, heroKey),
  );
  const hasPublicationArticle = files.files.includes(`content/ko/automation/${slug}.md`);
  const hasPublicationState = files.files.includes("data/content-series-state.json");
  if (hasPublicationArticle && allPublication) {
    return {
      zone: "green",
      greenZoneAutomergeCandidate: hasPassingRemoteChecks(pr) && hasPublicationState,
      yellowZoneOwnerReview: false,
      redZoneBlocked: false,
      reason:
        hasPassingRemoteChecks(pr) && hasPublicationState
          ? "Green-zone publication PR with state advancement and passing remote checks."
          : "Publication scope is green-zone, but remote checks or state advancement are not complete.",
      filesAvailable: true,
      files: files.files,
    };
  }

  const allSmallCleanup = files.files.every(isSmallSeoContentCleanupPath);
  if (allSmallCleanup && files.files.length <= 12) {
    return {
      zone: "green",
      greenZoneAutomergeCandidate: hasPassingRemoteChecks(pr),
      yellowZoneOwnerReview: false,
      redZoneBlocked: false,
      reason: hasPassingRemoteChecks(pr)
        ? "Green-zone small SEO/content cleanup PR with passing remote checks."
        : "Small SEO/content cleanup scope is green-zone, but remote checks are not fully passing yet.",
      filesAvailable: true,
      files: files.files,
    };
  }

  return {
    zone: "yellow",
    greenZoneAutomergeCandidate: false,
    yellowZoneOwnerReview: true,
    redZoneBlocked: false,
    reason: "PR scope is not an approved green-zone pattern.",
    filesAvailable: true,
    files: files.files,
  };
}

function schedulerDryRun() {
  const command = process.platform === "win32" ? "cmd.exe" : "npm";
  const args =
    process.platform === "win32"
      ? ["/d", "/s", "/c", "npm run content:series:scheduler -- --dry-run"]
      : ["run", "content:series:scheduler", "--", "--dry-run"];
  const result = run(command, args, {
    timeout: 120000,
  });
  return {
    ok: result.ok,
    parsed: parseSchedulerOutput(`${result.stdout}\n${result.stderr ?? ""}`),
    raw: `${result.stdout}${result.stderr ? `\n${result.stderr}` : ""}`.trim(),
  };
}

function findArtifact(heroKey) {
  const codexRoot = process.env.CODEX_GENERATED_IMAGE_ROOT
    ? path.resolve(process.env.CODEX_GENERATED_IMAGE_ROOT)
    : path.join(os.homedir(), ".codex", "generated_images");
  const artifactDir = path.join(codexRoot, heroKey);
  const allowed = new Set([".png", ".jpg", ".jpeg", ".webp"]);
  const rejectedTerms = /placeholder|dummy|fake|sample|blank|empty/i;
  if (!fs.existsSync(artifactDir)) {
    return { exists: false, codexRoot, artifactDir, files: [] };
  }
  const files = fs
    .readdirSync(artifactDir)
    .filter((name) => allowed.has(path.extname(name).toLowerCase()))
    .map((name) => {
      const fullPath = path.join(artifactDir, name);
      const stat = fs.statSync(fullPath);
      return {
        name,
        path: fullPath,
        size: stat.size,
        slugMatched: name.includes(heroKey),
        placeholderLike: rejectedTerms.test(name),
      };
    });
  const approved = files.find(
    (file) => file.slugMatched && !file.placeholderLike && file.size > 1024,
  );
  return {
    exists: Boolean(approved),
    codexRoot,
    artifactDir,
    files,
    approved: approved ?? null,
  };
}

function classifyPr(pr, slug, heroKey) {
  const text = `${pr.title} ${pr.headRefName}`.toLowerCase();
  const slugHit = text.includes(slug.toLowerCase()) || text.includes(heroKey.toLowerCase());
  if (!slugHit) {
    return "unrelated";
  }
  if (/hero|prompt|artifact/.test(text) && !/publish|publication|article/.test(text)) {
    return "prompt-package";
  }
  if (/publish|publication|article|content/.test(text)) {
    return "publication";
  }
  return "topic";
}

function classifyPrWithFiles(pr, files, slug, heroKey) {
  if (files.available) {
    const hasPromptPackage = files.files.some((file) => isPromptPackagePath(file, heroKey));
    const hasPublicationArticle = files.files.includes(`content/ko/automation/${slug}.md`);
    if (hasPublicationArticle) {
      return "publication";
    }
    if (hasPromptPackage) {
      return "prompt-package";
    }
  }
  return classifyPr(pr, slug, heroKey);
}

export function isSeriesQueueComplete({ status, scheduler, openPrCount }) {
  return (
    status.cleanEnough &&
    openPrCount === 0 &&
    scheduler.parsed?.status === "CONTENT_SERIES_QUEUE_EXHAUSTED"
  );
}

export function recommend({
  status,
  promptPackage,
  publicationFiles,
  artifact,
  matchingPrs,
  scheduler,
  openPrCount = Number.POSITIVE_INFINITY,
  greenZoneCandidates,
  yellowZonePrs,
  redZonePrs,
}) {
  const publicationPr = matchingPrs.find((item) => item.kind === "publication");
  const promptPr = matchingPrs.find((item) => item.kind === "prompt-package");
  if (!status.cleanEnough) {
    if (status.onlyRunStateDirty) {
      return "Recover data/content-series-run-state.json runtime dirtiness, then rerun autopilot status.";
    }
    return "BLOCKED_DIRTY_WORKTREE: inspect unexpected tracked or untracked files before continuing.";
  }
  if (redZonePrs.length > 0) {
    return `OWNER_REVIEW_REQUIRED: red-zone PR #${redZonePrs[0].number} is open; do not merge automatically.`;
  }
  if (yellowZonePrs.length > 0) {
    return `OWNER_REVIEW_REQUIRED: yellow-zone PR #${yellowZonePrs[0].number} is open; owner review is required before autopilot continues.`;
  }
  if (greenZoneCandidates.length > 0) {
    return `Green-zone auto-merge candidate PR #${greenZoneCandidates[0].number}; verify local validation, merge, production-smoke if publication, then continue.`;
  }
  if (publicationPr) {
    return `Review publication PR #${publicationPr.number}; merge only after scope, validation, state, and Vercel checks pass.`;
  }
  if (promptPr) {
    return `Review prompt package PR #${promptPr.number}; merge if scope and checks are safe, then align master.`;
  }
  if (isSeriesQueueComplete({ status, scheduler, openPrCount })) {
    return seriesQueueCompleteRecommendedAction;
  }
  if (!promptPackage.complete && !artifact.exists) {
    return "artifact-only preparation: create the image request, prompt, and brief package; generate the approved local Codex artifact; validate; open a prompt package PR; do not create article/raw/public image files.";
  }
  if (!promptPackage.complete) {
    return "Create or merge the current topic hero prompt package before publication.";
  }
  if (!artifact.exists) {
    return "artifact-only preparation: generate the approved local Codex hero artifact; validate; do not create article/raw/public image files.";
  }
  if (publicationFiles.article && publicationFiles.raw && publicationFiles.publicHero) {
    return "Publication files exist locally; validate, commit, push, and open/review the publication PR.";
  }
  const gate = scheduler.parsed?.status;
  if (gate === "DRY_RUN_READY") {
    return "Run the scheduler non-dry once to create the publication PR.";
  }
  if (gate === "CADENCE_NOT_DUE") {
    return "If active hours are open, rerun topic dry-run with --force-check; use it only for cadence.";
  }
  if (gate === "OUTSIDE_ACTIVE_HOURS") {
    return "Wait for active hours; do not bypass the active-hours gate.";
  }
  if (gate === "WAITING_FOR_CODEX_IMAGE_ARTIFACT") {
    return "WAITING_FOR_CODEX_IMAGE_ARTIFACT: prepare the approved local Codex hero artifact.";
  }
  if (gate === "STATE_ADVANCEMENT_REQUIRED") {
    return "Create a small state repair PR; do not generate the next article.";
  }
  if (gate) {
    return `Investigate scheduler gate ${gate}; continue only if the fix is obviously scoped.`;
  }
  return "Run topic dry-run and inspect the next gate.";
}

export function nextAction({
  status,
  promptPackage,
  publicationFiles,
  artifact,
  matchingPrs,
  scheduler,
  openPrCount = Number.POSITIVE_INFINITY,
  greenZoneCandidates,
  yellowZonePrs,
  redZonePrs,
}) {
  const publicationPr = matchingPrs.find((item) => item.kind === "publication");
  const promptPr = matchingPrs.find((item) => item.kind === "prompt-package");

  if (!status.cleanEnough) return "worktree recovery";
  if (redZonePrs.length > 0 || yellowZonePrs.length > 0) return "OWNER_REVIEW_REQUIRED";
  if (greenZoneCandidates.length > 0) return "green-zone auto-merge review";
  if (publicationPr) return "publication PR review";
  if (promptPr) return "prompt package PR review";
  if (isSeriesQueueComplete({ status, scheduler, openPrCount })) return "series complete";
  if (!promptPackage.complete || !artifact.exists) return "artifact-only preparation";
  if (publicationFiles.article && publicationFiles.raw && publicationFiles.publicHero) {
    return "publication PR preparation";
  }

  const gate = scheduler.parsed?.status;
  if (gate === "DRY_RUN_READY") return "publication scheduler run";
  if (gate === "CADENCE_NOT_DUE") return "cadence force-check review";
  if (gate === "OUTSIDE_ACTIVE_HOURS") return "wait for active hours";
  if (gate === "STATE_ADVANCEMENT_REQUIRED") return "state repair PR";
  if (gate) return "scheduler gate review";
  return "scheduler dry-run review";
}

export function buildAutopilotStatusReport() {
const state = readJson("data/content-series-state.json");
const topics = readJson("data/content-series-topics.json");
const schedule = exists("data/content-series-schedule.json")
  ? readJson("data/content-series-schedule.json")
  : null;
const slug = state.currentTopic;
const heroKey = `${slug}-hero`;
const topic = topics.topics.find((item) => item.slug === slug || item.id === slug) ?? null;
const status = gitStatus();
const prs = openPullRequests();
const classifiedPrs = prs.prs.map((pr) => {
  const files = pullRequestFileNames(pr.number);
  const safety = classifyPrSafety(pr, files, slug, heroKey);
  return {
    ...pr,
    kind: classifyPrWithFiles(pr, files, slug, heroKey),
    safety,
  };
});
const matchingPrs = classifiedPrs.filter((pr) => pr.kind !== "unrelated");
const greenZoneCandidates = classifiedPrs.filter(
  (pr) => pr.safety.greenZoneAutomergeCandidate,
);
const yellowZonePrs = classifiedPrs.filter((pr) => pr.safety.yellowZoneOwnerReview);
const redZonePrs = classifiedPrs.filter((pr) => pr.safety.redZoneBlocked);
const scheduler = schedulerDryRun();
const artifact = findArtifact(heroKey);
const promptPackage = {
  request: exists(`image-requests/generated/${heroKey}.md`),
  prompt: exists(`image-requests/generated/${heroKey}.prompt.md`),
  brief: exists(`image-briefs/generated/${heroKey}.json`),
};
promptPackage.complete = promptPackage.request && promptPackage.prompt && promptPackage.brief;
const publicationFiles = {
  article: exists(`content/ko/automation/${slug}.md`),
  raw: exists(`assets/images/raw/${heroKey}.jpg`),
  publicHero: exists(`public/images/posts/${heroKey}.webp`),
};
const seoKeywordMap = exists("data/seo-keyword-map.json")
  ? readJson("data/seo-keyword-map.json")
  : [];
const keywordMapEntry = Array.isArray(seoKeywordMap)
  ? seoKeywordMap.find((entry) => entry.slug === slug) ?? null
  : null;
const requiresOwnerReview = yellowZonePrs.length > 0 || redZonePrs.length > 0;
const seriesQueueComplete = isSeriesQueueComplete({
  status,
  scheduler,
  openPrCount: prs.prs.length,
});
const artifactOnlyPreparationReady =
  status.cleanEnough &&
  !seriesQueueComplete &&
  !requiresOwnerReview &&
  prs.prs.length === 0 &&
  (!promptPackage.complete || !artifact.exists);

const report = {
  mode: "read-only",
  currentTopic: slug,
  topicName: topic?.toolName ?? null,
  schedule: schedule
    ? {
        enabled: schedule.enabled,
        cadenceMinutes: schedule.cadenceMinutes,
        maxArticlesPerDay: schedule.maxArticlesPerDay,
        maxOpenPrs: schedule.maxOpenPrs,
        activeHours: schedule.activeHours,
        autoMerge: schedule.autoMerge,
        manualDeploy: schedule.manualDeploy,
      }
    : null,
  greenZonePolicy: {
    approval: approvedGreenZonePhrase,
    autoMergeAllowedForSafeContent: true,
    manualDeployAllowed: false,
    secretsAllowed: false,
    dbPaymentMessageApiAllowed: false,
    productionSmokeRequired: true,
  },
  greenZoneAutomergeCandidate: greenZoneCandidates.length > 0 || artifactOnlyPreparationReady,
  artifactOnlyPreparationReady,
  requiresOwnerReview,
  yellowZoneOwnerReview: yellowZonePrs.length > 0,
  redZoneBlocked: redZonePrs.length > 0,
  git: status,
  scheduler: {
    ok: scheduler.ok,
    status: scheduler.parsed?.status ?? null,
    topic: scheduler.parsed?.topic ?? null,
    message: scheduler.parsed?.message ?? null,
  },
  openPrs: {
    available: prs.available,
    count: prs.prs.length,
    classified: classifiedPrs.map((pr) => ({
      number: pr.number,
      title: pr.title,
      url: pr.url,
      headRefName: pr.headRefName,
      isDraft: pr.isDraft,
      mergeable: pr.mergeable,
      kind: pr.kind,
      zone: pr.safety.zone,
      greenZoneAutomergeCandidate: pr.safety.greenZoneAutomergeCandidate,
      yellowZoneOwnerReview: pr.safety.yellowZoneOwnerReview,
      redZoneBlocked: pr.safety.redZoneBlocked,
      reason: pr.safety.reason,
      changedFiles: pr.safety.files,
    })),
    matching: matchingPrs.map((pr) => ({
      number: pr.number,
      title: pr.title,
      url: pr.url,
      headRefName: pr.headRefName,
      isDraft: pr.isDraft,
      mergeable: pr.mergeable,
      kind: pr.kind,
      zone: pr.safety.zone,
      greenZoneAutomergeCandidate: pr.safety.greenZoneAutomergeCandidate,
      yellowZoneOwnerReview: pr.safety.yellowZoneOwnerReview,
      redZoneBlocked: pr.safety.redZoneBlocked,
      reason: pr.safety.reason,
    })),
    error: prs.error ?? null,
  },
  artifact: {
    exists: artifact.exists,
    artifactDir: artifact.artifactDir,
    approved: artifact.approved,
    candidateCount: artifact.files.length,
  },
  promptPackage,
  publicationFiles,
  keywordMap: {
    hasEntry: Boolean(keywordMapEntry),
    primaryKeyword: keywordMapEntry?.primaryKeyword ?? null,
    searchIntent: keywordMapEntry?.searchIntent ?? null,
    cluster: keywordMapEntry?.cluster ?? null,
  },
  state: {
    completedCount: state.completed.length,
    next: state.next,
    gates: state.gates,
  },
};

report.nextRecommendedAction = recommend({
  status,
  promptPackage,
  publicationFiles,
  artifact,
  matchingPrs,
  scheduler,
  openPrCount: prs.prs.length,
  greenZoneCandidates,
  yellowZonePrs,
  redZonePrs,
});
report.nextAction = nextAction({
  status,
  promptPackage,
  publicationFiles,
  artifact,
  matchingPrs,
  scheduler,
  openPrCount: prs.prs.length,
  greenZoneCandidates,
  yellowZonePrs,
  redZonePrs,
});

return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(buildAutopilotStatusReport(), null, 2));
}
