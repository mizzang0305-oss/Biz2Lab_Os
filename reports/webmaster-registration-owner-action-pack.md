# Webmaster Registration Owner Action Pack

Status: `OWNER_ACTION_REQUIRED`

Production domain: `https://www.biz2lab.com`

This report is an owner handoff. It does not prove that Google Search Console or Naver Search Advisor registration is complete. No verification token, verification HTML file, Search Console metric, Naver metric, click, impression, CTR, ranking, or index status is fabricated here.

## Current Repo Evidence

| Check | Status | Evidence |
| --- | --- | --- |
| Published sitemap | READY | `https://www.biz2lab.com/sitemap.xml` |
| Published RSS | READY | `https://www.biz2lab.com/rss.xml` |
| Published robots | READY | `https://www.biz2lab.com/robots.txt` |
| Canonical host | READY | `https://www.biz2lab.com` |
| Google property access | OWNER SCREENSHOT PROVIDED | Owner screenshot shows the `biz2lab.com` property is accessible. |
| Google verification token/file | NOT PROVIDED | No owner-provided public Google verification artifact was supplied in this task. |
| Naver verification token/file | FILE ADDED, OWNER VERIFY REQUIRED | `public/naver30b0597bfd90831b38cf281c10ce53c0.html` has been added. Owner must click Verify in Naver Search Advisor after production deployment. |
| Registration completion | OWNER_UNKNOWN | Must be confirmed inside each provider UI. |

## Google Search Console Steps

Recommended property:

```text
Domain property: biz2lab.com
```

Acceptable fallback:

```text
URL-prefix property: https://www.biz2lab.com/
```

Owner actions:

1. Open Google Search Console with the owner Google account.
2. Add a new property.
3. Prefer the Domain property if DNS access is available.
4. Verify ownership using the method Google provides.
5. Submit sitemap:

```text
https://www.biz2lab.com/sitemap.xml
```

6. Inspect these URLs:

```text
https://www.biz2lab.com/
https://www.biz2lab.com/ko/automation/free-open-source-automation-tools-series
https://www.biz2lab.com/ko/automation/typesense-product-document-search-automation
https://www.biz2lab.com/ko/automation/flowise-ai-agent-workflow-automation
https://www.biz2lab.com/ko/automation/supabase-self-hosting-cost-operations-caution
```

7. For each inspected URL, record:

| Field | Owner should record |
| --- | --- |
| Google index state | URL is on Google / URL is not on Google |
| Crawl allowed | Yes / No |
| Indexing allowed | Yes / No |
| User-declared canonical | URL shown by Google |
| Google-selected canonical | URL shown by Google |
| Page fetch | Success / failure and reason |
| Mobile rendering screenshot | Looks correct / issue found |
| Indexing request | Submitted / not submitted |

Important:

- Sitemap submission helps discovery but does not guarantee indexing.
- URL inspection and indexing requests do not guarantee ranking or display.
- Check new data after 7 to 14 days. Do not interpret empty query data hourly.

## Naver Search Advisor Steps

Recommended site:

```text
https://www.biz2lab.com
```

Owner actions:

1. Open Naver Search Advisor with the owner Naver account.
2. Add the site.
3. Verify ownership by Naver-provided meta tag or HTML file.
4. Submit sitemap:

```text
https://www.biz2lab.com/sitemap.xml
```

5. Submit RSS:

```text
https://www.biz2lab.com/rss.xml
```

6. Check robots/Yeti access:

```text
https://www.biz2lab.com/robots.txt
```

7. After crawler delay, check representative URL discovery with:

```text
site:www.biz2lab.com
```

Important:

- Naver requires the registered host and feed URL domains to match.
- Naver reflection can take time after crawler visit.
- Do not mark Naver registration as complete unless the owner confirms it in the Naver UI.
- Naver HTML verification file has been added to the public root. Owner must click Verify in Naver Search Advisor after production deployment.

## Verification Artifact Rule

If the owner wants to use a meta tag or HTML file verification method, provide the exact provider-issued artifact in a separate task.

Supported owner-provided artifact types:

```text
GOOGLE_SITE_VERIFICATION_META
GOOGLE_SITE_VERIFICATION_HTML_FILE
NAVER_SITE_VERIFICATION_META
NAVER_SITE_VERIFICATION_HTML_FILE
```

No placeholder verification token should be added.

