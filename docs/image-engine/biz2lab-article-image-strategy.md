# Biz2Lab Article Image Strategy

Date: 2026-06-16
Status: prompt-package source of truth; rejected fallback visuals are not public final images

## Current Image State

- Public Korean posts: 25
- Public posts with `heroImage`: 25
- Public posts with `heroAlt`: 25
- Public hero files: existing approved local WebP files under `public/images/posts`
- Inline article images from deterministic fallback: removed
- `data/image-assets.json` active fallback manifest: removed
- Raw fallback outputs under `assets/images/raw`: removed
- Prompt-only image packages: retained

The public site is allowed to keep the last approved hero image references, including reused local hero images. New prompt packages are production instructions only. They are not article replacements until a real image file exists and the user has visually approved it.

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

Every image must explain a business operation. If an image does not clarify the article, it should not be applied before AdSense approval.

## Hero Image Policy

- Every published post must keep one working local hero image.
- Hero images must live under `/images/posts/*.webp`.
- Hero alt text must be descriptive Korean text.
- Existing approved hero images can remain until premium replacements are created.
- New hero replacements require a real raw file, optimized WebP output, validation, and visual approval before frontmatter changes.

## Inline Image Policy

- Inline images are optional before AdSense approval.
- Do not insert inline image markdown until the optimized local WebP exists.
- Inline images must have Korean alt text and optional Korean captions.
- Fallback diagrams are not final premium inline images.

## Production Workflow

1. Select a prompt package under `image-requests/generated/*.prompt.md`.
2. Create a real image manually or with an explicitly approved image tool.
3. Save the raw file under the prompt package `rawPath`.
4. Run `npm run optimize-images`.
5. Run `npm run validate:images`, `npm run audit:image-briefs`, and `npm run audit:image-prompts`.
6. Review the image visually in article context.
7. Apply article or manifest changes only after approval.

## Guardrails

- Do not push unapproved fallback visuals.
- Do not call deterministic fallback output a premium final image.
- Do not change `content/ko`, `public/images/posts`, `assets/images/raw`, or `data/image-assets.json` during prompt-only work.
- Do not add public `/admin`, `/login`, `/ai`, `/chat`, `/commerce`, `/affiliate`, `/reviews`, `/products`, `/shop`, `/amazon`, `/lotto`, `/en`, or `/ja` routes.
