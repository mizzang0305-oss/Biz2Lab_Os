import { rawFileExists } from "@/lib/image-generation/image-output";
import type { ImageGenerationRequest, LocalImageProvider } from "@/lib/image-generation/types";

export const manualDropProvider: LocalImageProvider = {
  id: "manual-drop",
  label: "Manual raw-image drop workflow",
  isRealImageProvider: true,
  async generate(request: ImageGenerationRequest) {
    const existing: string[] = [];
    const missing: string[] = [];

    for (const brief of request.briefs) {
      if (rawFileExists(brief)) {
        existing.push(brief.id);
      } else {
        missing.push(brief.id);
      }
    }

    return {
      provider: "manual-drop",
      generated: [],
      skipped: existing,
      failed: [],
      message:
        missing.length > 0
          ? `Manual drop mode: ${missing.length} raw files are still missing. Create them locally and save to assets/images/raw.`
          : "Manual drop mode: all expected raw files are present. Run npm run optimize-images after any manual replacement.",
    };
  },
};
