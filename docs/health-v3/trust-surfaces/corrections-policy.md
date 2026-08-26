---
surface: corrections-policy
status: DRAFT_NOT_PUBLISHED
selected_destination: health@biz2lab.com
activation_status: PENDING_ACTIVATION
required_owner_inputs:
  - PUBLIC_HEALTH_BRAND_NAME
  - CORRECTION_CHANNEL_DESTINATION
  - CORRECTION_CHANNEL_OPERATOR
  - CORRECTION_RETENTION_AND_DELETION_POLICY
---

# Corrections Policy 공개 문구 초안

# 정정 정책

{{PUBLIC_HEALTH_BRAND_NAME}}는 사실 오류, 출처 연결 오류, 오해를 부르는 표현과 콘텐츠 표시 오류를 정정하기 위한 비공개 채널을 운영합니다.

정정 요청은 다음 정보만 받습니다.

- 문제가 있는 page URL
- correction category
- correction description
- 답변을 원하는 경우 optional reply email

접수 destination: `{{CORRECTION_CHANNEL_DESTINATION}}`

Owner 선택값은 `health@biz2lab.com`이지만 실제 생성·수신 테스트가 끝날 때까지 위 token을 교체하거나 활성 채널로 공개하지 않습니다.

처리 담당: `{{CORRECTION_CHANNEL_OPERATOR}}`

첨부파일은 받을 수 없습니다. 의료기록, 처방전, 검사 이미지, 건강 문서, 주민등록번호 또는 개인의 상세 증상·검사값을 보내지 마세요.

이 채널은 사실·콘텐츠 정정 전용입니다. 의료상담, 진단, 약물·용량 조언, 검사 결과 해석 또는 응급상담을 제공하지 않습니다. 응급 상황이 의심되면 이 채널의 답변을 기다리지 말고 119 또는 가까운 응급실에 도움을 요청하세요.

## 처리 절차

1. 비공개로 접수하고 공개 issue를 자동 생성하지 않습니다.
2. 담당자가 사실·출처·의료 안전 영향을 분류합니다.
3. 의료 의미에 영향을 주는 경우 사람의 출처 재확인과 필요한 면허 의료 재검토를 거칩니다.
4. 수정하면 수정일과 중요한 변경 내용을 해당 페이지 또는 정정 기록에 표시합니다.
5. 제출 내용과 optional reply email은 Owner가 승인하고 실제 시스템에서 검증한 최소 보관 기간 뒤 삭제합니다.

보관 기간: `{{CORRECTION_RETENTION_PERIOD}}`

삭제·백업·로그 처리: `{{CORRECTION_DELETION_AND_LOG_POLICY}}`

destination·operator·보관·삭제 정책이 실제 값으로 확정되고 실제 시스템에서 검증되기 전에는 이 정책과 정정 채널을 공개하지 않습니다.
