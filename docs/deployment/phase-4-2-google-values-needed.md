# Phase 4.2A Google Setup Value Intake Checklist

Date: 2026-06-17
Status: VALUE_INTAKE_ONLY
Previous gate: APPLY_GOOGLE_SETUP_READY
Scope: final value intake before Search Console, GA4, AdSense, and ads.txt setup.

This phase creates only this checklist. It does not apply DNS, script, metadata,
verification file, ads.txt, Vercel, deploy, staging, commit, or push changes.

## Current Live Domain State

- Official domain: `https://www.biz2lab.com`
- Apex redirect: `https://biz2lab.com` -> `https://www.biz2lab.com`
- Read-only live check in this phase:
  - `https://www.biz2lab.com/`: `200`, `text/html; charset=utf-8`
  - `https://biz2lab.com/`: `308`, redirects to `https://www.biz2lab.com/`
  - `https://www.biz2lab.com/ads.txt`: `404`
- Homepage HTML scan result in this phase:
  - Search Console verification meta signal: NOT FOUND
  - GA4 signal: NOT FOUND
  - AdSense signal: NOT FOUND

## A. Search Console

Recommended option 1:

- Property type: Domain property
- Domain: `biz2lab.com`
- Needed value: DNS TXT value from Google Search Console
- Example format: `google-site-verification=xxxxxxxxxxxxxxxx`

Recommended option 2:

- Property type: URL-prefix property
- URL: `https://www.biz2lab.com`
- Needed value: exact HTML meta tag from Search Console, or Google Analytics
  linked verification after GA4 is connected

Phase 4.2A boundary:

- DNS TXT record: NOT APPLIED
- HTML verification meta tag: NOT ADDED
- HTML verification file: NOT ADDED
- DNS change: NOT APPLIED

## B. GA4

Needed value:

- Measurement ID
- Required format: `G-XXXXXXXXXX`
- Web stream URL: `https://www.biz2lab.com`

Phase 4.2A boundary:

- GA4 script: NOT ADDED
- GA4 Measurement ID: NOT GUESSED
- Analytics implementation: NOT APPLIED

## C. AdSense

Needed values:

- AdSense client ID: `ca-pub-xxxxxxxxxxxxxxxx`
- Publisher ID: `pub-xxxxxxxxxxxxxxxx`
- ads.txt exact line copied from AdSense

Expected ads.txt line format:

```text
google.com, pub-xxxxxxxxxxxxxxxx, DIRECT, f08c47fec0942fa0
```

Phase 4.2A boundary:

- AdSense script: NOT ADDED
- `public/ads.txt`: NOT ADDED
- Placeholder publisher/client IDs: NOT ADDED
- AdSense submission: NOT RUN

## D. Next Apply Phase Input Format

The user should provide real Google values in this exact format:

```text
SEARCH_CONSOLE_DNS_TXT=
SEARCH_CONSOLE_HTML_META=
GA4_MEASUREMENT_ID=
ADSENSE_CLIENT_ID=
ADSENSE_PUBLISHER_ID=
ADS_TXT_LINE=
```

Input rules:

- Leave `SEARCH_CONSOLE_DNS_TXT` blank if using only URL-prefix verification.
- Leave `SEARCH_CONSOLE_HTML_META` blank if using only Domain property DNS TXT
  verification.
- Use only exact values copied from Google tools.
- Do not provide placeholder IDs for apply work.

## E. Next Phase Proposal

- Phase 4.2B: apply Google setup values
- Phase 4.3: final live verification smoke
- Phase 4.4: AdSense submission

## F. Next Phase Prompt Placeholder

```text
Phase 4.2B - apply Google setup values.

Use project path C:\Users\LOVE\MyProjects\Biz2Lab_Os.
Use official domain https://www.biz2lab.com.
Apply only the real values below, and do not guess missing values:

SEARCH_CONSOLE_DNS_TXT=
SEARCH_CONSOLE_HTML_META=
GA4_MEASUREMENT_ID=
ADSENSE_CLIENT_ID=
ADSENSE_PUBLISHER_ID=
ADS_TXT_LINE=

After applying, verify build, SEO metadata, robots, sitemap, RSS, forbidden
routes, ads.txt if provided, and live deployment after the approved Git-triggered
redeploy path.
```
