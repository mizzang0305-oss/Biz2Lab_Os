# Image Duplication Audit Report

Date: 2026-06-17
Phase: 4.2A.3 Article image relevance and uniqueness repair

## 1. Finding

The previous image uniqueness audit focused on the TOP3 premium images. It did
not inspect the non-TOP3 SVG hero set as a visual system. As a result, many
articles passed file-level checks even though the raw SVGs shared the same
large title, `Hero for practical operations` subtitle, five-step
`문제 -> 기준 -> 실행 -> 검토 -> 개선` structure, check mark, progress bar, and
panel layout.

## 2. Repair

- Added `lib/article-image-concepts.ts` as a 25-slug concept map.
- Added `lib/article-image-renderer.ts` for concept-driven local SVG hero images.
- Added `scripts/repair-article-hero-images.ts` to update non-TOP3 raw SVGs,
  heroAlt values, and hero brief metadata.
- Updated `scripts/generate-local-diagram-images.ts` so future hero generation
  uses the concept renderer instead of the old generic hero renderer.
- Rebuilt WebP derivatives with `npm run optimize-images`.

## 3. Audit Scope

`npm run audit:image-uniqueness` now checks:

- 25 public post hero images.
- raw file existence for each slug.
- 1200, 800, 400, and hero WebP derivatives for each slug.
- exact file-hash duplication across different slugs.
- generic phrase exposure such as `Hero for practical operations`.
- old five-step template exposure.
- raw SVG title mismatch against article titles.
- concept coverage and visual-family diversity.
- first 10 home cards for repeated adjacent visual families.

## 4. Result

Latest local audit:

- `audit:image-uniqueness PASS`
- raw hero files found: 25
- public WebP hero derivatives found: 100
- concept families: 25
- exact duplicate hashes across different slugs: 0
- generic workflow phrase exposure: 0
- old five-step template exposure: 0
- title-in-image mismatch count for non-TOP3 SVGs: 0
- local `/ko` first 10 card smoke: PASS, 10 unique hero image sources and 10
  unique alt texts across 320, 375, 390, 768, and 1440 viewports

## 5. Remaining Risk

- TOP3 premium PNGs were retained, not regenerated.
- The repaired 22 non-TOP3 images are deterministic local SVG/WebP outputs,
  not premium model-generated artwork.
- Final live smoke must run after automatic Vercel redeploy.

## 6. Google Setup Confirmation

Not applied:

- Search Console meta/file
- GA4 script
- AdSense script
- `public/ads.txt`
- DNS change
- Vercel manual deploy
