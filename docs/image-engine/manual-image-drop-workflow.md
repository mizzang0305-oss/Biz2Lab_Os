# Manual Image Drop Workflow

Date: 2026-06-16
Status: safest real workflow when no local provider is configured

## Purpose

If no local ComfyUI or Stable Diffusion WebUI provider is available, the safest real workflow is manual drop:

1. Read the brief.
2. Create the image using a local tool controlled by the user.
3. Save the raw file to the exact `targetPath` under `assets/images/raw`.
4. Run optimization and validation.

## Commands

Review generation plan:

```bash
npm run image-skill:plan
```

Validate raw file presence:

```bash
npm run image-skill:validate
```

Optimize public WebP files:

```bash
npm run optimize-images
```

Validate all image contracts:

```bash
npm run validate:images
```

Run full local checks:

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run validate:images
npm run check:links
npm run audit:interactions
npm run build
```

## Raw File Rules

- Save only under `assets/images/raw`.
- Use SEO-friendly lowercase filenames from the brief.
- Do not use remote URLs.
- Do not use product, Amazon, affiliate, review, ecommerce, or shopping imagery.
- Do not include real people, real company names, real documents, customer data, payment data, or branded logos.

## Review

After manual replacement, visually review at mobile and desktop sizes. The image should explain the article concept without looking like a public AI tool, product review, ecommerce page, or fake software screenshot.
