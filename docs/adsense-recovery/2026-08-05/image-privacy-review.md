# 증거 이미지 개인정보 검토

- 검토일: 2026-08-06
- 검토 방법: 원본 픽셀 수동 확인, manifest의 SHA-256·fixture 표시·미지원 주장 대조
- OCR: 로컬 OCR 도구가 없어 자동 OCR은 수행하지 못했다. OCR 미수행을 자동 통과로 해석하지 않는다.
- 범위: 보강 후 독립 FLAGSHIP 7개의 hero 7개와 승인 증거 9개, 총 16개

## 상태 요약

- `PASS_PUBLIC_SAFE`: 7
- `PASS_SYNTHETIC_FIXTURE`: 9
- `NEEDS_MASKING`: 0
- `DO_NOT_PUBLISH`: 0
- `HUMAN_CONFIRMATION_REQUIRED`: 0

## Hero 이미지

| 페이지 | 이미지 | 상태 | 확인 결과 |
| --- | --- | --- | --- |
| AI 업무 자동화 가이드 | `ai-business-automation-guide-hero.webp` | PASS_PUBLIC_SAFE | 추상 업무 카드, 식별정보 없음 |
| 자동화 우선순위 | `automation-priority-method-hero.webp` | PASS_PUBLIC_SAFE | B2B 흐름 구조도, 식별정보 없음 |
| 미수금 관리표 | `accounts-receivable-tracker-hero.webp` | PASS_PUBLIC_SAFE | 일반화된 상태판, 읽을 수 있는 실데이터 없음 |
| 매출·미수금 구조 | `sales-revenue-ar-structure-hero.webp` | PASS_PUBLIC_SAFE | 매출·청구·입금 상태 도식, 식별정보 없음 |
| 일일 숫자 | `daily-numbers-for-small-business-hero.webp` | PASS_PUBLIC_SAFE | 추상 지표 카드, 식별정보 없음 |
| 주문 채널 통합 | `unify-order-channels-hero.webp` | PASS_PUBLIC_SAFE | 전화·메신저·플랫폼 흐름 도식, 식별정보 없음 |
| 피킹·검수·상차 | `separate-picking-inspection-loading-status-hero.webp` | PASS_PUBLIC_SAFE | 일반화된 물류 흐름도, 식별정보 없음 |

## 승인 증거 이미지

| 이미지 | 상태 | 확인 결과 |
| --- | --- | --- |
| `ai-business-automation-guide-evidence-01.webp` | PASS_SYNTHETIC_FIXTURE | local demo 상태만 표시. 환경변수 이름은 있으나 값·계정·secret 없음 |
| `automation-priority-method-evidence-01.webp` | PASS_SYNTHETIC_FIXTURE | fixture 실행 로그. endpoint URL·token·계정 없음 |
| `daily-numbers-for-small-business-evidence-01.webp` | PASS_SYNTHETIC_FIXTURE | 가상 점포 수치로 명시, 실제 매출 원본 없음 |
| `unify-order-channels-evidence-01.webp` | PASS_SYNTHETIC_FIXTURE | `검수용 샘플 거래처`와 fixture 주문 ID만 표시 |
| `unify-order-channels-evidence-02.webp` | PASS_SYNTHETIC_FIXTURE | 익명 상태 목록, 연락처·고객 ID 없음 |
| `separate-picking-inspection-loading-status-evidence-01.webp` | PASS_SYNTHETIC_FIXTURE | fixture 작업 상태만 표시 |
| `separate-picking-inspection-loading-status-evidence-02.webp` | PASS_SYNTHETIC_FIXTURE | fixture 차단 알림만 표시 |
| `accounts-receivable-deterministic-fixture.webp` | PASS_SYNTHETIC_FIXTURE | 거래처 A·B·C, 고정 예시 금액과 한계 문구만 표시 |
| `cash-conversion-deterministic-fixture.webp` | PASS_SYNTHETIC_FIXTURE | TX-A·B·C, 고정 예시 금액과 한계 문구만 표시 |

## 민감 항목 확인

고객명, 담당자명, 전화번호, 이메일, 주소, 사업자번호, 카드·계좌번호, 계약·실주문 번호, 사용자 ID, 내부 URL, API key, access token, 브라우저 계정 정보, 비공개 시스템명, 실제 매출·미수금 원본이 보이지 않는지 이미지별로 확인했다.

이 판정은 위 파일의 현재 SHA-256에만 유효하다. 파일 교체, 재캡처 또는 manifest 해시 변경 시 공개 전에 수동 검토를 다시 해야 한다.
