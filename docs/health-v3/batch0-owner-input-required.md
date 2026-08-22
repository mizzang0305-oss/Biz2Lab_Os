# Batch 0.5 Owner 입력 필요

상태: `BLOCKED_OWNER_TRUST_INPUT_REQUIRED`

이 문서는 공개 페이지용 placeholder가 아니다. 아래 값은 Owner가 판단할 수 있도록 정리한 `RECOMMENDED_OWNER_PROPOSAL`이며 실제 승인 상태가 아니다. 이름·자격·연락처·경험·정책을 추정하거나 자동 확정하지 않는다.

## A. 브랜드 아키텍처

`RECOMMENDED_OWNER_PROPOSAL`

- 추천 선택지: `OPTION_B`
- 독자-facing 정체성: 건강 편집 브랜드
- 사이트 운영 주체 표시: Biz2Lab
- 최종 브랜드명: `PENDING_NAME_CLEARANCE`
- 내부 작업명: `Biz2Lab Health V3`
- 제안 목적 문구: “질환을 쉬운 말과 그림으로 이해하고, 필요한 도움을 제때 찾도록 돕는 건강 정보 안내서”

Owner가 승인하기 전까지 `NO_OPTION_SELECTED`이며 domain·metadata·navigation·공개 route를 변경하지 않는다.

## B. 저자 모델

`RECOMMENDED_OWNER_PROPOSAL`

- 제안 실명: 박영훈
- 공개 상태: `PUBLIC_NAME_APPROVAL_PENDING`
- 역할: `NON_CLINICIAN_HEALTH_INFORMATION_EDITOR`
- 의사·간호사·약사·치료사·영양사·연구자 자격을 주장하지 않는다.
- 제안 biography: “공공기관과 의료기관의 환자용 자료를 일반인이 이해하기 쉬운 말과 그림으로 정리하는 비의료인 편집자입니다. 진단·처방·개인 의료 상담을 제공하지 않습니다.”

위 이름과 biography는 Owner 승인 전 공개하지 않는다.

## C. 면허 의료 검수자

현재 사실 상태: `NO_CURRENT_LICENSED_REVIEWER`

- 검수자를 만들거나 추정하지 않는다.
- `OFFICIAL_SOURCE_CHECKED`와 `LICENSED_CLINICIAN_REVIEWED`를 분리한다.
- 뇌졸중과 심근경색은 `LICENSED_REVIEW_REQUIRED` 및 `PUBLICATION_BLOCKED`를 유지한다.
- 응급·진단·검사·치료·약물·특수 대상 관련 고위험 claim은 면허 검수와 기록 전까지 차단한다.

## D. 비공개 정정 연락처와 privacy

`RECOMMENDED_OWNER_PROPOSAL`

- 추천 후보: `health@biz2lab.com` 또는 `corrections@biz2lab.com`
- 상태: `PENDING_ACTIVATION`
- 실제 수신·운영 여부를 Owner가 확인하기 전에는 공개하거나 활성 주소로 주장하지 않는다.
- 용도는 사실·콘텐츠 정정으로 제한한다.
- 의료상담, 의료기록 수집, 진단 요청, 약물 조언, 응급상담을 받지 않는다.
- page URL, 정정 분류, 정정 설명, 선택적 회신 email만 수집하는 최소정보 원칙을 적용한다.
- 보관·삭제 정책: `PENDING_OWNER_POLICY`

## E. AI와 사람 검토 workflow

`RECOMMENDED_OWNER_PROPOSAL`

### AI_ASSISTED

- source candidate 정리
- outline
- wording alternatives
- checklist prototype
- original illustration prototype

### HUMAN_EDITOR

- 공식 원문 직접 열람
- claim별 검증
- 안전하지 않은 문구 제거
- privacy 확인
- 최종 copy 승인

### LICENSED_REVIEWER

- 응급·진단·검사·치료·약물·특수 대상 claim을 별도 검토

실제 운영이 이 workflow와 일치하기 전에는 AI 도움 공개 문구를 게시하지 않는다.

## F. 이야기 사용

`RECOMMENDED_OWNER_PROPOSAL`

- 기본값: `GENERAL_EVERYDAY_EXAMPLE`
- 지인이나 이름 있는 환자를 만들어내지 않는다.
- 실제 보호자 경험은 `ANONYMIZED_CONSENTED_CAREGIVER_EXPERIENCE`로만 사용할 수 있다.
- 사용 전 동의 기록이 있어야 한다.
- 식별 가능한 의료 세부정보는 금지한다.

## 이미 고정된 안전 경계

- 공개 route·Production·AdSense·Search Console 변경 금지
- 개인 진단·투약 조정·의료 상담 금지
- 완료되지 않은 source check·면허 검수를 badge로 표시 금지
- 네 파일럿은 현재 `PUBLICATION_BLOCKED`
- 기존 Biz2Lab B2B Production 보존

## Owner 승인 기록

- 승인자:
- 승인 범위:
- 승인일:
- 다음 재검토일:
- 제외 또는 보류 항목:

실제 결정 입력은 `owner-approval-pack.md`에서 선택하며, 빈 기록은 승인으로 해석하지 않는다.
