# Health V3 브랜드 아키텍처 3안

상태: `OWNER_DECISION_REQUIRED`

도메인은 이번 배치에서 변경하지 않는다. 아래 세 안은 Owner 결정을 위한 비교안이며 아직 선택되지 않았다.

- 현재 작업 상태: 비공개 staging 문서만 준비
- 선택 상태: `NO_OPTION_SELECTED`
- 건강 편집 브랜드와 `Biz2Lab`의 표시 관계는 Owner 입력이 필요하다.
- 실제 건강 브랜드명과 tagline은 `OWNER_INPUT_REQUIRED`다.
- 이 결정은 구현·공개 승인이 아니다.

| 평가 | Option A — Biz2Lab + 건강 subtitle | Option B — 건강 편집 브랜드 + Biz2Lab 운영자 | Option C — 별도 브랜드/도메인 승인까지 staging |
|---|---|---|---|
| 구조 | `Biz2Lab 건강 안내`처럼 기존명을 주 브랜드로 유지 | 새로운 건강 브랜드를 전면에 두고 Biz2Lab은 운영 주체로 공개 | 현재 도메인 공개 전환을 보류하고 별도 브랜드·도메인 결정 |
| Trust | 기존 이름의 사업·기술 이미지가 건강 신뢰와 충돌할 수 있음 | 독자 목적이 가장 명확할 수 있으나 운영 관계를 투명하게 설명해야 함 | 건강 정체성 일관성을 가장 강하게 설계할 수 있으나 실체 없는 새 브랜드는 역효과 |
| User clarity | subtitle가 분명하면 보통 | 건강 목적은 명확하나 두 이름 관계 설명 필요 | 공개 전에는 혼란 없음; 공개 시 새 인지도 구축 필요 |
| Migration risk | 도메인·이름 변화가 가장 적음 | 화면·metadata·entity·정책 페이지 변경 필요 | 별도 도메인 선택 시 redirect·canonical·소유권·정책 리스크 큼 |
| AdSense continuity | 동일 사이트의 대규모 주제 전환으로 재평가 불확실성 존재 | 동일 도메인이면 A와 유사하며 이름만으로 승인 조건이 달라지지 않음 | 별도 사이트·도메인은 계정·사이트 검토 절차를 Owner가 다시 확인해야 함 |
| Search history | 기존 B2B 역사와 건강 주제의 불연속이 남음 | 브랜드 층위로 불연속을 설명할 수 있으나 검색 신호가 자동 전환되지는 않음 | 새 도메인은 기존 검색 역사 이점과 위험 모두 분리될 수 있음 |
| Operational complexity | 낮음 | 중간 | 높음 |
| Rollback | subtitle·navigation 변경 revert | 건강 브랜드 layer와 metadata revert | 별도 도메인·DNS·redirect·콘텐츠 이전 전체 계획 필요 |

## 결정 질문

1. Biz2Lab을 건강 독자에게 공개해야 하는 법적·사업적 이유가 있는가?
2. 새 건강 브랜드의 실제 소유·운영 관계를 명확히 설명할 수 있는가?
3. 기존 B2B 콘텐츠를 장기 보관할 위치는 어디인가?
4. 동일 도메인의 급격한 주제 변경과 별도 도메인의 운영 비용 중 어느 위험을 감수할 것인가?
5. AdSense 검토 중인 현재 사이트 상태에서 언제 전환 결정을 실행할 것인가?

## 현재 결정

`NO_OPTION_SELECTED`. 실제 option·브랜드명·tagline이 확정되고 별도 공개 승인을 받기 전에는 이름·도메인·metadata·navigation을 변경하지 않는다.

## 기존 B2B Production 보존 계약

다음 작업은 별도 Owner 승인 전 모두 금지한다.

- 기존 B2B 페이지 삭제·redirect·noindex
- canonical·sitemap·navigation 변경
- 기존 B2B SEO title·description·structured data 변경
- 건강 페이지 Production 공개
- AdSense·Search Console 변경
