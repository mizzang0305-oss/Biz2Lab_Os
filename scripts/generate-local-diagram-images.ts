import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { imageWidths } from "@/lib/image";

type BriefUsage = "hero" | "inline" | "hub-summary";
type ManifestUsage = "hero" | "inline" | "hub";

type ImageBrief = {
  id: string;
  postSlug: string;
  category: "automation" | "sales-ops" | "small-business" | "contracts-payments";
  usage: BriefUsage;
  targetPath: string;
  optimizedPath: string;
  altKo: string;
  captionKo: string;
};

type BriefFile = {
  briefs?: ImageBrief[];
};

type ImageManifestEntry = {
  id: string;
  project: "biz2lab";
  postSlug: string;
  usage: ManifestUsage;
  src: string;
  rawPath: string;
  altKo: string;
  captionKo: string;
  width: number;
  height: number;
  format: "webp";
  licenseStatus: "local-generated-diagram";
  commerceAutoReusable: true;
  status: "active";
};

const root = process.cwd();
const briefsPath = path.join(root, "image-briefs", "biz2lab-article-image-briefs.json");
const manifestPath = path.join(root, "data", "image-assets.json");
const force = process.argv.includes("--force");
const validCategories = new Set<ImageBrief["category"]>([
  "automation",
  "sales-ops",
  "small-business",
  "contracts-payments",
]);
const validUsages = new Set<BriefUsage>(["hero", "inline", "hub-summary"]);
const safePublicImagePath = /^public\/images\/posts\/[a-z0-9][a-z0-9-]*\.webp$/;
const safeRawImagePath = /^assets\/images\/raw\/[a-z0-9][a-z0-9-]*\.(png|svg)$/;

const categoryLabels: Record<ImageBrief["category"], string[]> = {
  automation: [
    "\uC785\uB825",
    "\uBD84\uB958",
    "AI",
    "\uAC80\uD1A0",
  ],
  "sales-ops": [
    "\uBAA9\uD45C",
    "\uB9E4\uCD9C",
    "\uBBF8\uC218\uAE08",
    "\uBCF4\uACE0",
  ],
  "small-business": [
    "\uC8FC\uBB38",
    "\uC608\uC57D",
    "\uACE0\uAC1D",
    "\uB9AC\uBDF0",
  ],
  "contracts-payments": [
    "\uACC4\uC57D",
    "\uC11C\uBA85",
    "\uACB0\uC81C",
    "\uBCF4\uAD00",
  ],
};

const usageLabels: Record<BriefUsage, string> = {
  hero: "Article workflow",
  inline: "Detailed flow",
  "hub-summary": "Topic map",
};

function normalizeRepoPath(filePath: string) {
  return filePath.replaceAll("\\", "/").replace(/^\/+/, "");
}

function toAbsoluteRepoPath(repoPath: string) {
  return path.join(root, ...normalizeRepoPath(repoPath).split("/"));
}

function toPublicSrc(publicPath: string) {
  return `/${normalizeRepoPath(publicPath).replace(/^public\//, "")}`;
}

function normalizeUsage(usage: BriefUsage): ManifestUsage {
  return usage === "hub-summary" ? "hub" : usage;
}

function dimensionsForUsage(usage: BriefUsage) {
  if (usage === "inline") {
    return { width: 1200, height: 800 };
  }

  if (usage === "hub-summary") {
    return { width: 1200, height: 630 };
  }

  return { width: 1200, height: 675 };
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function hashString(value: string) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function colorForBrief(brief: ImageBrief) {
  const palettes = [
    { accent: "#0f766e", deep: "#0f172a", soft: "#ccfbf1", warm: "#f59e0b" },
    { accent: "#2563eb", deep: "#111827", soft: "#dbeafe", warm: "#14b8a6" },
    { accent: "#047857", deep: "#1f2937", soft: "#d1fae5", warm: "#f97316" },
    { accent: "#334155", deep: "#0f172a", soft: "#e2e8f0", warm: "#0d9488" },
  ];
  return palettes[hashString(brief.id) % palettes.length];
}

function card(x: number, y: number, width: number, height: number, label: string, accent: string) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="16" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      <circle cx="${x + 38}" cy="${y + 38}" r="14" fill="${accent}" opacity="0.16"/>
      <circle cx="${x + 38}" cy="${y + 38}" r="6" fill="${accent}"/>
      <text x="${x + 68}" y="${y + 48}" fill="#1e293b" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="24" font-weight="700">${escapeXml(label)}</text>
    </g>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, color: string) {
  return `<path d="M ${x1} ${y1} C ${x1 + 46} ${y1}, ${x2 - 46} ${y2}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" marker-end="url(#arrow)"/>`;
}

function bars(x: number, y: number, color: string) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="250" height="170" rx="18" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      <rect x="${x + 28}" y="${y + 110}" width="34" height="34" rx="6" fill="${color}" opacity="0.38"/>
      <rect x="${x + 78}" y="${y + 78}" width="34" height="66" rx="6" fill="${color}" opacity="0.52"/>
      <rect x="${x + 128}" y="${y + 52}" width="34" height="92" rx="6" fill="${color}" opacity="0.72"/>
      <rect x="${x + 178}" y="${y + 28}" width="34" height="116" rx="6" fill="${color}"/>
      <path d="M ${x + 24} ${y + 144} H ${x + 226}" stroke="#cbd5e1" stroke-width="3"/>
    </g>`;
}

function baseSvg(width: number, height: number, body: string, palette: ReturnType<typeof colorForBrief>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <defs>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
      <path d="M2,2 L10,6 L2,10 Z" fill="${palette.accent}"/>
    </marker>
    <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f1f5f9"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#f8fafc"/>
  <rect x="40" y="40" width="${width - 80}" height="${height - 80}" rx="28" fill="url(#panel)" stroke="#dbe4e8" stroke-width="2"/>
  <rect x="76" y="76" width="150" height="42" rx="10" fill="${palette.deep}"/>
  <text x="100" y="104" fill="#ffffff" font-family="Arial, sans-serif" font-size="22" font-weight="700">Biz2Lab</text>
  ${body}
</svg>`;
}

function heroSvg(brief: ImageBrief, width: number, height: number) {
  const palette = colorForBrief(brief);
  const labels = categoryLabels[brief.category];
  const body = `
    <text x="76" y="164" fill="${palette.deep}" font-family="Arial, sans-serif" font-size="30" font-weight="800">${usageLabels[brief.usage]}</text>
    <text x="76" y="204" fill="#64748b" font-family="Arial, sans-serif" font-size="18">Local generated business diagram</text>
    ${card(90, 270, 215, 110, labels[0], palette.accent)}
    ${card(365, 270, 215, 110, labels[1], palette.accent)}
    ${card(640, 270, 215, 110, labels[2], palette.accent)}
    ${card(365, 445, 215, 110, labels[3], palette.warm)}
    ${arrow(305, 325, 365, 325, palette.accent)}
    ${arrow(580, 325, 640, 325, palette.accent)}
    ${arrow(748, 380, 518, 445, palette.accent)}
    ${bars(900, 256, palette.accent)}
    <rect x="900" y="458" width="250" height="44" rx="12" fill="${palette.soft}"/>
    <rect x="924" y="476" width="132" height="8" rx="4" fill="${palette.accent}"/>
    <circle cx="1096" cy="480" r="12" fill="${palette.warm}"/>
    <path d="M1090 480 l5 5 l11 -13" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  `;
  return baseSvg(width, height, body, palette);
}

function inlineSvg(brief: ImageBrief, width: number, height: number) {
  const palette = colorForBrief(brief);
  const labels = [...categoryLabels[brief.category], "\uC644\uB8CC"];
  const stepWidth = 180;
  const startX = 86;
  const y = 300;
  const cards = labels
    .map((label, index) => card(startX + index * 220, y, stepWidth, 120, label, index === 4 ? palette.warm : palette.accent))
    .join("");
  const arrows = labels
    .slice(1)
    .map((_, index) => arrow(startX + index * 220 + stepWidth, y + 60, startX + (index + 1) * 220, y + 60, palette.accent))
    .join("");
  const body = `
    <text x="76" y="166" fill="${palette.deep}" font-family="Arial, sans-serif" font-size="32" font-weight="800">Detailed workflow</text>
    <text x="76" y="208" fill="#64748b" font-family="Arial, sans-serif" font-size="19">Safe local inline diagram for article context</text>
    <rect x="78" y="246" width="1044" height="300" rx="24" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
    ${cards}
    ${arrows}
    <rect x="130" y="604" width="940" height="72" rx="18" fill="${palette.soft}"/>
    <circle cx="176" cy="640" r="16" fill="${palette.accent}"/>
    <rect x="212" y="628" width="280" height="10" rx="5" fill="${palette.accent}" opacity="0.55"/>
    <rect x="212" y="650" width="520" height="10" rx="5" fill="${palette.deep}" opacity="0.18"/>
    <rect x="780" y="623" width="236" height="34" rx="10" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
  `;
  return baseSvg(width, height, body, palette);
}

function hubSvg(brief: ImageBrief, width: number, height: number) {
  const palette = colorForBrief(brief);
  const labels = categoryLabels[brief.category];
  const cx = width / 2;
  const cy = height / 2 + 20;
  const body = `
    <text x="76" y="164" fill="${palette.deep}" font-family="Arial, sans-serif" font-size="30" font-weight="800">Topic map</text>
    <text x="76" y="204" fill="#64748b" font-family="Arial, sans-serif" font-size="18">Category hub summary visual</text>
    <circle cx="${cx}" cy="${cy}" r="86" fill="${palette.soft}" stroke="${palette.accent}" stroke-width="4"/>
    <text x="${cx}" y="${cy + 8}" text-anchor="middle" fill="${palette.deep}" font-family="Arial, sans-serif" font-size="24" font-weight="800">Biz2Lab</text>
    ${card(120, 268, 220, 105, labels[0], palette.accent)}
    ${card(490, 178, 220, 105, labels[1], palette.accent)}
    ${card(860, 268, 220, 105, labels[2], palette.accent)}
    ${card(490, 438, 220, 105, labels[3], palette.warm)}
    ${arrow(340, 320, cx - 84, cy, palette.accent)}
    ${arrow(600, 284, cx, cy - 86, palette.accent)}
    ${arrow(860, 320, cx + 86, cy, palette.accent)}
    ${arrow(600, 438, cx, cy + 86, palette.accent)}
  `;
  return baseSvg(width, height, body, palette);
}

function svgForBrief(brief: ImageBrief) {
  const { width, height } = dimensionsForUsage(brief.usage);

  if (brief.usage === "inline") {
    return { svg: inlineSvg(brief, width, height), width, height };
  }

  if (brief.usage === "hub-summary") {
    return { svg: hubSvg(brief, width, height), width, height };
  }

  return { svg: heroSvg(brief, width, height), width, height };
}

function readBriefs() {
  const raw = JSON.parse(fs.readFileSync(briefsPath, "utf8")) as BriefFile;
  if (!Array.isArray(raw.briefs)) {
    throw new Error("Image brief file must contain a briefs array");
  }
  return raw.briefs;
}

function validateBrief(brief: ImageBrief) {
  if (!brief.id || !brief.postSlug || !brief.category || !brief.usage) {
    throw new Error(`${brief.id ?? "brief"}: id, postSlug, category, and usage are required`);
  }

  if (!validCategories.has(brief.category)) {
    throw new Error(`${brief.id}: unsupported category ${brief.category}`);
  }

  if (!validUsages.has(brief.usage)) {
    throw new Error(`${brief.id}: unsupported usage ${brief.usage}`);
  }

  const targetPath = normalizeRepoPath(brief.targetPath);
  const optimizedPath = normalizeRepoPath(brief.optimizedPath);
  if (!safeRawImagePath.test(targetPath) || targetPath.includes("..")) {
    throw new Error(`${brief.id}: unsafe targetPath ${brief.targetPath}`);
  }

  if (!safePublicImagePath.test(optimizedPath) || optimizedPath.includes("..")) {
    throw new Error(`${brief.id}: unsafe optimizedPath ${brief.optimizedPath}`);
  }
}

async function writeRawImage(brief: ImageBrief, svg: string) {
  const targetPath = toAbsoluteRepoPath(brief.targetPath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  if (brief.targetPath.endsWith(".svg")) {
    fs.writeFileSync(targetPath, `${svg}\n`, "utf8");
    return;
  }

  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(targetPath);
}

async function writeWebp(inputPath: string, outputPath: string, width: number) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(outputPath);
}

function heroDerivativePaths(brief: ImageBrief) {
  if (brief.usage !== "hero") {
    return [{ repoPath: normalizeRepoPath(brief.optimizedPath), width: dimensionsForUsage(brief.usage).width }];
  }

  return imageWidths.map((width) => ({
    repoPath: `public/images/posts/${brief.postSlug}-${width}.webp`,
    width,
  }));
}

function readExistingManifest() {
  if (!fs.existsSync(manifestPath)) {
    return [] as unknown[];
  }

  const raw = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  return Array.isArray(raw) ? (raw as unknown[]) : [];
}

function mergeManifest(entries: ImageManifestEntry[]) {
  const existing = readExistingManifest();
  const replacementKeys = new Set(entries.map((entry) => `${entry.postSlug}:${entry.usage}`));
  const replacementIds = new Set(entries.map((entry) => entry.id));
  const preserved = existing.filter((entry) => {
    if (!entry || typeof entry !== "object") {
      return false;
    }

    const candidate = entry as { id?: string; postSlug?: string; usage?: string; project?: string };
    if (replacementIds.has(String(candidate.id))) {
      return false;
    }

    if (
      candidate.project === "biz2lab" &&
      candidate.postSlug &&
      candidate.usage &&
      replacementKeys.has(`${candidate.postSlug}:${candidate.usage}`)
    ) {
      return false;
    }

    return true;
  });

  const sortedEntries = entries.sort((a, b) => {
    const usageOrder = { hero: 0, inline: 1, hub: 2 } as const;
    return usageOrder[a.usage] - usageOrder[b.usage] || a.postSlug.localeCompare(b.postSlug);
  });

  fs.writeFileSync(manifestPath, `${JSON.stringify([...preserved, ...sortedEntries], null, 2)}\n`, "utf8");
}

async function main() {
  const briefs = readBriefs();
  const manifestEntries: ImageManifestEntry[] = [];
  const generated: string[] = [];
  const skipped: string[] = [];
  const failed: string[] = [];
  const seenIds = new Set<string>();

  for (const brief of briefs) {
    try {
      validateBrief(brief);
      if (seenIds.has(brief.id)) {
        throw new Error(`${brief.id}: duplicate brief id`);
      }
      seenIds.add(brief.id);

      const { svg, width, height } = svgForBrief(brief);
      const rawPath = toAbsoluteRepoPath(brief.targetPath);
      const derivativePaths = heroDerivativePaths(brief);
      const rawExists = fs.existsSync(rawPath);
      const allOutputsExist = derivativePaths.every((output) => fs.existsSync(toAbsoluteRepoPath(output.repoPath)));
      const shouldWriteRaw = force || !rawExists;
      const shouldWriteWebp = force || shouldWriteRaw || !allOutputsExist;

      if (shouldWriteRaw) {
        await writeRawImage(brief, svg);
      }

      if (shouldWriteWebp) {
        for (const output of derivativePaths) {
          await writeWebp(rawPath, toAbsoluteRepoPath(output.repoPath), output.width);
        }
      }

      if (shouldWriteRaw || shouldWriteWebp) {
        generated.push(brief.id);
      } else {
        skipped.push(brief.id);
      }

      manifestEntries.push({
        id: brief.id,
        project: "biz2lab",
        postSlug: brief.postSlug,
        usage: normalizeUsage(brief.usage),
        src: toPublicSrc(brief.optimizedPath),
        rawPath: normalizeRepoPath(brief.targetPath),
        altKo: brief.altKo,
        captionKo: brief.captionKo,
        width,
        height,
        format: "webp",
        licenseStatus: "local-generated-diagram",
        commerceAutoReusable: true,
        status: "active",
      });
    } catch (error) {
      failed.push(`${brief.id ?? "brief"}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (failed.length > 0) {
    console.error(failed.join("\n"));
    process.exit(1);
  }

  mergeManifest(manifestEntries);
  console.log(
    `generate:diagrams PASS (briefs=${briefs.length}, generated=${generated.length}, skipped=${skipped.length}, failed=${failed.length}, force=${force})`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
