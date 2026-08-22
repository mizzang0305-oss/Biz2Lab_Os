# First-wave 상대적 편집 위험 분류

상태: `PRIVATE_PLANNING_ONLY`

이 분류는 내부 제작 순서를 정하기 위한 상대적 heuristic이다. 의료 안전 판정, 공개 승인 또는 Google 정책 기준이 아니다.

## LOWER_RELATIVE_EDITORIAL_RISK

- hypertension / 고혈압
- type 2 diabetes / 제2형 당뇨병

`LOWER_RELATIVE_EDITORIAL_RISK`는 비의료 주제이거나 검수 없이 공개해도 안전하다는 뜻이 아니다. 두 주제는 private `SOURCE_CHECKED` 후보까지 진행할 수 있지만 Owner 정체성 승인, 실제 정정 연락처, claim 검증, 사람 독자 테스트, trust page 승인 전에는 공개할 수 없다. 응급·진단·검사·치료·약물·특수 대상 claim은 별도 면허 검토가 필요하다.

## HIGHER_CLINICAL_RISK

- stroke / 뇌졸중
- myocardial infarction / 심근경색

두 주제는 `LICENSED_REVIEW_REQUIRED` 및 `PUBLICATION_BLOCKED`다. 실제 자격 있는 검수자와 문서별 검토 기록이 없으면 상태를 승격하지 않는다.

## 향후 상대적 저위험 후보

아래는 향후 공식 출처 검토 후 테스트할 수 있는 후보일 뿐 이번 batch의 초안·제작·게시 대상이 아니다.

- allergic rhinitis / 알레르기 비염
- gastroesophageal reflux disease / 위식도 역류질환
- osteoarthritis / 골관절염
- constipation / 변비 또는 공식 출처 검토를 거친 유사한 흔한 저중증도 주제

현재 결정: `DO_NOT_DRAFT` · `DO_NOT_PUBLISH`
