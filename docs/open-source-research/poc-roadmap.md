# Biz2Lab Open Source PoC Roadmap

Date: 2026-06-15
Status: proposal only
Scope: docs only, no implementation in this pass

## Global PoC Rules

Do not execute these PoCs during the Phase 2 content expansion pass. Phase 2 is content-first: stabilize the 25 Korean posts, route lockdown, sitemap, RSS, robots, link checks, and build first.

PoCs may start only after the 25-post baseline is stable and a separate PR scope is approved.

All PoCs must preserve the AdSense MVP boundary:

- No deploy.
- No push unless separately requested later.
- No Supabase migration apply.
- No live crawler jobs.
- No paid API calls.
- No public route expansion.
- No public AI, chat, auth, admin, affiliate, product, review, Amazon, crawler, lottery, or tools features.
- No real secrets.
- No production DB writes.

Every PoC must finish with:

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

## PoC 1: Pagefind Activation

### Objective

Activate the existing Pagefind placeholder only after the 25-post content baseline is stable and a static output path plus generated index assets exist. Keep search fully static and client-side.

### Non-Goals

- No external search service.
- No query logging.
- No analytics tied to search terms.
- No new public routes.
- No server route handlers for search.

### Files Affected

- Modify: `scripts/build-search.ts`
- Modify: `components/search/SearchBox.tsx` only if the current loader needs minor compatibility fixes.
- Modify: `.env.example`
- Modify: `docs/architecture/pagefind-search-status.md`
- Possible generated output: `public/pagefind/**`
- Test: `tests/biz2lab-policy.test.ts`

### Commands

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

### Success Criteria

- `npm run build-search` generates `public/pagefind/pagefind.js` or explicitly skips with documented reason.
- Search remains disabled when `NEXT_PUBLIC_PAGEFIND_ENABLED=false`.
- Search loads only when `NEXT_PUBLIC_PAGEFIND_ENABLED=true` and generated assets exist.
- Excerpts remain plain text.
- No forbidden route appears in search assets, sitemap, or RSS.
- `/en`, `/ja`, and all forbidden prefixes remain 404.

### Rollback Plan

- Revert `scripts/build-search.ts`.
- Revert `components/search/SearchBox.tsx` if modified.
- Revert `.env.example` changes.
- Remove `public/pagefind/**`.
- Revert Pagefind status doc changes.
- Re-run validation suite.

### Tests

- Extend existing Pagefind policy test to assert:
  - no `dangerouslySetInnerHTML`;
  - disabled-by-default env;
  - missing index fallback message;
  - generated asset path is not required in development.

### Side Effects

- Local file generation only under `public/pagefind/**`.
- No DB writes.
- No external API calls.

### Approval Gate

Before merging a Pagefind activation PR, confirm:

- Generated assets are present.
- Search smoke test works locally.
- Privacy policy does not need query logging language because no query logging is added.

## PoC 2: Content Collections Parallel Validation

### Objective

Add Content Collections as a parallel content validation layer after the content baseline is stable, without replacing `lib/posts.ts`.

### Non-Goals

- No content route rewrite.
- No sitemap/RSS behavior change.
- No MDX rendering change.
- No draft publication.
- No public route changes.

### Files Affected

- Create: `content-collections.ts`
- Create: `scripts/validate-content-collections.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `tests/biz2lab-policy.test.ts`
- Docs: `docs/open-source-research/content-collections-poc-notes.md`

### Commands

```bash
npm install -D @content-collections/core @content-collections/md
npm run validate:content-collections
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Success Criteria

- Content Collections reads all 25 Korean Markdown posts.
- It validates the same required frontmatter as `lib/schema.ts`.
- Its output count matches:
  - automation 7;
  - sales-ops 7;
  - small-business 6;
  - contracts-payments 5.
- Existing app runtime still uses `lib/posts.ts`.
- Sitemap and RSS stay unchanged.

### Rollback Plan

- Remove `content-collections.ts`.
- Remove `scripts/validate-content-collections.ts`.
- Remove package additions from `package.json` and `package-lock.json`.
- Remove related tests/docs.
- Run `npm install` if lockfile needs normalization.
- Re-run full validation suite.

### Tests

- Add a test that compares Content Collections count and slugs against `getPublicPosts()`.
- Keep the existing `getPublicPosts()` tests as the source of runtime truth.

### Side Effects

- Package install only.
- Local validation only.
- No DB writes.
- No network calls at runtime.

### Approval Gate

Do not replace `lib/posts.ts` unless a later PR proves exact parity for:

- article pages;
- hub pages;
- sitemap;
- RSS;
- JSON-LD;
- related posts;
- internal link checks.

## PoC 3: Sharp Image Manifest and `validate:images`

### Objective

Make the existing Sharp image manifest actionable after the content baseline is stable by adding validation that all public post hero images exist, are local, and are represented by expected derivative sizes where applicable.

### Non-Goals

- No new image generation UI.
- No external image scraping.
- No hotlinked images.
- No CommerceAuto image feed.
- No AI image generation in the public app.

### Files Affected

- Modify: `scripts/optimize-images.ts`
- Create: `scripts/validate-images.ts`
- Modify: `package.json`
- Modify: `package-lock.json` only if script/package changes require it.
- Modify: `public/images/posts/manifest.json` when images are regenerated.
- Test: `tests/biz2lab-policy.test.ts` or a new `tests/image-policy.test.ts`
- Docs: `docs/image-engine/image-rules.md`

### Commands

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

### Success Criteria

- Every published post references a local `/images/posts/*.webp` hero image.
- Every referenced hero image exists.
- Manifest records derivative files for generated source slugs.
- The validator explicitly allows intentional image reuse across posts.
- No external image URLs exist in published content.

### Rollback Plan

- Remove `scripts/validate-images.ts`.
- Revert `scripts/optimize-images.ts`.
- Revert `package.json` script additions.
- Revert regenerated `public/images/posts/manifest.json` if needed.
- Re-run full validation suite.

### Tests

- Assert `heroImage` starts with `/images/posts/`.
- Assert `fs.existsSync(public + heroImage)`.
- Assert no `http` hero image.
- Assert manifest JSON parses and each entry has `slug`, `width`, `output`, and `source`.

### Side Effects

- Local image generation only.
- Local file updates under `public/images/posts/**`.
- No external network calls.

### Approval Gate

Before merging, manually confirm image reuse is intentional and every article has descriptive Korean `heroAlt`.

## PoC 4: Crawl4AI or Crawlee Local-Only Research Extraction

### Objective

Design and test a local-only research extraction runner using checked-in mock HTML fixtures, without fetching live URLs.

### Non-Goals

- No live crawling.
- No public crawler route.
- No paid extraction API.
- No bypassing robots, paywalls, or access controls.
- No automatic article generation from extracted text.
- No storing full third-party articles.

### Files Affected

- Create: `docs/research-engine/local-extraction-poc.md`
- Create: `scripts/research/mock-extract.ts` or `scripts/research/mock-extract.py`
- Create: `tests/fixtures/research/*.html`
- Create: `tests/research-extraction.test.ts`
- Modify: `package.json` only to add a local mock command.

### Commands

For a TypeScript Crawlee-style mock:

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

For a Python Crawl4AI-style mock, only after explicit approval to add Python tooling:

```bash
python --version
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Success Criteria

- Fixture input is local and checked in.
- Output is local JSON under a non-public temp or fixture output path.
- Output contains source title, URL placeholder, extracted summary, citation fields, and extraction timestamp.
- No network request is made during tests.
- No output is copied into public content automatically.

### Rollback Plan

- Remove mock extraction script.
- Remove fixtures.
- Remove package script.
- Remove tests.
- Remove generated local output.
- Re-run full validation suite.

### Tests

- Assert extractor reads only fixture files.
- Assert output does not contain full article text beyond allowed excerpt length.
- Assert no URLs under forbidden route prefixes are produced.
- Assert command fails closed when a live URL is passed without explicit `--allow-live` gate.

### Side Effects

- Local fixture reads only.
- Local JSON output only.
- No live HTTP.
- No DB writes.

### Approval Gate

Any transition from fixture mode to live crawling requires a separate approval question:

`I can run a live local crawler against [exact URL list]. It will make HTTP requests to those sites and write local research JSON only. Proceed?`

## PoC 5: Activepieces Mock Workflow Automation

### Objective

Document and model editorial workflows that could later be implemented in Activepieces without connecting real services.

### Non-Goals

- No Activepieces server install.
- No real connectors.
- No GitHub write token.
- No Supabase write.
- No email/newsletter send.
- No webhook route.
- No production automation.

### Files Affected

- Create: `docs/workflows/activepieces-editorial-workflows.md`
- Create: `docs/workflows/examples/*.json`
- Create: `tests/workflow-docs.test.ts` if workflow JSON should be schema-checked.
- No app runtime files.

### Commands

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

### Success Criteria

- Mock workflow JSON contains no real secrets.
- Workflow steps are editorial-only:
  - content checklist review;
  - image validation reminder;
  - link check reminder;
  - manual approval checkpoint.
- No external action step is executable.
- Docs clearly state all real connectors require separate approval.

### Rollback Plan

- Remove `docs/workflows/activepieces-editorial-workflows.md`.
- Remove `docs/workflows/examples/*.json`.
- Remove workflow schema tests if added.
- Re-run full validation suite.

### Tests

- Optional JSON schema test:
  - no `secret`, `token`, `apiKey`, `password`;
  - no real destination email/webhook URL;
  - every workflow has `manual_approval_required: true`.

### Side Effects

- Docs and mock JSON only.
- No external service.
- No DB writes.
- No secrets.

### Approval Gate

Any real Activepieces connector setup requires explicit approval and must name:

- connector;
- destination service;
- data sent;
- write behavior;
- rollback path.
