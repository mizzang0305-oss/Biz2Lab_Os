# Codex Image Skill Workflow

Date: 2026-06-16
Status: Phase 3.8-SKILL internal workflow

## Purpose

The Biz2Lab Codex Image Skill turns an article image idea into a local production package: request markdown, prompt package, generated brief JSON, planned raw/optimized paths, Korean alt text, caption, manifest draft, article update plan, and validation checklist.

It is not ComfyUI setup, Stable Diffusion setup, a public AI image feature, or a real image rendering provider.

## Workflow

1. User describes the image need in natural language.
2. Codex creates an image request with `npm run image-request:create`.
3. Codex creates a prompt package with `npm run image-skill:codex`.
4. User manually creates the image with ChatGPT image generation, another approved manual tool, or a local model outside the public site.
5. User saves the raw result to `assets/images/raw`.
6. Codex runs `npm run optimize-images`.
7. Codex runs `npm run validate:images`.
8. Codex updates manifest/article references only after explicit approval and local optimized files exist.
9. Codex performs browser smoke or build validation.
10. Push only after approval.

## Mode 1: Prompt Only

Use when the goal is a high-quality prompt package and no image should be generated locally.

```bash
npm run image-request:create -- --slug ai-business-automation-guide --usage hero --description "반복 업무를 AI 자동화 후보로 분류하고 실행 우선순위를 보여주는 대표 이미지"
npm run image-skill:codex -- --request image-requests/generated/ai-business-automation-guide-hero.md
```

## Mode 2: Manual Drop

Use when the user will manually create the image, then place it in `assets/images/raw`.

```bash
npm run image-skill:codex -- --request image-requests/generated/ai-business-automation-guide-hero.md --mode manual-drop
npm run optimize-images
npm run validate:images
```

## Mode 3: Local Diagram Fallback

Use only when a safe SVG/diagram fallback is suitable and explicitly requested. This output is local and deterministic, but it is not the premium final image path.

```bash
npm run image-skill:codex -- --request image-requests/generated/ai-business-automation-guide-hero.md --mode local-diagram-fallback
```

## Example 1

Input:

> AI 업무 자동화 시작 글에 들어갈, 반복 업무를 분류하고 자동화 우선순위를 보여주는 대표 이미지를 만들어줘.

Output:

- request markdown under `image-requests/generated/`
- prompt package markdown
- Korean provider prompt
- negative prompt
- filename and local paths
- Korean alt text
- Korean caption
- manifest draft
- validation checklist

## Example 2

Input:

> 미수금 관리표 글에 들어갈, 매출과 미수금을 같이 보는 대시보드형 설명 이미지.

Expected direction:

- category: `sales-ops`
- visual style: sales dashboard, receivables, target tracking, reporting flow
- avoid: real company names, customer data, payment details, fake screenshots

## Safety

- No external image API
- No paid API call
- No hotlink
- No scraping
- No public upload or generator route
- No DB, auth, admin, login, commerce, affiliate, product, review, Amazon, or lotto surface
- No article mutation by default
