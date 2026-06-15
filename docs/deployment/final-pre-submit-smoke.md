# Final Pre-Submit Smoke Plan

Date: 2026-06-15
Status: smoke plan only
Scope: local, preview, and production route checks

## Local Validation Commands

Run before preview deployment and again before AdSense submission:

```bash
git status
git log --oneline -5
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run build
```

Expected local state:

- Working tree clean before deployment.
- 25 published Korean posts.
- 10 static public routes.
- 25 sitemap posts.
- Build generates the expected app route surface.
- No secrets in Git.
- No `.env`, `.env.local`, or `.env.production` committed.

## Allowed Routes

Expected `200` on preview and production:

- `/`
- `/ko`
- `/ko/automation`
- `/ko/sales-ops`
- `/ko/small-business`
- `/ko/contracts-payments`
- `/ko/about`
- `/ko/contact`
- `/ko/privacy`
- `/ko/terms`
- `/ko/automation/ai-business-automation-guide`
- `/ko/automation/google-sheets-ai-automation`
- `/ko/sales-ops/payment-reminder-message`
- `/ko/small-business/ai-knowledge-store-for-small-business`
- `/ko/contracts-payments/offline-card-payment-pg-van`
- `/sitemap.xml`
- `/robots.txt`
- `/rss.xml`

## Forbidden Routes

Expected `404` on preview and production:

- `/en`
- `/ja`
- `/admin`
- `/login`
- `/ai`
- `/chat`
- `/research`
- `/crawler`
- `/commerce`
- `/affiliate`
- `/tools`
- `/reviews`
- `/amazon`
- `/lotto`
- `/products`
- `/shop`

## Content Smoke

For each representative article:

- [ ] Title renders naturally in Korean.
- [ ] Description/search intent is clear.
- [ ] Breadcrumbs are present.
- [ ] Related posts are relevant.
- [ ] Checklist is visible and useful.
- [ ] FAQ is not repetitive.
- [ ] No affiliate/product/lottery or public AI/chat/admin links appear.

Representative articles:

- `/ko/automation/ai-business-automation-guide`
- `/ko/automation/google-sheets-ai-automation`
- `/ko/sales-ops/payment-reminder-message`
- `/ko/small-business/ai-knowledge-store-for-small-business`
- `/ko/contracts-payments/offline-card-payment-pg-van`

## SEO Smoke

- [ ] Canonical tags use `https://biz2lab.com`.
- [ ] Open Graph URL uses `https://biz2lab.com`.
- [ ] Sitemap URLs use `https://biz2lab.com`.
- [ ] RSS links use `https://biz2lab.com`.
- [ ] Robots sitemap points to `https://biz2lab.com/sitemap.xml`.
- [ ] No preview URL is hardcoded as canonical.

## Manual Browser Checks

- [ ] Desktop viewport.
- [ ] Mobile viewport.
- [ ] Header navigation.
- [ ] Footer navigation.
- [ ] Contact form fallback behavior.
- [ ] Required static pages.
- [ ] 404 behavior for forbidden routes.

Do not proceed to AdSense submission if any smoke check fails.
