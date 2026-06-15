# Local Codex Image Skill Workflow

Date: 2026-06-15
Status: command not available

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

## Phase 3.8 Discovery Result

No repository-local image generation command exists yet.

Checked locations:

- `package.json` scripts
- `docs/image-engine/local-codex-image-skill.md`
- `scripts/`
- `tools/`
- `.codex/`
- installed Codex image generation skill documentation

The installed Codex image generation skills are not acceptable for this phase because they use hosted built-in image generation or OpenAI API fallback. This phase requires a local-only command that does not upload prompts, call paid APIs, or require `OPENAI_API_KEY`.

## Next Command Needed

Add a real local-only command only after the local generator exists and has been approved. The command should satisfy all of these conditions:

- Runs from this repository with no web upload.
- Does not require `OPENAI_API_KEY` or any paid image API key.
- Reads approved jobs from `image-briefs/biz2lab-article-image-briefs.json`.
- Writes raw image files only under `assets/images/raw/`.
- Refuses real logos, branded platform marks, people/faces, product images, Amazon-like ecommerce imagery, private data, and unreadable business text.
- Emits a machine-readable result with generated IDs, failed IDs, and skipped IDs.
- Leaves public optimized files to `npm run optimize-images`.

Suggested future package script name:

```bash
npm run images:generate:local
```

Do not add this package script until a real local-only generator exists and is approved.

Expected future behavior:

```bash
npm run images:generate:local -- --brief image-briefs/biz2lab-article-image-briefs.json --out assets/images/raw
```

The exact flags may differ, but the implementation must keep all inputs and outputs local.

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

## Phase 3.8 Status

- Raw images generated: 0
- Raw images present: 0
- Optimized 1200px hero placeholders present: 25
- Active unique post hero images: 25
- Pending brief IDs: 9 hub or inline briefs
- Failed brief IDs: none, because generation was not attempted
- Reason pending: no approved local-only image generation command exists
