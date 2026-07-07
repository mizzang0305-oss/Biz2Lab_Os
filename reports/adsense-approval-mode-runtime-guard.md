# Biz2Lab AdSense Approval Mode Runtime Guard

Date: 2026-07-08 KST
Scope: production smoke after PR #112 squash merge, focused on AdSense approval-mode inventory safety.
Production commit observed: `49e5a322fd7992e05626aad69eb892dcb74735fe`

## Approval Mode

- mode: `pre-approval-client-loader-only`
- client loader: ALLOWED
- manual ad slot markup: NONE
- `data-ad-slot`: NONE
- `<ins class="adsbygoogle">` in source: NONE
- legacy globals (`google_ad_client`, `google_ad_slot`, `enable_page_level_ads`): NONE

This mode keeps the AdSense account/client connection visible to Google while blocking explicit publisher-created ad inventory before re-review.

## Runtime Finding

- runtime element: `ins.adsbygoogle-noablate` observed
- source: injected by the existing AdSense client loader at runtime, not authored in repository markup
- data-ad-slot: NONE
- data-ad-status: unfilled
- display: none
- measurable layout footprint: NONE
- visible blank ad area: NONE
- publisher-content obstruction: NONE

The runtime noablate element is acceptable only while it remains hidden, unfilled, slotless, and layout-neutral.

## Live Layout Evidence

- mobile overflow: PASS
- desktop overflow: PASS

| route | viewport | status | overflow | blank ad area |
|---|---:|---|---|---|
| `/ko` | 390px mobile | 200 | PASS | NONE |
| `/ko` | 1440px desktop | 200 | PASS | NONE |
| `/ko/resources` | 390px mobile | 200 | PASS | NONE |
| `/ko/resources` | 1440px desktop | 200 | PASS | NONE |
| `/ko/about` | 390px mobile | 200 | PASS | NONE |
| `/ko/automation/baserow-open-source-database-automation` | 390px mobile | 200 | PASS | NONE |

## Discovery And Policy Evidence

- public indexable pages checked above: no `noindex`
- `/ko/ops/seo-dashboard`: `noindex, nofollow`, excluded from sitemap/RSS
- `sitemap.xml`: includes `/ko` and `/ko/resources`; excludes `/ko/ops/seo-dashboard`
- `robots.txt`: exposes canonical sitemap
- `rss.xml`: excludes `/ko/ops/seo-dashboard`
- `ads.txt`: served with the approved single publisher line
- meta keywords: NONE
- fake analytics / fake traffic numbers: NONE

## Recommendation

- recommendation: `READY_FOR_ADSENSE_REVIEW_WITH_APPROVAL_MODE_GUARD`

Do not request AdSense review from automation. Owner should re-check live pages after this guard PR is merged and the normal Git-triggered production deployment finishes.

If a future live smoke finds a visible blank area, nonzero layout footprint, `data-ad-slot`, or manually authored ad slot markup before approval, block re-review and either disable the client loader or remove the offending inventory in a separate owner-approved PR.
