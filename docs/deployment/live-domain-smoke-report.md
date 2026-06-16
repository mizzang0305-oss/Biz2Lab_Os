# Biz2Lab Live Domain Smoke Report

Date: 2026-06-16 21:27:40 +09:00
Status: PASS
Scope: Phase 3.12 live domain smoke for `https://biz2lab.com`

## Summary

The live domain is connected, HTTPS is valid, the latest pushed TOP3 image deployment is visible on the public domain, and the public route surface remains AdSense-safe.

No deploy, DNS change, Search Console verification, GA4, AdSense code, `ads.txt`, Supabase env, migration, push, or forbidden route was added in this phase.

## Git And Local State

- Branch: `master`
- Local HEAD: `84b1014642320ab89eaf5aded40938f076a1f677`
- `origin/master`: `84b1014642320ab89eaf5aded40938f076a1f677`
- Ahead/behind: `0 / 0` before this docs-only report
- Working tree: clean before this report
- Latest commit: `84b1014 feat: apply Biz2Lab top premium article images`
- Forbidden route folders under `app`: none found
- Secret scan: no actual secret found; `autoRefreshToken: false` in `lib/supabase.ts` is an option name false positive

## Local Validation

All required local checks passed:

- `npm test`
- `npm run lint`
- `npm run typecheck`
- `npm run validate:posts`
- `npm run validate:seo`
- `npm run validate:images`
- `npm run check:links`
- `npm run audit:interactions`
- `npm run audit:image-briefs`
- `npm run audit:image-prompts`
- `npm run audit:image-uniqueness`
- `npm run build`

Notes:

- Existing approved hero reuse warnings remain for older non-TOP3 posts.
- TOP3 image uniqueness audit passed.

## Domain Reachability

### `https://biz2lab.com`

- DNS: `A 216.198.79.1`
- HTTPS: valid
- Certificate subject: `CN=biz2lab.com`
- Issuer: Let's Encrypt `YR1`
- Validity: `2026-06-15T21:31:02` to `2026-09-13T21:31:01`
- Redirect behavior: `308 https://biz2lab.com -> https://www.biz2lab.com/`
- Final status: `200`
- Final URL: `https://www.biz2lab.com/`
- Content: Biz2Lab site

### `https://www.biz2lab.com`

- DNS: `CNAME a04deff98f727402.vercel-dns-017.com`; `A 216.198.79.65`; `A 64.29.17.65`
- HTTPS: valid
- Certificate subject: `CN=www.biz2lab.com`
- Issuer: Let's Encrypt `YR1`
- Validity: `2026-06-15T21:31:03` to `2026-09-13T21:31:02`
- Redirect behavior: serves directly
- Final status: `200`
- Final URL: `https://www.biz2lab.com`
- Content: Biz2Lab site

Observed canonical strategy:

- The live serving host redirects apex to `www`.
- Public canonical, sitemap, robots, and RSS still use `https://biz2lab.com`.
- This is safe for smoke, but if the intended long-term canonical host is non-www, align the Vercel primary domain later in a separate approved settings phase.

## Route Smoke

Base URL tested: `https://biz2lab.com`

All requests were followed through the live `308` apex-to-www redirect.

Allowed routes: `13 / 13` passed with final `200`.

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
- `/sitemap.xml`
- `/robots.txt`
- `/rss.xml`

Representative article pages: `5 / 5` passed with final `200`.

- `/ko/automation/ai-business-automation-guide`
- `/ko/sales-ops/accounts-receivable-tracker`
- `/ko/contracts-payments/electronic-contract-system-basics`
- `/ko/small-business/daily-numbers-for-small-business`
- `/ko/automation/automation-priority-method`

Forbidden routes: `16 / 16` passed with final `404`.

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

## SEO Metadata

Metadata checks passed:

- Canonical URLs use `https://biz2lab.com`.
- Sitemap URLs use `https://biz2lab.com`.
- `robots.txt` references `https://biz2lab.com/sitemap.xml`.
- RSS links use `https://biz2lab.com`.
- No `localhost` URL appears in sitemap, robots, or RSS.
- No Vercel preview URL appears in sitemap, robots, or RSS.
- No `/en` or `/ja` root route appears in sitemap or RSS.
- No forbidden root route appears in sitemap or RSS.

Checked canonical pages:

- `/`
- `/ko`
- `/ko/automation/ai-business-automation-guide`
- `/ko/sales-ops/accounts-receivable-tracker`
- `/ko/contracts-payments/electronic-contract-system-basics`

## TOP3 Image Status

TOP3 live image assets: `3 / 3` passed.

| Path | Status | Type | Bytes | SHA-256 |
| --- | ---: | --- | ---: | --- |
| `/images/posts/ai-business-automation-guide-hero.webp` | 200 | `image/webp` | 31,474 | `57314ec9bd4f7f8470aad4c6c40a6dccf032f3ff3710f569efc85da8aefaf332` |
| `/images/posts/accounts-receivable-tracker-hero.webp` | 200 | `image/webp` | 47,558 | `b5323550039025cc65a76db6aefe1d8026159ff27ed807ba505f274419419604` |
| `/images/posts/electronic-contract-system-basics-hero.webp` | 200 | `image/webp` | 72,542 | `9cc005ad4845439fbaf5d8e69bd3dee2518307aa034952cf6d0aac20ca010076` |

Image checks:

- All three assets are WebP.
- All three assets return `200`.
- All three hashes are distinct.
- Browser smoke confirmed TOP3 hero images render on article pages.
- Browser smoke confirmed TOP3 hero images are not fallback SVG or local diagram fallback.

## Responsive Live Smoke

Browser smoke passed: `108 / 108`.

Viewports:

- `320x640`
- `360x740`
- `375x812`
- `390x844`
- `414x896`
- `768x1024`
- `1024x768`
- `1280x720`
- `1440x900`

Pages:

- `/ko`
- `/ko/automation`
- `/ko/sales-ops`
- `/ko/contracts-payments`
- `/ko/contact`
- `/ko/privacy`
- `/ko/automation/ai-business-automation-guide`
- `/ko/sales-ops/accounts-receivable-tracker`
- `/ko/contracts-payments/electronic-contract-system-basics`
- `/admin`
- `/en`
- `/ja`

Checked:

- No horizontal overflow.
- No card or text overflow.
- No broken images.
- TOP3 hero images render.
- No browser console errors.
- Disabled search remains disabled.
- Contact fallback stays in-page.
- `/admin`, `/en`, and `/ja` return 404 content.

## Issues Found

No blocking issue found.

Non-blocking note:

- Vercel currently serves `www.biz2lab.com` as the final host after apex redirect, while SEO metadata uses non-www `https://biz2lab.com`. This is acceptable for this smoke because canonical metadata is stable and route behavior is safe. If non-www should be the final browser URL, change Vercel primary domain later in a separate approved settings phase.

## Readiness

Search Console / GA4 / AdSense readiness:

- Search Console: ready for registration and sitemap submission.
- GA4: ready after a real Measurement ID is available.
- AdSense: ready for a separate approved phase after a real publisher/client ID is available.
- `ads.txt`: not added in this phase; add only with real AdSense publisher information.

Next gated phase:

1. Register Search Console.
2. Submit `https://biz2lab.com/sitemap.xml`.
3. Prepare GA4 Measurement ID.
4. Prepare AdSense publisher/client ID.
5. Add AdSense code and `ads.txt` in a separate approved phase.
6. Run final AdSense pre-submit smoke.
