---
title: '전화·메시지·포털 주문 원본을 지우지 않고 한 작업대로 모은 방법'
description: 식자재 유통 WMS 주문 작업대에서 주문 채널과 원본 참조, 재고·한도 보류를 별도 상태로 두어 누락 원인을 추적한 설계를 설명합니다.
slug: unify-order-channels
locale: ko
category: small-business
cluster: order-operations-system
type: case-study
status: published
draft: false
author: Biz2Lab
publishedAt: '2026-06-15'
updatedAt: '2026-07-28'
tags:
  - 주문 원본
  - 식자재 유통
  - 주문 작업대
heroImage: /images/posts/unify-order-channels-hero.webp
heroAlt: 전화와 메신저, 플랫폼 주문을 한곳의 처리 상태판으로 모으는 매장 주문 흐름
canonical: 'https://www.biz2lab.com/ko/small-business/unify-order-channels'
noindex: false
evidenceRequired: true
evidenceMode: visual
relatedPosts:
  - sales-revenue-ar-structure
  - daily-numbers-for-small-business
  - separate-picking-inspection-loading-status
nextStep:
  label: 물류 단계 상태 분리 보기
  href: /ko/warehouse-logistics/separate-picking-inspection-loading-status
  description: 주문 접수 뒤 피킹·검수·상차를 별도 상태로 이어가는 사례를 확인합니다.
faq:
  - question: 주문을 한 화면에 모으면 원본 채널 필드는 없어도 되나요?
    answer: 원본 채널과 참조값을 지우면 변경이나 중복이 생겼을 때 어디로 돌아가야 하는지 알 수 없습니다. 통합 번호와 원본 식별자를 함께 보존해야 합니다.
  - question: 화면의 거래처와 금액은 실제 데이터인가요?
    answer: 아닙니다. mock fixture이며 캡처에서는 거래처와 원본 참조 입력을 가렸습니다. 실제 단가, 한도, 재고와 주문 성과는 포함하지 않습니다.
---

## 접수함 하나가 원본 하나를 뜻하지 않는다

식자재 유통 주문은 전화 한 통, 메시지 캡처, 영업 담당자의 대행 입력과 거래처 포털에서 동시에 들어옵니다. 이 주문을 한 표에 모으면서 채널 정보를 지우면 보기는 단순해지지만 변경 근거와 중복 원인을 찾기 어려워집니다.

WMS 주문 작업대에서는 내부 주문 상태와 별도로 `source_type`, `source_reference`를 두었습니다. 전화, 카카오, 영업, 관리자, 포털 중 어디에서 왔는지 보존하고, 원본을 다시 확인해야 하는 주문은 검토 대기에 남깁니다.

## 화면에서 확인할 설계 결정

아래 화면은 실제 거래처 주문이 아니라 mock fixture로 실행한 주문 작업대입니다. 거래처 입력과 원본 참조값은 중립색으로 마스킹했습니다. 화면 왼쪽의 주문 채널과 오른쪽의 재고·한도 검증 상태가 서로 다른 영역에 있는지 보면 됩니다.

화면이 입증하는 것은 주문 출처와 검증 결과를 별도 필드로 표현한 UI입니다. 실제 주문 누락률, 거래처별 가격, 가용재고, 한도와 출고 결과는 입증하지 않습니다.

## 주문이 이동하는 상태를 분리했다

| 구분 | 예시 상태 | 의미 |
| --- | --- | --- |
| 원본 | phone, kakao, sales, manual, portal | 주문이 처음 들어온 경로 |
| 입력 검토 | pending_review | 원본과 상품·수량을 다시 확인 |
| 재고 검증 | stock_hold | 가용재고가 부족해 다음 단계 차단 |
| 한도 검증 | credit_hold | 미수·한도 조건 확인 전 차단 |
| 출고 준비 | ready_for_allocation | 검증 통과 후 출고지시 가능 |

이 값을 `처리중` 하나로 합치면 담당자는 무엇을 기다리는지 알 수 없습니다. 원본 오류는 주문 담당자가, 재고 보류는 물류 담당자가, 한도 보류는 영업·채권 담당자가 확인할 수 있도록 상태가 책임 경계를 알려 줍니다.

## 입력 편의를 만들면서 생긴 위험

빠른 주문을 위해 최근 상품, 포장 단위와 재고 미리보기를 같은 화면에 두었지만 입력값을 즉시 확정하지는 않았습니다. 포장 단위 수량과 재고 차감 수량이 다를 수 있고, 품목명만 같아도 규격이 다르면 다른 상품입니다. 그래서 `input_quantity`, `stock_quantity`, `packaging_id`를 분리하고 제출 전 검증 요약을 보여 줍니다.

또한 저장 실패 때 입력 내용을 지우지 않는 경계가 필요했습니다. 사용자가 다시 입력하는 동안 원본 메시지가 바뀌거나 중복 주문을 만들 수 있기 때문입니다. 실패 후 보존과 중복 확인 키는 편의 기능보다 먼저 확인해야 했습니다.

## 개인정보와 운영 데이터를 뺀 캡처

소스 앱은 `VITE_PORTAL_DATA_SOURCE=mock`에서 API 없이 fixture를 사용합니다. 캡처는 clean detached commit에서 실행했고 운영 DB, 환경 비밀값과 실제 거래처 정보는 연결하지 않았습니다. 거래처와 원본 참조 DOM은 명시적으로 mask한 뒤 body와 캡처 대상 텍스트에서 전화번호, 이메일, 사업자번호, 계좌 형태와 절대 경로를 검사했습니다.

fixture에 보이는 수량과 금액은 구조 설명용 가상 데이터입니다. 실제 영업 결과나 재고 정확도로 확대해서 읽으면 안 됩니다.

## 다른 조직이 먼저 정할 항목

1. 모든 채널에 공통으로 부여할 내부 주문번호를 정합니다.
2. 원본 채널과 원본 참조를 삭제하지 않습니다.
3. 상품, 포장 단위, 입력 수량과 재고 차감 수량을 분리합니다.
4. 재고·한도·검토 보류를 서로 다른 상태와 책임자로 연결합니다.
5. 실패 후 입력 보존과 중복 확인 절차를 먼저 시험합니다.

주문 접수 뒤에는 [피킹·검수·상차 상태 분리 사례](/ko/warehouse-logistics/separate-picking-inspection-loading-status)처럼 물류 단계가 같은 주문 식별자를 이어받아야 합니다.
