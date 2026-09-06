# 증상 기록 — Support 6/9

2026-09-06 · `/health/guides/symptom-journal` · LOCAL · SEO_PAGE_CERTIFIED

## Fresh GSC·의도

DISCOVERED_NOT_INDEXED. UI크롤/fetch/허용/canonical 해당사항없음, 참조감지없음·sitemap표시. Public200/selfcanonical과 Google미크롤은 다른 증거다. 페이지별 양의 노출행없음, 수요0이라고 단정하지 않는다. 로컬작업이 Google색인을 바꿨다는 주장은 없다.

독립 검색에서는 두통일기·배뇨일기 등 증상별 기록 양식이 관찰됐다. 범용 증상일지의 큰 검색량·고정순위 근거는 아니다. 삼성서울병원 검색 결과는 원문 redirect loop로 직접열람 benchmark에서 제외했다.

Primary intent: 진료에서 증상을 잊지 않고 설명하는 기록법. 특정 질환의 진단일지/통증점수판정기/최소기록일수 과제가 아니다. INDEX_SUPPORT 유지. OBSERVATION_FIRST 구조는 응급 예외→4칸메모→느낌과원인추정→두통·수면별차이→진료전달로 구성한다.

## Main 직접 읽은 benchmark·출처

| 출처 | 확인범위·날짜 | 채택 / 제외 |
|---|---|---|
| [MedlinePlus Talking With Your Doctor](https://medlineplus.gov/talkingwithyourdoctor.html) | 전체HTML, Lastupdated2024-10-05 | 시작·증상·악화호전·질문·메모·후속연락. 연결된 별도영상·NIA글을 읽었다고 주장하지 않음 |
| [NHLBI Sleep Diary](https://www.nhlbi.nih.gov/resources/sleep-diary) | HTML소개 전체, PublicationDate2019-01 | 수면양질/약술카페인/낮졸림과진료공유. PDF 미열람이며 상세서식복제·검증 없음. 기존2025추정표기 교정 |
| [St George’s Headache Hub](https://www.stgeorges.nhs.uk/service/neuro/neurology/headache-service/headache-hub/) | 전체HTML, 특히진료준비/두통일지, 날짜미표시 | 빈도·과거약이력·자기양식가능. 연결PDF 미열람, 영국진료경로/그룹진료시간/새최대용량시험지시 미수입 |
| [MedlinePlus Emergencies](https://medlineplus.gov/ency/article/001927.htm) | 금일Main전체본문, ReviewDate2025-01-08 | 응급신호·기록대기금지. A.D.A.M. secondary 저작구분, 참고문헌4/25≠reviewdate |
| [CDC Stroke signs](https://www.cdc.gov/stroke/signs-symptoms/index.html) | 금일Main전체본문, 표시2026-05-19 | 각갑작스러운신호/증상소실후에도요청. 특정시간내기록완성·낮은점수안심없음 |
| [FDA As You Age](https://www.fda.gov/drugs/information-consumers-and-patients-drugs/you-age-you-and-your-medicines) | 금일Main전체HTML, 날짜미표시 | 실제복약정보전달/임의중단·변경금지. 미국구입제도·특정약예외미수입 |

공개6sources는 기록3·응급2·약물안전1. 기관자료가4칸양식을 공식 검증했다는 주장은 없으며 직접source대조가 임상검수를 대신하지 않는다.

## 고유 가치와 내부 연결

5sections/5FAQ/1HTML4행표. 네칸은 오누림정리예시이며 검증척도아님을 명시한다. 정확히모르는시각은 추정/모름으로, 본인이느낀불편과보호자관찰을 구분한다. 다른사람이볼수없다는이유로주관적증상을지우지않는다.

식후불편 가상표현은 경험과원인질문을구분하는예시이지 실제환자·진단사례가 아니다. 낮은점수/일상가능으로응급배제없음, 진료전최소일수없음, 기록위한약추가·중단실험금지. 별도의긴기록을모두작성해야하는부담을만들지않는다.

본문문맥링크5: 위험신호/편두통/폐쇄성수면무호흡증/약목록/진료질문. 표에서설명한기록이질환가이드의어떤역할로이어지는지앵커에명시. out19,도구0,신규route없음.

새6표현은 `../raw/source-deltas-symptom-journal.csv`, licensed review NOT_COMPLETED. 기존144claims/47packet text/hash·packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64` 유지. MEDICAL_REVIEW_COMPLETED=NO/REAL_HUMAN_READER_TEST=NOT_PERFORMED.

## 렌더·Before/after

Title: 증상일지 쓰는 법: 시작·변화·일상 영향을 진료에 전하기. H1: 아픈 증상을 짧고 정확하게 기록하는 방법. 발행8/26·수정/대조9/6, SSR/UI/Article/sitemap 일치. HTTP200/selfcanonical/index허용, Article/Breadcrumb, 비의료작성자·검수미완료. FAQPage/Physician/reviewedBy 없음.

그림0 유지. HTML표는 본문으로 읽히고390폭에서같은정보의카드로표시된다. Main360top/390표/430urgent/768FAQ/1440top·출처실제열람. 제목줄바꿈·경고색·FAQfocus·출처·표 정상, 기관그림복제없음.

| 항목 | Production baseline | Local |
|---|---|---|
| word count |94|817; 길이자체성공기준아님|
| 출처 |2|6|
| FAQ/표 |0/0|5/1|
| 이미지/도구링크 |0/0|0/0|
| outlinks |15|19|
| contentin/depth |HTML2/1 당시가시성미검증|단일route미산출·전체graph후속|

## QA·판정

최초275tests(SEO32)/명시적typecheck/Healthaudit/lint0errors(기존1warning)/build116/5폭QA/SEO/diffcheck PASS. overflow0/FAQ키보드/navfooter/anchors정상. 다만 이 기계QA는 문맥링크 목적지의HTTP404를검사하지않아 독립검토에서 별도 오류를발견했다. 5폭스크린샷은실제Main열람, 기계PASS만으로독자가이해했다고하지않는다.

독립source실문구대조 P0/P1/P2없음: 각응급OR·편측범위·소실후요청/주관적불편/인과추정/임의약시험금지/최소일수없음/6출처날짜를확인했다.

독립기술 P2: 잘못된 `/health/obstructive-sleep-apnea` 링크가404였다. 기존200/selfcanonical `/health/sleep-apnea`로수정하고 전체Support문맥링크를실제등록route와대조하는회귀검사를추가했다. 다른4링크200/6sources10units정상,91e1287대비144claims47packets다른Support8wholeexact. 5폭실제시각·10개SHA정상이며 clinical review가아니다. 수정후전체276tests(SEO33)/typecheck/5폭QA/SEO/build116재통과. 독립delta는최신SSR정상경로·목적지200/selfcanonical·새회귀범위를확인했고잔여finding없음.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS(HTML기록예시) · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

증거 `../raw/page-qa/symptom-journal.json`; 실제스크린샷·SEO는 ignored reports/local. fieldCWV·의료검수·실제독자·새Google색인성과와별개, 외부상태변경없음.
