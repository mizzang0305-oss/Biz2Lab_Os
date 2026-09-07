# 검색 의도·공식 정책 연구

조사일 2026-09-06. 연구는 Astra xhigh 연구 Agent가 병렬로 수행했고 파일·페이지 쓰기는 주 오케스트레이터가 순차 수행한다. 검색 결과의 위치는 지역·시각·개인화에 따라 달라지므로 조사 결과를 고정 순위나 수요량으로 표현하지 않는다. 개별 의학 자료·질환별 의도는 해당 page dossier에 연결한다. 벤치마크의 문장·도표·삽화는 복제하지 않는다.

## Google 공식 요건과 내부 판단 분리

| label | 결론 | 공식 근거 |
|---|---|---|
| OFFICIAL | 접근 가능한 200 문서와 indexable 콘텐츠는 기본 요건이지 색인 보장 아님 | [Technical requirements](https://developers.google.com/search/docs/essentials/technical) |
| OFFICIAL | noindex를 읽으려면 Googlebot의 접근을 막지 않아야 함 | [Block indexing](https://developers.google.com/search/docs/crawling-indexing/block-indexing) |
| OFFICIAL | sitemap에는 원하는 canonical을 넣고 lastmod는 실제 중요한 변경을 반영 | [Build a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) |
| OFFICIAL | canonical은 신호이며 Google이 다른 URL을 선택할 수 있음 | [Canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) |
| OFFICIAL | 명료하고 고유한 title과 페이지 내용의 일관성; title rewrite 자체는 버그 아님 | [Title links](https://developers.google.com/search/docs/appearance/title-link) |
| OFFICIAL | snippet은 페이지 본문이나 description에서 생성; 동일 표시 보장 없음 | [Snippets](https://developers.google.com/search/docs/appearance/snippet) |
| OFFICIAL | Article은 실제 제목·저자·이미지·날짜와 일치해야 함 | [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article) |
| OFFICIAL | Breadcrumb은 실제 구조를 나타냄; Google 모바일 breadcrumb 표시는 중단됨 | [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) |
| OFFICIAL | 저자 전용 페이지에 사실인 Person/ProfilePage를 사용 가능 | [Profile page](https://developers.google.com/search/docs/appearance/structured-data/profile-page) |
| OFFICIAL | 보이지 않거나 허위인 structured data 금지 | [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) |
| OFFICIAL | FAQ rich result는 2026-05-07 종료; 2026-06-15 문서 제거 공지. 과거 의료/정부 사이트 예외를 현재 정책으로 인용하지 않음 | [Google documentation updates](https://developers.google.com/search/updates) |
| OFFICIAL | 문맥 있는 이미지·alt·적절한 크기와 접근 가능한 URL 사용 | [Image SEO](https://developers.google.com/search/docs/appearance/google-images) |
| OFFICIAL | 크롤링 가능한 href와 설명적인 anchor 사용 | [Links best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) |
| OFFICIAL | 반복 재크롤링 요청은 더 빠른 반영을 보장하지 않음 | [Ask Google to recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) |
| OFFICIAL | 일반 건강 글에는 Indexing API를 사용하지 않음 | [Indexing API scope](https://developers.google.com/search/apis/indexing-api/v3/using-api) |
| OFFICIAL | 도움이 되는 신뢰성 있는 콘텐츠와 사람 중심 작성; E-E-A-T는 단일 점수 아님 | [Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) |
| OFFICIAL | CWV field data와 lab 진단을 구분 | [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals), [GSC report](https://support.google.com/webmasters/answer/9205520?hl=en) |
| INTERNAL_HEURISTIC | 두 가지 독립 정보 가치·고유 FAQ·순차 12개 인증·59개 목표 surface | Owner 운영 QA; Google 공식 기준이나 최소 글자 수가 아님 |
| INTERNAL_HEURISTIC | 토큰·heading·FAQ Jaccard와 링크 깊이로 반복 위험 탐색 | 자동 수치는 의미·의료안전·검색수요를 판정하지 않음 |

## 실제 Query 출발점

`hba1c 뜻`, `hba1c`, `hba1c ngsp`는 authenticated GSC의 HbA1c exact page filter에서 각각 노출 1회로 확인했다. 3개의 작은 관측값은 기존 페이지를 개선할 근거이며 신규 URL, CTR 기대치, 순위 상승 예측 근거가 아니다. 공개 query가 없는 페이지는 검색 수요 0으로 판정하지 않는다.

## HbA1c 벤치마크

| 기관/문서 | 질문·설명 패턴 | 신뢰·깊이 | 오누림에 필요한 독립 가치 |
|---|---|---|---|
| [NIDDK A1C test](https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test) | 검사 의미, 기간, 공복 여부, 결과 차이 | 미국 공공기관의 환자용 설명 | 한국어 검사표에서 이름→단위→같은 날 혈당→다음 질문 순서 |
| [NGSP IFCC 표준화](https://ngsp.org/ifccngsp.asp) | NGSP·IFCC 결과 보고 체계 | 전문 표준화 프로젝트; 단위·방법 구분 | NGSP는 병명이나 중증도 등급이 아님을 설명하는 HTML 비교표 |
| [NGSP 영향 요인](https://ngsp.org/factors.asp) | 적혈구·검사 방법에 따른 영향 | 방법별 영향 표; 2026-06-23 갱신 | 빈혈 등을 모두 같은 방향 오차로 단순화하지 않는 질문 카드 |
| [서울아산병원 당뇨병센터](https://www.amc.seoul.kr/asan/depts/dm/K/bbsDetail.do?contentId=271421&menuId=5110) | 한국어 당화혈색소 교육 | 대학병원 환자 교육 맥락 | 숫자 목표를 복사하지 않고 결과표 용어와 진료 질문에 집중 |

계획: 기존 `/health/guides/understanding-hba1c`에서만 해결. NGSP/IFCC/HbA1c/공복혈당의 범위와 단위를 비교하고, 수치 없는 명확한 가상 검사표 예시와 검사 원본을 가져가는 질문을 제공한다. 개인 진단·목표치·약 변경 계산기 없음. FAQ는 독자가 읽는 HTML이며 FAQPage rich-result 주장 없음.
