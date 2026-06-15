# Preview Interaction QA

Date: 2026-06-15
Preview URL: `https://biz2-lab-os.vercel.app/ko`
Status: local hardening pass, no deploy
Scope: links, buttons, search fallback, contact fallback, download surfaces

## Hard Rules

- Do not deploy from this pass.
- Do not push without explicit approval.
- Do not apply Supabase migrations.
- Do not add real secrets.
- Do not add `/en` or `/ja`.
- Do not add public AI, chat, auth, admin, comments, affiliate, product, review, Amazon, lotto, crawler, or commerce routes.
- Do not call paid APIs.
- Do not run live crawler jobs.

## Fixed Locally

- Header search is now visibly disabled when `NEXT_PUBLIC_PAGEFIND_ENABLED=false`.
- Disabled search cannot accept typing and shows the Korean label `검색은 승인 후 활성화 예정입니다.`
- Contact page no longer submits directly to `/api/contact` as a browser navigation.
- Contact submission now handles Supabase-not-configured responses in-page with a Korean status message.
- Optional contact email fallback is guarded behind `NEXT_PUBLIC_CONTACT_EMAIL`; no real email is committed.
- Forbidden route validation now includes `/products` and `/shop`.
- Added `npm run audit:interactions` for static link/button/download/fallback regression checks.

## Allowed Route Smoke

Expected status: `200`

- `https://biz2-lab-os.vercel.app/`
- `https://biz2-lab-os.vercel.app/ko`
- `https://biz2-lab-os.vercel.app/ko/automation`
- `https://biz2-lab-os.vercel.app/ko/sales-ops`
- `https://biz2-lab-os.vercel.app/ko/small-business`
- `https://biz2-lab-os.vercel.app/ko/contracts-payments`
- `https://biz2-lab-os.vercel.app/ko/about`
- `https://biz2-lab-os.vercel.app/ko/contact`
- `https://biz2-lab-os.vercel.app/ko/privacy`
- `https://biz2-lab-os.vercel.app/ko/terms`
- `https://biz2-lab-os.vercel.app/sitemap.xml`
- `https://biz2-lab-os.vercel.app/robots.txt`
- `https://biz2-lab-os.vercel.app/rss.xml`

## Forbidden Route Smoke

Expected status: `404`

- `https://biz2-lab-os.vercel.app/en`
- `https://biz2-lab-os.vercel.app/ja`
- `https://biz2-lab-os.vercel.app/admin`
- `https://biz2-lab-os.vercel.app/login`
- `https://biz2-lab-os.vercel.app/ai`
- `https://biz2-lab-os.vercel.app/chat`
- `https://biz2-lab-os.vercel.app/research`
- `https://biz2-lab-os.vercel.app/crawler`
- `https://biz2-lab-os.vercel.app/commerce`
- `https://biz2-lab-os.vercel.app/affiliate`
- `https://biz2-lab-os.vercel.app/tools`
- `https://biz2-lab-os.vercel.app/reviews`
- `https://biz2-lab-os.vercel.app/amazon`
- `https://biz2-lab-os.vercel.app/lotto`
- `https://biz2-lab-os.vercel.app/products`
- `https://biz2-lab-os.vercel.app/shop`

## Interaction Checks

- Header logo goes to `/ko`.
- Header category links go only to Korean hub routes.
- Footer category and policy links go only to allowed Korean/static routes.
- Article cards go to `/ko/{category}/{slug}`.
- Category cards go to the four Korean hubs only.
- Breadcrumb links stay inside `/ko`.
- Markdown internal links resolve to published Korean routes.
- No `href="#"`, empty href, or `javascript:void(0)` links are allowed.
- Buttons must declare `type`.
- Download anchors are not allowed unless the target file exists under `public/`.
- Template CTA remains informational only; it must not imply a live downloadable file.

## Contact Fallback Checks

When Supabase env vars are not configured:

- The form remains on `/ko/contact`.
- The user sees a Korean unavailable-state message.
- The form must not navigate to raw JSON.
- No service role key or secret value is exposed.
- If `NEXT_PUBLIC_CONTACT_EMAIL` is empty, no email address is shown.

When Supabase env vars are configured in a future approved pass:

- Successful submission should show an in-page success message.
- Invalid input should show an in-page validation message.
- Server errors should show an in-page retry message.

## Search Fallback Checks

When `NEXT_PUBLIC_PAGEFIND_ENABLED=false`:

- Search input is disabled.
- The disabled state is visible.
- Korean status text is visible.
- No Pagefind script is requested.

When Pagefind is enabled in a future approved pass:

- `/pagefind/pagefind.js` must exist after `npm run build-search`.
- Two-character-or-longer queries should show results or a clear index-pending message.
- Search results must link only to Korean public pages.

## Local Validation

Run before any push or redeploy request:

```bash
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run audit:interactions
npm run check:links
npm run build
```

Optional future checks:

```bash
npm run build-search
npm run validate:images
```

## Result Standard

This pass is complete only when:

- All local validation commands pass.
- Allowed routes return `200`.
- Forbidden routes return `404`.
- Search is disabled or functional, never silently inert.
- Contact form fails gracefully when Supabase is not configured.
- No deploy, push, DB write, secret addition, live crawler, paid API call, or forbidden public route is introduced.
