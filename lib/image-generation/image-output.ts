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

export function validateLocalImagePath(label: string, repoPath: string) {
  const normalized = normalizeRepoPath(repoPath);
  const errors: string[] = [];

  if (/^https?:\/\//i.test(normalized)) {
    errors.push(`${label}: external image path is not allowed`);
  }

  if (normalized.includes("..")) {
    errors.push(`${label}: path traversal is not allowed`);
  }

  for (const term of forbiddenImageTerms) {
    if (normalized.toLowerCase().includes(term)) {
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
