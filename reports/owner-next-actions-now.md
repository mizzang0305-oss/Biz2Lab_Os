# Biz2Lab Owner Next Actions Now

Status: `OWNER_ACTION_REQUIRED`

These are UI actions only. Codex must not log in, submit, verify, or mark completion without owner confirmation.

## Google Search Console

1. Open Google Search Console.
2. Select `biz2lab.com`.
3. Go to `Sitemaps`.
4. Submit one of these values, depending on what the UI accepts:

```text
sitemap.xml
```

```text
https://www.biz2lab.com/sitemap.xml
```

5. Use URL Inspection for:

```text
https://www.biz2lab.com/
https://www.biz2lab.com/ko/automation/free-open-source-automation-tools-series
https://www.biz2lab.com/ko/automation/umami-open-source-analytics-ga-alternative
https://www.biz2lab.com/ko/automation/typesense-product-document-search-automation
https://www.biz2lab.com/ko/automation/supabase-self-hosting-cost-operations-caution
```

6. Request indexing where available.
7. Record these results for each URL:

- URL is on Google / not on Google
- crawl allowed
- indexing allowed
- user-declared canonical
- Google-selected canonical
- page fetch success/fail
- mobile rendering status
- indexing request submitted YES/NO

## Naver Search Advisor

1. Open Naver Search Advisor.
2. Select registered site:

```text
http://www.biz2lab.com
```

3. Click Verify / 소유확인.
4. If Naver requires the registered host scheme, submit:

```text
http://www.biz2lab.com/sitemap.xml
http://www.biz2lab.com/rss.xml
```

5. Confirm robots/Yeti access:

```text
http://www.biz2lab.com/robots.txt
```

6. After crawler delay, check:

```text
site:www.biz2lab.com
site:biz2lab.com Biz2Lab
```

## Important Notes

- Do not delete the `http://www.biz2lab.com` Naver registration just because production canonical URLs are HTTPS.
- Canonical stays `https://www.biz2lab.com`.
- Naver registration proceeds through the registered HTTP host because the UI rejected HTTPS.
- The Naver verification file is deployed and exact-body matched, but Naver is not verified until owner confirms UI success.
- Do not report sitemap submission, indexing, crawl, impressions, clicks, CTR, ranking, or query data unless the owner provides real evidence.
