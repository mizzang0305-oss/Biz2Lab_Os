import { assertLocalhostEndpoint } from "@/lib/image-generation/image-output";
import {
  absoluteRepoPath,
  decodeBase64Image,
  dimensionsForImageBrief,
  negativePromptForImageBrief,
  promptForImageBrief,
} from "@/lib/image-generation/image-output";
import type { ImageGenerationRequest, LocalImageProvider } from "@/lib/image-generation/types";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

type StableDiffusionTxt2ImgResponse = {
  images?: string[];
};

async function healthCheck(endpoint: string) {
  const response = await fetch(`${endpoint}/sdapi/v1/options`, {
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Stable Diffusion WebUI health check failed with HTTP ${response.status}`);
  }
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

export const sdWebUiProvider: LocalImageProvider = {
  id: "sd-webui-local",
  label: "Stable Diffusion WebUI local adapter",
  isRealImageProvider: true,
  async generate(request: ImageGenerationRequest) {
    const endpoint = request.providerConfig.endpoint;
    if (!endpoint) {
      return {
        provider: "sd-webui-local",
        generated: [],
        skipped: [],
        failed: request.briefs.map((brief) => brief.id),
        message: "LOCAL_IMAGE_ENDPOINT is required for Stable Diffusion WebUI and must point to localhost.",
      };
    }

    assertLocalhostEndpoint(endpoint);

    if (request.dryRun) {
      return {
        provider: "sd-webui-local",
        generated: [],
        skipped: request.briefs.map((brief) => brief.id),
        failed: [],
        message: "Stable Diffusion WebUI dry-run only. No image request was sent.",
      };
    }

    const normalizedEndpoint = assertLocalhostEndpoint(endpoint);
    const generated: string[] = [];
    const failed: string[] = [];

    try {
      await healthCheck(normalizedEndpoint);
    } catch (error) {
      return {
        provider: "sd-webui-local",
        generated,
        skipped: [],
        failed: request.briefs.map((brief) => brief.id),
        message: error instanceof Error ? error.message : String(error),
      };
    }

    for (const brief of request.briefs) {
      try {
        const prompt = promptForImageBrief(brief);
        const negativePrompt = negativePromptForImageBrief(brief);
        const { width, height } = dimensionsForImageBrief(brief);

        if (!prompt) {
          throw new Error(`${brief.id}: provider prompt is required`);
        }

        const response = await fetch(`${normalizedEndpoint}/sdapi/v1/txt2img`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            prompt,
            negative_prompt: negativePrompt,
            width,
            height,
            steps: 28,
            cfg_scale: 7,
            sampler_name: "DPM++ 2M Karras",
            batch_size: 1,
            n_iter: 1,
            restore_faces: false,
          }),
        });

        if (!response.ok) {
          throw new Error(`${brief.id}: txt2img failed with HTTP ${response.status}`);
        }

        const payload = (await response.json()) as StableDiffusionTxt2ImgResponse;
        const image = payload.images?.[0];
        if (!image) {
          throw new Error(`${brief.id}: txt2img returned no images`);
        }

        await writeRawImage(brief.targetPath, decodeBase64Image(image));
        generated.push(brief.id);
      } catch (error) {
        failed.push(error instanceof Error ? error.message : String(error));
      }
    }

    return {
      provider: "sd-webui-local",
      generated,
      skipped: [],
      failed,
      message:
        failed.length > 0
          ? "Stable Diffusion WebUI generation completed with failures."
          : "Stable Diffusion WebUI generated raw image files.",
    };
  },
};
