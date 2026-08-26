---
surface: medical-review-disclosure
status: DRAFT_NOT_PUBLISHED
owner_tokens: [PUBLIC_HEALTH_BRAND_NAME, LICENSED_MEDICAL_REVIEWER_DETAILS_OR_NONE]
---

# 의료 검토 정책

{{PUBLIC_HEALTH_BRAND_NAME}}는 source check와 licensed medical review를 서로 다른 절차로 관리합니다. 공식 출처와 문장을 사람이 대조했다는 사실만으로 의료 검토 완료를 표시하지 않습니다.

고혈압과 제2형 당뇨병은 private source-check 후보로 진행할 수 있지만, 그 안의 응급·진단·검사·치료·약물·특수 대상 고위험 claim은 실제 면허 의료 검토가 필요합니다. 뇌졸중과 심근경색은 페이지 전체가 공개 준비 전에 실제 면허 의료 검토를 받아야 합니다. 검토 기록에는 글 version, 검토 범위, claim IDs, source versions, 검토일, 결과, 수정 요청과 미해결 이견을 남깁니다.

실제 검토가 완료된 페이지에만 다음 정보를 실제 record와 일치하게 표시합니다.

```text
의료 검토: {{REVIEWER_REAL_NAME}}
면허 분야: {{LICENSE_CATEGORY}}
소속: {{PUBLIC_AFFILIATION_IF_APPROVED}}
검토 범위: {{ARTICLE_SPECIFIC_REVIEW_SCOPE}}
검토일: {{REVIEWED_AT}}
결과: 면허 의료 검토 완료
```

소속은 공개 동의가 있을 때만 표시하며 면허 번호 원문은 공개 저장소에 기록하지 않습니다.

실제 reviewer가 없으면 내부 record는 다음 상태를 유지합니다.

```text
licensed_medical_reviewer = NONE
medical_review_status = NOT_MEDICALLY_REVIEWED
publication_status = PUBLICATION_BLOCKED
```

이 경우 뇌졸중·심근경색과 모든 고위험 claim을 공개하지 않고 `전문가 검토` 또는 유사 badge를 표시하지 않습니다. 네 파일럿은 다른 Owner·source·reader·trust gate도 충족하지 않았으므로 모두 `PUBLICATION_BLOCKED`를 유지합니다.
