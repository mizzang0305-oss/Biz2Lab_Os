---
title: "미수금 관리표를 만드는 방법"
description: "미수금을 놓치지 않기 위해 거래처, 청구일, 약속일, 후속 조치 상태를 한눈에 보는 관리표 구조를 설명합니다."
slug: "accounts-receivable-tracker"
locale: "ko"
category: "sales-ops"
cluster: "sales-ops-basics"
type: "checklist"
status: "published"
draft: false
author: "Biz2Lab"
publishedAt: "2026-06-15"
updatedAt: "2026-06-15"
tags:
  - "미수금"
  - "거래처 관리"
heroImage: "/images/posts/accounts-receivable-tracker-1200.webp"
heroAlt: "미수금 상태를 색상으로 분류한 관리표"
canonical: "https://biz2lab.com/ko/sales-ops/accounts-receivable-tracker"
noindex: false
relatedPosts:
  - "payment-reminder-message"
  - "daily-sales-goal-breakdown"
  - "manage-unsigned-contracts"
templateCta: "미수금 후속 조치 체크리스트"
nextStep:
  label: "문의하기"
  href: "/ko/contact"
  description: "미수금 관리표와 알림 기준을 함께 설계합니다."
faq:
  - question: "미수금 관리는 회계 프로그램만으로 충분한가요?"
    answer: "회계 프로그램은 기록에는 좋지만 후속 연락, 약속일, 담당자 관리가 별도로 필요할 수 있습니다."
  - question: "자동 알림은 언제 설정하는 것이 좋나요?"
    answer: "약속일 전날, 약속일 당일, 지연 3일 이후처럼 단계별 기준을 두는 것이 좋습니다."
  - question: "거래처에 독촉처럼 보이지 않게 하려면 어떻게 해야 하나요?"
    answer: "금액 확인보다 일정 확인과 업무 정리를 돕는 문장으로 시작하는 편이 안전합니다."
---

## 미수금은 금액보다 상태 관리가 중요합니다

미수금 관리가 어려운 이유는 금액을 몰라서가 아니라 다음 행동을 놓치기 때문입니다. 거래처별로 청구일, 입금 약속일, 담당자, 마지막 연락일, 다음 행동이 보이지 않으면 담당자는 기억에 의존하게 됩니다.

![미수금 관리표에 필요한 핵심 열과 상태 분류](/images/posts/accounts-receivable-tracker-inline-table-1200.webp "거래처, 예정일, 지연일, 다음 연락일을 포함한 미수금 관리표 구조")

## 핵심 요약

- 미수금 표는 회계 장부가 아니라 후속 조치표로 설계합니다.
- 청구일, 약속일, 마지막 연락일, 다음 행동을 반드시 둡니다.
- 상태값은 단순해야 매일 업데이트할 수 있습니다.
- 매출 목표, 계약 상태, 입금 안내 문구와 연결합니다.

## 문제가 생기는 이유

미수금이 쌓이는 사업장은 대부분 금액 목록만 있고 다음 연락 기준이 없습니다. 누가 언제 연락했는지, 고객이 어떤 사유를 말했는지, 다음 조치일이 언제인지가 빠지면 매번 처음부터 확인해야 합니다.

## 현장 예시

거래처 세 곳이 같은 100만 원 미수금으로 보이더라도 실제 상태는 다를 수 있습니다. 한 곳은 세금계산서 확인 중이고, 한 곳은 담당자가 휴가 중이며, 한 곳은 계약 수정 요청이 남아 있을 수 있습니다. 그래서 표에는 금액뿐 아니라 상태와 다음 행동이 있어야 합니다.

## 관리표 구성 방법

필수 열은 거래처명, 청구 금액, 청구일, 입금 약속일, 지연 일수, 담당자, 마지막 연락일, 다음 행동, 상태입니다. 상태는 "정상", "확인 필요", "지연", "분쟁", "완료" 정도로 단순하게 둡니다. 문구가 필요하면 [거래처 독촉 문자를 부드럽게 작성하는 방법](/ko/sales-ops/payment-reminder-message)을 함께 참고하세요.

## 자동화 구조로 확장하기

매일 업무 마감 전에 표에서 "오늘 연락할 거래처"만 자동으로 뽑아도 관리 부담이 줄어듭니다. 매출 목표와 함께 보려면 [월 매출 목표를 일일 목표로 나누는 방법](/ko/sales-ops/daily-sales-goal-breakdown)과 연결하고, 계약 미완료가 원인이라면 [거래처 계약서 미작성 업체를 관리하는 방법](/ko/contracts-payments/manage-unsigned-contracts)으로 이어가야 합니다.

## 실행 체크리스트

- 거래처별 다음 조치일이 적혀 있는가
- 마지막 연락일과 연락 내용을 남겼는가
- 지연 사유를 단순한 상태값으로 분류했는가
- 담당자가 바뀌어도 표만 보고 이어서 처리할 수 있는가
- 매출 목표표와 같은 기준일로 보고 있는가

## 관련 글

[매출과 미수금을 함께 보는 영업관리 구조](/ko/sales-ops/sales-revenue-ar-structure), [계약서, 결제, 거래처 관리를 연결하는 방법](/ko/contracts-payments/connect-contract-payment-customer-management), [전자계약 시스템에 필요한 기본 기능](/ko/contracts-payments/electronic-contract-system-basics)을 함께 보면 미수금이 생기기 전 단계까지 관리할 수 있습니다.

## 다음 단계

오늘 기준으로 입금 약속일이 지난 거래처를 세 단계로 나눠보세요. 확인 필요, 지연, 분쟁을 구분하는 것만으로도 다음 행동이 명확해집니다.
