# 검진 결과지 읽기 — Support 4/9

2026-09-06 · `/health/guides/reading-health-results` · LOCAL · SEO_PAGE_CERTIFIED

## 실제 GSC와 검색 의도

Fresh INDEXED, Google 마지막 크롤2026-08-27 오전7:13:45. 모바일/fetch성공/crawl·index허용/사용자·Google selfcanonical, sitemap·HbA1c 참조. 7일·28일·cutover 세 기간 모두 페이지1노출/0클릭/위치7; 중첩 기간이므로 세 노출로 합산하지 않는다. 개별 query JOIN은 없음. 이 소수 노출을 수요 크기·순위 개선 증거로 해석하지 않는다.

실제 검색은 국내 공식기관 검진결과·참고범위·결과상담을 살폈으며 Google 지역별 고정 순위·검색량·경쟁도를 측정하지 않았다. 독립 연구의 KDCA 총혈구/소변검사 예시는 참고 맥락일 뿐 Main이 그 본문을 직접 읽지 않아 공개 임상 예시로 채택하지 않았다.

Primary intent는 혈액·소변 검사 결과지의 숫자와 표시를 다음 진료 질문으로 바꾸기. 단일 검사 정상수치표, 국가검진 종합등급, 영상검사 판독이나 자가진단 페이지가 아니다. INDEX_SUPPORT 유지.

## Main 직접 확인한 4개 공식 benchmark

| 출처 | 실제 읽은 범위·날짜 | 채택 / 제외 |
|---|---|---|
| [MedlinePlus Lab results](https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/) | 본문 전체, Last updated2025-09-04 | 검사명/목적·참고범위·기관/단위 차이·양성/음성/불확정·위양성/위음성. 참고문헌2026날짜를 갱신일로 옮기지 않음 |
| [MedlinePlus Lab preparation](https://medlineplus.gov/lab-tests/how-to-prepare-for-a-lab-test/) | 본문 전체, Last updated2024-08-20 | 검사별 준비 확인·미준수 알리기·약/보충제 공유·임의 약중단 금지. 고정 금식시간·일괄 재검/취소 없음 |
| [NHS Blood tests](https://www.nhs.uk/tests-and-treatments/blood-tests/) | 본문 전체, 특히 Getting results까지, reviewed2023-11-02 | 결과 목적/설명/후속 연락. Next2026-11-02는 갱신일 아님. 영국 ‘몇 주’ 대기·항응고제중단 예시 미수입 |
| [서울아산병원 건강증진센터](https://health.amc.seoul.kr/health/personal/reference.do) | HTML본문 전체·결과상담129–160, 페이지 날짜 미표시 | 국내 결과 전달/상담 경로를 구분하는 기관 사례만. 특정3/7일 연락·복약중단·금식·CT/내시경 준비를 공통 지시로 옮기지 않음 |

공식 출처 대조는 면허 의료인 검수가 아니다. 원문 이미지·PDF를 복제하거나 실제 영상 재생으로 보고하지 않는다.

## 독립 가치·내부 링크

TEST_RESULT_FIRST: 이름·단위 → 4행 표시/질문표 → 양성·음성의 한계 → 이전 결과 비교 조건 → 담당자·기한·다음 행동 확인. 5sections/5FAQ/1표. 표의 불확정과 재검 행은 같은 정의가 아니라 후속 설명을 요청하는 질문 묶음이다. 참고범위 안팎에서 과잉진단과 거짓 안심을 모두 피하며, 모든 단일검사가 무의미하다고 주장하지 않는다.

H1: 건강검진 결과지, 숫자와 표시를 읽는 순서. Title: 건강검진 결과지 읽는 법: 참고범위·양성·재검 질문. Description은 실제 혈액·소변 범위와 일치한다.

문맥 링크5는 HbA1c 이름/단위, 이상지질혈증 개인위험, 약목록, 진료질문, 위험신호. 총outlinks19. FAQ에 임의 숫자·진단컷오프·치료 개시/중단 지시는 없다. 기존의 검증되지 않은 ‘오누림 도구도 값을 서버에 보내지 않습니다’ 포괄 약속을 이 결과지 페이지에서 제거했다.

## 원장·날짜·시각

새5표현은 `../raw/source-deltas-reading-health-results.csv`, licensed review NOT_COMPLETED. 7187cf9대비 전체144claims·47packets whole-record exact, 다른Support8 exact(독립 기술 검토). 기존 packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64` 보존. 실제 독자 NOT_PERFORMED/의료 검수 NO.

발행8/26·수정/대조9/6. SSR/UI/Article/sitemap 일치, selfcanonical200/index허용. Article/Breadcrumb와 비의료 편집자·검수 미완료 표시. FAQPage/Physician/reviewedBy 없음.

그림0 유지, 질문표는 읽고 복사할 수 있는 HTML이며 모바일 카드로 같은 내용을 보인다. Main360top/390표/430full/768FAQ/1440출처 실제 열람. 마지막 수정 후1440top/430top/390표 재확인. 430full은 전체 배치 확인이며 축소된 본문을 모두 읽었다는 주장은 아니다.

## Before / after

| 항목 | Production baseline | Local |
|---|---|---|
| word count |110|855; 길이 자체가 합격 기준 아님|
| FAQ /표 |0/0|5/1|
| 공식 출처 |2|4|
| 이미지/도구링크 |0/0|0/0|
| outlinks |14|19|
| contentin/depth |HTML2/1 당시가시성미검증|단일route 미산출, 전체graph 후속|
| schema |Organization/WebSite|+Article/Breadcrumb|

## QA·판정

전체273tests/typecheck/Healthaudit/lint0errors(기존1warning)/build116/5폭QA/SEO/diffcheck PASS. 위양성·위음성 문구를 질환/상태와 실제 상태의 불일치로 수정한 뒤30SEO회귀/type/build116/5QA/SEO 재통과. 최종 H1 전용 변경 후5QA/SEO 및1440/430 직접 시각 재확인.

독립 source P2는 위양성·위음성의 ‘찾는 대상’ 지시범위를 고쳐 해소. 치료 목표는 출처가 직접 설명하지 않아 질문형으로 좁혔고 표4행도 불확정과 재검을 분리했다. source delta 재검토 잔여P0/P1/P2없음. 독립 시각 P2(H1 줄첫머리 가운뎃점)는 해당 제목만 자연어로 바꿔 해결, 공유 CSS 변경 없음.

독립 기술 검토4sources/10sectionFAQ reference 정상, 5링크200, SSR날짜/원장/다른페이지 exact. Main 최종5폭 overflow0/FAQ키보드/navfooter/sourceanchor 정상.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS(HTML 질문표) · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

증거 `../raw/page-qa/reading-health-results.json`; 실제스크린샷·SEO는 ignored reports/local. 임상 검수·실제독자·fieldCWV·새 Google 색인 성공이 아니다. 외부 상태 변경 없음.
