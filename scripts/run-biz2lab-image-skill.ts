import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import matter from "gray-matter";

import {
  buildImagePromptPackage,
  imagePromptPackageToBrief,
  normalizeBiz2LabImageOutputMode,
  type Biz2LabImageOutputMode,
  type Biz2LabImagePromptPackage,
  type Biz2LabImageUsage,
} from "@/lib/image-generation/prompt-builder";
import type { ImageBriefCategory } from "@/lib/image-generation/types";

type ParsedImageRequest = {
  slug: string;
  title: string;
  category: ImageBriefCategory;
  usage: Biz2LabImageUsage;
  description: string;
  businessContext?: string;
  mood?: string;
  layoutIdea?: string;
  color?: string;
  mustInclude: string[];
  mustAvoid: string[];
  outputMode: Biz2LabImageOutputMode;
};

export type RunBiz2LabImageSkillOptions = {
  rootDir?: string;
  requestPath: string;
  mode?: Biz2LabImageOutputMode;
  briefDir?: string;
  rawDir?: string;
  promptPath?: string;
  force?: boolean;
  apply?: boolean;
};

export type RunBiz2LabImageSkillResult = {
  promptPath: string;
  briefPath: string;
  rawOutputPath: string | null;
  promptPackage: Biz2LabImagePromptPackage;
  articleMutated: boolean;
};

const allowedCategories = new Set<ImageBriefCategory>([
  "automation",
  "sales-ops",
  "small-business",
  "contracts-payments",
]);
const allowedUsages = new Set<Biz2LabImageUsage>(["hero", "inline", "hub", "og"]);

function normalizeRepoPath(filePath: string) {
  return filePath.replaceAll("\\", "/");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitList(value?: string) {
  return value
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
}

function readSection(markdown: string, heading: string) {
  const pattern = new RegExp(`^## ${escapeRegExp(heading)}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`, "im");
  return pattern.exec(markdown)?.[1].trim() ?? "";
}

function readBullet(markdown: string, key: string) {
  const pattern = new RegExp(`^-\\s+${escapeRegExp(key)}:\\s*(.+)$`, "im");
  return pattern.exec(markdown)?.[1].trim();
}

function readOutputMode(markdown: string) {
  const section = readSection(markdown, "Output Mode");
  const match = /(?:^|\n)-\s*(prompt-only|manual-drop|local-diagram-fallback|local-diagram)\s*$/im.exec(section);
  return normalizeBiz2LabImageOutputMode(match?.[1]);
}

function normalizeUsage(value: string): Biz2LabImageUsage {
  const usage = value === "hub-summary" ? "hub" : value;
  if (!allowedUsages.has(usage as Biz2LabImageUsage)) {
    throw new Error(`Unsupported request usage: ${value}`);
  }
  return usage as Biz2LabImageUsage;
}

function normalizeMode(value: string): Biz2LabImageOutputMode {
  return normalizeBiz2LabImageOutputMode(value);
}

export function parseImageRequestMarkdown(markdown: string): ParsedImageRequest {
  const slug = readBullet(markdown, "slug");
  const title = readBullet(markdown, "title");
  const category = readBullet(markdown, "category");
  const usage = readBullet(markdown, "usage");
  const description = readSection(markdown, "User Description");

  if (!slug || !title || !category || !usage) {
    throw new Error("Image request must include slug, title, category, and usage");
  }
  if (!allowedCategories.has(category as ImageBriefCategory)) {
    throw new Error(`Unsupported request category: ${category}`);
  }
  if (!description) {
    throw new Error("Image request must include a User Description section");
  }

  const visualDirection = readSection(markdown, "Visual Direction");
  return {
    slug,
    title,
    category: category as ImageBriefCategory,
    usage: normalizeUsage(usage),
    description,
    businessContext: readSection(markdown, "Business Context"),
    mood: readBullet(visualDirection, "mood"),
    layoutIdea: readBullet(visualDirection, "layout idea"),
    color: readBullet(visualDirection, "color direction") ?? readBullet(visualDirection, "color"),
    mustInclude: splitList(readBullet(visualDirection, "must include")),
    mustAvoid: splitList(readBullet(visualDirection, "must avoid")),
    outputMode: readOutputMode(markdown),
  };
}

function withSvgRawPath(promptPackage: Biz2LabImagePromptPackage): Biz2LabImagePromptPackage {
  const svgFilename = promptPackage.filename.replace(/\.[a-z0-9]+$/i, ".svg");
  const rawPath = `assets/images/raw/${svgFilename}`;
  return {
    ...promptPackage,
    filename: svgFilename,
    rawPath,
    manifestEntry: {
      ...promptPackage.manifestEntry,
      rawPath,
      licenseStatus: "local-generated-diagram",
    },
  };
}

function promptPackageMarkdown(promptPackage: Biz2LabImagePromptPackage) {
  return `# Biz2Lab Image Prompt Package

## Source
- slug: ${promptPackage.postSlug}
- title: ${promptPackage.articleTitle}
- category: ${promptPackage.category}
- usage: ${promptPackage.usage}
- outputMode: ${promptPackage.outputMode}

## Image Goal
Create a safe, premium Biz2Lab ${promptPackage.usage} image package for the article without generating or replacing production images in this step.

## Article Context
- articleTitle: ${promptPackage.articleTitle}
- categoryStyle: ${promptPackage.categoryStyle}
- visualDifferentiationHint: ${promptPackage.visualDifferentiationHint}

## Recommended Image Type
Premium SaaS/editorial business illustration with category-specific workflow structure and minimal in-image text.

## Image Brief
${promptPackage.userDescription}

## Provider Prompt (Korean)
${promptPackage.providerPromptKo}

## Provider Prompt (English)
${promptPackage.providerPromptEn}

## Negative Prompt
${promptPackage.negativePromptKo}

## Filename And Paths
- filename: ${promptPackage.filename}
- rawPath: ${promptPackage.rawPath}
- optimizedPath: ${promptPackage.optimizedPath}

## Alt Text
${promptPackage.altKo}

## Caption
${promptPackage.captionKo}

## Manifest Draft
\`\`\`json
${JSON.stringify(promptPackage.manifestEntry, null, 2)}
\`\`\`

## Article Update Plan
${promptPackage.articleUpdatePlan.map((item) => `- ${item}`).join("\n")}

## Manual Creation Instructions
- Copy the Korean provider prompt into ChatGPT image generation or another explicitly approved manual/local image tool.
- Keep the negative prompt rules active: no logos, people/faces, product/Amazon imagery, private data, fake screenshots, hotlinks, or copyrighted characters.
- Save the raw image to ${promptPackage.rawPath}.
- Optimize to ${promptPackage.optimizedPath} only after manual review.
- Do not mutate article files unless the optimized local WebP exists and --apply is explicitly requested.

## Validation Checklist
${promptPackage.validationChecklist.map((item) => `- ${item}`).join("\n")}

## Validation Commands
\`\`\`bash
npm run optimize-images
npm run validate:images
npm run audit:image-briefs
\`\`\`
`;
}

function localDiagramSvg(promptPackage: Biz2LabImagePromptPackage) {
  const title = escapeXml(promptPackage.articleTitle);
  const description = escapeXml(promptPackage.userDescription);
  const category = escapeXml(promptPackage.categoryStyle);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${escapeXml(promptPackage.altKo)}">
  <rect width="1200" height="675" fill="#f8fafc"/>
  <rect x="64" y="64" width="1072" height="547" rx="28" fill="#ffffff" stroke="#dbe4e8" stroke-width="2"/>
  <rect x="96" y="96" width="310" height="74" rx="18" fill="#0f172a"/>
  <text x="124" y="143" fill="#ffffff" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="28" font-weight="700">${title}</text>
  <path d="M150 308 C 300 210, 430 236, 532 326 S 760 446, 966 300" fill="none" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
  <circle cx="178" cy="292" r="42" fill="#ccfbf1" stroke="#0f766e" stroke-width="4"/>
  <circle cx="522" cy="324" r="54" fill="#dbeafe" stroke="#2563eb" stroke-width="4"/>
  <circle cx="960" cy="304" r="42" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
  <rect x="116" y="420" width="280" height="92" rx="18" fill="#f1f5f9"/>
  <rect x="460" y="442" width="280" height="92" rx="18" fill="#ecfeff"/>
  <rect x="804" y="420" width="280" height="92" rx="18" fill="#f8fafc"/>
  <text x="132" y="466" fill="#0f172a" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="24" font-weight="700">Input</text>
  <text x="476" y="488" fill="#0f172a" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="24" font-weight="700">Decision</text>
  <text x="820" y="466" fill="#0f172a" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="24" font-weight="700">Action</text>
  <text x="96" y="232" fill="#334155" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="24">${category}</text>
  <text x="96" y="572" fill="#475569" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="22">${description}</text>
</svg>
`;
}

function assertWritable(outputPath: string, rootDir: string, force?: boolean) {
  if (fs.existsSync(outputPath) && !force) {
    throw new Error(`${normalizeRepoPath(path.relative(rootDir, outputPath))} already exists. Use --force to overwrite.`);
  }
}

function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkMarkdownFiles(fullPath);
      }
      return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
    })
    .sort();
}

function findArticlePath(rootDir: string, slug: string) {
  const contentRoot = path.join(rootDir, "content", "ko");
  return (
    walkMarkdownFiles(contentRoot).find((filePath) => {
      const parsed = matter(fs.readFileSync(filePath, "utf8"));
      return parsed.data.slug === slug;
    }) ?? null
  );
}

function applyHeroFrontmatter(rootDir: string, promptPackage: Biz2LabImagePromptPackage) {
  if (promptPackage.usage !== "hero") {
    throw new Error("--apply currently supports hero frontmatter updates only");
  }

  const articlePath = findArticlePath(rootDir, promptPackage.postSlug);
  if (!articlePath) {
    throw new Error(`--apply could not find article slug: ${promptPackage.postSlug}`);
  }

  const parsed = matter(fs.readFileSync(articlePath, "utf8"));
  parsed.data.heroImage = promptPackage.manifestEntry.src;
  parsed.data.heroAlt = promptPackage.altKo;
  fs.writeFileSync(articlePath, matter.stringify(parsed.content, parsed.data), "utf8");
  return true;
}

export function runBiz2LabImageSkill(options: RunBiz2LabImageSkillOptions): RunBiz2LabImageSkillResult {
  const rootDir = options.rootDir ?? process.cwd();
  const requestPath = path.isAbsolute(options.requestPath)
    ? options.requestPath
    : path.join(rootDir, options.requestPath);
  const parsed = parseImageRequestMarkdown(fs.readFileSync(requestPath, "utf8"));
  const mode = normalizeMode(options.mode ?? parsed.outputMode);
  const promptPackageBase = buildImagePromptPackage({
    slug: parsed.slug,
    articleTitle: parsed.title,
    category: parsed.category,
    usage: parsed.usage,
    userDescription: parsed.description,
    targetFeeling: parsed.mood,
    mustInclude: parsed.mustInclude,
    mustAvoid: parsed.mustAvoid,
    referenceText: parsed.businessContext,
    outputMode: mode,
  });
  const promptPackage =
    mode === "local-diagram-fallback" ? withSvgRawPath(promptPackageBase) : promptPackageBase;
  const requestBase = path.basename(requestPath, path.extname(requestPath));
  const promptPath = options.promptPath ?? path.join(path.dirname(requestPath), `${requestBase}.prompt.md`);
  const briefDir = options.briefDir ?? path.join(rootDir, "image-briefs", "generated");
  const briefPath = path.join(briefDir, `${promptPackage.postSlug}-${promptPackage.usage}.json`);

  assertWritable(promptPath, rootDir, options.force);
  assertWritable(briefPath, rootDir, options.force);
  fs.mkdirSync(path.dirname(promptPath), { recursive: true });
  fs.mkdirSync(briefDir, { recursive: true });
  fs.writeFileSync(promptPath, promptPackageMarkdown(promptPackage), "utf8");
  fs.writeFileSync(briefPath, `${JSON.stringify(imagePromptPackageToBrief(promptPackage), null, 2)}\n`, "utf8");

  let rawOutputPath: string | null = null;
  if (mode === "local-diagram-fallback") {
    const rawDir = options.rawDir ?? path.join(rootDir, "assets", "images", "raw");
    rawOutputPath = path.join(rawDir, promptPackage.filename);
    assertWritable(rawOutputPath, rootDir, options.force);
    fs.mkdirSync(rawDir, { recursive: true });
    fs.writeFileSync(rawOutputPath, localDiagramSvg(promptPackage), "utf8");
  }

  let articleMutated = false;
  if (options.apply) {
    const optimizedAbsolutePath = path.join(rootDir, ...promptPackage.optimizedPath.split("/"));
    if (!fs.existsSync(optimizedAbsolutePath)) {
      throw new Error(`--apply refused because optimized image is missing: ${promptPackage.optimizedPath}`);
    }
    articleMutated = applyHeroFrontmatter(rootDir, promptPackage);
  }

  return {
    promptPath,
    briefPath,
    rawOutputPath,
    promptPackage,
    articleMutated,
  };
}

function readArgValue(argv: string[], index: number) {
  const current = argv[index];
  if (current.includes("=")) {
    return current.slice(current.indexOf("=") + 1);
  }
  return argv[index + 1];
}

function hasInlineValue(arg: string) {
  return arg.includes("=");
}

function parseArgs(argv: string[]): RunBiz2LabImageSkillOptions {
  const options: Partial<RunBiz2LabImageSkillOptions> = {
    rootDir: process.cwd(),
    apply: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--force") {
      options.force = true;
      continue;
    }
    if (arg === "--apply") {
      options.apply = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      continue;
    }

    const key = arg.replace(/^--/, "").split("=")[0];
    const value = readArgValue(argv, index);
    if (!hasInlineValue(arg)) {
      index += 1;
    }

    if (key === "request") options.requestPath = value;
    if (key === "mode") options.mode = normalizeBiz2LabImageOutputMode(value);
  }

  if (!options.requestPath) {
    throw new Error("--request is required");
  }

  return options as RunBiz2LabImageSkillOptions;
}

function printHelp() {
  console.log(`image-skill:codex

Usage:
  npm run image-skill:codex -- --request image-requests/generated/example.md
  npm run image-skill:codex -- --request image-requests/generated/example.md --mode prompt-only
  npm run image-skill:codex -- --request image-requests/generated/example.md --mode local-diagram-fallback

Options:
  --request <path>                 Image request markdown file
  --mode <prompt-only|manual-drop|local-diagram-fallback>
  --force
  --apply                          Update hero frontmatter only after the optimized local WebP exists

No external API, upload, public route, DB, auth, or admin surface is used.`);
}

function isCliEntry() {
  return Boolean(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href);
}

if (isCliEntry()) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  try {
    const result = runBiz2LabImageSkill(parseArgs(process.argv.slice(2)));
    console.log("image-skill:codex");
    console.log(`prompt=${normalizeRepoPath(path.relative(process.cwd(), result.promptPath))}`);
    console.log(`brief=${normalizeRepoPath(path.relative(process.cwd(), result.briefPath))}`);
    console.log(`rawOutput=${result.rawOutputPath ? normalizeRepoPath(path.relative(process.cwd(), result.rawOutputPath)) : "none"}`);
    console.log(`articleMutated=${result.articleMutated}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
