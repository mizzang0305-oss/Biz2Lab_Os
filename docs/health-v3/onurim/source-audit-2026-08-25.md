# ONURIM HEALTH V3 — SOURCE AUDIT — 2026-08-25

## Scope

`74` visible claim records were checked for a non-empty claim ID, official HTTPS source mapping, source retrieval date, publication state, and clinical-review requirement.

| Portfolio | Claims | Official source records | High-risk claims | Publication state |
| --- | ---: | ---: | ---: | --- |
| 고혈압·제2형 당뇨병 | 26 | 12 | 18 | `PREVIEW_ONLY_PRODUCTION_BLOCKED` |
| 알레르기 비염 | 12 | 3 + shared emergency source | 7 | `PREVIEW_ONLY_PRODUCTION_BLOCKED` |
| 위식도역류질환 | 12 | 4 + shared emergency source | 8 | `PREVIEW_ONLY_PRODUCTION_BLOCKED` |
| 골관절염 | 12 | 4 + shared emergency source | 7 | `PREVIEW_ONLY_PRODUCTION_BLOCKED` |
| 골다공증 | 12 | 4 + shared emergency source | 7 | `PREVIEW_ONLY_PRODUCTION_BLOCKED` |

## Deterministic result

- Claim ID duplicate: none
- Missing claim-to-source mapping: none
- Unknown source ID: none
- Non-HTTPS source: none
- Missing retrieval date: none
- High-risk claim without `LICENSED_REVIEW_REQUIRED`: none
- Medical review completed claim: none

## Availability recheck

On 2026-08-25, a read-only HTTPS recheck returned a successful response for 26 of 27 source URLs. The American Heart Association home-monitoring page returned HTTP 403 to the automated request, but the same official page rendered through a browser-oriented access path on the same date. This is recorded as `AUTOMATED_FETCH_RESTRICTED_BROWSER_ACCESS_CONFIRMED`, not a source-content failure.

All source-linked pages remain `NOT_MEDICALLY_REVIEWED`. The source audit checks mapping and wording scope; it is not a clinical review.
