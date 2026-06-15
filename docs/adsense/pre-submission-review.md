# Biz2Lab AdSense Pre-Submission Review

Date: 2026-06-15
Status: Phase 2.5 local review
Scope: Korean-only AdSense pre-submission hardening

## Readiness Summary

Biz2Lab is currently an AdSense-focused Korean information site with 25 published Korean posts across four approved hubs.

Readiness level: **LOCAL PASS / MANUAL BROWSER REVIEW NEEDED**

This document does not approve a deploy or AdSense submission by itself. It records the local content, route, and policy checks that should be reviewed before connecting production services.

## Content Count

- Published Korean posts: 25
- Hubs: 4
- Static required pages: 4
- Sitemap post count expected: 25
- RSS post count expected: 25

Hub distribution:

- AI 업무 자동화: 7 posts
- 영업·매출 관리: 7 posts
- 소상공인 운영: 6 posts
- 전자계약·결제: 5 posts

## Route Policy

Allowed before AdSense approval:

- `/`
- `/ko`
- `/ko/automation`
- `/ko/sales-ops`
- `/ko/small-business`
- `/ko/contracts-payments`
- `/ko/about`
- `/ko/contact`
- `/ko/privacy`
- `/ko/terms`
- Korean article pages under approved categories only
- `/sitemap.xml`
- `/robots.txt`
- `/rss.xml`

Forbidden route families must remain absent or 404:

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

## Forbidden Content Status

- Affiliate links: none intended before AdSense approval.
- Amazon/product/review route content: none intended. Customer review wording is used only for small-business customer-response operations, not product review publishing.
- Lottery content: none intended.
- Public AI/chat feature: absent.
- Public auth/admin feature: absent.
- Public comments feature: absent.
- CommerceAuto public integration: absent.

## Required Pages Status

- About: explains Biz2Lab as a practical Korean AI business automation content hub and avoids income guarantees.
- Contact: simple inquiry form, no login requirement, privacy note included.
- Privacy: covers contact/newsletter data, future analytics/Search Console/AdSense possibility, and avoids unsupported legal claims.
- Terms: states informational purpose, user responsibility, and no guarantee of business/legal/financial outcomes.

## SEO and Internal Link Status

Expected local validation:

- Unique post titles.
- Unique post descriptions.
- Canonical URL on every post.
- Descriptive local hero image alt text.
- Related posts resolve.
- No orphan posts.
- Sitemap includes only public Korean allowed routes and 25 posts.
- RSS includes 25 Korean posts.
- Robots continues to disallow forbidden/internal areas.

## Remaining Manual Checks

- Read every article in a browser at desktop and mobile widths.
- Confirm Korean tone is natural and not mechanically repeated.
- Confirm all field examples are anonymized and do not imply private customer data.
- Confirm no article overpromises income, savings, ranking, or automation accuracy.
- Confirm contact form fallback behavior is acceptable when Supabase is not configured.
- Confirm the final production domain, Search Console, GA4, and AdSense code setup are done only after deploy approval.

## Submission Decision

Recommended decision: **prepare preview review next, do not submit until a human browser pass is complete**.

Do not proceed to deployment, AdSense code insertion, production analytics, Supabase writes, or public feature expansion from this document alone.
