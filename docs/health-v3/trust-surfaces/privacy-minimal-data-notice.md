---
surface: privacy-minimal-data-notice
status: DRAFT_NOT_PUBLISHED
scope: correction-channel-only
required_owner_inputs:
  - PUBLIC_HEALTH_BRAND_NAME
  - CORRECTION_CHANNEL_DESTINATION
  - CORRECTION_CHANNEL_OPERATOR
  - CORRECTION_RETENTION_AND_DELETION_POLICY
---

# Privacy / Minimal-Data Notice 공개 문구 초안

# 정정 채널 최소정보 안내

이 안내는 {{PUBLIC_HEALTH_BRAND_NAME}}의 비공개 사실·콘텐츠 정정 채널에 적용됩니다. 사이트 전체의 쿠키, 분석 또는 광고 데이터 처리는 실제 Production 구성을 반영한 별도 개인정보 처리방침에서 설명해야 합니다.

## 수집하는 정보

- page URL
- correction category
- correction description
- 답변을 요청한 경우에만 optional reply email

이름, 전화번호, 주소, 주민등록번호, 진단명, 검사값 또는 처방 정보를 요구하지 않습니다. 첨부 기능은 제공하지 않으며 의료기록, 처방전, 검사 이미지 또는 건강 문서를 받지 않습니다.

## 이용 목적과 접근

수집한 정보는 해당 페이지의 사실·콘텐츠 오류를 확인하고 필요한 경우 회신하기 위해서만 사용합니다. 접수 destination은 `{{CORRECTION_CHANNEL_DESTINATION}}`이며, `{{CORRECTION_CHANNEL_OPERATOR}}`와 승인된 최소 인원만 처리합니다. 제출 내용을 자동으로 공개 issue로 만들지 않습니다.

## 보관과 삭제

제출 내용과 optional reply email은 정정 건 처리에 필요한 최소 기간만 보관합니다. 실제 기간은 `{{CORRECTION_RETENTION_PERIOD}}`, 삭제·백업·로그 처리는 `{{CORRECTION_DELETION_AND_LOG_POLICY}}`로 Owner가 확정하고 실제 destination의 동작과 일치하는지 공개 전에 검증합니다.

## 보내면 안 되는 정보

이 채널은 의료상담, 진단, 약물 조언, 검사 결과 해석 또는 응급상담을 제공하지 않습니다. 개인의 증상이나 건강 문서를 보내지 마세요. 응급 상황이 의심되면 이 채널을 이용하지 말고 119 또는 가까운 응급실에 도움을 요청하세요.

destination과 operator가 실제 값으로 확정되고 데이터 흐름을 검증하기 전에는 이 안내와 정정 채널을 공개하지 않습니다.
