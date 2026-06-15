# Domain Live Connection Report

Date: 2026-06-15
Status: domain connection pending
Scope: `biz2lab.com` production domain preparation only

## Executive Status

Phase 3.6 did not change app behavior, routes, environment variables, DNS, or Vercel settings.

- Current production deployment URL: `https://biz2-lab-os.vercel.app`
- Target domain: `biz2lab.com`
- Preferred canonical: `https://biz2lab.com`
- Vercel project: `biz2-lab-os`
- Vercel account checked by CLI: `mizzang0305-4518`
- Domain CLI state: `vercel domains inspect biz2lab.com` returned `Domain not found`
- Result: manual domain connection is still required in the Vercel Dashboard

## Local Verification

Commands run on 2026-06-15:

```bash
git status --short
git log --oneline -5
git remote -v
npm test
npm run lint
npm run typecheck
npm run validate:posts
npm run validate:seo
npm run check:links
npm run audit:interactions
npm run build
```

Observed result:

- Working tree was clean before this report file was created.
- Latest branch state: `master` at `3a833e6`, tracking `origin/master`.
- Remote: `https://github.com/mizzang0305-oss/Biz2Lab_Os.git`.
- `npm test`: PASS, 9 tests.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run validate:posts`: PASS, 25 public Korean posts.
- `npm run validate:seo`: PASS, 10 static routes and 25 sitemap posts.
- `npm run check:links`: PASS.
- `npm run audit:interactions`: PASS.
- `npm run build`: PASS, expected Korean-only route surface.

Safety checks:

- `.env`, `.env.local`, and `.env.production` are not present in the workspace root.
- Secret pattern scan returned no matches.
- Forbidden public route directories were not found under `app`.
- Local `node_modules` and `.next` exist as untracked/ignored dependency and build output directories only.

## Current Vercel URL Smoke

Base URL: `https://biz2-lab-os.vercel.app`

Status: PASS by `curl.exe` HTTP checks. PowerShell `Invoke-WebRequest` returned non-status `ERROR` for successful HTML routes, so `curl.exe` was used as the status-code source of truth.

Expected `200` and observed `200`:

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
- `/sitemap.xml`
- `/robots.txt`
- `/rss.xml`

Representative article checks, expected `200` and observed `200`:

- `/ko/automation/ai-business-automation-guide`
- `/ko/automation/google-sheets-ai-automation`
- `/ko/sales-ops/payment-reminder-message`
- `/ko/small-business/ai-knowledge-store-for-small-business`
- `/ko/contracts-payments/offline-card-payment-pg-van`

Expected `404` and observed `404`:

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

## Domain Connection Status

Target production domain:

- Apex: `biz2lab.com`
- Preferred canonical URL: `https://biz2lab.com`
- Sitemap target: `https://biz2lab.com/sitemap.xml`
- Robots target: `https://biz2lab.com/robots.txt`
- RSS target: `https://biz2lab.com/rss.xml`

WWW strategy:

- Preferred: redirect `www.biz2lab.com` to `biz2lab.com`.
- Current status: pending.
- Do not mark `www` complete until Vercel shows it as configured and SSL active.

DNS method:

- Current method: not selected.
- Acceptable methods: Vercel nameservers, or registrar DNS records using Vercel-provided A/CNAME values.
- Required DNS values: unavailable from CLI because `biz2lab.com` is not connected yet.
- Do not invent DNS records. Copy only the exact records shown by Vercel after adding the domain in the project dashboard.

SSL status:

- `biz2lab.com`: pending.
- `www.biz2lab.com`: pending.
- Continue only after Vercel shows the domain verified and SSL active.

Propagation status:

- Pending manual domain connection.
- DNS propagation can take minutes to hours after registrar changes.
- Re-run smoke only after Vercel shows the target domain as valid.

## Manual Domain Action Required

The user must perform this step manually:

1. Open the Vercel Dashboard.
2. Go to project `biz2-lab-os`.
3. Open Settings -> Domains.
4. Add `biz2lab.com`.
5. Also add `www.biz2lab.com` if the `www` redirect will be used.
6. Follow Vercel's displayed DNS instructions exactly.
7. Wait until Vercel shows the domain verified and SSL active.
8. Return with the domain status or a screenshot of the Vercel domain screen.

Do not add Search Console, GA4, AdSense, or `ads.txt` before the domain is connected and the live-domain smoke passes.

## Live Domain Smoke Checklist

Run only after the user confirms that `biz2lab.com` is connected, verified, and SSL active.

Base URL: `https://biz2lab.com`

Expected `200`:

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
- `/sitemap.xml`
- `/robots.txt`
- `/rss.xml`

Representative articles, expected `200`:

- `/ko/automation/ai-business-automation-guide`
- `/ko/automation/google-sheets-ai-automation`
- `/ko/sales-ops/payment-reminder-message`
- `/ko/small-business/ai-knowledge-store-for-small-business`
- `/ko/contracts-payments/offline-card-payment-pg-van`

Expected `404`:

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

Metadata checks:

- Sitemap URLs use `https://biz2lab.com`.
- `robots.txt` references `https://biz2lab.com/sitemap.xml`.
- Canonical URLs use `https://biz2lab.com`.
- RSS links use `https://biz2lab.com`.
- No Vercel preview URL is hardcoded in public metadata.
- No `localhost` URL appears in public output.

Responsive smoke after domain connection:

- Viewports: `320x640`, `360x740`, `375x812`, `390x844`, `414x896`, `768x1024`, `1024x768`, `1280x720`, `1440x900`.
- Pages: `/ko`, four hubs, `/ko/contact`, `/ko/privacy`, and five representative articles.
- Required result: no horizontal overflow, no text overflow, no console errors, disabled search remains disabled, contact fallback stays in-page, no raw JSON shown, `/admin`, `/en`, and `/ja` remain 404.

## Stop Gates

Stop before the next phase if any of these occur:

- Domain verification fails.
- SSL is not active.
- DNS records are unclear or conflict with existing registrar records.
- Canonical URLs point to a preview URL.
- Any forbidden route returns `200`.
- A secret or paid API key is requested.
- A DB write or Supabase migration is required.
