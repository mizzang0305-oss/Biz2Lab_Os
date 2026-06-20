# Ruflo Biz2Lab OS PoC Plan

Date: 2026-06-21
Status: report-only PoC plan
Scope: Biz2Lab_OS local repository review workflow only

## A. Overall Result

Ruflo is a plausible fit as a report-only assistant layer for Biz2Lab_OS, but it should not be installed into the production content workflow yet. The safe first PoC is `Ruflo PR Reviewer`: inspect one content PR or isolated worktree diff and produce a markdown review report only.

The PoC must not let Ruflo write content, merge pull requests, deploy, mutate environment variables, call databases, call payment/message/business APIs, or enable automatic publishing.

External Ruflo references reviewed on 2026-06-21:

- https://github.com/ruvnet/ruflo
- https://github.com/ruvnet/ruflo/wiki/Plugins

Local Biz2Lab_OS surfaces reviewed:

- `package.json`
- `content/ko/**`
- `data/content-series-state.json`
- `data/content-series-schedule.json`
- `scripts/content-series-orchestrator.ts`
- `scripts/content-series-scheduler-runner.ts`
- `scripts/validate-posts.ts`
- `scripts/validate-images.ts`
- `scripts/validate-seo.ts`
- `scripts/audit-content-authority.ts`
- `scripts/setup-content-series-task.ps1`
- `lib/posts.ts`
- `lib/schema.ts`
- `lib/seo.ts`
- `lib/site.ts`
- `lib/locales.ts`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/rss.xml/route.ts`
- `app/admin/content-automation/page.tsx`
- `lib/admin/content-automation-auth.ts`
- `lib/admin/content-automation-service.ts`
- `lib/admin/content-automation-actions.ts`
- `proxy.ts`
- `docs/content-engine/open-source-automation-series.md`
- `docs/image-engine/local-image-skill-bridge.md`
- `docs/image-engine/codex-image-skill-workflow.md`
- `docs/deployment/vercel-preview-checklist.md`
- `docs/deployment/live-domain-smoke-report.md`
- `docs/deployment/phase-4-1-final-adsense-submission-checklist.md`

## B. What Ruflo Should Do

Ruflo should be limited to review, summarization, and evidence collation during the PoC.

Allowed PoC tasks:

- Inspect a content PR diff and changed files.
- Read public content markdown, image brief JSON, image request markdown, and validation scripts.
- Produce a report-only review with findings, missing evidence, and command checklist status.
- Suggest tests or validation commands without editing test files automatically.
- Run local read-only or build/test commands when explicitly approved for the PoC run.
- Verify local route metadata expectations from source files, not production mutation.
- Summarize whether content, images, SEO, route surface, and admin/private route gates look ready for human review.

## C. What Ruflo Must Not Do

Ruflo must not perform any write, merge, deployment, publishing, or production-connected action in this PoC.

Forbidden actions:

- Do not install Ruflo into the production workflow.
- Do not run `npx ruflo init` without owner approval.
- Do not install global tools.
- Do not add hooks, daemons, scheduled workers, or background autopilot loops.
- Do not grant Ruflo write access to `master` or production branches.
- Do not let Ruflo edit `content/ko/**`, `data/**`, `image-briefs/**`, `image-requests/**`, `assets/images/raw/**`, or `public/images/posts/**`.
- Do not let Ruflo commit, push, merge, auto-merge, deploy, or create production releases.
- Do not let Ruflo update `.env*`, Vercel settings, Google setup values, Supabase env, Search Console, GA4, AdSense, DNS, or `ads.txt`.
- Do not call Supabase, payment APIs, message/notification APIs, external business APIs, production POST endpoints, or upload APIs.
- Do not call external image generation, scraping, stock image, ecommerce, Amazon, or product data APIs.
- Do not enable public AI, upload, admin, login, commerce, affiliate, reviews, products, shop, lottery, English, or Japanese route surfaces.
- Do not store secrets, raw customer data, private contracts, payment data, or unpublished business data in Ruflo memory.

## D. Local Workflow Fit

| Biz2Lab_OS workflow | Current local shape | Safe Ruflo fit | PoC rule |
| --- | --- | --- | --- |
| Content generation | `scripts/content-series-orchestrator.ts`, `data/content-series-*.json`, markdown under `content/ko/**` | Review generated article diffs and compare to frontmatter/schema/authority rules | Report only; no content edits |
| Image brief and Codex image artifact import | `image-briefs/**`, `image-requests/**`, `assets/images/raw/**`, `public/images/posts/**`, `npm run image-skill:*` | Check artifact provenance, slug-mapped paths, alt/caption, prompt safety, license caution | No image generation, no file import |
| Validation scripts | `validate:posts`, `validate:images`, `validate:seo`, `audit:*`, `check:links` | Run or summarize required local command evidence | No bypass suggestions |
| Route smoke | `docs/deployment/*`, `staticPublicRoutes`, `forbiddenPublicRoutePrefixes` | Produce a smoke checklist for allowed/forbidden routes | Local or preview GET-only checks only |
| SEO validation | `lib/seo.ts`, `lib/site.ts`, `scripts/validate-seo.ts` | Check canonical, OG, Twitter, JSON-LD, noindex, sitemap/RSS consistency | No metadata mutation |
| Sitemap/RSS/robots | `app/sitemap.ts`, `app/robots.ts`, `app/rss.xml/route.ts` | Check public route/post inclusion and forbidden route exclusion | Report only |
| Windows scheduler | `scripts/setup-content-series-task.ps1`, scheduler runner, schedule JSON | Review no-auto-merge, no-deploy, daily limit, PR limit, artifact gates | No task creation or scheduler edits |
| Admin console disabled state | `siteSettings.featureFlags.adminEnabled=false`, env-gated page, auth proxy, noindex headers | Confirm admin/private route exposure remains blocked | No admin enablement |

## E. Plugin Candidates

| Candidate | Fit | Allowed PoC use | Decision |
| --- | --- | --- | --- |
| `ruflo-docs` | Medium | Generate a review report template from local files | Later, report-only |
| `ruflo-browser` | Medium | Local preview/browser smoke for public and forbidden routes | Later, GET-only |
| `ruflo-testgen` | Low to medium | Suggest missing tests from diff | Report-only suggestions; no generated test commits |
| `ruflo-workflows` | Medium | Encode the PR reviewer checklist as a reusable manual workflow | Later, no timers/autopilot |
| `ruflo-agentdb` / memory | Low for first PoC | Store non-sensitive repo checklist outcomes | Defer until memory policy is written |
| `ruflo-rag-memory` | Medium later | Retrieve local docs for repeated content review patterns | Defer; local docs only, no secrets |
| `ruflo-security-audit` | Medium | Check dependency/config risk and secret exposure in PR diffs | Later, report-only |
| `ruflo-aidefence` | Medium | Detect PII, prompt injection, unsafe public wording | Later, report-only |
| `ruflo-autopilot` | High risk | None | Reject for Biz2Lab_OS PoC |
| `ruflo-loop-workers` | High risk | None | Reject for Biz2Lab_OS PoC |
| `ruflo-federation` | High risk | None | Reject until trust/data policy exists |
| `ruflo-migrations` | High risk | None | Reject; DB writes are out of scope |

The official Ruflo docs describe a lightweight plugin path and a fuller `npx ruflo init` path with much broader hooks/MCP/daemon surface. Biz2Lab_OS should not use the full init path until a separate owner-approved installation review exists.

## F. Risk Matrix

| Risk | Likelihood | Impact | Mitigation | PoC status |
| --- | --- | --- | --- | --- |
| Ruflo writes or publishes content automatically | Medium | High | Run only against an isolated worktree/PR diff with write tools disabled | Blocked by policy |
| Auto-merge or deploy path is enabled | Low to medium | High | Keep Ruflo out of scheduler and CI/CD; owner merge only | Blocked by policy |
| Production env or secrets leak into memory | Medium | High | No `.env*` reads beyond examples; no secret capture; no persistent memory in first PoC | Blocked by policy |
| Admin/private route exposure | Low | High | Require `validate:seo`, `audit:content-authority`, route smoke checklist | Review item |
| Bad SEO/canonical/sitemap/RSS change | Medium | Medium | Review `siteConfig`, `createMetadata`, sitemap, robots, RSS, and `validate:seo` output | Review item |
| Image licensing/provenance uncertainty | Medium | High | Require local Codex artifact provenance, slug filenames, local WebP, license/source caution | Review item |
| Unsafe public wording or AdSense-sensitive terms | Medium | Medium | Review forbidden wording and run content authority audit | Review item |
| Ruflo background workers drift scope | Medium | High | No loop workers, autopilot, federation, or full init in first PoC | Blocked by policy |
| Generated test/code churn hides review signal | Medium | Medium | No automatic testgen writes; report suggested tests only | Blocked by policy |
| External API calls during review | Low to medium | High | Local commands only; GET-only browser smoke; no DB/payment/message/business APIs | Blocked by policy |

## G. Sandbox And Worktree-Only Setup

Recommended PoC setup:

1. Create or reuse an isolated worktree from the target content PR branch.
2. Keep the Ruflo run on a non-production branch, never on `master`.
3. Use a local-only report output path such as `.tmp/ruflo-review/<pr-number>.md` during experimentation.
4. Copy only the final human-reviewed report into the PR discussion if desired.
5. Disable Ruflo write access to protected paths:
   - `content/ko/**`
   - `data/**`
   - `image-briefs/**`
   - `image-requests/**`
   - `assets/images/raw/**`
   - `public/images/posts/**`
   - `app/**`
   - `lib/**`
   - `scripts/**`
   - `.env*`
   - `.github/**`
6. Permit read access to local docs, tests, scripts, package metadata, and changed files only.
7. Use explicit command allowlist:
   - `git diff --name-only`
   - `git diff --check`
   - `npm run validate:posts`
   - `npm run validate:images`
   - `npm run validate:seo`
   - `npm test`
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
   - optional: `npm run check:links`
   - optional: `npm run audit:content-authority`
   - optional: `npm run audit:interactions`
8. Disallow network writes and production POSTs. Browser checks, if any, must be GET-only against localhost or a reviewed preview URL.

## H. No Auto-Merge Or Deploy Policy

Ruflo must not be a deploy actor for Biz2Lab_OS.

Required policy:

- Owner-reviewed PR remains mandatory.
- Git-triggered deployment may happen only after owner merge under the existing repository flow.
- Ruflo never runs `gh pr merge`, Vercel deploy commands, DNS changes, Google setup changes, Supabase migrations, or scheduler registration.
- Ruflo never relaxes `autoMerge: false`, `manualDeploy: false`, `requireCodexArtifact: true`, `maxOpenPrs`, `maxArticlesPerDay`, or active-hours gates.
- Ruflo can report a post-merge production smoke checklist, but must not execute production mutation.

## I. Recommended First PoC: Ruflo PR Reviewer

Purpose:

Use Ruflo to inspect a content PR and produce a report only. The report should make human review faster without changing files.

Inputs:

- Target PR number or local branch.
- Base branch, expected `master`.
- Changed files from `git diff --name-only`.
- Validation command outputs supplied by the human or collected locally by the reviewer.

Output:

- One markdown report with findings ordered by severity.
- No commits, no code edits, no content edits, no generated files under production paths.

Required checks:

| Check | Evidence source |
| --- | --- |
| SEO metadata | Frontmatter, `lib/seo.ts`, `scripts/validate-seo.ts`, article route metadata |
| Route path | `content/ko/<category>/<slug>.md`, `lib/posts.ts`, `app/ko/[category]/[slug]/page.tsx` |
| Hero/raw image assets | `assets/images/raw/**`, `public/images/posts/**`, `data/image-assets.json`, `scripts/validate-images.ts` |
| Alt text | `heroAlt`, inline markdown image alt/title, image brief `altKo` and `captionKo` |
| Related links | `relatedPosts`, markdown `/ko/**` links, `scripts/check-links.ts` |
| Content authority headings | `scripts/audit-content-authority.ts`, H2/H3 structure, FAQ count |
| Validation commands | Required command list and pass/fail output |
| Production smoke checklist | Allowed routes, forbidden routes, sitemap, robots, RSS, representative images |
| License/source caution | Topic official sources, image prompt safety, no stock/hotlink/API assumptions |
| Forbidden public wording | Affiliate/Amazon/lotto/product/shop/review/private wording checks |
| Admin/private route exposure | `forbiddenPublicRoutePrefixes`, protected admin route, proxy/auth/noindex checks |

Suggested report sections:

1. Scope and branch.
2. Changed files.
3. Blocking findings.
4. Non-blocking findings.
5. SEO and route review.
6. Image provenance and alt review.
7. Content authority and links.
8. Validation command status.
9. Production smoke checklist.
10. Safety policy confirmation.

## J. PoC Success Criteria

The first PoC is successful only if all criteria are met:

- Ruflo produces a useful PR review report with zero repository file mutations.
- Ruflo does not install itself into the production workflow.
- Ruflo does not create hooks, daemons, scheduled tasks, CI jobs, or branch protection changes.
- Ruflo does not commit, push, merge, deploy, or publish.
- Ruflo does not read or store secrets.
- Ruflo does not call DB/payment/message/external business APIs.
- The report catches at least the same categories currently covered by local scripts: posts, images, SEO, content authority, route safety, and admin/private route gates.
- A maintainer can reproduce the review with local commands.
- The PoC can be removed by deleting local Ruflo sandbox files only.

## K. Rollback Plan

If the PoC misbehaves:

1. Stop the Ruflo process.
2. Delete the isolated worktree or Ruflo sandbox directory.
3. Confirm no production files changed:
   - `git status -sb`
   - `git diff --name-only`
4. Confirm protected files were not modified:
   - `.env*`
   - `.github/**`
   - `data/content-series-*.json`
   - `scripts/setup-content-series-task.ps1`
   - `scripts/content-series-scheduler-runner.ts`
   - `app/admin/**`
   - `app/api/admin/**`
   - `proxy.ts`
5. Revoke any test token or connector created specifically for the PoC.
6. If a report was posted to a PR and contains unsafe content, delete the comment and rotate any exposed value.
7. Do not retry with broader permissions until a new owner-approved plan exists.

## L. Validation For This Report PR

Run these commands for the report-only PR:

```powershell
npm run validate:posts
npm run validate:images
npm test
npm run lint
npm run typecheck
npm run build
git diff --check
```

Notes:

- `npm run validate:seo` is strongly recommended for any actual Ruflo content review PoC, but the user-requested validation list for this report PR does not include it.
- No Ruflo install command should be run for this report PR.

## M. Safety Confirmation

This plan intentionally does not:

- Install Ruflo.
- Register Ruflo as MCP.
- Add Ruflo plugins.
- Add CI jobs.
- Add scheduled tasks.
- Modify env vars.
- Modify production content.
- Modify images.
- Modify admin routes.
- Enable automatic content publishing.
- Deploy.
- Auto-merge.
