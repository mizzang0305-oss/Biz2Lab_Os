# Biz2Lab evidence review packet — 2026-07-29

> 자동 WebP decode·크기·overflow 검사는 사람의 모바일 가독성 판단을 대신하지 않습니다.
> 최종 재캡처 2개는 독립 검수 전까지 `candidate`이며 Production에는 포함되지 않습니다.

## 보호된 승인 증거

| evidence ID | path | source commit | SHA-256 | status | next human action |
|---|---|---|---|---|---|
| `commerce-run-audit-log` | `/images/evidence/automation-priority-method-evidence-01.webp` | `29ef9efbf46ebe8ef7d8137dd866516056092f4f` | `84285ba7cb777118e5cdabe1e69c8424e7e6063c793cf022f1fedab8ea6f1237` | **approved · read only** | none; integrity control only |
| `wms-order-source-workbench` | `/images/evidence/unify-order-channels-evidence-01.webp` | `6838b13b26610f576ece45e0f16886d522bb4c73` | `3adda0629180499127a879f0798e1496dac4a6ae8c0c306e5b0c1c0e99ff0a52` | **approved · read only** | none; integrity control only |
| `wms-order-hold-validation` | `/images/evidence/unify-order-channels-evidence-02.webp` | `6838b13b26610f576ece45e0f16886d522bb4c73` | `8a5684022dd2b304d2e4e729f4b224fd1837cdc985dee6dea21f2dd413a409ba` | **approved · read only** | none; integrity control only |
| `wms-picking-inspection-loading` | `/images/evidence/separate-picking-inspection-loading-status-evidence-01.webp` | `6838b13b26610f576ece45e0f16886d522bb4c73` | `f0d85e70e968f88322b4bea6472101e1a2ac905d541b784fe5a35c7a1ce20999` | **approved · read only** | none; integrity control only |
| `wms-loading-block-before-inspection` | `/images/evidence/separate-picking-inspection-loading-status-evidence-02.webp` | `6838b13b26610f576ece45e0f16886d522bb4c73` | `40dbf948089166181e37223c4d8f26bab782cc31a311e276250c22fd87ab29ff` | **approved · read only** | none; integrity control only |

## 최종 재캡처 후보

| evidence ID | source | original → new | data mode | capture selector | transformations | 350px decision | 390px decision | PII | status | next human action |
|---|---|---|---|---|---|---|---|---|---|---|
| `commerce-upload-approval-gate` | commerce-automation `29ef9efbf46ebe8ef7d8137dd866516056092f4f` | 1086×694 → 390×493 | local-demo | `main > div.space-y-5 > section:nth-of-type(3)` | 390px 세로형으로 기존 readiness 섹션을 재배치<br>첫 번째 차단 사유와 사람의 다음 조치를 행 전체로 표시<br>추가 차단 항목과 관련 없는 서버 env 안내 카드 제외<br>외곽 readiness 섹션의 하단 padding까지 전체 캡처해 카드 중간 잘림 방지<br>로컬 데모·외부 업로드 비활성화 disclosure 배너 추가<br>navigation·Next.js 개발 overlay 제외 | 자동 렌더 PASS · 사람 가독성 판단 필요 | 자동 렌더 PASS · 사람 가독성 판단 필요 | pass | **candidate** | APPROVE / REJECT / RECAPTURE |
| `mybiz-readonly-operations-dashboard` | mybizLab `267ea722ccedc881909cb8c543966cdfc82a495d` | 1000×618 → 390×831 | local-demo | `main[data-demo-dashboard='readonly'] > div` | 기존 매장명을 가상 데모 매장으로 치환<br>기존 운영 상태 문구를 로컬 데모·읽기 전용으로 치환<br>무료 시작·실제 매장 관리 홍보 문구를 저장되지 않는 가상 데이터 안내로 치환<br>첫 지표를 고객 기록으로 명확화<br>DOM의 데모 고객명을 샘플 고객 A·B·C로 치환<br>390px 세로형으로 기존 4개 지표 카드를 재배치<br>fixture 수치의 변화율·성과성 보조 문구 제외<br>로컬 데모·가상 데이터·읽기 전용 disclosure 배너 추가<br>고객명·메모·차트·매출·예측 영역 제외<br>기존 count-up 애니메이션 종료 후 캡처 | 자동 렌더 PASS · 사람 가독성 판단 필요 | 자동 렌더 PASS · 사람 가독성 판단 필요 | pass | **candidate** | APPROVE / REJECT / RECAPTURE |

## Production 격리와 test fixture 제거

- `production-approved-test-fixture`는 manifest와 approved asset에서 제거했습니다.
- Production 200 control은 보호된 실제 승인 증거 5개입니다.
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

## Final two recapture — human review pending

Automated QA does not replace independent human approval.

| evidence ID | old → new | source / route | capture selector | visible disclosure | transformations | PII | SHA-256 | 350px | 390px | supported claim | unsupported claim | status | decision required |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `commerce-upload-approval-gate` | 390×492 → 390×493 | commerce-automation `29ef9efbf46ebe8ef7d8137dd866516056092f4f` / `/uploads` | `main > div.space-y-5 > section:nth-of-type(3)` | 로컬 데모 · 가상 readiness 데이터 · 외부 업로드 비활성화 | 390px 세로형으로 기존 readiness 섹션을 재배치<br>첫 번째 차단 사유와 사람의 다음 조치를 행 전체로 표시<br>추가 차단 항목과 관련 없는 서버 env 안내 카드 제외<br>외곽 readiness 섹션의 하단 padding까지 전체 캡처해 카드 중간 잘림 방지<br>로컬 데모·외부 업로드 비활성화 disclosure 배너 추가<br>navigation·Next.js 개발 overlay 제외 | pass | `f1f2bdfe272fbfa054aaeb77905b388fcb232087606ffa090c52e3960772f0fb` | 자동 렌더 PASS · 직접 확인 가능 · 독립 승인 필요 | 자동 렌더 PASS · 직접 확인 가능 · 독립 승인 필요 | 승인 문구와 준비 조건이 충족되기 전 외부 업로드를 차단하는 UI 경계 | 실제 플랫폼 업로드 성공, 매출 또는 운영시간 절감 | **candidate** | APPROVE / REJECT / RECAPTURE |
| `mybiz-readonly-operations-dashboard` | 390×811 → 390×831 | mybizLab `267ea722ccedc881909cb8c543966cdfc82a495d` / `/demo/dashboard` | `main[data-demo-dashboard='readonly'] > div` | 로컬 데모 · 가상 데이터 · 읽기 전용 | 기존 매장명을 가상 데모 매장으로 치환<br>기존 운영 상태 문구를 로컬 데모·읽기 전용으로 치환<br>무료 시작·실제 매장 관리 홍보 문구를 저장되지 않는 가상 데이터 안내로 치환<br>첫 지표를 고객 기록으로 명확화<br>DOM의 데모 고객명을 샘플 고객 A·B·C로 치환<br>390px 세로형으로 기존 4개 지표 카드를 재배치<br>fixture 수치의 변화율·성과성 보조 문구 제외<br>로컬 데모·가상 데이터·읽기 전용 disclosure 배너 추가<br>고객명·메모·차트·매출·예측 영역 제외<br>기존 count-up 애니메이션 종료 후 캡처 | pass | `6ebeaa03f68bd1441e3ad06eacdb9eeb2a4b3fcbf5080fe10a9a61bd455bd6eb` | 자동 렌더 PASS · 직접 확인 가능 · 독립 승인 필요 | 자동 렌더 PASS · 직접 확인 가능 · 독립 승인 필요 | 고객 기록·예약·웨이팅·주문을 서로 다른 운영 지표로 표시하는 읽기 전용 화면 | 실제 고객 수, 재방문율, 매출 또는 AI 예측 정확도 | **candidate** | APPROVE / REJECT / RECAPTURE |

No recaptured candidate was auto-approved.
