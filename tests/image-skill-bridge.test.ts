import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { loadImageBriefs, validateImageBriefs } from "@/lib/image-generation/image-brief-loader";
import { assertLocalhostEndpoint, summarizeBriefs } from "@/lib/image-generation/image-output";
import { comfyUiProvider } from "@/lib/image-generation/comfyui-provider";
import { manualDropProvider } from "@/lib/image-generation/manual-drop-provider";
import { normalizeProviderId, readProviderConfigFromEnv } from "@/lib/image-generation/providers";
import { sdWebUiProvider } from "@/lib/image-generation/sd-webui-provider";
import type { ImageBrief } from "@/lib/image-generation/types";

const validBrief: ImageBrief = {
  id: "sample-post-hero",
  postSlug: "sample-post",
  category: "automation",
  usage: "hero",
  targetPath: "assets/images/raw/sample-post-hero.jpg",
  optimizedPath: "public/images/posts/sample-post-hero.webp",
  altKo: "샘플 자동화 대표 이미지",
  captionKo: "샘플 자동화 대표 이미지입니다.",
  providerPromptKo: "샘플 자동화 흐름을 보여주는 안전한 대표 이미지",
  negativePromptKo: "로고, 사람 얼굴, 개인정보, 워터마크 제외",
  textPolicy: "이미지 안 텍스트는 최소화한다.",
};

test("image skill bridge loads the Biz2Lab brief set", () => {
  const briefs = loadImageBriefs();
  const summary = summarizeBriefs(briefs);

  assert.equal(briefs.length, 38);
  assert.equal(summary.byUsage.hero, 29);
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

test("real local providers use documented localhost endpoints by default", () => {
  assert.equal(readProviderConfigFromEnv({ LOCAL_IMAGE_PROVIDER: "comfyui" }).endpoint, "http://127.0.0.1:8188");
  assert.equal(readProviderConfigFromEnv({ LOCAL_IMAGE_PROVIDER: "sd-webui" }).endpoint, "http://127.0.0.1:7860");
});

test("local image endpoints reject remote hosts", () => {
  assert.equal(assertLocalhostEndpoint("http://127.0.0.1:8188"), "http://127.0.0.1:8188");
  assert.equal(assertLocalhostEndpoint("http://localhost:7860"), "http://localhost:7860");
  assert.throws(() => assertLocalhostEndpoint("https://127.0.0.1:8188"), /http/);
  assert.throws(() => assertLocalhostEndpoint("http://example.com:8188"), /127\.0\.0\.1|localhost/);
});

test("image skill can load a slug-specific generated brief file", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "biz2lab-brief-"));
  const briefPath = path.join(tempDir, "sample-post-hero.json");
  fs.writeFileSync(briefPath, JSON.stringify(validBrief), "utf8");

  const briefs = loadImageBriefs(briefPath);

  assert.equal(briefs.length, 1);
  assert.equal(briefs[0].id, "sample-post-hero");
});

test("image brief validation requires slugged raw and public paths", () => {
  assert.deepEqual(validateImageBriefs([validBrief]), []);
  assert.match(
    validateImageBriefs([
      {
        ...validBrief,
        targetPath: "assets/images/raw/other-hero.jpg",
      },
    ]).join("\n"),
    /targetPath filename must include the post slug/,
  );
  assert.match(
    validateImageBriefs([
      {
        ...validBrief,
        optimizedPath: "public/other/sample-post-hero.webp",
      },
    ]).join("\n"),
    /optimizedPath must stay under public\/images\/posts/,
  );
});

test("manual-drop reports missing raw files without creating placeholders", async () => {
  const rawPath = path.join(process.cwd(), validBrief.targetPath);
  if (fs.existsSync(rawPath)) {
    fs.unlinkSync(rawPath);
  }

  const result = await manualDropProvider.generate({
    briefs: [validBrief],
    providerConfig: { provider: "manual-drop" },
    dryRun: false,
  });

  assert.equal(result.generated.length, 0);
  assert.equal(result.skipped.length, 0);
  assert.match(result.message, /raw files are still missing/);
  assert.equal(fs.existsSync(rawPath), false);
});

test("ComfyUI unavailable or unconfigured is not treated as generation success", async () => {
  const result = await comfyUiProvider.generate({
    briefs: [validBrief],
    providerConfig: { provider: "comfyui-local" },
    dryRun: false,
  });

  assert.deepEqual(result.generated, []);
  assert.deepEqual(result.failed, [validBrief.id]);
  assert.match(result.message, /LOCAL_IMAGE_ENDPOINT/);
});

test("ComfyUI requires a workflow template before generation", async () => {
  const result = await comfyUiProvider.generate({
    briefs: [validBrief],
    providerConfig: {
      provider: "comfyui-local",
      endpoint: "http://127.0.0.1:8188",
      workflowPath: "missing-workflow.json",
    },
    dryRun: false,
  });

  assert.deepEqual(result.generated, []);
  assert.deepEqual(result.failed, [validBrief.id]);
  assert.match(result.message, /COMFYUI_WORKFLOW_MISSING/);
});

test("Stable Diffusion WebUI unavailable or unconfigured is not treated as generation success", async () => {
  const result = await sdWebUiProvider.generate({
    briefs: [validBrief],
    providerConfig: { provider: "sd-webui-local" },
    dryRun: false,
  });

  assert.deepEqual(result.generated, []);
  assert.deepEqual(result.failed, [validBrief.id]);
  assert.match(result.message, /LOCAL_IMAGE_ENDPOINT/);
});
