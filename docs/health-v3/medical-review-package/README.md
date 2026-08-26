# 오누림 47-Claim 의료 검토 패킷

상태: `ONURIM_MEDICAL_REVIEW_PACKAGE_READY`

## 검토 접점

- 보호된 HTML 검토판: `/health/review/medical`
- 빈 CSV 패킷: `/health/review/medical/packet.csv`
- 판정 값: `APPROVE`, `REVISE`, `REMOVE`, `SPECIALIST_REQUIRED`

HTML 검토판과 CSV는 `lib/health-v3/content.ts`의 Claim·출처 레코드에서 동시에 생성한다. 별도 수기 스프레드시트를 정본으로 두지 않으므로 두 형식 간 문장·출처 drift를 막는다.

## 고정 범위

| 항목 | 값 |
|---|---|
| 가이드 | 6 |
| 전체 Claim | 74 |
| 검토 대상 Claim | 47 |
| 공식 출처 | 27 |
| 현재 검토자 | 없음 |
| 현재 검토 진행 | 시작 안 함 |

각 Claim은 packet version, packet SHA-256, Claim SHA-256을 가진다. 결과 회수 시 이 값을 현재 패킷과 대조해야 한다.

## 데이터 경계

- 환자정보를 입력하지 않는다.
- 면허번호 원문을 입력하지 않는다.
- 브라우저 입력은 서버에 저장하지 않는다.
- 검토자는 중간 또는 최종 상태를 CSV로 내려받아 승인된 보호 경로로 전달한다.
- 이 저장소에는 실제 검토자 개인정보나 완료 결과를 자동 저장하지 않는다.

## 상태 전이

1. 검토자 지정 필수값과 두 확인 항목 완료: `REVIEWER_ASSIGNED`
2. 첫 유효 Claim 판정 입력: `ONURIM_MEDICAL_REVIEW_IN_PROGRESS`
3. 47개 전부 유효 판정: `MEDICAL_REVIEW_DECISIONS_COMPLETE_PENDING_EDITORIAL_APPLICATION`

세 번째 상태는 의료 수정 반영이나 전체 74 Claim 재감사 완료를 뜻하지 않는다.

## 현재 진실값

```text
SYNTHETIC_READER_SIMULATION = COMPLETED
REAL_HUMAN_READER_TEST = NOT_PERFORMED
MEDICAL_REVIEW_COMPLETED = NO
LICENSED_REVIEWER_SOURCING
REVIEWER_ASSIGNED = NO
ONURIM_MEDICAL_REVIEW_IN_PROGRESS = NO
```
