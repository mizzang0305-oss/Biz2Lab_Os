---
title: "카드 키인 결제와 PG/VAN 차이"
description: "카드 키인 결제, PG, VAN의 역할 차이를 이해하고 계약, 결제, 정산 상태를 운영표에서 관리하는 방법을 설명합니다."
slug: "offline-card-payment-pg-van"
locale: "ko"
category: "contracts-payments"
cluster: "contracts-payment-basics"
type: "how-to"
status: "published"
draft: false
author: "Biz2Lab"
publishedAt: "2026-06-15"
updatedAt: "2026-06-15"
tags:
  - "카드 결제"
  - "PG VAN"
heroImage: "/images/posts/offline-card-payment-pg-van-1200.webp"
heroAlt: "카드 키인 결제와 PG VAN 흐름을 비교한 표"
canonical: "https://biz2lab.com/ko/contracts-payments/offline-card-payment-pg-van"
noindex: false
relatedPosts:
  - "connect-contract-payment-customer-management"
  - "electronic-contract-system-basics"
  - "sales-revenue-ar-structure"
templateCta: "결제 방식 비교 체크리스트"
nextStep:
  label: "결제 구조 문의"
  href: "/ko/contact"
  description: "계약, 결제 요청, 정산 확인 흐름을 함께 점검합니다."
faq:
  - question: "PG와 VAN은 같은 것인가요?"
    answer: "둘 다 결제 흐름과 관련되지만 온라인 결제 중개와 카드 키인 또는 오프라인 승인망 역할처럼 초점이 다릅니다."
  - question: "소상공인은 어떤 차이를 알아야 하나요?"
    answer: "결제 방식에 따라 승인, 취소, 정산 확인 위치가 달라질 수 있으므로 운영표에서 상태를 구분해야 합니다."
  - question: "카드 정보를 직접 저장해도 되나요?"
    answer: "아니요. 카드번호 같은 민감한 결제 정보는 직접 보관하지 말고 승인사, PG, VAN 원본 화면과 공식 정산 자료를 기준으로 확인해야 합니다."
---

## 결제 방식 차이를 알아야 상태 관리가 쉬워집니다

카드 키인 결제, PG, VAN은 모두 결제와 관련되어 있지만 실무에서 확인해야 하는 위치가 다릅니다. 결제 방식 차이를 몰라도 결제는 받을 수 있지만, 승인 취소, 정산 확인, 계약 상태 연결을 관리할 때 혼선이 생길 수 있습니다. 특히 카드 정보 같은 민감한 결제 데이터는 운영표에 직접 저장하지 않는 원칙이 필요합니다.

## 핵심 요약

- 카드 키인 결제는 카드 정보를 직접 입력하는 승인 흐름이 중심입니다.
- PG는 온라인 결제 요청과 결제창 흐름에서 자주 등장합니다.
- VAN은 카드 승인망과 단말기 운영에서 자주 연결됩니다.
- 운영자는 결제 요청, 완료, 취소, 정산 확인 상태를 구분해야 합니다.
- 카드번호 같은 민감한 결제 정보는 운영표에 직접 보관하지 않습니다.

## 문제가 생기는 이유

결제는 완료된 것처럼 보이지만 정산 확인, 취소 처리, 계약 연결이 남아 있을 수 있습니다. 결제 방식별로 확인 위치가 다르면 담당자는 여러 화면을 오가며 상태를 맞춰야 합니다.

## 현장 예시

카드 키인 결제는 완료됐지만 계약서 서명이 아직 남았거나, 온라인 결제 요청은 보냈지만 고객이 결제를 완료하지 않은 상황이 있을 수 있습니다. 두 경우 모두 매출 흐름에 영향을 주지만 확인해야 할 상태는 다릅니다.

## 구분하는 방법

먼저 고객이 어디에서 결제하는지 봅니다. 카드 정보를 직접 입력한다면 카드 키인 결제 흐름, 온라인 링크나 결제창이라면 PG 흐름을 확인합니다. 다음으로 승인, 취소, 정산, 계약 연결 상태를 운영표에 남깁니다. 운영표에는 결제수단, 상태, 확인 위치, 담당자만 적고 카드번호나 인증값은 남기지 않습니다. 계약과 결제 흐름은 [계약서, 결제, 거래처 관리를 연결하는 방법](/ko/contracts-payments/connect-contract-payment-customer-management)과 연결됩니다.

## 자동화 구조로 확장하기

AI는 결제 상태 설명이나 확인 필요 목록 정리를 도울 수 있습니다. 하지만 결제 승인, 취소, 정산 판단은 원본 결제 자료와 대조해야 합니다. 민감한 결제 정보는 AI 입력값에 넣지 않고, 상태 요약만 다루는 편이 안전합니다. 매출과 입금을 함께 보려면 [매출과 미수금을 함께 보는 영업관리 구조](/ko/sales-ops/sales-revenue-ar-structure)를 참고하세요.

## 실행 체크리스트

- 결제 방식별 확인 화면을 알고 있는가
- 결제 요청, 완료, 취소, 정산 확인 상태를 나누었는가
- 계약 상태와 결제 상태가 연결되는가
- 취소나 부분 결제 같은 예외를 기록하는가
- 카드번호와 인증값을 운영표나 AI 입력에 남기지 않는가
- 원본 결제 자료와 운영표를 대조하는가

## 관련 글

[전자계약 시스템에 필요한 기본 기능](/ko/contracts-payments/electronic-contract-system-basics), [전자서명과 본인확인의 차이 쉽게 이해하기](/ko/contracts-payments/e-signature-identity-check), [목표 대비 매출 달성률을 계산하는 방법](/ko/sales-ops/sales-achievement-rate)을 함께 읽으면 결제와 매출 지표를 구분할 수 있습니다.

## 다음 단계

현재 받는 결제 방식을 오프라인 단말기, 온라인 결제창, 계좌 입금으로 나눠보세요. 각 방식마다 완료와 확인 필요 상태를 어디서 보는지 적는 것이 첫 단계입니다.
