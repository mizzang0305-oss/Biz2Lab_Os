# Biz2Lab evidence review packet — 2026-07-29

> 자동 WebP decode·크기·overflow 검사는 사람의 모바일 가독성 판단을 대신하지 않습니다.
> 모든 재캡처 이미지는 독립 검수 전까지 `candidate`이며 Production에는 포함되지 않습니다.

## 보호된 승인 증거

| evidence ID | path | source commit | SHA-256 | status | next human action |
|---|---|---|---|---|---|
| `commerce-run-audit-log` | `/images/evidence/automation-priority-method-evidence-01.webp` | `29ef9efbf46ebe8ef7d8137dd866516056092f4f` | `84285ba7cb777118e5cdabe1e69c8424e7e6063c793cf022f1fedab8ea6f1237` | **approved · read only** | none; integrity control only |
| `wms-order-source-workbench` | `/images/evidence/unify-order-channels-evidence-01.webp` | `6838b13b26610f576ece45e0f16886d522bb4c73` | `3adda0629180499127a879f0798e1496dac4a6ae8c0c306e5b0c1c0e99ff0a52` | **approved · read only** | none; integrity control only |

## 재캡처 후보

| evidence ID | source | original → new | data mode | capture selector | transformations | 350px decision | 390px decision | PII | status | next human action |
|---|---|---|---|---|---|---|---|---|---|---|
| `commerce-upload-approval-gate` | commerce-automation `29ef9efbf46ebe8ef7d8137dd866516056092f4f` | 1086×694 → 390×492 | local-demo | `main > div.space-y-5 > section:nth-of-type(3)` | 390px 세로형으로 기존 readiness 섹션을 재배치<br>기존 차단 사유 패널까지만 집중 캡처<br>로컬 데모·외부 업로드 비활성화 disclosure 배너 추가<br>navigation·Next.js 개발 overlay 제외 | 자동 렌더 PASS · 사람 가독성 판단 필요 | 자동 렌더 PASS · 사람 가독성 판단 필요 | pass | **candidate** | APPROVE / REJECT / RECAPTURE |
| `wms-order-hold-validation` | CN_WMS `6838b13b26610f576ece45e0f16886d522bb4c73` | 890×519 → 390×677 | fixture | `section.screen.v262-page > div.v262-grid-two > section:nth-child(2)` | 390px 세로형으로 기존 검증 패널을 재배치<br>fixture disclosure 배너 추가<br>주문 입력·상품·수량·가격 영역 제외 | 자동 렌더 PASS · 사람 가독성 판단 필요 | 자동 렌더 PASS · 사람 가독성 판단 필요 | pass | **candidate** | APPROVE / REJECT / RECAPTURE |
| `wms-picking-inspection-loading` | CN_WMS `6838b13b26610f576ece45e0f16886d522bb4c73` | 1142×886 → 390×1127 | fixture | `section.screen.v262-page` | 390px 세로형으로 기존 작업 lane을 재배치<br>fixture disclosure 배너 추가<br>재고 차이·품목·수량·담당자 영역 제외 | 자동 렌더 PASS · 사람 가독성 판단 필요 | 자동 렌더 PASS · 사람 가독성 판단 필요 | pass | **candidate** | APPROVE / REJECT / RECAPTURE |
| `wms-loading-block-before-inspection` | CN_WMS `6838b13b26610f576ece45e0f16886d522bb4c73` | 1142×886 split source → 390×245 | fixture | `article.v262-blocking-alert` | 기존 검수 전 상차 차단 alert만 390px로 집중 캡처<br>fixture disclosure 배너 추가<br>창고·직원·차량·상품·수량·시각 영역 제외 | 자동 렌더 PASS · 사람 가독성 판단 필요 | 자동 렌더 PASS · 사람 가독성 판단 필요 | pass | **candidate** | APPROVE / REJECT / RECAPTURE |
| `mybiz-readonly-operations-dashboard` | mybizLab `267ea722ccedc881909cb8c543966cdfc82a495d` | 1000×618 → 390×811 | local-demo | `main[data-demo-dashboard='readonly'] > div` | 기존 매장명을 가상 데모 매장으로 치환<br>기존 운영 상태 문구를 로컬 데모·읽기 전용으로 치환<br>DOM의 데모 고객명을 샘플 고객 A·B·C로 치환<br>390px 세로형으로 기존 4개 지표 카드를 재배치<br>fixture 수치의 변화율·성과성 보조 문구 제외<br>로컬 데모·가상 데이터·읽기 전용 disclosure 배너 추가<br>고객명·메모·차트·매출·예측 영역 제외<br>기존 count-up 애니메이션 종료 후 캡처 | 자동 렌더 PASS · 사람 가독성 판단 필요 | 자동 렌더 PASS · 사람 가독성 판단 필요 | pass | **candidate** | APPROVE / REJECT / RECAPTURE |

## Production 격리와 test fixture 제거

- `production-approved-test-fixture`는 manifest와 approved asset에서 제거했습니다.
- Production 200 control은 `commerce-run-audit-log`, `wms-order-source-workbench` 두 실제 승인 증거입니다.
- 모든 candidate URL, 제거된 fixture URL과 `/ko/ops/evidence-review`는 Production에서 404여야 합니다.
- Preview는 승인 증거와 candidate를 함께 staging하지만 승인 상태를 변경하지 않습니다.

## 승인 명령 dry-run

각 후보에 다음 형식의 명령을 `--apply` 없이 실행합니다.

```powershell
npm run evidence:approve -- --id <evidence-id> --reviewer pending-independent-review
```

필수 결과는 `DRY_RUN_ONLY`, manifest/image byte stability, git 무변경입니다.

## 차단 상태 유지

- CN_FOOD_Contract: 개인정보·계약·결제와 분리된 공개 fixture 부재
- CN_ExeFlow: 실제 지시사항과 분리된 공개 fixture 부재

No recaptured candidate was auto-approved.


## 2026-07-31 위임 최종 시각 검수

- 검수자: `owner-delegated-gpt-5.6-thinking-final-visual-review`
- 위임 근거: 저장소 소유자가 바쁜 상황에서 후보 증거의 최종 검수와 안전한 승인 반영을 요청함
- 검수 시각: `2026-07-31 19:23 KST`
- 검수 대상: exact PR recapture 후보 원본 5개와 350px 모바일 렌더링
- 방법: 원본 이미지를 직접 확대하고 350px에서 핵심 문구, fixture 표시, 식별자, 잘림, 주장 일치를 비교함
- 자동 OCR 사용: 없음
- Production, AdSense, Search Console 변경: 없음

| evidence ID | 결정 | 최종 판단 |
|---|---|---|
| `wms-order-hold-validation` | **APPROVED** | `stock_hold`, `credit_hold`, `pending_review`가 350px에서 직접 읽히며 합성 fixture 표시와 미검증 범위가 명확함 |
| `wms-picking-inspection-loading` | **APPROVED** | 피킹·검수·상차·차이 확인 상태가 세로로 분리되고 검수 전 loading 차단 문구가 모바일에서 읽힘 |
| `wms-loading-block-before-inspection` | **APPROVED** | 검수 미완료 시 상차 완료 차단이라는 단일 주장만 집중적으로 표시하며 실제 운영 성과를 주장하지 않음 |
| `commerce-upload-approval-gate` | **RECAPTURE** | 핵심 차단 상태는 읽히지만 이미지 하단이 두 번째 준비 항목 중간에서 잘려 완결된 증거 화면이 아님. 논리적 카드 경계에서 다시 촬영해야 함 |
| `mybiz-readonly-operations-dashboard` | **RECAPTURE** | 지표 분리는 읽히지만 `무료로 시작하면 실제 매장을 관리할 수 있습니다` 문구는 이번 증거 범위에서 검증되지 않은 홍보성 주장임. 읽기 전용 가상 데이터 안내로 교체해야 함 |

### 재촬영 완료 조건

1. `commerce-upload-approval-gate`: 두 번째 준비 항목을 완전히 포함하거나 첫 번째 항목 종료 지점에서 정확히 잘라 이미지가 카드 중간에서 끝나지 않게 합니다.
2. `mybiz-readonly-operations-dashboard`: 무료 시작·실제 매장 관리 문구를 제거하고 `이 화면은 저장되지 않는 읽기 전용 가상 데이터입니다`처럼 검증 가능한 안내만 표시합니다.
3. 두 후보는 재촬영 뒤에도 자동 승인하지 않고 PII·SHA·350px 가독성 검사를 다시 거칩니다.
