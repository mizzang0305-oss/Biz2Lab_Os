# Generated Image QA

Date: 2026-06-16
Status: superseded by rejected fallback cleanup

This QA note records the cleanup decision for the earlier deterministic fallback image pass.

## Result

- Deterministic fallback diagrams are not approved premium final visuals.
- Public article frontmatter was restored to the approved origin image state.
- Inline fallback images were removed from article bodies.
- Fallback-only raw files and active fallback manifest output were removed.
- Prompt packages and image briefs remain available for future premium image creation.

## Current QA Contract

`npm run validate:images` now checks:

- 25 public posts keep local hero images.
- Hero files exist under `public/images/posts`.
- Inline image references, if any, are local and unbroken.
- External images are rejected.
- Optional asset manifests must not keep `active:local-generated-diagram` entries.
- Prompt briefs remain structurally valid without pretending raw/final files already exist.

## Next QA Step

When a real image is created, validate the raw file, optimized WebP, alt/caption, manifest draft, article apply plan, and visual approval before any public article change.
