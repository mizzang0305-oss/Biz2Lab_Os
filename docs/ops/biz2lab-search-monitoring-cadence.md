# Biz2Lab Search Monitoring Cadence

This cadence keeps search and AI-answer work evidence-based. It does not require Google Search Console, Naver Search Advisor, GA4, Vercel Analytics, Umami, or any external analytics API access from the repository.

## Standing Rules

- Do not invent clicks, impressions, CTR, rankings, query data, crawl status, index status, or AI-answer inclusion.
- Do not add meta keywords.
- Do not change canonical URLs from `https://www.biz2lab.com`.
- Do not change sitemap or RSS URLs away from `https://www.biz2lab.com`.
- Keep Naver registered site as `http://www.biz2lab.com` unless the owner later confirms a provider-side change.
- Treat HTTP to HTTPS redirect as expected for Naver.
- Do not mark Naver verified until the owner confirms UI success.

## Weekly Owner Checks

Use provider UI screenshots or owner-provided notes only. Do not call provider APIs.

| Provider | Check | Expected evidence |
| --- | --- | --- |
| Google Search Console | Sitemap submitted and accepted | Owner screenshot or written confirmation |
| Google Search Console | Priority URL inspection for recently updated articles | Owner screenshot or written confirmation |
| Naver Search Advisor | `http://www.biz2lab.com` ownership Verify clicked successfully | Owner screenshot or written confirmation |
| Naver Search Advisor | Sitemap/RSS submitted under the registered `www.biz2lab.com` host | Owner screenshot or written confirmation |

## Weekly Repo Checks

Run these from `master`:

```powershell
npm run ops:autopilot-status
npm run validate:seo
npm run check:links
npm run validate:posts
npm test
```

Record only pass/fail and concrete blockers. Do not translate sparse Search Console data into SEO failure.

## Monthly Content Checks

1. Run the local AI answer-readiness audit.
2. Pick up to five weak published articles for evergreen hardening.
3. Prefer pages with direct business value: receivables, sales reporting, customer memory, orders, contracts, payments, and high-caution open-source tools.
4. Keep edits practical: conclusion-first summary, fit/avoid guidance, checklist, FAQ quality, and internal links.
5. Do not change slugs, routes, canonicals, hero paths, or publication status unless fixing a hard bug.

## New Queue Gate

Start a new automated topic queue only when at least one is true:

- Owner explicitly approves a new queue.
- Search provider UI evidence shows useful queries or crawl signals.
- Existing evergreen hardening backlog is no longer the highest-value work.

When a new queue is approved, keep these gates:

- local Codex artifact required before publication
- active hours preserved
- max open PR limit preserved
- daily limit preserved
- one topic per run
- no auto-merge of publication PRs without Green-Zone rules
- no manual deploy
- no DB, payment, message, notification, or external business API calls

## Current Posture

The current queue can be complete without being an error. `CONTENT_SERIES_QUEUE_EXHAUSTED` means the configured topic queue is finished. The next safe actions are evergreen hardening, owner-side Search Console/Naver verification checks, or owner-approved queue expansion.

