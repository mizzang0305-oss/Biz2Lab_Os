import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

type AssetEntry = {
  id?: string;
  postSlug?: string;
  usage?: string;
  src?: string;
  output?: string;
  rawPath?: string;
};

type FileRecord = {
  label: string;
  slug: string;
  kind: "raw" | "public";
  path: string;
  exists: boolean;
  size: number | null;
  hash: string | null;
};

type ArticleHeroEntry = {
  slug: string;
  src?: string;
};

const root = process.cwd();
const targets = [
  {
    slug: "ai-business-automation-guide",
    id: "ai-business-automation-guide-hero",
    articlePath: "content/ko/automation/ai-business-automation-guide.md",
    rawPath: "assets/images/raw/ai-business-automation-guide-hero.png",
    publicCandidates: [
      "public/images/posts/ai-business-automation-guide-1200.webp",
      "public/images/posts/ai-business-automation-guide-hero.webp",
    ],
  },
  {
    slug: "accounts-receivable-tracker",
    id: "accounts-receivable-tracker-hero",
    articlePath: "content/ko/sales-ops/accounts-receivable-tracker.md",
    rawPath: "assets/images/raw/accounts-receivable-tracker-hero.png",
    publicCandidates: [
      "public/images/posts/accounts-receivable-tracker-1200.webp",
      "public/images/posts/accounts-receivable-tracker-hero.webp",
    ],
  },
  {
    slug: "electronic-contract-system-basics",
    id: "electronic-contract-system-basics-hero",
    articlePath: "content/ko/contracts-payments/electronic-contract-system-basics.md",
    rawPath: "assets/images/raw/electronic-contract-system-basics-hero.png",
    publicCandidates: [
      "public/images/posts/electronic-contract-system-basics-1200.webp",
      "public/images/posts/electronic-contract-system-basics-hero.webp",
    ],
  },
] as const;

const errors: string[] = [];
const warnings: string[] = [];
const infos: string[] = [];

function repoPath(filePath: string) {
  return filePath.replaceAll("\\", "/");
}

function absolutePath(filePath: string) {
  return path.join(root, filePath);
}

function readJson<T>(filePath: string): T | null {
  const fullPath = absolutePath(filePath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as T;
}

function hashFile(filePath: string) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function fileRecord(label: string, slug: string, kind: FileRecord["kind"], candidatePath: string): FileRecord {
  const fullPath = absolutePath(candidatePath);
  if (!fs.existsSync(fullPath)) {
    return {
      label,
      slug,
      kind,
      path: repoPath(candidatePath),
      exists: false,
      size: null,
      hash: null,
    };
  }

  const stats = fs.statSync(fullPath);
  return {
    label,
    slug,
    kind,
    path: repoPath(candidatePath),
    exists: true,
    size: stats.size,
    hash: hashFile(fullPath),
  };
}

function collectFileRecords() {
  return targets.flatMap<FileRecord>((target) => [
    fileRecord(target.id, target.slug, "raw", target.rawPath),
    ...target.publicCandidates.map((candidate) =>
      fileRecord(`${target.id}:${path.basename(candidate)}`, target.slug, "public", candidate),
    ),
  ]);
}

function groupBy<T>(items: T[], keyForItem: (item: T) => string | null) {
  const grouped = new Map<string, T[]>();
  for (const item of items) {
    const key = keyForItem(item);
    if (!key) {
      continue;
    }
    grouped.set(key, [...(grouped.get(key) ?? []), item]);
  }
  return grouped;
}

function checkExactHashDuplicates(records: FileRecord[]) {
  for (const [hash, matches] of groupBy(records.filter((record) => record.exists), (record) => record.hash)) {
    const uniqueSlugs = new Set(matches.map((match) => match.slug));
    if (uniqueSlugs.size > 1) {
      errors.push(
        `duplicate file hash ${hash}: ${matches.map((match) => `${match.slug}:${match.path}`).join(", ")}`,
      );
    }
  }
}

function checkNearIdenticalSizes(records: FileRecord[]) {
  const existingRaw = records.filter((record) => record.kind === "raw" && record.exists && record.size !== null);
  for (let leftIndex = 0; leftIndex < existingRaw.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < existingRaw.length; rightIndex += 1) {
      const left = existingRaw[leftIndex];
      const right = existingRaw[rightIndex];
      const leftSize = left.size ?? 0;
      const rightSize = right.size ?? 0;
      const larger = Math.max(leftSize, rightSize);
      const differenceRatio = larger === 0 ? 0 : Math.abs(leftSize - rightSize) / larger;
      if (differenceRatio <= 0.01) {
        warnings.push(
          `near-identical raw file sizes: ${left.slug} (${leftSize}) and ${right.slug} (${rightSize})`,
        );
      }
    }
  }
}

function normalizeAssetEntries(raw: unknown): AssetEntry[] {
  if (!raw) {
    return [];
  }
  if (Array.isArray(raw)) {
    return raw as AssetEntry[];
  }
  if (typeof raw === "object" && raw !== null && "assets" in raw) {
    const maybeAssets = (raw as { assets?: unknown }).assets;
    return Array.isArray(maybeAssets) ? (maybeAssets as AssetEntry[]) : [];
  }
  return [];
}

function readTop3ArticleHeroImages() {
  const entries: ArticleHeroEntry[] = [];

  for (const target of targets) {
    const fullPath = absolutePath(target.articlePath);
    if (!fs.existsSync(fullPath)) {
      continue;
    }
    const parsed = matter(fs.readFileSync(fullPath, "utf8"));
    const src = typeof parsed.data.heroImage === "string" ? parsed.data.heroImage : undefined;
    entries.push({
      slug: target.slug,
      src,
    });
  }

  return entries;
}

function checkDuplicateManifestFields(entries: AssetEntry[], sourceLabel: string) {
  const top3Slugs = new Set<string>(targets.map((target) => target.slug));
  const scoped = entries.filter((entry) => !entry.postSlug || top3Slugs.has(entry.postSlug));

  for (const [src, matches] of groupBy(scoped, (entry) => entry.src ?? entry.output ?? null)) {
    const slugs = new Set(matches.map((match) => match.postSlug).filter(Boolean));
    if (slugs.size > 1) {
      errors.push(`${sourceLabel}: duplicate optimized src assigned to multiple TOP3 slugs: ${src}`);
    }
  }

  for (const [rawPath, matches] of groupBy(scoped, (entry) => entry.rawPath ?? null)) {
    const slugs = new Set(matches.map((match) => match.postSlug).filter(Boolean));
    if (slugs.size > 1) {
      errors.push(`${sourceLabel}: duplicate rawPath assigned to multiple TOP3 slugs: ${rawPath}`);
    }
  }
}

function checkArticleHeroReuse(entries: ArticleHeroEntry[]) {
  for (const [src, matches] of groupBy(entries, (entry) => entry.src ?? null)) {
    const slugs = new Set(matches.map((match) => match.slug));
    if (slugs.size > 1) {
      errors.push(`article frontmatter: duplicate heroImage assigned to multiple TOP3 slugs: ${src}`);
    }
  }
}

function checkMissingRaw(records: FileRecord[]) {
  for (const record of records.filter((item) => item.kind === "raw" && !item.exists)) {
    warnings.push(`missing TOP3 raw image: ${record.path}`);
  }
}

const records = collectFileRecords();
checkMissingRaw(records);
checkExactHashDuplicates(records);
checkNearIdenticalSizes(records);

checkDuplicateManifestFields(normalizeAssetEntries(readJson<unknown>("data/image-assets.json")), "data/image-assets.json");
checkDuplicateManifestFields(
  normalizeAssetEntries(readJson<unknown>("public/images/posts/manifest.json")),
  "public/images/posts/manifest.json",
);
checkArticleHeroReuse(readTop3ArticleHeroImages());

for (const record of records) {
  infos.push(
    `${record.exists ? "FOUND" : "MISSING"} ${record.kind} ${record.slug}: ${record.path}${
      record.size === null ? "" : ` (${record.size} bytes)`
    }`,
  );
}

for (const info of infos) {
  console.log(info);
}
for (const warning of warnings) {
  console.warn(`WARN ${warning}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const suffix = warnings.length > 0 ? ` with ${warnings.length} warning(s)` : "";
console.log(`audit:image-uniqueness PASS${suffix}`);
