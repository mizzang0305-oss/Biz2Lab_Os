import fs from "node:fs";
import path from "node:path";

import { validateBriefOutputPaths } from "@/lib/image-generation/image-output";
import type { ImageBrief, ImageBriefFile } from "@/lib/image-generation/types";

const defaultBriefPath = path.join(process.cwd(), "image-briefs", "biz2lab-article-image-briefs.json");
const allowedUsages = new Set(["hero", "inline", "hub-summary"]);
const allowedCategories = new Set(["automation", "sales-ops", "small-business", "contracts-payments"]);

export function loadImageBriefs(briefPath = defaultBriefPath) {
  const parsed = JSON.parse(fs.readFileSync(briefPath, "utf8")) as ImageBriefFile | ImageBrief[] | ImageBrief;
  const briefs = Array.isArray(parsed)
    ? parsed
    : "briefs" in parsed && Array.isArray(parsed.briefs)
      ? parsed.briefs
      : "id" in parsed
        ? [parsed]
        : null;

  if (!briefs) {
    throw new Error("Image brief file must contain a briefs array, a brief array, or one brief object");
  }

  const errors = validateImageBriefs(briefs);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return briefs;
}

export function validateImageBriefs(briefs: ImageBrief[]) {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const brief of briefs) {
    const label = brief.id || "image brief";

    if (!brief.id || !brief.postSlug || !brief.category || !brief.usage) {
      errors.push(`${label}: id, postSlug, category, and usage are required`);
    }

    if (brief.id && ids.has(brief.id)) {
      errors.push(`${label}: duplicate brief id`);
    }
    ids.add(brief.id);

    if (!allowedCategories.has(brief.category)) {
      errors.push(`${label}: unsupported category ${brief.category}`);
    }

    if (!allowedUsages.has(brief.usage)) {
      errors.push(`${label}: unsupported usage ${brief.usage}`);
    }

    if (!brief.targetPath || !brief.optimizedPath) {
      errors.push(`${label}: targetPath and optimizedPath are required`);
    } else {
      errors.push(...validateBriefOutputPaths(brief));
    }
  }

  return errors;
}
