# Generated Diagram Images

Date: 2026-06-16
Status: deterministic fallback reference only; not public final output

`scripts/generate-local-diagram-images.ts` can create deterministic local diagrams from image briefs. This path exists only as an explicit fallback workflow.

## Cleanup Decision

The deterministic diagrams generated earlier were visually rejected as too bland and repetitive. Their public article application was removed:

- Raw fallback files under `assets/images/raw`: removed from the final cleanup tree.
- Generated public fallback WebP files that did not exist in the approved origin state: removed.
- Inline fallback references in article markdown: removed.
- `data/image-assets.json` active `local-generated-diagram` manifest: removed.
- Prompt packages, briefs, and manual-drop workflow docs: retained.

## Allowed Use

Only use deterministic diagrams when the user explicitly chooses `local-diagram-fallback`. Do not silently use this mode when the user requested real local generation, manual premium image creation, or final article imagery.

## Replacement Path

1. Use the prompt package as the source of truth.
2. Create a real premium image manually or with an explicitly approved image tool.
3. Save the raw file to the package `rawPath`.
4. Optimize and validate locally.
5. Apply to public article content only after visual approval.
