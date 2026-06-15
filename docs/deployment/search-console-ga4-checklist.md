# Search Console and GA4 Checklist

Date: 2026-06-15
Status: readiness checklist only
Scope: Search Console and GA4 preparation

## Search Console

Recommended property type:

- Domain property for `biz2lab.com` if DNS verification is available.
- URL-prefix property for `https://biz2lab.com/` if DNS access is delayed.

Ownership verification options:

- DNS TXT record: preferred for domain property.
- HTML tag: possible after deployment if added through approved metadata work.
- HTML file upload: avoid unless the hosting workflow is explicitly planned.

Sitemap submission:

- Submit `https://biz2lab.com/sitemap.xml`.
- Confirm submitted sitemap shows 25 Korean article URLs plus approved static routes.
- Confirm `/en`, `/ja`, admin, AI, commerce, affiliate, product, Amazon, review, and lottery routes are absent.

Manual Search Console checks:

- [ ] Domain or URL-prefix property verified.
- [ ] Sitemap submitted.
- [ ] Coverage/indexing status monitored.
- [ ] Inspect `/ko` and 3 representative article URLs.
- [ ] Confirm canonical host is `https://biz2lab.com`.

## GA4

Setup notes:

- Create a GA4 web data stream for `https://biz2lab.com`.
- Use only basic pageview measurement before AdSense review.
- Do not enable session replay before AdSense review.
- Do not add intrusive tracking, heatmaps, popups, or identity stitching before review.
- Do not log raw search terms or contact form content.

Implementation rule:

- Do not add a real GA4 measurement ID to code until the ID is available and the user approves the insertion.
- Prefer a documented env variable later, such as `NEXT_PUBLIC_GA_MEASUREMENT_ID`, if analytics is implemented.

Privacy page alignment:

- The current privacy page already states that Google Analytics, Search Console, and AdSense may be used later.
- If GA4 is actually inserted, re-check privacy wording before deployment.

## Pre-AdSense Tracking Policy

Allowed before AdSense review:

- Basic pageview measurement after approval.
- Search Console ownership and sitemap submission.

Not allowed before explicit approval:

- Session replay.
- Personal profile tracking.
- Form-content tracking.
- Raw search query analytics.
- Popups or intrusive consent banners not required by the actual tracking setup.
