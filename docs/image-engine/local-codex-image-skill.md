# Local Codex Image Skill Workflow

Date: 2026-06-15
Status: documentation only

## Purpose

Biz2Lab article images should be generated and reviewed locally before they are added to public article content. This keeps the AdSense MVP free of external hotlinks, scraped images, product imagery, and public AI image generation surfaces.

## Manual Workflow

1. Read `image-briefs/biz2lab-article-image-briefs.json`.
2. Select a small batch of briefs to generate.
3. Generate images locally using the local Codex image skill or another explicitly approved local-only image workflow.
4. Save raw images to `assets/images/raw/`.
5. Do not upload prompts, raw images, or private project files to external services unless explicitly approved.
6. Do not use copyrighted logos, product images, Amazon images, fake customer data, or sensitive documents.
7. Run Sharp optimization:

```bash
npm run optimize-images
```

8. Run image validation:

```bash
npm run validate:images
```

9. Run the full Biz2Lab validation set before commit.

## Command Placeholder

No repository-local image generation command exists yet.

```bash
# Example only. Replace with the actual local image skill command after it exists.
npm run images:generate:local
```

Do not add this package script until a real local-only generator exists and is approved.

## Output Locations

Raw local sources:

```text
assets/images/raw/
```

Optimized public WebP output:

```text
public/images/posts/
```

Current asset manifest:

```text
data/image-assets.json
```

Generated derivative manifest:

```text
public/images/posts/manifest.json
```

## Review Checklist

- Image explains a real article concept.
- Image has no external URL dependency.
- Image has no real logos or product shots.
- Image contains no private customer, contract, payment, or sales data.
- Korean text inside the image is large enough to read on mobile, or avoided.
- `altKo` and `captionKo` are Korean and descriptive.
- `npm run validate:images` passes.
- No public AI, upload, admin, login, commerce, affiliate, product, review, Amazon, or lottery route is added.
