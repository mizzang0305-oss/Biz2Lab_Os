# Biz2Lab Visual Change Verification Report

Date: 2026-06-16
Status: PASS locally, pending push/deploy for the homepage visibility tweak

## Scope

Phase 3.13 verified why the user could still see unchanged-looking images on the live site, checked the TOP3 article and hub image paths, and made the visual change more obvious without adding unsafe features.

No `/admin`, `/login`, `/en`, `/ja`, public AI/chat, affiliate/product/Amazon/lotto routes, Search Console, GA4, AdSense, Supabase env, DB migration, external API call, fallback SVG generation, new image generation, push, or manual deploy was added.

## Root Cause

The reported screenshot was consistent with the `/ko/automation` cluster grid, not the TOP3 article pages themselves.

`ArticleCard` was not broken. It reads `post.frontmatter.heroImage` directly, and category hubs load posts from markdown frontmatter through `getPostsByCategory()`.

`content/ko/content-index.json` was not used by the rendered hub/card path, but it did not include `heroImage` or `heroAlt`, which made image audits harder. This phase added those fields and regenerated the index.

## Screenshot-Visible Automation Cards

| Visible card slug | Article path | Current hero image | TOP3? | Result |
| --- | --- | --- | --- | --- |
| `reduce-repetitive-work-with-ai` | `content/ko/automation/reduce-repetitive-work-with-ai.md` | `/images/posts/reduce-repetitive-work-with-ai-1200.webp` | No | Unchanged expected |
| `chatgpt-document-cleanup` | `content/ko/automation/chatgpt-document-cleanup.md` | `/images/posts/ai-business-automation-guide-1200.webp` | No | Not a mapping bug; approved reuse remains |
| `automation-priority-method` | `content/ko/automation/automation-priority-method.md` | `/images/posts/reduce-repetitive-work-with-ai-1200.webp` | No | Unchanged expected |
| `obsidian-business-knowledge-base` | `content/ko/automation/obsidian-business-knowledge-base.md` | `/images/posts/ai-business-automation-guide-1200.webp` | No | Not a mapping bug; approved reuse remains |

The TOP3 automation post is `ai-business-automation-guide`; on `/ko/automation` it is the pillar card above the cluster grid.

## TOP3 Status

| Slug | Route | Frontmatter hero image | Live image status |
| --- | --- | --- | --- |
| `ai-business-automation-guide` | `/ko/automation/ai-business-automation-guide` | `/images/posts/ai-business-automation-guide-hero.webp` | `200 image/webp`, SHA `57314ec9bd4f7f8470aad4c6c40a6dccf032f3ff3710f569efc85da8aefaf332` |
| `accounts-receivable-tracker` | `/ko/sales-ops/accounts-receivable-tracker` | `/images/posts/accounts-receivable-tracker-hero.webp` | `200 image/webp`, SHA `b5323550039025cc65a76db6aefe1d8026159ff27ed807ba505f274419419604` |
| `electronic-contract-system-basics` | `/ko/contracts-payments/electronic-contract-system-basics` | `/images/posts/electronic-contract-system-basics-hero.webp` | `200 image/webp`, SHA `9cc005ad4845439fbaf5d8e69bd3dee2518307aa034952cf6d0aac20ca010076` |

Live cache headers for these direct assets were `public, max-age=0, must-revalidate`; no filename cache-busting change was needed.

## Fixes Applied

- Added `premiumVisualPostSlugs` and `getFeaturedHomePosts()` in `lib/posts.ts`.
- Updated `components/layout/HomePage.tsx` so the `/ko` article grid shows the three TOP3 premium visual posts first, then fills the grid with recent posts.
- Added `heroImage` and `heroAlt` to `scripts/generate-content-index.ts`.
- Regenerated `content/ko/content-index.json`.
- Updated `scripts/audit-image-prompt-packages.ts` so the intentional generated-index diff is allowed by the production-path guard.
- Added policy tests for TOP3 homepage visibility and content-index image metadata.

## Local And Live Smoke

Local production server: `http://localhost:3047`

Local HTTP checks:

- `/ko` returns `200` and includes all three TOP3 hero image paths.
- `/ko/automation`, `/ko/sales-ops`, `/ko/contracts-payments`, and all three TOP3 article pages return `200` with the expected TOP3 image path.
- `/admin`, `/en`, and `/ja` return `404`.

Live HTTP checks:

- `https://biz2lab.com` redirects to `https://www.biz2lab.com`.
- Live TOP3 article and category routes return `200` with expected TOP3 image paths.
- Live `/ko` currently includes only `ai-business-automation-guide-hero.webp`; the new homepage TOP3-first ordering is local-only until push/deploy.
- Live `/admin`, `/en`, and `/ja` return `404`.

Browser smoke:

- Local: 50 route/viewport checks passed.
- Live: 50 route/viewport checks passed.
- Viewports: `320x640`, `375x812`, `768x1024`, `1280x720`, `1440x900`.
- Checks: page identity, nonblank content, no framework overlay, no visible broken post images, no horizontal overflow, TOP3 image presence, `/ko` local image-card order, and console warnings/errors.
- Browser console: no warnings or errors in local or live smoke.

## Validation

Passed:

- `npm run generate-content-index`
- `npm test`
- `npm run lint`
- `npm run typecheck`
- `npm run validate:posts`
- `npm run validate:seo`
- `npm run validate:images`
- `npm run check:links`
- `npm run audit:interactions`
- `npm run audit:image-briefs`
- `npm run audit:image-prompts`
- `npm run audit:image-uniqueness`
- `npm run build`

`validate:images` still reports approved hero-image reuse warnings for older non-TOP3 posts. These are known remaining reuse cases, not a new TOP3 mapping failure.

## Remaining Image Work

Older non-TOP3 posts still reuse approved category images. The next image rollout should replace those remaining reused visuals with article-specific images in a separate controlled phase.

## Push And Deploy Status

- Local changes: ready for commit.
- Push: not done.
- Deploy: not done.
- Visual approval: user should check `/ko` after deploy and the three TOP3 article pages.
