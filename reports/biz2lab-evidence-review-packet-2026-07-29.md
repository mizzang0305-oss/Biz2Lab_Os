# Biz2Lab evidence review packet — 2026-07-29

> 자동 검사 통과는 공개 승인이 아닙니다. 후보는 원본 이미지와 350px 모바일 렌더링을 독립적으로 확인한 뒤에만 승인합니다.
> GitHub 공개 PR branch와 commit은 비공개 저장소가 아닙니다. 후보 바이너리를 `public/` 밖에 두는 조치는 URL 직접 노출을 막지만 저장소 읽기 권한 자체를 제한하지 않습니다.

## 위임 검수 결과

- 검수자: `owner-delegated-gpt-5.6-pro-visual-review`
- 위임 근거: 저장소 소유자가 PR #123 후보 검수를 직접 처리하도록 요청함
- 검수 시각: `2026-07-29 03:27 KST`
- 방법: GitHub Actions의 1일 보존 artifact로 exact PR 후보 6개와 SHA 목록을 내려받아 원본 및 350px 렌더링을 직접 비교함
- 자동 OCR 사용: 없음
- Production, AdSense, Search Console 변경: 없음

| evidence ID | 원본 크기 | 모바일 판정 | 결정 | 근거 / 후속 조치 |
|---|---:|---|---|---|
| `commerce-run-audit-log` | 390×529 | 읽기 가능 | **APPROVED** | 실패·성공 상태, 안전 메시지, mock queue 설명이 세로 구조에서 명확하며 실서비스 성과를 주장하지 않음 |
| `wms-order-source-workbench` | 543×519 | 읽기 가능 | **APPROVED** | `검수용 샘플 거래처`, `FIXTURE-ORDER-001`, 전화 채널이 명확하고 실제 거래처·운영 식별자가 없음 |
| `commerce-upload-approval-gate` | 1086×694 | 읽기 어려움 | **RECAPTURE** | 350px에서 두 열의 차단 사유와 환경 상태 글자가 지나치게 작음. 차단 사유와 안전 상태를 세로형 1~2장으로 분리할 것 |
| `wms-order-hold-validation` | 890×519 | 읽기 어려움 | **RECAPTURE** | 데스크톱 목록을 축소하면 `stock_hold`, `credit_hold`, `pending_review` 핵심 라벨이 작음. 390px 세로 검증 카드로 다시 촬영할 것 |
| `wms-picking-inspection-loading` | 1142×886 | 읽기 어려움 | **RECAPTURE** | 전체 운영 흐름을 한 장에 담아 모바일에서 상태·차이 항목·차단 문구를 읽기 어려움. 상태 전환과 검수 전 상차 차단을 각각 집중 촬영할 것 |
| `mybiz-readonly-operations-dashboard` | 1000×618 | 일부 숫자만 읽힘 | **RECAPTURE** | 카드 제목·보조 설명이 작고 `서울 단골 커피`가 실제 매장명처럼 보일 수 있음. `가상 데모 매장`으로 교체하고 390px 모바일 레이아웃으로 촬영할 것 |

## 현재 manifest 상태

| evidence ID | post | data mode | PII scan | status |
|---|---|---|---|---|
| `commerce-run-audit-log` | `automation-priority-method` | fixture | pass | **approved** |
| `wms-order-source-workbench` | `unify-order-channels` | fixture | pass | **approved** |
| `commerce-upload-approval-gate` | `ai-business-automation-guide` | local-demo | pass | candidate — recapture required |
| `wms-order-hold-validation` | `unify-order-channels` | fixture | pass | candidate — recapture required |
| `wms-picking-inspection-loading` | `separate-picking-inspection-loading-status` | fixture | pass | candidate — recapture required |
| `mybiz-readonly-operations-dashboard` | `daily-numbers-for-small-business` | local-demo | pass | candidate — recapture required |
| `production-approved-test-fixture` | test only | fixture | pass | approved test-only — 콘텐츠 증거로 사용 금지 |

## 승인 명령

```powershell
npm run evidence:approve -- --id <evidence-id> --reviewer <reviewer-id>
```

기본 명령은 현재 이미지 SHA와 source commit, PII scan을 다시 확인하고 diff 및 `DRY_RUN_ONLY`만 출력합니다. 실제 로컬 반영은 검토 후 같은 명령 끝에 `--apply`를 명시해야 하며 git, push, deploy는 수행하지 않습니다.

## 재촬영 완료 조건

1. 350~390px 본문 폭에서 핵심 문구를 원본 열기 없이 읽을 수 있어야 합니다.
2. UI 안에서 `fixture`, `로컬 데모`, `가상 데이터` 중 하나가 직접 보이도록 합니다.
3. 실제처럼 보이는 상호·거래처·식별자는 `샘플 매장 A`, `샘플 거래처 A`, `FIXTURE-*`로 교체합니다.
4. 한 이미지에는 한 가지 주장만 담고, 화면 밖 캡션의 설명에 의존하지 않습니다.
5. 재촬영 후 PII·secret·절대경로 검사와 SHA 검증을 다시 실행합니다.

## 이번 단계에서 차단한 프로젝트

- CN_FOOD_Contract: 전자계약·결제 화면은 안전한 전용 fixture와 개인정보 비포함 캡처 경계가 없어 manifest에 추가하지 않았습니다.
- CN_ExeFlow: 실제 지시사항 데이터와 분리된 공개 전용 fixture가 없어 manifest에 추가하지 않았습니다.
