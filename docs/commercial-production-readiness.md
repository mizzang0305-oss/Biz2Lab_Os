---
type: commercial-production-readiness
project: Biz2Lab
status: BLOCKED_EXISTING_MYBIZ_RLS
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
- The canonical one-time migration is `supabase/migrations/20260925121544_biz2lab_commercial_submissions.sql`, SHA-256 `b1d447fa654be15b32f5ef63a1965aed23705e2838f4f5fdc91f43c9f72bd0d9` before finalization. Recheck the hash immediately before any separately approved Production apply.
- The verified write-lockdown rollback draft is `supabase/rollback_draft/002_biz2lab_commercial_submissions_lockdown.sql`. It preserves rows and requires a verified Production target and separate execution decision.

## Production stop gate

- The Owner identified Supabase project `plnuyudyogbzwpmdulnw` (`Mybiz Project` in the `Mybiz` organization) as the intended Commercial Production DB. Read-only discovery found no `public.commercial_submissions` table and no matching migration history entry. Existing MyBiz data is present; do not treat the project as disposable.
- Read-only security inspection found pre-existing public-schema tables with disabled RLS and broad anonymous table grants. This is outside the Commercial migration and may affect the existing MyBiz application. Do not apply blanket RLS changes without reviewing its policies and client paths. Production Commercial migration, deployment, and capture remain on hold until a separate security review closes this gate.
- Vercel project `biz2-lab-os` owns `www.biz2lab.com`. Production environment variable names `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are listed; their values and project-ref match were not read. The currently served Production code does not expose Commercial routes. `BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED` is not listed for Production, so capture is not enabled by an explicit true value.

## Resume order after the stop gate closes

1. Verify the shared MyBiz DB security remediation, operator account, Vercel `SUPABASE_URL` project-ref match, Production schema/migration ledger, and exact candidate/migration hashes without exposing credentials.
2. Obtain a separate Production change decision for the exact canonical migration and exact candidate SHA. Apply the migration only to the verified project; immediately confirm 13 columns, indexes, RLS, grants, zero public policies, and denied anon Data API operations.
3. Deploy the exact SHA with capture OFF. Verify `/` ONURIM, Commercial routes, existing Health pages, mobile, SEO/noindex, sitemap, and robots.
4. Enable capture for the same SHA only after DB and front checks pass. Submit one synthetic inquiry and lead, read both back through the designated operator path, verify success analytics and duplicate handling, then delete only their exact row IDs and confirm absence.
5. If any Production gate fails, turn capture OFF, restore the prior approved deployment, and use the write-lockdown SQL only after verifying its target. Preserve customer records; never auto-drop the table.

`COMMERCIAL_FRONT_READY` remains false until the complete Production smoke and exact synthetic cleanup pass.
