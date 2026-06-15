# Biz2Lab Image Requests

This folder is for internal Codex image production requests. It turns a natural language visual direction into a local prompt package, planned filenames, alt text, captions, manifest drafts, and validation steps.

Use it for:

- prompt-only packages for manual image generation
- manual-drop handoff into `assets/images/raw`
- local SVG diagram fallback only when explicitly requested

Do not use it for public image generation, uploads, external APIs, hotlinked images, product images, Amazon imagery, real logos, people/faces, private data, or article mutation by default.

## Commands

```bash
npm run image-request:create -- --slug ai-business-automation-guide --usage hero --description "반복 업무를 AI 자동화 후보로 분류하고 실행 우선순위를 보여주는 대표 이미지"
npm run image-skill:codex -- --request image-requests/generated/ai-business-automation-guide-hero.md
npm run image-skill:codex -- --request image-requests/generated/ai-business-automation-guide-hero.md --mode local-diagram-fallback
```

After a real image is manually created, save it under `assets/images/raw`, run `npm run optimize-images`, then run `npm run validate:images`.
