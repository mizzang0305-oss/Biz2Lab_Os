---
title: '미수금 관리표: 약속일·경과일·분쟁 여부로 회수 순서 정하기'
description: 고정 기준일과 익명 fixture로 미수잔액, 약속일 경과, aging, 회수 검토 순위를 계산하고 분쟁 건을 자동 연락에서 제외하는 방법을 재현합니다.
slug: accounts-receivable-tracker
locale: ko
category: sales-ops
cluster: revenue-operations
type: checklist
status: published
draft: false
author: Biz2Lab
publishedAt: '2026-06-15'
updatedAt: '2026-08-06'
tags:
  - 미수금
  - 거래처 관리
heroImage: /images/posts/accounts-receivable-tracker-hero.webp
heroAlt: 미수금 aging 구간과 약속일, 담당자 후속 조치를 함께 보여주는 회수 상태판
canonical: 'https://www.biz2lab.com/ko/sales-ops/accounts-receivable-tracker'
noindex: false
evidenceRequired: true
evidenceMode: visual
relatedPosts:
  - payment-reminder-message
  - sales-revenue-ar-structure
  - sales-achievement-rate
nextStep:
  label: 주문부터 입금까지 멈춘 지점 찾기
  href: /ko/sales-ops/sales-revenue-ar-structure
  description: 미수금이 생기기 전 주문·매출·청구·입금 연결 상태를 확인합니다.
---

## 미수금 관리표는 금액순 연락 목록이 아니다

미수금 관리는 잔액이 큰 거래처부터 자동으로 연락하는 일이 아닙니다. 약속일이 지났는지, 일부 입금이 있었는지, 거래 이견이 있는지, 다음 확인 일정이 잡혀 있는지를 먼저 나눠야 합니다.

이 글은 저장소의 순수 계산 함수에 **재현용 익명 예시 데이터**를 넣어 경과일과 aging 구간, 검토 순위를 다시 계산합니다. 실제 거래처·전화번호·매출 원본·운영 DB는 사용하지 않았고, 결과는 실운영 회수 성과가 아닙니다.

## 계산에 필요한 입력값

입력은 `data/evidence-fixtures/accounts-receivable.json`에 고정했습니다. 기준일은 `2026-08-06`이므로 실행할 때마다 결과가 달라지지 않습니다.

| 필드 | 역할 | 자동화 전 확인 |
| --- | --- | --- |
| `account_id` | 내부 익명 식별자 | 고객명이나 전화번호를 대신하지 않음 |
| `outstanding_amount` | 현재 미수잔액 | 원 청구와 입금 누계를 먼저 대조 |
| `promised_payment_date` | 확인된 입금 약속일 | 일방적으로 정한 독촉일과 구분 |
| `last_payment_date` | 최근 입금 확인일 | 은행·결제 원본 확인 필요 |
| `credit_limit` | 잔액 노출 비율 계산 기준 | 실제 신용 한도 판단에 사용하지 않음 |
| `payment_status` | 미입금·부분입금·완료 | 화면 문구와 실제 입금을 분리 |
| `follow_up_status` | 예정·재검토·분쟁 검토 | 메시지 자동 발송 상태가 아님 |
| `dispute_status` | 거래 이견 분리 | 사람이 주문·납품·청구 원본 확인 |

fixture의 이름은 `거래처 A`, `거래처 B`, `거래처 C`뿐입니다. 실존 회사와 담당자 정보는 포함하지 않습니다.

## 연체일과 aging 계산 방법

계산 코드는 `lib/operational-evidence.ts`에 있습니다.

`연체일 = 기준일 - 약속일`

- 0일 이하는 `약속일 전`
- 1~7일은 `1~7일`
- 8~14일은 `8~14일`
- 15~30일은 `15~30일`
- 31일 이상은 `31일 이상`

청구일이 아니라 확인된 약속일을 사용합니다. 약속일이 바뀌었다면 이전 값을 덮어쓰기보다 변경 이력을 별도로 남기는 것이 안전합니다.

## 검토 순위는 이렇게 계산했다

분쟁이 없고 미수잔액이 남은 건에만 다음 두 값을 더합니다.

1. 약속일 경과 구간: 1~7일 10점, 8~14일 20점, 15~30일 30점, 31일 이상 40점
2. 한도 대비 잔액: 25% 미만 5점, 25% 이상 10점, 50% 이상 20점

`needs_review` 상태는 원본 재확인이 필요하므로 15점을 더합니다. 다만 `dispute_status=open`인 건은 점수를 만들지 않고 `사람 분쟁 검토`로 분리합니다. 이 점수는 연락 순서를 검토하기 위한 재현 규칙일 뿐 신용평가, 법적 대응 또는 거래 중단 결정을 대신하지 않습니다.

## 같은 입력에서 나온 결과

| 익명 계정 | 미수잔액 | 약속일 경과 | aging | 결과 |
| --- | ---: | ---: | --- | --- |
| 거래처 A | 500,000원 | 11일 | 8~14일 | 30점·검토 1순위 |
| 거래처 B | 850,000원 | 16일 | 15~30일 | 분쟁 건·자동 순위 제외 |
| 거래처 C | 300,000원 | 4일 전 | 약속일 전 | 5점·관찰 |

거래처 B의 금액과 경과일이 커도 자동 연락 대상으로 만들지 않습니다. 계약·납품·청구 원본을 사람이 대조하는 것이 먼저입니다. 거래처 C는 약속일 전이므로 독촉 대상이 아닙니다.

## CSV와 자동 테스트로 재현하기

[재현용 미수금 aging CSV 내려받기](/downloads/accounts-receivable-aging.csv)

CSV에는 입력과 계산 결과, `재현용 익명 예시 데이터` 안내가 함께 들어 있습니다. 저장소에서는 다음 두 명령으로 같은 결과인지 확인합니다.

1. `npm run evidence:operational` — fixture와 공개 CSV의 정확한 일치 확인
2. `npx tsx --test tests/operational-evidence.test.ts` — 경과일, aging, 점수, 분쟁 분리와 결정성 검증

테스트는 거래처 A가 11일, 거래처 B가 16일, 거래처 C가 -4일로 계산되는지 고정해서 확인합니다. 날짜를 현재 시각에서 읽지 않기 때문에 실행 환경이 달라도 결과가 같습니다.

## 자동화해도 사람이 확인할 항목

- 부분 입금이 어느 청구 건에 연결되는지
- 반품·할인·세금계산서 재발행 합의가 있는지
- 약속일 변경을 누가 확인했는지
- 분쟁 건의 주문·납품·계약 원본이 일치하는지
- 실제 연락 문구와 발송 시점을 담당자가 승인했는지

자동화 범위는 `연락 후보 표시 → 원본 대조 → 담당자 검토`까지입니다. 고객 메시지 발송, 채권 추심, 법적 통지는 포함하지 않습니다.

## 적용 한계

이 패키지가 검증한 것은 고정 fixture를 동일 코드에 넣었을 때 같은 결과가 나오는지입니다. 실제 회수율, 거래처 신용, 법적 권리, 회계 처리, 개인정보 보관 정책은 검증하지 않았습니다. 주문부터 입금까지 어느 단계에서 차이가 생겼는지는 [주문·매출·청구·입금 연결표](/ko/sales-ops/sales-revenue-ar-structure)에서 별도로 확인할 수 있습니다.
