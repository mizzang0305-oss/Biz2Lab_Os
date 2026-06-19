# Local Image Skill Bridge

Date: 2026-06-16
Status: Phase 3.8-1 local provider runner bridge

## Purpose

Biz2Lab needs better article visuals, but the image workflow must stay local and AdSense-safe. This bridge separates three different paths:

- Codex Image Skill: internal prompt, brief, filename, manifest draft, and manual handoff package.
- Real local image provider: optional localhost engine such as ComfyUI or Stable Diffusion WebUI.
- Manual drop workflow: user creates images with any local tool and saves raw files under `assets/images/raw`.
- Deterministic fallback: existing SVG/Sharp diagrams, labeled as fallback only.

The bridge does not add public routes, public AI UI, uploads, auth, admin, commerce, affiliate, product, or review features.

## Architecture

Core library:

- `lib/image-generation/types.ts`
- `lib/image-generation/providers.ts`
- `lib/image-generation/local-provider-detect.ts`
- `lib/image-generation/manual-drop-provider.ts`
- `lib/image-generation/deterministic-fallback-provider.ts`
- `lib/image-generation/comfyui-provider.ts`
- `lib/image-generation/sd-webui-provider.ts`
- `lib/image-generation/image-brief-loader.ts`
- `lib/image-generation/image-output.ts`

CLI scripts:

- `npm run image-request:create`
- `npm run image-skill:codex`
- `npm run audit:image-briefs`
- `npm run image-skill:detect`
- `npm run image-skill:plan`
- `npm run image-skill:generate`
- `npm run image-skill:validate`

## Providers

`biz2lab-image-creator` is not a provider. It creates prompt packages and handoff instructions for Codex to use locally.

`manual-drop` is always available. It checks whether expected raw files exist and gives the user the next validation command.

`deterministic-fallback` is not a real image model. It exists only to keep the old SVG/Sharp output clearly labeled as fallback.

`comfyui-local` is an optional localhost ComfyUI runner. It is disabled unless explicitly configured with `LOCAL_IMAGE_PROVIDER=comfyui`, a localhost `LOCAL_IMAGE_ENDPOINT`, and a reviewed `LOCAL_IMAGE_WORKFLOW_PATH` JSON workflow template.

`sd-webui-local` is an optional localhost Stable Diffusion WebUI / Automatic1111 runner. It is disabled unless explicitly configured with `LOCAL_IMAGE_PROVIDER=sd-webui` and a localhost `LOCAL_IMAGE_ENDPOINT`.

## Safety Rules

- Local provider endpoints must be `http://127.0.0.1` or `http://localhost`.
- External hosts are rejected.
- No remote image API is called.
- No image is uploaded externally.
- No model, workflow, or weights are downloaded by Codex.
- No real logo, product, Amazon, ecommerce, private data, people, or fake screenshot imagery is allowed.
- Public output remains `/images/posts/*.webp`.
- Raw source input remains `assets/images/raw/*`.
- Generated raw filenames must include the article slug.
- Missing local providers, missing workflows, and missing raw files are blockers, not success states.

## Why Public AI UI Is Forbidden

Before AdSense approval, Biz2Lab must stay a narrow Korean content site. A public prompt box, image generator, upload feature, chat UI, or auth/admin surface expands the product scope and adds privacy, moderation, abuse, and policy risk. Image generation is a local production workflow only.

## Why External APIs Are Forbidden

External image APIs can introduce paid API calls, prompt upload, data retention, copyright uncertainty, and undisclosed third-party processing. This phase is local-only until the user explicitly approves a later production-safe provider review.

## Phase 3.8-SKILL Addition

The repo now includes a Codex Image Skill document at `.codex/skills/biz2lab-image-creator/SKILL.md`.

Use it to turn a natural language visual direction into:

- image request markdown
- prompt package markdown
- generated brief JSON
- Korean alt/caption
- raw and optimized path plan
- manifest draft
- article update plan
- validation checklist

It can render real image bytes only when a reviewed localhost provider is configured. Without that provider, it remains a prompt/package and manual-drop workflow.

## Real Local Provider Commands

Detect local providers:

```bash
npm run image-skill:detect
```

Generate from the default brief set with ComfyUI:

```bash
LOCAL_IMAGE_PROVIDER=comfyui LOCAL_IMAGE_ENDPOINT=http://127.0.0.1:8188 LOCAL_IMAGE_WORKFLOW_PATH=config/comfyui-workflow.json npm run image-skill:generate -- --no-dry-run
```

Generate from a single generated brief with Stable Diffusion WebUI:

```bash
LOCAL_IMAGE_PROVIDER=sd-webui LOCAL_IMAGE_ENDPOINT=http://127.0.0.1:7860 npm run image-skill:generate -- --brief image-briefs/generated/example-hero.json --no-dry-run
```

Dry-run is the default. Add `--no-dry-run` only after the local provider is running and reviewed.

## Failure States

- `No real local image provider configured`: no provider was selected.
- `LOCAL_IMAGE_ENDPOINT is required`: a real provider was selected without a localhost endpoint.
- `COMFYUI_WORKFLOW_MISSING`: ComfyUI was selected without a reviewed workflow template.
- `Manual drop mode: raw files are still missing`: manual-drop found no approved local raw image file.

None of these states may be treated as generated image success.
