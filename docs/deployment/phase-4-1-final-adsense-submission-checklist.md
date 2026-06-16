# Phase 4.1 Final AdSense Submission Checklist

Date: 2026-06-17
Status: final content QA complete; Google setup values still pending

## A. Site Readiness Summary

- Official domain: https://www.biz2lab.com
- Fallback domain: https://biz2lab.com
- Stable Vercel URL: https://biz2-lab-os.vercel.app
- Public Korean posts: 25
- Current content grade summary: A 11, B 14, C 0, D 0
- Phase 4.1 scope: report, guard, and checklist only for Google setup values.
- Actual Google code or verification added in this phase: NO

## B. Content QA Result

| group | count | result |
| --- | ---: | --- |
| TOP3 | 3 | PASS: A grade, 3 inline images each, FAQ 5 each |
| P1 | 8 | PASS: A grade, at least 1 inline/checklist image each, FAQ 4 each |
| P2 | 14 | PASS: B grade or better, no thin-content finding, FAQ 3 each |
| Total | 25 | PASS: no C/D article remains |

Per-article inventory:

| slug | priority | grade | chars | h2 | faq | internal links | hero | inline images | alt/caption | risk |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| ai-business-automation-guide | TOP3 | A | 4527 | 10 | 5 | 3 | YES | 3 | PASS | OK |
| accounts-receivable-tracker | TOP3 | A | 4525 | 10 | 5 | 3 | YES | 3 | PASS | OK |
| electronic-contract-system-basics | TOP3 | A | 4600 | 10 | 5 | 3 | YES | 3 | PASS | OK |
| automation-priority-method | P1 | A | 4157 | 10 | 4 | 3 | YES | 1 | PASS | OK |
| chatgpt-document-cleanup | P1 | A | 4138 | 10 | 4 | 3 | YES | 1 | PASS | OK |
| google-sheets-ai-automation | P1 | A | 4076 | 10 | 4 | 3 | YES | 1 | PASS | OK |
| connect-contract-payment-customer-management | P1 | A | 4154 | 10 | 4 | 3 | YES | 1 | PASS | OK |
| payment-reminder-message | P1 | A | 4097 | 10 | 4 | 3 | YES | 1 | PASS | OK |
| sales-revenue-ar-structure | P1 | A | 4097 | 10 | 4 | 3 | YES | 1 | PASS | OK |
| customer-memory-system | P1 | A | 4137 | 10 | 4 | 3 | YES | 1 | PASS | OK |
| unify-order-channels | P1 | A | 4059 | 10 | 4 | 3 | YES | 1 | PASS | OK |
| obsidian-business-knowledge-base | P2 | B | 3901 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| pre-automation-task-list | P2 | B | 3898 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| reduce-repetitive-work-with-ai | P2 | B | 3810 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| e-signature-identity-check | P2 | B | 3905 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| manage-unsigned-contracts | P2 | B | 3891 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| offline-card-payment-pg-van | P2 | B | 3984 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| daily-sales-goal-breakdown | P2 | B | 3811 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| daily-sales-report | P2 | B | 3796 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| sales-achievement-rate | P2 | B | 3764 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| unify-order-channels-for-sales | P2 | B | 3807 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| ai-knowledge-store-for-small-business | P2 | B | 3820 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| daily-numbers-for-small-business | P2 | B | 3784 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| reservation-order-review-management | P2 | B | 3879 | 10 | 3 | 3 | YES | 0 | PASS | OK |
| solo-business-systemization | P2 | B | 3860 | 10 | 3 | 3 | YES | 0 | PASS | OK |

## C. Image QA Result

- Hero image coverage: PASS for all 25 posts.
- TOP3 inline image coverage: PASS, 3 each.
- P1 inline/checklist coverage: PASS, 1 each.
- Alt/caption coverage: PASS for all Markdown inline images and hero metadata.
- Broken image count: 0 from validation and live-route checks.
- Mobile image result: PASS after Markdown image renderer fix; 320, 375, and 768 viewport smoke completed locally.
- Premium replacement prompts: prepared, but still pending user-approved image generation.

## D. SEO, Canonical, Sitemap, Robots, And RSS Result

- Official domain: https://www.biz2lab.com
- Apex redirect: expected to redirect to https://www.biz2lab.com
- Canonical URL policy: www domain only.
- Sitemap loc policy: www domain only.
- robots.txt Sitemap URL policy: www domain only.
- RSS item link policy: www domain only.
- OG URL and JSON-LD URL policy: www domain only.
- No localhost or Vercel preview URL should appear in public metadata.
- If any future check finds non-www canonical output, stop and run a separate canonical alignment phase before Google setup.

## E. Forbidden Route Result

These routes must remain 404 on both www and apex hosts:

- /admin
- /login
- /en
- /ja
- /ai
- /chat

No forbidden route directory was added.

## F. Google Setup Values Needed

Search Console:

- DNS TXT value: REQUIRED_FROM_GOOGLE
- URL-prefix HTML meta tag, optional alternative: `<meta name="google-site-verification" content="REQUIRED_FROM_GOOGLE" />`

GA4:

- Measurement ID: `G-XXXXXXXXXX`

AdSense:

- Publisher ID: `pub-xxxxxxxxxxxxxxxx`
- Client ID: `ca-pub-xxxxxxxxxxxxxxxx`

ads.txt:

- Exact line: `google.com, pub-xxxxxxxxxxxxxxxx, DIRECT, f08c47fec0942fa0`

## G. Manual User Action Checklist

- Confirm the official AdSense application URL is `https://www.biz2lab.com`.
- Copy the real Search Console value from Google.
- Decide DNS TXT verification or URL-prefix meta verification.
- Copy the real GA4 Measurement ID.
- Copy the real AdSense publisher/client ID.
- Copy the exact ads.txt line from AdSense.
- Approve a separate apply phase before any script, meta, DNS, or ads.txt change.

## H. Do Not Apply Yet

- AdSense script: NOT ADDED
- ads.txt: NOT ADDED
- GA4 script: NOT ADDED
- Search Console verification meta/file: NOT ADDED
- DNS change: NOT APPLIED
- Vercel manual deploy: NOT RUN
- Supabase env or migration: NOT RUN

## I. Final Apply Phase Proposal

Recommended next gate: APPLY_GOOGLE_SETUP_READY after the user provides real Google values.

Proposed Phase 4.2 scope:

- Add Search Console verification by the user-selected method.
- Add GA4 only with the real Measurement ID.
- Add AdSense script only with the real client ID.
- Add ads.txt only with the exact AdSense line.
- Validate build, metadata, sitemap, robots, RSS, forbidden routes, and live deployment after Git-triggered auto redeploy.
