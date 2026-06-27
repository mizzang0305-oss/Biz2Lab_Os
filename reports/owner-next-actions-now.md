# Biz2Lab Owner Next Actions Now

Status: `OWNER_ACTION_REQUIRED`

These are UI actions only. Codex must not log in, submit, verify, or mark completion without owner confirmation. Owner screenshots have confirmed some sitemap/RSS states, but crawl, index, ranking, traffic, query, referrer, and AI answer status remain unclaimed.

## Google Search Console

1. Open Google Search Console.
2. Select `biz2lab.com`.
3. Go to `Sitemaps`.
4. Confirm the existing owner-screenshot state remains visible:

- `GOOGLE_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED`
- `GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED`
- `GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT`
- Submitted sitemap: `https://www.biz2lab.com/sitemap.xml`

5. Use URL Inspection for:

```text
https://www.biz2lab.com/
https://www.biz2lab.com/ko/automation/free-open-source-automation-tools-series
https://www.biz2lab.com/ko/automation/umami-open-source-analytics-ga-alternative
https://www.biz2lab.com/ko/automation/typesense-product-document-search-automation
https://www.biz2lab.com/ko/automation/supabase-self-hosting-cost-operations-caution
```

6. Request indexing where available if the UI allows it.
7. Record these results for each URL:

- URL is on Google / not on Google
- crawl allowed
- indexing allowed
- user-declared canonical
- Google-selected canonical
- page fetch success/fail
- mobile rendering status
- indexing request submitted YES/NO

Do not mark:

- Google indexed
- Google crawled
- Google ranking
- traffic/impressions/clicks
- AI answer inclusion

## Naver Search Advisor

1. Open Naver Search Advisor.
2. Select registered site:

```text
http://www.biz2lab.com
```

3. Confirm the existing owner-screenshot state remains visible:

- `NAVER_REGISTERED_HTTP_HOST_OWNER_SCREENSHOT_CONFIRMED`
- `NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED`
- `NAVER_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED`
- `NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED`
- `NAVER_VERIFICATION_FILE_DEPLOYED`

4. If the Naver UI still shows a Verify action, click Verify and report the exact UI result. Do not mark Naver as verified until owner confirms UI success.
5. Confirm robots/Yeti access:

```text
http://www.biz2lab.com/robots.txt
```

6. After crawler delay, check manually if desired:

```text
site:www.biz2lab.com
site:biz2lab.com Biz2Lab
```

Do not mark:

- Naver crawled
- Naver indexed
- Naver search exposure
- traffic/clicks
- ranking

## Important Notes

- Do not delete the `http://www.biz2lab.com` Naver registration just because production canonical URLs are HTTPS.
- Canonical stays `https://www.biz2lab.com`.
- Sitemap and RSS canonical URLs stay on `https://www.biz2lab.com`.
- Naver registration proceeds through the registered HTTP host because the UI rejected HTTPS.
- HTTP to HTTPS redirect is expected.
- The Naver verification file is deployed and exact-body matched. Naver dashboard/sitemap/RSS are owner-screenshot-confirmed, but Naver is not verified until owner confirms UI success.
- Do not change `robots.txt`.
- Do not replace production robots with a Yeti-only file.
- Do not report crawl, index, impressions, clicks, CTR, ranking, query, referrer, or AI answer status unless the owner provides real evidence.
