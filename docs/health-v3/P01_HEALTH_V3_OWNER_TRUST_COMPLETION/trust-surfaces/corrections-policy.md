---
surface: corrections-policy
status: DRAFT_NOT_PUBLISHED
selected_destination: health@biz2lab.com
activation_status: PENDING_ACTIVATION
owner_tokens: [PUBLIC_HEALTH_BRAND_NAME, CORRECTION_CHANNEL_DESTINATION, CORRECTION_CHANNEL_OPERATOR]
---

# 정정 정책

{{PUBLIC_HEALTH_BRAND_NAME}}는 사실 오류, 출처 연결 오류, 오해를 부르는 표현과 콘텐츠 표시 오류를 정정하기 위한 비공개 채널을 운영합니다.

정정 요청은 page URL, correction category, correction description, 답변을 원하는 경우 optional reply email만 받습니다.

- 접수 destination: `{{CORRECTION_CHANNEL_DESTINATION}}`
- 처리 operator: `{{CORRECTION_CHANNEL_OPERATOR}}`
- attachments: disabled
- automatic public issue: prohibited

Owner 선택값은 `health@biz2lab.com`이지만 실제 생성·수신 테스트가 끝날 때까지 destination token을 교체하거나 활성 채널로 공개하지 않습니다.

의료기록, 처방전, 검사 이미지, 건강 문서 또는 개인의 상세 증상·검사값을 보내지 마세요. 이 채널은 의료상담, 진단, 약물·용량 조언, 검사 결과 해석 또는 응급상담을 제공하지 않습니다. 응급 상황이 의심되면 답변을 기다리지 말고 119 또는 가까운 응급실에 도움을 요청하세요.

담당자는 정정 영향을 분류하고 의료 의미에 영향을 주는 경우 source re-check와 필요한 licensed medical re-review를 진행합니다. 제출 내용과 optional reply email의 보관·삭제 기준은 Owner가 승인한 최소정보 정책을 따릅니다.

보관·삭제 정책: `PENDING_OWNER_POLICY`

destination과 operator가 실제 값으로 확정되고 보관·삭제·접근 제어가 실제 시스템에서 검증되기 전에는 공개하지 않습니다.
