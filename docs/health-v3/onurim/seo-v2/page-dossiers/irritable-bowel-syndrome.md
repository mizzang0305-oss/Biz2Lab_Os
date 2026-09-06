# 과민성장증후군 — 질환 10/20, expansion 4/14

2026-09-06 · `/health/irritable-bowel-syndrome` · LOCAL · SEO_PAGE_CERTIFIED

## GSC·intent·benchmark

개별 GSC는 INDEXED, 스마트폰 fetch/crawl/index 허용, 사용자·Google canonical 일치. 이번 로컬 수정의 색인 성과가 아니라 기존 Production 관찰이다. 수집한 positive query row 없음. 복통/배변 변화, IBS/IBD, 내시경 필요성, 음식 제한은 출처·검색 결과에 기초한 의도 추론이며 검색량·순위 실측이 아니다.

| 직접 확인한 benchmark | 구조·신뢰·내용 | 적용 |
|---|---|---|
| [KDCA 과민성장증후군](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5250) | 원인·검사·치료 구분과 그림, 등록2020-07-24/업데이트2026-05-15 | 복합 요인·필요한 감별, 전문문구나 원본 그림 복제 안 함 |
| [NIDDK Definition](https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/definition-facts) | 기능/장뇌상호작용·배변 양상,2017-11 | 통증의 실제성·여러 요인, 자가 유형 점수 없음 |
| [NIDDK Diagnosis](https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/diagnosis) | 증상 관계·병력·선택적 검사,2017-11 | 배변 후 호전뿐 아니라 악화도 기록 |
| [NIDDK Diet](https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/eating-diet-nutrition) | 식단별 설명·재도입,2017-11 | 저FODMAP을 영구 식품 금지로 옮기지 않음 |
| [NHS IBS 진단](https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/getting-diagnosed/) | 진료 질문/증상 메모/다른 원인 확인,2025-03-17 | 독자가 기억을 짧게 설명할 수 있는 구조 |
| [NHS IBS 생활](https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/diet-lifestyle-and-medicines/) | 개인차·많은 음식 배제 시 전문가 도움,2025-03-17 | 약·식품·양의 일괄 처방을 피함 |
| [NHS IBD](https://www.nhs.uk/conditions/inflammatory-bowel-disease/) | IBS와 별개·증상 중첩·응급 구분,2023-05-05 | 약자를 풀어 읽는 표, 자가감별 표 아님 |
| [NHS Stomach ache](https://www.nhs.uk/symptoms/stomach-ache/) | urgent/immediate 경고 분리,2023-05-26 | 갑작OR심한 통증·출혈·쓰러짐의 응급 대응 |

Main은 위8개와 [NIDDK Symptoms](https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/symptoms-causes), [NIDDK Treatment](https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/treatment), [NHS IBS Symptoms](https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/symptoms/) 본문·날짜를 직접 대조했다. NIDDK5개 모두 LastReviewed2017-11이며 참고문헌2021이나 사이트 개편 배너를 업데이트일로 쓰지 않았다. NHS 생활 페이지 동영상2025-10-17과 페이지2025-03-17을 구분. IBD/복통 페이지의 표시된 차기 검토일2026-05는 경과했고, 현재 원문 확인을 최신 재검토 완료로 표현하지 않았다.

KDCA 요약의 전원 검사처럼 읽히는 표현은 본문의 ‘필요하면’ 및 NHS/NIDDK와 대조했다. KDCA 증상 목록의 실신과 포괄적 무해성 표현은 새 증상을 정상화할 근거로 사용하지 않았다. 배변후 호전만을 필수 특징으로 삼지 않고 NIDDK의 호전/악화 양쪽 문맥을 반영했다.

## 독립 가치·고유 구조

BODY_SIGNAL: 배변 전후 관찰 → 장-뇌 상호작용과 통증의 실제성 → IBS/IBD 용어 구분 → 관찰을 진료 기록으로 → 제한식/치료 경계 → 새 위험 신호. 6sections/FAQ6/용어표1, 기록 문장 예시1. 첫 독립 가치는 배변 뒤 어느 방향의 변화도 말할 수 있게 하는 관찰 언어, 둘째는 약자 구분과 상황별 진료 기록이다. 질환 점수·전원 내시경·임의 대기 기간·음식 금지표는 없다.

- Title: 과민성장증후군(IBS): 복통·배변 변화 기록과 진료 신호 | 오누림
- H1: 배가 아플 때, 배변 전후 무엇이 달라졌나요?
- Description: 실제 본문의 배변 관찰·IBD 구분·음식 제한·진료 신호를 반영.
- 문맥 링크6: 검사표·IBS카드·증상기록·약목록·진료질문·위험신호.
- 발행8/26, 실질수정·출처대조9/6, UI/Article/sitemap 일치. 비의료인 작성자, 임상검수 미완료, Article/Breadcrumb, 허위 FAQPage/Physician/reviewedBy 없음.

## 의료·provenance

11sources, 본문6/FAQ6의 sourceIds 모두 해소. 새 delta8개는 `../raw/source-deltas-ibs.csv`; 임상검수 미완료이다. 새 항문 출혈·혈성 설사·원인 없는 체중 감소를 각각의 신속 평가 신호로 명시한다. 갑작OR심한 복통, 쓰러짐, 많은/계속 출혈, 복통과 혈변/타르변은 응급 도움. 영국999/응급실을 한국119로 현지화했다. 모든 신호 동시 발생·기록 완성·약효 대기를 조건으로 삼지 않는다.

독립 검토 P1: 첫 경고 문장이 출혈과 체중감소의 AND처럼 읽힐 수 있어 ‘중 하나라도’로 수정하고 회귀 assertion 및5폭QA를 재실행했다. 독립 재확인에서 잔여P0/P1 없음. P2인 FAQ의 ‘갑작스럽고 심한’을 본문과 같은 ‘갑작스러운 복통 또는 심한 복통’으로 맞추고 최종QA를 재실행했다.

Main은 HEAD25bbebf의 expansion70 records를 read-only TS 평가로 비교해 exact동일을 확인했다. content/medical-review diff0, 전체144, highRisk47, IBS article/source와 기존47 교집합0, packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64` 유지. 새 본문을 원래47의 임상 승인으로 취급하지 않는다. MEDICAL_REVIEW_COMPLETED=NO, REAL_HUMAN_READER_TEST=NOT_PERFORMED.

## 이미지

기존3개 Main 직접 확인. 추상 concept/action을 새 원본2개로 대체하고 원파일 보존. 장식 hero의 십자표시가 임상 승인처럼 읽히지 않도록 caption 명시. 새 concept는 뇌·장 위치와 서로 반대 방향의 개념 화살표, action은 동일 인물의 복부 관찰과 메모 장면. 치료 전후·특정 음료·시간 권장이 아니다. 정확한 생성 prompt/경로는 `../raw/ibs-image-generation.md`.

- concept-v2:1536×1024/37554bytes/SHA256 `2551d8dab1cae90117ced7596e25b53cdb5e0b02ca7e5361dedf4743f1e0ff39`
- action-v2:1536×1024/224820bytes/SHA256 `dd8f8d4d2a084f34cd68399f0bebcea01772a782e9686a36725c84378d83a04c`
- Main·독립 Astra 실제 시각검토에서 재생성 필요P0/P1/P2 없음. SOURCE_CONCEPT_CHECKED, clinicalReviewCompleted=false. 3개 모두 실제한번씩 렌더, alt/caption/dimensions/lazyload 명시.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| word count | 379 | 1257 |
| FAQ / 비교표 | 2 / 0 | 6 / 1 |
| 출처 / 렌더 이미지 / 도구 | 3 / 5(고유3) / 1 | 11 / 3 / 1 |
| internal outlinks | 16 | 20 |
| content inlink / depth | HTML2 / 1, 당시 가시성 미검증 | 단일 route 미산출; 최종 전체 그래프 후속 |

## 인증 증거

- INTENT/TITLE/DESCRIPTION/H1: 관찰 질문 중심의 고유 metadata와 H1 하나.
- CONTENT_UNIQUENESS: 실제 BODY_SIGNAL6sections, 개념구분표·관찰문장, 고유 FAQ6.
- MEDICAL_SOURCE: official11/source delta8, 독립 P1 보완·재확인 및 P2 표현 일치 완료. 임상검수 아님.
- INTERNAL_LINK/IMAGE: route/sourceanchor 해소, 실제3개 이미지 load/alt/caption/hash.
- MOBILE:5폭360/390/430/768/1440 fail0. Main360top/390용어표/430urgent/768FAQ/1440sources 직접 확인.
- SCHEMA/CANONICAL/INDEXABILITY: Article/Breadcrumb, HTTPS www self, SSR200/index 허용/실제lastmod/sitemap.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

260fulltests/typecheck/healthaudit/build116 PASS. lint 오류0/기존경고1. 마지막P2 수정 후5폭QA/SEO fail0·SEO회귀17건·build116·diffcheck 재통과. 독립 검토는144전체records와47전체packet의HEAD25bbebf 대비 동일도 확인했다. `../raw/page-qa/irritable-bowel-syndrome.json` 및 ignored local 동명폴더에 machine evidence. fieldCWV/의료인검수/실제독자/Google색인보장 아님. Preview·Production·색인 요청 없음.

## Tool24 재대조 — 2026-09-07 KST

위 인증·수치·문구는 당시 증거다. 새 독립 diff 검토에서 타르변의 긴급 도움에 복통을 필수 조건처럼 붙인 P1이 발견됐다. Main은 기존 NIDDK GI출혈 원문(2024-07)을 직접 재대조해 경고·FAQ를 ‘검고 끈적한 타르 같은 변은 복통이 없어도 즉시 의료 도움’으로 분리하고 기존 SRC-NIDDK-GI-BLEEDING을 연결했다. 위험 신호 출처4→5, 전체11→12. 실질수정일9/7, sourceCheckedAt9/6 유지. 도구 카드 제목·설명도 실제 복통·배변 질문지와 일치시켰다.

최종 local1285words/12sources/3images/outlinks20. 부모5폭/SEO와 도구5폭/SEO/인쇄,관련66tests PASS. Main430px 새 경고 직접 확인. 출처 registry 객체·원래 Claim text·47 패킷은 수정하지 않았고 면허 검수 완료를 주장하지 않는다. 과거 전체 suite/build가 이 delta까지 검증했다고 쓰지 않는다. 상세 안전 경계·출처·최종3쪽 인쇄 증거는 tool-irritable-bowel-syndrome-visit-card.md. Production·Google 변경0.
