# Generated Diagram Images

Date: 2026-06-16
Status: Phase 3.8A local deterministic generation complete

## Summary

Biz2Lab now has a repository-local diagram generator for article visuals:

```bash
npm run generate:diagrams
```

The command reads `image-briefs/biz2lab-article-image-briefs.json`, creates deterministic SVG diagrams in memory, writes raw PNG sources under `assets/images/raw/`, writes optimized WebP files under `public/images/posts/`, and updates `data/image-assets.json`.

## Generated Count

- Briefs processed: 34
- Raw PNG sources: 34
- Public hero WebP derivatives: 75
- Public inline WebP images: 5
- Public hub summary WebP images: 4
- Manifest entries in `data/image-assets.json`: 34
- Public posts with unique hero images: 25
- Inline image references added to posts: 5

## Safety Method

- No external image API is called.
- No paid API is called.
- No web scraping or hotlinking is used.
- No real logos, product shots, people, screenshots, customer data, contract data, or payment data are used.
- SVG text is intentionally short and generic.
- Alt text and captions come from the approved local brief file.
- Public output stays under `/images/posts/*.webp`.
- Raw source output stays under `assets/images/raw/`.

## Commands

Generate missing diagrams:

```bash
npm run generate:diagrams
```

Force regenerate all diagrams:

```bash
npm run generate:diagrams -- --force
```

Rebuild hero derivatives from raw sources:

```bash
npm run optimize-images
```

Validate image contracts:

```bash
npm run validate:images
```

## Manifest Reuse

`data/image-assets.json` is the stable asset manifest for Biz2Lab and future CommerceAuto reuse. The metadata-only reuse fields are:

- `project`
- `postSlug`
- `usage`
- `src`
- `rawPath`
- `altKo`
- `captionKo`
- `licenseStatus`
- `commerceAutoReusable`

This does not add CommerceAuto routes, product pages, affiliate pages, shopping features, auth, admin, upload, or public image generation UI.

## Manual Visual Review Checklist

- The diagram explains the article concept.
- No image contains a real brand logo or product visual.
- No image appears to show private data, real contracts, or real payment data.
- Text inside the image remains sparse and readable.
- Mobile article pages have no horizontal overflow.
- Inline captions wrap naturally.
- Hero cards remain visually distinct across the 25 posts.
