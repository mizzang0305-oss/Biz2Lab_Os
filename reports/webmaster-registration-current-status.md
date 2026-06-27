# Biz2Lab Webmaster Registration Current Status

Status: `OWNER_ACTION_REQUIRED`

This report records what the repository, public site, and owner-provided screenshots can prove now. It does not log in to Google Search Console or Naver Search Advisor, does not call provider APIs, and does not claim crawl, index, search exposure, traffic, ranking, or AI answer inclusion.

## Current Truthful States

| Provider / item | Status | Evidence / next action |
| --- | --- | --- |
| Google property visibility | `GOOGLE_PROPERTY_VISIBLE_FROM_OWNER_SCREENSHOT` | Owner screenshot showed the `biz2lab.com` property is accessible. |
| Google sitemap submission | `GOOGLE_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED` | Owner screenshot showed submitted sitemap `https://www.biz2lab.com/sitemap.xml`. |
| Google sitemap status | `GOOGLE_SITEMAP_STATUS_SUCCESS_OWNER_SCREENSHOT_CONFIRMED` | Owner screenshot showed sitemap status success. |
| Google discovered pages | `GOOGLE_DISCOVERED_PAGES_40_OWNER_SCREENSHOT` | Owner screenshot showed 40 discovered pages. This is not an index, crawl, ranking, traffic, or AI answer claim. |
| Google URL inspection | `GOOGLE_URL_INSPECTION_OWNER_UNKNOWN` | URL inspection state and indexing requests are not confirmed. |
| Google indexing request | `GOOGLE_INDEXING_REQUEST_OWNER_UNKNOWN` | Indexing requests are not confirmed. |
| Naver registered site | `NAVER_REGISTERED_HTTP_HOST_OWNER_SCREENSHOT_CONFIRMED` | Owner screenshot confirmed registered site `http://www.biz2lab.com`; production canonical remains HTTPS. |
| Naver verification file | `NAVER_VERIFICATION_FILE_DEPLOYED` | `https://www.biz2lab.com/naver30b0597bfd90831b38cf281c10ce53c0.html` returns the exact verification body. |
| Naver site dashboard | `NAVER_SITE_DASHBOARD_ACCESSIBLE_OWNER_SCREENSHOT_CONFIRMED` | Owner screenshot showed the Naver site dashboard is accessible. |
| Naver sitemap submission | `NAVER_SITEMAP_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED` | Owner screenshot showed `sitemap.xml` submitted under the registered site. |
| Naver RSS submission | `NAVER_RSS_SUBMITTED_OWNER_SCREENSHOT_CONFIRMED` | Owner screenshot showed RSS submitted as `http://www.biz2lab.com/rss.xml`. |
| Connected provider APIs | `CONNECTED_API_NOT_CONFIGURED` | No Google/Naver analytics or webmaster API credentials are configured or called by this repo. |

## Canonical / Naver Host Rule

- Production canonical host remains `https://www.biz2lab.com`.
- Sitemap and RSS canonical URLs remain `https://www.biz2lab.com`.
- Naver registered site is `http://www.biz2lab.com`.
- HTTP to HTTPS redirect is expected.
- Sitemap/RSS submission remains acceptable under the registered `http://www.biz2lab.com` host as long as `www.biz2lab.com` redirects and the files are accessible.
- Do not require a second HTTPS Naver registration, because the owner reported that Naver rejected the HTTPS registration.

## What Is Not Claimed

- Google sitemap submitted: `OWNER_SCREENSHOT_CONFIRMED`
- Google sitemap status success: `OWNER_SCREENSHOT_CONFIRMED`
- Google discovered pages: `40_OWNER_SCREENSHOT`
- Google URL inspection complete: `OWNER_UNKNOWN`
- Google indexing request submitted: `OWNER_UNKNOWN`
- Naver dashboard accessible: `OWNER_SCREENSHOT_CONFIRMED`
- Naver verified: `OWNER_UNKNOWN`
- Naver sitemap/RSS submitted: `OWNER_SCREENSHOT_CONFIRMED`
- Indexed/crawled/ranked status: `OWNER_UNKNOWN`
- Search impressions, clicks, CTR, ranking, queries, referrers, and AI answer inclusion: not connected and not fabricated

## Dashboard Copy Standard

The SEO ops dashboard should keep this distinction clear:

```text
Google Search Console과 Naver Search Advisor 상태는 실제 계정 UI에서 확인되기 전까지 완료로 표시하지 않습니다.
```

This means deployed verification files and crawlable discovery files can be shown as ready, but provider-side verification and submission remain owner-confirmed states.
