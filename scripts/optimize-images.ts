import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { imageWidths } from "@/lib/image";
import { getPublicPosts } from "@/lib/posts";

const root = process.cwd();
const rawDir = path.join(root, "assets", "images", "raw");
const outputDir = path.join(root, "public", "images", "posts");
const rawExtensions = new Set([".png", ".svg", ".jpg", ".jpeg", ".webp"]);

type RawImageTarget = {
  postSlug: string;
  rawPath: string;
  createHeroAlias: boolean;
};

function normalizeRepoPath(filePath: string) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function rawImageTargets(): RawImageTarget[] {
  if (!fs.existsSync(rawDir)) {
    return [];
  }

  const publicSlugs = new Set(getPublicPosts().map((post) => post.slug));
  return fs
    .readdirSync(rawDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && rawExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => {
      const basename = path.basename(entry.name, path.extname(entry.name));
      const postSlug = basename.endsWith("-hero") ? basename.slice(0, -"-hero".length) : basename;
      return {
        postSlug,
        rawPath: path.join(rawDir, entry.name),
        createHeroAlias: basename.endsWith("-hero"),
      };
    })
    .filter((target) => publicSlugs.has(target.postSlug))
    .sort((a, b) => a.postSlug.localeCompare(b.postSlug));
}

async function writeWebp(input: sharp.Sharp, outputPath: string, width: number) {
  await input
    .clone()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const targets = rawImageTargets();
  if (targets.length === 0) {
    throw new Error("No local raw post images found under assets/images/raw. Refusing to generate placeholders.");
  }

  const manifest = [];

  for (const target of targets) {
    const input = sharp(target.rawPath);
    const metadata = await input.metadata();
    const aspectHeight = metadata.width && metadata.height
      ? (width: number) => Math.round((width * metadata.height) / metadata.width)
      : (width: number) => Math.round((width * 9) / 16);

    for (const width of imageWidths) {
      const outputPath = path.join(outputDir, `${target.postSlug}-${width}.webp`);
      await writeWebp(input, outputPath, width);
      manifest.push({
        id: `${target.postSlug}-${width}`,
        project: "biz2lab",
        postSlug: target.postSlug,
        usage: "hero",
        width,
        height: aspectHeight(width),
        output: `/images/posts/${target.postSlug}-${width}.webp`,
        source: "raw",
        rawPath: normalizeRepoPath(target.rawPath),
      });
    }

    if (target.createHeroAlias) {
      const outputPath = path.join(outputDir, `${target.postSlug}-hero.webp`);
      await writeWebp(input, outputPath, 1200);
      manifest.push({
        id: `${target.postSlug}-hero`,
        project: "biz2lab",
        postSlug: target.postSlug,
        usage: "hero",
        width: 1200,
        height: aspectHeight(1200),
        output: `/images/posts/${target.postSlug}-hero.webp`,
        source: "raw",
        rawPath: normalizeRepoPath(target.rawPath),
      });
    }
  }

  fs.writeFileSync(
    path.join(outputDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  console.log(`optimize-images PASS (${manifest.length} webp files from ${targets.length} raw files)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
