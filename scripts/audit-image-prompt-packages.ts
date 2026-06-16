import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

type BriefLike = {
  id?: string;
  postSlug?: string;
  usage?: string;
  outputMode?: string;
  rawOutput?: string;
  filename?: string;
  targetPath?: string;
  rawPath?: string;
  optimizedPath?: string;
  altKo?: string;
  captionKo?: string;
  promptKo?: string;
  providerPromptKo?: string;
  providerPromptEn?: string;
  negativePromptKo?: string;
  visualStyle?: string;
  composition?: string;
  categoryStyle?: string;
  visualDifferentiationHint?: string;
  manifestEntry?: {
    src?: string;
    rawPath?: string;
  };
  articleMutated?: boolean;
};

type OutputRecord = {
  label: string;
  brief: BriefLike;
};

const root = process.cwd();
const errors: string[] = [];
const outputNames = new Map<string, OutputRecord>();
const promptFingerprints = new Map<string, string[]>();
const allowedTop3ProductionDiffPaths = new Set([
  "assets/images/raw/ai-business-automation-guide-hero.png",
  "assets/images/raw/accounts-receivable-tracker-hero.png",
  "assets/images/raw/electronic-contract-system-basics-hero.png",
  "content/ko/automation/ai-business-automation-guide.md",
  "content/ko/sales-ops/accounts-receivable-tracker.md",
  "content/ko/contracts-payments/electronic-contract-system-basics.md",
  "content/ko/content-index.json",
  "data/image-assets.json",
  "public/images/posts/ai-business-automation-guide-1200.webp",
  "public/images/posts/ai-business-automation-guide-800.webp",
  "public/images/posts/ai-business-automation-guide-400.webp",
  "public/images/posts/ai-business-automation-guide-hero.webp",
  "public/images/posts/accounts-receivable-tracker-1200.webp",
  "public/images/posts/accounts-receivable-tracker-800.webp",
  "public/images/posts/accounts-receivable-tracker-400.webp",
  "public/images/posts/accounts-receivable-tracker-hero.webp",
  "public/images/posts/electronic-contract-system-basics-1200.webp",
  "public/images/posts/electronic-contract-system-basics-800.webp",
  "public/images/posts/electronic-contract-system-basics-400.webp",
  "public/images/posts/electronic-contract-system-basics-hero.webp",
  "public/images/posts/manifest.json",
]);

function normalizeRepoPath(filePath: string) {
  return filePath.replaceAll("\\", "/");
}

function listFiles(dir: string, extension: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return listFiles(fullPath, extension);
      }
      return entry.isFile() && entry.name.endsWith(extension) ? [fullPath] : [];
    })
    .sort();
}

function readJson(filePath: string): BriefLike | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as BriefLike;
  } catch (error) {
    errors.push(`${normalizeRepoPath(path.relative(root, filePath))}: invalid JSON (${String(error)})`);
    return null;
  }
}

function readBriefs(filePath: string): BriefLike[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as BriefLike[] | { briefs?: BriefLike[] };
  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (Array.isArray(parsed.briefs)) {
    return parsed.briefs;
  }

  if ("id" in parsed) {
    return [parsed as BriefLike];
  }

  return [];
}

function hasKorean(value: string) {
  return /[\uac00-\ud7a3]/u.test(value);
}

function addError(label: string, message: string) {
  errors.push(`${label}: ${message}`);
}

function requestFiles() {
  return listFiles(path.join(root, "image-requests", "generated"), ".md").filter((filePath) => {
    const name = path.basename(filePath);
    if (name.endsWith(".prompt.md") || name === "IMAGE_PRODUCTION_QUEUE.md") {
      return false;
    }

    return fs.readFileSync(filePath, "utf8").includes("# Biz2Lab Image Request");
  });
}

function section(markdown: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`, "im");
  return pattern.exec(markdown)?.[1].trim() ?? "";
}

function briefPositiveText(brief: BriefLike) {
  return [
    brief.promptKo,
    brief.providerPromptKo,
    brief.providerPromptEn,
    brief.visualStyle,
    brief.composition,
    brief.categoryStyle,
    brief.visualDifferentiationHint,
    brief.altKo,
    brief.captionKo,
  ]
    .filter((value): value is string => Boolean(value))
    .join("\n");
}

function promptPositiveText(markdown: string) {
  return [
    section(markdown, "Image Brief"),
    section(markdown, "Provider Prompt (Korean)"),
    section(markdown, "Provider Prompt (English)"),
    section(markdown, "Article Context"),
    section(markdown, "Recommended Image Type"),
  ].join("\n");
}

function checkTextSafety(label: string, text: string) {
  const normalizedText = text
    .replace(/\bno\s+(?:real\s+)?logos?\b/gi, "")
    .replace(/\bno\s+people\s+or\s+faces\b/gi, "")
    .replace(/\bno\s+product\s+(?:photography|photos?|images?|cards?|shots?|packages?)\b/gi, "")
    .replace(/실제\s*로고\s*없(?:이|음)?/g, "")
    .replace(/사람\s*얼굴\s*없(?:이|음)?/g, "")
    .replace(/제품\s*사진\s*없(?:이|음)?/g, "")
    .replace(/상품\s*사진\s*없(?:이|음)?/g, "");

  if (/\?{2,}/.test(text)) {
    addError(label, "garbled placeholder text is not allowed");
  }

  if (/https?:\/\//i.test(text)) {
    addError(label, "external URL is not allowed");
  }

  if (/\bAmazon\b|아마존/i.test(normalizedText)) {
    addError(label, "Amazon imagery is not allowed");
  }

  if (/\baffiliate\b|\bshop\b|\bproduct\s+reviews?\b|제휴|상품\s*리뷰/i.test(normalizedText)) {
    addError(label, "affiliate/review/shop imagery is not allowed");
  }

  if (/\bproduct\s+(card|photo|shot|package|image)s?\b|상품\s*사진을\s*(포함|사용)|제품\s*사진을\s*(포함|사용)/i.test(normalizedText)) {
    addError(label, "product imagery is not allowed");
  }

  if (/\blotto\b|로또/i.test(normalizedText)) {
    addError(label, "lotto imagery is not allowed");
  }

  if (/\bgeneric\s+Article workflow\b|\bArticle workflow\b/i.test(normalizedText)) {
    addError(label, 'generic "Article workflow" prompt is not allowed');
  }

  if (/\bpeople\s+and\b|\bface\s+portrait\b|사람\s*얼굴을\s*(포함|사용)|인물\s*사진/i.test(normalizedText)) {
    addError(label, "people/faces are not allowed");
  }

  if (/실제\s*로고를\s*(넣|사용)|brand\s+logo|company\s+logo/i.test(normalizedText)) {
    addError(label, "real logo instruction is not allowed");
  }
}

function isSameBriefIdentity(left: BriefLike, right: BriefLike) {
  return Boolean(
    left.id &&
      right.id &&
      left.id === right.id &&
      left.postSlug &&
      right.postSlug &&
      left.postSlug === right.postSlug &&
      left.usage &&
      right.usage &&
      left.usage === right.usage,
  );
}

function registerOutput(label: string, brief: BriefLike) {
  const output = brief.optimizedPath ?? brief.manifestEntry?.src ?? brief.filename;
  if (!output) {
    addError(label, "optimized output path is required");
    return;
  }

  const normalized = output.toLowerCase();
  const previous = outputNames.get(normalized);
  if (previous && !isSameBriefIdentity(previous.brief, brief)) {
    addError(label, `duplicate output filename with ${previous.label}: ${output}`);
    return;
  }

  outputNames.set(normalized, { label, brief });
}

function isCanonicalOnlyContentDiff(changedPath: string) {
  if (!changedPath.startsWith("content/ko/") || !changedPath.endsWith(".md")) {
    return false;
  }

  try {
    const diff = execFileSync(
      "git",
      ["diff", "--unified=0", "origin/master", "--", changedPath],
      {
        cwd: root,
        encoding: "utf8",
      },
    );
    const changedLines = diff
      .split(/\r?\n/)
      .filter(
        (line) =>
          (line.startsWith("+") || line.startsWith("-")) &&
          !line.startsWith("+++") &&
          !line.startsWith("---"),
      );

    return (
      changedLines.length > 0 &&
      changedLines.every((line) =>
        /^[-+]canonical: "https:\/\/(?:www\.)?biz2lab\.com\/ko\//.test(line),
      )
    );
  } catch {
    return false;
  }
}

function promptFingerprint(text: string) {
  return text
    .replace(/"[^"]+"/g, "\"\"")
    .replace(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

function checkRequiredBriefFields(label: string, brief: BriefLike) {
  const rawPath = brief.rawPath ?? brief.targetPath ?? brief.manifestEntry?.rawPath ?? "";
  const optimizedPath = brief.optimizedPath ?? brief.manifestEntry?.src ?? "";

  if (!brief.negativePromptKo?.trim()) {
    addError(label, "negative prompt is required");
  }

  if (!brief.altKo?.trim() || !hasKorean(brief.altKo)) {
    addError(label, "altKo must be Korean text");
  }

  if (!brief.captionKo?.trim() || !hasKorean(brief.captionKo)) {
    addError(label, "captionKo must be Korean text");
  }

  if (!rawPath.startsWith("assets/images/raw/")) {
    addError(label, "raw path must stay under assets/images/raw");
  }

  if (!optimizedPath.startsWith("public/images/posts/") && !optimizedPath.startsWith("/images/posts/")) {
    addError(label, "optimized path must stay under public/images/posts or /images/posts");
  }

  if (brief.articleMutated === true) {
    addError(label, "generated prompt package must not mutate articles");
  }

  registerOutput(label, brief);
}

function checkPromptMarkdown(label: string, markdown: string, brief: BriefLike) {
  const negativePrompt = section(markdown, "Negative Prompt");
  const altText = section(markdown, "Alt Text");
  const caption = section(markdown, "Caption");

  if (!negativePrompt.trim()) {
    addError(label, "negative prompt section is required");
  }

  if (!altText.trim() || !hasKorean(altText)) {
    addError(label, "Alt Text section must contain Korean text");
  }

  if (!caption.trim() || !hasKorean(caption)) {
    addError(label, "Caption section must contain Korean text");
  }

  if (!/rawPath:\s+assets\/images\/raw\//i.test(markdown)) {
    addError(label, "prompt package rawPath must stay under assets/images/raw");
  }

  if (!/optimizedPath:\s+public\/images\/posts\//i.test(markdown)) {
    addError(label, "prompt package optimizedPath must stay under public/images/posts");
  }

  if (/https?:\/\//i.test(markdown)) {
    addError(label, "external URL is not allowed");
  }

  if ((brief.rawOutput === "none" || brief.outputMode === "prompt-only") && /\b(image was generated|already generated|uploaded)\b/i.test(markdown)) {
    addError(label, "prompt-only package must not claim an image was generated");
  }

  checkTextSafety(label, promptPositiveText(markdown));

  const fingerprint = promptFingerprint(section(markdown, "Provider Prompt (Korean)"));
  if (fingerprint) {
    promptFingerprints.set(fingerprint, [...(promptFingerprints.get(fingerprint) ?? []), label]);
  }
}

function checkProductionPathDiffAgainstOrigin() {
  if (!fs.existsSync(path.join(root, ".git"))) {
    return;
  }

  try {
    const diff = execFileSync(
      "git",
      [
        "diff",
        "--name-status",
        "origin/master",
        "--",
        "content/ko",
        "public/images/posts",
        "assets/images/raw",
        "data/image-assets.json",
      ],
      {
        cwd: root,
        encoding: "utf8",
      },
    ).trim();
    if (diff) {
      const unapprovedDiffs = diff
        .split(/\r?\n/)
        .filter(Boolean)
        .filter((line) => {
          const parts = line.split(/\t/);
          const paths = parts.slice(1).map(normalizeRepoPath);
          return paths.some(
            (changedPath) =>
              !allowedTop3ProductionDiffPaths.has(changedPath) &&
              !isCanonicalOnlyContentDiff(changedPath),
          );
        });

      if (unapprovedDiffs.length > 0) {
        addError("git", `production article/image paths differ from origin/master:\n${unapprovedDiffs.join("\n")}`);
      }
    }
  } catch {
    addError("git", "could not verify production article/image path status");
  }
}

for (const brief of readBriefs(path.join(root, "image-briefs", "biz2lab-article-image-briefs.json"))) {
  registerOutput(`image-briefs/biz2lab-article-image-briefs.json:${brief.id ?? brief.postSlug ?? "brief"}`, brief);
}

const requests = requestFiles();
for (const requestPath of requests) {
  const base = path.basename(requestPath, ".md");
  const requestLabel = normalizeRepoPath(path.relative(root, requestPath));
  const briefPath = path.join(root, "image-briefs", "generated", `${base}.json`);
  const promptPath = path.join(path.dirname(requestPath), `${base}.prompt.md`);

  if (!fs.existsSync(briefPath)) {
    addError(requestLabel, `matching brief is missing: ${normalizeRepoPath(path.relative(root, briefPath))}`);
    continue;
  }

  if (!fs.existsSync(promptPath)) {
    addError(requestLabel, `matching prompt package is missing: ${normalizeRepoPath(path.relative(root, promptPath))}`);
    continue;
  }

  const requestMarkdown = fs.readFileSync(requestPath, "utf8");
  const promptMarkdown = fs.readFileSync(promptPath, "utf8");
  const brief = readJson(briefPath);
  if (!brief) {
    continue;
  }

  checkTextSafety(requestLabel, section(requestMarkdown, "User Description"));
  checkRequiredBriefFields(normalizeRepoPath(path.relative(root, briefPath)), brief);
  checkTextSafety(normalizeRepoPath(path.relative(root, briefPath)), briefPositiveText(brief));
  checkPromptMarkdown(normalizeRepoPath(path.relative(root, promptPath)), promptMarkdown, brief);
}

for (const [fingerprint, labels] of promptFingerprints.entries()) {
  if (labels.length > 3) {
    errors.push(`repetitive prompt structure (${labels.length} packages): ${fingerprint}`);
  }
}

checkProductionPathDiffAgainstOrigin();

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`audit:image-prompts PASS (${requests.length} packages)`);
