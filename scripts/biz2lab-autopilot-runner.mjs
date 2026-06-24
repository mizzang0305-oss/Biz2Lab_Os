#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const logDirectory = path.join(root, ".tmp");
const logPath = path.join(logDirectory, "biz2lab-autopilot-hourly.log");
const protectedUntracked = new Set([".codex-remote-attachments/", ".codex/config.toml"]);
const expectedMasterBranch = "master";

const promptPackageValidationCommands = [
  "npm run audit:image-briefs",
  "npm run audit:image-prompts",
  "npm run validate:images",
  "npm run image-skill:plan",
  "npm run image-skill:validate",
  "git diff --check",
  "git diff --cached --check",
];

const publicationValidationCommands = [
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
  "npm run image-skill:plan",
  "npm run image-skill:validate",
  "git diff --check",
  "git diff --cached --check",
];

function ensureLogDirectory() {
  fs.mkdirSync(logDirectory, { recursive: true });
}

function writeLog(record) {
  ensureLogDirectory();
  const entry = {
    timestamp: new Date().toISOString(),
    ...record,
  };
  const line = JSON.stringify(entry);
  fs.appendFileSync(logPath, `${line}${os.EOL}`, "utf8");
  console.log(JSON.stringify(entry, null, 2));
}

function run(command, args, options = {}) {
  try {
    const stdout = execFileSync(command, args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: options.timeout ?? 120000,
      env: process.env,
    });
    return { ok: true, stdout };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout?.toString?.() ?? "",
      stderr: error.stderr?.toString?.() ?? error.message,
      status: error.status,
    };
  }
}

function runOrThrow(command, args, options = {}) {
  const invocation = { command, args };
  const result = run(command, args, options);
  if (!result.ok) {
    const details = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`${command} ${args.join(" ")} failed: ${details}`);
  }
  return { ...result, invocation };
}

function runShell(command, options = {}) {
  if (process.platform === "win32") {
    return runOrThrow("cmd.exe", ["/d", "/s", "/c", command], options);
  }
  return runOrThrow("sh", ["-lc", command], options);
}

function parseJsonFromOutput(output) {
  const start = output.indexOf("{");
  const end = output.lastIndexOf("}");
  if (start < 0 || end < start) {
    throw new Error(`No JSON object found in command output: ${output.slice(0, 500)}`);
  }
  return JSON.parse(output.slice(start, end + 1));
}

function gitStatusLines() {
  const result = runOrThrow("git", ["status", "--short"]);
  return result.stdout
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);
}

function classifyGitStatus(lines) {
  const tracked = lines.filter((line) => !line.startsWith("?? "));
  const untracked = lines
    .filter((line) => line.startsWith("?? "))
    .map((line) => line.slice(3));
  const unexpectedUntracked = untracked.filter((item) => !protectedUntracked.has(item));
  return {
    raw: lines,
    tracked,
    unexpectedUntracked,
    onlyRunStateDirty:
      tracked.length === 1 && tracked[0].includes("data/content-series-run-state.json"),
    cleanEnough: tracked.length === 0 && unexpectedUntracked.length === 0,
  };
}

function recoverRunStateIfSafe() {
  const status = classifyGitStatus(gitStatusLines());
  if (!status.onlyRunStateDirty) {
    return { recovered: false, backupPath: null, before: status };
  }

  ensureLogDirectory();
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(logDirectory, `content-series-run-state.autopilot-${stamp}.json`);
  runOrThrow("git", ["diff", "--", "data/content-series-run-state.json"], { timeout: 60000 });
  fs.copyFileSync(path.join(root, "data", "content-series-run-state.json"), backupPath);
  runOrThrow("git", ["restore", "--", "data/content-series-run-state.json"]);
  return {
    recovered: true,
    backupPath,
    before: status,
    after: classifyGitStatus(gitStatusLines()),
  };
}

function currentBranch() {
  return runOrThrow("git", ["branch", "--show-current"]).stdout.trim();
}

function readAutopilotStatus() {
  const result = runOrThrow("node", ["scripts/biz2lab-autopilot-status.mjs"], {
    timeout: 180000,
  });
  return parseJsonFromOutput(result.stdout);
}

function validationCommandsForPr(pr) {
  return pr.kind === "prompt-package"
    ? promptPackageValidationCommands
    : publicationValidationCommands;
}

function runValidation(commands) {
  for (const command of commands) {
    runShell(command, { timeout: 1200000 });
  }
}

function statusChecksPassed(pr) {
  const checks = Array.isArray(pr.statusCheckRollup) ? pr.statusCheckRollup : [];
  return checks.length > 0 && checks.every((check) => {
    if (check.__typename === "CheckRun") {
      return check.status === "COMPLETED" && check.conclusion === "SUCCESS";
    }
    if (check.__typename === "StatusContext") {
      return check.state === "SUCCESS";
    }
    return false;
  });
}

function readPullRequest(number) {
  const result = runOrThrow("gh", [
    "pr",
    "view",
    String(number),
    "--json",
    "number,title,url,headRefName,baseRefName,isDraft,mergeable,state,statusCheckRollup",
  ], { timeout: 120000 });
  return parseJsonFromOutput(result.stdout);
}

function alignMaster() {
  runOrThrow("git", ["fetch", "origin"], { timeout: 120000 });
  runOrThrow("git", ["checkout", expectedMasterBranch], { timeout: 120000 });
  runOrThrow("git", ["reset", "--hard", `origin/${expectedMasterBranch}`], { timeout: 120000 });
}

function publicationSlugFromFiles(files = []) {
  const article = files.find((file) =>
    /^content\/ko\/automation\/[a-z0-9-]+\.md$/.test(file),
  );
  return article?.replace("content/ko/automation/", "").replace(/\.md$/, "") ?? null;
}

async function waitForProductionSmoke(slug) {
  if (!slug) {
    return { status: "SKIPPED", reason: "No article slug found in PR files." };
  }

  const route = `https://www.biz2lab.com/ko/automation/${slug}`;
  const hero = `https://www.biz2lab.com/images/posts/${slug}-hero.webp`;
  const sitemap = "https://www.biz2lab.com/sitemap.xml";
  const rss = "https://www.biz2lab.com/rss.xml";
  const robots = "https://www.biz2lab.com/robots.txt";

  for (let attempt = 1; attempt <= 20; attempt += 1) {
    const page = await fetch(route, { redirect: "follow" });
    const html = await page.text();
    const heroResponse = await fetch(hero, { redirect: "follow" });
    const sitemapText = await (await fetch(sitemap, { redirect: "follow" })).text();
    const rssText = await (await fetch(rss, { redirect: "follow" })).text();
    const robotsText = await (await fetch(robots, { redirect: "follow" })).text();
    const ready =
      page.status === 200 &&
      html.includes(slug) &&
      html.includes(`${slug}-hero.webp`) &&
      !/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html) &&
      heroResponse.status === 200 &&
      (heroResponse.headers.get("content-type") ?? "").includes("image/webp") &&
      sitemapText.includes(`/ko/automation/${slug}`) &&
      rssText.includes(`/ko/automation/${slug}`) &&
      robotsText.includes("sitemap") &&
      !robotsText.includes("Disallow: /ko");

    if (ready) {
      return {
        status: "PASS",
        route,
        hero,
        sitemap: "includes route",
        rss: "includes route",
        robots: "sitemap referenced; /ko not blocked",
        attempts: attempt,
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 30000));
  }

  return {
    status: "PENDING_PRODUCTION_DEPLOY",
    route,
    hero,
  };
}

function createPromptPackagePr(status) {
  const slug = status.currentTopic;
  const heroKey = `${slug}-hero`;
  const branchName = `codex/${heroKey}`;
  const topicName = status.topicName ?? slug;
  const title = `chore(image): add ${topicName} hero prompt package`;

  runOrThrow("git", ["checkout", "-B", branchName], { timeout: 120000 });
  runShell(`npx tsx scripts/biz2lab-autopilot-prompt-package.ts --topic ${slug}`, {
    timeout: 120000,
  });
  runValidation(promptPackageValidationCommands);
  runOrThrow("git", [
    "add",
    `image-requests/generated/${heroKey}.md`,
    `image-requests/generated/${heroKey}.prompt.md`,
    `image-briefs/generated/${heroKey}.json`,
  ]);
  runOrThrow("git", ["commit", "-m", title]);
  const commit = runOrThrow("git", ["rev-parse", "HEAD"]).stdout.trim();
  runOrThrow("git", ["push", "-u", "origin", branchName], { timeout: 120000 });

  const body = `## 0) Intent
Add the ${topicName} hero prompt package so the local Codex artifact can be prepared safely before publication.

## 1) Summary (Problem → Solution → Outcome)
- Problem: The current content-series topic is missing its prompt package.
- Solution: Generate only the image request, prompt package, and generated brief for ${slug}.
- Outcome: The next autopilot run can merge this Green-Zone prompt package after checks pass.

## 2) Changes
Checklist:
- [ ] Bug fix
- [ ] Refactor / cleanup
- [ ] Performance improvement
- [ ] Security hardening
- [x] DX / tooling
- Added prompt-only image package files for ${slug}.

## 3) Files Changed
- image-requests/generated/${heroKey}.md (image request)
- image-requests/generated/${heroKey}.prompt.md (provider prompt package)
- image-briefs/generated/${heroKey}.json (generated image brief)

## 4) Testing
- Commands run: ${promptPackageValidationCommands.join(", ")}
- Verified no article, raw image, or public image files were generated.

## 5) Risk Assessment
Risk: Low.
- Static prompt metadata only.
- No deployment, DB, payment, message, API, or secret impact.

## 6) Rollback Plan
- Revert the prompt package commit.

## 7) Deployment Notes
- Required env vars: none
- Required secrets: none
- Migrations: none
- Deploy steps: none

## 8) Follow-ups (Optional)
- Prepare the local Codex hero artifact, then run the publication scheduler during active hours.
`;

  const prUrl = runOrThrow("gh", [
    "pr",
    "create",
    "--base",
    expectedMasterBranch,
    "--head",
    branchName,
    "--title",
    title,
    "--body",
    body,
  ], { timeout: 120000 }).stdout.trim();

  alignMaster();
  return {
    action: "PROMPT_PACKAGE_PR_CREATED",
    topic: slug,
    branch: branchName,
    commit,
    prUrl,
  };
}

async function mergeGreenZonePr(pr) {
  const latestPr = {
    ...pr,
    ...readPullRequest(pr.number),
    kind: pr.kind,
    changedFiles: pr.changedFiles,
  };

  if (!statusChecksPassed(latestPr)) {
    return {
      action: "REMOTE_CHECKS_PENDING",
      pr: pr.number,
      reason: "Green-Zone scope detected, but remote checks are not all successful.",
    };
  }

  runOrThrow("gh", ["pr", "checkout", String(latestPr.number)], { timeout: 120000 });
  runValidation(validationCommandsForPr(latestPr));
  if (latestPr.isDraft) {
    runOrThrow("gh", ["pr", "ready", String(latestPr.number)], { timeout: 120000 });
  }
  runOrThrow("gh", [
    "pr",
    "merge",
    String(latestPr.number),
    "--squash",
    "--subject",
    latestPr.title,
  ], { timeout: 120000 });
  alignMaster();
  const productionSmoke = latestPr.kind === "publication"
    ? await waitForProductionSmoke(publicationSlugFromFiles(latestPr.changedFiles))
    : null;

  return {
    action: "GREEN_ZONE_PR_MERGED",
    pr: latestPr.number,
    kind: latestPr.kind,
    title: latestPr.title,
    productionSmoke,
  };
}

function runPublicationScheduler(status) {
  const slug = status.currentTopic;
  const schedulerStatus = status.scheduler?.status;
  if (schedulerStatus !== "DRY_RUN_READY") {
    return {
      action: "NO_PUBLICATION_RUN",
      topic: slug,
      gate: schedulerStatus,
      reason: "Publication non-dry run is allowed only after DRY_RUN_READY.",
    };
  }

  const result = runShell(
    `npm run content:series:scheduler -- --topic ${slug} --use-latest-codex-artifact`,
    { timeout: 1200000 },
  );
  return {
    action: "PUBLICATION_SCHEDULER_RAN",
    topic: slug,
    output: result.stdout.trim().slice(-4000),
  };
}

async function chooseAction(status) {
  if (status.redZoneBlocked || status.yellowZoneOwnerReview) {
    return {
      action: "OWNER_REVIEW_REQUIRED",
      reason: status.nextRecommendedAction,
    };
  }

  const greenCandidate = status.openPrs?.classified?.find(
    (pr) => pr.greenZoneAutomergeCandidate,
  );
  if (greenCandidate) {
    return await mergeGreenZonePr(greenCandidate);
  }

  if (!status.promptPackage?.complete) {
    return createPromptPackagePr(status);
  }

  if (!status.artifact?.exists) {
    return {
      action: "WAITING_FOR_CODEX_IMAGE_ARTIFACT",
      topic: status.currentTopic,
      artifactDir: status.artifact?.artifactDir,
      reason: "Prompt package exists, but no approved local Codex image artifact is available.",
    };
  }

  return runPublicationScheduler(status);
}

async function main() {
  const startedAt = new Date().toISOString();
  const recovery = recoverRunStateIfSafe();
  const branch = currentBranch();
  const status = readAutopilotStatus();

  const base = {
    startedAt,
    branch,
    currentTopic: status.currentTopic,
    schedulerGate: status.scheduler?.status ?? null,
    openPrCount: status.openPrs?.count ?? null,
    runStateRecovered: recovery.recovered,
    runStateBackup: recovery.backupPath,
  };

  if (branch !== expectedMasterBranch) {
    writeLog({
      ...base,
      result: "NOT_ON_MASTER",
      actionTaken: "NO_ACTION",
      blocker: `Autopilot writes are allowed only from ${expectedMasterBranch}; current branch is ${branch}.`,
      nextAction: "Merge this PR, then let the hourly task run from master.",
    });
    return;
  }

  if (!status.git?.cleanEnough) {
    writeLog({
      ...base,
      result: "BLOCKED_DIRTY_WORKTREE",
      actionTaken: "NO_ACTION",
      blocker: status.nextRecommendedAction,
      git: status.git,
    });
    return;
  }

  try {
    const result = await chooseAction(status);
    writeLog({
      ...base,
      result: result.action,
      actionTaken: result.action,
      detail: result,
      nextAction: result.action === "PROMPT_PACKAGE_PR_CREATED"
        ? "Wait for PR checks; next hourly run may merge the prompt package if Green-Zone checks pass."
        : "Rerun autopilot status for the next gate.",
    });
  } catch (error) {
    writeLog({
      ...base,
      result: "BLOCKED",
      actionTaken: "NO_ACTION",
      blocker: error instanceof Error ? error.message : String(error),
    });
    process.exitCode = 1;
  }
}

void main();
