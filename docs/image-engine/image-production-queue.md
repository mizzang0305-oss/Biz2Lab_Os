# Image Production Queue

Canonical row-level queue: `image-requests/generated/IMAGE_PRODUCTION_QUEUE.md`.

Phase 3.8-SKILL-MASTER created prompt-only packages for Biz2Lab image production. This document is the docs-facing queue summary; the generated queue file contains every request, prompt package, brief JSON, raw path, optimized path, and status column.

## Coverage

- Hero prompt packages: 28
- Inline prompt packages: 5
- Hub prompt packages: 4
- Total prompt packages: 37

## Priority Order

1. Priority 1: generate and review the 5 key inline explanatory images.
2. Priority 2: generate and review the 26 public Korean post hero images plus the 2 planned draft article hero images.
3. Priority 3: generate and review the 4 category hub images.

## Status Columns

- `prompt_ready`: yes for all 37 packages tracked in the queue.
- `image_created`: no. No image model or external image API was called.
- `raw_saved`: no. No new raw files were written under `assets/images/raw`.
- `optimized`: no. No new optimized WebP files were written under `public/images/posts`.
- `validated`: no. Image validation can only pass after actual image files exist.
- `visually_approved`: no. User visual approval has not happened yet.
- `applied_to_article`: no. Article and hub files were not changed.
- `pushed`: no. This phase is local-only.

OpenCut update: `opencut-free-open-source-video-editor-ai-content-automation` now has a user-provided raw JPG, optimized public WebP, validation pass, and article frontmatter already points to that public image. It has been pushed only as part of the PR branch; no manual deployment was run.

Open-source automation series update: `free-open-source-automation-tools-series` and `activepieces-ai-business-automation-n8n-alternative` are draft/noindex article packages with prompt-only hero image requests. No raw or public hero image has been created for them yet.

## Queue Source

Use `image-requests/generated/IMAGE_PRODUCTION_QUEUE.md` when selecting the next image to create manually. Do not edit article frontmatter, hub pages, `data/image-assets.json`, or production image paths until the corresponding raw and optimized files exist and the user has visually approved them.
