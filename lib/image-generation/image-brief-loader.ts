import fs from "node:fs";
import path from "node:path";

import { validateLocalImagePath } from "@/lib/image-generation/image-output";
import type { ImageBrief, ImageBriefFile } from "@/lib/image-generation/types";

const defaultBriefPath = path.join(process.cwd(), "image-briefs", "biz2lab-article-image-briefs.json");
const allowedUsages = new Set(["hero", "inline", "hub-summary"]);
const allowedCategories = new Set(["automation", "sales-ops", "small-business", "contracts-payments"]);

export function loadImageBriefs(briefPath = defaultBriefPath) {
  const parsed = JSON.parse(fs.readFileSync(briefPath, "utf8")) as ImageBriefFile;
  if (!Array.isArray(parsed.briefs)) {
    throw new Error("Image brief file must contain a briefs array");
  }

  const errors = validateImageBriefs(parsed.briefs);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return parsed.briefs;
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

    if (!brief.targetPath?.startsWith("assets/images/raw/")) {
      errors.push(`${label}: targetPath must be under assets/images/raw`);
    } else {
      errors.push(...validateLocalImagePath(`${label} targetPath`, brief.targetPath));
    }

    if (!brief.optimizedPath?.startsWith("public/images/posts/")) {
      errors.push(`${label}: optimizedPath must be under public/images/posts`);
    } else {
      errors.push(...validateLocalImagePath(`${label} optimizedPath`, brief.optimizedPath));
    }
  }

  return errors;
}
