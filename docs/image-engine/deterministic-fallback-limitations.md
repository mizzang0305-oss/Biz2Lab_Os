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

1. Configure a real localhost provider, or use manual drop.
2. Generate or create raw images locally.
3. Save raw files to `assets/images/raw`.
4. Run `npm run optimize-images`.
5. Run `npm run validate:images`.
6. Run browser smoke and manual visual review.
