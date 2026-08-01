# Biz2Lab evidence content inventory — 2026-07-29

> PR #123 Phase 2의 원본 21개 공개 URL 판정입니다. `MOVE_TO_DRAFT`는 noindex만 추가한 것이 아니라 공개 인벤토리·sitemap·RSS·자료실에서 제외합니다.

| slug | original route | decision | destination | final risk | reason |
|---|---|---|---|---|---|
| separate-picking-inspection-loading-status | /ko/warehouse-logistics/separate-picking-inspection-loading-status | **KEEP_EVIDENCE_CASE** | - | LOW | WMS fixture 화면과 exact source commit으로 피킹·검수·상차 상태 경계를 검수 |
| ai-business-automation-guide | /ko/automation/ai-business-automation-guide | **KEEP_EVIDENCE_CASE** | - | LOW | 외부 업로드 승인 게이트 로컬 데모와 unsupported claim 경계 유지 |
| automation-priority-method | /ko/automation/automation-priority-method | **KEEP_EVIDENCE_CASE** | - | LOW | 성공·실패·안전 메시지·수동 확인을 읽을 수 있는 세로형 실행 로그 후보로 재캡처 |
| chatgpt-document-cleanup | /ko/automation/chatgpt-document-cleanup | **MOVE_TO_DRAFT** | - | REMOVED_FROM_PUBLIC | 직접 구현 증거보다 범용 문서 정리 템플릿 비중이 높아 공개 포트폴리오에서 제외 |
| google-sheets-ai-automation | /ko/automation/google-sheets-ai-automation | **MOVE_TO_DRAFT** | - | REMOVED_FROM_PUBLIC | Google Sheets 실제 연결 증거 없이 승인 로그 설명이 범용적이라 공개 보류 |
| obsidian-business-knowledge-base | /ko/automation/obsidian-business-knowledge-base | **MOVE_TO_DRAFT** | - | REMOVED_FROM_PUBLIC | 개인 지식관리 일반론보다 공개 가능한 고유 운영 증거가 부족해 공개 보류 |
| pre-automation-task-list | /ko/automation/pre-automation-task-list | **MOVE_TO_DRAFT** | - | REMOVED_FROM_PUBLIC | 체크리스트 골격의 반복 위험을 제거하고 후속 현장 기록 확보 전 공개하지 않음 |
| reduce-repetitive-work-with-ai | /ko/automation/reduce-repetitive-work-with-ai | **MOVE_TO_DRAFT** | - | REMOVED_FROM_PUBLIC | 시간 절감 실측 없이 범용 AI 효율 문구로 확대될 위험이 있어 공개 보류 |
| accounts-receivable-tracker | /ko/sales-ops/accounts-receivable-tracker | **DEEP_REWRITE** | - | LOW | 결제 상태·식별자 분리 경험과 자동 연락 제외 경계를 미수금 판정표에 연결 |
| daily-sales-goal-breakdown | /ko/sales-ops/daily-sales-goal-breakdown | **DEEP_REWRITE** | - | LOW | MyBiz 로컬 데모의 지표 원본 분리 경험과 계산 공식을 연결 |
| daily-sales-report | /ko/sales-ops/daily-sales-report | **DEEP_REWRITE** | - | LOW | 실행 로그의 실패·수동 확인 구조를 일일 보고 판정 순서로 연결 |
| payment-reminder-message | /ko/sales-ops/payment-reminder-message | **DEEP_REWRITE** | - | LOW | 외부 업로드 승인 게이트 경험을 메시지 초안·사실 확인·사람 발송 경계에 적용 |
| sales-achievement-rate | /ko/sales-ops/sales-achievement-rate | **DEEP_REWRITE** | - | LOW | 주문·예약·웨이팅·QR 지표를 섞지 않은 대시보드 구현 원칙을 달성률 원본 규칙에 적용 |
| sales-revenue-ar-structure | /ko/sales-ops/sales-revenue-ar-structure | **DEEP_REWRITE** | - | LOW | 주문·결제·웹훅·공급자 확인 증거를 구분한 코드 검토 원칙으로 연결표를 보강 |
| unify-order-channels-for-sales | /ko/sales-ops/unify-order-channels-for-sales | **CONSOLIDATE_AND_REDIRECT** | /ko/small-business/unify-order-channels | REMOVED_FROM_PUBLIC | 동일한 주문 원본·채널·보류 주제를 실제 WMS 증거가 있는 단일 글로 통합하고 308 redirect |
| ai-knowledge-store-for-small-business | /ko/small-business/ai-knowledge-store-for-small-business | **MOVE_TO_DRAFT** | - | REMOVED_FROM_PUBLIC | 고유 AI 지식 저장소 실행 증거가 없어 공개 보류 |
| customer-memory-system | /ko/small-business/customer-memory-system | **MOVE_TO_DRAFT** | - | REMOVED_FROM_PUBLIC | 고객 개인정보 운영 증거 없이 범용 양식으로 읽힐 위험이 있어 공개 보류 |
| daily-numbers-for-small-business | /ko/small-business/daily-numbers-for-small-business | **KEEP_EVIDENCE_CASE** | - | LOW | 로컬 데모 라벨과 서로 다른 4개 운영 지표가 한 경계에 보이는 후보로 재캡처 |
| reservation-order-review-management | /ko/small-business/reservation-order-review-management | **MOVE_TO_DRAFT** | - | REMOVED_FROM_PUBLIC | 예약·주문·리뷰 통합 운영의 직접 구현 증거가 부족해 공개 보류 |
| solo-business-systemization | /ko/small-business/solo-business-systemization | **MOVE_TO_DRAFT** | - | REMOVED_FROM_PUBLIC | 주간 통제표가 범용 템플릿 골격에 머물러 현장 기록 확보 전 공개 보류 |
| unify-order-channels | /ko/small-business/unify-order-channels | **KEEP_EVIDENCE_CASE** | - | LOW | 안전 fixture 원본 필드와 재고·한도 보류 패널을 두 개 후보로 분리해 WMS 구현 근거 강화 |

## 결과

- 원본 URL 판정: 21개
- 공개 유지: 11개
- draft 이동: 9개
- 통합·영구 redirect: 1개
- 미해결 HIGH risk: 0개
- 전자계약(CN_FOOD_Contract)과 지시사항(CN_ExeFlow)은 공개 안전 fixture가 없어 이번 증거 manifest에 추가하지 않음
