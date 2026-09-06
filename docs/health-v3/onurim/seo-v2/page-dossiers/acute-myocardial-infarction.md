# 급성심근경색 — 질환20/20, expansion14/14

2026-09-06 · `/health/acute-myocardial-infarction` · LOCAL · SEO_PAGE_CERTIFIED

## GSC와 검색 의도

Fresh 개별 검사 DISCOVERED_NOT_INDEXED. 마지막 크롤·fetch·crawl/index 허용·사용자/Google canonical은 해당사항 없음, 참조페이지 감지 없음, sitemap표시 있음. 미크롤을 허용YES·GooglecanonicalSELF로 추정하지 않는다. Public baseline200/selfcanonical은 별도 HTTP 증거. Positive query row 없음. ‘증상이 얼마나 심해야 하는지·체한 느낌·아스피린·첫 검사’는 공식 검색/본문 benchmark에서 정한 편집 의도(INTERNAL_HEURISTIC)다. 검색량·지역 SERP 순위·순위보장이나 local 변경의 색인 성과가 아니다.

## Main 직접 확인한 공식 benchmark

| 출처 | 본문/날짜 확인 | 채택과 경계 |
|---|---|---|
| 질병관리청 심뇌혈관 조기대응 보도자료310061 | /2847/bbs41 게시글 본문 전체, 작성2026-02-10/최종수정2026-02-11 | 한국119·조기행동. 기존 /2848/bbs42 경로는 독립연구 접근실패; Main은 새 공식 경로의 동일 게시물만 검증. 첨부자료 미열람 |
| [NHLBI Heart Attack](https://www.nhlbi.nih.gov/health/heart-attack) | 전체 본문, Lastupdated2022-03-24 | 혈액공급·심정지 구분. 진료지침 최신판 주장 아님 |
| [NHLBI Symptoms](https://www.nhlbi.nih.gov/health/heart-attack/symptoms) | 전체 본문, Lastupdated2022-03-24 | 약함·점진적·오락가락·불확실해도 즉시 도움·아스피린 때문에 지연금지. 휴식반응으로 협심증 자가감별 금지 |
| [KDCA 급성심근경색6770](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6770) | 본문 개요~관련질환/관리, 등록2025-08-01/업데이트2026-04-23 | 혈류·진단·회복 역할. 30분대기·6~12시간치료마감·약용량·GTN·CPR수치·치료목표수치·효소 표현 미복제 |
| [NHLBI Diagnosis](https://www.nhlbi.nih.gov/health/heart-attack/diagnosis) | 전체 본문, Lastupdated2022-03-24 | 증상/병력·ECG·혈액검사·반복 이유. 급성상황의 운동자가검사 프로토콜 아님 |
| [NHS Heart attack](https://www.nhs.uk/conditions/heart-attack/) | 전체 본문, Pagelastreviewed2026-03-31; 다음2029≠수정일 | 소화불량형·긴급신호OR·심정지·검사·회복. 999/111·아스피린300·GTN용법·부정확한 stent재질 설명 미수입 |
| [CDC Heart Attack](https://www.cdc.gov/heart-disease/about/heart-attack.html) | 전체 본문, 표시일2024-10-24 | 증상·회복/재활·개별관리. 한국119로 명시 |
| [MedlinePlus Troponin](https://medlineplus.gov/lab-tests/troponin-test/) | 전체 본문, Lastupdated2023-10-30 | 단백질·심장근육손상·상승다른원인·초기정상한계. 고정재검간격/시간표/수치로 안전판정하지 않음 |

보도자료 정확한 encoded URL은 `lib/health-v3/seo-v2/acute-myocardial-infarction.ts`의 SRC-KDCA-CARDIO-2026 및 페이지출처에 보존. 공식자료 비교는 문장/도식 복제나 기관승인·면허 검수 아님.

## 독립 가치와 on-page

QUESTION_FIRST. 심한 통증을 기다리는 오해 해소 → 약한/체한형 비교표 → 관상동맥/심정지 구분 → 신고 후 네 정보 → 심전도/트로포닌 역할표 → 치료 뒤 질문. 6sections·6FAQ·2tables. **신고 지연을 만드는 생각 비교**, **검사별 정보와 한계 구분**이 독립적인 독자가치다.

- Title: 급성심근경색 증상: 심한 흉통을 기다리지 말아야 하는 이유 | 오누림
- H1: 급성심근경색, 얼마나 아파야 119를 불러야 할까요?
- Description 첫문장: 의심되면 확신없어도 즉시119. 첫경고1단락→3증상목록. 통증강도·대기분수·모든증상충족조건 없음.
- FAQ6: 심하지않은흉통/체함/몇분/아스피린/운전/첫트로포닌. 고정용량·자가확진·약반응시험 없음.
- 문맥6링크: 위험신호·MI카드·약목록·검사결과·진료질문·지질관리. 신고 전 메모완성요건 아님. 독립검토 모두200.
- 발행8/26·실제수정/출처대조9/6. SSR본문·HTML표·Article/Breadcrumb와 UI/sitemap 일치. 박영훈 비의료인 편집자/면허검수미완료, 허위Physician/reviewedBy/FAQPage 없음.

## 의료 원장 보존

페이지8출처/global161. 진단 출처를 더해 원래AMI-P3-003 mapping 보완, 아스피린은 ‘신고 지연금지’와 ‘모두에게 금지/일괄복용 아님’을 구분했다. 새8표현은 `../raw/source-deltas-acute-myocardial-infarction.csv`, licensed review NOT_COMPLETED. 원래AMI-P3-001..005 ID/문장/출처ID순서 보존.

Main expansion70 exact·전체144/highrisk47·기존AMI3sources와47교집합0. 독립 HEAD89f383a대비 전체144claims·47packets whole레코드exact동일. PacketHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. 전체base대비 앞6페이지 파생title/sourceDate차이는 별도이며 whole47불변으로 확대 주장하지 않는다.

MEDICAL_REVIEW_COMPLETED=NO · REAL_HUMAN_READER_TEST=NOT_PERFORMED. 기존원장 자동감사의 unresolvedPublicHighRiskClaims0은 신규 문장의 임상검수 완료가 아니다.

## 시각과 모바일

Main 기존3/newraw2/5폭screens 실제열람. 독립 최종WebP3개/hash/alt/caption검증. Concept플라크의 위치P2는 ‘오른쪽 혈관 확대도 안’으로 module+manifest 함께 명확화. 심장 표면의 황갈색이 플라크라는 뜻 아님. 재생성 불필요. 행동4빈칸은 신고 조건·작성 선행요건 아님, 가상인물/모름허용 명시.

Concept1536x1024/136848B/SHA256 `ddca2ed5cf2a6ff9e645d01dcf80e199e6cbc90160baf64d54659fd92b15ba5f`.
Action1536x1024/201098B/SHA256 `992818c86edab006d5aef3fc15a14af56f094ef992bfb69c1339e561738190dd`.
Exact prompts/raw `../raw/acute-myocardial-infarction-image-generation.md`. ManifestclinicalReviewCompleted=false, 기존파일 보존.

Main360top(4줄H1이나119·첫답변화면내),390검사표카드,430긴급목록,768FAQ keyboard/focus,1440출처8실제확인. 5폭overflow0, 모든3이미지각1회,nav/footer가시·source anchors정상. captionP2후5폭QA/SEO재실행.

## Before / after

| 항목 | Production baseline | Local |
|---|---|---|
| Words |365|1327|
| FAQ / 표 |2 / 0|6 / 2|
| 출처 |heuristic2, 선언3|선언8; 품질점수 아님|
| 이미지 / 도구 |5렌더(고유3) /1|3 /1|
| Internal outlinks |16|20|
| Content inlink / depth |HTML2 /1, 당시가시성미검증|단일route미산출; 전체후속|

## QA와 인증

전체270tests/27SEO회귀·명시적typecheck·Healthaudit·lint0errors(기존1warning)·5폭QA·SEO·build116·gitdiffcheck PASS. 최종caption위치P2뒤5폭QA/SEO재PASS. 독립P0/P1없음, source8모두resolve/sourceanchors각1개, 원장exact·schema/date/canonical·6링크검증. 독립 source-deltas/dossier 자체 미검토 상태는 본문·출처 검토와 구분한다.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

이는 LOCAL SEO_PAGE_CERTIFIED이며 임상·실제독자·fieldCWV·Google색인보장 아님. Preview/Production/색인요청 없음.
