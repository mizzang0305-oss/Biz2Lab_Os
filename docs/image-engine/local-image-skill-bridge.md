# Local Image Skill Bridge

Date: 2026-06-16
Status: Phase 3.8-0 provider bridge

## Purpose

Biz2Lab needs better article visuals, but the image workflow must stay local and AdSense-safe. This bridge separates three different paths:

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

- `npm run image-skill:detect`
- `npm run image-skill:plan`
- `npm run image-skill:generate`
- `npm run image-skill:validate`

## Providers

`manual-drop` is always available. It checks whether expected raw files exist and gives the user the next validation command.

`deterministic-fallback` is not a real image model. It exists only to keep the old SVG/Sharp output clearly labeled as fallback.

`comfyui-local` is an optional scaffold for a local ComfyUI instance. It is disabled unless explicitly configured.

`sd-webui-local` is an optional scaffold for local Stable Diffusion WebUI or Automatic1111. It is disabled unless explicitly configured.

## Safety Rules

- Local provider endpoints must be `http://127.0.0.1` or `http://localhost`.
- External hosts are rejected.
- No remote image API is called.
- No image is uploaded externally.
- No model, workflow, or weights are downloaded by Codex.
- No real logo, product, Amazon, ecommerce, private data, people, or fake screenshot imagery is allowed.
- Public output remains `/images/posts/*.webp`.
- Raw source input remains `assets/images/raw/*`.

## Why Public AI UI Is Forbidden

Before AdSense approval, Biz2Lab must stay a narrow Korean content site. A public prompt box, image generator, upload feature, chat UI, or auth/admin surface expands the product scope and adds privacy, moderation, abuse, and policy risk. Image generation is a local production workflow only.

## Why External APIs Are Forbidden

External image APIs can introduce paid API calls, prompt upload, data retention, copyright uncertainty, and undisclosed third-party processing. This phase is local-only until the user explicitly approves a later production-safe provider review.
