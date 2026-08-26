---
surface: medical-review-disclosure
status: DRAFT_NOT_PUBLISHED
required_owner_inputs:
  - PUBLIC_HEALTH_BRAND_NAME
  - LICENSED_MEDICAL_REVIEWER_DETAILS_OR_NONE
---

# Medical Review Disclosure 공개 문구 초안

# 의료 검토 정책

{{PUBLIC_HEALTH_BRAND_NAME}}는 출처 확인과 면허 의료 검토를 서로 다른 절차로 관리합니다. 공식 출처와 문장을 사람이 대조했다는 사실만으로 의료 검토 완료를 표시하지 않습니다.

고혈압과 제2형 당뇨병은 private source-check 후보로 진행할 수 있지만, 그 안의 응급·진단·검사·치료·약물·특수 대상 고위험 claim은 실제 면허 의료 검토가 필요합니다. 뇌졸중과 심근경색은 페이지 전체가 공개 준비 전에 실제 면허 의료 검토를 받아야 합니다. 검토자는 자신이 맡은 범위의 정의, 증상, 응급 신호, 검사 설명, 치료 범주, 약물 경계, 생활 관리, 보호자 행동과 교육용 시각물의 의학적 의미를 확인합니다.

의료 검토 기록에는 글 버전, 검토 범위, 확인한 주장과 출처 버전, 검토일, 결과, 수정 요청과 미해결 이견을 남깁니다. 한 글의 검토를 다른 질환, 다른 버전 또는 전체 사이트의 보증으로 확대하지 않습니다.

## 페이지별 표시 계약

실제 검토가 완료된 페이지에만 다음 정보를 표시합니다.

```text
의료 검토: {{REVIEWER_REAL_NAME}}
면허 분야: {{LICENSE_CATEGORY}}
소속: {{PUBLIC_AFFILIATION_IF_APPROVED}}
검토 범위: {{ARTICLE_SPECIFIC_REVIEW_SCOPE}}
검토일: {{REVIEWED_AT}}
결과: 면허 의료 검토 완료
```

소속은 검수자가 공개를 승인한 경우에만 표시한다. 면허 번호 원문은 public repository나 공개 페이지에 저장하지 않는다.

## 검수자 `NONE` 처리

실제 면허 의료 검수자가 없으면 내부 상태를 다음처럼 기록한다.

```text
licensed_medical_reviewer = NONE
medical_review_status = NOT_MEDICALLY_REVIEWED
publication_status = PUBLICATION_BLOCKED
```

이 상태에서는 뇌졸중·심근경색과 모든 고위험 claim을 공개하지 않으며 `전문가 검토`, `의학 검수 완료` 또는 유사 badge를 표시하지 않는다. 네 파일럿은 다른 Owner·source·reader·trust gate도 충족하지 않았으므로 모두 `PUBLICATION_BLOCKED`를 유지한다.

## 재검토 조건

응급 행동, 진단 기준, 검사 수치, 약물·치료, 특수 대상, 주요 의학 시각물 또는 핵심 출처가 바뀌면 의료 의미 변경 여부를 판단하고 필요한 재검토를 완료할 때까지 공개 준비 상태를 중단합니다.
