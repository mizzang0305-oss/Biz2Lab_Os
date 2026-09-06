# 제2형 당뇨병 — 질환 2/20

2026-09-06 · `/health/type-2-diabetes` · LOCAL candidate · **SEO_PAGE_CERTIFIED**

## 현재 GSC와 의도

개별 검사 INDEXED, smartphone Googlebot fetch 성공, crawl/index 허용, Google/user self canonical. 수집한 positive performance rows에 이 페이지의 쿼리는 없으며 검색량/순위를 추정하지 않는다. 주 의도는 증상과 혈당 검사의 의미, 부 의도는 공복 준비·가정 기록·저혈당·개인 대처 계획이다.

## SERP·일차 자료 벤치마크

| 자료 | 제목/깊이/시각/신뢰 패턴 | 이 페이지의 차이 |
|---|---|---|
| [KDCA 제2형 당뇨병](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5305) | 질환 전반·진단·관리, 설명 그림, 공공기관/2026-04-29 갱신 | 수치를 판정하지 않고 검사표에서 물을 질문을 앞에 배치 |
| [NIDDK Type 2 Diabetes](https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/type-2-diabetes) | 원인·증상·관리의 환자용 설명, 관련 자료 링크 | 음식 탓으로 단순화하지 않고 증상 없는 발견 경로도 설명 |
| [NIDDK Tests & Diagnosis](https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis) | 검사별 준비와 역할, 진단 기준을 다루는 공식 자료 | 공복혈당/HbA1c/가정 측정의 역할 비교; 진단 cutoff 복제 없음 |
| [CDC Low Blood Sugar](https://www.cdc.gov/diabetes/about/low-blood-sugar-hypoglycemia.html) | 저혈당 증상·대처 중심, 구체적인 환자 교육 | 자가 용량 지시 없이 개인 대처 계획과 응급 도움 경계를 설명 |
| [CDC DKA](https://www.cdc.gov/diabetes/about/diabetic-ketoacidosis.html) | 응급 증상과 즉시 도움, 2024-05-15 | 제2형에서도 가능함과 구토·호흡 이상 때 기다리지 않는 행동 |

검색 결과의 정확한 순위는 주장하지 않는다. 원문/그림을 복제하지 않았다. 다른 기존 7개 출처와 신규 CDC/NHS 저혈당 자료를 모두 9/6 대조했다. NHS의 **last reviewed 2023-08-03**과 **next review due 2026-08-03**은 구분했다.

## 변경과 고유 가치

이전에는 일반적인 숫자의 흐름/가족 관찰에 치우치고 FAQ가 3개였다. 이제 TEST_RESULT_FIRST로 검사 역할 비교 → 인슐린 개념 → 증상/검진 → 관리 → 저혈당·아픈 날 계획 → 응급 → 가족 기록을 배치한다.

- Title: **제2형 당뇨병 증상·검사: 공복혈당과 당화혈색소 | 오누림**
- H1: **제2형 당뇨병, 증상부터 혈당 검사와 기록까지** — 1개.
- Description: 세 검사/기록의 구분, 무증상 검사 상담, 저혈당·응급, 혼자 약을 조절하지 않는 범위를 요약한다.
- 고유 가치 1: 검사 준비와 실제 진료 질문을 연결한 3행 비교표. 가치 2: 평소 저혈당/아픈 날 개인 계획을 미리 묻는 질문과 즉시 응급 행동의 분리. INTERNAL_HEURISTIC이며 공식 순위 요소가 아니다.
- FAQ 6개: 음식만의 문제인지, 무증상, 기록값에 따른 약, HbA1c/공복혈당, 공복 준비, 저혈당 가능성. 각 질문은 별도 의도를 해결한다.

## 출처·의료안전

7개 section/6개 FAQ sourceIds가 실제 페이지의 9개 출처 anchor로 연결된다. `../raw/source-deltas-type-2-diabetes.csv`에 신규/수정 P0/P1 개념을 기록했다. 기존 144 claim 문장 및 47개 패킷을 덮어쓰지 않았다. 기존 패킷이 신규 문장을 전부 포함한다는 주장은 하지 않으며 향후 의료 검토 시 delta를 함께 전달해야 한다.

의식 저하·반응 없음·경련은 **어느 하나라도** 즉시 119, 안전하게 삼킬 수 없으면 음식/음료를 주지 않는다. 응급 행동을 혈당 확인이나 모든 증상 출현까지 미루지 않는다. 약은 인터넷 정보로 임의 변경하지 않되 이미 처방받은 개인 조절 계획을 무효화하지 않는다. 수치 cutoff·용량·확정 진단을 추가하지 않았다.

독립 Astra read-only 원문 검토에서 P0/P1 blocker와 출처 누락을 발견하지 못했다. 이는 **AI 출처 대조이지 의료인 검수 완료가 아니다**. 박영훈/비의료인 편집자, 의료 검수 미완료, 실제 독자 테스트 미실시를 유지한다.

## 이미지·링크·날짜·schema

기존 4개 WebP를 직접 보고 유지했다. process는 포도당/인슐린 비유로 해부도 아님을, warning은 세 장면이 모두 나타날 때까지 기다리는 순서도가 아님을 HTML caption에 명시했다. alt/크기/본문 연관성 및 5폭 실제 로딩 확인. manifest의 해당 caption만 정렬했고 새 이미지 생성은 없었다.

HbA1c·검사표·복용약 목록·위험 신호·고혈압·해당 질환 도구 및 작성자/출처 정책을 문맥 연결했다. 관련 없는 질환 링크는 추가하지 않았다. 모든 출처/내부 anchor 결손 0.

실제 발행 8/26, 이번 수정/출처 대조 9/6. Article/Breadcrumb와 UI 날짜 일치, 허위 reviewedBy/Physician/FAQPage 없음. HTTPS www self canonical, HTTP 200/SSR/index 허용/sitemap 실제 lastmod를 확인했다.

## Before / after

| 관측 | Production | local |
|---|---|---|
| 토큰화 word count | 594 | 946; 길이가 목표는 아님 |
| FAQ / 비교표 | 3 / 0 | 6 / 1 |
| 출처 / 이미지 / 도구 | 7 / 4 / 4 | 9 / 4 / 4 |
| distinct internal outlink | 19 | 24 |
| inlink/depth | HTML 6/1, 가시성 미검증 | 단일 페이지 감사에서는 미산출; 전체 그래프 후속 |
| Schema | Article | 실제 날짜/이미지 Article + Breadcrumb |

## 최종 QA

| gate | 근거 |
|---|---|
| INTENT_PASS | 검사와 증상·기록·개인 계획 의도에 집중 |
| TITLE_PASS | 실제 비교 내용에 맞는 고유 title |
| DESCRIPTION_PASS | 범위 일치, 과장/공포/진단 보장 없음 |
| H1_PASS | 단일 자연어 H1 |
| CONTENT_UNIQUENESS_PASS | 검사 역할 표와 저혈당/아픈 날 질문이라는 별도 가치 |
| MEDICAL_SOURCE_PASS | 9개 원문/모든 sourceIds 대조 + 독립 AI 확인; 임상 검수 아님 |
| INTERNAL_LINK_PASS | 문맥 링크·출처 anchor, 결손 0 |
| IMAGE_PASS | 4개 원본 확인 및 오해 예방 caption |
| MOBILE_PASS | 360/390/430/768/1440, overflow 0, 표/FAQ 키보드/이미지/메뉴/출처/응급 시각 확인 |
| SCHEMA_PASS | 실제 저자/날짜 Article와 Breadcrumb JSON 유효 |
| CANONICAL_PASS | HTTPS www self canonical |
| INDEXABILITY_PASS | 200, SSR, index 허용, sitemap/실제 lastmod |

증거 `../raw/page-qa/type-2-diabetes.json`, 로컬 screenshot/SEO JSON·CSV는 ignored `reports/local/onurim-seo-v2/type-2-diabetes/`. **249/249 tests**, typecheck PASS, lint 오류 0/기존 경고 1, build PASS(116 routes), health audit PASS, 단일 SEO/5폭 QA fail 0. source 수 69→71에 맞춰 고정 개수 테스트를 갱신한 뒤 전부 재실행했다. 47개 패킷 해시 `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64` 보존.

`SEO_PAGE_CERTIFIED`는 local 한정. Preview/Production/색인 요청 없음. 다음 질환은 알레르기 비염이다.
