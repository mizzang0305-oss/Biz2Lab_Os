import assert from "node:assert/strict";
import test from "node:test";

import { loadImageBriefs } from "@/lib/image-generation/image-brief-loader";
import { assertLocalhostEndpoint, summarizeBriefs } from "@/lib/image-generation/image-output";
import { normalizeProviderId } from "@/lib/image-generation/providers";

test("image skill bridge loads the Biz2Lab brief set", () => {
  const briefs = loadImageBriefs();
  const summary = summarizeBriefs(briefs);

  assert.equal(briefs.length, 34);
  assert.equal(summary.byUsage.hero, 25);
  assert.equal(summary.byUsage.inline, 5);
  assert.equal(summary.byUsage["hub-summary"], 4);
});

test("image skill provider ids are explicit and provider-agnostic", () => {
  assert.equal(normalizeProviderId("manual-drop"), "manual-drop");
  assert.equal(normalizeProviderId("deterministic-fallback"), "deterministic-fallback");
  assert.equal(normalizeProviderId("comfyui"), "comfyui-local");
  assert.equal(normalizeProviderId("sd-webui"), "sd-webui-local");
  assert.equal(normalizeProviderId("unknown-provider"), null);
});

test("local image endpoints reject remote hosts", () => {
  assert.equal(assertLocalhostEndpoint("http://127.0.0.1:8188"), "http://127.0.0.1:8188");
  assert.equal(assertLocalhostEndpoint("http://localhost:7860"), "http://localhost:7860");
  assert.throws(() => assertLocalhostEndpoint("https://127.0.0.1:8188"), /http/);
  assert.throws(() => assertLocalhostEndpoint("http://example.com:8188"), /127\.0\.0\.1|localhost/);
});
