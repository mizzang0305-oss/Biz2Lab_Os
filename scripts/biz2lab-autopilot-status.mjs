#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const protectedUntracked = new Set([".codex-remote-attachments/", ".codex/config.toml"]);

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

function gitStatus() {
  const result = run("git", ["status", "--short"]);
  const lines = result.stdout
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);
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

function recommend({ status, promptPackage, publicationFiles, artifact, matchingPrs, scheduler }) {
  const publicationPr = matchingPrs.find((item) => item.kind === "publication");
  const promptPr = matchingPrs.find((item) => item.kind === "prompt-package");
  if (!status.cleanEnough) {
    if (status.onlyRunStateDirty) {
      return "Recover data/content-series-run-state.json runtime dirtiness, then rerun autopilot status.";
    }
    return "BLOCKED_DIRTY_WORKTREE: inspect unexpected tracked or untracked files before continuing.";
  }
  if (publicationPr) {
    return `Review publication PR #${publicationPr.number}; merge only after scope, validation, state, and Vercel checks pass.`;
  }
  if (promptPr) {
    return `Review prompt package PR #${promptPr.number}; merge if scope and checks are safe, then align master.`;
  }
  if (!promptPackage.complete) {
    return "Create or merge the current topic hero prompt package before publication.";
  }
  if (!artifact.exists) {
    return "WAITING_FOR_CODEX_IMAGE_ARTIFACT: prepare the approved local Codex hero artifact.";
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
const matchingPrs = prs.prs
  .map((pr) => ({ ...pr, kind: classifyPr(pr, slug, heroKey) }))
  .filter((pr) => pr.kind !== "unrelated");
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
    matching: matchingPrs.map((pr) => ({
      number: pr.number,
      title: pr.title,
      url: pr.url,
      headRefName: pr.headRefName,
      isDraft: pr.isDraft,
      mergeable: pr.mergeable,
      kind: pr.kind,
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
});

console.log(JSON.stringify(report, null, 2));
