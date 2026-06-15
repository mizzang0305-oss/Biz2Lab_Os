# Deterministic Fallback Limitations

Date: 2026-06-16
Status: fallback only

## What Exists

`scripts/generate-local-diagram-images.ts` creates deterministic SVG/Sharp business diagrams. These are local, safe, reproducible, and valid for the current pipeline.

## Limitation

The fallback diagrams are visually repetitive. They use similar cards, arrows, simple labels, and dashboard shapes across many posts. They are useful as safe placeholders, but they should not be presented as final premium visuals or real local image model output.

## Policy

- Do not call deterministic SVG output a real image skill result.
- Do not silently fall back to SVG diagrams when the user asked for local image-model generation.
- Use `npm run generate:diagrams` only when fallback visuals are explicitly acceptable.

## Replacement Path

1. Use the Codex Image Skill to create a better brief and prompt package.
2. Configure a real localhost provider, use manual drop, or use ChatGPT image generation manually outside the public site.
3. Generate or create raw images locally.
4. Save raw files to `assets/images/raw`.
5. Run `npm run optimize-images`.
6. Run `npm run validate:images`.
7. Run browser smoke and manual visual review.

## Phase 3.8-SKILL Clarification

`npm run image-skill:codex` creates prompt/brief/handoff packages. It does not render a premium final image. `--mode local-diagram-fallback` creates a safe SVG fallback only when explicitly suitable and explicitly requested, and that fallback should remain labeled as a local diagram rather than a final AI image.

Every generated prompt package should include:

- category-specific visual style
- negative prompt
- visual differentiation hint
- minimal in-image text policy
- local raw and optimized path plan
