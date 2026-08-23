# Source Provenance Registry

상태: `CURRENT_LIVE_SOURCE_LOG`

| source_id | title | publisher | url | checked_at | query | status | confidence | limitation |
|---|---|---|---|---|---|---|---|---|
| SRC-001 | KIPRIS 지식재산정보 검색 서비스 | KIPRIS | https://kipris.or.kr/ | 2026-08-23 KST | 상표 상세검색 접근·후속 후보별 상표명칭/유사/상품분류 검색 방법 | `ACCESSIBLE_HUMAN_SEARCH_REQUIRED` | HIGH | 자동 수집으로 후보별 결과·유사 판단을 확정하지 않음 |
| SRC-002 | KIPRIS 검색도움말 | KIPRIS | https://www.kipris.or.kr/khome/board/help/basic.do | 2026-08-23 KST | 상표 검색 가능 필드와 결과 내 재검색 | `ACCESSIBLE` | HIGH | 특정 후보의 충돌 결과가 아님 |
| SRC-003 | Global Brand Database | WIPO | https://www.wipo.int/en/web/global-brand-database | 2026-08-23 KST | international trademark database coverage and limitation | `ACCESSIBLE` | HIGH | WIPO도 national/regional register 추가 검색을 권고함 |
| SRC-004 | Nice Classification | WIPO | https://www.wipo.int/en/web/classification-nice/index | 2026-08-23 KST | current classification framework | `ACCESSIBLE` | HIGH | 실제 지정상품·서비스와 법적 전략은 미결정 |
| SRC-005 | .com RDAP | Verisign | https://rdap.verisign.com/com/v1/domain/ | 2026-08-23 KST | five final `.com` candidates | `LIVE_READ_ONLY` | HIGH | RDAP 404는 도메인 구매 가능·권리·역사 안전을 보장하지 않음 |
| SRC-006 | Public web search | Google/Bing accessible web results | https://www.bing.com/search | 2026-08-23 KST | exact Korean, spacing, romanized finalist variants | `PARTIAL_CAPTURE` | LOW | Korean exact-result capture가 일관되지 않아 Naver/Bing/YouTube/app-store 사람 확인 필요 |
| SRC-007 | Internet Archive CDX | Internet Archive | https://web.archive.org/cdx/search/cdx | 2026-08-23 KST | `gyeotsalpim.com/*`, `salpimnote.com/*`, `momannae.com/*` | `PARTIAL_OR_NO_CAPTURE` | LOW | no-capture 또는 request error는 prior-use 부재 증명이 아님 |

## 직접 관찰된 제외 신호

`몸결`은 공개 검색에서 영업 중인 동명 생활서비스/사진 관련 사업자 정보가 관찰되어 exact-name conflict 위험으로 제외했다. `건강풀이`는 사주·운세성 서비스 결과와 강하게 결합되어 건강교육 브랜드로 부적합하다고 제외했다. 이 관찰은 KIPRIS 상표 충돌 결론이 아니다.
