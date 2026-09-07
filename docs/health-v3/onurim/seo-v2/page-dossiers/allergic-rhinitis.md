# 알레르기 비염 — 질환 3/20

2026-09-06 · `/health/allergic-rhinitis` · LOCAL candidate · **SEO_PAGE_CERTIFIED**

## GSC·검색 의도

개별 검사 INDEXED, smartphone fetch 성공, crawl/index 허용, Google/user self canonical. 수집 positive query rows 없음. 제안 query는 `알레르기 비염 증상/감기 차이/검사/코 스프레이`이며 검색량·순위가 검증된 키워드라고 하지 않는다. SYMPTOM_FIRST로 증상이 겹치는 이유와 검사·제품의 차이를 해결한다.

## SERP·공식 자료 벤치마크

| 자료 | title·질문·깊이·시각·신뢰 관찰 | 편집 방향 |
|---|---|---|
| [서울대학교병원](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000395) | 질환명/한 줄 설명, 상세 정의·검사·치료, 감기 비교 그림, 병원/진료과 | 피부검사 양성≠현재 원인; 원문 표는 복사하지 않음 |
| [NHS Allergic rhinitis](https://www.nhs.uk/conditions/allergic-rhinitis/) | 증상→약사→진료 기준, 행동형 snippet, 짧은 목록, 2026-01-08 검토 | 비알레르기와 구분, 수면/천식 악화 상담 |
| [MedlinePlus](https://medlineplus.gov/ency/article/000813.htm) | 증상·검사·약 종류의 상세 설명, 삽화/검토자, 2026-01-20 | 스프레이 종류별 역할과 안전한 세척 물 |
| [CDC Pollen](https://www.cdc.gov/climate-health/php/effects/pollen-health.html) | 꽃가루 영향과 생활 행동, 식물 사진, 2026-08-11 reviewed | 개인 유발 요인일 때의 환경 관리, 천식 연계 |

정확한 SERP 순위 주장 없음. NHS 비알레르기 설명도 교차 확인했지만 페이지 source count에는 넣지 않았다. CDC reviewed/updated/published를 혼동하지 않았다. 기관별 비충혈제거제 3일/5일 안내 차이는 보편 일수로 합치지 않고 제품·처방 지침을 확인하도록 했다. 코 세척의 멸균수는 별도 [MedlinePlus Hay Fever](https://medlineplus.gov/hayfever.html) 본문에서 확인했다.

## 콘텐츠·metadata·구조

기존 약점: 자극과 알레르겐 경계가 흐림, 일반 관찰 목차/FAQ 3개, Preview eyebrow, 검사·스프레이 구분 부족.

- Title: **알레르기 비염 증상과 감기 차이, 검사·코 스프레이 | 오누림**
- H1: **알레르기 비염, 감기와의 차이부터 검사·코 스프레이까지** — 1개.
- Description: 감기 차이·검사 양성·제품·수면/환경 기록·진료 시점이라는 실제 범위.
- 고유 가치: 원인별 진료 단서 비교표, 제품 종류별 확인 질문표. 두 가치 기준은 INTERNAL_HEURISTIC.
- 목차: 감별 단서 → 알레르겐/면역 → 검사 → 제품 → 관찰 → 진료/천식 →119. FAQ 6개는 콧물/양성검사/제품기간/세척물/계절/수면으로 별도 의도.
- 증상·복용약·검사표 support, 원인 관찰/질문 도구, 천식, 위험 신호를 문맥 연결했다.

## 이미지·출처·의료안전

기존 3개 WebP 원본을 직접 보고 유지했다. hero는 눈을 비비라는 방법이 아니며, explainer는 모두에게 같은 반응이나 치료 전후가 아니고, checklist의 열린 창은 꽃가루 높은 날 행동 지시가 아니라는 caption으로 범위를 명확히 했다. 실제 3개만 표시하도록 imageId를 모두 지정했다. 새 bitmap 생성/삭제 없음.

6개 sourceIds 모두 registry와 페이지 anchor에 연결, section/FAQ 누락 0. 신규 개념은 `../raw/source-deltas-allergic-rhinitis.csv`에 분리했다. 기존 claim 블록/47개 패킷 해시를 유지했으며 신규 문장까지 임상 검토되었다고 하지 않는다. 독립 Astra 원문 확인에서도 P0/P1 blocker 미발견. 박영훈/비의료인, 의료 검수 미완료, real reader 미실시 유지.

삼킴·호흡이나 약 용량을 자가판정시키지 않으며, 심한 호흡/의식 변화는 기록을 기다리지 않고119. 단순 코막힘과 구분한다. 코 세척은 수돗물 그대로 사용 금지·안전한 물/제품 위생 확인, 배합법 없음.

## Before / after

| 항목 | Production | local |
|---|---|---|
| word count | 418 | 1004; 길이 자체가 목표 아님 |
| FAQ/비교표 | 3/0 | 6/2 |
| 출처/그림/도구 | 4/3/3 | 6/3/3 |
| distinct internal outlinks | 18 | 23 |
| inlink/depth | HTML 5/1, 가시성 미검증 | 단일 route 미산출; 전체 그래프 후속 |
| 날짜/schema | 고정 modified, Article | 발행8/26·실제수정/대조9/6, Article+Breadcrumb |

## 최종 QA

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS: 위 의도·metadata·단일 H1 확인.
CONTENT_UNIQUENESS_PASS: 원인/제품 두 고유 비교표와 별도 FAQ.
MEDICAL_SOURCE_PASS: 공식 6개+독립 AI 출처 대조, licensed review 아님.
INTERNAL_LINK_PASS: 문맥 href/출처 anchor 결손 0.
IMAGE_PASS: 3원본·alt/caption·크기/실제로딩 확인.
MOBILE_PASS: 360/390/430/768/1440 overflow0, 두 표·FAQ keyboard·긴 caption·이미지·nav·출처·응급 화면 확인.
SCHEMA_PASS: 실제 저자/날짜 Article/Breadcrumb, 허위 reviewedBy/FAQPage 없음.
CANONICAL_PASS: HTTPS www self canonical.
INDEXABILITY_PASS:200/SSR/index 허용/sitemap 포함·실제 lastmod.

증거 `../raw/page-qa/allergic-rhinitis.json`, ignored `reports/local/onurim-seo-v2/allergic-rhinitis/seo-audit.json` 및 5폭 screenshots. **251 tests**, typecheck, lint(기존 warning1), build116, health audit, page SEO, 5폭 QA, diff whitespace 결과를 확인하고 인증했다. 의료 문구 검사에 부정문의 `완치…보장`이 걸려 더 직접적인 한계 설명으로 수정 후 통과했다. 감사기 `--out`에서 `.json`을 빠뜨렸을 때 JSON/CSV 경로가 겹친 로컬 오류도 발견해 fail-closed 입력 검사와 회귀 테스트를 추가하고 올바른 경로로 증거를 재생성했다.

47개 패킷 SHA256 `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. Preview/Production/색인 요청 없음. 다음은 위식도역류질환.

## Tool 10 후 재확인 — 상담 조건의 OR 명확화

2026-09-06, 372ffa3 이후 도구와 부모 문구를 대조하면서 Main이 ‘증상이 악화되고’가 수면·일상 영향과 함께 있어야 한다고 읽힐 위험을 발견했다. NHS의 별도 상담 사유를 직접 다시 읽고 ‘원인이 불확실하거나, 증상이 악화되거나, 수면·일상에 영향을 주거나, 기존 치료로 나아지지 않으면’으로 한 문장만 수정했다. 독립 AI 대조에서 해당 위험 해결, 미해결 P0/P1/P2 없음. 원래 144 Claim·47개 패킷 본문 변경 없음.

46 SEO tests·5폭 page QA·단일 SEO audit PASS. Main 변경 구간 360/1440 캡처 직접 확인, 문구·줄바꿈·출처2·문맥 링크 유지. page-qa/allergic-rhinitis.json은 이번 재확인으로 갱신됐고 최초 증거는 Git 이력에 보존된다. 기존 전체 suite/build 결과를 이번 상태의 신규 전체 검증으로 표현하지 않는다. LOCAL 수정이며 Production·Google 미변경.
