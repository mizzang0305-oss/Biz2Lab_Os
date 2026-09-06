# 가정 혈압 기록표 — Tool 1/34

2026-09-06 · /health/tools/blood-pressure-log · LOCAL · SEO_PAGE_CERTIFIED

## 개별 의도·판정

INDEX_UTILITY 유지. Fresh GSC UNKNOWN, public200/selfcanonical은 별도. 7일/28일 양의 노출 행 없음은 수요0을 뜻하지 않는다. 가정혈압 기록표/혈압 측정 회차/원래 값 기록은 기능에 근거한 의도 가설이며 검색량·순위 실측은 아니다.

독립 결과물은 날짜·시각·회차·두 혈압값의 단위·맥박·조건을 남긴 반복 기록지다. 부모 글의 측정 원리, Support 측정 순서와 구분한다. 이전9열14행의 ‘쉬기 전/후’는 안정 후 기록과 혼동될 수 있어7열의 회차·단위로 바꿨다. 제목에서7일을 제거하고14줄을 개인 측정 일정 처방과 구분했다.

## 출처와 새 표현 범위

Main이 이번에 [AHA Home Blood Pressure Monitoring](https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home) HTML 전체를 다시 읽었다(Last Reviewed2025-08-14). 공식 URL을 찾기 전 두 비정규 경로는 web safe-open 실패였고 근거로 사용하지 않았다. 한 번에 두 측정값·1분 간격·원래값 기록·개인 횟수 문의·약 임의중단금지·재측정 후 매우 높으면 즉시 연락 범위를 적용했다. 미국 혈압 분류표/911/연결PDF 서식은 수입·복제하지 않았다.

KDCA 고혈압/뇌졸중/심근경색은 선행 해당 질환 dossier의 Main 직접 열람 범위를 재사용했고 독립 연구자가 실제 연결 URL을 재확인했다. 작성 위치 예시에는 실제 환자나 정상/목표 수치가 없다. 예시의 오류 표시·값 삭제 금지는 정보를 추측하지 않는 편집 경계이지 진단 알고리즘이 아니다. 추가 표현은 공식출처 대조이며 licensed medical review NOT_COMPLETED, 원래47패킷이 새 문장을 검수한 것으로 보지 않는다.

독립 source P2 ‘지속’의 기다릴 기간 모호성을 ‘재측정 후에도 매우 높으면 며칠 기록을 모으지 말고 즉시 연락’으로 수정했다. 위급 증상에서는 재측정 없이119를 별도로 유지. 재검토 P0/P1/P2없음.

## 공통 기능과 범위

Tool1에 필요한 공통 renderer: 기존14개카드56fields 인쇄칸 복구, Claim ID 대신 실제 sourceURL, 손글씨/임시체크/제출없음의 정직한 설명, Breadcrumb, 인쇄footer/출처/면허검수미완료 유지. 데이터 입력·저장 기능이나 신규 API는 추가하지 않았다.

공통복구의 P1: 편두통의 새 신경증상·우울증의 자해생각 field가 경고없이 나오는 문제를 발견했다. warning/뇌졸중/MI/편두통/우울증5대상은 부모의 기존 warning섹션 전체 원문·bullets·sourceIds를 양식 앞에서 그대로 재사용한다. Dep109와119를 합치지 않는다. 독립 재검토 baseline529d4de의 부모 원문 exact 및5개 SSR순서/소스 union 확인. 다른 Tool33개 데이터·Support9·144claims·47packets whole-record와 packetHash는529d4de대비exact. 공통renderer가 변경됐다는 사실은 다른33개의 개별 SEO인증 완료를 뜻하지 않는다.

## 화면·인쇄·메타데이터

Title: 가정 혈압 기록표: 측정 회차와 원래 값을 남기는 인쇄 양식.
H1: 가정 혈압 기록표. metadata/SSR설명일치. 수정2026-09-06 UI·인쇄·sitemap동일. Article/FAQ/Physician/reviewedBy를 새로 주장하지 않고 Breadcrumb만 추가한다.

Before word51/source0/9열14행; after word337/source4/7열14행/out19. HTML단어수는 기록지 품질이나Google기준이 아니다. 원본77개 surface는 아직 그대로; noindex정책 미적용.

Main360/390/430/768/1440 주요 화면 및390우측표 확인. 작은 화면은 내부 가로이동, 페이지overflow0·명시 안내·키보드영역 제공. A4실제PDF를 Poppler로 PNG렌더하여 Main최종2쪽 모두 열람. 1쪽사용법·한계,2쪽7열14행·양식수정일·진단/약물한계·미검수·4개실제출처URL 모두 남음. 초안3쪽마지막출처만넘김 P2를 본문 문맥링크의 print비노출 및간격조정으로해소. 안전footer는숨기지않는다. pypdf페이지수2/텍스트길이[1002,869]확인. 첫텍스트출력은cp949유니코드에러였으나PDF생성·렌더는정상; UTF-8재검사 별도.

## QA·인증

첫전체281tests(SEO38)/type/Healthaudit/lint0errors기존1warning/build116/5폭QA/SEO통과. 안전notice회귀 추가후39SEO/type 및빌드116재통과. 최종print조정후39SEO/5폭QA/단일SEO/toolprint QA통과. print非GET요청0·내부href실제200·source일치·PDFsha보존. 실제종이프린터출력은 미실행.

독립기술34ToolHTTP200/56fields/실제출처/25internaltarget200. 개별BP인증과 공통기능검사 범위를 구분한다.
INTENT_PASS/TITLE_PASS/DESCRIPTION_PASS/H1_PASS/CONTENT_UNIQUENESS_PASS/MEDICAL_SOURCE_PASS/INTERNAL_LINK_PASS/IMAGE_PASS(HTML양식)/MOBILE_PASS/SCHEMA_PASS/CANONICAL_PASS/INDEXABILITY_PASS.
SEO_PAGE_CERTIFIED는 LOCAL이며 Production/Google/실제독자/의료검수성과가 아니다.

증거: ../raw/page-qa/blood-pressure-log.json, ../raw/tool-qa/blood-pressure-log.json; PDF·최종 PNG는 ignored reports/local/onurim-seo-v2/blood-pressure-log/. 외부변경없음.
