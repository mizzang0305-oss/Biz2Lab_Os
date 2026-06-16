# Manual Image Creation Handoff

Prompt packages are production instructions, not generated images. A prompt package does not mean the raw image already exists, and article image replacement requires an actual local file.

## Workflow

1. Open a prompt package under `image-requests/generated/*.prompt.md`.
2. Copy the Korean provider prompt, or the English provider prompt if the approved image tool works better in English.
3. Paste the prompt into ChatGPT image generation or another explicitly approved local/manual image tool.
4. Keep the negative prompt rules active: no external stock images, hotlinks, Amazon/product imagery, real logos, people/faces, private data, fake screenshots, or copyrighted characters.
5. Save the raw image to the prompt package `rawPath` under `assets/images/raw`.
6. Run `npm run optimize-images`.
7. Run `npm run validate:images`.
8. Visually inspect the generated image in context.
9. Only after the image exists, is optimized, validates, and is visually approved, apply it to article frontmatter, inline article content, hub page code, or the image manifest as appropriate.
10. Run full validation.
11. Commit locally.
12. Ask for user approval before any push.

## Required Commands

```bash
npm run optimize-images
npm run validate:images
npm run audit:image-briefs
npm run audit:image-prompts
npm test
npm run lint
npm run typecheck
npm run build
```

## Warnings

- Do not commit broken image references.
- Do not mark queue fields as complete until the actual step has happened.
- Do not write to `content/ko`, `public/images/posts`, `assets/images/raw`, or `data/image-assets.json` unless the raw image exists and the user has approved the apply step.
- Do not push without explicit user approval.
