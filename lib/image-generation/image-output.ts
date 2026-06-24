import fs from "node:fs";
import path from "node:path";

import type { ImageBrief } from "@/lib/image-generation/types";

const forbiddenImageTerms = [
  "amazon",
  "products",
  "product",
  "shop",
  "affiliate",
  "commerce",
  "reviews",
  "lotto",
];

const rawPathPattern = /^assets\/images\/raw\/[a-z0-9][a-z0-9-]*\.(png|jpg|jpeg|webp|svg)$/;
const optimizedPathPattern = /^public\/images\/posts\/[a-z0-9][a-z0-9-]*\.webp$/;

export function normalizeRepoPath(filePath: string) {
  return filePath.replaceAll("\\", "/").replace(/^\/+/, "");
}

export function absoluteRepoPath(repoPath: string) {
  return path.join(process.cwd(), ...normalizeRepoPath(repoPath).split("/"));
}

export function rawFileExists(brief: ImageBrief) {
  return fs.existsSync(absoluteRepoPath(brief.targetPath));
}

export function publicOutputExists(brief: ImageBrief) {
  return fs.existsSync(absoluteRepoPath(brief.optimizedPath));
}

function stripStructuralPathToken(repoPath: string, structuralToken?: string) {
  if (!structuralToken) {
    return repoPath.toLowerCase();
  }

  return repoPath.toLowerCase().replaceAll(structuralToken.toLowerCase(), "");
}

export function validateLocalImagePath(label: string, repoPath: string, structuralToken?: string) {
  const normalized = normalizeRepoPath(repoPath);
  const errors: string[] = [];

  if (/^https?:\/\//i.test(normalized)) {
    errors.push(`${label}: external image path is not allowed`);
  }

  if (normalized.includes("..")) {
    errors.push(`${label}: path traversal is not allowed`);
  }

  const commerceTermCheckPath = stripStructuralPathToken(normalized, structuralToken);
  for (const term of forbiddenImageTerms) {
    if (commerceTermCheckPath.includes(term)) {
      errors.push(`${label}: forbidden image path term ${term}`);
    }
  }

  if (normalized.startsWith("assets/images/raw/") && !rawPathPattern.test(normalized)) {
    errors.push(`${label}: raw path must be assets/images/raw/<seo-name>.(png|jpg|jpeg|webp|svg)`);
  }

  if (normalized.startsWith("public/images/posts/") && !optimizedPathPattern.test(normalized)) {
    errors.push(`${label}: optimized path must be public/images/posts/<seo-name>.webp`);
  }

  return errors;
}

export function validateBriefOutputPaths(brief: ImageBrief) {
  const errors: string[] = [];
  const rawPath = normalizeRepoPath(brief.targetPath);
  const optimizedPath = normalizeRepoPath(brief.optimizedPath);

  errors.push(...validateLocalImagePath(`${brief.id} targetPath`, rawPath, brief.postSlug));
  errors.push(...validateLocalImagePath(`${brief.id} optimizedPath`, optimizedPath, brief.postSlug));

  if (!rawPath.startsWith("assets/images/raw/")) {
    errors.push(`${brief.id}: targetPath must stay under assets/images/raw`);
  }

  if (!optimizedPath.startsWith("public/images/posts/")) {
    errors.push(`${brief.id}: optimizedPath must stay under public/images/posts`);
  }

  if (!rawPath.includes(`${brief.postSlug}-`)) {
    errors.push(`${brief.id}: targetPath filename must include the post slug`);
  }

  if (!optimizedPath.includes(`${brief.postSlug}-`)) {
    errors.push(`${brief.id}: optimizedPath filename must include the post slug`);
  }

  return errors;
}

export function assertLocalhostEndpoint(endpoint: string) {
  let parsed: URL;
  try {
    parsed = new URL(endpoint);
  } catch {
    throw new Error(`Invalid LOCAL_IMAGE_ENDPOINT: ${endpoint}`);
  }

  if (parsed.protocol !== "http:") {
    throw new Error("LOCAL_IMAGE_ENDPOINT must use http:// for local providers");
  }

  if (parsed.hostname !== "127.0.0.1" && parsed.hostname !== "localhost") {
    throw new Error("LOCAL_IMAGE_ENDPOINT must be 127.0.0.1 or localhost");
  }

  return parsed.toString().replace(/\/$/, "");
}

export function summarizeBriefs(briefs: ImageBrief[]) {
  return briefs.reduce(
    (summary, brief) => {
      summary.byUsage[brief.usage] = (summary.byUsage[brief.usage] ?? 0) + 1;
      summary.byCategory[brief.category] = (summary.byCategory[brief.category] ?? 0) + 1;
      if (rawFileExists(brief)) {
        summary.rawExisting += 1;
      } else {
        summary.rawMissing += 1;
      }
      return summary;
    },
    {
      totalBriefs: briefs.length,
      byUsage: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
      rawExisting: 0,
      rawMissing: 0,
    },
  );
}

export function dimensionsForImageBrief(brief: ImageBrief) {
  if (brief.usage === "inline") {
    return { width: 1200, height: 800 };
  }

  return { width: 1200, height: 630 };
}

export function promptForImageBrief(brief: ImageBrief) {
  return [
    brief.providerPromptKo,
    brief.promptKo,
    brief.composition,
    brief.categoryStyle,
    brief.visualReferenceStyle,
  ]
    .filter((value): value is string => Boolean(value?.trim()))
    .join("\n\n")
    .trim();
}

export function negativePromptForImageBrief(brief: ImageBrief) {
  return brief.negativePromptKo?.trim() ?? "";
}

export function decodeBase64Image(value: string) {
  const normalized = value.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, "");
  return Buffer.from(normalized, "base64");
}
