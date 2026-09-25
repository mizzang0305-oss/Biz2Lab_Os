---
type: commercial-release-gate
project: Biz2Lab
status: PASS_PREVIEW_VALIDATED_DB_BLOCKED
updated: 2026-09-25
tags: [biz2lab, commercial, preview, release-gate]
---

# Commercial Front Release Candidate Gate Close

This report supersedes the earlier, pre-deployment audit in `commercial-gate-close-2026-09-25.md`. All Preview claims below refer to the immutable deployment for `589f706553f02ee72c1ee8f95889e1380a59b7b9`. Production was not changed.

## A. Overall

- `OVERALL_RESULT=PASS_PREVIEW_VALIDATED_DB_BLOCKED`
- `COMMERCIAL_FRONT_READY=false`
- `COMMERCIAL_FRONT_PRODUCTION_APPROVAL_READY=false`
- `PREVIEW_VALIDATED=true`
- `AGENTOPS_RESCUE_STATE=DEFERRED_BY_COMMERCIAL_GATE`

## B. Git Identity

- `ORIGIN_MASTER=66e974df5afd728f4b468b6ca11662474b0c7206`; `BASE_DRIFT=false` after fetch.
- `CANDIDATE_BRANCH=codex/commercial-hub-preview-v1`
- `CANDIDATE_HEAD_AT_QA=589f706553f02ee72c1ee8f95889e1380a59b7b9`; initial expected `f4c477b` was verified before authorized release fixes. This report is a subsequent documentation-only commit.
- `REMOTE_HEAD_AT_QA=589f706553f02ee72c1ee8f95889e1380a59b7b9`; normal push only.
- `WORKTREE_CLEAN=true` before this report was added. The dirty primary checkout was untouched.

## C. Draft PR / Preview

- `PR=#130` — https://github.com/mizzang0305-oss/Biz2Lab_Os/pull/130 — Draft, base `master`, head `codex/commercial-hub-preview-v1`.
- `PREVIEW_URL=https://biz2-lab-l3o1gfhav-mizzang0305-gmailcoms-projects.vercel.app`
- `DEPLOYMENT_ID=dpl_DkAVQxtPdY3Mdf6Cs1kqA6dkhS94`; Vercel `READY`, Preview, correct existing project `prj_Zx5HsZZAFfClRt6CMVnd5RF86LJ8`.
- `PREVIEW_SHA=589f706553f02ee72c1ee8f95889e1380a59b7b9` (deployment API Git source).

## D. Routes

- `ROOT=200 ONURIM`; `SERVICES=200`; `MYBIZ=200`; `WEB=200`; `MINZ_MIND=200` by Chrome document response on the immutable Preview URL.
- Existing ONURIM `/health`, `/health/hypertension`, `/health/guides/understanding-hba1c`, and `/health/trust/about` also returned 200.
- The Preview's same-origin HTTP GET returned 200 for `/robots.txt` and `/sitemap.xml`.

## E. Product States

- `MYBIZ=BETA`: public sample dashboard; sample data, unsaved Demo, and unverified performance boundary stated.
- `WEB=COMING_SOON`; `MINZ_MIND=COMING_SOON`: no pretend Demo links.
- `ACTUALLY_SELLABLE_NOW=NONE_CERTIFIED`; the Hub may be release-ready independently of individual product certification.

## F. Mobile

- `360=PASS`; `390=PASS`; `430=PASS` for all four Commercial routes on the immutable Preview.
- `OVERFLOW=NONE`: document scroll width equalled actual viewport width in all 12 combinations.
- `TOUCH_TARGETS=PASS`: visible links/buttons at least 44px high; consent checkbox labels 48px high. The hidden skip link is only shown on keyboard focus.
- `SCREENSHOTS=reports/local/commercial-preview-589f706/` (12 full-page JPEGs plus `360-mybiz-error.jpg`; local ignored evidence, not committed). Preview's Vercel feedback icon floats over a small hero area; it is Preview chrome, not site code.
- Hero, cards, navigation, status, CTA, both forms, privacy links, input/textarea, error message, and footer were visually inspected. Successful form UI could not be exercised without persistence.

## G. SEO

- `NOINDEX=PASS`: all four Commercial HTML responses contain `noindex, nofollow`.
- `CANONICAL=PASS`: distinct production-path canonicals; `OG=PASS`: distinct titles; all four have descriptions.
- `STRUCTURED_DATA=PASS`: no JSON-LD on four Commercial routes; ONURIM schema remains on `/` and tested `/health` routes.
- `SITEMAP=PASS`: Preview `/sitemap.xml` HTTP 200, includes `/health`, excludes Commercial paths; `/robots.txt` HTTP 200. Local built artifacts confirm the same boundary.
- `ONURIM_REGRESSION=PASS` for root and four representative ONURIM URLs.

## H. Analytics

- `DATALAYER=PASS`: `service_view`, `demo_view`, `cta_click`, and `inquiry_start` observed from actual Preview interactions with `service`, landing path, source, and campaign.
- `GA4_NETWORK=PASS`: Chrome captured `https://www.google-analytics.com/g/collect` with `page_view`, `service_view`, `cta_click`, `demo_view`, and `inquiry_start`; HTTP 204 observed. The first two custom events were batched with pageview.
- `GA4_COLLECTION=NOT_TESTED_PERMISSION`: no property-level DebugView/Realtime access was established.
- `EVENTS=inquiry_submit,email_lead_submit NOT_EMITTED` after 503 storage failures, as required. Success event delivery awaits persistence E2E.
- `UTM=PASS_TO_API`: both synthetic request bodies carried `utm_source=synthetic`, `utm_medium=qa`, `utm_campaign=commercial_front_rc`, `source=synthetic`, and `landing_url=/mybiz`. Database readback awaits a safe DB.
- Preview-only GA4 QA is opt-in through `commercial_qa=1`, scoped to Commercial routes, and active for 30 minutes in that browser tab's session; outside an opted-in QA session Preview browsing stays unmeasured by this QA loader. Google documents the `dataLayer.push(arguments)` queue form used here: https://developers.google.com/tag-platform/gtagjs .

## I. Test DB Discovery

- `SAFE_TEST_DB_FOUND=false` in the available checkout and process environment; external dev/staging inventory remains `UNKNOWN`.
- `DB_TYPE=NONE_CONNECTED`: only `supabase/migrations_draft/001,002` were found; no local Supabase config, Docker compose, disposable CI DB, installed Supabase/Docker/psql CLI, or test DB variables were present. Secret values were not read.
- `MIGRATION_TEST=NOT_RUN`; `PERSISTENCE_E2E=BLOCKED_NO_NONPROD_DB`.

## J. Inquiry E2E

- `FORM=PASS_SYNTHETIC_VALIDATION`; `API=503_STORAGE_OFF`; failure text accurately says no submission was saved.
- `DB_INSERT=NOT_RUN`; `PERSISTED_ROW=NOT_RUN`; `OPERATOR_LOOKUP=NOT_RUN`.
- `ANALYTICS=PASS_NO_FALSE_INQUIRY_SUBMIT`; successful end-to-end ordering remains `NOT_RUN`.

## K. Lead E2E

- `FORM=PASS_SYNTHETIC_VALIDATION`; `API=503_STORAGE_OFF`; separate synthetic address used.
- `DB_INSERT=NOT_RUN`; `PERSISTED_ROW=NOT_RUN`; `OPERATOR_LOOKUP=NOT_RUN`.
- `UTM=PASS_TO_API`; `ANALYTICS=PASS_NO_FALSE_EMAIL_LEAD_SUBMIT`; successful end-to-end ordering remains `NOT_RUN`.

## L. Privacy / Operations — OWNER_POLICY_DRAFT

- `RETENTION_STATUS=UNAPPROVED`; `RETENTION_RECOMMENDATION=90 days from created_at for both inquiry and lead, then approved manual periodic deletion`. Rationale: a short, simple review window. Code impact: update `/services/privacy`, add a restricted operator runbook and scheduled review record; do not enable automatic deletion yet.
- `DELETION_STATUS=UNAPPROVED`; `DELETION_REQUEST_RECOMMENDATION=one Owner-approved support contact, identity check and row lookup, logged manual deletion`. Rationale: one accountable channel without a new admin app. Code impact: privacy text and runbook; deletion SQL only after scope/retention approval.
- `OPERATOR_STATUS=UNVERIFIED`; `OPERATOR_ROLE_RECOMMENDATION=one named Owner/delegate with restricted authenticated Supabase Dashboard or secure DB console access, daily lead review`. Rationale: reuse existing operator tooling. Code impact: access/runbook, no public SELECT and no new admin UI.
- `OPERATOR_LOOKUP_METHOD=PROPOSED_SUPABASE_DASHBOARD_OR_SECURED_DB_CONSOLE`; `OPERATOR_AUTH=NOT_VERIFIED`; visible fields should be `created_at,kind,service,email,name,message,source,landing_url,utm_*,consented_at`. Find by newest `created_at` plus kind/service/unique synthetic email; delete by exact row `id` under an approved procedure. This is not yet operational proof.
- `EMAIL_NOTIFICATION=NOT_IMPLEMENTED`; `EMAIL_NOTIFICATION_REQUIRED_FOR_LAUNCH=false` only if the restricted operator lookup and daily review are proven. No email was sent.

## M. Security / Abuse

- `RLS=SCHEMA_DRAFT_ONLY`: migration enables RLS and revokes `anon,authenticated`; live insert/select/delete roles remain untested. Anonymous full-table SELECT must fail before Production approval.
- `BODY_LIMIT=8KB`; `HONEYPOT=PRESENT`; `SUBMIT_DELAY=3_SECONDS_CLIENT_TIMESTAMP`; `ORIGIN_CHECK=PRESENT`.
- `RATE_LIMIT=NONE_FOUND`; `MINIMUM_LAUNCH_GAP=existing free edge/provider rate control or capped traffic with monitoring and incident response, then verify denial behavior`.
- `SECRET_COLLECTION_BLOCKED=false`: UI warns against sensitive input; free-text server-side prevention is not proven.

## N. Tests

- `TESTS=336/336 PASS`; `TYPECHECK=PASS`; `LINT=0 errors, 1 pre-existing unused-import warning`; `BUILD=PASS`.
- `REGRESSION=PASS`: six-route structured-data verifier, Preview routes, form failure ordering, UTM payload, and GA4 network interactions.
- `git diff --check=PASS` before this documentation addition.

## O. Remaining Blockers

- `BLOCKERS=SAFE_NONPROD_DB_AND_PERSISTENCE_E2E; OPERATOR_AUTH_AND_LOOKUP; OWNER_PRIVACY_POLICY; ABUSE_RATE_CONTROL_BEFORE_PUBLIC_CAPTURE; PRODUCTION_DB_AND_CODE_APPROVAL`.
- Preview and GA4 Network QA are closed; GA4 property collection is unverified because property access was not established.

## P. Production Package

- `DB_CHANGE_REQUIRED=true`; draft migration `supabase/migrations_draft/002_biz2lab_commercial_submissions.sql`; `RLS=UNTESTED_IN_DB`.
- `PRODUCTION_DEPLOY_REQUIRED=true`; proposed code SHA is the final candidate branch head after this report commit, not a Production deployment. `PR=#130`; Preview URL above.
- `ROLLBACK=disable Commercial storage/write path, roll back approved Production code deployment; preserve lead data and require separate approved data decision before any DROP/DELETE`. No rollback SQL is executed or finalized yet.
- `OWNER_APPROVAL_1=designate an existing safe non-Production DB and restricted test/operator access for one synthetic migration+E2E run`.
- `OWNER_APPROVAL_2=accept or revise the three OWNER_POLICY_DRAFT values and specify the real deletion-request contact/operator`.
- `OWNER_APPROVAL_3=after E2E/RLS/abuse evidence, separately authorize the exact Production migration SHA and code deployment/rollback scope`.

## Q. Certification

- `FINAL_CERTIFICATION=LEVEL_1_PASS_PREVIEW_VALIDATED_DB_BLOCKED`.
- `NEXT_MINIMUM_ACTION=identify an existing safe non-Production DB and authenticated operator account, then apply draft migration there and run the two synthetic persistence/readback flows`.

## Incident / Rollback Note

During initial Preview inspection, an unlinked Vercel CLI command unintentionally created a separate empty Vercel project. Its exact identity and zero deployments were verified; that empty project was removed, and the worktree was linked to the existing `biz2-lab-os` project. Production settings and deployment were not changed. The existing Preview PR/deployments remain intact.

The earlier audit remains as historical evidence. To revert this candidate, use a new reviewed commit or revert on the candidate branch, then let Vercel make a new Preview deployment. Never reset the dirty primary checkout or delete stored submissions as part of code rollback.
