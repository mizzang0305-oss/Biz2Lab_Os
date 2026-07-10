import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  getContentAutomationStatus,
} from "@/lib/admin/content-automation-service";
import { runSelectedTopicPlanOnly } from "@/lib/admin/content-automation-actions";

test("content automation admin status exposes queue visibility without weakening scheduler gates", () => {
  const status = getContentAutomationStatus();
  const labels = status.queue.map((item) => item.label);

  assert.equal(status.executionMode, "plan-only-web-console");
  assert.equal(status.schedule.autoMerge, false);
  assert.equal(status.schedule.manualDeploy, false);
  assert.equal(status.schedule.requireCodexArtifact, true);
  assert.equal(status.safetyGates.codexArtifactRequired, true);
  assert.equal(status.safetyGates.openPrLimitPreserved, true);
  assert.equal(status.safetyGates.dailyLimitPreserved, true);
  assert.equal(status.safetyGates.activeHoursPreserved, true);
  assert.equal(status.safetyGates.lockBehaviorPreserved, true);
  assert.equal(status.safetyGates.oneTopicPerRun, true);
  assert.equal(status.adminActions.merge, "not-available");
  assert.equal(status.adminActions.deploy, "not-available");

  for (const expectedLabel of [
    "OpenCut",
    "Activepieces",
    "Node-RED",
    "Huginn",
    "Baserow",
    "Appsmith",
    "Windmill",
    "Kestra",
    "NocoDB / n8n caution articles",
  ]) {
    assert.ok(labels.includes(expectedLabel), `${expectedLabel} must be visible in the admin queue`);
  }
});

test("web run-topic action remains plan-only and does not publish from route code", async () => {
  const result = await runSelectedTopicPlanOnly("node-red-local-business-automation-server");
  const serviceSource = fs.readFileSync(
    path.join(process.cwd(), "lib", "admin", "content-automation-actions.ts"),
    "utf8",
  );

  assert.equal(result.status, "WEB_PUBLICATION_DISABLED");
  assert.match(result.message ?? "", /never publishes/);
  assert.doesNotMatch(serviceSource, /runPublication/);
  assert.doesNotMatch(serviceSource, /dryRun:\s*false/);
});

test("admin content automation route handlers require auth and no-store responses", () => {
  const routeRoot = path.join(process.cwd(), "app", "api", "admin", "content-automation");
  const routeFiles = fs
    .readdirSync(routeRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(routeRoot, entry.name, "route.ts"));
  const authSource = fs.readFileSync(
    path.join(process.cwd(), "lib", "admin", "content-automation-auth.ts"),
    "utf8",
  );

  assert.ok(routeFiles.length >= 6);
  assert.match(authSource, /Cache-Control", "no-store"/);
  assert.match(authSource, /X-Robots-Tag", "noindex, nofollow"/);

  for (const routeFile of routeFiles) {
    const source = fs.readFileSync(routeFile, "utf8");
    assert.match(source, /requireAdminRequest/, `${routeFile} must call the admin auth guard`);
    assert.match(source, /runtime\s*=\s*"nodejs"/, `${routeFile} must stay on the Node runtime`);
  }
});

test("admin content automation routes exclude repository-only files from output tracing", () => {
  const nextConfigSource = fs.readFileSync(path.join(process.cwd(), "next.config.ts"), "utf8");

  assert.match(nextConfigSource, /outputFileTracingExcludes/);
  assert.match(nextConfigSource, /\/api\/admin\/content-automation\/\*/);
  assert.match(nextConfigSource, /\.\/\.git\/\*\*\/\*/);
  assert.match(nextConfigSource, /\.\/assets\/\*\*\/\*/);
  assert.match(nextConfigSource, /\.\/public\/\*\*\/\*/);
});
