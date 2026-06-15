import { rawFileExists } from "@/lib/image-generation/image-output";
import type { ImageGenerationRequest, LocalImageProvider } from "@/lib/image-generation/types";

export const deterministicFallbackProvider: LocalImageProvider = {
  id: "deterministic-fallback",
  label: "Deterministic SVG/Sharp fallback",
  isRealImageProvider: false,
  async generate(request: ImageGenerationRequest) {
    const existing = request.briefs.filter(rawFileExists).map((brief) => brief.id);
    const missing = request.briefs.filter((brief) => !rawFileExists(brief)).map((brief) => brief.id);

    return {
      provider: "deterministic-fallback",
      generated: [],
      skipped: existing,
      failed: [],
      message:
        missing.length > 0
          ? "Deterministic fallback is not real image generation. Run npm run generate:diagrams only when fallback visuals are explicitly acceptable."
          : "Deterministic fallback raw files already exist. They remain fallback visuals, not final premium image-skill output.",
    };
  },
};
