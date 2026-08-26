---
type: content-status
project: ONURIM_HEALTH_V3
status: ONURIM_PUBLIC_HEALTH_SITE_READY
updated: 2026-08-26
tags: [health-v3, onurim, status, publication-gate]
---

# 오누림 Health V3 콘텐츠 상태

## 공개 포트폴리오 구현

- 브랜드: `오누림 / ONURIM`
- 주요 질환 가이드: 총 20개
- 생활 건강 지원 가이드: 총 9개
- Claim registry: 총 144개
- 공식 출처 레코드: 총 69개
- 행동 도구: 총 34개, 브라우저·인쇄용, 서버 저장 없음
- 원본 시각자료: 총 62개
- 신뢰 시스템: 소개, 작성자, 편집, 출처, 의료 검토, 정정·문의, AI 공개, 광고, 면책, 개인정보, 이용약관
- 실동작 정정 경로: Biz2Lab 공개 GitHub Issues
- 미검증 주소 `health@biz2lab.com`: 공개 연락처로 사용하지 않음

## 공개 의료 안전 판정

기존 47개 의료 검토 대상 Claim은 삭제하거나 검토 완료로 바꾸지 않았다. `ONURIM_MEDICAL_REVIEW_PACKAGE_READY` 패킷과 hash를 그대로 유지한다.

공개 문장에는 별도 비임상 편집 안전 판정을 적용했다.

- `KEEP_AS_SAFE_GENERAL_EDUCATION`
- `SIMPLIFY`
- `REMOVE`
- 공개 P0/P1 안전 판정: 75개
- `UNRESOLVED_PUBLIC_HIGH_RISK_CLAIM = 0`
- 개인 진단·치료 선택·약물 용량·약 중단 지시: 허용하지 않음
- P0 신규 응급 문장: 권위 출처 2개 이상 연결

이 판정은 면허 의료인 검수가 아니다.

## 의료 검토와 독자 검증 사실

- `ONURIM_MEDICAL_REVIEW_PACKAGE_READY`
- `LICENSED_REVIEWER_SOURCING`
- `REVIEWER_ASSIGNED = NO`
- `ONURIM_MEDICAL_REVIEW_IN_PROGRESS = NO`
- `MEDICAL_REVIEW_COMPLETED = NO`
- `REAL_HUMAN_READER_TEST = NOT_PERFORMED`
- `SYNTHETIC_READER_SIMULATION = COMPLETED`

## 현재 실행 gate

`ONURIM_PUBLIC_HEALTH_SITE_READY`는 2026-08-26 로컬 검증에서 소스·브라우저·접근성·모바일·링크·메타데이터·이미지 조건을 통과했다는 공개 후보 상태다. 실제 Production 배포·검색 등록·AdSense 검토 상태와는 별개이며, 내부 의료 검토판은 Production에서 계속 차단한다.
