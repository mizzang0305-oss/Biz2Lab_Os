# Evidence Index

| 영역 | source | query | URL | checked_at | result | confidence | limitation |
|---|---|---|---|---|---|---|---|
| KIPRIS method | KIPRIS official | 상표명칭(TN), 완전일치 | https://www.kipris.or.kr/khome/search/searchResult.do?tab=trademark | 2026-08-24 KST | final 10 exact query captured | HIGH | no similarity/legal evaluation |
| KIPRIS screenshots | local evidence | final-ten exact names | `reports/local/health-v3-brand-round2/20260824-024022/03-kipris/` | 2026-08-24 KST | 10 PNG | HIGH | local-only; result is exact match only |
| Google exact | Google public search | quoted finalist | https://www.google.com/search | 2026-08-24 KST | no top material health/provider result observed | MEDIUM | personalized/indexed results change |
| Bing public search | public search | quoted and context probes | https://www.bing.com/search | 2026-08-24 KST | used as collision corroboration | MEDIUM | ranking/location changes |
| RDAP | Verisign RDAP | finalist `.com` | https://rdap.verisign.com/com/v1/domain/ | 2026-08-24 KST | primary three HTTP 404 no record | HIGH | does not reserve or guarantee purchase |
| DNS/HTTPS | public DNS/HTTPS | finalist `.com/.kr/.co.kr` | domain-specific | 2026-08-24 KST | primary three no A/HTTPS response | MEDIUM | no-answer is not registration evidence |
| NICE | WIPO NCL 13-2026 / KIPRIS help | 9,16,41,42,44 | https://nclpub.wipo.int/enfr/ | 2026-08-24 KST | class watch list refreshed | HIGH | classification is not conflict analysis |

스크린샷 SHA-256은 `reports/local/health-v3-brand-round2/20260824-024022/SHA256SUMS.txt`에 기록한다.
