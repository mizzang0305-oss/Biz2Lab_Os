import fs from "node:fs";
import path from "node:path";

type ImageBriefLike = {
  id?: string;
  postSlug?: string;
  category?: string;
  usage?: string;
  filename?: string;
  targetPath?: string;
  rawPath?: string;
  optimizedPath?: string;
  altKo?: string;
  captionKo?: string;
  promptKo?: string;
  providerPromptKo?: string;
  negativePromptKo?: string;
  categoryStyle?: string;
  visualDifferentiationHint?: string;
  visualStyle?: string;
  composition?: string;
  manifestEntry?: { src?: string; rawPath?: string };
};

type OutputRecord = {
  label: string;
  brief: ImageBriefLike;
};

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];
const outputNames = new Map<string, OutputRecord>();
const promptFingerprints = new Map<string, string[]>();
const briefFiles = [
  path.join(root, "image-briefs", "biz2lab-article-image-briefs.json"),
  ...listJsonFiles(path.join(root, "image-briefs", "generated")),
];

function listJsonFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return listJsonFiles(fullPath);
      }
      return entry.isFile() && entry.name.endsWith(".json") ? [fullPath] : [];
    })
    .sort();
}

function normalizeRepoPath(filePath: string) {
  return filePath.replaceAll("\\", "/");
}

function hasKorean(value: string) {
  return /[\uac00-\ud7a3]/u.test(value);
}

function readBriefs(filePath: string): ImageBriefLike[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as ImageBriefLike[] | { briefs?: ImageBriefLike[] };
  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (Array.isArray(parsed.briefs)) {
    return parsed.briefs;
  }

  if ("id" in parsed) {
    return [parsed as ImageBriefLike];
  }

  return [];
}

function addError(label: string, message: string) {
  errors.push(`${label}: ${message}`);
}

function textFields(brief: ImageBriefLike) {
  return [
    brief.promptKo,
    brief.providerPromptKo,
    brief.visualStyle,
    brief.composition,
    brief.categoryStyle,
    brief.visualDifferentiationHint,
    brief.targetPath,
    brief.rawPath,
    brief.optimizedPath,
    brief.manifestEntry?.src,
    brief.manifestEntry?.rawPath,
  ]
    .filter((value): value is string => Boolean(value))
    .join("\n");
}

function visualPolicyFields(brief: ImageBriefLike) {
  return [
    brief.promptKo,
    brief.providerPromptKo,
    brief.visualStyle,
    brief.composition,
    brief.categoryStyle,
    brief.visualDifferentiationHint,
  ]
    .filter((value): value is string => Boolean(value))
    .join("\n");
}

function stripStructuralTokens(value: string, brief: ImageBriefLike) {
  let stripped = value.toLowerCase();
  const filenameStem = brief.filename?.replace(/\.[^.]+$/u, "");
  const tokens = [brief.postSlug, brief.id, brief.filename, filenameStem]
    .filter((token): token is string => Boolean(token))
    .map((token) => token.toLowerCase());

  for (const token of new Set(tokens)) {
    stripped = stripped.replaceAll(token, "");
  }

  return stripped;
}

function checkForbiddenVisualTerms(label: string, brief: ImageBriefLike) {
  const allText = textFields(brief);
  const visualText = stripStructuralTokens(visualPolicyFields(brief), brief);

  if (/https?:\/\//i.test(allText)) {
    addError(label, "external URL is not allowed");
  }

  for (const term of ["amazon", "products", "product", "affiliate", "reviews", "lotto"]) {
    if (visualText.includes(term)) {
      addError(label, `forbidden visual term ${term}`);
    }
  }
}

function checkDuplicateOutput(label: string, brief: ImageBriefLike) {
  const output = brief.optimizedPath ?? brief.manifestEntry?.src ?? brief.filename;
  if (!output) {
    return;
  }

  const normalized = output.toLowerCase();
  const previous = outputNames.get(normalized);
  if (previous) {
    if (isSameBriefIdentity(previous.brief, brief)) {
      return;
    }

    addError(label, `duplicate output filename with ${previous.label}: ${output}`);
    return;
  }

  outputNames.set(normalized, { label, brief });
}

function isSameBriefIdentity(left: ImageBriefLike, right: ImageBriefLike) {
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

function promptFingerprint(brief: ImageBriefLike) {
  const prompt = brief.providerPromptKo ?? brief.promptKo ?? "";
  return prompt
    .replace(brief.postSlug ?? "", "")
    .replace(brief.id ?? "", "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

for (const filePath of briefFiles) {
  const repoPath = normalizeRepoPath(path.relative(root, filePath));
  for (const brief of readBriefs(filePath)) {
    const label = `${repoPath}:${brief.id ?? brief.postSlug ?? "brief"}`;
    const prompt = brief.providerPromptKo ?? brief.promptKo ?? "";

    if (!brief.categoryStyle?.trim()) {
      addError(label, "categoryStyle is required");
    }

    if (!brief.negativePromptKo?.trim()) {
      addError(label, "negativePromptKo is required");
    }

    if (!brief.visualDifferentiationHint?.trim()) {
      addError(label, "visualDifferentiationHint is required");
    }

    if (!brief.altKo?.trim() || !hasKorean(brief.altKo)) {
      addError(label, "altKo must be descriptive Korean text");
    }

    if (!brief.captionKo?.trim() || !hasKorean(brief.captionKo)) {
      addError(label, "captionKo must be Korean text");
    }

    if (prompt.trim().length < 90) {
      addError(label, "prompt is too generic or too short");
    }

    if (/article workflow/i.test(textFields(brief))) {
      addError(label, 'generic "Article workflow" label is not allowed');
    }

    checkForbiddenVisualTerms(label, brief);
    checkDuplicateOutput(label, brief);

    const fingerprint = promptFingerprint(brief);
    if (fingerprint) {
      promptFingerprints.set(fingerprint, [...(promptFingerprints.get(fingerprint) ?? []), label]);
    }
  }
}

for (const [fingerprint, labels] of promptFingerprints.entries()) {
  if (labels.length > 5) {
    warnings.push(`WARN repeated prompt structure (${labels.length} briefs): ${fingerprint}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(warning);
}

console.log(`audit:image-briefs PASS (${briefFiles.length} files)`);
