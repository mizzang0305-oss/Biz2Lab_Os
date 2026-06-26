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
- Unknown provider-side states must stay `OWNER_UNKNOWN`.
- Missing connected analytics/webmaster APIs must stay `CONNECTED_API_NOT_CONFIGURED`.

## Daily Repo Check

Run these from `master`:

```powershell
npm run ops:autopilot-status
git status --short
gh pr list --state open --limit 20
```

Record:

- current scheduler status and next action
- open PR count
- failed checks or blocked Green-Zone actions
- tracked dirty files, if any

Only protected untracked files such as `.codex-remote-attachments/` and `.codex/config.toml` may remain untracked. Do not commit `data/content-series-run-state.json`.

## Every 3 Days Owner UI Check

Use provider UI screenshots or owner-provided notes only. Do not call provider APIs.

| Provider | Check | Expected evidence |
| --- | --- | --- |
| Google Search Console | Sitemap submission state | Owner screenshot or written confirmation; otherwise `GOOGLE_SITEMAP_SUBMISSION_OWNER_UNKNOWN` |
| Google Search Console | Representative URL inspection | Owner screenshot or written confirmation; otherwise `GOOGLE_URL_INSPECTION_OWNER_UNKNOWN` |
| Naver Search Advisor | `http://www.biz2lab.com` ownership Verify clicked successfully | Owner screenshot or written confirmation; otherwise `NAVER_OWNER_VERIFY_CLICK_OWNER_UNKNOWN` |
| Naver Search Advisor | Sitemap/RSS submitted under the registered `www.biz2lab.com` host | Owner screenshot or written confirmation; otherwise `NAVER_SITEMAP_RSS_OWNER_UNKNOWN` |

Representative URL inspection should include recently updated articles and the current series hub. Do not translate sparse or missing query data into a claim that SEO is failing.

## Weekly Repo and Content Check

Run these from `master`:

```powershell
npm run validate:seo
npm run check:links
npm run validate:posts
npm test
```

Then review:

1. local AI answer-readiness status
2. Search Console query/click/impression data only if the owner provides real UI evidence
3. Naver `site:` checks as qualitative discovery checks, not proof of complete indexing
4. internal-link coverage for recently updated clusters
5. weak article improvement candidates

Record only pass/fail, concrete blockers, and owner-confirmed provider evidence.

## Monthly Content Planning

1. Run the local AI answer-readiness audit.
2. Prune or update weak published articles with stale examples, weak summaries, or thin FAQs.
3. Expand high-value clusters only when the existing quality buffer is healthy.
4. Align monetization pages with current content clusters.
5. Plan a small new queue rather than a large backlog.
6. Keep queue additions separate from article generation and image import PRs.

Do not change slugs, routes, canonicals, hero paths, or publication status unless fixing a hard bug.

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
