# HbA1c — 첫 순차 인증

2026-09-06 · `/health/guides/understanding-hba1c` · LOCAL candidate only · `SEO_PAGE_CERTIFIED`

이 인증은 아래 SEO·출처 대조·UI 항목의 내부 QA 결과다. Google 색인/순위 보장, 의료인 검수, 실제 독자 검증을 뜻하지 않는다. Production은 수정하지 않았다. 전체 Preview 회귀 검사는 후속 단계다.

## 현재 GSC와 검색 의도

- 개별 URL 검사: INDEXED, 스마트폰 Googlebot, 가져오기 성공, crawl/index 허용, 양쪽 canonical 일치. 원본은 `../raw/gsc-url-inspections-2026-09-06.json`.
- exact page filter의 실제 쿼리: `hba1c 뜻`, `hba1c`, `hba1c ngsp` 각각 노출 1회. 페이지 노출 4회와 공개 쿼리 합계 3회는 서로 다를 수 있다. 클릭 0은 개선 전 관측이며 효과 예측이 아니다.
- 주 의도: 결과지에서 HbA1c·NGSP가 무엇인지 이해하기. 부 의도: IFCC 단위, 공복혈당과 차이, 결과 불일치 시 질문.
- 새 URL 없이 기존 문서에서 해결한다. 검사 판정·개인 목표·용량 계산은 제공하지 않는다.

## SERP·벤치마크와 차별화

`../06-serp-research.md`의 NIDDK, NGSP 표준화, NGSP 영향 요인, 서울아산병원 4개 일차 자료를 비교했다. 공공기관의 검사 의미/기간 설명, 전문기관의 보고 단위, 대학병원의 한국어 교육을 참고하되 문장·표를 복제하지 않았다. 고정 검색 순위나 경쟁 페이지의 트래픽은 관측하지 않았다.

기존 문서는 짧은 개요와 두 출처에 그쳐 실제 `NGSP` 쿼리를 충분히 해결하지 못했다. 후보는 (1) HbA1c NGSP·IFCC·공복혈당을 이름/단위/시간 범위로 구분하는 독자적 HTML 표, (2) 수치 없는 가상 결과표 읽기 순서와 세 가지 진료 질문을 제공한다. 이는 내부 가치 판단이지 Google의 공식 두 가지 요건이 아니다.

## 제목·설명·구조

- Title: **당화혈색소 HbA1c 뜻: NGSP·IFCC와 공복혈당 차이 | 오누림**
- H1: **당화혈색소(HbA1c), 검사표의 NGSP·IFCC부터 읽기** — 1개.
- Description: **HbA1c가 보여 주는 기간, NGSP·IFCC 단위와 공복혈당의 차이를 비교합니다. 결과표에서 확인할 항목과 수치가 엇갈릴 때 의료진에게 물을 질문을 정리했습니다.**
- TEST_RESULT_FIRST: 기간 → 보고 체계 비교 → 결과표 읽기 → 결과 불일치 → 진료 질문 → 하지 않는 판단.
- FAQ 5개는 검사 의미·금식·NGSP·진단 오해·수치 차이를 각각 해결한다. 본문 HTML에 존재하며 키보드로 열 수 있다. FAQPage schema/rich-result 보장은 없다.

## 출처·의료안전 대조

| 변경 문장/개념 | 일차 출처 | 위험 관리 |
|---|---|---|
| 최근 약 3개월 평균적 혈당, 한 시점 혈당과 범위 차이 | [NIDDK A1C](https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test), [서울아산병원](https://www.amc.seoul.kr/asan/depts/dm/K/bbsDetail.do?contentId=271421&menuId=5110) | 진단 cutoff·개인 치료 목표를 추가하지 않음 |
| NGSP %, IFCC mmol/mol; 공복혈당 mg/dL 또는 mmol/L | [NGSP IFCC](https://ngsp.org/ifccngsp.asp) | 체계/단위를 구분하며 숫자 직접 비교·변환기 없음 |
| 빈혈·적혈구 수명·수혈·검사 방법 등의 영향 | [NGSP Factors](https://ngsp.org/factors.asp), NIDDK | 모든 상태가 같은 방향으로 영향을 준다고 일반화하지 않음 |
| 결과 차이는 원본과 함께 의료진에게 질문 | NIDDK | 자가 확진·약 변경 유도 없음 |

주 오케스트레이터가 원문과 변경 표현을 대조했고, 별도 Astra 연구 Agent도 읽기 전용으로 독립 대조하여 사실/안전 blocker를 발견하지 않았다. **둘 다 AI 검토이며 면허 의료인 검수가 아니다.** NGSP Factors의 2026-06-23 갱신, NIDDK의 과거 검토일과 날짜 미표시 문서를 구분했다. 모든 source ID/anchor가 실제 출처로 연결된다. 기존 47개 면허 검토 패킷은 변경하지 않았다.

## 시각자료·링크·신뢰

- IMAGE_PASS: 불필요한 의료 그림을 생성하지 않고 정확한 단위 관계를 전달하는 HTML 비교 시각자료를 선택했다. bitmap 0개, caption 1개, 표 semantics와 모바일 열 이름을 유지한다.
- 360/390/430에서는 카드형, 768/1440에서는 표. 다섯 폭의 화면을 확인했고 좁은 폭에서 숫자·단위 오독/가로 잘림을 발견하지 않았다.
- 제2형 당뇨병, 검사표 읽기, 당뇨병 질문 도구, 위험 신호와 문맥 링크. 19개 distinct 내부 outlink. 단일 route 감사로 전체 inbound/depth를 재계산하지 않았으므로 `NOT_AUDITED_SINGLE_ROUTE`로 명시한다. 전체 그래프는 후속 재감사한다.
- 실제 작성자 박영훈/비의료인 건강정보 편집자, 의료 검수 미완료를 표시한다. 발행 2026-08-26은 최초 도입 Git 이력, 수정/출처 확인 2026-09-06은 이번 변경에 따른다.
- 공통 CSS의 오래된 전역 header/footer 숨김 규칙이 실제 메뉴와 footer까지 가리는 것을 스크린샷으로 발견해 후보에서 제거했다. DOM에 링크가 있다는 baseline 수치는 가시성 증거가 아니었다.

## Before / after

| 지표 | Production before | local candidate |
|---|---|---|
| 토큰화 word count | 107 | 567; 길이는 성공 기준 아님 |
| 출처 | 2 | 4 |
| 독립 비교표/FAQ | 없음 | HTML 표 1 / FAQ 5 |
| 구조화 데이터 | Organization, WebSite | 기존 + Article, BreadcrumbList |
| HTTP / canonical | 200 / self | 200 / self |
| sitemap | 포함 | 포함, lastmod 2026-09-06 |

Article의 작성자/날짜/내용은 UI와 일치하고 reviewedBy·Physician·의료인 검수 완료 표현이 없다. 핵심 콘텐츠는 SSR HTML에 있다. robots는 index 허용이며 Preview 보호 여부와 검색 metadata는 별개다.

## 최종 QA — 이 페이지를 마친 뒤 다음 페이지로 진행

| gate | 판정 근거 |
|---|---|
| INTENT_PASS | live HbA1c/NGSP 쿼리와 결과표 이해 의도 일치 |
| TITLE_PASS | 실제 본문의 HbA1c·단위 비교를 고유하게 요약 |
| DESCRIPTION_PASS | 수치 설명 범위를 정확히 표현; 과장 없음 |
| H1_PASS | 자연스러운 질문 맥락, 단일 H1 |
| CONTENT_UNIQUENESS_PASS | 보고 체계 비교 + 비수치 예시/질문; 다른 가이드 복제 아님 |
| MEDICAL_SOURCE_PASS | 일차 출처 4개 직접 대조 및 독립 AI 대조; 면허 검수 아님 |
| INTERNAL_LINK_PASS | 관련 질환/지원/도구/출처 연결, anchor 결손 0 |
| IMAGE_PASS | 텍스트 기반 정확한 비교 시각자료, 반응형/접근성 검토 |
| MOBILE_PASS | 360/390/430/768/1440 모두 overflow 0, 메뉴/footer 가시, FAQ 키보드 통과 |
| SCHEMA_PASS | Article/Breadcrumb 사실성·JSON 유효, FAQ 의료인 허위 표기 없음 |
| CANONICAL_PASS | Production 정규 URL과 일치 |
| INDEXABILITY_PASS | 200, SSR, index 허용, sitemap 포함 |

증거: `../raw/page-qa/understanding-hba1c.json` (5폭 결과와 screenshot SHA-256). 실제 PNG와 단일 URL HTTP 감사는 ignored `reports/local/onurim-seo-v2/understanding-hba1c/`에 보관.

검증: `npm test` **247/247**, `npm run typecheck` PASS, `npm run lint` 오류 0/기존 경고 1, `VERCEL_ENV=preview npm run build` PASS(116 routes), `npm run audit:health-v3` PASS(47개 패킷 해시 보존), 단일 페이지 SEO 감사 fail 0, 5폭 Playwright fail 0, `git diff --check` PASS.

환경 시행착오: Turbopack dev cache가 이전 CSS를 유지했다. 별도 Webpack 시도는 기존 CSS Modules global selector 제약으로 실패했다. task-generated cache만 `node_modules/.cache/seo-v2-dev-cache-before-reset`로 보존하고 Turbopack을 재시작해 가시성 및 빌드를 재검증했다. 사용자 파일/Production은 변경하지 않았다.

상태: `SEO_PAGE_CERTIFIED` (local). `REAL_HUMAN_READER_TEST=NOT_PERFORMED`, `MEDICAL_REVIEW_COMPLETED=NO`. Google 재색인 요청 0, Production deploy 0.
