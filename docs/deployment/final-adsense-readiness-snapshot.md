# Biz2Lab Final AdSense Readiness Snapshot

Date: 2026-06-18 21:50:28 +09:00
Status: PASS with canonical-domain note
Scope: Phase 4.2A.6 live verification after Premium Image Gate deployment

## Summary

Biz2Lab production is live, Vercel auto-deployed the pushed Premium Image Gate commit, and the public Korean-only route surface remains AdSense-safe.

This snapshot does not add Search Console verification, GA4, AdSense code, `ads.txt`, Supabase env, migrations, forbidden routes, manual Vercel deploys, DNS changes, or Vercel setting changes.

## Deployment State

- Branch: `master`
- Pushed commit: `cd858938da639c39917b4e9f2019e65eb2f47c8e`
- Commit subject: `fix(images): gate non-premium visuals for AdSense readiness`
- GitHub remote: `origin/master`
- Vercel project: `biz2-lab-os`
- Vercel deployment: `https://biz2-lab-4724lmg1g-mizzang0305-gmailcoms-projects.vercel.app`
- Vercel deployment ID: `dpl_D7EkknLf1UVPrLfYkkUeHtc95inP`
- Vercel target: `production`
- Vercel status: `READY`
- Stable Vercel URL: `https://biz2-lab-os.vercel.app`
- Live apex: `https://biz2lab.com`
- Live final host: `https://www.biz2lab.com`

Vercel build log evidence:

- `Cloning github.com/mizzang0305-oss/Biz2Lab_Os (Branch: master, Commit: cd85893)`
- `Detected Next.js version: 16.2.9`
- `Deployment completed`
- `status Ready`

## Domain Behavior

- `https://biz2lab.com/*` returns `308` to matching `https://www.biz2lab.com/*`.
- `https://www.biz2lab.com/*` serves the site directly.
- Allowed public routes return final `200`.
- Forbidden and not-yet-enabled routes return final `404`.

## Premium Image Gate Status

Approved TOP3 premium image cards remain visible:

- `ai-business-automation-guide`
- `accounts-receivable-tracker`
- `electronic-contract-system-basics`

Pending non-TOP3 posts render as text-first public cards:

- 22 non-TOP3 posts are `text-only` in public card grids.
- Old SVG-derived thumbnails are not rendered in `/ko` or hub card grids.
- Non-TOP3 article pages hide the large SVG-derived hero image.
- TOP3 article pages continue to render premium hero images.

Observed `/ko` first 10 card policy at `320`, `390`, `768`, `1024`, `1280`, and `1440` widths:

- First 3 cards: `premium`, each with one image.
- Following 7 cards: `text-only`, each with zero card images.

## Local Validation

Fresh local validation passed:

- `npm test`
- `npm run lint`
- `npm run typecheck`
- `npm run validate:posts`
- `npm run validate:seo`
- `npm run validate:images`
- `npm run check:links`
- `npm run audit:interactions`
- `npm run audit:content-authority`
- `npm run audit:image-briefs`
- `npm run audit:image-prompts`
- `npm run audit:image-uniqueness`
- `npm run audit:premium-images`
- `npm run build`

Key local counts:

- `npm test`: 38 tests passed.
- `validate:posts`: 25 public Korean posts.
- `validate:seo`: 10 static routes, 25 sitemap posts.
- `validate:images`: 25 posts, 17 inline references, 100 public manifest entries, 3 optional asset entries, 85 briefs.
- `audit:premium-images`: 3 approved, 22 pending.
- `next build`: 45 static/SSG pages generated.

## Live Route Smoke

Base tested: `https://biz2lab.com`

Allowed routes passed with apex `308` then final `200` on `www`:

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
- `/ko/automation/ai-business-automation-guide`
- `/ko/sales-ops/accounts-receivable-tracker`
- `/ko/contracts-payments/electronic-contract-system-basics`
- `/ko/automation/automation-priority-method`
- `/ko/automation/chatgpt-document-cleanup`

Forbidden routes passed with apex `308` then final `404` on `www`:

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
- `/ads.txt`

## SEO, Feeds, And Metadata

Observed live output:

- Canonical URLs use `https://www.biz2lab.com`.
- Sitemap URLs use `https://www.biz2lab.com`.
- `robots.txt` references `https://www.biz2lab.com/sitemap.xml`.
- RSS links use `https://www.biz2lab.com`.
- No localhost URLs.
- No `vercel.app` canonical, sitemap, or RSS URLs.
- No `/en` or `/ja` in sitemap/RSS.
- No forbidden routes in sitemap/RSS.
- No Search Console, GA4, AdSense, or publisher/client ID code detected in public HTML.

Canonical-domain note:

- The Phase 4.2A.6 checklist requested apex `https://biz2lab.com` in canonical/sitemap/RSS.
- The current deployed site uses `https://www.biz2lab.com`, which matches the active final browser host and apex redirect behavior.
- If apex canonical is now desired, handle that as a separate approved canonical-domain change before Google setup.

## Responsive Browser Smoke

Live browser smoke passed at:

- `320x640`
- `360x740`
- `375x812`
- `390x844`
- `414x896`
- `768x1024`
- `1024x768`
- `1280x720`
- `1440x900`

Pages checked:

- `/ko`
- `/ko/automation`
- `/ko/sales-ops`
- `/ko/small-business`
- `/ko/contracts-payments`
- `/ko/contact`
- `/ko/privacy`
- TOP3 article pages
- 3 non-TOP3 article pages

Browser checks passed:

- No horizontal overflow.
- No card/text overflow detected.
- No complete broken images.
- No image HTTP errors.
- No console errors.
- Disabled search remains disabled or absent from article/header surfaces.
- Contact fallback remains in-page; no raw JSON surfaced.
- `/admin`, `/en`, `/ja`, and `/ads.txt` return `404`.

## Required Pages Status

Required public pages are live:

- Home/root
- Korean home `/ko`
- Category hubs
- About
- Contact
- Privacy
- Terms
- Sitemap
- Robots
- RSS
- 25 Korean article pages through static generation

## Remaining Google Setup Values

Search Console:

- Domain property: `biz2lab.com`
- Needed value: DNS TXT value from Google
- Example format: `google-site-verification=xxxxxxxxxxxxxxxx`
- URL-prefix option: `https://www.biz2lab.com`
- Needed value if using URL-prefix: HTML meta tag or GA verification method

GA4:

- Needed value: Measurement ID
- Expected format: `G-XXXXXXXXXX`
- Web stream URL should match the chosen final domain policy.

AdSense:

- Needed value: AdSense client ID
- Expected format: `ca-pub-xxxxxxxxxxxxxxxx`
- Needed value: Publisher ID
- Expected format: `pub-xxxxxxxxxxxxxxxx`
- Needed value: exact `ads.txt` line from AdSense

## Final Recommendation

Ready for the Google setup phase if the owner accepts the current `www.biz2lab.com` canonical policy.

Before applying Search Console, GA4, AdSense, or `ads.txt`, decide whether the final canonical domain remains `https://www.biz2lab.com` or changes to apex `https://biz2lab.com`. Do not add Google setup code until that decision is explicit.

## Not Done In This Phase

- Search Console verification
- GA4 script
- AdSense script
- `public/ads.txt`
- DNS changes
- Vercel manual deploy
- Vercel settings changes
- Supabase env or migrations
- New public routes
- Push after this docs snapshot
