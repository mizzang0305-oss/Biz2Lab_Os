# Biz2Lab Open Source Risk Register

Date: 2026-06-15
Status: proposal only
Scope: docs only

## Risk Scale

- Low: contained by current local build/test process.
- Medium: needs explicit policy, privacy, or rollback controls.
- High: can break AdSense scope, leak data, write to production systems, or create legal/license risk.

## Current MVP Guardrails

The current AdSense MVP must remain:

- Korean-only.
- Content-focused.
- Static/public route constrained.
- No public AI/chat/admin/auth/crawler/affiliate/product/review/Amazon/tools/lottery routes.
- No live DB writes unless separately authorized.
- No paid APIs.
- No real secrets.
- No deploy in this pass.

## Top Risks

| ID | Area | Risk | Severity | Trigger | Impact | Mitigation | Owner Gate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Public route scope | A tool adds `/admin`, `/api/search`, `/crawler`, `/tools`, `/ai`, or CMS routes | High | Keystatic, Fumadocs, Dify, crawler UI, workflow webhooks | AdSense scope break and forbidden route exposure | Add route-scope tests before any integration; reject public admin/crawler/AI routes | Engineering approval plus policy test |
| R2 | Search | Pagefind enabled without generated assets | Medium | `NEXT_PUBLIC_PAGEFIND_ENABLED=true` before `public/pagefind` exists | Broken UX and console errors | Keep disabled default; HEAD check; smoke test | Build verification |
| R3 | Search privacy | Search queries sent to analytics | Medium | Adding Umami/PostHog events for query text | Privacy policy gap | Do not log raw query terms; aggregate only after privacy review | Privacy review |
| R4 | Content model | Content Collections replaces parser too early | Medium | Runtime swap before parity | Broken sitemap/RSS/article pages | Parallel validator only; compare against `getPublicPosts()` | Test parity gate |
| R5 | Images | Image manifest does not cover Phase 2 reused heroes | Medium | `validate:images` assumes one unique image per post | False failures or accidental image churn | Validator must allow intentional reuse and verify actual referenced files | Image policy review |
| R6 | Crawling | Live crawler runs without approval | High | Crawl4AI/Crawlee command accepts URLs | External requests, robots/legal/privacy risk | Fixture-only by default; fail closed on live URL | Explicit live crawl approval |
| R7 | Crawling | Full third-party content stored or republished | High | Extractor saves full article text | Copyright and AdSense quality risk | Store metadata, short excerpts, citations, and summaries only | Research policy review |
| R8 | Workflow automation | Activepieces/n8n/Windmill connector writes externally | High | Real GitHub, email, Supabase, webhook, CMS actions | Hard-to-revert external side effects | Mock workflows only until explicit action-specific approval | Connector approval |
| R9 | Analytics | PostHog session replay/person profiles enabled | High | Default product analytics setup | Privacy and AdSense trust risk | Prefer taxonomy docs; defer PostHog implementation; disable replay/person profiles if ever evaluated | Privacy review |
| R10 | Analytics | Umami added without privacy page update | Medium | Script injection before policy review | Privacy disclosure gap | Update privacy docs first; only pageview-level events | Legal/privacy gate |
| R11 | CMS | Keystatic public admin route exposed | High | Adding Keystatic admin route | Forbidden admin/auth surface | Feasibility doc only; local filesystem mode only if later approved | Route test gate |
| R12 | CMS | GitHub mode writes to repo | Medium-high | Keystatic GitHub storage | Remote write side effect | No GitHub mode before explicit approval | Git write approval |
| R13 | AI | Dify public chatbot added | High | Widget/route/API key integration | Direct violation of MVP scope | Reject for MVP | Post-AdSense product decision |
| R14 | License | n8n Sustainable Use or Remotion special license misunderstood | High | Treating source-available as low-risk MIT | Legal/commercial uncertainty | Defer/reject until license review | License review |
| R15 | License | Windmill AGPL obligations ignored | High | Embedding/hosting Windmill connected to product | Distribution/network copyleft concerns | Defer to separate infra/legal review | License review |
| R16 | Secrets | Workflow/CMS/analytics keys added to repo or client bundle | High | Adding env values or `NEXT_PUBLIC_*` secrets | Secret exposure | Use placeholders only; test `.env.example`; no real secrets | Security review |
| R17 | Supabase | Draft migrations applied during PoC | High | Running Supabase apply or SQL editor | Production schema/write risk | Docs-only; no migration apply; project-ref confirmation required later | DB approval |
| R18 | AdSense quality | Research extraction becomes thin/generated posts | High | Auto-generated content from crawler/AI | AdSense rejection risk | Human-authored Korean content only; research notes not public | Editorial review |
| R19 | Build stability | New packages conflict with Next 16 | Medium | Content/CMS/UI package install | Build/type failures | Read local Next docs; isolate packages per PR; full validation | Build gate |
| R20 | UI stability | shadcn/ui introduces design churn | Medium | Replacing existing components before approval | Visual regressions | Defer; only add one primitive per scoped need | UI review |
| R21 | Phase sequencing | Open-source PoC starts before the 25-post content baseline is stable | High | Implementing Pagefind, Content Collections, image validation, crawlers, workflows, analytics, or CMS during Phase 2 | Mixed scope, harder rollback, AdSense readiness uncertainty | Keep Phase 2 content-first; start PoCs only after validation passes and separate PR scope is approved | Phase gate |

## Candidate-Specific Risk Notes

### Pagefind

Risk is low if it remains static. The main controls are disabled-by-default env, generated asset checks, no raw query analytics, and no HTML excerpt injection.

Decision: defer this pass; PoC only after the 25-post content baseline is stable and static assets are confirmed.

### Content Collections

Risk is mostly build-time complexity. It should run beside the current parser until all outputs match.

Decision: defer this pass; parallel validation PoC only after content baseline validation passes.

### shadcn/ui

Risk is churn, not capability. Current UI already works for the MVP.

Decision: defer.

### Sharp Image Manifest

Risk is low and mostly validation design. It should strengthen existing local-image policy.

Decision: defer this pass; add `validate:images` only after the 25-post content baseline is stable.

### Crawl4AI and Crawlee

Risk is high if used live. Keep fixture-only and local-only. Add a fail-closed CLI guard before any extraction code accepts URLs.

Decision: local mock PoC only.

### Activepieces

Risk comes from connectors. Mock workflow docs are safe; real connectors are not.

Decision: document/mock only.

### Umami

Lower-risk analytics candidate, but still needs privacy review and event taxonomy.

Decision: defer implementation.

### Keystatic

Local content editing can help later, but any admin route or GitHub write mode is unsafe now.

Decision: feasibility doc only.

### Satori/next/og

Existing root OG support is enough. Next 16 docs confirm generated image routes and `params` promise behavior; any article-level OG should be isolated and build-tested.

Decision: defer small PoC.

### PostHog

Powerful but too broad for this MVP. Avoid session replay, person profiles, feature flags, and surveys before privacy policy and product scope mature.

Decision: defer.

### Fumadocs

Useful for documentation sites, but adds route/content architecture not needed for AdSense approval.

Decision: defer.

### Windmill

Strong internal workflow platform, but AGPL/commercial and infra/secrets risks are too high for this stage.

Decision: defer.

### Remotion

Not relevant to article approval MVP and license conditions need review.

Decision: defer.

### Dify

Public AI/chat is explicitly forbidden. License and privacy risks add to the block.

Decision: reject for MVP.

### n8n

Production automation is explicitly hold/avoid. License and external side effects are not acceptable now.

Decision: reject for now.

## Required Validation for Any Future PR

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

Additional future commands:

```bash
npm run build-search
npm run validate:images
```

## Forbidden Side Effects Checklist

Every future PR must explicitly report:

- `deploy_executed=false`
- `push_executed=false`
- `supabase_migration_applied=false`
- `live_crawler_run=false`
- `paid_api_called=false`
- `public_routes_added=false`
- `public_ai_added=false`
- `auth_admin_added=false`
- `affiliate_or_product_routes_added=false`
- `real_secrets_added=false`
