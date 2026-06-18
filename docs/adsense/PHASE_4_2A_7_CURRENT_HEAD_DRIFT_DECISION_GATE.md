# Phase 4.2A.7 Current Head Drift Decision Gate

## 1. FINAL_STATUS

FINAL_STATUS: PHASE_4_2A_7_CURRENT_HEAD_DRIFT_DECISION_GATE_PASS

NEXT_STATUS: UNAPPROVED_GOOGLE_SETUP_DRIFT

NEXT_STAGE: PHASE_4_2A_8_ROLLBACK_PLAN_ONLY

## 2. Original Requested Scope

- Stage: Phase 4.2A.6 readiness-only validation.
- Original readiness target commit: `cd858938`.
- Original scope allowed: readiness smoke, route/SEO validation, validation bundle, Premium Image Gate checks, and expected 404 checks.
- Original scope forbidden: Google/AdSense/GA4/Search Console setup, manual deploy, DNS/Vercel settings changes, ads.txt changes, rollback execution, and production setting changes.

## 3. Observed Current HEAD Drift

- Current local HEAD: `d9303071e9c14b4d038eb20b89f3026110507d7b`.
- Current `origin/master`: `d9303071e9c14b4d038eb20b89f3026110507d7b`.
- Drift commit message: `chore(google): apply GA4 and AdSense setup`.
- Vercel latest production deployment: `READY`, commit `d9303071e9c14b4d038eb20b89f3026110507d7b`.
- Live apex behavior: `https://biz2lab.com` redirects to canonical `https://www.biz2lab.com`.

Files changed by the drift commit:

- `app/layout.tsx`
- `components/cards/ArticleCard.tsx`
- `docs/image-engine/premium-image-gate-policy.md`
- `lib/google-setup.ts`
- `lib/images/premium-image-policy.ts`
- `public/ads.txt`
- `scripts/audit-content-authority.ts`
- `scripts/audit-premium-image-gate.ts`
- `scripts/audit-public-interactions.ts`
- `tests/biz2lab-policy.test.ts`

Additional file changed between `cd858938` and current HEAD:

- `docs/deployment/final-adsense-readiness-snapshot.md`

## 4. cd858938 Validation Result

The Phase 4.2A.6 readiness-only checks already completed against the original target before the drift was observed:

- Premium Image Gate: PASS
- Responsive smoke: PASS
- Route/SEO: PASS
- Validation bundle: PASS
- Lazy-loaded inline images after full scroll: PASS
- `/admin`, `/en`, `/ja` expected 404: PASS

Because the current live deployment is no longer the original readiness-only target, Phase 4.2A.6 cannot be closed as final readiness-only PASS without a separate drift decision.

## 5. d930307 Live State

Aggregate and masked detection only:

- GA4: detected in local changed scope and live `/ko`, masked as `G-VG...59M7`.
- AdSense: detected in local changed scope and live `/ko`, masked as `ca-p...5155`.
- ads.txt: present locally and live at `https://www.biz2lab.com/ads.txt`; publisher value masked as `pub-...5155`.
- Search Console: related token/code patterns detected in local changed scope; live `/ko` scan did not detect a Search Console meta token.
- sitemap/robots: live `https://www.biz2lab.com/sitemap.xml` and `https://www.biz2lab.com/robots.txt` returned 200.
- Google setup values appear real rather than placeholder values based on the masked GA4, AdSense, and ads.txt format checks.

No raw publisher/client ID, secret, or environment value is recorded in this report.

## 6. Approved/Unapproved Decision

Decision: unapproved or unconfirmed drift.

Evidence:

- GitHub commit-to-PR lookup for `d9303071e9c14b4d038eb20b89f3026110507d7b` returned no linked PR.
- GitHub PR search for the drift commit returned no matching PR.
- The Vercel deployment metadata shows the drift commit deployed to production from `master`, but does not prove the originally forbidden Google setup was approved inside this stage.

Selected branch:

- `NEXT_STATUS: UNAPPROVED_GOOGLE_SETUP_DRIFT`
- `NEXT_STAGE: PHASE_4_2A_8_ROLLBACK_PLAN_ONLY`

No rollback or revert is authorized or executed by this decision gate.

## 7. Safety Constraints

This stage is report-only. The following actions remain prohibited:

- Manual deploy
- Additional Google/AdSense/GA4/Search Console setup
- ads.txt modification
- DNS/Vercel settings changes
- Immediate rollback/revert execution
- Production setting changes
- Secret/env value output
- Full publisher/client ID output
- `.codex/config.toml` modification or staging

Observed local safety state:

- `.codex/config.toml` is untracked and intentionally not staged.
- No production settings were changed by this stage.
- No deploy command was run by this stage.
- No rollback/revert command was run by this stage.

## 8. Next Stage Recommendation

Recommended next required action:

1. Review and merge this report-only decision-gate PR if the decision record is accepted.
2. If no explicit approval evidence for `d930307` is provided, proceed only to `PHASE_4_2A_8_ROLLBACK_PLAN_ONLY`.
3. If explicit approval evidence for `d930307` is later provided, switch to `PHASE_4_2B_POST_SETUP_LIVE_SMOKE` instead of rollback planning.

Readiness-only final PASS is not allowed while the live deployment includes unconfirmed Google setup drift.
