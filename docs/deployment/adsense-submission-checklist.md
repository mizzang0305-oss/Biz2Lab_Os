# AdSense Submission Checklist

Date: 2026-06-15
Status: readiness checklist only
Scope: Google AdSense site review preparation

## Local Content Readiness

- [x] 25 published Korean posts.
- [x] 4 Korean content hubs.
- [x] About page present.
- [x] Contact page present.
- [x] Privacy page present.
- [x] Terms page present.
- [x] Sitemap route present.
- [x] Robots route present.
- [x] RSS route present.

## Public Safety Boundary

Must remain true:

- No `/en`.
- No `/ja`.
- No public `/admin`.
- No public `/login`.
- No public `/ai` or `/chat`.
- No public crawler or research interface.
- No CommerceAuto public integration.
- No Amazon/product/affiliate/review route family.
- No lottery content.
- No comments feature.

## Required Manual Checks

- [ ] Site is publicly accessible at `https://biz2lab.com`.
- [ ] HTTPS certificate is valid.
- [ ] `https://biz2lab.com/sitemap.xml` loads.
- [ ] `https://biz2lab.com/robots.txt` loads.
- [ ] `https://biz2lab.com/rss.xml` loads.
- [ ] `/ko/about`, `/ko/contact`, `/ko/privacy`, and `/ko/terms` load.
- [ ] 5 representative articles load on desktop and mobile.
- [ ] Korean tone is natural and not mechanically repeated.
- [ ] Field examples are anonymized and do not include private customer or company data.
- [ ] No article makes income, savings, ranking, or automation accuracy guarantees.

## AdSense Code Insertion Preparation

Do not insert real AdSense code until the publisher/client ID is available.

Recommended future insertion point:

- Root layout metadata/script layer, only after the site is deployed and domain is verified.
- Use a controlled environment variable for the AdSense client ID, for example `NEXT_PUBLIC_ADSENSE_CLIENT_ID`.

Rules:

- Do not hardcode an unknown or guessed publisher ID.
- Do not load ads on forbidden/internal routes.
- Do not place excessive ad slots before approval.
- Avoid layout shifts and intrusive ad placement.
- Re-run build, route smoke, and manual browser review after insertion.

## ads.txt Preparation

No Google AdSense publisher ID was present during this local check, so no real `ads.txt` file was created.

Expected future format after Google provides the publisher ID:

```text
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Replace `pub-XXXXXXXXXXXXXXXX` only with the real publisher ID from AdSense.

Manual future steps:

- [ ] Obtain the real Google AdSense publisher ID.
- [ ] Create `public/ads.txt` with the exact Google-provided line.
- [ ] Deploy.
- [ ] Confirm `https://biz2lab.com/ads.txt` returns the expected text.

## Submission Gate

Submit for AdSense review only after:

- Production deployment is complete.
- Domain connection is complete.
- Search Console sitemap submission is complete.
- Final smoke checks pass.
- Human Korean content review is complete.
- AdSense code and `ads.txt` use real Google-provided IDs only.
