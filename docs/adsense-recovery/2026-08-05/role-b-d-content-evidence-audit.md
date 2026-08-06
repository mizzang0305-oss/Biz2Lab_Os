# ROLE B·D 콘텐츠·증거 감사

- 감사일: 2026-08-05
- 범위: ROLE B(Content Inventory Auditor), ROLE D(Evidence-First Content Editor) 조사만 수행
- 기준 작업트리: `codex/biz2lab-adsense-low-value-recovery-20260805`
- 수정 범위: 이 문서만 생성. 콘텐츠, 라우트, 설정, 증거 asset은 수정하지 않음
- 판정: **BLOCKED_INSUFFICIENT_TRUTHFUL_EVIDENCE**

> 이 판정은 기술 수정이나 전체 복구 작업을 중단하라는 뜻이 아니다. 현재 저장소 증거만으로 8~12개의 FLAGSHIP을 정직하게 확정할 수 없다는 ROLE B·D 전용 판정이다. AdSense 승인 여부는 보장하지 않는다.

## 1. 조사 기준과 소스

현재 사실은 다음 소스에서 다시 계산했다.

- 콘텐츠 원본: `content/ko/**/*.md`
- frontmatter schema: `lib/schema.ts`
- 공개·초안·sitemap 필터: `lib/posts.ts`
- 글 route 생성: `app/ko/[category]/[slug]/page.tsx`
- 공개 콘텐츠 색인: `content/ko/content-index.json`
- 카테고리·허브 정의: `lib/categories.ts`
- 본문별 편집 근거: `lib/editorial-evidence.ts`
- 시각 증거 manifest: `data/evidence-manifest.json`
- 원본 21개 실무 글 판정: `data/evidence-content-decisions.json`
- 증거 수집·검수 기록: `reports/biz2lab-evidence-source-discovery-2026-07-28.md`, `reports/biz2lab-evidence-review-packet-2026-07-29.md`
- 기존 콘텐츠 감사 로직: `scripts/audit-content-authority.ts`, `lib/content-originality.ts`
- 과거 AdSense·콘텐츠 문서: `docs/adsense/**`, `docs/content/**`, `docs/deployment/**`, `reports/adsense-*.md`

과거 문서의 `PASS`, `ready`, 콘텐츠 수는 현재 상태로 간주하지 않았다. 현재 Markdown, frontmatter, 필터와 manifest를 다시 파싱했다.

## 2. 공개·색인 동작

`getPublicPosts()`의 조건은 `locale=ko`, `status=published`, `draft=false`이다. `noindex`는 공개 route에서 제거하지 않고 `getSitemapPosts()`에서만 제외한다. 현재는 `published + noindex=true` 글이 0개라 실제 충돌은 없다.

`generateStaticParams()`와 `getPostBySlug()` 모두 공개 글만 사용한다. 따라서 65개 `draft + noindex` Markdown은 일반 글 route에서 렌더링되지 않으며, 현재 `content-index.json`에도 없다. 예외는 통합된 과거 URL 하나로, Next.js permanent redirect가 설정되어 있다.

| 구분 | 수량 | 현재 상태 |
| --- | ---: | --- |
| 전체 Markdown | 76 | 모두 `locale=ko`, `author=Biz2Lab` |
| 공개·indexable | 11 | `published`, `draft=false`, `noindex=false` |
| 공개 noindex | 0 | 현재 없음 |
| draft + noindex | 65 | 공개 색인·sitemap·content-index 제외 |
| content-index | 11 | 공개 글과 일치 |
| 승인 시각 증거 | 7 | 5개 공개 case-study에 연결 |
| redirect 원본 글 | 1 | draft/noindex이며 새 주문 통합 글로 permanent redirect |

## 3. 카테고리별 전수 요약

분량은 코드블록·Markdown 링크 표기를 제거한 본문 문자 수다. 글자 수는 품질 판정의 보조 신호로만 사용했다.

| 카테고리 | 전체 | 공개 | 평균 문자 | 최소~최대 | ROLE B·D 판단 |
| --- | ---: | ---: | ---: | ---: | --- |
| automation | 35 | 2 | 4,245 | 1,749~7,492 | 공개 2편은 증거형. draft 28편 도구 시리즈는 반복 템플릿 위험, 기존 실무 글 5편은 증거 부족 |
| sales-ops | 7 | 6 | 2,139 | 1,733~2,617 | 실무 적합성 높음. 1편은 통합 redirect, 공개 6편 중 직접 시각 증거는 없음 |
| small-business | 6 | 2 | 1,687 | 1,513~1,859 | 공개 2편은 실제 로컬 demo/fixture 증거. draft 4편은 근거 보강 필요 |
| warehouse-logistics | 1 | 1 | 1,826 | 1,826 | 핵심 주제에 가장 직접적이며 승인 증거 2개 보유 |
| contracts-payments | 5 | 0 | 3,806 | 3,463~4,159 | 핵심 주제지만 공개 안전 fixture 부재로 전부 draft/noindex |
| what-to-watch | 8 | 0 | 1,260 | 1,082~1,442 | 영화 선택 주제. 핵심 B2B 주제와 이탈, 격리 유지 |
| after-the-credits | 8 | 0 | 1,362 | 1,171~1,805 | 영화 해석 주제. 핵심 B2B 주제와 이탈, 격리 유지 |
| streaming-life | 6 | 0 | 1,300 | 1,237~1,375 | OTT 설정·구독 주제. 핵심 B2B 주제와 이탈, 격리 유지 |

공개 글은 최소 1,719자, 최대 2,617자, 평균 2,055자이며 1,600자 미만 글은 없다. draft는 평균 3,088자이고 1,600자 미만 22편, 1,200자 미만 3편이다. 긴 도구 글도 실제 사용 증거가 약하므로 분량만으로 가치가 높다고 볼 수 없다.

## 4. 공개 11편 상세 분류

`본문 링크`는 Markdown 본문 내 고유 `/ko/...` 링크 수다. 모든 글은 별도로 `relatedPosts` 3개와 `nextStep` 1개를 갖는다.

| slug | 유형 | 문자 | 작성/수정 | 직접 증거 | 본문 링크 | 분류 | 핵심 판단 |
| --- | --- | ---: | --- | --- | ---: | --- | --- |
| `ai-business-automation-guide` | case-study | 2,050 | 06-15 / 07-28 | approved visual 1 + 공개 repo | 1 | FLAGSHIP | generate-only, 사람 승인, 외부 업로드 차단을 실제 로컬 화면과 경계 문구로 설명 |
| `automation-priority-method` | case-study | 1,912 | 06-15 / 07-28 | approved visual 1 + 공개 repo | 1 | FLAGSHIP | 실행·실패·수동검토 로그를 성공 건수와 분리한 실제 구현 판단 |
| `daily-numbers-for-small-business` | case-study | 1,719 | 06-15 / 07-28 | approved visual 1 + 공개 repo | 1 | FLAGSHIP | 고객 기록·예약·웨이팅·QR 주문을 서로 다른 가상 지표로 표현한 읽기 전용 demo |
| `unify-order-channels` | case-study | 1,859 | 06-15 / 07-28 | approved visual 2 + exact source commit | 1 | FLAGSHIP | 주문 원본, 재고·한도 보류를 분리한 WMS fixture. 실제 거래처·재고·단가는 제외 |
| `separate-picking-inspection-loading-status` | case-study | 1,826 | 07-28 / 07-28 | approved visual 2 + exact source commit | 1 | FLAGSHIP | 피킹·검수·상차 상태와 검수 전 상차 차단을 직접 재현 |
| `accounts-receivable-tracker` | checklist | 2,617 | 06-15 / 07-26 | 공개 repo source-only, visual 0 | 0 | FLAGSHIP 후보 | 미수금 원본·입금누계·잔액·분쟁을 구분하고 자동 연락을 제외. 전용 시각 증거는 없음 |
| `daily-sales-goal-breakdown` | pillar | 2,120 | 06-15 / 07-16 | 계산식·샘플 CSV, visual 0 | 0 | SUPPORTING | 독립 검색 의도와 재현 계산은 있으나 실제 운영 결과 증거는 없음 |
| `daily-sales-report` | how-to | 2,132 | 06-15 / 07-16 | 샘플 CSV, visual 0 | 0 | SUPPORTING | 실행 로그의 판단 구조를 영업 보고에 적용. 실제 영업팀 적용 자료는 없음 |
| `payment-reminder-message` | how-to | 2,160 | 06-15 / 07-16 | 샘플 CSV, visual 0 | 0 | SUPPORTING | 사실 확인·분쟁 제외·사람 발송 경계가 실용적이나 실제 발송·회수 성과 근거는 없음 |
| `sales-achievement-rate` | how-to | 2,169 | 06-15 / 07-16 | 계산식·샘플 CSV, visual 0 | 0 | SUPPORTING | 계산과 예외 처리는 재현 가능. 실제 매출·예측 효과는 주장하지 않음 |
| `sales-revenue-ar-structure` | how-to | 2,044 | 06-15 / 07-16 | 샘플 CSV, source link/visual 0 | 0 | EXPAND_WITH_EVIDENCE | 코드·fixture 검토 경험을 언급하지만 독자가 확인할 직접 source나 manifest 증거가 없음 |

### author·date·CTA·이미지

- 76편의 frontmatter author는 모두 `Biz2Lab`이다. 공개 렌더링은 `lib/editorial-evidence.ts`의 운영자 소개를 사용하며 `AUTHOR_REAL_NAME_APPROVED=true`가 아니면 설명형 운영자 이름이 기본이다. Production 환경값은 이 감사에서 확인하지 않았다.
- 공개 11편 중 10편의 최초 게시일이 `2026-06-15`로 동일하다. 수정일은 07-16, 07-26, 07-28로 분리되어 있으나, 대량 동시 게시 인상은 사람 검토 시 확인할 항목이다.
- 제목과 meta description의 정확 중복은 전체 76편과 공개 11편 모두 0건이다.
- 공개 hero image는 11/11 고유 경로이고 파일 누락은 0건이다.
- 공개 글 11/11에 `nextStep`, 3개의 `relatedPosts`가 있다. 글 간 inbound는 1~5개, outbound는 모두 3개로 계산되어 공개 article orphan은 0개다.
- 다만 증거형 case-study 5편은 본문 링크가 각 1개인 반면, 나머지 6편은 본문 링크 0개로 `RelatedReadingBox`에 의존한다. 독자 문맥 안에서 필요한 링크를 고유하게 배치하는 보강 여지가 있다.

## 5. FLAGSHIP 후보 점수

점수는 0~5이며 저장소에서 확인한 사실만 반영한다. 총점은 35점 만점이다.

| 후보 URL | Topic fit | Originality | Evidence | Actionability | Trust | UX | Index readiness | 총점 | 근거 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `/ko/small-business/unify-order-channels` | 5 | 5 | 5 | 5 | 5 | 4 | 5 | 34 | WMS mock fixture 2개, 상태·책임·미검증 범위가 구체적 |
| `/ko/automation/ai-business-automation-guide` | 5 | 5 | 5 | 4 | 5 | 4 | 5 | 승인 조건·차단 사유·외부 실행 경계를 승인된 화면으로 확인 |
| `/ko/automation/automation-priority-method` | 5 | 5 | 5 | 4 | 5 | 4 | 5 | 실행 로그 화면과 상태 모델, 비밀값 제외, 미검증 공급자 범위를 분리 |
| `/ko/warehouse-logistics/separate-picking-inspection-loading-status` | 5 | 5 | 5 | 4 | 5 | 4 | 5 | 상태 lane과 검수 전 상차 차단 두 증거, 실제 성과를 주장하지 않음 |
| `/ko/small-business/daily-numbers-for-small-business` | 4 | 4 | 5 | 4 | 5 | 4 | 5 | 읽기 전용 local demo, 가상 지표 4개와 실제 성과 경계를 명시 |
| `/ko/sales-ops/accounts-receivable-tracker` | 5 | 4 | 3 | 5 | 4 | 4 | 4 | 공개 repo source와 실무 CSV는 있으나 전용 시각 manifest·실제 운영 기록은 없음 |

정직하게 제안 가능한 후보는 **6편**이다. 첫 5편은 7개의 approved visual evidence를 직접 연결하고, 미수금 글은 공개 저장소 source-only 근거다. 나머지 공개 5편을 단지 글 수를 맞추기 위해 FLAGSHIP으로 승격하지 않는다.

### 8편 이상을 만들기 위해 필요한 사람 자료

다음 중 최소 2개 이상이 독립적이고 공개 안전한 자료로 확인되어야 8편 후보를 다시 평가할 수 있다.

1. 전자계약: 개인정보·계약내용·서명·CI/DI·전화번호가 제거된 standalone fixture, exact source commit, 서명 전후 상태와 미검증 공급자 경계.
2. 결제·미수금: 주문·청구·입금·부분입금·취소·분쟁을 구분하는 공개 안전 화면 또는 synthetic test artifact와 계산 대조 기록.
3. 영업 보고: 실제 고객 데이터가 아닌 승인된 운영 양식의 변경 이력, 실패 사례, 원본 필드와 계산 검증 기록.
4. 배차: 배차 전제조건, 상차 완료, 차량·기사 개인정보를 제거한 fixture와 상태 차단 증거.
5. B2B 고객 포털: 인증·권한·거래처 데이터를 노출하지 않는 mock 화면과 읽기/쓰기 경계.

저장소의 기존 증거 discovery 문서는 `CN_FOOD_Contract`와 `CN_ExeFlow`에서 공개 안전 standalone fixture를 찾지 못해 캡처를 중단했다고 기록한다. 이 감사에서는 해당 외부 저장소를 다시 실행하거나 인증·DB·provider에 연결하지 않았다.

## 6. draft/noindex 65편 전수 분류

### 6-1. 주제 이탈 22편 — NOINDEX_ISOLATE 유지

아래 글은 모두 `draft=true`, `status=draft`, `noindex=true`이며 public route, sitemap, RSS, content-index에서 제외된다. 삭제나 URL 이전은 제안하지 않는다.

| 그룹 | 수량 | 전체 slug | 판단 |
| --- | ---: | --- | --- |
| after-the-credits | 8 | `devil-wears-prada-ending-interpretation`, `her-ai-relationship-interpretation`, `inside-out-2-emotions-interpretation`, `inside-out-emotion-interpretation`, `lalaland-ending-interpretation`, `parasite-ending-interpretation`, `the-intern-work-and-age-interpretation`, `truman-show-ending-interpretation` | 영화 해석은 B2B 현장 자동화 정체성과 직접 연관 없음 |
| what-to-watch | 8 | `date-night-movie-guide`, `family-movie-night-guide`, `horror-movie-intensity-guide`, `netflix-top-10-how-to-choose`, `ninety-minute-movie-guide`, `rewatch-or-new-movie`, `theater-or-ott-choice`, `tired-after-work-movie-guide` | 영화 선택 도구/가이드 성격. 별도 Labs 판단 전까지 격리 |
| streaming-life | 6 | `family-profile-age-rating`, `netflix-profile-reset-recommendations`, `netflix-subtitle-settings`, `netflix-viewing-history-delete`, `ott-subscription-rotation`, `watchlist-without-spoilers` | OTT 설정·구독 주제. 핵심 허브와 내부 연결 금지 유지 |

### 6-2. 범용 오픈소스·도구 분석 28편 — NOINDEX_ISOLATE 유지, 향후 통합/증거 보강

이 28편은 모두 길이가 짧지 않지만 실제 도입·실험 근거보다 기능·비용·운영 기준을 반복하는 도구형 콘텐츠다. 28편 모두 현재 draft/noindex이고 `templateCta`가 있으며, 28편 모두 문의 CTA로 수렴한다. 그대로 재공개하지 않는다.

| 향후 검토 묶음 | 수량 | slug |
| --- | ---: | --- |
| workflow·orchestration | 6 | `activepieces-ai-business-automation-n8n-alternative`, `n8n-workflow-automation-license-caution`, `node-red-local-business-automation-server`, `windmill-developer-workflow-automation`, `huginn-monitoring-automation-agent`, `kestra-data-ai-workflow-orchestration` |
| AI app·agent UI | 4 | `dify-llm-app-builder-business-automation`, `flowise-ai-agent-workflow-automation`, `langflow-ai-workflow-automation`, `open-webui-local-llm-admin-portal` |
| dashboard·BI | 4 | `apache-superset-bi-dashboard-automation`, `metabase-dashboard-automation-for-small-business`, `redash-open-source-dashboard-automation`, `appsmith-internal-dashboard-automation` |
| analytics | 4 | `matomo-self-hosted-analytics-privacy-caution`, `plausible-open-source-analytics-ga-alternative`, `posthog-product-analytics-automation`, `umami-open-source-analytics-ga-alternative` |
| data·backend·search | 7 | `baserow-open-source-database-automation`, `nocodb-airtable-alternative-license-caution`, `directus-headless-cms-data-automation`, `pocketbase-lightweight-backend-saas-mvp`, `supabase-self-hosting-cost-operations-caution`, `meilisearch-blog-product-search-automation`, `typesense-product-document-search-automation` |
| content·research tools | 2 | `crawl4ai-blog-research-automation`, `opencut-free-open-source-video-editor-ai-content-automation` |
| series hub | 1 | `free-open-source-automation-tools-series` |

재공개 조건은 공식 문서 요약이 아니라 동일 입력으로 비교한 설치·운영 실험, 실패 로그, 라이선스·비용 확인일, 어떤 도구를 선택하지 않았는지의 판단 근거다. 검색 의도가 겹치는 묶음은 개별 글을 모두 살리기보다 비교 실험 1편과 도입 기록 1편으로 통합하는 안을 우선 검토한다.

### 6-3. 핵심 주제지만 근거 부족 14편 — EXPAND_WITH_EVIDENCE, noindex 유지

| 그룹 | 수량 | 전체 slug | 필요한 근거 |
| --- | ---: | --- | --- |
| 기존 업무 자동화 | 5 | `chatgpt-document-cleanup`, `google-sheets-ai-automation`, `obsidian-business-knowledge-base`, `pre-automation-task-list`, `reduce-repetitive-work-with-ai` | 실제 적용 과정, 실패·수정 기록, 측정하지 않은 절감 효과 경계 |
| 전자계약·결제 | 5 | `connect-contract-payment-customer-management`, `e-signature-identity-check`, `electronic-contract-system-basics`, `manage-unsigned-contracts`, `offline-card-payment-pg-van` | 공개 안전 fixture, provider/법률 판단과 로컬 코드 증거 분리 |
| 소상공인 운영 | 4 | `ai-knowledge-store-for-small-business`, `customer-memory-system`, `reservation-order-review-management`, `solo-business-systemization` | 실제 시스템 구조 또는 승인된 가상 fixture. 고객 기록 글은 개인정보 설계 근거 필수 |

### 6-4. 통합된 과거 URL 1편 — REDIRECT_301 의도, 현재 Next permanent redirect

- `unify-order-channels-for-sales`는 `draft + noindex`이며 `/ko/small-business/unify-order-channels`로 통합됐다.
- `next.config.ts`는 `permanent: true`를 사용하므로 Next.js 런타임 상태 코드는 통상 308이다. 이번 요구의 문자 그대로의 301이 필요하다면 기술 담당자가 별도 판단해야 한다.
- 두 글은 주문 원본·채널·보류라는 검색 의도가 실질적으로 같고, 대상 글에 WMS 증거가 있어 통합 근거는 타당하다.

## 7. 중복·반복 템플릿 분석

### 현재 공개 11편

- `npm run audit:content-originality`: PASS, max 5-token shingle Jaccard similarity `0.003`, 반복 장문 0개.
- `npm run audit:content-authority`: PASS, 공개 11편.
- 제목 정확 중복 0, description 정확 중복 0, canonical 중복 0.
- 공개 hero image 11/11 고유, 파일 누락 0.
- 공개 글은 H2 제목과 전개가 서로 다르며 과거의 `FAQ 3개 + download 1개` skeleton은 없다.
- 다만 6개 SUPPORTING/EXPAND 글이 모두 다운로드 CSV 1개, body link 0개, relatedPosts 3개라는 다른 형태의 반복 구조를 가진다. 텍스트 중복은 낮지만 독자 경험의 기계적 반복 가능성은 사람 검토가 필요하다.

### draft까지 포함한 76편

- 정확 중복 제목·description은 0건이다.
- 최대 유사도는 전자계약 draft 쌍 `0.342`다. 상위 10개 유사 쌍이 모두 전자계약 5편 조합이며 `0.281~0.342` 범위다.
- 도구 글 중 `dify`/`langflow`가 `0.276`, `dify`/`open-webui`와 `langflow`/`open-webui`가 각각 `0.244`다.
- `무료 오픈소스 자동화 도구 시리즈` heading은 26편에서 반복된다.
- draft CTA href `/ko/contact`는 33편에서 반복된다.
- CTA label은 `자동화 손실 점검 문의` 24편, `자동화 상담 문의` 9편에서 반복된다.
- 25편의 publishedAt이 `2026-06-15`, 22편의 publishedAt이 `2026-07-17`로 배치 생성 흔적이 강하다. 후자 22편은 현재 전부 격리되어 있다.

따라서 현재 공개 포트폴리오의 텍스트 유사도는 낮지만, draft 도구·계약 글을 그대로 다시 공개하면 반복 템플릿 리스크가 즉시 돌아온다. 단어 치환으로 낮출 문제가 아니라 콘텐츠 유형, 실제 실험, 실패·결정 근거를 달리해야 한다.

## 8. evidence·허위근거·개인정보 위험

### 확인된 안전 신호

- `data/evidence-manifest.json`의 7개 항목은 모두 `status=approved`, `sourceDirty=false`, `piiScan=pass`로 기록되어 있다.
- 공개 case-study는 fixture/local-demo임을 본문과 caption에서 명시하고 실제 고객 성과, 매출, 절감 시간, 오배송 감소율, 공급자 성공을 입증하지 않는다고 구분한다.
- 전체 Markdown을 대상으로 이메일, 국내 휴대전화, 주민번호형, 사업자번호형, 대표적인 API token형 패턴을 재검사한 결과 공개·draft 모두 0건이다.
- 공개 미수금·입금 문구의 회사명, 거래번호와 금액은 샘플임을 본문에서 명시한다.

### 남은 위험

1. manifest의 `piiScan=pass`는 저장된 검수 결과다. 이 ROLE에서는 원본 외부 저장소를 재실행하거나 이미지 픽셀을 독립 시각 검수하지 않았다.
2. `sales-revenue-ar-structure`는 “코드와 fixture로 확인”했다고 쓰지만 본문 source URL과 전용 manifest evidence가 없다. 공개 유지 시 source-only 근거를 독자가 추적할 수 있게 해야 한다.
3. `daily-sales-report`, `payment-reminder-message`, `sales-achievement-rate`는 다른 case-study에서 얻은 설계 원칙을 적용한 실무 자료다. 이를 실제 영업 현장 성공 사례로 승격해서는 안 된다.
4. `lib/editorial-evidence.ts`는 공개 글의 근거 문장을 제공하지만 source가 비어 있는 calculation/original-workflow 항목이 있다. 계산 재현과 실제 운영 증거를 동일하게 표시하지 않아야 한다.
5. `customer-memory-system`을 재공개하려면 최소 수집, 보관 기간, 접근 권한, 삭제·정정 경계가 실제 구현 또는 승인된 설계로 확인되어야 한다.
6. About/Author는 전자계약·지시 시스템을 직접 다뤘다고 설명하지만, 현재 공개 콘텐츠 manifest에는 이 두 시스템의 안전한 시각 증거가 없다. 사이트 소개 범위와 공개 증거 범위를 사람 검토에서 다시 맞춰야 한다.

## 9. 콘텐츠 우선순위 권고

### P0

- 콘텐츠 원본에서 확인된 공개 개인정보·secret 노출 P0는 없음.
- 공개 article orphan, 정확 중복 title/description, 공개 thin-content 감사 실패는 없음.

### P1

1. FLAGSHIP을 8편으로 맞추기 위해 허위 사례를 만들지 말고 현재 6편 한계를 유지한다.
2. `sales-revenue-ar-structure`는 직접 source/evidence가 확보되기 전 EXPAND_WITH_EVIDENCE로 취급한다.
3. 전자계약·결제 5편과 주제 이탈 22편은 현재 draft/noindex를 유지한다.
4. 도구형 28편은 개별 재공개가 아니라 검색 의도별 통합과 실제 비교 실험 확보 후 다시 판단한다.

### P2

1. 공개 SUPPORTING 4편은 서로 다른 실무 유형으로 차별화한다: 계산법, 보고서, 메시지 검토, 지표 해석.
2. body link 0개인 공개 6편은 문맥상 필요한 위치에만 고유 anchor를 추가하는 안을 검토한다.
3. 10편이 같은 최초 게시일인 이유와 실질 수정일이 사용자에게 자연스럽게 읽히는지 Preview에서 확인한다.

### P3

- 운영자 실명 공개 여부는 사람 승인 사항이다. placeholder를 공개하지 않는다.
- draft entertainment/Labs의 별도 도메인 이전·삭제·URL 변경은 이번 범위에서 결정하지 않는다.

## 10. 최종 분류 합계

| 분류 | 수량 | 공개/격리 |
| --- | ---: | --- |
| FLAGSHIP | 6 | 공개 6. 이 중 5편 visual, 1편 source-only |
| SUPPORTING | 4 | 공개 4 |
| EXPAND_WITH_EVIDENCE | 15 | 공개 1 + draft/noindex 14 |
| NOINDEX_ISOLATE | 50 | 영화·OTT 22 + 범용 도구 28, 모두 draft/noindex |
| REDIRECT_301 의도 | 1 | 원본 draft/noindex, Next permanent redirect |
| 합계 | 76 | 전수 분류 완료 |

`CONSOLIDATE`, `REMOVE_FROM_INDEX`, `KEEP_404_OR_410`를 현재 primary 분류로 확정한 추가 글은 없다. 도구 묶음은 future consolidation 후보지만 실제 검색 유입·Search Console 데이터가 없으므로 URL 통합을 확정하지 않았다.

## 11. 실행한 읽기 전용 검증

```text
npm run audit:content-originality
PASS (11 posts, max similarity 0.003, 0 repeated long paragraphs)

npm run audit:content-authority
PASS (11 posts)
```

추가로 임시 파일을 만들지 않는 Node 스크립트로 다음을 재계산했다.

- 76개 frontmatter·본문 분량·상태·noindex·author/date·CTA·내부링크·외부링크·evidence 연결
- 전체·공개 exact title/description 중복
- 공개와 전체 5-token shingle Jaccard similarity
- 반복 heading·CTA·게시일 묶음
- 공개 글 inbound/outbound와 orphan
- 이메일·전화번호·주민번호형·사업자번호형·대표 token형 문자열

검증 후 콘텐츠·소스·설정은 수정하지 않았다.

## 12. ROLE B·D 결론

현재 공개 11편은 과거 대량 도구/엔터테인먼트 공개면보다 주제와 증거가 명확하고, 5편은 승인된 로컬 시각 증거를 직접 갖는다. 그러나 실제 저장소 증거가 충분한 FLAGSHIP 후보는 source-only 1편을 포함해 6편뿐이다. 전자계약·결제·배차·고객 포털의 공개 안전 증거가 없으므로 8~12편을 맞춰 제안하면 허위 또는 과장 위험이 생긴다.

**판정: BLOCKED_INSUFFICIENT_TRUTHFUL_EVIDENCE**

사람이 제공하거나 공개를 승인한 안전 fixture가 확보되기 전에는 새 FLAGSHIP을 만들지 않는다. 기존 6편을 Preview에서 사람이 읽고, 증거 caption과 unsupported claim 경계를 독립 검수하는 것이 ROLE B·D의 다음 안전 단계다.
