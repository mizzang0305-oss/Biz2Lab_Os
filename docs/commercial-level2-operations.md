---
type: commercial-operations-runbook
project: Biz2Lab
status: OWNER_POLICY_DRAFT
updated: 2026-09-25
tags: [biz2lab, commercial, privacy, operations, release-gate]
---

# Commercial Front Level 2 operations — draft

This is an execution plan, not Production authorization or legal advice. The Production capture flag stays OFF until the separate Owner policy and Production release decisions. `/` remains ONURIM; Commercial routes stay `noindex`.

## Current DB boundary

- Windows has no local Docker-compatible runtime. GitHub Actions [draft run 36133538583](https://github.com/mizzang0305-oss/Biz2Lab_Os/actions/runs/36133538583) applied the SQL on disposable Supabase Local. [Canonical clean-reset run 36134122830](https://github.com/mizzang0305-oss/Biz2Lab_Os/actions/runs/36134122830) passed on CLI 2.117.0 and Postgres 17. No remote project was linked or used.
- `supabase/migrations/20260925121544_biz2lab_commercial_submissions.sql` is the one canonical one-time migration. Its plain `CREATE TABLE` intentionally fails if the table already exists; inspect the Production target schema and migration history before any separate approval. Clean local reset reproduced the final schema.
- The migration grants only `SELECT`, `INSERT`, and `DELETE` to server-side `service_role`, revokes table and identity-sequence grants from `anon` and `authenticated`, and enables RLS without public policies. CI verified schema/grants, anonymous Data API denial (401 for GET/PATCH/DELETE), and RLS zero-row behavior for anon/authenticated after temporary grants that were rolled back.
- The rolling repeat lookup rejects the same normalized email, service, and submission kind within 10 minutes. CI first proved a race: eight concurrent requests created three rows. A unique expression index now enforces one row per 10-minute UTC bucket; `23505` becomes 409. The clean-reset run observed one 201 and seven 409 responses with one row. The cross-bucket rolling lookup remains best-effort, so an exact bucket-boundary race can still create two rows. This is not a distributed IP rate limit.
- Existing application controls remain honeypot, minimum submit time, same-origin check, and an 8 KB request cap. No project-level rate rule was found in repository configuration. Vercel WAF rate limiting is a separate project setting with usage-based pricing, so no rule is activated in this phase without an exact Owner cost/scope decision.

## Safe DB acceptance before any SQL

1. For CI, use only the GitHub-hosted ephemeral Supabase Local configured by `.github/workflows/commercial-supabase-e2e.yml`. For a later Production migration, separately verify the exact Production project identity. Do not paste keys into chat or reports.
2. Verify the target identity, empty/expected `public.commercial_submissions` state, migration ledger, endpoint, and database role in a secret-safe channel. Never infer safety from an environment-variable name alone.
3. Apply the reviewed migration to that target only. Check all 13 columns, identity PK, kind/service/shape CHECK constraints, `created_at` default, lookup and unique dedupe indexes, RLS, grants, and zero public policies. A second direct execution should fail as a one-time migration; normal replays must be controlled by the migration history, not `IF NOT EXISTS`.
4. As `anon`, attempt `SELECT`, `UPDATE`, and `DELETE`; each must fail. Repeat for ordinary `authenticated` if no user read path is approved. Verify `service_role` can insert and read only from the server. Do not put its credential in a browser bundle or response.

## Synthetic E2E and cleanup

Use only unique `@example.invalid` identities. The app's service IDs are lowercase (`mybiz`, `web`, `minz-mind`); the current form's `landing_url` is its service route, so a MyBiz lead uses `/mybiz` rather than `/services`.

1. Set the capture flag only in the isolated test process connected to the proven safe DB. Submit a synthetic inquiry through the form. Verify HTTP 201, success UI, `inquiry_submit` after storage, and exactly one persisted row with kind, service, normalized email, source, landing URL, UTM fields, `consented_at`, and `created_at`.
2. Repeat the identical request within 10 minutes. Verify HTTP 409, a clear duplicate UI message, no second row, and no second success analytics event. Do not describe this as a complete distributed rate limit.
3. Submit a separate consented synthetic email lead and verify the same readback fields plus null `name` and `message`, success UI, and `email_lead_submit` after storage.
4. In local Studio or an authenticated, restricted DB console, find both rows by the unique synthetic email and newest `created_at`. Record existence and field parity without copying contact details into public reports.
5. Delete only the two exact synthetic row IDs in the safe DB. Confirm each existed before deletion, exactly one row was deleted per ID, and neither remains afterward. Do not use a wildcard email delete or touch real rows.

## Operator model — OWNER_POLICY_DRAFT

- `OPERATOR_MODEL=ONE_DESIGNATED_OPERATOR`: one named Owner/delegate, personal authenticated account, no shared login, least project/database scope, daily intake review.
- Prefer an existing secured admin/CRM if it already exposes these records; otherwise use the authenticated Supabase Dashboard/Table Editor or restricted SQL Editor. No new admin app is planned.
- Find new inquiries and leads by `created_at DESC`, `kind`, `service`, and source/UTM. Open `email`, `name`, and `message` only when responding. Do not grant public `SELECT`.
- The existing `/ko/contact` path directs visitors to public GitHub Issues. That channel is not suitable for verifying a private lead-record deletion request. No private deletion contact was found. `DELETION_CONTACT_OWNER_DECISION_REQUIRED` remains explicit; do not invent an email address.

## Retention and deletion — OWNER_POLICY_DRAFT

- `RETENTION_TARGET=90 days from created_at` for pre-contract inquiries and email leads, unless a later approved contract or legal obligation requires a different retention basis. This is a product/operations recommendation, not a legal conclusion.
- No scheduler or cron is added for initial low volume. The designated operator reviews expired rows on a dated manual schedule and records the action without storing unnecessary personal data in the report.
- Query for review (read only):

```sql
select id, kind, service, created_at
from public.commercial_submissions
where created_at < now() - interval '90 days'
order by created_at, id;
```

- For an approved deletion request, verify the requester's identity in an Owner-approved private channel, identify the exact row ID, confirm the purpose/retention exception, and record authorization. In a transaction, inspect that ID, delete exactly that ID, confirm one returned ID, commit, and query the ID again to confirm absence. Keep the database's audit/backup policy separate. No Production deletion is authorized by this document.

## Rollback

- Application: keep Commercial capture disabled, or restore the prior approved Production deployment by exact ID after a separate release decision; verify `/` remains ONURIM and Commercial routes' behavior.
- Database: the draft `supabase/rollback_draft/002_biz2lab_commercial_submissions_lockdown.sql` revoked write access and preserved existing rows in ephemeral CI; exact synthetic rows were then deleted. Verify the Production target and application write-off before any separately approved execution. It is not a `DROP TABLE` script.
- Data: `DATA_PRESERVATION=true`, `AUTOMATIC_CUSTOMER_DATA_DELETE=false`. Later schema removal needs separate approval and evidence of retention completion. Neither rollback SQL nor Production deployment runs in this phase.

## Next Production smoke, only after separate Owner approval

Apply the exact approved migration to Production, deploy the exact approved PR SHA, confirm `/` ONURIM and four Commercial routes, submit one synthetic inquiry and lead, verify persisted rows and operator readback, observe GA4 network, run mobile and SEO/noindex smoke, then remove only those synthetic rows. Declare `COMMERCIAL_FRONT_READY=true` only after every required Production check passes.
