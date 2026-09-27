---
type: commercial-production-readiness
project: Biz2Lab
status: BLOCKED_SHARED_DB_BACKUP_AND_BIZ2LAB_PRODUCTION_APPLY
updated: 2026-09-25
tags: [biz2lab, commercial, production, privacy, release-gate]
---

# Commercial Front Production readiness

## Approved operating policy

- Owner approved a 90-day retention target from `created_at` for pre-contract inquiries and email leads, with an initial manual expiry review. Contract or legal retention exceptions require separate review.
- Owner approved one designated operator using a personal authenticated account, without a shared login. Actual Production account access and row readback are not yet verified.
- Owner designated `mizzang0305@gmail.com` for private deletion requests and confirmed that the mailbox can receive them. The Commercial privacy page displays this address; public GitHub Issues are not a deletion channel. No test email was sent.

## Exact candidate boundary

- Root `/` remains ONURIM. Commercial routes remain `noindex` and outside the sitemap. MyBiz stays BETA; Web and MINZ MIND stay COMING_SOON.
- The canonical one-time migration is `supabase/migrations/20260925121544_biz2lab_commercial_submissions.sql`. It now isolates Commercial data in the dedicated `biz2lab` schema and exposes only `biz2lab_commercial_*` service-role RPC entrypoints in `public`; no shared Data API exposed-schema setting change is required. Recheck the SHA-256 immediately before any separately approved Production apply.
- The verified write-lockdown rollback draft is `supabase/rollback_draft/002_biz2lab_commercial_submissions_lockdown.sql`. It preserves rows and requires a verified Production target and separate execution decision.

## Production stop gate

- The Owner identified Supabase project `plnuyudyogbzwpmdulnw` (`Mybiz Project` in the `Mybiz` organization) as the intended Commercial Production DB. Read-only discovery found no `biz2lab` schema, no `biz2lab.commercial_submissions` table, and no `biz2lab_*` RPC objects. Existing MyBiz data is present; MyBiz continues to own its existing `public/core/private` objects while this project owns only the new `biz2lab` schema plus prefixed server RPCs.
- Read-only security inspection found pre-existing MyBiz public-schema issues, but the Commercial migration no longer writes a Biz2Lab table into that schema. Biz2Lab now owns only the dedicated `biz2lab` schema plus prefixed service-role RPCs, so MyBiz RLS remediation remains a separate shared-project security track rather than a direct schema dependency. Production Commercial migration still remains on hold until the isolated-schema candidate passes exact CI and the shared physical-DB backup/recovery result is confirmed from the DB operations room.
- Vercel project `biz2-lab-os` owns `www.biz2lab.com`. Production environment variable names `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are listed; their values and project-ref match were not read. The currently served Production code does not expose Commercial routes. `BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED` is not listed for Production, so capture is not enabled by an explicit true value.

## Resume order after the shared DB and Biz2Lab gates close

1. Treat the shared Supabase project as two ownership domains: MyBiz manages its existing `public/core/private` security work in the MyBiz room; Biz2Lab manages only `biz2lab` schema objects and prefixed `biz2lab_commercial_*` service RPCs here. Verify the MyBiz security gate result, operator account, Vercel `SUPABASE_URL` project-ref match, Production schema/migration ledger, and exact candidate/migration hashes without exposing credentials.
2. Obtain a separate Production change decision for the exact canonical migration and exact candidate SHA. Apply only the Biz2Lab migration to the verified project; immediately confirm the dedicated schema/table, 13 columns, indexes, RLS, no direct client/schema/table grants, service-role-only prefixed RPCs, absence of `public.commercial_submissions`, and denied anonymous direct/RPC access.
3. Deploy the exact SHA with capture OFF. Verify `/` ONURIM, Commercial routes, existing Health pages, mobile, SEO/noindex, sitemap, and robots.
4. Enable capture for the same SHA only after DB and front checks pass. Submit one synthetic inquiry and lead, read both back through the designated operator path, verify success analytics and duplicate handling, then delete only their exact row IDs and confirm absence.
5. If any Production gate fails, turn capture OFF, restore the prior approved deployment, and use the write-lockdown SQL only after verifying its target. Preserve customer records; never auto-drop the table.

`COMMERCIAL_FRONT_READY` remains false until the complete Production smoke and exact synthetic cleanup pass.
