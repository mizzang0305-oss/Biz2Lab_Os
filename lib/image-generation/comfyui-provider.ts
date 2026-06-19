import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import {
  absoluteRepoPath,
  dimensionsForImageBrief,
  negativePromptForImageBrief,
  promptForImageBrief,
  assertLocalhostEndpoint,
} from "@/lib/image-generation/image-output";
import type { ImageGenerationRequest, LocalImageProvider } from "@/lib/image-generation/types";

type ComfyHistoryOutput = {
  images?: Array<{
    filename?: string;
    subfolder?: string;
    type?: string;
  }>;
};
type ComfyImageOutput = NonNullable<ComfyHistoryOutput["images"]>[number];

type ComfyPromptResponse = {
  prompt_id?: string;
};

function renderWorkflowTemplate(template: string, replacements: Record<string, string | number>) {
  return Object.entries(replacements).reduce(
    (result, [key, value]) => result.replaceAll(`{{${key}}}`, String(value)),
    template,
  );
}

function findFirstImageOutput(history: unknown): ComfyImageOutput | null {
  if (!history || typeof history !== "object") {
    return null;
  }

  const root = history as Record<string, unknown>;
  for (const promptValue of Object.values(root)) {
    if (!promptValue || typeof promptValue !== "object") {
      continue;
    }

    const outputs = (promptValue as { outputs?: Record<string, ComfyHistoryOutput> }).outputs;
    if (!outputs) {
      continue;
    }

    for (const output of Object.values(outputs)) {
      const image = output.images?.[0];
      if (image?.filename) {
        return image;
      }
    }
  }

  return null;
}

async function postPrompt(endpoint: string, workflow: unknown, clientId: string) {
  const response = await fetch(`${endpoint}/prompt`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt: workflow, client_id: clientId }),
  });

  if (!response.ok) {
    throw new Error(`ComfyUI prompt submit failed with HTTP ${response.status}`);
  }

  const payload = (await response.json()) as ComfyPromptResponse;
  if (!payload.prompt_id) {
    throw new Error("ComfyUI prompt submit did not return prompt_id");
  }

  return payload.prompt_id;
}

async function pollHistory(endpoint: string, promptId: string) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const response = await fetch(`${endpoint}/history/${encodeURIComponent(promptId)}`, {
      signal: AbortSignal.timeout(5000),
    });

    if (response.ok) {
      const history = await response.json();
      const image = findFirstImageOutput(history);
      if (image) {
        return image;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`ComfyUI history polling timed out for ${promptId}`);
}

async function fetchComfyImage(endpoint: string, image: ComfyImageOutput) {
  const params = new URLSearchParams({
    filename: image.filename ?? "",
    subfolder: image.subfolder ?? "",
    type: image.type ?? "output",
  });
  const response = await fetch(`${endpoint}/view?${params.toString()}`, {
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`ComfyUI image fetch failed with HTTP ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function writeRawImage(targetPath: string, image: Buffer) {
  const outputPath = absoluteRepoPath(targetPath);
  const extension = path.extname(outputPath).toLowerCase();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const pipeline = sharp(image);
  if (extension === ".jpg" || extension === ".jpeg") {
    await pipeline.jpeg({ quality: 95 }).toFile(outputPath);
    return;
  }

  if (extension === ".webp") {
    await pipeline.webp({ quality: 95 }).toFile(outputPath);
    return;
  }

  await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
}

export const comfyUiProvider: LocalImageProvider = {
  id: "comfyui-local",
  label: "ComfyUI local adapter",
  isRealImageProvider: true,
  async generate(request: ImageGenerationRequest) {
    const endpoint = request.providerConfig.endpoint;
    if (!endpoint) {
      return {
        provider: "comfyui-local",
        generated: [],
        skipped: [],
        failed: request.briefs.map((brief) => brief.id),
        message: "LOCAL_IMAGE_ENDPOINT is required for ComfyUI and must point to localhost.",
      };
    }

    const normalizedEndpoint = assertLocalhostEndpoint(endpoint);

    if (!request.providerConfig.workflowPath || !fs.existsSync(request.providerConfig.workflowPath)) {
      return {
        provider: "comfyui-local",
        generated: [],
        skipped: [],
        failed: request.briefs.map((brief) => brief.id),
        message: "COMFYUI_WORKFLOW_MISSING: provide LOCAL_IMAGE_WORKFLOW_PATH before generation.",
      };
    }

    if (request.dryRun) {
      return {
        provider: "comfyui-local",
        generated: [],
        skipped: request.briefs.map((brief) => brief.id),
        failed: [],
        message: "ComfyUI dry-run only. Local endpoint and workflow config are present.",
      };
    }

    const workflowTemplate = fs.readFileSync(request.providerConfig.workflowPath, "utf8");
    const generated: string[] = [];
    const failed: string[] = [];
    const clientId = `biz2lab-${Date.now()}`;

    for (const brief of request.briefs) {
      try {
        const prompt = promptForImageBrief(brief);
        const negativePrompt = negativePromptForImageBrief(brief);
        const { width, height } = dimensionsForImageBrief(brief);
        if (!prompt) {
          throw new Error(`${brief.id}: provider prompt is required`);
        }

        const workflowJson = renderWorkflowTemplate(workflowTemplate, {
          PROMPT: JSON.stringify(prompt).slice(1, -1),
          NEGATIVE_PROMPT: JSON.stringify(negativePrompt).slice(1, -1),
          WIDTH: width,
          HEIGHT: height,
          SEED: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
          CLIENT_ID: clientId,
        });
        const workflow = JSON.parse(workflowJson) as unknown;
        const promptId = await postPrompt(normalizedEndpoint, workflow, clientId);
        const imageOutput = await pollHistory(normalizedEndpoint, promptId);
        const imageBuffer = await fetchComfyImage(normalizedEndpoint, imageOutput);
        await writeRawImage(brief.targetPath, imageBuffer);
        generated.push(brief.id);
      } catch (error) {
        failed.push(error instanceof Error ? `${brief.id}: ${error.message}` : `${brief.id}: ${String(error)}`);
      }
    }

    return {
      provider: "comfyui-local",
      generated,
      skipped: [],
      failed,
      message:
        failed.length > 0
          ? "ComfyUI generation completed with failures."
          : "ComfyUI generated raw image files.",
    };
  },
};
