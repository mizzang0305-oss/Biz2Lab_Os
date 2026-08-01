# Biz2Lab evidence content inventory — 2026-07-28

> 이 보고서는 URL 삭제나 noindex 적용을 실행하지 않습니다. 5개 대표 사례만 이번 PR에서 깊게 재작성했고 나머지는 제안 상태입니다.

| slug | title | route | currentType | actualExperience | sourceProject | screenshotPossible | uniqueValue | templateRisk | recommendedAction | reason |
|---|---|---|---|---|---|---|---|---|---|---|
| separate-picking-inspection-loading-status | 피킹·검수·상차를 하나의 완료 상태로 묶지 않은 이유 | /ko/warehouse-logistics/separate-picking-inspection-loading-status | case-study | YES — 실행 화면·commit 연결 | 식자재 유통 WMS | YES — candidate 확보 | 피킹·검수·상차를 별도 상태로 두고 검수 전 상차 완료를 차단하는 설계 | LOW | **KEEP** | 안전한 local demo/fixture와 exact source commit을 자동 캡처함 |
| ai-business-automation-guide | AI 자동 게시를 막고 사람 승인 뒤에만 실행되게 만든 이유 | /ko/automation/ai-business-automation-guide | case-study | YES — 실행 화면·commit 연결 | 승인형 콘텐츠 자동화 제어 시스템 | YES — candidate 확보 | 승인 문구와 준비 조건이 충족되기 전 외부 업로드를 차단하는 UI 경계 | MEDIUM — FAQ 반복 | **KEEP** | 안전한 local demo/fixture와 exact source commit을 자동 캡처함 |
| automation-priority-method | 자동화 기능보다 실행·실패 로그를 먼저 만든 이유 | /ko/automation/automation-priority-method | case-study | YES — 실행 화면·commit 연결 | 승인형 콘텐츠 자동화 제어 시스템 | YES — candidate 확보 | 자동화 작업의 실행 결과와 실패 상태를 별도 로그로 남기는 화면 구조 | LOW | **KEEP** | 안전한 local demo/fixture와 exact source commit을 자동 캡처함 |
| chatgpt-document-cleanup | ChatGPT 문서 정리: 원문을 지키면서 회의·상담 메모를 구조화하는 법 | /ko/automation/chatgpt-document-cleanup | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| google-sheets-ai-automation | Google Sheets 자동화: 승인 열과 실행 로그로 안전하게 연결하기 | /ko/automation/google-sheets-ai-automation | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **NOINDEX_CANDIDATE** | 일반 도구 설명보다 현장 구축 사례와의 직접 연결을 먼저 보강해야 함 |
| obsidian-business-knowledge-base | 옵시디언 업무 지식창고: 기준·결정·폐기 기록을 다시 찾는 구조 | /ko/automation/obsidian-business-knowledge-base | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| pre-automation-task-list | 자동화 전 업무 목록 만들기: 5일 관찰로 입력·예외·완료조건 찾기 | /ko/automation/pre-automation-task-list | checklist | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **NOINDEX_CANDIDATE** | 일반 도구 설명보다 현장 구축 사례와의 직접 연결을 먼저 보강해야 함 |
| reduce-repetitive-work-with-ai | 반복 업무 줄이기: 시간기록으로 규칙 자동화와 AI 초안을 구분하는 법 | /ko/automation/reduce-repetitive-work-with-ai | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **NOINDEX_CANDIDATE** | 일반 도구 설명보다 현장 구축 사례와의 직접 연결을 먼저 보강해야 함 |
| accounts-receivable-tracker | 미수금 관리표: 약속일·경과일·분쟁 여부로 회수 순서 정하기 | /ko/sales-ops/accounts-receivable-tracker | checklist | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| daily-sales-goal-breakdown | 일일 매출 목표 계산: 월 부족액을 남은 영업일과 주문수로 나누기 | /ko/sales-ops/daily-sales-goal-breakdown | pillar | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| daily-sales-report | 영업팀 일일 보고서: 실적·원인·내일 첫 행동을 한 페이지에 쓰기 | /ko/sales-ops/daily-sales-report | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| payment-reminder-message | 거래처 입금 확인 메시지: 독촉 전에 사실을 확인하는 3단계 문구 | /ko/sales-ops/payment-reminder-message | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| sales-achievement-rate | 매출 달성률 계산: 반품·부족금액·하루 필요실적까지 보는 방법 | /ko/sales-ops/sales-achievement-rate | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| sales-revenue-ar-structure | 주문·매출·청구·입금 연결표: 미수금이 생긴 지점 찾기 | /ko/sales-ops/sales-revenue-ar-structure | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| unify-order-channels-for-sales | 거래처 주문 등록표: 이메일·메신저·전화를 한 번호로 묶는 방법 | /ko/sales-ops/unify-order-channels-for-sales | case-study | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| ai-knowledge-store-for-small-business | 소상공인 AI 지식 원본 관리: 답변 전에 출처와 사용기한 붙이기 | /ko/small-business/ai-knowledge-store-for-small-business | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| customer-memory-system | 고객 응대 기록: 선호보다 약속과 다음 연락일을 남기는 최소 양식 | /ko/small-business/customer-memory-system | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| daily-numbers-for-small-business | 주문·예약·웨이팅을 같은 숫자로 보지 않도록 분리한 운영 대시보드 | /ko/small-business/daily-numbers-for-small-business | case-study | YES — 실행 화면·commit 연결 | 매장 운영 SaaS | YES — candidate 확보 | 고객 기록·예약·웨이팅·주문을 서로 다른 운영 지표로 표시하는 읽기 전용 화면 | LOW | **KEEP** | 안전한 local demo/fixture와 exact source commit을 자동 캡처함 |
| reservation-order-review-management | 예약·주문·리뷰 통합 보드: 고객 약속을 상태로 이어서 관리하기 | /ko/small-business/reservation-order-review-management | how-to | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| solo-business-systemization | 1인 사업자 주간 운영표: 매출·주문·입금·고객 후속을 한 번에 점검하기 | /ko/small-business/solo-business-systemization | checklist | PARTIAL — 글별 검증 메모 | 직접 연결된 화면 없음 | 미확인 | 현재 글의 계산·절차 설명. 고유 현장 화면은 아직 없음 | HIGH — FAQ·다운로드 반복 | **DEEP_REWRITE** | URL은 유지하고 실제 화면·실패·검증 경계를 추가할 후보 |
| unify-order-channels | 전화·메시지·포털 주문 원본을 지우지 않고 한 작업대로 모은 방법 | /ko/small-business/unify-order-channels | case-study | YES — 실행 화면·commit 연결 | 식자재 유통 WMS | YES — candidate 확보 | 주문 원본 종류와 재고·한도 검증 상태를 별도 필드로 유지하는 작업대 | MEDIUM — FAQ 반복 | **KEEP** | 안전한 local demo/fixture와 exact source commit을 자동 캡처함 |

## 이번 적용 범위

- 공개 글 인벤토리: 21개
- 화면·commit 연결 대표 사례: 5개
- 제안만 기록한 글: 16개
- 대량 삭제·archive·noindex 변경: 0개
