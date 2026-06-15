import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { getPublicPosts } from "@/lib/posts";
import { imageWidths } from "@/lib/image";

const rawDir = path.join(process.cwd(), "assets", "images", "raw");
const outputDir = path.join(process.cwd(), "public", "images", "posts");

function escapeSvg(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function findRawImage(slug: string) {
  for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
    const candidate = path.join(rawDir, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function placeholderSvg(title: string, category: string) {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#f8fafc"/>
  <rect x="56" y="56" width="1088" height="563" rx="22" fill="#ffffff" stroke="#dbe4e8" stroke-width="2"/>
  <rect x="96" y="96" width="168" height="44" rx="8" fill="#0f766e"/>
  <text x="120" y="125" fill="#ffffff" font-family="Arial, sans-serif" font-size="22" font-weight="700">Biz2Lab</text>
  <text x="96" y="226" fill="#0f172a" font-family="Arial, sans-serif" font-size="54" font-weight="800">${escapeSvg(title.slice(0, 30))}</text>
  <text x="96" y="300" fill="#475569" font-family="Arial, sans-serif" font-size="30">${escapeSvg(category)}</text>
  <rect x="96" y="398" width="1008" height="2" fill="#e2e8f0"/>
  <circle cx="100" cy="482" r="10" fill="#f59e0b"/>
  <text x="128" y="492" fill="#334155" font-family="Arial, sans-serif" font-size="26">현장 적용 체크리스트</text>
  <circle cx="100" cy="542" r="10" fill="#0f766e"/>
  <text x="128" y="552" fill="#334155" font-family="Arial, sans-serif" font-size="26">관련 글과 다음 단계 연결</text>
</svg>`);
}

fs.mkdirSync(outputDir, { recursive: true });

async function main() {
  const manifest = [];

  for (const post of getPublicPosts()) {
    const rawImage = findRawImage(post.slug);
    const input = rawImage
      ? sharp(rawImage)
      : sharp(placeholderSvg(post.frontmatter.title, post.categoryName));

    for (const width of imageWidths) {
      const outputPath = path.join(outputDir, `${post.slug}-${width}.webp`);
      await input
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(outputPath);
      manifest.push({
        slug: post.slug,
        width,
        output: `/images/posts/${post.slug}-${width}.webp`,
        source: rawImage ? "raw" : "placeholder",
      });
    }
  }

  fs.writeFileSync(
    path.join(outputDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  console.log(`optimize-images PASS (${manifest.length} webp files)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
