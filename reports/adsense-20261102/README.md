# Biz2Lab AdSense recovery — 2026-11-02 (KST)

## Actual account evidence

The signed-in AdSense Sites list for biz2lab.com reports **가치가 별로 없는 콘텐츠 (Low value content)**; last update **2026-11-02 00:14 KST**. Ads.txt status is **승인됨 (Authorized)**. Detail view says all review requests have been used and another request is possible **from 2026-11-15**. No review was submitted in this work. The UI does not identify an offending URL or disclose an approval score. Traffic sufficiency and Google's actual indexed inventory are not verified by HTTP checks.

## Baseline and findings

- Production: Vercel CNFOOD (`team_saA87rATfYrInwYvunJXy4Q7`), project `prj_Zx5HsZZAFfClRt6CMVnd5RF86LJ8` / `biz2-lab-os`.
- Before release: `dpl_99KmwKmyvtApJJCz7X5oqJaL6obw`, master `32c569b5cc0926589fe545d3705ded6269bdf2d6` (merged PR #169). This is the rollback target.
- Live HTTP inventory: 40 sitemap pages all respond 200, including 30 essays, six subjects and three trust/contact pages plus home. All 30 essays have index/follow and self canonicals. Privacy has no noindex directive. RSS contains existing articles; robots.txt and ads.txt respond 200. Metadata publisher ID agrees with the authenticated AdSense publisher. No active ad script found on these pages.
- Six subject pages mainly repeated article titles/questions (347–561 text characters including chrome in this extraction). This is a confirmed limitation in reader utility, **not proof that Google singled out these URLs**.
- MINZ catalogue remains indexable; editor is already noindex. Do not delete or hide functioning projects just to influence review. `/sns-products` retains the existing separate-service redirect; retired Korean content remains 410, unknown essay 404. No retirement or advertising configuration changed.
- July's report describes an older automation-content site and is not evidence of current approval. The 30 manuscripts and their source/author/reflection records are preserved byte for byte.

## Changes

Six topic guides now offer a specific reading sequence, three comparisons of claim/evidence/limits, and a hypothetical task with an expandable answer. They link to existing essays and clearly describe themselves as editorial reading exercises, not new experiments or primary research. Home explains the new entry point. The existing RSS feed is linked in the footer. Only actually changed topic pages receive the new sitemap lastmod; article source dates are not refreshed artificially.

No manuscript deletion, ad activation, analytics activation, dependency change, publisher-ID change, or account reset. No claims of expert review or measured reader outcomes added.

## Validation before release

- Existing knowledge/publication/recovery/calculator tests: 30 passed.
- Topic guide tests: 2 passed (valid in-theme links, static accessible answer content, unknown topic behavior).
- TypeScript: passed. Scoped ESLint: passed. Git diff whitespace check: passed.
- Full Next.js production-mode build: passed, 138 generated pages.
- The tsx CLI cannot create its Unix IPC socket in this execution environment; tests and prebuild were successfully run with `node --import tsx` instead. No project script was altered for this local restriction.
- Full historical suite was not rerun; previous PR documents unrelated baseline failures. These results apply to the targeted release checks above.

## Re-review gate

On or after November 15, read the actual AdSense detail screen again. Verify production release, the preserved 30 articles, six reading guides, policy/contact access, robots/canonicals/sitemap/RSS, meaningful links and exercises. Review any newer content changes and unresolved quality concerns; HTTP 200 or elapsed time is not sufficient by itself. Submit once only if the account permits it and the site is ready. Record the resulting submitted/under-review state; do not report attempted clicks as submission. If blocked, report the concrete blocker. Approval remains Google's decision.

Official basis: https://support.google.com/adsense/answer/10015918?hl=ko and https://support.google.com/adsense/answer/10502938?hl=ko . These require original value and usable navigation; they do not prescribe a guaranteed article count, word count, or waiting duration for approval.
