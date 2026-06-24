import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const guidePath = path.join(root, "docs", "ops", "biz2lab-content-autopilot.md");
const helperPath = path.join(root, "scripts", "biz2lab-autopilot-status.mjs");

test("Biz2Lab autopilot guide documents Green-Zone approval and readable invocation", () => {
  const guide = fs.readFileSync(guidePath, "utf8");

  assert.match(guide, /Biz2Lab 오토파일럿 계속 진행해\./);
  assert.match(guide, /BIZ2LAB_GREEN_ZONE_AUTOMERGE_APPROVED/);
  assert.match(guide, /Green Zone: Auto-Merge Allowed/);
  assert.match(guide, /Yellow Zone: Owner Review Required/);
  assert.match(guide, /Red Zone: Hard Stop/);
  assert.match(guide, /production smoke after merge/i);
  assert.doesNotMatch(guide, /ㅽ|怨|吏|뚯/);
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
