# FLAGSHIP 증거 보강 결정

- 결정일: 2026-08-06
- 대상 PR: #124
- 원칙: 기존 공개 URL만 보강하며 실제 운영 성과를 만들지 않는다.

## 기준선 불일치

기준선 inventory의 FLAGSHIP 6개에는 이미 `/ko/sales-ops/accounts-receivable-tracker`가 포함돼 있었다. 그러나 해당 행의 최종 권고는 `HUMAN_EVIDENCE_REQUIRED_BEFORE_FLAGSHIP_PROMOTION`이었다. 따라서 이번에 미수금 페이지와 두 번째 페이지를 보강해도 새로 늘어나는 독립 FLAGSHIP URL은 한 개뿐이다.

- 보강 전 inventory 분류: FLAGSHIP 6
- 이번에 증거 패키지를 완성한 페이지: 2
- 중복을 제거한 보강 후 FLAGSHIP: 7
- 8개 기준까지 필요한 독립 페이지: 1

숫자를 맞추기 위해 같은 페이지를 두 번 세거나 증거가 없는 글을 승격하지 않는다.

## 선정 결과

### 1. 미수금 관리표

- URL: `/ko/sales-ops/accounts-receivable-tracker`
- 기존 코드 연결: `lib/operational-evidence.ts`
- 입력: `data/evidence-fixtures/accounts-receivable.json`
- 출력: `public/downloads/accounts-receivable-aging.csv`
- 자동 검증: `tests/operational-evidence.test.ts`
- 화면 증거: `accounts-receivable-deterministic-fixture.webp`
- 선정 이유: 연체일, aging, 한도 노출, 분쟁 건 자동 순위 제외를 고정 입력으로 재현할 수 있다.

### 2. 주문·매출·청구·입금 연결표

- URL: `/ko/sales-ops/sales-revenue-ar-structure`
- 기존 주제 연결: 공개 sales-ops 글과 기존 CSV 구조
- 입력: `data/evidence-fixtures/cash-conversion.json`
- 출력: `public/downloads/cash-conversion-bridge.csv`
- 자동 검증: `tests/operational-evidence.test.ts`
- 화면 증거: `cash-conversion-deterministic-fixture.webp`
- 선정 이유: 주문, 매출, 청구, 입금을 분리하고 정체 단계를 고정 입력으로 다시 계산할 수 있다.

## 점수

각 항목은 0~5점이다. 실제 운영 성과가 아니라 공개 artifact의 고유성과 재현성을 평가했다.

| 페이지 | Topic fit | Originality | Evidence | Reproducibility | Actionability | Trust | UX | Index readiness | 합계 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 미수금 관리표 | 5 | 5 | 5 | 5 | 5 | 5 | 4 | 5 | 39/40 |
| 주문·매출·청구·입금 연결표 | 5 | 5 | 5 | 5 | 5 | 5 | 4 | 5 | 39/40 |

두 페이지 모두 Evidence와 Reproducibility가 3점 이상이다. 이 평가는 AdSense 승인 예측이 아니다.

## 제외 판단

- `sales-achievement-rate`, 일일 영업 보고: 현재 inventory상 SUPPORTING이므로 이번 EXPAND 후보 자동 선정 범위에서 제외했다.
- 일반 자동화 EXPAND 5개: 독립 fixture와 실행 결과가 부족하다.
- 전자계약·본인확인·결제 관련 EXPAND 5개: 안전한 공개 증거가 없고 민감정보 위험이 높다.
- 소상공인 운영 EXPAND 4개: 실제 입력·출력 연결 또는 개인정보 제거 증거가 부족하다.

## 판정

두 선택 페이지의 증거 계약은 충족했다. 그러나 독립 FLAGSHIP 8개 조건은 충족하지 않았으므로 `PARTIAL_INSUFFICIENT_EVIDENCE`를 유지한다.
