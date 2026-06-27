# Biz2Lab Content Autopilot Operating Guide

This guide defines the reusable operating mode for continuing the Biz2Lab
content automation workflow from the current repository state with one short
instruction:

```text
Biz2Lab 오토파일럿 계속 진행해.
```

Autopilot means: inspect the current repository state, continue in the correct
order, stop only at hard safety gates, never fake data, never bypass critical
gates, and always report the exact next step.

## 1. Owner Approval

Owner approval phrase:

```text
BIZ2LAB_GREEN_ZONE_AUTOMERGE_APPROVED
```

This approval applies only to safe content automation. It does not apply to
secrets, DB writes, payments, external business APIs, deploy config, auth,
security, admin/login routes, fake analytics, or manual Vercel actions.

## 2. Safety Policy

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

Autopilot may auto-merge Green-Zone content PRs only when scope, remote checks,
local validation, production-smoke requirements, and safety rules all pass. If
scope, data, validation, or intent is ambiguous, stop and report
`OWNER_REVIEW_REQUIRED`.

## 3. Green / Yellow / Red Zones

### 3.1 Green Zone: Auto-Merge Allowed

Green-Zone auto-merge is allowed only after all relevant checks pass.

Prompt package PR scope:

```text
image-requests/generated/<topic>-hero.md
image-requests/generated/<topic>-hero.prompt.md
image-briefs/generated/<topic>-hero.json
docs/ops/biz2lab-content-autopilot.md
scripts/biz2lab-autopilot-status.mjs
```

Prompt package PR rules:

- no article file
- no raw/public image
- no official logo
- no copied screenshot
- no placeholder
- Vercel PASS
- image audits PASS
- validation PASS

Publication PR scope:

```text
content/ko/automation/<topic>.md
assets/images/raw/<topic>-hero.jpg
public/images/posts/<topic>-hero.webp
public/images/posts/<topic>-400.webp
public/images/posts/<topic>-800.webp
public/images/posts/<topic>-1200.webp
image-requests/generated/<topic>-hero.md
image-requests/generated/<topic>-hero.prompt.md
image-briefs/generated/<topic>-hero.json
content/ko/content-index.json
data/image-assets.json
lib/article-image-concepts.ts
data/content-series-state.json
data/seo-keyword-map.json
series hub / queue docs / tests if required
```

Publication PR rules:

- state auto-advance must be present
- current topic must be marked completed
- next topic must advance correctly
- `data/content-series-run-state.json` must not be committed
- keyword map must be updated
- no fake analytics
- no `meta keywords`
- Vercel PASS
- validation PASS
- production smoke after merge

Small SEO/content cleanup PRs are Green-Zone only when they avoid slug/route
changes, fake analytics, `meta keywords`, secrets, scheduler config, admin/auth
code, and pass links plus validation.

### 3.2 Yellow Zone: Owner Review Required

Create or update the PR, but do not merge automatically. Stop with
`OWNER_REVIEW_REQUIRED` when a PR changes:

```text
app/ko/ops/*
lib/ops-dashboard-auth.ts
middleware.ts
analytics connector code
scheduler/orchestrator core logic
package.json scripts beyond safe helper scripts
large article rewrites across many files
```

### 3.3 Red Zone: Hard Stop

Stop immediately with `OWNER_REVIEW_REQUIRED` if any PR includes:

```text
.env*
real secrets
API keys
DB/payment/message/notification code
deploy config
Vercel config
admin/login routes
fake analytics data
meta keywords
data/content-series-run-state.json
official logos
copied product screenshots
unrelated article/image files
```

Do not merge Red-Zone changes.

## 4. State Detection

Start every run by anchoring the checkout:

```powershell
cd C:\Users\LOVE\MyProjects\Biz2Lab_Os
git fetch origin
git checkout master
git pull --ff-only origin master
git status --short
```

Autopilot must detect and report:

- `currentTopic` from `data/content-series-state.json`
- scheduler dry-run gate from `npm run content:series:scheduler -- --dry-run`
- open PRs from `gh pr list --state open --limit 50`
- Green/Yellow/Red zone classification for open PRs
- existing topic PRs for the current topic
- existing prompt package PRs for the current topic hero package
- existing publication PRs for the current topic article and assets
- missing local Codex image artifacts
- active-hours gate
- cadence gate
- dirty worktree
- `data/content-series-run-state.json` dirty runtime state
- Vercel check status
- publication state advancement
- keyword map requirement
- SEO dashboard requirement

Run the read-only helper when a quick summary is useful:

```powershell
npm run ops:autopilot-status
```

The helper reports current topic, scheduler gate, open PRs, artifact status,
prompt package status, publication file status, keyword map status,
Green/Yellow/Red zone flags, the machine-readable `nextAction`, and the next
recommended action. It does not merge, deploy, commit, generate articles, or
import images.

Expected helper fields include:

```json
{
  "mode": "read-only",
  "currentTopic": "...",
  "scheduler": {
    "status": "..."
  },
  "openPrs": [],
  "nextAction": "...",
  "greenZoneAutomergeCandidate": true,
  "artifactOnlyPreparationReady": true,
  "requiresOwnerReview": false,
  "yellowZoneOwnerReview": false,
  "redZoneBlocked": false
}
```

`greenZoneAutomergeCandidate` can mean either a mergeable Green-Zone PR exists
or the next safe unit is Green-Zone artifact-only preparation. Actual PR merge
candidates remain listed under `openPrs.classified`.

### Completed Queue State

`CONTENT_SERIES_QUEUE_EXHAUSTED` is not an error. It means every currently
configured content-series topic is complete.

In this terminal state, `currentTopic` may still be the last completed topic.
For example, after the Umami publication is complete, `currentTopic` can remain
`umami-open-source-analytics-ga-alternative` while `state.next` is empty and the
scheduler returns `CONTENT_SERIES_QUEUE_EXHAUSTED`.

When the helper sees `CONTENT_SERIES_QUEUE_EXHAUSTED`, a clean tracked worktree,
and no open PRs, it must report:

```json
{
  "nextAction": "series complete",
  "nextRecommendedAction": "Current content series queue is exhausted. Add new topics or run evergreen hardening/search verification tasks.",
  "greenZoneAutomergeCandidate": false,
  "artifactOnlyPreparationReady": false,
  "requiresOwnerReview": false
}
```

Do not recommend publication PR preparation just because the last completed topic
still has article, raw image, and public hero files present. The next owner-safe
paths are:

- add a new approved topic queue,
- run evergreen content hardening,
- continue Search Console / Naver owner-side verification checks.

## 5. Dirty Worktree Policy

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

## 6. Topic Flow

Use the repository state as source of truth. Read:

- `data/content-series-state.json`
- `data/content-series-topics.json`
- `data/content-series-schedule.json`
- `content/ko/content-index.json`
- `data/image-assets.json`
- `data/seo-keyword-map.json`

Do not hardcode the topic sequence if the files differ.

### 6.1 Prompt Package PR Exists

If an open PR contains only the current topic prompt package files:

- `image-requests/generated/<slug>-hero.md`
- `image-requests/generated/<slug>-hero.prompt.md`
- `image-briefs/generated/<slug>-hero.json`

then:

1. Review scope.
2. Verify remote checks.
3. Run image prompt/brief validation if needed.
4. Merge only if the Green-Zone merge policy is satisfied.
5. Align local `master` to `origin/master`.

Stop on scope drift.

### 6.2 Artifact Missing

If no approved local Codex artifact exists under the Codex generated image
root, autopilot may continue through artifact-only preparation. This is safe
because it does not create the article, does not import raw/public production
images, and does not run publication non-dry.

When the current topic has no prompt package and no approved artifact:

1. Create the image request markdown.
2. Create the image prompt markdown.
3. Create the image brief JSON.
4. Generate the local Codex image artifact under the approved Codex root.
5. Run image package validation.
6. Open a prompt package PR.
7. If the PR is Green-Zone and checks pass, autopilot may merge it.

When the prompt package already exists but the artifact is missing, generate
only the local Codex artifact and validate the image package. Do not create a
publication PR until the prompt package is merged and the scheduler dry-run is
ready.

The hourly runner reports this gate as `ARTIFACT_ONLY_PREPARATION_STARTED` when
it can safely advance the artifact-only step. If the prompt package is already
on `master`, that action is read-only: it records the expected approved Codex
artifact path and stops without creating article, raw image, or public WebP
files. It must not report publication readiness until a real matching artifact
exists under the approved Codex root.

Artifact-only preparation must not:

- create article files
- create raw images under `assets/images/raw/`
- create public WebP images under `public/images/posts/`
- run publication non-dry
- bypass active hours for publication
- commit `.codex` folders

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

If artifact generation fails or the generated image does not pass the visual
and file-name checks, stop with `WAITING_FOR_CODEX_IMAGE_ARTIFACT` and report
the exact blocker.

### 6.3 Artifact Exists And Prompt Package Is Merged

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

### 6.4 Publication PR Exists

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
6. Merge only when all Green-Zone merge policy gates pass.
7. Wait for the Git-triggered production deploy.
8. Run production smoke.
9. Confirm the scheduler advances to the next topic artifact gate.

### 6.5 Already Published But State Not Advanced

If the current topic article is already published but the state file still
points to it, create a small state repair PR. Do not generate the next article
or image in that repair task.

The repair PR must:

- mark the published topic completed
- advance `currentTopic` and `next[0]`
- preserve later topic order
- avoid `data/content-series-run-state.json`
- add or preserve regression coverage if the root cause is automation logic

## 7. Stop Gates

Stop and report the exact gate when any of these appear:

- unknown dirty tracked files
- Vercel rate limit active
- remote checks fail
- scope drift
- Yellow-Zone or Red-Zone PR scope appears
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

## 8. Merge Policy

Autopilot may merge Green-Zone PRs without additional owner babysitting only
when all are true:

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
- Production smoke is completed after publication PR merge.

Yellow-Zone PRs may be prepared and validated, but must not be merged
automatically. Red-Zone PRs must stop immediately and must not be merged.

If unsure, stop and report `OWNER_REVIEW_REQUIRED`.

## 9. Standard Validation Pack

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

## 10. SEO And Analytics Policy

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

## 11. Production Smoke Policy

After a normal Git-triggered production deployment is ready, check:

- article route HTTP 200
- series hub HTTP 200
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
- SEO dashboard remains locked/noindex and reflects the keyword map without
  fake analytics
- sitemap and RSS include published public articles when expected
- robots references sitemap and does not block `/ko`

Do not manually deploy or manually redeploy Vercel.

## 12. Standard Autopilot Loop

When the owner says `Biz2Lab 오토파일럿 계속 진행해.`, autopilot should:

1. Sync `master`.
2. Check dirty worktree.
3. Restore `data/content-series-run-state.json` only if it is runtime-only and
   backed up.
4. Check open PRs.
5. If a Green-Zone prompt package PR exists, review and merge it.
6. Run scheduler dry-run.
7. If artifact is missing, prepare artifact-only package and open PR.
8. If `CADENCE_NOT_DUE` inside active hours, use `--force-check`.
9. If `DRY_RUN_READY`, run non-dry once.
10. Open publication PR.
11. If publication PR is Green-Zone safe, merge it.
12. Wait for normal Git-triggered production deployment.
13. Run production smoke.
14. Confirm next topic gate.
15. Continue until a gate blocks or Yellow/Red appears.

Do not manually deploy, manually redeploy Vercel, bypass active hours, or bypass
failed validation.

## 13. One-Line Invocation

Use this exact short instruction in future Codex runs:

```text
Biz2Lab 오토파일럿 계속 진행해.
```

The agent should then read this guide, run `npm run ops:autopilot-status`,
inspect the current state, and proceed only as far as the safety gates allow.

## 14. Hourly Local Autopilot

Owner approval phrase:

```text
BIZ2LAB_HOURLY_AUTOPILOT_APPROVED
```

The local hourly task checks and advances at most one safe unit of work per run.
It means "check and continue every hour"; it does not mean "publish a new article
every hour." Publication still obeys active hours, open PR limits, validation,
remote checks, durable state advancement, production smoke, and the Green /
Yellow / Red policy above.

Canonical command:

```powershell
npm run ops:continue
```

The continuous orchestrator reads the current repository state, open PRs,
content queue status, AI answer readiness, and owner-reported webmaster states.
It then chooses exactly one safe next action. When the content queue is active,
it delegates one action to the existing runner:

```powershell
npm run ops:autopilot-run
```

When the content queue is exhausted, it may prepare one small evergreen
answer-readiness hardening batch. It must stop with `RED_ZONE_BLOCKED` for
unsafe local changes and `OWNER_REVIEW_REQUIRED` for ambiguous PRs or owner UI
actions. It must not invent Google or Naver verification, crawl, index, query,
traffic, or AI answer status.

Local runtime reports:

```text
reports/continuous-orchestrator-latest.md
reports/continuous-orchestrator-history.ndjson
```

These report files are ignored local runtime outputs so the hourly checkout can
continue to run `git pull --ff-only` without being blocked by report churn.

The status helper remains read-only:

```powershell
npm run ops:autopilot-status
```

### 14.1 One Action Per Run

The runner stops after one meaningful action:

- merge one Green-Zone prompt package PR
- prepare one missing prompt package and open a PR
- record one artifact-only preparation gate when the prompt package exists but
  the approved Codex artifact is still missing
- create one publication PR when the scheduler returns `DRY_RUN_READY`
- merge one Green-Zone publication PR and then require production smoke
- stop with `OWNER_REVIEW_REQUIRED` when Yellow/Red risk appears

It does not loop through multiple topics. It does not manually deploy, manually
redeploy Vercel, call DB/payment/message APIs, add secrets, add fake analytics,
add `meta keywords`, or commit `data/content-series-run-state.json`.

### 14.2 Run-State Recovery

If the only tracked dirty file is:

```text
data/content-series-run-state.json
```

the runner backs it up under `.tmp`, restores the tracked file, and continues.
Any other tracked change or unexpected untracked file blocks the run.

### 14.3 Windows Task Scheduler

Register or update the local hourly task with:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts\setup-biz2lab-autopilot-hourly-task.ps1
```

Task details:

```text
Task name: Biz2Lab Autopilot Hourly
Schedule: every 1 hour
Repo root: C:\Users\LOVE\MyProjects\Biz2Lab_Os
Continuous orchestrator log path: .tmp\biz2lab-continuous-orchestrator.log
Continuous task stdout/stderr path: .tmp\biz2lab-continuous-orchestrator-task-output.log
Runner log path: .tmp\biz2lab-autopilot-runner.log
Task stdout/stderr path: .tmp\biz2lab-autopilot-task-output.log
```

Task command:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "cd 'C:\Users\LOVE\MyProjects\Biz2Lab_Os'; if (!(Test-Path '.tmp')) { New-Item -ItemType Directory -Path '.tmp' | Out-Null }; git fetch origin; git checkout master; git pull --ff-only origin master; npm run ops:continue >> .tmp\biz2lab-continuous-orchestrator-task-output.log 2>&1"
```

The continuous orchestrator writes structured JSON lines to its own log. The
scheduled task redirects shell output to a separate task-output log so Windows
does not lock the same file from two writers. The existing autopilot runner keeps
its own logs when the controller delegates an active content-queue step. The
hourly task must not bypass active hours. If the current topic is missing a Codex
artifact, artifact-only prompt/package preparation may continue, but publication
non-dry runs must wait for the scheduler gate.
