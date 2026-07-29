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
