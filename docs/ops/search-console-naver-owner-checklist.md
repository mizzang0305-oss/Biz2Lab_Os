# Search Console / Naver Owner Checklist

This checklist is for owner-side search registration. It intentionally avoids API calls, secrets, fake metrics, and automated submission from the repository.

## Required Owner Actions

### Google Search Console

1. Open Google Search Console with the owner Google account.
2. Add `https://www.biz2lab.com` as a URL-prefix property or add the domain property if DNS verification is preferred.
3. Complete ownership verification.
4. Submit `https://www.biz2lab.com/sitemap.xml`.
5. Inspect representative article URLs after the latest Vercel production deployment is live.
6. Wait for real impressions before interpreting query, CTR, or ranking data.

### Naver Search Advisor

1. Open Naver Search Advisor with the owner Naver account.
2. Register `http://www.biz2lab.com`.
3. Complete ownership verification. The Naver verification file is deployed on the production site; owner still must click Verify in the Naver UI.
4. Submit `http://www.biz2lab.com/sitemap.xml` if Naver requires the registered host scheme.
5. Check `http://www.biz2lab.com/rss.xml` if RSS submission is available in the owner workflow.
6. Use URL collection only for real published routes.

Naver registration note:

- Production canonical URLs remain `https://www.biz2lab.com`.
- HTTP to HTTPS redirect is expected.
- Do not add a separate "HTTPS registration required" step unless Naver later accepts and requires it.
- Sitemap/RSS submission is acceptable under the registered `http://www.biz2lab.com` host as long as the host is `www.biz2lab.com` and redirect/access works.
- Do not mark Naver as verified until the owner confirms UI success.

## Files To Verify

- `https://www.biz2lab.com/sitemap.xml`
- `https://www.biz2lab.com/rss.xml`
- `https://www.biz2lab.com/robots.txt`

## Repository Rules

- Do not commit Search Console or Naver verification secrets.
- Do not add fake traffic numbers to the dashboard.
- Do not add `meta keywords`.
- Do not change article slugs, routes, or canonicals for registration.
- Keep `/ko/ops/seo-dashboard` noindex and out of sitemap/RSS.

## Dashboard Copy

The SEO ops dashboard should keep this policy visible:

> Search Console과 Naver Search Advisor 연결 상태는 실제 계정/API가 연결되기 전까지 수동 확인 항목으로 표시합니다.

## After Registration

When owner-side registration is complete, the next safe repo step is connector readiness work that reports only boolean/redacted setup state. Do not expose raw credentials or secret values in logs, tests, build output, or UI.
