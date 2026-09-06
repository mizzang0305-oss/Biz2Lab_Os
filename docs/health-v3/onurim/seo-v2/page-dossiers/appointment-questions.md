# 진료 질문 — Support 7/9

2026-09-06 · `/health/guides/appointment-questions` · LOCAL · SEO_PAGE_CERTIFIED

## Fresh GSC와 의도

Fresh INDEXED, 마지막 크롤2026-09-06 오전4:06:38, 모바일/fetch성공/crawl·index허용·사용자/Google selfcanonical, sitemap표시·참조감지없음. 과거aggregate에서는DNI였으나 개별URL검사가현재 I인상태를우선한다. 이변화는기존Production관찰이며아직배포하지않은local개선성과가아니다. 양의페이지노출행없음·개별queryJOIN없음.

한국어후보는 병원진료전질문/의사에게증상설명/설명이해못함/검사결과연락없음/치료선택질문이다. 독자질문에서추론한의도이며실측검색량·순위·GSCquery가아니다. INDEX_SUPPORT 유지.

Primary intent는 우선순위를정하고설명받은내용과다음행동을확인하는법. 특정검사·치료를요구하거나원하는답을얻는방법이아니다. CONVERSATION_SEQUENCE: 우선질문→검사치료상담표→이해와실행곤란→귀가전확인→귀가후문의→응급예외. 6sections/5FAQ/1표.

## Main 직접열람한4개기관문서

| 문서 | 읽은범위·실제날짜 | 적용/한계 |
|---|---|---|
| [AHRQ Be More Engaged](https://www.ahrq.gov/questions/be-engaged/index.html) | 전체HTML, reviewed2024-11/original2012-09 | 진료전중후·top3·준비·서면안내·약임의중단금지. 질문하면개인결과가보장된다고확대안함 |
| [NHS What to ask](https://www.nhs.uk/nhs-services/gps/what-to-ask-your-doctor/) | 전체HTML, reviewed2023-01-12 | 검사·치료·다음연락·2~3우선질문·이해확인. next2026-01-12는경과한예정일이지새갱신일아님. 영국기록권리·통역제공보장미수입 |
| [MedlinePlus Talking](https://medlineplus.gov/talkingwithyourdoctor.html) | 전체HTML자체Summary포함, Lastupdated2024-10-05 | 실제증상·약·알레르기·서면안내·연락. 연결된외부문서/영상까지읽었다고하지않음 |
| [MedlinePlus Emergencies](https://medlineplus.gov/ency/article/001927.htm) | 금일Main전체본문, ReviewDate2025-01-08 | 위급호흡·반응변화에119우선. A.D.A.M. secondary 저작이며임상검수기관표기가아님 |

이름/날짜가불확실했던기존NIA2024출처는재확인한문서로대체했다. 공식source확인은licensedreview가아니다.

## 고유가치·안전·연결

4행표는 검사/치료/약/다음계획에서필요한질문만선택. 두세개는상한아니며중요한새증상·알레르기생략없음. ‘이해안됨’과‘이해했지만실행곤란’을분리하고후자는솔직히알려계획을상담. 귀가전지금할일/다음확인/결과경로/문의처의빈칸을찾는다.

기관이언제든답변·통역을제공한다고보장하지않고가능여부를문의. 녹음권·의무기록권의한국법해석없음. 연락없음=정상아님, 추측한복약변경금지, 위급함은예약·질문표·답변대기금지.

문맥링크4: 증상기록/약목록/결과지읽기/위험신호. out18,도구0,신규route0. 긴목록을반복하는대신각보조작업을해당페이지로연결했다.

새6표현 `../raw/source-deltas-appointment-questions.csv`, licensed review NOT_COMPLETED. 원래144claims/47packets text/hash 및packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64` 보존. 실제독자NOT_PERFORMED·의료검수NO.

## HTML·모바일·Before/after

Title: 병원 진료 전 질문 준비: 검사·치료·다음 연락 확인. H1: 진료에서 꼭 묻고 싶은 것부터 준비하세요. 발행8/26·수정/대조9/6, SSR/UI/Article/sitemap일치. 200/selfcanonical/index허용. Article/Breadcrumb,비의료작성자·검수미완료. FAQPage/Physician/reviewedBy없음.

그림0. HTML표는390에서동일내용카드로, Main360top/390표/430urgent/768FAQ/1440top·출처실제열람. 제목·표·경고·키보드focus·출처정상.

| 항목 | Production baseline | Local |
|---|---|---|
| word count |101|800; 길이자체합격기준아님|
| source |2|4|
| FAQ/표 |0/0|5/1|
| 이미지/도구 |0/0|0/0|
| outlinks |14|18|
| contentin/depth |HTML2/1 당시가시성미검증|단일route미산출·전체graph후속|

## QA·판정

전체277tests(SEO34)/typecheck/Healthaudit/lint0errors(기존1warning)/build116/5폭QA/SEO/diffcheckPASS. overflow0·FAQkeyboard·navfooter·anchors정상. 전체Support등록route회귀도통과.

독립source실문구대조 P0/P1/P2없음. 우선순위상한·보장·질문과처방경계·이해/실행·연락없음정상추정·응급대기·날짜귀속을확인했다. 독립기술도3dc422a대비144claims/47packets/다른Support8wholeexact·4source11units정상·4links실제200/selfcanonical·5폭실제시각·SHA10개일치, 잔여P0/P1/P2없음. 임상검수로승격하지않는다.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS(HTML질문표) · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

증거 `../raw/page-qa/appointment-questions.json`; 실제스크린샷/SEO ignored reports/local. 의료검수·실제독자·fieldCWV·새색인성과와별개, 외부상태변경없음.
