import { loadImageBriefs } from "@/lib/image-generation/image-brief-loader";
import { normalizeRepoPath, rawFileExists, validateLocalImagePath } from "@/lib/image-generation/image-output";

function hasKorean(value: string) {
  return /[\uAC00-\uD7A3]/u.test(value);
}

function main() {
  const briefs = loadImageBriefs();
  const errors: string[] = [];
  const missingRaw: string[] = [];

  for (const brief of briefs) {
    const label = brief.id;
    errors.push(...validateLocalImagePath(`${label} targetPath`, brief.targetPath));
    errors.push(...validateLocalImagePath(`${label} optimizedPath`, brief.optimizedPath));

    if (!brief.targetPath.startsWith("assets/images/raw/")) {
      errors.push(`${label}: targetPath must stay under assets/images/raw`);
    }

    if (!brief.optimizedPath.startsWith("public/images/posts/")) {
      errors.push(`${label}: optimizedPath must stay under public/images/posts`);
    }

    if (/^https?:\/\//i.test(normalizeRepoPath(brief.targetPath + brief.optimizedPath))) {
      errors.push(`${label}: external URLs are not allowed in image paths`);
    }

    if (!rawFileExists(brief)) {
      missingRaw.push(brief.id);
    }

    if (brief.localOnly !== true) {
      errors.push(`${label}: localOnly must be true`);
    }

    if (!brief.providerPromptKo || !hasKorean(brief.providerPromptKo)) {
      errors.push(`${label}: providerPromptKo must be Korean`);
    }

    if (!brief.negativePromptKo || !brief.negativePromptKo.includes("watermark")) {
      errors.push(`${label}: negativePromptKo must include watermark policy`);
    }

    if (!brief.textPolicy || !brief.textPolicy.includes("minimal")) {
      errors.push(`${label}: textPolicy must require minimal text`);
    }
  }

  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exit(1);
  }

  console.log(`image-skill:validate PASS (briefs=${briefs.length}, rawExisting=${briefs.length - missingRaw.length}, rawMissing=${missingRaw.length})`);
  if (missingRaw.length > 0) {
    console.log(`missingRaw=${missingRaw.join(",")}`);
  }
}

main();
