# Biz2Lab Webmaster Registration Current Status

Status: `OWNER_ACTION_REQUIRED`

This report records what the repository and public site can prove now. It does not log in to Google Search Console or Naver Search Advisor, does not call provider APIs, and does not claim crawl, index, sitemap submission, or verification success without owner UI evidence.

## Current Truthful States

| Provider / item | Status | Evidence / next action |
| --- | --- | --- |
| Google property visibility | `GOOGLE_PROPERTY_VISIBLE_FROM_OWNER_SCREENSHOT` | Owner screenshot showed the `biz2lab.com` property is accessible. Repo cannot confirm current UI state. |
| Google sitemap submission | `GOOGLE_SITEMAP_SUBMISSION_OWNER_UNKNOWN` | Owner must confirm in Search Console after submitting `https://www.biz2lab.com/sitemap.xml` or `sitemap.xml`. |
| Google URL inspection | `GOOGLE_URL_INSPECTION_OWNER_UNKNOWN` | Owner must inspect priority URLs and record Google-selected canonical, crawl/index allowance, fetch result, and indexing request status. |
| Naver registered site | `NAVER_REGISTERED_HTTP_HOST` | Naver accepted `http://www.biz2lab.com`; `https://www.biz2lab.com` registration was rejected by the UI. |
| Naver verification file | `NAVER_VERIFICATION_FILE_DEPLOYED` | `https://www.biz2lab.com/naver30b0597bfd90831b38cf281c10ce53c0.html` returns the exact verification body. |
| Naver owner verify click | `NAVER_OWNER_VERIFY_CLICK_OWNER_UNKNOWN` | Owner must click Verify in Naver Search Advisor. Do not mark verified until owner reports UI success. |
| Naver sitemap/RSS submission | `NAVER_SITEMAP_RSS_OWNER_UNKNOWN` | Owner may submit under the registered HTTP host if Naver requires matching scheme: `http://www.biz2lab.com/sitemap.xml` and `http://www.biz2lab.com/rss.xml`. |
| Connected provider APIs | `CONNECTED_API_NOT_CONFIGURED` | No Google/Naver analytics or webmaster API credentials are configured or called by this repo. |

## Canonical / Naver Host Rule

- Production canonical host remains `https://www.biz2lab.com`.
- Sitemap and RSS canonical URLs remain `https://www.biz2lab.com`.
- Naver registered site is `http://www.biz2lab.com`.
- HTTP to HTTPS redirect is expected.
- Sitemap/RSS submission remains acceptable under the registered `http://www.biz2lab.com` host as long as `www.biz2lab.com` redirects and the files are accessible.
- Do not require a second HTTPS Naver registration, because the owner reported that Naver rejected the HTTPS registration.

## What Is Not Claimed

- Google sitemap submitted: `OWNER_UNKNOWN`
- Google URL inspection complete: `OWNER_UNKNOWN`
- Naver verified: `OWNER_UNKNOWN`
- Naver sitemap/RSS submitted: `OWNER_UNKNOWN`
- Indexed/crawled/ranked status: `OWNER_UNKNOWN`
- Search impressions, clicks, CTR, ranking, queries, referrers, and AI answer inclusion: not connected and not fabricated

## Dashboard Copy Standard

The SEO ops dashboard should keep this distinction clear:

```text
Google Search Console과 Naver Search Advisor 상태는 실제 계정 UI에서 확인되기 전까지 완료로 표시하지 않습니다.
```

This means deployed verification files and crawlable discovery files can be shown as ready, but provider-side verification and submission remain owner-confirmed states.
