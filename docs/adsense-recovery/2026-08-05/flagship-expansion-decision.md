# FLAGSHIP 최종 품질 게이트 결정

- 결정일: 2026-08-06
- 대상 PR: #124
- 원칙: 고정 개수보다 독립 검색 의도, 공개 증거, 재현성, 개인정보 안전성과 indexability를 우선한다.

## 숫자 게이트 정정

- FLAGSHIP 6~8개는 이 감사에서 사용하는 **내부 권장 범위**다. Google AdSense의 공식 최소 글 수 조건이 아니다.
- 7개 모두 8개 품질 항목이 3점 이상이고 공개 기술 게이트를 통과하면 사람 검토 준비 상태로 판정할 수 있다.
- 8개 이상이어도 Evidence 또는 Reproducibility가 3점 미만이거나 검색 의도가 중복되면 숫자만으로 통과하지 않는다.
- 숫자를 맞추기 위한 새 글 생성, 기존 SUPPORTING의 임의 승격, 같은 페이지 중복 계산은 수행하지 않았다.

확인한 Google 공식 [Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=ko)와 [AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=ko)는 준수해야 할 콘텐츠·행동·개인정보 기준을 설명하지만 FLAGSHIP 또는 글 8개라는 고정 최소 수를 제시하지 않는다.

이 결정은 초기 역할 감사 문서에 남아 있는 8~12개 후보 권장과 이전 `PARTIAL_INSUFFICIENT_EVIDENCE` 판정을 대체한다. 초기 역할 문서는 당시 판단의 이력으로 유지한다.

## 독립 FLAGSHIP 7개

| URL | 주요 검색 의도·업무 문제 | 다른 FLAGSHIP와 구분되는 이유 | 실제 공개 증거 | 재현 입력 → 출력 | 자동 검증 | 개인정보 | 점수 |
| --- | --- | --- | --- | --- | --- | --- | ---: |
| `/ko/automation/ai-business-automation-guide` | 사람 승인 경계를 둔 AI 업무 자동화 설계 | 자동화 후보 선정이 아니라 외부 실행 전 승인·차단 구조를 설명 | 승인 전 업로드 차단 local demo | readiness fixture → `can_upload=false`와 차단 사유 | evidence manifest·해시·공개 surface 테스트 | PASS | 38/40 |
| `/ko/automation/automation-priority-method` | 빈도·효과·위험으로 자동화 순서 결정 | 개별 시스템 구현보다 무엇을 먼저 자동화할지 판단 | fixture 실행 로그와 실패 상태 | mock 실행 상태 → 성공·실패·수동 확인 로그 | evidence manifest·해시·공개 surface 테스트 | PASS | 38/40 |
| `/ko/sales-ops/accounts-receivable-tracker` | 거래처별 aging·약속일·분쟁 기반 회수 검토 순위 | 입금 단계에 도달한 미수 건의 후속 검토 | deterministic fixture 패널·CSV | 거래처 A·B·C, 기준일 → 경과일·aging·순위·분쟁 제외 | `tests/operational-evidence.test.ts` | PASS | 39/40 |
| `/ko/sales-ops/sales-revenue-ar-structure` | 주문·매출·청구·입금 연결과 현금 전환 정체 단계 | 회수 우선순위가 아니라 현금 전환이 멈춘 단계를 찾음 | deterministic fixture 패널·CSV | TX-A·B·C 단계별 금액·날짜 → 미수잔액·매출-현금 차이·정체 단계 | `tests/operational-evidence.test.ts` | PASS | 39/40 |
| `/ko/small-business/daily-numbers-for-small-business` | 소상공인이 매일 분리해서 볼 운영 숫자 | 주문 흐름이 아니라 고객 기록·예약·웨이팅·QR 주문 지표의 분리 | 읽기 전용 local demo | 가상 매장 fixture → 네 종류의 운영 지표 카드 | evidence manifest·해시·공개 surface 테스트 | PASS | 38/40 |
| `/ko/small-business/unify-order-channels` | 전화·메신저·플랫폼 주문 원본 통합 | 물류 실행 이전 주문 접수·재고·한도 보류 구조에 집중 | mock 주문 작업대와 검증 패널 | 채널·원본 참조 fixture → source type·stock/credit hold | evidence manifest·해시·공개 surface 테스트 | PASS | 38/40 |
| `/ko/warehouse-logistics/separate-picking-inspection-loading-status` | 피킹·검수·상차 상태 분리와 선행 조건 차단 | 주문 접수가 끝난 뒤 창고 실행 상태와 검수 전 상차 차단을 다룸 | mock 운영 흐름과 차단 경고 | 가상 작업 상태 → 단계별 상태·상차 차단 | evidence manifest·해시·공개 surface 테스트 | PASS | 38/40 |

각 페이지의 Topic fit, Originality, Evidence, Reproducibility, Actionability, Trust, UX, Index readiness는 모두 3점 이상이다. 점수는 저장소 근거의 품질 게이트이며 AdSense 승인 예측이 아니다.

## 두 미수금 관련 페이지 분리

### 미수금 관리표

- 입력: 거래처별 미수잔액, 신용한도, 약속일, 최근 입금일, 입금·후속·분쟁 상태
- 출력: 약속일 경과일, aging, 한도 대비 노출 점수, 회수 검토 순위, 분쟁 건 별도 분리
- 독자 행동: 어떤 미수 건의 원본과 다음 조치일을 먼저 확인할지 정한다.

### 주문·매출·청구·입금 연결표

- 입력: 거래별 주문액, 매출 인정액, 청구액, 입금액과 이행·청구·약속·입금 날짜
- 출력: 미수잔액, 매출-현금 차이, 현재 상태와 이행·청구·입금 정체 단계
- 독자 행동: 회수 연락 전에 주문부터 현금까지 어느 단계의 원본을 먼저 확인할지 정한다.

TX-C는 매출-현금 차이가 있어도 청구 전이므로 미수금 독촉 대상으로 넘기지 않는다. 이 차이 때문에 두 페이지는 입력, 출력, 검색 의도와 다음 행동이 실질적으로 구분된다.

두 본문의 5-token normalized shingle Jaccard 유사도는 `0.005`다. 구조적 구분과 별개로 문장 반복 위험도 낮다.

## 증거 무결성

- 두 deterministic 패키지는 기준일 `2026-08-06`을 사용한다.
- fixture, 계산 함수, 공개 CSV와 테스트 예상값이 일치하도록 자동 검증한다.
- 모든 가상 입력은 `재현용 익명 예시 데이터`로 표시한다.
- 실제 회수율, 매출 증가, 세무상 매출 인식, 법적 채권 판단 또는 신용평가는 검증하지 않았다.
- 승인 증거 9개는 manifest SHA-256, `piiScan=pass`, 실제 승인 파일과 일치한다.

## 제외 판단 유지

- SUPPORTING 또는 EXPAND_WITH_EVIDENCE 글은 숫자를 맞추기 위해 FLAGSHIP으로 승격하지 않았다.
- 전자계약·본인확인·결제 주제는 안전한 공개 증거가 부족하고 민감정보 위험이 높아 복원하지 않았다.
- 새로운 URL이나 새로운 주제를 추가하지 않았다.

## 판정

`PASS_DRAFT_PR_HUMAN_REVIEW_READY`

7개는 증거 품질 게이트를 통과했다. Preview에서 사람이 본문, 계산 설명, 가상 데이터 표시와 이미지를 확인하는 단계는 남아 있다. 이 판정은 AdSense 승인을 보장하지 않는다.
