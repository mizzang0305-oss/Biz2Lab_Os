# Biz2Lab evidence review packet — 2026-07-29

> 자동 검사 통과는 공개 승인이 아닙니다. 모든 새 이미지는 사람이 확인하기 전까지 `candidate`입니다.
> GitHub 공개 PR branch와 commit은 비공개 저장소가 아닙니다. 후보 바이너리를 `public/` 밖에 두는 조치는 URL 직접 노출을 막지만 저장소 읽기 권한 자체를 제한하지 않습니다.

| evidence ID | post | project | source commit | screenshot | data mode | masked | PII scan | claim supported | claim not supported | status | reviewer action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| commerce-upload-approval-gate | ai-business-automation-guide | 승인형 콘텐츠 자동화 제어 시스템 | `29ef9efbf46ebe8ef7d8137dd866516056092f4f` | `/images/evidence/ai-business-automation-guide-evidence-01.webp` | local-demo | none | pass | 승인 문구와 준비 조건이 충족되기 전 외부 업로드를 차단하는 UI 경계 | 실제 플랫폼 업로드 성공, 매출 또는 운영시간 절감 | **candidate** | APPROVE / REJECT / RECAPTURE |
| commerce-run-audit-log | automation-priority-method | 승인형 콘텐츠 자동화 제어 시스템 | `29ef9efbf46ebe8ef7d8137dd866516056092f4f` | `/images/evidence/automation-priority-method-evidence-01.webp` | fixture | none | pass | 자동화 작업의 실행 결과와 실패 상태를 별도 로그로 남기는 화면 구조 | 운영 환경의 장기 보존, 장애 복구 시간 또는 외부 서비스 처리 결과 | **candidate** | APPROVE / REJECT / RECAPTURE |
| wms-order-source-workbench | unify-order-channels | 식자재 유통 WMS | `6838b13b26610f576ece45e0f16886d522bb4c73` | `/images/evidence/unify-order-channels-evidence-01.webp` | fixture | none | pass | 주문 원본 종류와 재고·한도 검증 상태를 별도 필드로 유지하는 작업대 | 실제 거래처 주문 누락 감소율, 실재고 또는 거래처별 가격 | **candidate** | APPROVE / REJECT / RECAPTURE |
| wms-order-hold-validation | unify-order-channels | 식자재 유통 WMS | `6838b13b26610f576ece45e0f16886d522bb4c73` | `/images/evidence/unify-order-channels-evidence-02.webp` | fixture | none | pass | 주문 제출 전에 재고 보류와 한도 보류를 별도 상태로 표시하는 검증 패널 | 실재고 정확도, 실제 여신 한도 또는 주문 승인 결과 | **candidate** | APPROVE / REJECT / RECAPTURE |
| wms-picking-inspection-loading | separate-picking-inspection-loading-status | 식자재 유통 WMS | `6838b13b26610f576ece45e0f16886d522bb4c73` | `/images/evidence/separate-picking-inspection-loading-status-evidence-01.webp` | fixture | none | pass | 피킹·검수·상차를 별도 상태로 두고 검수 전 상차 완료를 차단하는 설계 | 실제 물류 처리시간, 오배송 감소율 또는 운영 DB의 출고 상태 | **candidate** | APPROVE / REJECT / RECAPTURE |
| mybiz-readonly-operations-dashboard | daily-numbers-for-small-business | 매장 운영 SaaS | `267ea722ccedc881909cb8c543966cdfc82a495d` | `/images/evidence/daily-numbers-for-small-business-evidence-01.webp` | local-demo | none | pass | 고객 기록·예약·웨이팅·주문을 서로 다른 운영 지표로 표시하는 읽기 전용 화면 | 실제 고객 수, 재방문율, 매출 또는 AI 예측 정확도 | **candidate** | APPROVE / REJECT / RECAPTURE |

## 승인 명령

```powershell
npm run evidence:approve -- --id <evidence-id> --reviewer <reviewer-id>
```

기본 명령은 현재 이미지 SHA와 source commit, PII scan을 다시 확인하고 diff 및 `DRY_RUN_ONLY`만 출력합니다. 실제 로컬 반영은 사람이 검토한 뒤 같은 명령 끝에 `--apply`를 명시해야 하며 git, push, deploy는 수행하지 않습니다.

## 이번 단계에서 차단한 프로젝트

- CN_FOOD_Contract: 전자계약·결제 화면은 안전한 전용 fixture와 개인정보 비포함 캡처 경계가 없어 manifest에 추가하지 않았습니다.
- CN_ExeFlow: 실제 지시사항 데이터와 분리된 공개 전용 fixture가 없어 manifest에 추가하지 않았습니다.
