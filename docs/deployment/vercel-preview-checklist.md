# Vercel Preview Checklist

Date: 2026-06-15
Status: readiness checklist only
Scope: local documentation, no deploy

## Current Local Facts

- Branch checked: `master`
- Latest local commits:
  - `70d1812 chore: harden Biz2Lab content for AdSense review`
  - `b47069f feat: add Biz2Lab AdSense MVP and Korean content baseline`
- Local Git remote: not configured at the time of this check.
- Framework: Next.js App Router.
- Public build does not require Supabase env vars because API routes have safe fallback behavior.
- Canonical site URL uses `NEXT_PUBLIC_SITE_URL` with fallback `https://biz2lab.com`.

## Vercel Project Setup

- [ ] Connect a GitHub repository to Vercel.
- [ ] Create a Vercel project for Biz2Lab.
- [ ] Confirm Vercel detects the framework as Next.js.
- [ ] Confirm install command uses the repository default (`npm install` unless changed later).
- [ ] Confirm build command: `npm run build`.
- [ ] Confirm output behavior: Next.js app output managed by Vercel, no static export required.
- [ ] Do not enable Pagefind production search until a static indexing strategy is approved.

## Environment Variables

Required for public build:

- None.

Recommended explicit values:

- `NEXT_PUBLIC_SITE_URL=https://biz2lab.com`
- `NEXT_PUBLIC_PAGEFIND_ENABLED=false`

Optional future server-side values:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional future browser values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Rules:

- Do not add real secrets to Git.
- Do not expose service role keys through `NEXT_PUBLIC_*`.
- Keep Supabase variables unset for preview unless fallback API behavior is being intentionally tested.

## Preview Smoke Test List

Run after Vercel preview URL is available. Replace `<preview-url>` with the generated preview domain.

Allowed routes expected `200`:

- `<preview-url>/`
- `<preview-url>/ko`
- `<preview-url>/ko/automation`
- `<preview-url>/ko/sales-ops`
- `<preview-url>/ko/small-business`
- `<preview-url>/ko/contracts-payments`
- `<preview-url>/ko/about`
- `<preview-url>/ko/contact`
- `<preview-url>/ko/privacy`
- `<preview-url>/ko/terms`
- `<preview-url>/ko/automation/ai-business-automation-guide`
- `<preview-url>/ko/sales-ops/payment-reminder-message`
- `<preview-url>/ko/small-business/ai-knowledge-store-for-small-business`
- `<preview-url>/ko/contracts-payments/offline-card-payment-pg-van`
- `<preview-url>/sitemap.xml`
- `<preview-url>/robots.txt`
- `<preview-url>/rss.xml`

Forbidden routes expected `404`:

- `<preview-url>/en`
- `<preview-url>/ja`
- `<preview-url>/admin`
- `<preview-url>/login`
- `<preview-url>/ai`
- `<preview-url>/chat`
- `<preview-url>/research`
- `<preview-url>/crawler`
- `<preview-url>/commerce`
- `<preview-url>/affiliate`
- `<preview-url>/tools`
- `<preview-url>/reviews`
- `<preview-url>/amazon`
- `<preview-url>/lotto`
- `<preview-url>/products`
- `<preview-url>/shop`

## Pre-Deploy Validation

Run locally before requesting any deployment:

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

Do not deploy if any command fails.
