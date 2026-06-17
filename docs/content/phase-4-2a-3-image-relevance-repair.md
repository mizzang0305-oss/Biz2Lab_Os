# Phase 4.2A.3 Image Relevance Repair

Date: 2026-06-17
Status: LOCAL_BROWSER_SMOKE_PASS

## 1. Problems Found

- Many non-TOP3 hero images used the same generic workflow template.
- Several images displayed a large internal title instead of letting the article
  card/body title carry the title.
- The old template repeated `Hero for practical operations`, the same five
  step cards, the same check icon, the same progress bar, and the same panel
  structure.
- `audit:image-uniqueness` only protected TOP3 premium images, so non-TOP3
  visual duplication could pass.

## 2. Screenshot-Based Diagnosis

The `/ko` card list issue was consistent with the raw SVG structure: different
articles had different filenames and labels, but the visible composition was
nearly identical. This made automation posts such as
`automation-priority-method`, `chatgpt-document-cleanup`, and
`google-sheets-ai-automation` look like the same article family.

## 3. Existing Image State

- Public posts: 25
- TOP3 premium raw PNGs: 3
- Non-TOP3 raw SVG heroes: 22
- Before repair, non-TOP3 SVGs shared one dominant generic workflow structure.
- Hero paths already included slugs, but the image contents were not distinct
  enough for AdSense-readiness quality.

## 4. New Image Concept

The complete slug map is recorded in
`docs/content/article-image-concept-map.md`.

Summary:

- TOP3 retained: 3
- Non-TOP3 replaced: 22
- Visual families: 25
- Image internal title policy: article title is not placed inside the image.
- Short labels only: examples include `빈도`, `요약`, `미작성`, `승인`,
  `객단가`, and `정산`.

## 5. Generated Or Changed Files

Generated or replaced:

- `assets/images/raw/*-hero.svg` for 22 non-TOP3 articles.
- `public/images/posts/*-1200.webp`, `*-800.webp`, `*-400.webp`, and
  `*-hero.webp` derivatives.
- `public/images/posts/manifest.json`.

Metadata and code:

- `content/ko/**/*.md` heroAlt values.
- `content/ko/content-index.json`.
- `image-briefs/biz2lab-article-image-briefs.json`.
- `image-briefs/generated/*-hero.json`.
- `lib/article-image-concepts.ts`.
- `lib/article-image-renderer.ts`.
- `scripts/repair-article-hero-images.ts`.
- `scripts/audit-image-uniqueness.ts`.
- `scripts/validate-images.ts`.
- `scripts/generate-local-diagram-images.ts`.
- `tests/biz2lab-policy.test.ts`.
- `components/layout/HomePage.tsx` now renders 10 featured article cards so
  the home card-list diversity smoke can cover the first 10 article images.

## 6. TOP3 Status

Retained:

- `ai-business-automation-guide`
- `accounts-receivable-tracker`
- `electronic-contract-system-basics`

These keep existing premium raw PNGs. Their heroAlt and concept metadata were
aligned with the 25-post concept map.

## 7. Non-TOP3 Improvement

- Replaced count: 22
- Retained count: 3
- Old generic workflow phrase exposure: 0
- Old five-step template exposure: 0
- Article title rendered inside non-TOP3 SVGs: 0
- All non-TOP3 raw SVGs include a `data-family` value for auditability.

## 8. Duplication Audit

Latest local result:

- `npm run audit:image-uniqueness`: PASS
- `npm run validate:images`: PASS
- `npm run audit:image-briefs`: PASS
- `npm run audit:image-prompts`: PASS

## 9. Mobile Card Smoke

Local browser smoke result:

- `/ko` first 10 article cards: PASS, 10 unique hero image sources and 10
  unique alt texts at 320, 375, 390, 768, and 1440 viewports.
- Automation representative articles: PASS at 320, 375, 390, 768, and 1440.
- Sales representative articles: PASS at 320, 375, 390, 768, and 1440.
- Contract representative articles: PASS at 320, 375, 390, 768, and 1440.
- Horizontal overflow: 0 on all checked page/viewport combinations.
- Broken post images: 0 after lazy-load scroll.
- Visible slug-only related labels: 0.
- Console hydration errors: 0.

## 10. Google Setup Confirmation

This phase does not apply:

- Search Console meta/file
- GA4 script
- AdSense script
- `public/ads.txt`
- DNS changes
- Vercel manual deploy
