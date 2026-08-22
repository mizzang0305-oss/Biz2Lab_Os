# Biz2Lab V3 Site Architecture

## Positioning

> 쉽고 믿을 수 있는 건강 정보와 질병 설명을 제공하는 한국어 생활 건강 교육 사이트

의료기관, 진단 서비스, symptom checker가 아니다. 일반인이 질환을 이해하고 위험 신호를 놓치지 않으며 의료진과 더 나은 대화를 준비하도록 돕는 교육 publication이다.

## Primary navigation

1. 질환별 보기
2. 증상별 안내
3. 생활습관·예방
4. 가족 돌봄
5. 응급 신호
6. 건강용어
7. 출처·편집 원칙

모바일에서는 위 항목을 4개 primary와 “더보기”로 접을 수 있으나 응급 신호는 항상 한 번에 접근 가능해야 한다.

## Route model

```text
/ko
/ko/conditions
/ko/conditions/[cluster]
/ko/conditions/[cluster]/[slug]
/ko/symptoms
/ko/symptoms/[slug]
/ko/prevention
/ko/prevention/[slug]
/ko/family-care
/ko/family-care/[slug]
/ko/emergency-signs
/ko/glossary
/ko/glossary/[term]
/ko/about
/ko/author/biz2lab
/ko/editorial-policy
/ko/medical-review-policy
/ko/sources-policy
/ko/corrections-policy
/ko/contact
/ko/privacy
/ko/terms
/ko/disclaimer
/ko/advertising
```

기존 dynamic route와 충돌하지 않도록 실제 구현 시 category slug migration을 테스트한다. 경로는 이번 architecture 초안이며 Production contract가 아니다.

## Disease clusters

| Cluster | Core topics | Primary reader job |
|---|---|---|
| 심장·혈관 | 고혈압, 이상지질혈증, 심근경색 | 수치 이해·위험 신호·예방 |
| 대사·내분비 | 당뇨병, 비만, 갑상선 기능 이상 | 검사와 장기 관리 이해 |
| 호흡기·감염 | 인플루엔자, 폐렴, 천식 | 감기와 구분·호흡 경고·예방 |
| 위장·간 | 지방간, 위식도역류질환 | 검진 발견·생활 악화요인·red flag |
| 뇌·마음 | 뇌졸중, 우울장애, 치매, 편두통 | 응급 구분·도움 요청·가족 지원 |
| 뼈·관절 | 골다공증, 골관절염 | 골절·낙상 예방과 기능 유지 |
| 피부·알레르기 | 알레르기비염, 아토피피부염 | 악화요인·민간요법 오해·가족 관리 |
| 비뇨기·신장 | 요로감염 | 하부·상부 감염 구분과 진료 시점 |

## Article anatomy

필수 순서는 고정하지 않되 다음 learning object는 모두 있어야 한다.

- 한눈에 보기
- 쉬운 정의
- 몸이 보내는 신호
- 혼동하기 쉬운 점
- 응급 또는 빠른 진료 기준
- 의사가 확인하는 방법
- 치료의 목적과 범주
- 오늘 할 수 있는 행동
- 하지 말아야 할 자가판단
- 어린이도 이해하는 비유
- 가족·돌봄 checklist
- FAQ
- 출처·검토일·교육 목적 면책

## Schema policy

- 기본: `Article`, `BreadcrumbList`
- FAQ: 화면에 실제 표시되고 중복·홍보성이 없을 때만 `FAQPage`
- `MedicalWebPage` 또는 의료 전문직 schema는 실제 자격·검토 workflow가 검증되기 전 사용하지 않는다.
- author는 실제 운영 주체를 표시하고 의사 자격을 암시하지 않는다.

## Indexability rollout

1. research/draft는 repository 내부이며 public route에 포함하지 않는다.
2. source-checked + human editorial review를 통과한 batch만 Preview에 노출한다.
3. Production 이전에는 old/new sitemap, canonical, internal links, 404를 비교한다.
4. legacy redirect와 removal은 Search Console evidence 및 Owner 승인 후 별도 change set으로 수행한다.
