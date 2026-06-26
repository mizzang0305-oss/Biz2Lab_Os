# Biz2Lab Search Console / Naver Registration Readiness

Status: READY FOR OWNER MANUAL REGISTRATION

This report verifies local and public-discovery prerequisites for search engine registration. It does not read Google Search Console, Naver Search Advisor, GA4, Vercel Analytics, Umami, or any external analytics API.

## Summary

| Item | Result |
| --- | --- |
| Published Korean articles | 46 |
| Keyword map coverage | 46 / 46 |
| Sitemap coverage for published articles | 46 / 46 |
| RSS coverage for published articles | 46 / 46 |
| Canonical host | `https://www.biz2lab.com` |
| Robots file | `https://www.biz2lab.com/robots.txt` |
| Sitemap URL | `https://www.biz2lab.com/sitemap.xml` |
| RSS URL | `https://www.biz2lab.com/rss.xml` |
| Fake analytics used | NO |
| Meta keywords used | NO |

## Google Search Console Readiness

Biz2Lab is locally ready for Search Console registration because public articles have canonical URLs, sitemap entries, RSS entries, titles, descriptions, hero images, and internal links.

Owner action still required:

1. Add `https://www.biz2lab.com` or the domain property in Google Search Console.
2. Complete site ownership verification in the owner account.
3. Submit `https://www.biz2lab.com/sitemap.xml`.
4. Optionally inspect representative article URLs after deployment is current.
5. Do not treat empty query data as a failure until Search Console has enough impressions.

## Naver Search Advisor Readiness

Biz2Lab is locally ready for Naver Search Advisor registration because the site exposes crawlable Korean article routes, sitemap, RSS, canonical URLs, and robots.txt.

Owner action still required:

1. Register `https://www.biz2lab.com` in Naver Search Advisor.
2. Complete site ownership verification.
3. Submit `https://www.biz2lab.com/sitemap.xml`.
4. Submit or check `https://www.biz2lab.com/rss.xml` if the owner workflow supports it.
5. Use Naver's URL collection tools only from the owner account.

## Current Caveat

Search Console과 Naver Search Advisor 연결 상태는 실제 계정/API가 연결되기 전까지 수동 확인 항목으로 표시합니다.

The SEO ops dashboard must not show invented impressions, clicks, CTR, rankings, pageviews, referrers, or query lists before real connectors are explicitly configured.

## Representative Routes To Inspect Manually

- `https://www.biz2lab.com/ko/automation/free-open-source-automation-tools-series`
- `https://www.biz2lab.com/ko/automation/flowise-ai-agent-workflow-automation`
- `https://www.biz2lab.com/ko/automation/directus-headless-cms-data-automation`
- `https://www.biz2lab.com/ko/automation/pocketbase-lightweight-backend-saas-mvp`
- `https://www.biz2lab.com/ko/automation/supabase-self-hosting-cost-operations-caution`
- `https://www.biz2lab.com/ko/automation/meilisearch-blog-product-search-automation`
- `https://www.biz2lab.com/ko/automation/typesense-product-document-search-automation`

## Decision

No code-side indexability blocker was found. The next step is owner-side account registration and sitemap submission.
