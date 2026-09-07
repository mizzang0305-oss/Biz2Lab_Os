# 콘텐츠 유사성: baseline

INTERNAL_HEURISTIC. 공백 토큰 Jaccard는 한국어 의미 중복이나 Google 임계값을 판정하지 않는다. 본문 앞 300 토큰/제목 문자열/FAQ 문자열을 각기 비교한다. 공통 안전 고지와 내비게이션으로 값이 높아질 수 있다.

190 쌍 기준. 개선 후 동일 감사로 비교 예정; 현재는 before만 존재한다.

```json
{
  "first300": [
    {
      "a": "/health/asthma",
      "b": "/health/sleep-apnea",
      "first300WordJaccard": 0.393,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/asthma",
      "b": "/health/urinary-tract-infection",
      "first300WordJaccard": 0.365,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/asthma",
      "first300WordJaccard": 0.363,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/sleep-apnea",
      "b": "/health/urinary-tract-infection",
      "first300WordJaccard": 0.361,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/urinary-tract-infection",
      "first300WordJaccard": 0.358,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    }
  ],
  "headings": [
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/anxiety-disorder",
      "first300WordJaccard": 0.288,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/asthma",
      "first300WordJaccard": 0.363,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/depression",
      "first300WordJaccard": 0.257,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/dyslipidemia",
      "first300WordJaccard": 0.283,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/gout",
      "first300WordJaccard": 0.291,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    }
  ],
  "faq": [
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/anxiety-disorder",
      "first300WordJaccard": 0.288,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/asthma",
      "first300WordJaccard": 0.363,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/depression",
      "first300WordJaccard": 0.257,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/dyslipidemia",
      "first300WordJaccard": 0.283,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    },
    {
      "a": "/health/acute-myocardial-infarction",
      "b": "/health/gout",
      "first300WordJaccard": 0.291,
      "headingJaccard": 0.571,
      "faqJaccard": 0.333
    }
  ]
}
```

14개 확장 질문 카드의 동일 description, 이미지 fallback 중복, 공통 section 순서/FAQ 리듬을 개별 dossier에서 추가로 정성 검토한다. 낮은 수치만으로 고유 가치 PASS를 부여하지 않는다.
