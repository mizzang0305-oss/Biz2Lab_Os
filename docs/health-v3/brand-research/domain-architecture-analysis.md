# Domain Architecture Analysis

상태: `OWNER_DECISION_REQUIRED`

브랜드와 도메인은 별도 결정이다. 어느 모델도 현재 구현하거나 등록하지 않는다.

| Model | 개념 | 장점 | 주요 위험 | AdSense/검색 고려 | Rollback | 현재 판단 |
|---|---|---|---|---|---|---|
| D1 | 기존 `biz2lab.com`에서 health brand를 표시하고 Biz2Lab을 operator로 고지 | 운영·기술·도메인 연속성이 가장 단순 | B2B에서 건강으로의 주제 불연속, 신뢰 설명과 legacy 관리 필요 | 같은 site의 topical change를 이름만으로 해결하지 않음; current review 중 변경 금지 | header/trust layer revert 가능하지만 public migration 후에는 영향 큼 | `OWNER_DECISION_REQUIRED` |
| D2 | 새 health domain, Biz2Lab은 operator | 독자-facing topical clarity와 brand separation | 새 domain 신뢰·검색·운영·검증·중복 콘텐츠 관리 비용 | 새로운 Search Console/AdSense site treatment를 사람 확인해야 하며 회피 수단으로 사용 금지 | 기존 B2B와 분리되어 rollback은 비교적 명확 | `OWNER_DECISION_REQUIRED` |
| D3 | Biz2Lab health subdomain | 브랜드·crawler 일부 분리 | subdomain 운영·canonical·sitemap·trust·monitoring 복잡도 | 색인 및 publisher treatment를 가정하지 말고 사람 확인 | routing/host architecture rollback 복잡 | `OWNER_DECISION_REQUIRED` |

## 현재 권고

현재는 `D1`을 **구현 권고가 아닌 비용 기준선**으로만 유지한다. 실제 건강 콘텐츠 공개 전에는 D1/D2/D3 어느 것도 선택하지 않는다. 선택 기준은 최종 브랜드의 KIPRIS·registrar 확인, Health V3 trust gate, 현재 Biz2Lab AdSense review 결과, 기존 B2B 보존 계획이다.

## 금지된 해석

- 새 도메인은 AdSense enforcement 또는 review를 피하는 수단이 아니다.
- subdomain은 자동으로 crawler, trust 또는 approval 문제를 해결하지 않는다.
- Option B 승인은 domain architecture 승인·DNS 변경·canonical 변경이 아니다.
