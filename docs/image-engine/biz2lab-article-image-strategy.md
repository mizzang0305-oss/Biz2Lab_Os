# Biz2Lab Article Image Strategy

Date: 2026-06-15
Status: Phase 3.7 local image pipeline plan and safe integration baseline

## Current Image State

- Public Korean posts: 25
- Posts with `heroImage`: 25
- Posts missing `heroImage`: 0
- Posts with `heroAlt`: 25
- Posts missing `heroAlt`: 0
- Posts with inline images: 0
- Posts without inline images: 25
- Missing current hero files: 0
- External image references in public post content: 0
- Current local post image files: 8 hero image sets, each with 400/800/1200 WebP derivatives
- Current limitation: several posts reuse the same placeholder-style hero image

The current state is valid for build and AdSense safety, but it is visually thin. The next improvement should generate more purposeful local visuals rather than add external images or decorative stock-style art.

## AdSense-Safe Image Policy

Allowed image types:

- Workflow diagrams
- Checklists and decision tables
- System architecture illustrations
- Dashboard-style conceptual images
- Data-flow images
- Business operation process visuals

Disallowed image types:

- External hotlinked images
- Scraped images
- Amazon, product, affiliate, review, or shopping images
- Copyrighted logos and branded platform marks
- Fake people or stock-photo style scenes
- Private documents, real customer data, payment data, or personal data
- Public AI image generation UI or user upload surfaces

Every image must explain a business operation. If an image does not clarify the article, it should not be added before AdSense approval.

## Hero Image Policy

- Every published post must keep one working local hero image.
- Hero images must live under `public/images/posts`.
- Hero images must use WebP for public output.
- Raw generated sources must live under `assets/images/raw`.
- Hero paths in frontmatter must start with `/images/posts/`.
- Hero alt text must be descriptive Korean text.
- Existing generic hero images can remain until replacement raw images are generated locally.
- New hero images should use the existing `slug-1200.webp`, `slug-800.webp`, and `slug-400.webp` pattern.

## Inline Image Policy

- Not every article needs an inline image before AdSense approval.
- Pillar or high-value posts may receive one explanatory inline image.
- Inline images must be local optimized WebP files under `/images/posts`.
- Inline images must have Korean alt text and optional Korean captions.
- Inline images should use diagrams, flow maps, or table anatomy visuals.
- Do not add broken inline references while raw images are still missing.

Recommended first inline targets:

- `ai-business-automation-guide`
- `google-sheets-ai-automation`
- `accounts-receivable-tracker`
- `ai-knowledge-store-for-small-business`
- `electronic-contract-system-basics`

## Mobile And Desktop Layout Policy

- Images must never create horizontal overflow at 320px viewport width.
- Use `next/image` with intrinsic width/height or a fixed aspect-ratio wrapper.
- Captions must wrap naturally in Korean and stay below the image.
- Avoid tiny text inside images because it becomes unreadable on mobile.
- Keep diagrams visually simple enough to scan on mobile.
- Use `sizes` for responsive image delivery.

## Local Codex Image Generation Workflow

1. Read `image-briefs/biz2lab-article-image-briefs.json`.
2. Generate only the approved local raw images.
3. Save raw files under `assets/images/raw/`.
4. Do not upload image prompts or raw assets to external services unless explicitly approved.
5. Do not use copyrighted, product, Amazon, or real company/customer imagery.
6. Run `npm run optimize-images`.
7. Run `npm run validate:images`.
8. Add only generated raw files, optimized WebP files, manifest updates, and safe content references.

If the local image generation tool is unavailable, stop at briefs and documentation.

## CommerceAuto Future Sharing Policy

The manifest in `data/image-assets.json` includes fields that can later support CommerceAuto reuse:

- `project`
- `postSlug`
- `usage`
- `src`
- `rawPath`
- `altKo`
- `captionKo`
- `licenseStatus`
- `commerceAutoReusable`

This does not create CommerceAuto routes, product routes, affiliate routes, or public shopping features. Reuse is metadata-only until a future post-AdSense approval phase.

## No External Hotlink Policy

- No public article image may use `http://` or `https://`.
- No image may load from a remote CDN, marketplace, product page, or scraped source.
- Next.js remote image allowlists should remain unnecessary for the MVP.

## No Product Or Amazon Image Policy

- Do not use Amazon product images.
- Do not use product packshots.
- Do not add `/amazon`, `/products`, `/shop`, `/affiliate`, or review image paths.
- Do not add commerce-oriented screenshots before AdSense approval.

## No Public AI Image Generator Policy

- Image generation is a local/manual production workflow only.
- Do not add `/ai`, `/chat`, `/tools`, upload, prompt, or image generation UI.
- Do not expose image generation endpoints.
- Do not store real API keys or paid provider credentials.

## Phase 3.7 Decision

- Keep current hero references because all files exist.
- Add briefs for 25 future hero replacements.
- Add briefs for 4 future hub summary images.
- Add briefs for 5 future inline explanatory images.
- Add `ArticleImage` for future safe inline rendering.
- Do not insert inline images until optimized files exist.
