# 의료 콘텐츠 사람 검토 워크플로

상태: `PROPOSED_GOVERNANCE`

## 1. 역할

- `Research editor`: 공식 출처를 수집하고 주장-출처 매핑을 작성한다.
- `Content editor`: 일반 독자가 이해할 수 있게 쓰고 중복·과장을 제거한다.
- `Medical reviewer`: 실제로 참여하는 경우에만 임상적 정확성, 위험 신호, 치료 경계를 검토한다.
- `Owner`: 저자·검수자 공개, 개인정보, 광고 분리, Preview와 Production 변경을 승인한다.

Batch 0의 고혈압과 제2형 당뇨병은 private source-check 후보까지 진행할 수 있지만 고위험 claim은 `MEDICAL_REVIEW`를 통과해야 한다. 뇌졸중과 심근경색은 페이지 전체가 `MEDICAL_REVIEW` 대상이다. 필요한 검수자가 없으면 해당 claim 또는 페이지는 `PUBLICATION_BLOCKED`에서 중단한다.

한 사람이 여러 역할을 할 수 있지만 실제 역할과 자격을 사실대로 공개한다.

## 2. 상태 흐름

`RESEARCH` → `SOURCE_MAPPED_DRAFT` → `HUMAN_SOURCE_CHECK_COMPLETE` → `EDITORIAL_REVIEW` → `CLAIM_RISK_CLASSIFICATION` → `MEDICAL_REVIEW_WHERE_REQUIRED` → `COPYRIGHT_REVIEW_COMPLETE` → `READER_TEST_COMPLETE` → `TRUST_AND_PRIVACY_APPROVED` → `PREVIEW_NOINDEX` → `OWNER_PUBLICATION_APPROVAL_RECORDED` → `PRODUCTION_CANDIDATE`

어느 단계에서도 자동으로 다음 단계로 넘어가지 않는다. Production 배포와 AdSense 조작은 별도 Owner 승인이다.

각 완료 상태는 정확한 article version에 연결된 evidence ID가 있어야 한다. evidence가 없거나 오래됐거나 서로 충돌하면 `PUBLICATION_BLOCKED`로 돌아간다. source URL 매핑이나 AI 확인만으로 `HUMAN_SOURCE_CHECK_COMPLETE`가 되지 않는다.

## 3. 의료 검토 기록

기사마다 다음을 저장한다.

- 검토자 실제 ID와 공개 동의
- 검토 범위
- 검토 날짜
- 검토 당시 출처 버전
- 수정 요청과 반영 여부
- 미해결 이견
- 다음 검토 조건

의료 검수자가 없으면 필드를 비워 두는 대신 `NOT_MEDICALLY_REVIEWED`를 명시한다.

## 4. 변경 시 재검토

다음 변경은 의료 재검토를 요구한다.

- 진단 기준·검사 수치·응급 행동 변경
- 약물·치료·예방 권고 변경
- 임신·소아·고령자 등 특수 대상 내용 변경
- 주요 그림의 해부학·질환 흐름 변경
- 공식 지침 또는 연락 번호 변경

맞춤법, 레이아웃처럼 의료 의미를 바꾸지 않는 변경은 편집 검토 기록만 남길 수 있다.

## 5. 중단 조건

- 의료 검토자가 주장에 동의하지 않음
- 출처 간 중요한 충돌이 해결되지 않음
- 응급 행동의 정확성을 확인하지 못함
- 실제 저자·운영 주체·문의 경로가 미확인
- 개인정보 처리와 실제 도구 구성이 일치하지 않음

이 경우 가장 구체적인 `BLOCKED_*` 상태로 중단하고 공개하지 않는다.
