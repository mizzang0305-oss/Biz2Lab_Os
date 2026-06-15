import fs from "node:fs";

import { assertLocalhostEndpoint } from "@/lib/image-generation/image-output";
import type { ImageGenerationRequest, LocalImageProvider } from "@/lib/image-generation/types";

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

    assertLocalhostEndpoint(endpoint);

    if (!request.providerConfig.workflowPath || !fs.existsSync(request.providerConfig.workflowPath)) {
      return {
        provider: "comfyui-local",
        generated: [],
        skipped: [],
        failed: request.briefs.map((brief) => brief.id),
        message:
          "ComfyUI provider is scaffolded only. Provide a local workflow config before generation. No request was sent.",
      };
    }

    return {
      provider: "comfyui-local",
      generated: [],
      skipped: request.briefs.map((brief) => brief.id),
      failed: [],
      message: request.dryRun
        ? "ComfyUI dry-run only. Local endpoint and workflow config are present."
        : "ComfyUI generation is intentionally disabled until a reviewed workflow runner is added.",
    };
  },
};
