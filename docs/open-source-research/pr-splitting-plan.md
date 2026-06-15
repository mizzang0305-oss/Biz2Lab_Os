# Biz2Lab Open Source PR Splitting Plan

Date: 2026-06-15
Status: proposal only
Scope: docs only

## Global PR Rules

No open-source PR begins until the Phase 2 Korean 25-post content baseline has passed local validation and route lockdown checks. The content expansion pass must stay separate from Pagefind, Content Collections, image manifest, crawler, workflow, analytics, CMS, AI, CommerceAuto, and multilingual implementation.

No PR may:

- Deploy.
- Publish `/en` or `/ja`.
- Add Amazon, product, review, affiliate, lottery, crawler, tool, public AI, chat, auth, admin, or CommerceAuto public routes.
- Run production DB writes.
- Apply Supabase migrations.
- Call paid APIs.
- Use real secrets.
- Run live crawler jobs without explicit approval.

Every PR must run:

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

## PR1: Pagefind Activation

### Scope

Activate static Pagefind search only after generated index assets exist.

### Files to Touch

- `scripts/build-search.ts`
- `components/search/SearchBox.tsx` only if needed
- `.env.example`
- `docs/architecture/pagefind-search-status.md`
- `tests/biz2lab-policy.test.ts`
- generated `public/pagefind/**` if accepted into repo

### Validation Commands

```bash
npm run build
npm run build-search
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Rollback

Files to revert:

- `scripts/build-search.ts`
- `components/search/SearchBox.tsx`
- `.env.example`
- `docs/architecture/pagefind-search-status.md`
- `tests/biz2lab-policy.test.ts`
- `public/pagefind/**`

Package changes to undo:

- None expected; Pagefind is already present.

Expected state after rollback:

- Search box remains placeholder.
- `NEXT_PUBLIC_PAGEFIND_ENABLED=false`.
- No `public/pagefind` dependency required.

## PR2: Content Collections Validation PoC

### Scope

Add Content Collections as a parallel validation path only.

### Files to Touch

- `content-collections.ts`
- `scripts/validate-content-collections.ts`
- `package.json`
- `package-lock.json`
- `tests/biz2lab-policy.test.ts` or new test file
- `docs/open-source-research/content-collections-poc-notes.md`

### Validation Commands

```bash
npm run validate:content-collections
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Rollback

Files to revert/remove:

- `content-collections.ts`
- `scripts/validate-content-collections.ts`
- related tests
- `docs/open-source-research/content-collections-poc-notes.md`

Package changes to undo:

- Remove Content Collections packages from `package.json`.
- Revert `package-lock.json`.

Expected state after rollback:

- Runtime content pipeline remains `lib/posts.ts`.
- Existing validators still pass.

## PR3: Image Asset Manifest

### Scope

Add image manifest validation around the current Sharp pipeline.

### Files to Touch

- `scripts/optimize-images.ts`
- `scripts/validate-images.ts`
- `package.json`
- `public/images/posts/manifest.json`
- `docs/image-engine/image-rules.md`
- image policy tests

### Validation Commands

```bash
npm run optimize-images
npm run validate:images
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Rollback

Files to revert/remove:

- `scripts/validate-images.ts`
- `scripts/optimize-images.ts`
- `public/images/posts/manifest.json`
- image policy tests
- `docs/image-engine/image-rules.md`

Package changes to undo:

- Remove `validate:images` script.
- No dependency changes expected.

Expected state after rollback:

- Existing hero images still render.
- `validate:posts` remains the image existence gate.

## PR4: Research Engine Local-Only PoC Docs + Mock Runner

### Scope

Document and optionally add a mock extraction runner that reads local fixtures only.

### Files to Touch

- `docs/research-engine/local-extraction-poc.md`
- `scripts/research/mock-extract.ts` or `.py`
- `tests/fixtures/research/*.html`
- `tests/research-extraction.test.ts`
- `package.json` if adding a mock command

### Validation Commands

```bash
npm run research:mock-extract
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Rollback

Files to revert/remove:

- `docs/research-engine/local-extraction-poc.md`
- `scripts/research/mock-extract.*`
- `tests/fixtures/research/**`
- `tests/research-extraction.test.ts`
- generated mock output

Package changes to undo:

- Remove mock command.
- Remove Crawlee/Crawl4AI packages if added.
- Revert lockfile.

Expected state after rollback:

- No research runner remains.
- Existing crawler policy docs remain.
- No public crawler route exists.

## PR5: Activepieces Workflow Design Docs

### Scope

Create mock workflow documentation for editorial operations.

### Files to Touch

- `docs/workflows/activepieces-editorial-workflows.md`
- `docs/workflows/examples/*.json`
- optional JSON validation test

### Validation Commands

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Rollback

Files to revert/remove:

- `docs/workflows/activepieces-editorial-workflows.md`
- `docs/workflows/examples/*.json`
- workflow tests

Package changes to undo:

- None expected.

Expected state after rollback:

- No workflow docs or mock workflow artifacts remain.
- No connectors or secrets exist.

## PR6: Analytics Event Taxonomy

### Scope

Document analytics events before any analytics provider is installed.

### Files to Touch

- `docs/analytics/event-taxonomy.md`
- `lib/analytics-events.ts` only if adding type-only constants without network calls
- `app/ko/privacy/page.tsx` only if privacy language needs non-tracking clarification
- tests for event names if code constants are added

### Validation Commands

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Rollback

Files to revert/remove:

- `docs/analytics/event-taxonomy.md`
- `lib/analytics-events.ts` changes
- privacy page changes
- analytics tests

Package changes to undo:

- None expected. Do not install Umami/PostHog in this PR.

Expected state after rollback:

- No analytics script.
- No network events.
- Existing click-event fallback remains unchanged.

## PR7: Keystatic CMS Feasibility Doc

### Scope

Document Keystatic feasibility and blocked route/auth risks. Do not install or expose CMS.

### Files to Touch

- `docs/open-source-research/keystatic-feasibility.md`
- optional update to this PR plan

### Validation Commands

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Rollback

Files to revert/remove:

- `docs/open-source-research/keystatic-feasibility.md`

Package changes to undo:

- None. Do not install Keystatic in this PR.

Expected state after rollback:

- No CMS files.
- No admin route.
- No GitHub write mode.

## Cross-PR Dependency Order

0. Phase 2 content baseline must be stable first.
1. PR1 Pagefind activation.
2. PR2 Content Collections validation PoC.
3. PR3 Image asset manifest.
4. PR4 Research local-only mock.
5. PR5 Activepieces workflow docs.
6. PR6 Analytics event taxonomy.
7. PR7 Keystatic feasibility doc.

After the content baseline is stable, PR1 and PR3 are the only near-term implementation candidates. PR2 is validation-only. PR4 and PR5 are mock/docs only. PR6 and PR7 must remain docs-first.

## Merge Gate Template

Each PR description should include:

```text
deploy_executed=false
push_executed=false
supabase_migration_applied=false
live_crawler_run=false
paid_api_called=false
public_routes_added=false
public_ai_added=false
auth_admin_added=false
affiliate_or_product_routes_added=false
real_secrets_added=false
```

Each PR should also list:

- Validation command outputs.
- Public route diff.
- Package diff.
- Files intentionally generated.
- Rollback steps verified or documented.
