# 의료 검토 상태 머신

상태: `EDITORIAL_CONTRACT`

## 허용 상태

| 상태 | 의미 | 다음 허용 상태 |
|---|---|---|
| `DRAFT_NOT_SOURCE_CHECKED` | 조사·초안 단계이며 의료 주장을 원문과 대조하지 않음 | `SOURCE_CHECK_IN_PROGRESS`, `PUBLICATION_BLOCKED` |
| `SOURCE_CHECK_IN_PROGRESS` | claim registry와 공식 원문 대조 진행 중 | `OFFICIAL_SOURCE_CHECKED`, `PUBLICATION_BLOCKED` |
| `OFFICIAL_SOURCE_CHECKED` | 실제 사람이 공식 출처와 문장을 대조하고 기록함 | `LICENSED_REVIEW_REQUIRED`, `PUBLICATION_BLOCKED` |
| `LICENSED_REVIEW_REQUIRED` | 응급·치료·약물·고위험 문장 때문에 면허 검수가 필요함 | `LICENSED_REVIEW_IN_PROGRESS`, `PUBLICATION_BLOCKED` |
| `LICENSED_REVIEW_IN_PROGRESS` | 확인된 면허 검수자가 지정 범위를 검토 중 | `LICENSED_CLINICIAN_REVIEWED`, `PUBLICATION_BLOCKED` |
| `LICENSED_CLINICIAN_REVIEWED` | 실제 검수자와 문서별 기록이 존재함 | `PUBLICATION_READY`, `PUBLICATION_BLOCKED` |
| `PUBLICATION_READY` | 정확한 article version에 연결된 사람 source check·reader test·copyright·신뢰·개인정보·기술·적용되는 의료 검토·Owner 공개 승인 evidence를 모두 충족 | `PUBLICATION_BLOCKED` |
| `PUBLICATION_BLOCKED` | 하나 이상의 필수 조건 미충족 | 차단 원인을 해결한 적법한 이전 단계 |

## 전이 규칙

- 초안에서 `PUBLICATION_READY`로 직접 이동할 수 없다.
- 자동화 도구는 상태 후보를 제안할 수 있지만 사람 확인 기록 없이 상태를 승격하지 않는다.
- `OFFICIAL_SOURCE_CHECKED`는 `LICENSED_CLINICIAN_REVIEWED`와 다르다.
- `LICENSED_CLINICIAN_REVIEWED`는 검수자 실제 신원, 면허 종류, 검토 범위, 날짜, 결과가 있어야 한다.
- 응급 신호, 치료 개요, 약물, 특수 대상, 고위험 warning은 강화 검토 대상으로 분류한다.
- 고혈압·제2형 당뇨병은 비공개 환경에서 claim별 사람 검증을 완료해 `OFFICIAL_SOURCE_CHECKED` 후보까지 진행할 수 있다. 이 상태는 공개 승인이나 면허 검수 완료가 아니다.
- 고혈압·제2형 당뇨병은 Owner 정체성 승인, 실제 작동하는 비공개 정정 연락처, claim 검증 완료, 사람 독자 테스트, trust page 승인 전에는 `PUBLICATION_BLOCKED`다.
- 고혈압·제2형 당뇨병 안에서도 응급·진단·검사·치료·약물·특수 대상 고위험 claim은 별도의 `LICENSED_REVIEW_REQUIRED`를 적용한다.
- 뇌졸중·심근경색은 페이지 전체가 `LICENSED_REVIEW_REQUIRED`이며 실제 자격 있는 검수자와 문서별 검토 기록이 생길 때까지 `PUBLICATION_BLOCKED`다.
- source check는 면허 의료 검토를 대체하거나 생략시키지 않는다.
- 실제 검수자가 없으면 reviewer 값을 `NONE`으로 기록하고 `PUBLICATION_BLOCKED`를 유지한다.
- reviewer badge는 상태 머신과 실제 기록에서 생성해야 하며 수동 문구로 우회하지 않는다.
- `PUBLICATION_READY` 전에는 `HUMAN_SOURCE_CHECK_COMPLETE`, `READER_TEST_COMPLETE`, `COPYRIGHT_REVIEW_COMPLETE`, `TRUST_AND_PRIVACY_APPROVED`, 적용되는 `LICENSED_REVIEW_COMPLETE`, `OWNER_PUBLICATION_APPROVAL_RECORDED`의 version-bound evidence ID가 모두 있어야 한다.
- 필수 evidence가 누락·만료·충돌하거나 article version이 달라지면 `PUBLICATION_BLOCKED`로 되돌린다.

## 현재 파일럿 상태

| Article | State | Reason |
|---|---|---|
| 고혈압 | `DRAFT_NOT_SOURCE_CHECKED` + `PUBLICATION_BLOCKED` | private source check 후보이나 Owner 정체성·실제 정정 연락처·claim 검증·독자 테스트·trust page 승인이 없음 |
| 제2형 당뇨병 | `DRAFT_NOT_SOURCE_CHECKED` + `PUBLICATION_BLOCKED` | private source check 후보이나 Owner 정체성·실제 정정 연락처·claim 검증·독자 테스트·trust page 승인이 없음 |
| 뇌졸중 | `LICENSED_REVIEW_REQUIRED` + `PUBLICATION_BLOCKED` | 실제 자격 있는 검수자와 검토 기록이 없음 |
| 심근경색 | `LICENSED_REVIEW_REQUIRED` + `PUBLICATION_BLOCKED` | 실제 자격 있는 검수자와 검토 기록이 없음 |

이번 batch에서 어떤 페이지도 `PUBLICATION_READY` 상태를 받지 않는다.

## 무효 전이

- 공공기관 URL 존재 → clinician reviewed
- AI 문장 검토 → source checked
- generic disclaimer 존재 → publication ready
- 한 명의 리뷰 → 모든 버전과 모든 질환 검수
- Preview 렌더 성공 → 의료 정확성 통과
