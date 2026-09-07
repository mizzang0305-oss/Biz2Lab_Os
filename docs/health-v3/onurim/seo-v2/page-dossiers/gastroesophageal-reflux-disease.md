# 위식도역류질환 — 질환 4/20

2026-09-06 · `/health/gastroesophageal-reflux-disease` · LOCAL · **SEO_PAGE_CERTIFIED**

## GSC·intent·SERP

개별 GSC INDEXED, smartphone fetch 성공/crawl·index 허용/self user·Google canonical. 수집 positive query rows 없음. 제안 검색 의도는 `위식도역류질환 증상/역류성 식도염 차이/검사/음식/치료/위험신호`. 정확한 순위나 검색량을 주장하지 않는다.

| 직접 확인한 벤치마크 | 내용·시각·신뢰·snippet 패턴 | 편집 선택 |
|---|---|---|
| [KDCA2057](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=2057) | 질환명·요약, 정의부터 검사/치료, 개념 그림, 공공기관/2026-06-02 | 현상·질환·염증을 구분; 원문 표/그림 복사 없음 |
| [NIDDK 정의](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/definition-facts) | GER/GERD 질문형, 합병증 설명/삽화, 2020-07 reviewed | 모두가 식도염을 거친다는 진행표를 만들지 않음 |
| [NIDDK 진단](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/diagnosis) | 검사별 목적·준비 맥락, 내시경 사진, NIH | 증상·병력 우선 평가와 선택적 검사 질문 |
| [NIDDK 식사](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/eating-diet-nutrition) | 야간/눕기 간격과 개인별 음식, 관련 사진/연구 인용 | 음식 금지표 대신 실제 시간 기록표 |
| [NHS](https://www.nhs.uk/conditions/heartburn-and-acid-reflux/) | 행동형 제목/약사·진료 연결, 간결한 목록, 2023-11-20 reviewed | 약의 역할과 재평가; next review due2026을 수정일로 쓰지 않음 |

## 변경·고유 가치

기존에는 관찰 중심의 일반 목차/FAQ3개와 Preview eyebrow, 심한 흉통만 강조하는 안내가 있었다. 이제 짧은 응급 경계 → 용어 비교 → 역류 개념 → 생활 시간표 → 검사 목적 → 생활/약 → 진료 변화로 구성했다.

- Title **위식도역류질환 증상과 역류성 식도염 차이 | 오누림**.
- H1 **역류질환과 식도염, 무엇이 다를까요?** — 긴 H1을 모바일에 맞는 질문형으로 줄였으며 1개.
- 고유 description은 용어/시간표/검사·약 질문/흉통·삼킴 경계를 요약한다.
- 독립 가치 2개: GER/GERD/식도염 비교와 식사–자세–증상/약 시간표. INTERNAL_HEURISTIC이지 Google 순위 공식 아님.
- FAQ6: 용어 차이, 위장약 반응으로 진단 불가, 음식 제한, 내시경, 기침/쉰 목소리, 약 후 재발. 중복 결론 문구를 줄였다.
- 검사표·복용약·위험 신호 support, 역류 기록/질문 도구, 심근경색을 관련 상황에서 연결했다.

## 출처·의료안전·시각

8개 sourceIds 모두 연결. [NIDDK 증상](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/symptoms-causes), [NHLBI 심근경색 신호](https://www.nhlbi.nih.gov/health/heart-attack/symptoms), KDCA CPR도 직접 확인했다. 심근경색 의심 시 경미하거나 오르내리는 증상도 기다리지 않고119. 위장약 반응으로 배제하지 않는다. 지속 구토/삼킴/출혈 의심/체중 감소는 기록을 더 모으며 진료를 미루지 않는다.

3시간 식사 간격은 NIDDK의 야간·누운 자세 증상에 한정했으며 효과 보장/보편 음식 금지/약 용량/개인 검사 처방은 없다. 독립 Astra source/safety review P0/P1 blocker0. **의료인 검수 완료가 아니다.** 기존47패킷과 claim 문장을 보존하고 새 개념은 `../raw/source-deltas-gastroesophageal-reflux-disease.csv`로 분리했다.

3개 원본 이미지를 직접 보고 유지. hero의 눕기 장면은 식후 즉시 눕기 권장이 아니고, explainer3장면은 필수 악화 단계가 아니라는 HTML caption을 명시했다. action 시간표는 본문과 일치. 이미지마다 alt/width/height/실제로딩 확인, bitmap 생성/삭제 없음.

실제 저자 박영훈/비의료인, 의료 검수 미완료 유지. 발행8/26·실제수정/출처대조9/6, UI/Article/sitemap 일치. Article+Breadcrumb, 허위 Physician/reviewedBy/FAQPage 없음.

## Before / after

| 항목 | Production | local |
|---|---|---|
| word count | 439 | 963; 길이가 목표는 아님 |
| FAQ/비교표 | 3/0 | 6/2 |
| 출처/이미지/도구 | 5/3/3 | 8/3/3 |
| distinct internal outlink | 18 | 22 |
| inlink/depth | HTML5/1, 가시성 미검증 | 단일 route 미산출; 전체 그래프 후속 |
| schema | Article | 실제 날짜/이미지 Article + Breadcrumb |

## 최종 QA

| gate | 증거 |
|---|---|
| INTENT_PASS | 용어·증상·생활 시간·검사 의도 |
| TITLE_PASS / DESCRIPTION_PASS / H1_PASS | 본문 일치 고유 metadata, 자연어 H1 1개 |
| CONTENT_UNIQUENESS_PASS | 서로 다른 용어표와 시간표, 고유 FAQ |
| MEDICAL_SOURCE_PASS | 공식8개 재대조 및 독립AI 검토; 임상검수 아님 |
| INTERNAL_LINK_PASS | 문맥 href/출처 anchor 결손0 |
| IMAGE_PASS | 원본3개/alt/caption/크기/실제로딩 확인 |
| MOBILE_PASS | 360/390/430/768/1440 표·FAQ키보드·이미지·응급·출처·nav PASS |
| SCHEMA_PASS | 유효Article/Breadcrumb, 실제저자/날짜 |
| CANONICAL_PASS | HTTPS www self canonical |
| INDEXABILITY_PASS | 200/SSR/index 허용/sitemap 포함/실제lastmod |

초기 모바일 overflow8/7/6px는 hero grid child의 min-width:auto가 긴 제목의 최소너비를 강제한 결과였다. `.onurim-article-hero > * { min-width:0 }`로 축소/줄바꿈을 허용하고 H1도 간결하게 수정. GERD 및 이미 인증한 HTN/DIA/AR 각5폭 회귀 검사 모두 overflow0/실패0. 내용·metadata를 바꾼 페이지의 날짜만 변경했다.

**252/252 tests**, typecheck PASS, lint 오류0/기존경고1, build116 PASS, health audit PASS, page SEO fail0, 5폭 Playwright fail0, diff whitespace PASS. 증거 `../raw/page-qa/gastroesophageal-reflux-disease.json` 및 ignored `reports/local/onurim-seo-v2/gastroesophageal-reflux-disease/`. 기존3페이지 raw QA는 공통 CSS 회귀 관측으로 갱신했다.

47패킷 SHA256 `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64` 유지. Preview/Production/색인요청 없음. 다음 골관절염.

## 2026-09-06 Tool12 대조에서 발견한 문구 재검증

후반 진료 안내의 ‘삼키기 어렵거나 아프고, 구토가 계속되거나 이유 없이 체중이 줄면’은 여러 변화가 함께 있어야 한다고 읽힐 수 있어 P2로 기록했다. NIDDK GERD 증상과 NHS를 다시 대조하여 ‘삼키기 어렵거나 아프거나, 구토가 계속되거나, 이유 없이 체중이 줄면’으로 각 조건의 OR를 명시했다. 앞선 심장 의심·호흡·의식 위급 상태의 119와 출혈 안내는 유지했다. 별도 AI 재대조에서 이 문구의 P2 해결을 확인했으며 의료인 검수나 사이트 전체 P2=0을 뜻하지 않는다.

48 SEO + 6 public-cutover = 54 tests PASS, 5폭 page QA PASS, 단일 페이지 SEO audit PASS. Main은 360/1440 변경 구간 스크린샷을 직접 확인했다. 기존 원문 Claim/47패킷 텍스트·해시는 변경하지 않았다. 같은 실제 수정일이므로 날짜를 인위적으로 새로 만들지 않았다. 로컬 한 문장과 회귀 assertion만 변경, Production·Google 변경 없음.
