---
title: '주문·매출·청구·입금 연결표: 미수금이 생긴 지점 찾기'
description: 익명 거래 fixture로 매출 미수금 구조를 분리하고 미수잔액, 매출-현금 차이와 현금 전환이 멈춘 단계를 코드와 CSV로 재현합니다.
slug: sales-revenue-ar-structure
locale: ko
category: sales-ops
cluster: revenue-operations
type: how-to
status: published
draft: false
author: Biz2Lab
publishedAt: '2026-06-15'
updatedAt: '2026-08-06'
tags:
  - 매출 관리
  - 미수금 관리
heroImage: /images/posts/sales-revenue-ar-structure-hero.webp
heroAlt: 매출 목표와 청구, 입금, 미수금 대기 상태를 연결한 영업관리 지도
canonical: 'https://www.biz2lab.com/ko/sales-ops/sales-revenue-ar-structure'
noindex: false
evidenceRequired: true
evidenceMode: visual
relatedPosts:
  - accounts-receivable-tracker
  - sales-achievement-rate
  - unify-order-channels
nextStep:
  label: 거래처별 회수 검토 순서 계산하기
  href: /ko/sales-ops/accounts-receivable-tracker
  description: 약속일을 넘긴 거래를 aging과 분쟁 여부로 나눕니다.
---

## 주문 100만 원과 입금 100만 원은 같은 숫자가 아니다

주문, 매출 인정, 청구, 입금은 시점과 근거가 다릅니다. 매출과 미수금을 하나의 `매출` 열로 덮어쓰면 주문은 완료됐지만 청구가 발행되지 않은 건과, 청구는 끝났지만 일부만 입금된 건을 구분할 수 없습니다.

이번 보강은 `data/evidence-fixtures/cash-conversion.json`의 **재현용 익명 예시 데이터** 세 건을 `lib/operational-evidence.ts`에 입력했습니다. 외부 결제사, 운영 DB, 실제 주문번호나 매출 원본은 연결하지 않았습니다.

## 거래 연결에 사용한 입력

| 입력 | 확인하는 단계 | 원본을 유지하는 이유 |
| --- | --- | --- |
| `transaction_id` | 같은 거래 연결 | 고객명 없이 내부 fixture를 연결 |
| `order_amount` | 주문 | 고객 요청 금액을 보존 |
| `recognized_revenue_amount` | 매출 인정 | 주문·현금과 별도 기준 유지 |
| `invoiced_amount` | 청구 | 실제 지급 요청 금액 확인 |
| `paid_amount` | 입금 | 확인된 현금 유입만 합산 |
| `fulfillment_date` | 이행 | 미이행 건을 입금 문제로 오인하지 않음 |
| `invoice_date` | 청구 발행 | 청구 전 정체를 분리 |
| `promised_payment_date` | 입금 약속 | 약속일 경과 여부 계산 |

`미수잔액 = max(청구금액 - 입금액, 0)`이고, `매출-현금 차이 = max(매출 인정액 - 입금액, 0)`입니다. 이 두 값도 의미가 다르므로 같은 열로 합치지 않습니다.

## 세 거래를 통과시킨 결과

| 거래 | 매출 인정 | 청구 | 입금 | 매출-현금 차이 | 정체 단계 |
| --- | ---: | ---: | ---: | ---: | --- |
| TX-A | 1,200,000원 | 1,200,000원 | 1,200,000원 | 0원 | 완료 |
| TX-B | 850,000원 | 850,000원 | 300,000원 | 550,000원 | 입금 |
| TX-C | 640,000원 | 0원 | 0원 | 640,000원 | 청구 |

TX-B는 주문·매출·청구가 끝났지만 일부만 입금되어 `부분 입금`으로 계산됩니다. TX-C는 이행일과 매출 인정액은 있지만 청구일이 없어서 고객 연락보다 청구 발행 조건 확인이 먼저입니다.

## 정체 단계는 코드에서 순서대로 결정한다

1. 이행일이 없으면 `이행 대기`
2. 이행일은 있지만 청구일이 없으면 `청구 대기`
3. 청구액과 입금액이 같으면 `입금 완료`
4. 일부 입금이 있으면 `부분 입금`
5. 입금이 없고 약속일이 지났으면 `약속일 경과`
6. 나머지는 `입금 대기`

이 순서 때문에 TX-C의 매출-현금 차이가 64만 원이어도 미수금 독촉 대상으로 분류하지 않습니다. 먼저 청구 발행 여부를 확인합니다.

## 결과를 파일과 테스트로 대조하기

[재현용 주문·매출·입금 연결 CSV 내려받기](/downloads/cash-conversion-bridge.csv)

재현 절차는 다음과 같습니다.

1. fixture의 기준일과 TX-A·B·C 입력을 확인합니다.
2. `npm run evidence:operational`을 실행해 공개 CSV가 계산 결과와 정확히 같은지 확인합니다.
3. `npx tsx --test tests/operational-evidence.test.ts`로 미수잔액, 차이, 상태와 정체 단계를 검증합니다.
4. Preview의 증거 화면에서 같은 숫자와 제한 문구가 보이는지 확인합니다.

테스트는 TX-A가 완료, TX-B가 입금 단계, TX-C가 청구 단계인지 고정합니다. 현재 날짜나 외부 API 결과에 의존하지 않습니다.

## 연결표를 실제 업무에 옮길 때

- 내부 거래 식별자를 모든 단계에 유지합니다.
- 원 주문금액을 입금액으로 덮어쓰지 않습니다.
- 부분 입금은 전액 입금과 다른 상태로 둡니다.
- 청구 전 거래와 약속일 경과 거래를 분리합니다.
- 반품·할인·취소는 원본 변경이 아니라 조정 기록으로 남깁니다.
- 자동 집계 전에 미연결 입금과 누락된 거래번호를 사람이 확인합니다.

이 연결표에서 `입금` 단계로 확인된 건은 [미수금 회수 검토표](/ko/sales-ops/accounts-receivable-tracker)에서 약속일과 분쟁 여부를 추가로 확인합니다.

## 검증하지 않은 범위

이 패키지는 주문·매출·청구·입금 필드를 분리한 코드 실행 결과만 증명합니다. 세무상 매출 인식, 부가세, 법적 채권, 실제 회수율, 결제 공급자 결과는 검증하지 않았습니다. 모든 금액과 거래번호는 재현용 익명 fixture이며 실운영 성과로 해석하면 안 됩니다.
