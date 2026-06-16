# AdSense Application Package

Date: 2026-06-16
Status: plan-only package
Scope: owner handoff for Search Console, GA4, AdSense, and ads.txt readiness

## Official Site

- Official URL: `https://www.biz2lab.com`
- Apex behavior: `https://biz2lab.com` redirects to `https://www.biz2lab.com`.
- Canonical host: `https://www.biz2lab.com`
- Sitemap: `https://www.biz2lab.com/sitemap.xml`
- Robots: `https://www.biz2lab.com/robots.txt`
- RSS: `https://www.biz2lab.com/rss.xml`

## Current Site Package

Content and safety surface:

- 25 published Korean posts.
- 4 public Korean content hubs.
- About page.
- Contact page.
- Privacy page.
- Terms page.
- Sitemap route.
- Robots route.
- RSS route.
- TOP3 premium article images on home and article pages.

Forbidden public surface must remain absent:

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

## Search Console Package

Recommended registration:

1. Domain property: `biz2lab.com`
2. URL-prefix property: `https://www.biz2lab.com`

Submit sitemap:

- `https://www.biz2lab.com/sitemap.xml`

Values needed from user:

- Search Console DNS TXT value, if using domain property.
- Exact HTML tag or file value, only if using a URL-prefix verification method.

Implementation boundary:

- This package does not add verification meta/file values.
- Use only values copied from Search Console.
- Apply verification in a separate approved phase.

## GA4 Package

Value needed from user:

- GA4 Measurement ID, for example `G-XXXXXXXXXX`.

Planned implementation after approval:

- Add a documented env variable, for example `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Insert the GA4 tag only when the real ID is provided.
- Keep initial tracking to basic page views.
- Re-check privacy wording before deployment.

This package adds no GA4 code.

## AdSense Package

Value needed from user:

- Real Google AdSense client/publisher ID, for example `ca-pub-xxxxxxxxxxxxxxxx`.

Planned implementation after approval:

- Add the real AdSense client ID through a controlled script insertion path.
- Avoid excessive ad slots before review.
- Do not serve ads on forbidden/internal routes.
- Re-run full validation and live smoke after insertion.

This package adds no AdSense script.

## ads.txt Package

Value needed from user:

- Real publisher ID from AdSense.

Expected future format:

```text
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

Rules:

- Replace `pub-0000000000000000` only with the real Google-provided publisher ID.
- Do not create `public/ads.txt` with a placeholder.
- After approval and deployment, verify `https://www.biz2lab.com/ads.txt`.

This package adds no `ads.txt` file.

## Final Application Smoke

Run before submitting AdSense:

- Confirm `https://www.biz2lab.com` returns `200`.
- Confirm `https://biz2lab.com` redirects to `https://www.biz2lab.com`.
- Confirm canonical tags use `https://www.biz2lab.com`.
- Confirm Open Graph URL uses `https://www.biz2lab.com`.
- Confirm sitemap URLs use `https://www.biz2lab.com`.
- Confirm RSS links use `https://www.biz2lab.com`.
- Confirm `robots.txt` references `https://www.biz2lab.com/sitemap.xml`.
- Confirm sitemap has 35 URLs.
- Confirm RSS has 25 items.
- Confirm `/ko/privacy` and `/ko/terms` return `200`.
- Confirm forbidden routes return `404`.
- Confirm TOP3 image visibility remains intact.
- Confirm no localhost or Vercel preview URL appears in public SEO output.

## Not Included

This plan-only package does not include:

- Search Console verification value.
- GA4 Measurement ID.
- AdSense client or publisher ID.
- AdSense script.
- GA4 script.
- `ads.txt`.
- DNS change.
- Vercel settings change.
- Manual deploy.
