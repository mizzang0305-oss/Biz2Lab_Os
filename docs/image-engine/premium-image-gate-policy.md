# Premium Image Gate Policy

Phase: 4.2A.5
Current policy: Phase 4.2B corrective update restores standard image visibility for all public article cards while keeping TOP3-only premium approval.

## Reason

Phase 4.2A.4 confirmed that the three TOP articles have premium PNG-based hero images, but the remaining 22 public posts still rely on SVG-derived WebP images. Showing both families together made the `/ko` article grid feel visually inconsistent before AdSense preparation.

This policy does not generate new images and does not treat deterministic SVG fallback output as premium artwork. Instead, it separates visual status from public visibility:

- approved premium posts render card images and article hero images
- pending posts render their existing slug-specific standard image in public card grids
- pending article pages render their existing standard hero image
- pending images remain `pending`, not `approved`, until a real premium replacement is created and reviewed

## Approved Premium Images

The approved TOP3 premium image slugs are:

- `ai-business-automation-guide`
- `accounts-receivable-tracker`
- `electronic-contract-system-basics`

Each approved post must use:

- raw source: `assets/images/raw/<slug>-hero.png`
- public hero: `/images/posts/<slug>-hero.webp`
- status from `lib/images/premium-image-policy.ts`: `approved`

## Pending Non-TOP3 Images

The other 22 public posts are `pending`. They now render their existing slug-specific standard images in public card grids and article hero areas so the public site does not look unfinished or image-empty.

Pending images still exist in:

- `assets/images/raw/*.svg`
- `public/images/posts/*-hero.webp`
- `public/images/posts/manifest.json`
- article frontmatter
- `content/ko/content-index.json`

Presence in these files and public rendering does not mean premium visual approval.

## AdSense Fast-Track Policy

For AdSense readiness, image-empty public cards are not acceptable when a slug-specific image already exists. Standard images may render publicly, but only the TOP3 PNG-based assets are labeled and audited as premium-approved.

This policy avoids:

- calling SVG-derived standard thumbnails premium
- placeholder-looking public visuals
- deterministic fallback output being mistaken for final premium art
- external images, hotlinks, product/Amazon-style imagery, or commerce/review surfaces

## Enabling A New Premium Image

To enable a new premium image later:

1. Create or manually drop a real approved raw image under `assets/images/raw/<slug>-hero.png`.
2. Optimize it to `/public/images/posts/<slug>-hero.webp`.
3. Confirm the visual is distinct, article-relevant, and Korean alt text is accurate.
4. Update the premium approval registry in `lib/article-image-concepts.ts` by setting `retainedPremium: true`.
5. Run:

```bash
npm run validate:images
npm run audit:image-uniqueness
npm run audit:premium-images
npm run build
```

## Historical 4.2A.5 Guardrails

Phase 4.2A.5 did not add:

- Search Console verification meta/file
- GA4 script
- AdSense script
- `public/ads.txt`
- DNS changes
- Vercel manual deploy
- public `/admin`, `/login`, `/en`, `/ja`, `/ai`, `/chat`, commerce, affiliate, product, review, Amazon, shop, tools, or lotto routes

`.codex/config.toml` must remain unstaged.
