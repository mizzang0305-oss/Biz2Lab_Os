---
title: '피킹·검수·상차를 하나의 완료 상태로 묶지 않은 이유'
description: 식자재 유통 WMS에서 출고지시, 피킹, 검수, 상차와 일일 차이 확인을 별도 상태로 두고 검수 전 상차 완료를 차단한 구현 기록입니다.
slug: separate-picking-inspection-loading-status
locale: ko
category: warehouse-logistics
cluster: warehouse-state-model
type: case-study
status: published
draft: false
author: Biz2Lab
publishedAt: '2026-07-28'
updatedAt: '2026-07-28'
tags:
  - WMS
  - 피킹 검수 상차
  - 상태 모델
heroImage: /images/posts/separate-picking-inspection-loading-status-hero.webp
heroAlt: 출고지시와 피킹, 검수, 상차 및 차이 확인을 분리한 물류 상태 흐름
canonical: 'https://www.biz2lab.com/ko/warehouse-logistics/separate-picking-inspection-loading-status'
noindex: false
evidenceRequired: true
evidenceMode: visual
relatedPosts:
  - unify-order-channels
  - accounts-receivable-tracker
  - automation-priority-method
nextStep:
  label: 주문 원본 작업대 보기
  href: /ko/small-business/unify-order-channels
  description: 물류 단계에 들어오기 전 주문 원본과 보류 상태를 어떻게 나눴는지 확인합니다.
---

## 완료 하나가 현장의 차이를 숨긴다

출고 작업을 `진행중 / 완료` 두 값으로만 관리하면 상품을 꺼낸 상태, 수량을 대조한 상태와 차량에 실은 상태가 모두 같은 “진행중”이 됩니다. 문제가 발견돼도 어느 단계에서 생겼는지 찾기 어렵고, 검수하지 않은 박스를 상차 완료로 처리할 수 있습니다.

식자재 유통 WMS 작업대에서는 출고지시, `picking`, `inspection`, `loading`, 출고 완료를 별도 상태로 두었습니다. 각 단계는 다음 단계의 입력이지만 이전 단계를 덮어쓰지 않습니다.

## fixture 화면에서 확인한 경계

아래 두 화면은 운영 DB가 아닌 mock fixture입니다. 첫 390px 세로 화면은 출고지시 맥락 아래 피킹·검수·상차·차이 확인 완료를 서로 다른 lane으로 보여 줍니다. 두 번째 집중 화면은 “검수 미완료 시 상차 완료 차단”과 다음 필수 행동인 `inspection` 통과를 보여 줍니다. 화면이 보여 주는 설계 결정은 **검수 통과가 상차 완료의 선행 조건**이라는 점입니다.

이 캡처로 실제 출고량, 작업자 생산성, 오배송 감소율과 재고 정확도를 입증할 수 없습니다. 가상 작업 건과 상태 문구로 UI 흐름을 재현한 결과입니다.

## 상태와 책임을 함께 나눴다

| 상태 | 현장 질문 | 다음 단계 조건 |
| --- | --- | --- |
| 출고지시 | 무엇을 언제 준비해야 하나 | 주문·재고 검증 통과 |
| picking | 지시 수량을 꺼냈는가 | 품목·수량 스캔 또는 확인 |
| inspection | 상품·수량·상태가 맞는가 | 차이 없음 또는 차이 처리 |
| loading | 검수된 박스를 차량에 실었는가 | inspection 통과 |
| completed | 출고 근거가 모두 남았는가 | 단계별 기록과 차이 해소 |

하나의 버튼으로 여러 상태를 동시에 바꾸면 빠르지만 누가 무엇을 확인했는지 사라집니다. 그래서 각 전환은 이전 상태, 변경 시각과 다음 행동을 남기고 실패하면 현재 단계에 머물도록 설계했습니다.

## 차이를 별도 작업으로 만든 이유

피킹 수량과 검수 수량이 다르거나 시스템 재고와 실물이 다를 때 주문 자체를 삭제하거나 재고 숫자를 바로 덮어쓰면 원인을 잃습니다. 차이는 `run`과 `item`으로 분리해 어떤 기준시각에 어떤 품목에서 발생했는지 남기고 담당자가 확인하도록 했습니다.

fixture에는 `on_hand`, `reserved`, `available` 같은 재고 구분이 있지만 이는 실제 재고가 아닙니다. 중요한 것은 차이가 생겼다는 이벤트와 조정 판단을 재고 원장 변경과 분리했다는 구조입니다.

## 안전하게 촬영한 범위

소스 앱은 API가 없어도 `mock` fallback으로 실행되는 운영 콘솔입니다. 전용 clean worktree의 확인된 commit에서 브라우저를 띄웠고, 운영 API와 DB는 시작하지 않았습니다. 상태 lane 캡처는 재고 차이·품목·수량·담당자 영역을 제외했고, 상차 차단 캡처는 기존 alert 하나로 제한했습니다.

DOM의 전화번호, 이메일, 주민·사업자번호, 계좌와 secret 형태, 로컬 경로를 검사하고 통과한 이미지에만 `candidate`를 부여했습니다. 비공개 저장소 URL과 회사명은 공개 화면·manifest에 넣지 않습니다.

## 아직 필요한 검증

mock 화면은 상태 모델과 차단 문구가 렌더링된다는 사실만 확인합니다. 실제 스캐너 입력, 동시 작업 충돌, 오프라인 복구, 창고별 재고 원장과 권한 제어는 운영과 같은 테스트 환경에서 별도 검증해야 합니다. 이번 작업에서는 DB seed, migration과 production API를 실행하지 않았습니다.

다른 조직은 먼저 [주문 원본 분리 사례](/ko/small-business/unify-order-channels)처럼 주문 식별자를 정하고, 피킹·검수·상차 담당자가 인계할 최소 기록을 합의해야 합니다. 화면을 만들기 전에 어떤 상태에서 반드시 멈춰야 하는지를 정하는 것이 출발점입니다.
