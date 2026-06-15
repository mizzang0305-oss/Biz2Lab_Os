# Biz2Lab Article Image Strategy

Date: 2026-06-16
Status: Phase 3.8A local deterministic diagram generation complete

## Current Image State

- Public Korean posts: 25
- Posts with `heroImage`: 25
- Posts missing `heroImage`: 0
- Posts with `heroAlt`: 25
- Posts missing `heroAlt`: 0
- Posts with inline images: 5
- Posts without inline images: 20
- Missing current hero files: 0
- External image references in public post content: 0
- Current local post image files: 25 hero image sets, each with 400/800/1200 WebP derivatives, plus 5 inline WebP images and 4 hub summary WebP images
- Current limitation: generated diagrams still need manual visual review before push/deploy
- Local raw generated images: 34
- Machine-readable image briefs: 34 total
  - 25 hero briefs
  - 4 hub summary briefs
  - 5 inline explanatory briefs
- Local-only generation command discovered in this repository: yes, `npm run generate:diagrams`
- External image generation services remain disallowed for this phase

The current state is valid for build and AdSense safety, with locally generated conceptual diagrams. The next improvement should be manual visual review rather than external image sourcing.

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

If the local image generation tool is unavailable, stop at briefs and documentation. Do not use hosted image generation, API-backed image generation, web upload, scraped images, or external asset services as a substitute.

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

## Phase 3.8 Decision

- Baseline validation passed locally before image generation discovery.
- No repository-local, local-only image generation command was found.
- The installed Codex image generation skills require hosted built-in generation or OpenAI API fallback, so they are outside this phase's allowed scope.
- No raw images were generated.
- `npm run optimize-images` generated deterministic local placeholder WebP derivatives for all 25 public post slugs.
- All 25 public posts now use unique slug-based local hero WebP paths.
- No inline article image references were inserted.
- Current public hero placeholders were kept because every referenced file exists and validates.
- `next/image` usage was updated for Next 16 by using `preload` instead of deprecated `priority` on the article hero image.
- The next image phase needs a real local-only command before any new raw files can be produced.

## Phase 3.8A Decision

- Added `scripts/generate-local-diagram-images.ts`.
- Added `npm run generate:diagrams`.
- Generated 34 raw PNG source images under `assets/images/raw/`.
- Generated 25 unique hero image sets under `public/images/posts/`.
- Generated 5 inline article images and added them only to the approved target posts.
- Generated 4 hub summary images for future safe use; no public hub layout changes were made.
- Updated `data/image-assets.json` to 34 active `local-generated-diagram` entries.
- Kept image generation local-only and deterministic.
- Used no external image APIs, no paid APIs, no scraped images, no hotlinks, and no product/Amazon imagery.
- Kept public routes unchanged; no AI, chat, auth, admin, commerce, affiliate, product, review, lottery, upload, or tool route was added.

Manual visual review remains required before push/deploy.
