import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const guidePath = path.join(root, "docs", "ops", "biz2lab-content-autopilot.md");
const helperPath = path.join(root, "scripts", "biz2lab-autopilot-status.mjs");
const runnerPath = path.join(root, "scripts", "biz2lab-autopilot-runner.mjs");
const taskSetupPath = path.join(root, "scripts", "setup-biz2lab-autopilot-hourly-task.ps1");

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
  assert.match(guide, /production smoke after merge/i);
  assert.doesNotMatch(guide, /Biz2Lab \?ㅽ넗\?뚯씪/);
  assert.equal(guide.includes("????筌???"), false);
});

test("Biz2Lab autopilot helper stays read-only and exposes zone fields", () => {
  const helper = fs.readFileSync(helperPath, "utf8");

  assert.match(helper, /"read-only"/);
  assert.match(helper, /greenZoneAutomergeCandidate/);
  assert.match(helper, /yellowZoneOwnerReview/);
  assert.match(helper, /redZoneBlocked/);
  assert.match(helper, /BIZ2LAB_GREEN_ZONE_AUTOMERGE_APPROVED/);

  assert.doesNotMatch(helper, /writeFileSync|copyFileSync|rmSync|unlinkSync|mkdirSync/);
  assert.doesNotMatch(helper, /gh", \["pr", "merge"/);
  assert.doesNotMatch(helper, /git", \["push"/);
  assert.doesNotMatch(helper, /git", \["commit"/);
  assert.doesNotMatch(helper, /vercel", \["deploy"/);
});

test("Biz2Lab autopilot runner keeps one-action and safety gates explicit", () => {
  const runner = fs.readFileSync(runnerPath, "utf8");

  assert.match(runner, /biz2lab-autopilot-status/);
  assert.match(runner, /PROMPT_PACKAGE_PR_CREATED/);
  assert.match(runner, /OWNER_REVIEW_REQUIRED/);
  assert.match(runner, /WAITING_FOR_CODEX_IMAGE_ARTIFACT/);
  assert.match(runner, /data\/content-series-run-state\.json/);
  assert.match(runner, /currentBranch\(\)/);
  assert.match(runner, /branch !== expectedMasterBranch/);
  assert.match(runner, /promptPackageValidationCommands/);
  assert.match(runner, /publicationValidationCommands/);

  assert.doesNotMatch(runner, /vercel.+deploy/i);
  assert.doesNotMatch(runner, /BIZ2LAB_ADMIN_TOKEN|SECRET|PASSWORD/);
  assert.doesNotMatch(runner, /setInterval|while\s*\(\s*true\s*\)/);
});

test("Biz2Lab hourly task setup uses the canonical safe runner command", () => {
  const setup = fs.readFileSync(taskSetupPath, "utf8");

  assert.match(setup, /Biz2Lab Autopilot Hourly/);
  assert.match(setup, /New-TimeSpan -Hours 1/);
  assert.match(setup, /C:\\Users\\LOVE\\MyProjects\\Biz2Lab_Os/);
  assert.match(setup, /npm run ops:autopilot-run/);
  assert.match(setup, /biz2lab-autopilot-hourly\.log/);
  assert.match(setup, /MultipleInstances IgnoreNew/);

  assert.doesNotMatch(setup, /vercel\s+deploy/i);
  assert.doesNotMatch(setup, /BIZ2LAB_ADMIN_TOKEN|SECRET|PASSWORD/);
});
