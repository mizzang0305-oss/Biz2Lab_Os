# Open Source Automation Series Orchestrator

This document describes the safe local workflow for the Biz2Lab / MyBiz open-source automation tool series.

## Purpose

The orchestrator prepares the next article in the `free-open-source-automation-tools` series, but it refuses to publish unless a real, slug-mapped hero image artifact exists.

It is designed for articles such as:

- `node-red-local-business-automation-server`
- `huginn-monitoring-automation-agent`
- `baserow-open-source-database-automation`
- `appsmith-internal-dashboard-automation`
- `windmill-developer-workflow-automation`
- `kestra-data-ai-workflow-orchestration`
- `n8n-workflow-automation-license-caution`
- `nocodb-airtable-alternative-license-caution`
- `crawl4ai-blog-research-automation`

## Files

- `data/content-series-state.json`: queue state, completed articles, safety gates, image policy, validation policy, merge policy.
- `data/content-series-topics.json`: topic definitions, official sources, article outlines, image concepts, internal-link requirements, safety notes, license cautions.
- `scripts/content-series-orchestrator.ts`: local orchestrator CLI and testable helpers.

## Commands

Preview the next topic:

```bash
npm run content:series:auto -- --plan-only
```

Preview Node-RED explicitly:

```bash
npm run content:series:auto -- --topic node-red --plan-only
```

Publish from an explicit local Codex-generated image artifact:

```bash
npm run content:series:auto -- --topic node-red --artifact "C:\Users\LOVE\.codex\generated_images\node-red-local-business-automation-server-hero.png"
```

Publish from a Codex-generated artifact directory under the approved local Codex root:

```bash
npm run content:series:auto -- --topic node-red --artifact-dir "C:\Users\LOVE\.codex\generated_images\node-red-review"
```

Publish from the latest approved local Codex artifact root:

```bash
npm run content:series:auto -- --topic node-red --use-latest-codex-artifact
```

Run publication without commit/PR creation:

```bash
npm run content:series:auto -- --topic node-red --no-commit --artifact "C:\Users\LOVE\.codex\generated_images\node-red-local-business-automation-server-hero.png"
```

## Image Gate

The orchestrator only imports real local Codex-generated image artifacts. Manual image drops, Downloads/Desktop files, random external image files, and arbitrary local images are rejected before publication.

Allowed source root:

```text
C:\Users\LOVE\.codex\generated_images\
%USERPROFILE%\.codex\generated_images\
```

The `CODEX_GENERATED_IMAGE_ROOT` environment variable may override that root for local testing. Any import path outside the approved local Codex generated-image root is rejected.

Allowed flow:

```text
local Codex image skill
-> C:\Users\LOVE\.codex\generated_images\...
-> artifact auto-discovery/import
-> assets/images/raw/<slug>-hero.jpg
-> public/images/posts/<slug>-hero.webp
-> publish
```

Required raw output:

```text
assets/images/raw/<slug>-hero.jpg
```

Required public output after optimization:

```text
public/images/posts/<slug>-hero.webp
```

The artifact is rejected when:

- it is missing
- it is outside the approved local Codex generated-image root
- it is not a real JPG/PNG/WebP binary image
- the filename does not include the target slug, unless a manifest maps the file to the slug, or `--artifact-dir` contains exactly one image for exactly one target topic
- the filename contains placeholder terms such as `placeholder`, `dummy`, `fake`, `sample`, `blank`, or `empty`
- it uses an unsupported extension
- a manifest maps the image to a different slug
- more than one matching target image is discovered

If no approved artifact exists, the orchestrator stops with:

```text
CODEX_GENERATED_IMAGE_ARTIFACT_MISSING
```

Other artifact failure codes:

```text
CODEX_ARTIFACT_AUTO_DISCOVERY_AMBIGUOUS
CODEX_ARTIFACT_PROVENANCE_REJECTED
CODEX_ARTIFACT_SLUG_MISMATCH
CODEX_ARTIFACT_UNSUPPORTED_FORMAT
CODEX_ARTIFACT_PLACEHOLDER_REJECTED
```

## Artifact Discovery

`--artifact <path>` means an explicit local Codex-generated artifact path. The path must be inside the approved Codex generated-image root and must match the target slug by filename or manifest. Manual image drops, Downloads/Desktop files, and arbitrary local images are rejected with `CODEX_ARTIFACT_PROVENANCE_REJECTED`.

`--artifact-dir <path>` searches only that directory, and the directory itself must be inside the approved Codex generated-image root. It is accepted only when one of these is true:

- the directory contains exactly one supported image and the current run has exactly one target topic
- the directory contains a supported image whose filename includes the target slug
- the directory contains a manifest mapping a supported image to the target slug

Supported manifest filenames:

```text
manifest.json
codex-image-manifest.json
image-manifest.json
```

`--use-latest-codex-artifact` searches only the approved local Codex generated-image root:

```text
C:\Users\LOVE\.codex\generated_images\
```

It imports only when there is exactly one validated artifact for the target slug. Multiple matching images block as ambiguous. Unrelated images are ignored unless they appear to target the same slug or a manifest maps them incorrectly.

Do not commit local artifact or scratch directories. The orchestrator filters these paths out of commit staging, but they are not valid publication import roots unless they are inside the approved Codex generated-image root:

```text
.codex-remote-attachments/
.codex/generated_images/
artifacts/codex-images/
generated/
output/
tmp/
```

## Publication Gate

The orchestrator does not publish draft routes. A non-plan run writes the article only after a real image artifact has been validated and imported.

The current state also enforces the ordered topic queue. This prevents articles from linking to routes that are still draft or missing.

## Current Queue State

The first open-source automation batch is complete on `master`:

- `opencut-free-open-source-video-editor-ai-content-automation`
- `free-open-source-automation-tools-series`
- `activepieces-ai-business-automation-n8n-alternative`
- `node-red-local-business-automation-server`
- `huginn-monitoring-automation-agent`
- `baserow-open-source-database-automation`
- `appsmith-internal-dashboard-automation`
- `windmill-developer-workflow-automation`
- `kestra-data-ai-workflow-orchestration`

The stale candidate slug `appsmith-internal-tool-admin-dashboard` is not the published Appsmith route. The published route is `appsmith-internal-dashboard-automation`.

After Kestra, the next owner-reviewed queue is:

1. `n8n-workflow-automation-license-caution`
2. `nocodb-airtable-alternative-license-caution`
3. `crawl4ai-blog-research-automation`

These are queue definitions only. They do not create article markdown, raw images, public WebP files, PRs, or deployments.

Each queued topic must still pass the real Codex hero artifact gate before publication. A scheduler dry-run should stop at `WAITING_FOR_CODEX_IMAGE_ARTIFACT` until the matching `<slug>-hero` artifact exists under the approved Codex generated-image root.

## Validation Gate

Publication runs the full validation list from `data/content-series-state.json`:

```text
npm run image-skill:plan
npm run image-skill:validate
npm run optimize-images
npm run validate:posts
npm run validate:images
npm test
npm run lint
npm run typecheck
npm run build
npm run check:links
npm run validate:seo
npm run audit:image-briefs
npm run audit:image-prompts
npm run audit:content-authority
git diff --check
```

`validate:posts` currently has intentional public post count expectations. When a future article is published, that count change must be explicit and reviewed. Do not bypass the validator.

## Safety

The orchestrator never:

- deploys manually
- merges a PR
- calls databases
- calls payment APIs
- sends messages or notifications
- commits `.codex-remote-attachments/`
- commits `.codex/config.toml`
- creates placeholder images
- marks planned images as ready without real files

When commit is enabled, it creates a topic branch and PR for owner review. The owner still performs merge and production smoke separately.

## Node-RED Example

Plan the article:

```bash
npm run content:series:auto -- --topic node-red --plan-only
```

After Codex produces a real Node-RED hero image artifact, run:

```bash
npm run content:series:auto -- --topic node-red --use-latest-codex-artifact
```

If the latest-discovery path finds multiple candidates, move the intended Codex-generated artifact to a clean directory under the approved Codex root and run:

```bash
npm run content:series:auto -- --topic node-red --artifact-dir "C:\Users\LOVE\.codex\generated_images\node-red-review"
```

## 3-Hour Local Scheduler

The scheduler is a local safety gate for the content series queue. It does not publish every 3 hours unconditionally. It checks whether one queued topic can proceed, and it creates at most one PR only when every gate passes.

Run a safe dry run:

```bash
npm run content:series:scheduler -- --dry-run
```

Run with the default 3-hour cadence:

```bash
npm run content:series:scheduler
```

Run with a one-time cadence override:

```bash
npm run content:series:scheduler -- --cadence 180
```

Dry-run the exact 3-hour cadence gate:

```bash
npm run content:series:scheduler -- --cadence 180 --dry-run
```

Run an explicit topic check using the approved latest local Codex artifact root:

```bash
npm run content:series:scheduler -- --topic node-red --use-latest-codex-artifact
```

Force a check only when you want to bypass the cadence timer. This does not bypass image, duplicate, lock, active-hours, daily-limit, PR-limit, merge, or deploy gates:

```bash
npm run content:series:scheduler -- --force-check
```

Recommended Windows Task Scheduler action:

```bat
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "cd 'C:\Users\LOVE\MyProjects\Biz2Lab_Os'; git fetch origin; git checkout master; git pull --ff-only origin master; npm run content:series:scheduler -- --cadence 180 --use-latest-codex-artifact >> .tmp\content-series-scheduler.log 2>&1"
```

Recommended schedule:

```text
Repeat every 3 hours
```

Scheduler guardrails:

- checks every 3 hours by default, with `data/content-series-schedule.json` as the source of truth
- processes at most one topic per run
- can target a specific queued topic with `--topic <id-or-slug>`, but queue order and previous-article gates still apply
- creates at most one publication PR per successful run
- requires a real local Codex-generated image artifact under `C:\Users\LOVE\.codex\generated_images\`
- blocks manual image drops, placeholder images, missing images, slug mismatches, and ambiguous artifacts
- blocks completed topics, existing article files, content-index duplicates, existing topic PRs, max open PRs, daily limits, and concurrent runs
- uses `.tmp/content-series-scheduler.lock` to prevent concurrent local runs
- never merges PRs
- never deploys manually
- never calls DB, payment, message, notification, or external business APIs

If the matching Codex hero image does not exist yet, the safe status is:

```text
WAITING_FOR_CODEX_IMAGE_ARTIFACT
```

When every configured topic in `data/content-series-topics.json` is already completed or published, the safe terminal status is:

```text
CONTENT_SERIES_QUEUE_EXHAUSTED
```

This means the scheduler found no remaining configured article to prepare. The Windows Task Scheduler can continue to log this state safely; it must not invent a new topic, publish a duplicate of the final article, relax `maxOpenPrs`, or bypass the Codex hero artifact gate. To continue the series later, add the next topic through an owner-reviewed PR that updates the topic queue and state files deliberately.
