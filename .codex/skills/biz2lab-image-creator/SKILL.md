---
name: biz2lab-image-creator
description: Turn Biz2Lab article content or natural-language visual direction into local, AdSense-safe image production packages. Use when Codex is asked to create image briefs, image prompts, target filenames, raw/optimized paths, Korean alt text, captions, manifest drafts, article image insertion plans, manual-drop handoff instructions, or local SVG diagram fallbacks for the Biz2Lab Korean content site.
---

# Biz2Lab Image Creator

## Purpose

Create a local production package for a Biz2Lab article image. Do not create a public image generator, provider setup, upload feature, route, auth flow, admin surface, ecommerce surface, or external API call.

## Inputs

Collect or infer:

- article slug
- category: `automation`, `sales-ops`, `small-business`, or `contracts-payments`
- usage: `hero`, `inline`, `hub`, or `og`
- user description
- target feeling
- must include
- must avoid
- optional reference text from the article
- output mode: `prompt-only`, `manual-drop`, or `local-diagram`

If the slug exists, read the article frontmatter before inventing title/category values.

## Outputs

Produce:

- image brief JSON
- Korean image generation prompt
- optional English prompt
- negative prompt
- target filename
- raw path under `assets/images/raw`
- optimized path under `public/images/posts`
- `altKo`
- `captionKo`
- manifest draft entry
- article update plan
- validation checklist

## Safety Rules

Enforce these rules literally:

- no external URLs, hotlinks, scraping, or remote image APIs
- no real logos, product photos, Amazon/ecommerce imagery, affiliate/review/shop surfaces, lotto surfaces, or copyrighted characters
- no people/faces unless a later task explicitly approves them
- no private data, fake customer/company records, payment data, or realistic fake screenshots
- no public image generator, upload UI, `/admin`, `/login`, `/ai`, `/chat`, `/commerce`, `/affiliate`, `/reviews`, `/products`, `/shop`, `/amazon`, `/lotto`, `/en`, or `/ja`
- keep the workflow local-only and AdSense-friendly
- keep captions and alt text Korean-first

## Visual Quality Rules

Avoid repetitive fallback visuals:

- vary composition by article
- prefer category-specific visual direction
- use premium SaaS/editorial style
- make diagrams useful rather than decorative
- keep text inside the image minimal
- avoid generic labels such as `Article workflow`
- avoid repeating the same three-box flow or bar-chart block across articles
- include a visual differentiation hint in every generated brief

## Workflow

1. Inspect the existing article and image context:

```bash
npm run image-skill:plan
npm run validate:images
```

2. Create a request from a user description:

```bash
npm run image-request:create -- --slug ai-business-automation-guide --usage hero --description "반복 업무를 AI 자동화 후보로 분류하고 실행 우선순위를 보여주는 대표 이미지"
```

3. Generate the prompt package:

```bash
npm run image-skill:codex -- --request image-requests/generated/ai-business-automation-guide-hero.md
```

4. For a manual image workflow, have the user generate the image outside the public site and place it under `assets/images/raw`.

5. For a safe local diagram only when explicitly suitable, run:

```bash
npm run image-skill:codex -- --request image-requests/generated/ai-business-automation-guide-hero.md --mode local-diagram
```

6. After a real raw image exists, run:

```bash
npm run optimize-images
npm run validate:images
npm run audit:image-briefs
```

7. Do not mutate article frontmatter or inline content unless the user explicitly requests the apply step and the optimized local WebP already exists.

## File Map

- Request template: `image-requests/_template.md`
- Generated requests: `image-requests/generated/`
- Examples: `image-requests/examples/`
- Generated brief packages: `image-briefs/generated/`
- Prompt builder: `lib/image-generation/prompt-builder.ts`
- Request CLI: `scripts/create-image-request.ts`
- Skill runner: `scripts/run-biz2lab-image-skill.ts`
- Quality guard: `scripts/audit-image-brief-quality.ts`

## Modes

`prompt-only`: Write request and prompt package only. Do not generate an image.

`manual-drop`: Prepare paths, prompt, alt/caption, and validation instructions for a manually produced image.

`local-diagram`: Create a local SVG fallback under `assets/images/raw` only when a diagram is suitable. Label it as fallback, not premium final artwork.
