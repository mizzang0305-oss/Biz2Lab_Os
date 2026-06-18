# Premium Image Gate Policy

Phase: 4.2A.5
Scope: public rendering policy before Google Search Console, GA4, AdSense, and ads.txt setup.

## Reason

Phase 4.2A.4 confirmed that the three TOP articles have premium PNG-based hero images, but the remaining 22 public posts still rely on SVG-derived WebP images. Showing both families together made the `/ko` article grid feel visually inconsistent before AdSense preparation.

This phase does not generate new images and does not treat deterministic SVG fallback output as premium artwork. Instead, it gates public rendering:

- approved premium posts render card images and article hero images
- pending posts keep their frontmatter image metadata for SEO/future use but render text-first public cards
- pending article pages do not show the old SVG-derived image as a large hero

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

The other 22 public posts are `pending`. Their image metadata remains in frontmatter and content index, but their old SVG-derived hero images are not rendered in public card grids or as large article hero images.

Pending images can still exist in:

- `assets/images/raw/*.svg`
- `public/images/posts/*-hero.webp`
- `public/images/posts/manifest.json`
- article frontmatter
- `content/ko/content-index.json`

Presence in these files does not mean public visual approval.

## AdSense Fast-Track Policy

For AdSense readiness, visual consistency is preferred over showing every available local asset. A clean text-first card is acceptable when the available image is not premium-approved.

This policy avoids:

- mixing TOP3 premium PNG visuals with SVG-derived card thumbnails
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

## Guardrails

This phase does not add:

- Search Console verification meta/file
- GA4 script
- AdSense script
- `public/ads.txt`
- DNS changes
- Vercel manual deploy
- public `/admin`, `/login`, `/en`, `/ja`, `/ai`, `/chat`, commerce, affiliate, product, review, Amazon, shop, tools, or lotto routes

`.codex/config.toml` must remain unstaged.
