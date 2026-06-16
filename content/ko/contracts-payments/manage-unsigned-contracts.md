---
title: "거래처 계약서 미작성 업체를 관리하는 방법"
description: "거래처 계약서 작성이나 서명이 멈춘 업체를 놓치지 않기 위해 미작성 사유, 마지막 연락일, 다음 조치일을 관리하는 방법입니다."
slug: "manage-unsigned-contracts"
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
  - "계약 관리"
  - "계약서 미작성"
heroImage: "/images/posts/manage-unsigned-contracts-1200.webp"
heroAlt: "계약서 미작성 업체와 다음 조치일을 관리하는 표"
canonical: "https://www.biz2lab.com/ko/contracts-payments/manage-unsigned-contracts"
noindex: false
relatedPosts:
  - "electronic-contract-system-basics"
  - "payment-reminder-message"
  - "connect-contract-payment-customer-management"
templateCta: "계약서 미작성 업체 후속 조치표"
nextStep:
  label: "문의하기"
  href: "/ko/contact"
  description: "계약서 미작성 업체와 결제 후속 조치 흐름을 정리합니다."
faq:
  - question: "계약서 미작성 업체는 언제 연락해야 하나요?"
    answer: "업종마다 다르지만 발송 당일 확인, 1~2일 후 리마인드, 약속일 이후 사유 확인처럼 단계별 기준이 필요합니다."
  - question: "자동 리마인드를 바로 보내도 되나요?"
    answer: "문구와 대상이 맞는지 사람이 확인한 뒤 보내는 구조가 안전합니다."
  - question: "계약 수정 요청도 미서명으로 봐야 하나요?"
    answer: "상태는 미서명이지만 사유를 수정 요청으로 분리해야 담당자가 다음 조치를 정확히 잡을 수 있습니다."
---

## 계약서 미작성 업체는 영업 흐름의 병목입니다

계약서를 작성하지 않았거나 보낸 뒤 서명이 멈추면 매출 예측, 일정, 결제, 납품 준비가 모두 흔들립니다. 문제는 고객을 탓하는 것이 아니라 계약서 미작성 상태가 운영표에 보이지 않는 데 있습니다.

## 핵심 요약

- 계약서 미작성 업체는 발송 목록이 아니라 다음 행동 목록으로 관리합니다.
- 마지막 열람일, 마지막 연락일, 미작성 사유를 남깁니다.
- 금액이 크거나 조건 협의가 남은 계약은 자동 문구를 바로 보내지 않습니다.
- 계약 완료 후 결제와 미수금 상태까지 연결합니다.

## 문제가 생기는 이유

전자계약 도구에는 발송 기록이 남아도 담당자의 다음 행동은 따로 관리되는 경우가 많습니다. 고객이 검토 중인지, 내부 결재 대기인지, 계약 조건 수정이 필요한지 구분하지 않으면 모든 계약서 미작성 업체가 같은 위험으로 보입니다.

## 현장 예시

거래처 A는 대표 승인 대기, 거래처 B는 금액 조정 요청, 거래처 C는 담당자가 계약 메일을 확인하지 않은 상태일 수 있습니다. 세 곳 모두 "미서명"이지만 후속 문구와 연락 시점은 달라야 합니다.

## 관리표 구성 방법

관리표에는 거래처명, 계약명, 발송일, 마지막 열람일, 마지막 연락일, 미작성 사유, 다음 조치일, 담당자, 상태가 필요합니다. 전자계약 기능을 점검하려면 [전자계약 시스템에 필요한 기본 기능](/ko/contracts-payments/electronic-contract-system-basics)을 먼저 확인하세요.

## 자동화 구조로 확장하기

AI는 미작성 사유 요약과 리마인드 문구 초안을 도울 수 있습니다. 다만 금액, 계약명, 수정 요청 여부는 사람이 대조해야 합니다. 입금 확인까지 이어지는 경우에는 [거래처 독촉 문자를 부드럽게 작성하는 방법](/ko/sales-ops/payment-reminder-message)과 [계약서, 결제, 거래처 관리를 연결하는 방법](/ko/contracts-payments/connect-contract-payment-customer-management)을 함께 봐야 합니다.

## 실행 체크리스트

- 미작성 사유를 단순 상태값으로 분류했는가
- 마지막 연락일과 다음 조치일이 적혀 있는가
- 수정 요청과 단순 미확인을 구분했는가
- 리마인드 문구를 담당자가 확인하는가
- 서명 완료 후 결제 상태까지 이어지는가

## 관련 글

[전자서명과 본인확인의 차이 쉽게 이해하기](/ko/contracts-payments/e-signature-identity-check), [미수금 관리표를 만드는 방법](/ko/sales-ops/accounts-receivable-tracker), [영업팀 일일 보고서 작성법](/ko/sales-ops/daily-sales-report)을 연결해 읽으면 계약 상태를 영업 보고와 함께 관리할 수 있습니다.

## 다음 단계

이번 주 발송한 계약 중 아직 작성되거나 서명되지 않은 건을 모두 적고 사유를 세 가지 이하로 나눠보세요. 사유가 정리되면 리마인드 순서도 자연스럽게 정해집니다.
