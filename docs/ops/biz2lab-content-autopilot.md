# Biz2Lab Content Autopilot Operating Guide

This guide defines the reusable operating mode for continuing the Biz2Lab
content automation workflow from the current repository state with one short
instruction:

`Biz2Lab ?ㅽ넗?뚯씪??怨꾩냽 吏꾪뻾??`

Autopilot means: inspect the current repository state, continue in the correct
order, stop only at hard safety gates, never fake data, never bypass critical
gates, and always report the exact next step.

## 1. Safety Policy

Hard rules:

- No manual deploy.
- No manual Vercel redeploy.
- No external business APIs.
- No DB writes.
- No payment, message, or notification actions.
- No fake Search Console, GA4, Vercel Analytics, Umami, clicks, impressions,
  CTR, ranking, or referrer data.
- No `meta keywords`.
- No official logos.
- No copied product screenshots.
- No placeholder images.
- No `/admin` or `/login` public route work.
- No sitemap or RSS inclusion for noindex ops pages.
- Do not commit `.codex` folders.
- Do not commit `data/content-series-run-state.json`.
- Do not touch `.codex-remote-attachments/`.
- Do not touch `.codex/config.toml`.

Publication PR merge is allowed only after full review. If scope, data, or
validation is ambiguous, stop and report `OWNER_REVIEW_REQUIRED`.

## 2. State Detection

Start every run by anchoring the checkout:

```powershell
cd C:\Users\LOVE\MyProjects\Biz2Lab_Os
git fetch origin
git checkout master
git pull --ff-only origin master
git status --short
```

Autopilot must detect and report:

- `currentTopic` from `data/content-series-state.json`.
- Scheduler dry-run gate from `npm run content:series:scheduler -- --dry-run`.
- Open PRs from `gh pr list --state open --limit 50`.
- Existing topic PRs for the current topic.
- Existing prompt package PRs for the current topic hero package.
- Existing publication PRs for the current topic article and assets.
- Missing local Codex image artifacts.
- Active-hours gate.
- Cadence gate.
- Dirty worktree.
- `data/content-series-run-state.json` dirty runtime state.
- Vercel check status.
- Publication state advancement.
- Keyword map requirement.
- SEO dashboard requirement.

Run the read-only helper when a quick summary is useful:

```powershell
npm run ops:autopilot-status
```

The helper reports current topic, scheduler gate, open PRs, artifact status,
prompt package status, publication file status, keyword map status, and the
next recommended action. It does not merge, deploy, commit, generate articles,
or import images.

## 3. Dirty Worktree Policy

If unknown tracked files are dirty, stop with `BLOCKED_DIRTY_WORKTREE`.

If the only tracked dirty file is:

```text
data/content-series-run-state.json
```

then treat it as recoverable runtime state:

```powershell
git diff -- data/content-series-run-state.json
if (!(Test-Path ".tmp")) { New-Item -ItemType Directory -Path ".tmp" | Out-Null }
Copy-Item data\content-series-run-state.json .tmp\content-series-run-state.autopilot-backup.json -Force
git restore -- data/content-series-run-state.json
git status --short
```

Continue only after the tracked worktree is clean apart from protected
untracked files.

## 4. Topic Flow

Use the repository state as source of truth. Read:

- `data/content-series-state.json`
- `data/content-series-topics.json`
- `data/content-series-schedule.json`
- `content/ko/content-index.json`
- `data/image-assets.json`
- `data/seo-keyword-map.json`

Do not hardcode the topic sequence if the files differ. At the time this guide
was written, the expected queue after PocketBase was:

- `supabase-self-hosting-cost-operations-caution`
- `meilisearch-blog-product-search-automation`
- `typesense-product-document-search-automation`
- `umami-open-source-analytics-ga-alternative`

### 4.1 Prompt Package PR Exists

If an open PR contains only the current topic prompt package files:

- `image-requests/generated/<slug>-hero.md`
- `image-requests/generated/<slug>-hero.prompt.md`
- `image-briefs/generated/<slug>-hero.json`

then:

1. Review scope.
2. Verify remote checks.
3. Run image prompt/brief validation if needed.
4. Merge only if the autopilot merge policy is satisfied.
5. Align local `master` to `origin/master`.

Stop on scope drift.

### 4.2 Artifact Missing

If no approved local Codex artifact exists under the Codex generated image
root, stop with `WAITING_FOR_CODEX_IMAGE_ARTIFACT` unless the task explicitly
asks for artifact preparation.

Artifact preparation may create only a local Codex-generated artifact and,
when needed, a prompt package PR. It must not create the article or import
raw/public production images in the artifact-only step.

Approved artifact pattern:

```text
C:\Users\LOVE\.codex\generated_images\<slug>-hero\<slug>-hero.png
```

Reject:

- placeholders
- empty files
- official logos
- copied product screenshots
- random web images
- manual drops outside the approved Codex artifact root

### 4.3 Artifact Exists and Prompt Package Is Merged

Run a topic dry-run:

```powershell
npm run content:series:scheduler -- --topic <topic> --use-latest-codex-artifact --dry-run
```

Interpretation:

- `DRY_RUN_READY`: run scheduler non-dry once.
- `CADENCE_NOT_DUE`: use `--force-check` only if active hours are open.
- `OUTSIDE_ACTIVE_HOURS`: stop; do not bypass.
- `EXISTING_TOPIC_PR`: inspect that PR.
- `WAITING_FOR_CODEX_IMAGE_ARTIFACT`: report artifact mismatch or missing
  artifact.
- `STATE_ADVANCEMENT_REQUIRED`: create a repair PR; do not generate the next
  article.

Force-check dry-run for cadence only:

```powershell
npm run content:series:scheduler -- --topic <topic> --use-latest-codex-artifact --force-check --dry-run
```

Non-dry publication:

```powershell
npm run content:series:scheduler -- --topic <topic> --use-latest-codex-artifact
```

Non-dry publication with cadence force-check:

```powershell
npm run content:series:scheduler -- --topic <topic> --use-latest-codex-artifact --force-check
```

Run non-dry at most once per topic attempt. Do not use `--force-check` to
bypass active hours.

### 4.4 Publication PR Exists

For an open publication PR:

1. Review PR scope.
2. Verify Vercel and preview-comment checks.
3. Verify local validation.
4. Review article framing, cautious claims, internal links, hero image,
   keyword map, SEO dashboard, and queue state.
5. Confirm durable state advancement:
   - current topic is added to `completed`
   - `currentTopic` becomes the next unpublished topic
   - `next[0]` becomes the next unpublished topic
   - `data/content-series-run-state.json` is not committed
6. Merge only when all merge policy gates pass.
7. Wait for the Git-triggered production deploy.
8. Run production smoke.
9. Confirm the scheduler advances to the next topic artifact gate.

### 4.5 Already Published But State Not Advanced

If the current topic article is already published but the state file still
points to it, create a small state repair PR. Do not generate the next article
or image in that repair task.

The repair PR must:

- mark the published topic completed
- advance `currentTopic` and `next[0]`
- preserve later topic order
- avoid `data/content-series-run-state.json`
- add or preserve regression coverage if the root cause is automation logic

## 5. Stop Gates

Stop and report the exact gate when any of these appear:

- unknown dirty tracked files
- Vercel rate limit active
- remote checks fail
- scope drift
- DB, payment, API, or message files changed
- deploy config changed
- real analytics credentials appear
- fake analytics numbers appear
- `meta keywords` appears
- `data/content-series-run-state.json` would be committed
- active-hours gate blocks non-dry publication
- artifact generation fails
- unexpected PR exists
- validation fails and the fix is not obviously scoped

Allowed status labels include:

- `OWNER_REVIEW_REQUIRED`
- `BLOCKED_DIRTY_WORKTREE`
- `BLOCKED_SCOPE_DRIFT`
- `BLOCKED_REMOTE_CHECKS`
- `WAITING_FOR_CODEX_IMAGE_ARTIFACT`
- `EXISTING_TOPIC_PR`
- `OUTSIDE_ACTIVE_HOURS`
- `CADENCE_NOT_DUE`
- `STATE_ADVANCEMENT_REQUIRED`
- `VALIDATION_FAILED`

## 6. Merge Policy

Autopilot may merge only when all are true:

- PR scope matches expected files.
- Vercel checks pass.
- Local validation passes.
- No sensitive files changed.
- No fake analytics.
- No deploy config changes.
- No external API side effects.
- No run-state file committed.
- Production article/image scope is correct.
- State auto-advance is correct for publication PRs.

If unsure, stop and report `OWNER_REVIEW_REQUIRED`.

## 7. Standard Validation Pack

Use this validation pack before merging publication or automation PRs:

```powershell
npm run validate:posts
npm run validate:images
npm test
npm run lint
npm run typecheck
npm run build
npm run check:links
npm run validate:seo
npm run audit:content-authority
npm run audit:image-briefs
npm run audit:image-prompts
npm run image-skill:plan
npm run image-skill:validate
git diff --check
git diff --cached --check
```

Known Turbopack NFT warnings are acceptable only if `npm run build` exits 0.

## 8. SEO And Analytics Policy

Autopilot must preserve:

- keyword map coverage for every published Korean article
- no fake analytics
- no invented Search Console query, click, impression, CTR, ranking, or
  referrer data
- dashboard empty states when analytics are not connected
- noindex/nofollow for `/ko/ops/seo-dashboard`
- sitemap/RSS exclusion for noindex ops pages
- canonical URLs on `https://www.biz2lab.com`

For every new publication PR:

- add the article route to `data/seo-keyword-map.json`
- keep the primary keyword natural
- keep search intent and cluster appropriate
- run SEO/dashboard tests
- confirm no `meta keywords` were added

## 9. Production Smoke Policy

After a normal Git-triggered production deployment is ready, check:

- article route HTTP 200
- no auth wall
- no 404
- H1 visible
- body visible
- conclusion/CTA visible
- hero WebP loads
- correct alt text
- no placeholder
- mobile width 390 has no horizontal overflow
- title/meta description/canonical/OG image correct
- internal links visible
- series hub includes the article
- SEO dashboard reflects the keyword map without fake analytics
- sitemap and RSS include published public articles when expected
- robots references sitemap and does not block `/ko`

Do not manually deploy or manually redeploy Vercel.

## 10. One-Line Invocation

Use this exact short instruction in future Codex runs:

```text
Biz2Lab ?ㅽ넗?뚯씪??怨꾩냽 吏꾪뻾??
```

The agent should then read this guide, run `npm run ops:autopilot-status`,
inspect the current state, and proceed only as far as the safety gates allow.
