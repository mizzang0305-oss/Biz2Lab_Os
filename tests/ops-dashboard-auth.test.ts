import assert from "node:assert/strict";
import test, { afterEach } from "node:test";

import {
  OPS_DASHBOARD_KEY_ENV,
  createOpsDashboardSessionValue,
  isOpsDashboardKeyConfigured,
  isValidOpsDashboardSession,
  opsDashboardCookieOptions,
  opsDashboardCookiePath,
  opsDashboardCookieName,
  verifyOpsDashboardKey,
} from "@/lib/ops-dashboard-auth";

const originalKey = process.env[OPS_DASHBOARD_KEY_ENV];

afterEach(() => {
  if (originalKey === undefined) {
    delete process.env[OPS_DASHBOARD_KEY_ENV];
  } else {
    process.env[OPS_DASHBOARD_KEY_ENV] = originalKey;
  }
});

test("ops dashboard auth fails closed when the secret env var is missing", () => {
  delete process.env[OPS_DASHBOARD_KEY_ENV];

  assert.equal(isOpsDashboardKeyConfigured(), false);
  assert.equal(verifyOpsDashboardKey("anything"), false);
  assert.equal(createOpsDashboardSessionValue(), "");
  assert.equal(isValidOpsDashboardSession(undefined), false);
});

test("ops dashboard auth accepts only the configured secret and derived session cookie", () => {
  process.env[OPS_DASHBOARD_KEY_ENV] = "correct-local-test-key";
  const sessionValue = createOpsDashboardSessionValue();

  assert.equal(isOpsDashboardKeyConfigured(), true);
  assert.equal(verifyOpsDashboardKey("correct-local-test-key"), true);
  assert.equal(verifyOpsDashboardKey("wrong-local-test-key"), false);
  assert.equal(isValidOpsDashboardSession(sessionValue), true);
  assert.equal(isValidOpsDashboardSession("wrong-session-value"), false);
  assert.equal(sessionValue.includes("correct-local-test-key"), false);
});

test("ops dashboard cookie is httpOnly and scoped to ops routes", () => {
  const options = opsDashboardCookieOptions();

  assert.equal(opsDashboardCookieName, "biz2lab_ops_dashboard");
  assert.equal(options.httpOnly, true);
  assert.equal(options.sameSite, "lax");
  assert.equal(options.path, opsDashboardCookiePath);
  assert.equal(options.path, "/ko/ops");
  assert.equal(typeof options.secure, "boolean");
  assert.equal(options.maxAge > 0, true);
});
