# 오누림 의료 검토 워크플로

상태: `ACTIVE_GOVERNANCE`

## 현재 기준선

- 가이드: 6개
- 전체 Claim: 74개
- 면허 의료인 검토 필수 Claim: 47개
- 공식 출처 레코드: 27개
- 검토 패킷 상태: `ONURIM_MEDICAL_REVIEW_PACKAGE_READY`
- 검토자 상태: `LICENSED_REVIEWER_SOURCING`
- `REVIEWER_ASSIGNED = NO`
- `ONURIM_MEDICAL_REVIEW_IN_PROGRESS = NO`
- `MEDICAL_REVIEW_COMPLETED = NO`
- `REAL_HUMAN_READER_TEST = NOT_PERFORMED`

공식 출처 매핑은 면허 의료인의 임상 검토가 아니다. 실제 검토자 증거와 Claim별 판정이 생기기 전에는 의료 검토 시작 또는 완료로 표시하지 않는다.

## 실행 순서

`6 GUIDE / 74 CLAIM SOURCE-MAPPED DRAFT`
→ `47 HIGH-RISK CLAIM REVIEW PACKAGE`
→ `REVIEWER_ASSIGNED`
→ `ONURIM_MEDICAL_REVIEW_IN_PROGRESS`
→ `APPROVE / REVISE / REMOVE / SPECIALIST_REQUIRED`
→ `MEDICAL EDITORIAL APPLICATION`
→ `74 CLAIM RE-AUDIT`
→ `REAL NON-MEDICAL READER TEST (5 PEOPLE)`
→ `READABILITY-ONLY MINIMAL EDITS`
→ `TARGETED MEDICAL RECHECK WHERE MEANING CHANGED`
→ `ONURIM_PILOT_EDITORIAL_MODEL_LOCKED`

어느 단계도 자동으로 다음 단계로 승격하지 않는다. Production 공개, 배포, PR Ready·merge는 별도 Owner 승인이다.

## 역할

- `Research editor`: 공식 출처와 Claim 매핑을 유지한다.
- `Content editor`: 승인된 판정만 문장에 반영하고 74 Claim 전체를 재감사한다.
- `Licensed medical reviewer`: 실제 면허와 검토 범위가 확인된 뒤 47개 Claim을 판정한다.
- `Owner`: 검토자 지정, 공개 범위, 후속 독자 테스트, Preview·Production 변경을 승인한다.

한 사람이 여러 역할을 맡을 수 있지만 실제 역할·자격·이해관계를 사실대로 기록한다.

## 검토자 지정 최소 증거

- 실제 이름
- 면허 종류와 관할
- 면허번호 원문이 아닌 확인 방법
- 소속(해당 시)
- 이해관계 공개
- 지정 범위 검토 역량 확인
- 각 판정 전 연결된 공식 출처 원문 확인 동의

이 조건이 충족되면 `REVIEWER_ASSIGNED`가 된다. 그 검토자가 첫 Claim 판정을 기록한 시점부터 `ONURIM_MEDICAL_REVIEW_IN_PROGRESS`다.

## Claim 판정 계약

| 판정 | 의미 | 필수 추가 기록 |
|---|---|---|
| `APPROVE` | 현재 문장을 해당 버전 그대로 승인 | 판정 시각 |
| `REVISE` | 의료적 의미를 고쳐야 함 | 제안 수정 문장, 검토 근거, 판정 시각 |
| `REMOVE` | 안전·정확성 문제로 제거해야 함 | 검토 근거, 판정 시각 |
| `SPECIALIST_REQUIRED` | 현재 검토 범위를 넘어 전문과 확인이 필요 | 전문 분야, 검토 근거, 판정 시각 |

`SPECIALIST_REQUIRED`는 승인이나 완료가 아니다. 해결될 때까지 해당 Claim은 publication blocker다.

## 결과 반영과 재감사

1. 회수한 CSV의 packet hash와 각 Claim hash를 현재 코드와 대조한다.
2. 47개 레코드와 검토자 정보가 일관적인지 확인한다.
3. `REVISE`와 `REMOVE`만 별도 편집 변경으로 적용한다.
4. 바뀐 문장이 기존 공식 출처 매핑을 계속 만족하는지 확인한다.
5. 고위험 47개뿐 아니라 전체 74개 Claim의 ID, 본문, 출처, 위험등급, 도구·시각자료 참조를 재감사한다.
6. 의료 의미가 추가로 바뀐 Claim은 동일 검토자 또는 적합한 전문과에 재확인한다.

검토 CSV 자체는 의료 문장을 자동으로 수정하거나 검수 완료 상태를 만들지 않는다.

## 후속 독자 테스트 경계

실제 비의료 독자 5명은 의료적으로 확정된 문장의 이해도, 행동 발견성, 경고 가독성, 그림 이해도를 확인한다. 독자 의견만으로 진단·응급·치료·약물 의미를 바꾸지 않는다. 가독성 수정이 의료 의미를 바꾸면 해당 Claim만 의료인 재확인을 받는다.

## 중단 조건

- 실제 검토자 신원·면허 확인 증거가 없음
- packet hash 또는 Claim hash가 현재 버전과 다름
- 응급 행동·치료 경계를 승인하지 못함
- `SPECIALIST_REQUIRED`가 미해결
- 검토자 간 중요한 이견이 해결되지 않음
- 결과 적용 후 74 Claim 재감사가 실패함

이 경우 가장 구체적인 `BLOCKED_*` 상태로 중단하고 공개하지 않는다.
