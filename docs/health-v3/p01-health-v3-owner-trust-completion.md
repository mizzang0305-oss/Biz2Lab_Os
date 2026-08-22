---
type: trust-gate
project: Biz2Lab Health V3
status: P01_HEALTH_V3_OWNER_TRUST_COMPLETION_PREPARED_NOT_PUBLISHED
updated: 2026-08-21
tags:
  - biz2lab
  - health-v3
  - trust
  - publication-gate
---

# P01_HEALTH_V3_OWNER_TRUST_COMPLETION

## A. Overall Result

`PREPARED_NOT_COMPLETED` — 요청된 Batch 0 trust gate를 문서 계약과 공개 문구 초안으로 준비했다. 실제 Owner 입력은 A–F 여섯 묶음이 남아 있다. 네 파일럿은 모두 `PUBLICATION_BLOCKED`이며 공개·배포 승인이 아니다.

## B. Remaining Owner Inputs

| ID | 필요한 실제 입력 | 미입력 시 상태 |
|---|---|---|
| A | 공개 건강 브랜드명·Biz2Lab 표시 방식·tagline·사이트 목적·Option 선택 | `OWNER_INPUT_REQUIRED` |
| B | 실제 저자명 또는 승인 필명·공개 동의·사실 기반 biography·역할 한계 | `OWNER_INPUT_REQUIRED` |
| C | 실제 면허 의료 검수자 이름·면허 종류·검증 방법·공개 동의 범위, 또는 명시적 `NONE` | `BLOCKED_LICENSED_REVIEWER_INPUT_REQUIRED` |
| D | 실제 비공개 정정 destination·operator·보관·삭제·백업·로그 정책 | `OWNER_INPUT_REQUIRED` |
| E | 실제 AI 보조·사람 fact-check·최종 승인·이미지 공개 workflow | `OWNER_INPUT_REQUIRED` |
| F | 실제 경험 사용·동의·privacy·철회 또는 composite-only 결정 | `OWNER_INPUT_REQUIRED` |

안전 경계만 고정되어 있으며 위 정책·신원·운영 값은 Owner 입력 전 확정하지 않는다. 값을 추정하거나 token을 public route에 노출하지 않는다.

## C. Final Brand Architecture

- 현재 공개 상태: `OPTION_C_STAGING`
- 목표 공개 아키텍처: `OWNER_DECISION_REQUIRED`
- 독자-facing entity: `{{PUBLIC_HEALTH_BRAND_NAME}}`
- tagline: `{{PUBLIC_HEALTH_TAGLINE}}`
- Biz2Lab 공개 표시 방식: `{{BIZ2LAB_PUBLIC_DISPLAY_MODE}}`
- 기존 Biz2Lab B2B Production: 보존
- 이번 단계 허용 범위: `docs/health-v3/**` 비공개 문서

redirect·deletion·canonical·sitemap·navigation·AdSense·Search Console 변경은 승인되지 않았다.

## D. Trust Surface Contracts

모든 trust surface의 상태는 `DRAFT_NOT_PUBLISHED`다. 브랜드·저자·검수자·정정 destination/operator token이 남은 문서는 public route·metadata·sitemap·navigation에 연결하지 않는다.

| Surface | 문서 |
|---|---|
| About / editorial policy | `trust-surfaces/about-and-editorial-policy.md` |
| Author profile | `trust-surfaces/author-profile.md` |
| Medical review disclosure | `trust-surfaces/medical-review-disclosure.md` |
| Source methodology | `trust-surfaces/source-methodology.md` |
| AI assistance disclosure | `trust-surfaces/ai-assistance-disclosure.md` |
| Corrections policy | `trust-surfaces/corrections-policy.md` |
| Privacy/minimal-data notice | `trust-surfaces/privacy-minimal-data-notice.md` |

## E. Four-Pilot Publication Matrix

상세 근거는 `four-pilot-publication-readiness.csv`에 기록한다.

| Pilot | Claims | Human source check | Licensed review | Reader test | Result |
|---|---:|---|---|---|---|
| 고혈압 | 11 | PENDING | CLAIM_SCOPED_NOT_STARTED | 3_READERS_PENDING | PUBLICATION_BLOCKED |
| 제2형 당뇨병 | 12 | PENDING | CLAIM_SCOPED_NOT_STARTED | 3_READERS_PENDING | PUBLICATION_BLOCKED |
| 뇌졸중 | 11 | PENDING | PAGE_LEVEL_REQUIRED_NOT_STARTED | 3_READERS_PENDING | PUBLICATION_BLOCKED |
| 심근경색 | 11 | PENDING | PAGE_LEVEL_REQUIRED_NOT_STARTED | 3_READERS_PENDING | PUBLICATION_BLOCKED |

## F. Medical Review Requirements

- source check는 medical review가 아니다.
- 실제 검수자 신원·면허 종류·검증 방법과 문서별 검토 범위·날짜·결과를 기록한다.
- 고혈압·제2형 당뇨병은 private source-check 후보까지 진행할 수 있으나, 응급·진단·검사·치료·약물·특수 대상 고위험 claim은 실제 면허 검토가 필요하다.
- 뇌졸중·심근경색은 페이지 전체에 실제 면허 검토가 필수다.
- article version hash, 검토 범위, claim IDs, 출처 버전, 날짜, 결과, 수정 요청과 미해결 이견을 문서별로 기록한다.
- 검수자가 없으면 `NONE`을 기록하고 뇌졸중·심근경색 및 모든 고위험 claim을 차단한다. 네 파일럿은 다른 미충족 gate 때문에 모두 계속 차단한다.
- 한 문서·버전의 검토를 다른 질환이나 버전으로 확대하지 않는다.

## G. Correction / Privacy Contract

- 사실·콘텐츠 정정 전용
- 의료상담·진단·약물 조언·검사값 해석·응급상담 금지
- 첨부 비활성화와 공개 issue 자동 생성 금지
- 최소 필드: page URL, correction category, correction description, optional reply email
- 보관·삭제·백업·로그 정책: `OWNER_INPUT_REQUIRED`
- 실제 destination·operator: Owner 입력 전 미확정·미활성화

## H. AI Disclosure Contract

AI는 자료 정리, 구조 설계, 초안 작성, 시각 아이디어 구상에 보조적으로 사용할 수 있다. AI를 저자·source checker·medical reviewer로 표시하지 않는다. 공식 출처 근거, 사람 source check, 최종 편집 승인, 면허 의료 검토는 각각 독립 기록으로 유지한다.

Batch 0에서는 실제 환자·사용자 경험을 사용하지 않는다. `GENERAL_EVERYDAY_EXAMPLE` 또는 명시된 `COMPOSITE_SCENARIO`만 허용한다.

## I. Reader-Test Status

`HUMAN_READER_TEST_PENDING`

실제 비의료 한국어 독자 3명의 원문 응답이 필요하다. 같은 세 명이 네 페이지를 모두 평가할 수 있지만 각 파일럿마다 세 참가자의 응답이 있어야 한다. 응답·점수·인용을 만들거나 추정하지 않고 개인 의료정보를 기록하지 않는다.

## J. Validation

- 네 draft: `status: draft`·`editorial_state: PUBLICATION_BLOCKED`·`noindex: true`
- author: `HUMAN_INPUT_REQUIRED`
- medical reviewer: `NOT_MEDICALLY_REVIEWED`
- story: `GENERAL_EVERYDAY_EXAMPLE`
- claim registry 45개 전부 `PENDING_HUMAN_SOURCE_CHECKER`, `medical_review_required: YES`, `medical_review_status: NOT_STARTED`, `PUBLICATION_BLOCKED`
- reader response: 실제 응답 없음, `HUMAN_READER_TEST_PENDING`
- official source URL 존재만으로 source check나 medical review 완료를 주장하지 않음

## K. Git / Production Safety

- 격리 worktree: `codex/biz2lab-v3-health-education-rebuild`
- 기준 commit: `cde7471f339f00e962f5d1a560f3226b7a2b6985`
- 변경 범위: `docs/health-v3/**`
- commit·push·PR·merge·Preview·Production·Google console write 금지
- 기존 B2B route·content·navigation·metadata·canonical·sitemap·redirect 변경 금지

## L. Exact Next Owner Gate

다음 gate는 `P01_HEALTH_V3_OWNER_TRUST_INPUTS_CONFIRMED`다. Owner는 `batch0-owner-input-required.md`의 A–F를 실제 값으로 작성한다. 의료 검수자가 없으면 C의 availability에 `NO`를 기록하고 나머지 실제 검수자 필드를 `N/A`로 둔다.

이 gate는 trust copy token 해소만 승인하며 public route·Preview·Production·SEO·AdSense·Search Console 변경을 승인하지 않는다.
