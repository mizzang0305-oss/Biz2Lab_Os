# Owner Brand Decision Pack

상태: `OWNER_FINAL_DECISION_NOT_YET_READY`

## A. Decision Summary

Option B(건강 편집 브랜드 전면 + Biz2Lab operator)는 이미 승인되었다. 이번 패키지는 `곁살핌` 단일 후보의 수동 clearance 결과를 Owner가 검토하기 위한 빈 결정 양식이다. `곁살핌`은 법적 승인, 상표 clearance, 도메인 소유 또는 공개 사용 승인을 받지 않았다.

## B. Current Candidate Context

| 항목 | 현재 상태 |
|---|---|
| 수동 clearance 후보 | `곁살핌` |
| backup | `살핌길` (`BACKUP_ONLY_NOT_CLEARED`) |
| primary shortlist 제외 | `살핌노트`, `몸안내`, `곁건강` |
| KIPRIS 결과 | `HUMAN_VERIFICATION_REQUIRED` |
| 외부 검색 | `PARTIAL_AUTOMATED_CAPTURE_NOT_CLEARANCE` |
| 독자 테스트 | `HUMAN_RESPONSES_PENDING` |
| 도메인 전략 | `BRAND_DOMAIN_DECOUPLING_REQUIRED` |

## C. Owner Final Decision Fields

모든 값은 의도적으로 비어 있다. 이 문서의 후보 표기는 선택 또는 승인으로 읽혀서는 안 된다.

```text
selected brand:
selected Korean spelling:
selected Romanization:
selected tagline:
trademark human search complete:
IP professional review complete:
domain strategy:
domain purchase approved:
public-use approval:
```

## D. Final Decision Gate

Owner final decision은 아래 모두가 증거로 충족된 경우에만 가능하다.

1. `곁살핌` exact conflict가 확인되지 않았을 것
2. KIPRIS 한글·띄어쓰기·유사어·구성요소·로마자 수동 검토가 완료되었을 것
3. 관련 지정상품·서비스에서 수용 불가능한 유사표장 겹침이 없을 것
4. 실제 서비스에 맞춘 사람이 하는 분류 검토와 IP professional review가 완료되었을 것
5. 공개 검색 결과가 수용 가능할 것
6. 비의료 성인 5명 독자 테스트가 기록되었을 것
7. 의료기관·의사·정부기관으로 오인될 위험이 수용 가능할 것
8. 현실적인 도메인 전략이 Owner에게 제시되고, 한계도 함께 확인되었을 것

중대한 exact/similar conflict가 확인되면 `GYEOTSALPIM_REJECTED_NEW_BRAND_ROUND_REQUIRED`로 전환한다.
