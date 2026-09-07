# 약 목록 — Support 8/9

2026-09-06 · `/health/guides/medication-list` · LOCAL · SEO_PAGE_CERTIFIED

## GSC·독립 의도

Fresh DISCOVERED_NOT_INDEXED. 크롤/fetch/허용/canonical UI해당사항없음, sitemap·홈참조표시. Public200/selfcanonical은별도. 양의페이지노출행없음·개별queryJOIN없음, 검색수요0또는local색인성공으로해석안함.

Primary intent는 현재제품정보/안내받은사용법/실제사용과다른점의정확한전달. 가족동의·복약어려움지원은family-medication-support로분리. 검색어후보 복용약목록/약이름함량/진료약목록/영양제포함 등은의도추론이며실측검색량순위아님. INDEX_SUPPORT 유지.

MEDICATION_RECORD_FIRST: 전달목적→5행기록표→매일처방약외항목→변경과확인→보관공유→응급예외.6sections/5FAQ/1표.

## Main 직접열람 source·benchmark

| 출처 | 확인범위·날짜 | 적용·배제 |
|---|---|---|
| [FDA Create and Keep a Medication List](https://www.fda.gov/consumers/consumer-updates/create-and-keep-medication-list-your-health) | 전체HTML, 날짜미표시 | 이름/strength/목적/when-how-howmuch별도,갱신·사본·공유. 미국처방사용통계·목록만으로생명보장표현미수입 |
| [FDA As You Age](https://www.fda.gov/drugs/information-consumers-and-patients-drugs/you-age-you-and-your-medicines) | 전체HTML, 날짜미표시 | 안약바르는약포함/필요시의미문의/혼동시확인/임의중단금지. 미국구입제도·특정약예외미수입 |
| [FDA 5 Medication Safety Tips](https://www.fda.gov/consumers/consumer-updates/5-medication-safety-tips-older-adults) | 전체HTML, 날짜미표시 | 현재목록·이유/처방자·상호작용질문·자가용량선택금지 |
| [FDA OTC Drug Facts Label](https://www.fda.gov/drugs/understanding-over-counter-medicines/over-counter-drug-facts-label) | 전체HTML, 특히ActiveIngredient/Directions, 날짜미표시 | 성분양과사용지시구분직접근거. 미국OTC체계임을공개본문에명시,한국전체라벨순서규칙/보충제법분류/유통기한3년규칙미수입 |
| [MedlinePlus Emergencies](https://medlineplus.gov/ency/article/001927.htm) | 금일Main전체본문, ReviewDate2025-01-08 | 위급시목록보다119. A.D.A.M.secondary 저작을NIH자체임상지침으로부르지않음 |

Main은[MedlinePlus 약정보색인](https://medlineplus.gov/druginformation.html)도전체HTML직접읽었다. 목록작성직접근거가약해공개source에서는제외, ASHPcopyright2026≠갱신일. 독립연구HIRA공개안내는Main미열람이라현재본문에채택하지않았고본인인증·개인약조회없음. 기관영상/PDF/제품예시이미지미열람·복제없음.

## 고유가치·의료안전·내부연결

5행표는제품이름/함량단위/사용법/이유와안내한곳/현재상황확인일을분리. 실제약명·복용숫자없는기록항목예시다. 함량으로한번먹는양계산·임의단위환산·유사제품합치기없음.

필요시약/안약/바르는약/일반약/보충제포함하되모두법적의약품으로부르지않음. ‘필요시’를무제한추가로해석안함. 알레르기와미확정반응·현재목록과과거중단기록·지시와실제사용차이를구분. 차이를적는것이자가변경승인이아님.

문맥링크5: 가족복약/진료질문/결과지/부모정보정리/위험신호. out18,도구0. 개인정보파일업로드/약사진식별/상호작용판정/서버미전송약속없음.

새6표현 `../raw/source-deltas-medication-list.csv`, licensed review NOT_COMPLETED. 원래144claims/47packets·다른Support8whole-record가aeaa324와exact(독립기술검토). packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. 의료검수NO/실제독자NOT_PERFORMED.

## 렌더·Before/after

Title: 복용약 목록 작성법: 약 이름·함량·사용법과 변경일. H1: 약 목록, 이름과 사용 안내를 나누어 적으세요. Description·FAQ실제범위일치.

발행8/26·수정/대조9/6, SSR/UI/Article/sitemap일치.200/selfcanonical/index허용,Article/Breadcrumb·비의료작성자·검수미완료. FAQPage/Physician/reviewedBy없음.

| 항목 | Production baseline | Local |
|---|---|---|
| word count |82|885; 길이자체인증기준아님|
| sources |2|5|
| FAQ/표 |0/0|5/1|
| 이미지/도구 |0/0|0/0|
| outlinks |15|18|
| contentin/depth |HTML2/1 당시가시성미검증|단일route미산출·전체graph후속|

그림0유지,HTML2열5행표의동일내용이390폭카드로표현. Main360top/390표/430urgent/768FAQ/1440top·sources실제열람. 제목·표·경고·FAQfocus·출처잘림/겹침없음.

## QA·판정

최초전체278tests(SEO35)/typecheck/Healthaudit/lint0errors(기존1warning)/build116/5QA/SEO통과. FDA라벨근거1문단·출처보강후35SEO/type/5QA/SEO/build116재통과. diffcheckPASS.

독립기술 P0/P1/P2없음: 원장exact/5sources11units/문맥5links실제200selfcanonical/최종SSR/5폭실제시각/캡처SHA10일치. 독립source실문구도함량사용법·미국라벨범위·현재과거/지시실제·누락제품·자가변경금지·응급경계·5출처날짜대조에서P0/P1/P2없음. 임상검수로승격하지않는다.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS(HTML기록항목) · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

증거 `../raw/page-qa/medication-list.json`,실제스크린샷·SEO ignored reports/local. 실제독자·의료검수·fieldCWV·Google색인성과와별개. 외부변경없음.
