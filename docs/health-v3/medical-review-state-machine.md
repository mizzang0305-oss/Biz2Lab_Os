# 오누림 의료 검토 상태 머신

상태: `EDITORIAL_CONTRACT`

## 의료 검토 단계

| 상태 | 진입 증거 | 다음 허용 상태 |
|---|---|---|
| `ONURIM_MEDICAL_REVIEW_PACKAGE_READY` | 47개 고위험 Claim의 문장·출처·위험등급·질문·버전 hash가 고정됨 | `REVIEWER_ASSIGNED`, `PUBLICATION_BLOCKED` |
| `REVIEWER_ASSIGNED` | 실제 이름, 면허 종류·관할·확인 방법, 이해관계, 검토 범위 확인이 기록됨 | `ONURIM_MEDICAL_REVIEW_IN_PROGRESS`, `PUBLICATION_BLOCKED` |
| `ONURIM_MEDICAL_REVIEW_IN_PROGRESS` | 지정된 검토자가 현재 packet의 Claim 판정을 1건 이상 기록함 | `MEDICAL_REVIEW_DECISIONS_COMPLETE_PENDING_EDITORIAL_APPLICATION`, `PUBLICATION_BLOCKED` |
| `MEDICAL_REVIEW_DECISIONS_COMPLETE_PENDING_EDITORIAL_APPLICATION` | 47개 Claim 모두 유효한 판정을 가짐 | `MEDICAL_EDITORIAL_APPLICATION_IN_PROGRESS`, `PUBLICATION_BLOCKED` |
| `MEDICAL_EDITORIAL_APPLICATION_IN_PROGRESS` | `REVISE`·`REMOVE` 결과를 코드에 반영하고 있음 | `ALL_74_CLAIMS_REAUDIT_REQUIRED`, `PUBLICATION_BLOCKED` |
| `ALL_74_CLAIMS_REAUDIT_REQUIRED` | 의료 수정 반영 완료, 전체 74 Claim 재감사 대기 | `MEDICAL_REVIEW_APPLIED_AND_REAUDITED`, `PUBLICATION_BLOCKED` |
| `MEDICAL_REVIEW_APPLIED_AND_REAUDITED` | 74 Claim 재감사 통과, 미해결 `SPECIALIST_REQUIRED` 없음 | `REAL_READER_TEST_REQUIRED`, `PUBLICATION_BLOCKED` |
| `REAL_READER_TEST_REQUIRED` | 의료적으로 확정된 문장에 실제 비의료 독자 검증 필요 | `READABILITY_REMEDIATION`, `PUBLICATION_BLOCKED` |
| `READABILITY_REMEDIATION` | 독자 혼란에 따른 최소 표현 수정 | `ONURIM_PILOT_EDITORIAL_MODEL_LOCKED`, `TARGETED_MEDICAL_RECHECK_REQUIRED`, `PUBLICATION_BLOCKED` |
| `TARGETED_MEDICAL_RECHECK_REQUIRED` | 가독성 수정이 의료 의미를 바꿈 | `ONURIM_PILOT_EDITORIAL_MODEL_LOCKED`, `PUBLICATION_BLOCKED` |
| `ONURIM_PILOT_EDITORIAL_MODEL_LOCKED` | 의료 검토·74 Claim 재감사·실제 독자 테스트·필요 재확인 완료 | 별도 publication gate |
| `PUBLICATION_BLOCKED` | 하나 이상의 필수 조건 미충족 | 차단 원인을 해결한 적법한 이전 단계 |

## 전이 규칙

- 자동화 도구나 AI는 검토자를 지정하거나 의료 판정을 대신할 수 없다.
- 빈 검토 패킷은 `REVIEWER_ASSIGNED` 또는 `ONURIM_MEDICAL_REVIEW_IN_PROGRESS` 증거가 아니다.
- 실제 검토자 정보만 입력한 상태는 `REVIEWER_ASSIGNED`이며, 첫 판정 전에는 in progress가 아니다.
- 첫 유효 판정이 기록되면 in progress이며, 47개 모두 판정되기 전에는 decisions complete가 아니다.
- `SPECIALIST_REQUIRED`는 전문과의 후속 판정으로 해소되기 전까지 완료가 아니다.
- 공식 URL, source mapping, synthetic persona, Preview 렌더는 면허 의료 검토 증거가 아니다.
- packet hash 또는 Claim hash가 다르면 해당 결과를 현재 문장에 적용하지 않는다.
- 의료 수정 후 고위험 47개뿐 아니라 전체 74개 Claim을 재감사한다.
- 실제 독자 테스트는 의료 검토 이후에 실시하며 독자 의견만으로 의료 의미를 변경하지 않는다.
- reviewer badge는 실제 완료 증거와 Owner 공개 승인에서만 생성한다.
- Production 공개는 이 상태 머신과 별도 Owner cutover 승인까지 모두 충족해야 한다.

## 현재 상태

| 항목 | 값 |
|---|---|
| 가이드 | 6 |
| 전체 Claim | 74 |
| 검토 패킷 Claim | 47 |
| Package | `ONURIM_MEDICAL_REVIEW_PACKAGE_READY` |
| Reviewer sourcing | `LICENSED_REVIEWER_SOURCING` |
| Reviewer assigned | `NO` |
| Medical review in progress | `NO` |
| Medical review completed | `NO` |
| Real human reader test | `NOT_PERFORMED` |
| Production | `PUBLICATION_BLOCKED` |

## 무효 전이

- 공공기관 URL 존재 → medical review complete
- AI 또는 synthetic persona 확인 → reviewer assigned
- 검토자 정보 입력만 완료 → medical review in progress
- 일부 Claim 승인 → 47 Claim complete
- CSV 다운로드 → editorial application complete
- Preview 렌더 성공 → publication ready
