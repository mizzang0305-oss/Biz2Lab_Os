# Biz2Lab Google Submission Log

Date: 2026-06-19 KST
Status: READY_FOR_MANUAL_SUBMISSION

This document records the Google submission checklist for Biz2Lab without
changing production behavior.

## Canonical Site

- Preferred domain: `https://www.biz2lab.com`
- Search Console property URL to use: `https://www.biz2lab.com`
- AdSense site URL: `https://www.biz2lab.com`

## Live Google Files

- Sitemap URL: `https://www.biz2lab.com/sitemap.xml`
- Robots URL: `https://www.biz2lab.com/robots.txt`
- RSS URL: `https://www.biz2lab.com/rss.xml`
- ads.txt URL: `https://www.biz2lab.com/ads.txt`

ads.txt expected status:

- Live URL: `https://www.biz2lab.com/ads.txt`
- Expected line: `google.com, pub-2021259826985155, DIRECT, f08c47fec0942fa0`
- Status: live and ready for AdSense crawl

## Google Submission Status

| Item | Status | Notes |
| --- | --- | --- |
| Search Console property | pending/manual | Use `https://www.biz2lab.com` |
| Sitemap submission | pending/manual | Submit `https://www.biz2lab.com/sitemap.xml` |
| GA4 realtime check | pending/manual | Confirm realtime traffic after visiting the live site |
| AdSense site submission | pending/manual | Use `https://www.biz2lab.com` |
| ads.txt verification | ready | Live at `https://www.biz2lab.com/ads.txt` |

## Required Pages

The following public pages should remain reachable and readable before Google
review:

- `https://www.biz2lab.com/ko/about`
- `https://www.biz2lab.com/ko/contact`
- `https://www.biz2lab.com/ko/privacy`
- `https://www.biz2lab.com/ko/terms`

## Final Forbidden Route Policy

The public site should not expose unfinished, unrelated, or private areas during
Google review. The following route families should stay unavailable unless a
future phase explicitly approves and implements them:

- `/admin`
- `/login`
- `/en`
- `/ja`
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

## Submission Fields

- Search Console submission date: `TBD - manual`
- Sitemap submission date: `TBD - manual`
- GA4 realtime verification date: `TBD - manual`
- AdSense review request date: `TBD - manual`
- Current readiness status: `PASS_READY_TO_SUBMIT`

## Production Behavior

No production behavior change is included in this log. This document does not
change routes, analytics code, AdSense code, `ads.txt`, deployment settings, or
database state.
