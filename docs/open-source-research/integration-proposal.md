# Biz2Lab Open Source Integration Proposal

Date: 2026-06-15
Status: proposal only
Scope: docs only, no implementation

## Non-Negotiable MVP Boundary

This proposal assumes the Biz2Lab project remains a Korean-only AdSense approval MVP.

Do not:

- Deploy.
- Push.
- Apply Supabase migrations.
- Run live crawler jobs.
- Call paid APIs.
- Add public routes.
- Add public AI, chat, auth, admin, affiliate, product, review, Amazon, crawler, lottery, or tool features.
- Add real secrets.

Any PoC must be local-only, deterministic, reversible, and blocked behind explicit approval gates before it can affect production behavior.

## Phase 2 Content-First Decision

The current execution priority is the 25-post Korean AdSense content baseline. Open-source PoCs must not be implemented during the Phase 2 content pass.

Start Pagefind, Content Collections, Sharp image validation, Crawl4AI/Crawlee local extraction, Activepieces mock workflows, analytics, or CMS work only after:

- the 25-post Korean content set is stable;
- route lockdown validation passes;
- sitemap, RSS, robots, link checks, and build pass locally;
- no secrets, live DB writes, paid APIs, public crawler, public AI, auth/admin, affiliate/product, or multilingual routes are introduced.

## Current Project Structure Summary

### Public Routes

Current public route registry is defined in `lib/seo.ts`:

- `/`
- `/ko`
- `/ko/automation`
- `/ko/sales-ops`
- `/ko/small-business`
- `/ko/contracts-payments`
- `/ko/about`
- `/ko/contact`
- `/ko/privacy`
- `/ko/terms`
- Korean article pages via `app/ko/[category]/[slug]/page.tsx`
- `/sitemap.xml`
- `/robots.txt`
- `/rss.xml`
- `/opengraph-image`

Forbidden public route prefixes are defined in `lib/locales.ts`:

- `/en`
- `/ja`
- `/amazon`
- `/reviews`
- `/tools`
- `/lotto`
- `/ai`
- `/chat`
- `/admin`
- `/login`
- `/research`
- `/crawler`
- `/commerce`
- `/affiliate`

Current tests in `tests/biz2lab-policy.test.ts` assert Korean-only public scope, forbidden route exclusion, 25 published Korean posts, no drafts in sitemap, local hero images, connected posts, Supabase fallback behavior, and Pagefind placeholder safety.

### Content Pipeline

Content is local Markdown under `content/ko/{category}/`.

Primary files:

- `content/ko/**/*.md`
- `content/ko/content-index.json`
- `lib/schema.ts`
- `lib/posts.ts`
- `lib/categories.ts`
- `scripts/generate-content-index.ts`
- `scripts/validate-posts.ts`
- `scripts/check-links.ts`

Current content set:

- `automation`: 7 posts
- `sales-ops`: 7 posts
- `small-business`: 6 posts
- `contracts-payments`: 5 posts
- Total: 25 published Korean posts

The parser uses `gray-matter`, validates frontmatter with `zod`, extracts headings and internal links, and exposes public posts only when `locale: ko`, `status: published`, and `draft: false`.

### Image Pipeline

Current image rules are documented in `docs/image-engine/image-rules.md`.

Primary files:

- `assets/images/raw/`
- `public/images/posts/*.webp`
- `public/images/posts/manifest.json`
- `lib/image.ts`
- `scripts/optimize-images.ts`

Current policy:

- No external hotlinked hero images.
- Local post images only under `/images/posts/`.
- WebP derivatives generated at 1200, 800, and 400 widths.
- `heroImage` and `heroAlt` are required on every post.

Current gap:

- The image manifest exists but only reflects generated assets from the older sample image generation set. Phase 2 articles reuse existing hero images, so a future `validate:images` should verify that every referenced hero exists and that the manifest coverage rule is explicit.

### Search Status

Pagefind is already installed as a dev dependency and has a disabled-by-default placeholder.

Primary files:

- `components/search/SearchBox.tsx`
- `scripts/build-search.ts`
- `docs/architecture/pagefind-search-status.md`
- `.env.example`

Current behavior:

- `NEXT_PUBLIC_PAGEFIND_ENABLED=false` by default.
- Search box is visible.
- When enabled, client checks `/pagefind/pagefind.js` with `HEAD`.
- Excerpts are converted to plain text; no `dangerouslySetInnerHTML`.
- `npm run build-search` skips unless `out/` exists.

### Supabase Status

Supabase is optional and server-only for the MVP.

Primary files:

- `lib/supabase.ts`
- `app/api/contact/route.ts`
- `app/api/newsletter/route.ts`
- `app/api/events/click/route.ts`
- `supabase/migrations_draft/001_biz2lab_capture_tables.sql`
- `docs/architecture/security-audit-notes.md`

Current behavior:

- `getSupabaseAdmin()` returns `null` when `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is missing.
- Draft SQL exists but has not been applied.
- No live DB writes should be added in this research pass.

### Docs Status

Existing docs cover:

- AdSense checklist and target posts.
- AI memory and future assistant architecture.
- Pagefind placeholder state.
- Security audit notes.
- Research crawler policy and crawler comparison.
- CommerceAuto future integration policy.
- Image rules.
- Obsidian planning material.

This proposal adds docs under `docs/open-source-research/` and does not change app behavior.

## Source Notes Checked

Official/project sources reviewed for current fit:

- Pagefind: static search without hosted infrastructure, static HTML index flow, MIT project.
- Content Collections: type-safe content collections, MIT.
- shadcn/ui: open source/open code component distribution model, MIT.
- Sharp: high-performance Node image processing, Apache 2.0.
- Crawl4AI: AI-oriented crawler/scraper, Apache 2.0 with attribution request in docs/readme.
- Crawlee: JavaScript/Python crawling framework, Apache 2.0.
- Activepieces: workflow automation, Community Edition MIT with commercial enterprise features.
- Umami: privacy-focused analytics, MIT.
- Keystatic: Markdown/YAML/JSON content editing in repo/local/GitHub mode, MIT.
- Next `opengraph-image` / `next/og`: local Next 16 docs confirm ImageResponse and file conventions.
- PostHog: self-hosted open-source deployment under MIT, with operational/support limitations.
- Fumadocs: React/Next docs framework, MIT, ESM-only.
- Windmill: internal software/workflow platform, AGPLv3/commercial options.
- Remotion: React video generation, special license with company-license conditions.
- Dify: agentic workflow platform, modified Apache 2.0-based license with additional conditions.
- n8n: fair-code/source-available Sustainable Use License plus enterprise license.

## Candidate Integration Matrix

| Candidate | Current Fit | Expected Benefit | Files Likely Affected | DB Write Risk | API Side Effect Risk | Privacy Risk | License Risk | AdSense Approval Risk | Recommended Phase | Go/No-Go |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pagefind | High; already installed and placeholder exists | On-site Korean article search without hosted search infra | `components/search/SearchBox.tsx`, `scripts/build-search.ts`, `.env.example`, `docs/architecture/pagefind-search-status.md`, `public/pagefind/` after build | None | Low; local static assets only | Low; client search query stays in browser unless analytics added | Low; MIT | Low if no new routes and placeholder remains safe | PR1 after 25-post baseline is stable | Defer this pass; PoC after content baseline |
| Content Collections | Medium-high as parallel validator | Type-safe content model and build-time content checks without replacing current parser immediately | `content-collections.ts`, generated collection output, `lib/posts.ts` only after PoC, validation scripts | None | None | Low | Low; MIT | Low if run parallel and no public behavior changes | PR2 after 25-post baseline is stable | Defer this pass; parallel validation PoC later |
| shadcn/ui | Medium; current UI already custom Tailwind | Better accessible primitives for future forms/dialogs, but not urgent | `components/ui/*`, `components/layout/*`, `package.json`, Tailwind config if introduced | None | None | Low | Low; MIT | Medium if visual churn before AdSense | After AdSense or small internal-only component PoC | Defer; do not add now |
| Sharp image manifest | High; Sharp already installed and optimizer exists | Deterministic image inventory and missing-image validation | `scripts/optimize-images.ts`, future `scripts/validate-images.ts`, `public/images/posts/manifest.json`, `package.json` script | None | None | Low | Low; Apache 2.0 | Low; improves local asset safety | PR3 after 25-post baseline is stable | Defer this pass; PoC later |
| Crawl4AI | Medium for local research only | Local source extraction experiments for future content research | `docs/research-engine/*`, future `scripts/research/mock-*`, no public routes | None if local JSON only | Medium-high if allowed to crawl live URLs; must be disabled by default | Medium; extracted page content and source metadata | Low-medium; Apache 2.0 with attribution expectation | High if exposed publicly or used to mass-generate thin content | PR4 after 25-post baseline is stable | Document only now; local mock PoC later |
| Crawlee | Medium for local research only | More mature queue/browser crawler framework in TypeScript | Same as Crawl4AI plus possible `scripts/research/*` | None if local-only | Medium-high if live crawling enabled | Medium | Low; Apache 2.0 | High if public crawler or scraped content is exposed | PR4 alternative after 25-post baseline is stable | Document only now; local mock PoC later |
| Activepieces | Medium for workflow design, low for app runtime | Visual workflow automation for editorial/review process | `docs/workflows/*`, future local mock JSON, no runtime dependency initially | Medium if connected to Supabase/GitHub later | Medium-high if connected to email/webhooks/APIs | Medium; workflow payloads can include user data | Low-medium; CE MIT, enterprise features commercial | Medium if automations create content or external sends | PR5 after 25-post baseline is stable | Document only now; mock workflow later |
| Umami | Medium after privacy review | Lightweight privacy-focused page analytics | `app/layout.tsx`, `lib/analytics-events.ts`, privacy docs, env config | None unless self-host database is added | Medium; external analytics endpoint | Medium; pageview/event data | Low; MIT | Medium; must update privacy page and avoid tracking surprises | After AdSense submission prep | Defer; document event taxonomy first |
| Keystatic | Medium for editorial workflow, risky public admin | Git/local content editing UI for Markdown | `keystatic.config.ts`, admin route unless local-only config, package changes | None in local filesystem mode; GitHub mode writes repo | Medium in GitHub mode | Medium; content drafts and metadata | Low; MIT | High if public admin route appears | PR7 feasibility doc | Defer; doc only, no admin route |
| Satori/next/og | High; `app/opengraph-image.tsx` already exists | Better OG cards and future article-level share images | `app/opengraph-image.tsx`, possible segment OG files, `lib/seo.ts` image references | None | None | Low | Low for Next built-in; Satori MIT | Low if build remains stable | After image manifest PR | PoC later; do not expand now |
| PostHog | Low-medium for MVP | Product analytics, event taxonomy, funnels | `lib/analytics-events.ts`, layout/client provider, privacy docs, env config | None unless self-host DB | Medium-high; sends events/session data | High if session replay/person profiles enabled | Low for self-host MIT, but support/ops constraints | Medium-high before AdSense/privacy review | PR6 taxonomy only | Defer implementation; document taxonomy |
| Fumadocs | Low for current blog MVP | Strong docs system for internal/public documentation later | New docs routes, content config, packages | None | None | Low | Low; MIT | High if public docs routes expand surface | Post-AdSense | Defer |
| Windmill | Low for MVP | Internal jobs/workflows and APIs | Separate infra, workflow code, secrets, DB/API connectors | High if connected to production systems | High | High | High; AGPLv3/commercial considerations | High | Future internal ops only | Defer |
| Remotion | Low for MVP | Programmatic videos for future marketing/tutorials | Separate video workspace, scripts, assets | None | Low unless publishing/upload automation added | Low-medium for asset/source material | Medium-high; special license/company license conditions | Medium; no value for text approval MVP | Future marketing | Defer |
| Dify | Low and explicitly unsafe for public MVP | AI chatbot/agent workflows later | Public AI routes/widgets, API keys, vector/RAG sources | Medium if connected to DB/RAG | High; LLM/API calls | High | Medium-high; modified Apache with conditions | Very high; public AI/chat forbidden | After AdSense and privacy/RAG policy, if ever | Reject for MVP |
| n8n | Low and explicitly hold/avoid | Workflow automation if self-hosted later | Separate infra, credentials, webhook routes | High if connected to production DB | High | High | High; Sustainable Use/Enterprise license | High | Future internal-only evaluation | Reject for now |

## Integration Boundaries by Area

### Search

Pagefind is the only candidate that fits the current public MVP without expanding feature areas. It should remain static, local, and disabled until the generated assets exist. No external search service should be introduced before AdSense approval.

### Content Validation

Content Collections should be a parallel validation layer first. The existing `lib/posts.ts` parser and validators are already passing and should not be replaced until a PoC proves exact route, frontmatter, related-post, sitemap, and RSS parity.

### UI Components

shadcn/ui is useful later, but before AdSense approval UI churn is not worth the risk. Keep current Tailwind components unless a future PR needs one specific primitive and can prove no public surface expansion.

### Images and OG

Sharp image manifest validation is low-risk and useful now. Satori/next/og is already present through the root `app/opengraph-image.tsx`; article-level OG generation can wait until image manifest and content stability are complete.

### Research Crawlers

Crawl4AI and Crawlee must stay local-only and mock-first. Any real URL fetching requires explicit approval and must respect `docs/research-engine/crawler-policy.md`. No crawler output should become public content automatically.

### Workflow Automation

Activepieces can be documented as an editorial workflow design. Do not connect real GitHub, email, Supabase, or webhook credentials in the MVP. Windmill and n8n are too heavy/risky for this phase.

### Analytics

Umami is the safer analytics candidate for a post-approval implementation, but privacy policy updates and opt-in event taxonomy should come first. PostHog is too broad for the MVP, especially if session replay, person profiles, or feature flags are enabled.

### CMS

Keystatic should remain feasibility-only until after AdSense. Any admin route, GitHub write mode, cloud auth, or image storage must be explicitly gated and must not be public in the MVP.

## Final Recommendation

| Candidate | Cold Decision | Reason |
| --- | --- | --- |
| Pagefind | PoC after content baseline | Already scaffolded, but Phase 2 is content-first; keep disabled until static assets and route checks are stable |
| Content Collections | PoC after content baseline | Useful as parallel validation, but do not add packages or replace parser during content expansion |
| Sharp image manifest | PoC after content baseline | Strengthens image policy, but this pass should not add `validate:images` or regenerate assets unless required |
| Crawl4AI | Document only now | Future local mock only; no live crawling or public output |
| Crawlee | Document only now | Alternative future local mock; same crawler restrictions |
| Activepieces | Document only now | Good workflow design target; no real connectors or workflow server in this pass |
| Umami | Defer | Needs privacy and analytics policy update before script injection |
| Keystatic | Document only | Admin/editing surface is too risky before AdSense |
| Satori/next/og | Defer small PoC | Existing root OG is enough for MVP |
| shadcn/ui | Defer | Benefit is not worth UI churn before AdSense |
| PostHog | Defer | Too broad and privacy-sensitive for MVP |
| Fumadocs | Defer | Would add docs feature surface not needed for AdSense |
| Windmill | Defer | Infra/license/secret risk too high |
| Remotion | Defer | Not relevant to approval content set and licensing needs review |
| Dify | Reject for MVP | Public AI/chat forbidden and license/privacy risk |
| n8n | Reject for now | Production workflow side effects and license constraints |
