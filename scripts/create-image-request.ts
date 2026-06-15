import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import matter from "gray-matter";

import {
  buildImagePromptPackage,
  imagePromptPackageToBrief,
  normalizeBiz2LabImageOutputMode,
  type Biz2LabImageOutputMode,
  type Biz2LabImageUsage,
  type Biz2LabImagePromptPackage,
} from "@/lib/image-generation/prompt-builder";
import type { ImageBriefCategory } from "@/lib/image-generation/types";

type ArticleRecord = {
  slug: string;
  title: string;
  category: ImageBriefCategory;
  description?: string;
  filePath: string;
};

export type CreateImageRequestOptions = {
  rootDir?: string;
  slug: string;
  usage: Biz2LabImageUsage;
  description: string;
  mode?: Biz2LabImageOutputMode;
  category?: ImageBriefCategory;
  title?: string;
  targetFeeling?: string;
  mustInclude?: string[];
  mustAvoid?: string[];
  requestDir?: string;
  briefDir?: string;
  force?: boolean;
  dryRun?: boolean;
};

export type CreateImageRequestResult = {
  requestPath: string;
  briefPath: string;
  promptPackage: Biz2LabImagePromptPackage;
  wroteFiles: boolean;
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

function parseList(value?: string) {
  return value
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
}

function readArticles(rootDir: string): ArticleRecord[] {
  const contentRoot = path.join(rootDir, "content", "ko");
  return walkMarkdownFiles(contentRoot)
    .map<ArticleRecord | null>((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      const slug = String(parsed.data.slug ?? "");
      const category = String(parsed.data.category ?? "");

      if (!slug || !allowedCategories.has(category as ImageBriefCategory)) {
        return null;
      }

      const article: ArticleRecord = {
        slug,
        title: String(parsed.data.title ?? slug),
        category: category as ImageBriefCategory,
        filePath,
      };

      if (parsed.data.description) {
        article.description = String(parsed.data.description);
      }

      return article;
    })
    .filter((article): article is ArticleRecord => article !== null);
}

function findArticle(rootDir: string, slug: string) {
  return readArticles(rootDir).find((article) => article.slug === slug) ?? null;
}

function requestMarkdown(promptPackage: Biz2LabImagePromptPackage, article?: ArticleRecord | null) {
  return `# Biz2Lab Image Request

## Article
- slug: ${promptPackage.postSlug}
- title: ${promptPackage.articleTitle}
- category: ${promptPackage.category}
- usage: ${promptPackage.usage}

## User Description
${promptPackage.userDescription}

## Business Context
${article?.description ?? "기사의 핵심 업무 문제를 안전한 비즈니스 이미지로 설명한다."}

## Visual Direction
- mood: ${promptPackage.targetFeeling}
- layout idea: ${promptPackage.composition}
- color direction: ${promptPackage.visualStyle}
- must include: ${promptPackage.mustInclude.join(", ") || "업무 맥락, 실행 흐름"}
- must avoid: ${promptPackage.mustAvoid.join(", ") || "로고, 사람 얼굴, 제품 사진, 실제 개인정보"}

## Output Mode
- ${promptPackage.outputMode}

## Expected Output
- filename: ${promptPackage.filename}
- rawPath: ${promptPackage.rawPath}
- optimizedPath: ${promptPackage.optimizedPath}
- altKo: ${promptPackage.altKo}
- captionKo: ${promptPackage.captionKo}
`;
}

function assertAllowedOptions(options: CreateImageRequestOptions) {
  if (!options.slug) {
    throw new Error("--slug is required");
  }

  if (!allowedUsages.has(options.usage)) {
    throw new Error(`Unsupported usage: ${options.usage}`);
  }

  if (!options.description?.trim()) {
    throw new Error("--description is required");
  }

  if (options.mode) {
    normalizeBiz2LabImageOutputMode(options.mode);
  }
}

export function createImageRequestPackage(options: CreateImageRequestOptions): CreateImageRequestResult {
  assertAllowedOptions(options);

  const rootDir = options.rootDir ?? process.cwd();
  const article = findArticle(rootDir, options.slug);
  const category = options.category ?? article?.category;
  const title = options.title ?? article?.title ?? options.slug;

  if (!category) {
    throw new Error(`Article slug not found and --category was not provided: ${options.slug}`);
  }

  const promptPackage = buildImagePromptPackage({
    slug: options.slug,
    articleTitle: title,
    category,
    usage: options.usage,
    userDescription: options.description,
    targetFeeling: options.targetFeeling,
    mustInclude: options.mustInclude,
    mustAvoid: options.mustAvoid,
    referenceText: article?.description,
    outputMode: normalizeBiz2LabImageOutputMode(options.mode),
  });
  const requestDir = options.requestDir ?? path.join(rootDir, "image-requests", "generated");
  const briefDir = options.briefDir ?? path.join(rootDir, "image-briefs", "generated");
  const basename = `${options.slug}-${options.usage}`;
  const requestPath = path.join(requestDir, `${basename}.md`);
  const briefPath = path.join(briefDir, `${basename}.json`);

  if (!options.dryRun) {
    for (const outputPath of [requestPath, briefPath]) {
      if (fs.existsSync(outputPath) && !options.force) {
        throw new Error(`${normalizeRepoPath(path.relative(rootDir, outputPath))} already exists. Use --force to overwrite.`);
      }
    }

    fs.mkdirSync(requestDir, { recursive: true });
    fs.mkdirSync(briefDir, { recursive: true });
    fs.writeFileSync(requestPath, requestMarkdown(promptPackage, article), "utf8");
    fs.writeFileSync(briefPath, `${JSON.stringify(imagePromptPackageToBrief(promptPackage), null, 2)}\n`, "utf8");
  }

  return {
    requestPath,
    briefPath,
    promptPackage,
    wroteFiles: !options.dryRun,
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

function parseArgs(argv: string[]): CreateImageRequestOptions {
  const options: Partial<CreateImageRequestOptions> = {
    rootDir: process.cwd(),
    mode: "prompt-only",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--force") {
      options.force = true;
      continue;
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
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

    if (key === "slug") options.slug = value;
    if (key === "usage") options.usage = value as Biz2LabImageUsage;
    if (key === "description") options.description = value;
    if (key === "mode" || key === "output-mode") options.mode = normalizeBiz2LabImageOutputMode(value);
    if (key === "category") options.category = value as ImageBriefCategory;
    if (key === "title") options.title = value;
    if (key === "target-feeling") options.targetFeeling = value;
    if (key === "must-include") options.mustInclude = parseList(value);
    if (key === "must-avoid") options.mustAvoid = parseList(value);
  }

  return options as CreateImageRequestOptions;
}

function printHelp() {
  console.log(`image-request:create

Usage:
  npm run image-request:create -- --slug ai-business-automation-guide --usage hero --description "반복 업무를 AI 자동화 후보로 분류하는 대표 이미지"

Options:
  --slug <slug>                 Article slug
  --usage <hero|inline|hub|og>  Image usage
  --description <text>          User visual direction
  --mode <prompt-only|manual-drop|local-diagram-fallback>
  --target-feeling <text>
  --must-include <a,b,c>
  --must-avoid <a,b,c>
  --force
  --dry-run

No article files are modified.`);
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
    const result = createImageRequestPackage(parseArgs(process.argv.slice(2)));
    console.log("image-request:create");
    console.log(`request=${normalizeRepoPath(path.relative(process.cwd(), result.requestPath))}`);
    console.log(`brief=${normalizeRepoPath(path.relative(process.cwd(), result.briefPath))}`);
    console.log(`wroteFiles=${result.wroteFiles}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
