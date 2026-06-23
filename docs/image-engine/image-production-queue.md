# Image Production Queue

Canonical row-level queue: `image-requests/generated/IMAGE_PRODUCTION_QUEUE.md`.

Phase 3.8-SKILL-MASTER created prompt-only packages for Biz2Lab image production. This document is the docs-facing queue summary; the generated queue file contains every request, prompt package, brief JSON, raw path, optimized path, and status column.

## Coverage

- Hero prompt packages: 30
- Inline prompt packages: 5
- Hub prompt packages: 4
- Total prompt packages: 39

## Priority Order

1. Priority 1: generate and review the 5 key inline explanatory images.
2. Priority 2: generate and review the 30 public Korean post hero images.
3. Priority 3: generate and review the 4 category hub images.

## Status Columns

- `prompt_ready`: yes for all 39 packages tracked in the queue.
- `image_created`: yes only for rows with real generated/imported raster assets.
- `raw_saved`: yes only after a matching file exists under `assets/images/raw`.
- `optimized`: yes only after the matching public WebP exists under `public/images/posts`.
- `validated`: yes only after image validation passes for that asset.
- `visually_approved`: no. User visual approval has not happened yet.
- `applied_to_article`: no. Article and hub files were not changed.
- `pushed`: no. This phase is local-only.

OpenCut update: `opencut-free-open-source-video-editor-ai-content-automation` now has a user-provided raw JPG, optimized public WebP, validation pass, and article frontmatter already points to that public image. It has been pushed only as part of the PR branch; no manual deployment was run.

Open-source automation series update: `free-open-source-automation-tools-series` and `activepieces-ai-business-automation-n8n-alternative` now have Codex-generated raster artifacts imported as raw JPG files, optimized public hero WebP files, and published/noindex false article frontmatter. They remain unpushed until the PR branch is validated and pushed.

Node-RED series update: `node-red-local-business-automation-server` now has a Codex-generated raster artifact imported as a raw JPG, an optimized public WebP hero, article-ready metadata, and series links prepared for validation. No manual deploy was run.

Huginn series update: `huginn-monitoring-automation-agent` now has a Codex-generated raster artifact imported as a raw JPG, an optimized public WebP hero, article-ready metadata, and series links prepared for validation. No manual deploy was run.

Baserow series update: `baserow-open-source-database-automation` now has a Codex-generated raster artifact imported as a raw JPG, an optimized public WebP hero, article-ready metadata, and series links prepared for validation. No manual deploy was run.

## Queue Source

Use `image-requests/generated/IMAGE_PRODUCTION_QUEUE.md` when selecting the next image to create manually. Do not edit article frontmatter, hub pages, `data/image-assets.json`, or production image paths until the corresponding raw and optimized files exist and the user has visually approved them.

Content-series automation update: `appsmith-internal-dashboard-automation` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series automation update: `windmill-developer-workflow-automation` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series automation update: `kestra-data-ai-workflow-orchestration` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series automation update: `n8n-workflow-automation-license-caution` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series artifact-only update: `nocodb-airtable-alternative-license-caution` has a real local Codex-generated PNG artifact under `C:\Users\LOVE\.codex\generated_images\nocodb-airtable-alternative-license-caution-hero\`. Raw/public production images were not imported and no article files were generated.

Content-series automation update: `crawl4ai-blog-research-automation` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series automation update: `langflow-ai-workflow-automation` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series automation update: `dify-llm-app-builder-business-automation` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series automation update: `open-webui-local-llm-admin-portal` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series automation update: `flowise-ai-agent-workflow-automation` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series automation update: `directus-headless-cms-data-automation` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.

Content-series automation update: `pocketbase-lightweight-backend-saas-mvp` has a real Codex-generated raw JPG, optimized public WebP, and article-ready metadata after local validation. No manual deploy was run.
