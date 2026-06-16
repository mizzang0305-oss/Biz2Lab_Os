# Rejected Fallback Image Cleanup

Date: 2026-06-16
Status: cleanup source of truth

## Why This Cleanup Happened

The deterministic local diagram outputs were safe and local, but they were visually rejected because they looked bland and repetitive. They must not be treated as premium final article images.

## Preserved

- Codex Image Creator Skill.
- Request markdown files.
- Brief JSON packages.
- Prompt packages.
- Image production queue docs.
- Manual-drop handoff docs.
- Local provider bridge and prompt-only audits.
- Deterministic fallback generator as an explicitly labeled fallback path only.

## Removed Or Reverted

- Public article frontmatter changes that pointed posts to generated fallback hero images.
- Inline fallback image references in article bodies.
- Fallback-only files under `assets/images/raw`.
- Fallback-only public WebP files that were not in the approved origin image state.
- Active `data/image-assets.json` entries for `local-generated-diagram` visuals.
- Inline `ArticleImage` renderer introduced only to support those fallback images.

## Current Public Image State

- 25 public Korean posts keep hero images.
- Hero paths are local `/images/posts/*.webp` files.
- The public site is back to the previously approved local image set.
- New premium image prompt packages remain unapplied until real image files exist and are visually approved.

## Next Premium Image Workflow

1. Pick a prompt package from `image-requests/generated`.
2. Create the actual image manually or with an explicitly approved image tool.
3. Save the raw file under `assets/images/raw`.
4. Run `npm run optimize-images`.
5. Run `npm run validate:images`, `npm run audit:image-briefs`, and `npm run audit:image-prompts`.
6. Review the article visually.
7. Apply article image changes only after approval.

## Push Rule

Do not push unapproved fallback visuals or article references that point at fallback outputs.
