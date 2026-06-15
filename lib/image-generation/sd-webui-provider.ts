import { assertLocalhostEndpoint } from "@/lib/image-generation/image-output";
import type { ImageGenerationRequest, LocalImageProvider } from "@/lib/image-generation/types";

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

    return {
      provider: "sd-webui-local",
      generated: [],
      skipped: request.briefs.map((brief) => brief.id),
      failed: [],
      message: request.dryRun
        ? "Stable Diffusion WebUI dry-run only. No image request was sent."
        : "Stable Diffusion WebUI generation is intentionally disabled until payload settings are reviewed.",
    };
  },
};
