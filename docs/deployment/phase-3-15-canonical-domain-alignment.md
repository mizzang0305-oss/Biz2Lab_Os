# Phase 3.15 Canonical Domain Alignment

Date: 2026-06-16
Status: implementation plan and verification record
Scope: canonical URL alignment for AdSense readiness

## Domain Decision

Official URL:

- `https://www.biz2lab.com`

Redirect behavior to preserve:

- `https://biz2lab.com` should continue to redirect to `https://www.biz2lab.com`.
- `https://www.biz2lab.com` should be the final browser URL and the canonical metadata host.

Canonical surfaces aligned to `https://www.biz2lab.com`:

- Metadata base URL.
- Canonical links.
- Open Graph URL.
- Twitter image URLs.
- Sitemap `loc` URLs.
- `robots.txt` sitemap URL.
- RSS channel link, item links, and item GUIDs.
- Organization, Website, Article, and Breadcrumb JSON-LD URLs.
- Article frontmatter canonical values.
- `.env.example` documented site URL.

## Code Alignment

Canonical URL source:

- `lib/site.ts` exposes `officialSiteUrl = "https://www.biz2lab.com"`.
- `siteConfig.url` resolves to the official URL.
- If `NEXT_PUBLIC_SITE_URL` is configured, it is accepted only when it matches `https://www.biz2lab.com`.
- Apex, localhost, and Vercel preview URL values are not used as canonical values.

Environment status:

- `REQUIRED_ENV_CHANGE`: none for this phase.
- No Vercel env variable was changed.
- If a future settings audit finds `NEXT_PUBLIC_SITE_URL` configured in Vercel, it should be set to `https://www.biz2lab.com` for hygiene in a separately approved settings phase.

## Search Console Preparation

Recommended properties:

1. Domain property: `biz2lab.com`
2. URL-prefix property: `https://www.biz2lab.com`

Sitemap submission URL:

- `https://www.biz2lab.com/sitemap.xml`

Verification notes:

- DNS TXT values must come from Search Console.
- Do not invent or guess a DNS TXT value.
- This phase does not add a Search Console verification meta tag or HTML verification file.
- Apply verification values only after the user provides the exact value and approves the separate verification phase.

## GA4 Preparation

Required value:

- GA4 Measurement ID, format `G-XXXXXXXXXX`

Implementation plan:

- Do not insert GA4 in this phase.
- After user approval, add a controlled client-side insertion path using a documented environment variable such as `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Re-check the privacy page before deploying analytics.
- Keep tracking limited to basic page views before AdSense review.

Not allowed before explicit approval:

- Session replay.
- Identity stitching.
- Contact form content tracking.
- Raw search query analytics.
- Intrusive popups or banners not required by the actual tracking setup.

## AdSense Preparation

Required value:

- AdSense client or publisher ID, format `ca-pub-xxxxxxxxxxxxxxxx`

Implementation plan:

- Do not insert AdSense script in this phase.
- After user approval, insert the real Google-provided client ID through a controlled layout/script path.
- Do not guess or hardcode an unknown publisher ID.
- Do not add ad slots to forbidden/internal routes.
- Re-run build, route smoke, and manual mobile/desktop review after insertion.

## ads.txt Preparation

Required value:

- Real AdSense publisher ID from Google.

Example format only:

```text
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

Rules:

- Do not create `public/ads.txt` until the real publisher ID is provided.
- Do not deploy a placeholder `ads.txt`.
- After approval, confirm `https://www.biz2lab.com/ads.txt` returns the exact Google-provided line.

## Pre-Application Checklist

Before AdSense submission, verify:

- 25 RSS items.
- 35 sitemap URLs.
- `/ko/privacy` returns `200`.
- `/ko/terms` returns `200`.
- Forbidden routes return `404`.
- Mobile article readability is acceptable.
- TOP3 image visibility remains intact.
- No localhost URL appears in canonical, sitemap, robots, RSS, Open Graph, or JSON-LD output.
- No Vercel preview URL appears in canonical, sitemap, robots, RSS, Open Graph, or JSON-LD output.
- No forbidden public route appears in sitemap or RSS.

## Forbidden Scope Confirmed

This phase does not add:

- AdSense script.
- GA4 script.
- Search Console verification meta tag.
- Search Console verification file.
- `ads.txt`.
- DNS changes.
- Vercel settings changes.
- Manual Vercel deployment.
- Supabase env or migration.
- `/admin`, `/login`, `/en`, `/ja`, `/ai`, or `/chat` routes.
