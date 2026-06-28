# Biz2Lab AdSense 저가치 콘텐츠 회복 감사

작성일: 2026-06-28
범위: 공개 Korean static pages, published Korean articles, sitemap/RSS/robots discovery surface
데이터 원칙: Search Console, AdSense, GA4, Vercel Analytics, Umami API를 호출하지 않았고 클릭, 노출, CTR, 순위, 유입 수치를 만들지 않았습니다.

## 결론

AdSense의 "가치가 별로 없는 콘텐츠" 리스크는 단순 게시글 수보다 공개 첫인상, 독창적 실무 기준, 자료 허브, 내부 연결, 신뢰 페이지의 명확성에서 줄여야 합니다. 이번 회복 작업은 새 글이나 새 이미지 없이 기존 공개 콘텐츠의 실무 가치 신호를 강화하는 방향으로 진행했습니다.

핵심 조치:

- 홈페이지에 "도구 요약 블로그"가 아니라 소상공인/영업팀의 숫자, 주문, 미수금, 자동화 기준을 정리하는 사이트라는 설명을 강화했습니다.
- `/ko/resources` 실무 자료실을 추가해 달성률 계산, 매출 목표, 미수금, 주문 채널, 자동화 도구 비교를 한곳에서 찾게 했습니다.
- `/ko/about`에 운영자/편집 기준, 과장 금지, 리스크 확인, 문의 경로를 추가했습니다.
- 달성률 계산 클러스터 4개 글에 공식, 예시, table, 다음 행동 기준을 보강했습니다.
- 초기 자동화/계약/소상공인 글 10개에 본문 관련 글 블록을 추가했습니다.
- 도구 리뷰처럼 보일 수 있는 10개 자동화 도구 글에 "Biz2Lab 판단 기준"을 추가했습니다.
- SEO 운영 대시보드에 AdSense readiness, original value, practical template, repeated-template risk, internal link status, reviewer-facing issue를 추가했습니다.

## 공개 정적 페이지 점검

| 페이지 | Route | 점검 결과 | 조치 |
| --- | --- | --- | --- |
| Homepage | `/` | 사이트 목적과 실무 기준 링크가 더 명확해야 했음 | 실무 가치 문구와 핵심 글 링크 추가 |
| Korean home | `/ko` | homepage와 동일 구성 | `/`와 동일하게 개선 반영 |
| Automation hub | `/ko/automation` | 공개 카테고리 허브 | 유지 |
| Sales ops hub | `/ko/sales-ops` | 공개 카테고리 허브 | 유지 |
| Small business hub | `/ko/small-business` | 공개 카테고리 허브 | 유지 |
| Contracts/payments hub | `/ko/contracts-payments` | 공개 카테고리 허브 | 유지 |
| About | `/ko/about` | 신뢰/편집 기준이 더 구체적이어야 했음 | 운영자/편집 기준 추가 |
| Resources | `/ko/resources` | 기존에 없음 | 실무 자료실 신규 추가 |
| Contact | `/ko/contact` | 공개 문의 경로 존재 | 유지 |
| Privacy | `/ko/privacy` | 공개 개인정보처리방침 존재 | 유지 |
| Terms | `/ko/terms` | 공개 이용약관 존재 | 유지 |

## 분류 기준

- `ADSENSE_READY_CORE`: 독창적 실무 관점, 충분한 본문, 관련 글, 공식/표/체크리스트/FAQ 중 실무 자료가 확인됨.
- `NEEDS_ORIGINAL_VALUE`: 일반 요약처럼 보이며 Biz2Lab만의 판단 기준이 약함.
- `NEEDS_PRACTICAL_TEMPLATE`: 계산식, 체크리스트, 표, 실무 적용 항목이 약함.
- `NEEDS_EXPERIENCE_LAYER`: 실제 운영 판단, 리스크, 도입 전/후 기준이 약함.
- `NEEDS_INTERNAL_LINKS`: 독자가 다음 실무 글로 이동할 연결이 약함.
- `THIN_OR_GENERIC_REVIEW`: 도구 기능 요약처럼 보이고 실무 판단이 약함.
- `NOINDEX_CANDIDATE`: 공개 검색 대상에서 제외할 후보. 이번 작업에서는 새 noindex 후보를 지정하지 않았습니다.

## 게시글 감사 결과

| Article | Route | Status | Body links | Practical signal | Notes |
| --- | --- | --- | ---: | --- | --- |
| Apache Superset 분석: BI 대시보드 자동화에 쓸 수 있을까? | `/ko/automation/apache-superset-bi-dashboard-automation` | ADSENSE_READY_CORE | 6 | Biz2Lab 판단 기준 | BI 운영 난도와 대체 후보 비교 보강 |
| Metabase 분석: 소상공인 대시보드 자동화에 쓸 수 있을까? | `/ko/automation/metabase-dashboard-automation-for-small-business` | ADSENSE_READY_CORE | 7 | Biz2Lab 판단 기준 | 매출/미수금/주문 대시보드 적용 기준 보강 |
| Redash 분석: 오픈소스 대시보드 자동화에 쓸 수 있을까? | `/ko/automation/redash-open-source-dashboard-automation` | ADSENSE_READY_CORE | 5 | Biz2Lab 판단 기준 | SQL 리포팅 운영 조건 보강 |
| Matomo 분석: 셀프호스팅 웹 분석과 개인정보 운영 리스크를 감당할 수 있을까 | `/ko/automation/matomo-self-hosted-analytics-privacy-caution` | ADSENSE_READY_CORE | 4 | caution + checklist | 유지 |
| Plausible 분석: GA 대체 오픈소스 웹 분석 도구로 쓸 수 있을까? | `/ko/automation/plausible-open-source-analytics-ga-alternative` | ADSENSE_READY_CORE | 3 | caution + checklist | 유지 |
| PostHog 분석: 제품 분석과 이벤트 자동화에 쓸 수 있을까 | `/ko/automation/posthog-product-analytics-automation` | ADSENSE_READY_CORE | 5 | caution + checklist | 유지 |
| Umami 분석: GA 대체 오픈소스 웹 분석 도구로 쓸 수 있을까? | `/ko/automation/umami-open-source-analytics-ga-alternative` | ADSENSE_READY_CORE | 6 | Biz2Lab 판단 기준 | privacy/hosting 판단 기준 보강 |
| Meilisearch 분석: 블로그와 상품 검색 자동화에 쓸 수 있을까? | `/ko/automation/meilisearch-blog-product-search-automation` | ADSENSE_READY_CORE | 5 | checklist + table | 유지 |
| Supabase 셀프호스팅 분석: 도입 전에 확인할 비용·라이선스 리스크 | `/ko/automation/supabase-self-hosting-cost-operations-caution` | ADSENSE_READY_CORE | 5 | caution + table | 유지 |
| Typesense 분석: 상품·문서 검색 자동화 엔진으로 쓸 수 있을까? | `/ko/automation/typesense-product-document-search-automation` | ADSENSE_READY_CORE | 5 | checklist + table | 유지 |
| Directus 분석: headless CMS 도입 전에 확인할 업무 기준 | `/ko/automation/directus-headless-cms-data-automation` | ADSENSE_READY_CORE | 5 | checklist + table | 유지 |
| PocketBase 분석: SaaS MVP 도입 전에 확인할 업무 기준 | `/ko/automation/pocketbase-lightweight-backend-saas-mvp` | ADSENSE_READY_CORE | 5 | checklist + table | 유지 |
| Flowise 분석: AI 에이전트 운영 전에 확인할 기준 | `/ko/automation/flowise-ai-agent-workflow-automation` | ADSENSE_READY_CORE | 5 | Biz2Lab 판단 기준 | agent side-effect 리스크 보강 |
| Open WebUI 분석: 로컬 LLM 운영 전에 확인할 기준 | `/ko/automation/open-webui-local-llm-admin-portal` | ADSENSE_READY_CORE | 5 | Biz2Lab 판단 기준 | 권한/로그/보관 기준 보강 |
| Crawl4AI 분석: 콘텐츠 자동화 전에 확인할 시간·비용 기준 | `/ko/automation/crawl4ai-blog-research-automation` | ADSENSE_READY_CORE | 5 | Biz2Lab 판단 기준 | robots/약관/출처 검토 기준 보강 |
| Dify 분석: LLM 앱 빌더 운영 전에 확인할 기준 | `/ko/automation/dify-llm-app-builder-business-automation` | ADSENSE_READY_CORE | 7 | Biz2Lab 판단 기준 | RAG/고객 응대 승인 기준 보강 |
| Langflow 분석: AI 워크플로우 운영 전에 확인할 기준 | `/ko/automation/langflow-ai-workflow-automation` | ADSENSE_READY_CORE | 7 | Biz2Lab 판단 기준 | 프로토타입과 운영 자동화 분리 보강 |
| n8n 분석: 자동화 도구 도입 전에 확인할 비용·라이선스 리스크 | `/ko/automation/n8n-workflow-automation-license-caution` | ADSENSE_READY_CORE | 7 | caution + table | 유지 |
| NocoDB 분석: 도입 전에 확인할 비용·라이선스 리스크 | `/ko/automation/nocodb-airtable-alternative-license-caution` | ADSENSE_READY_CORE | 6 | caution + table | 유지 |
| Appsmith 분석: 내부 대시보드 자동화 도입 전에 확인할 업무 기준 | `/ko/automation/appsmith-internal-dashboard-automation` | ADSENSE_READY_CORE | 7 | Biz2Lab 판단 기준 | 내부 도구 도입 조건 보강 |
| Baserow 분석: 오픈소스 데이터베이스 대체 도구로 고르기 전에 확인할 기준 | `/ko/automation/baserow-open-source-database-automation` | ADSENSE_READY_CORE | 5 | checklist + table | 유지 |
| Huginn 분석: 모니터링 자동화 도입 전에 확인할 업무 기준 | `/ko/automation/huginn-monitoring-automation-agent` | ADSENSE_READY_CORE | 3 | checklist + table | 유지 |
| Kestra 분석: 데이터 AI 워크플로 도입 전에 확인할 업무 기준 | `/ko/automation/kestra-data-ai-workflow-orchestration` | ADSENSE_READY_CORE | 9 | checklist + table | 유지 |
| Node-RED 분석: 로컬 자동화 서버 도입 전에 확인할 업무 기준 | `/ko/automation/node-red-local-business-automation-server` | ADSENSE_READY_CORE | 3 | checklist + table | 유지 |
| Windmill 분석: 개발자 워크플로우 자동화 도입 전에 확인할 업무 기준 | `/ko/automation/windmill-developer-workflow-automation` | ADSENSE_READY_CORE | 8 | checklist + table | 유지 |
| Activepieces 분석: 업무 자동화 대체 도구로 고르기 전에 확인할 기준 | `/ko/automation/activepieces-ai-business-automation-n8n-alternative` | ADSENSE_READY_CORE | 2 | checklist + table | 유지 |
| 무료 오픈소스 자동화 도구 실전 분석: 도입 전에 확인할 기준 | `/ko/automation/free-open-source-automation-tools-series` | ADSENSE_READY_CORE | 27 | series hub | 유지 |
| OpenCut 분석: 무료 영상 편집기 대체 도구로 고르기 전에 확인할 기준 | `/ko/automation/opencut-free-open-source-video-editor-ai-content-automation` | ADSENSE_READY_CORE | 5 | checklist + table | 유지 |
| AI 업무 자동화: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/automation/ai-business-automation-guide` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |
| 업무 자동화 우선순위: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/automation/automation-priority-method` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |
| ChatGPT 문서 정리: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/automation/chatgpt-document-cleanup` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |
| Google Sheets AI 자동화: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/automation/google-sheets-ai-automation` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |
| 옵시디언 업무 지식창고: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/automation/obsidian-business-knowledge-base` | ADSENSE_READY_CORE | 0 | checklist/table | frontmatter related links 유지 |
| 자동화 전 업무 정리: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/automation/pre-automation-task-list` | ADSENSE_READY_CORE | 0 | checklist/table | frontmatter related links 유지 |
| 반복 업무 줄이기: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/automation/reduce-repetitive-work-with-ai` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |
| 계약 결제 고객관리 연결: 놓치기 전에 확인할 업무 기준 | `/ko/contracts-payments/connect-contract-payment-customer-management` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |
| 전자서명 본인확인: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/contracts-payments/e-signature-identity-check` | ADSENSE_READY_CORE | 0 | checklist/table | frontmatter related links 유지 |
| 전자계약 기본 기능: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/contracts-payments/electronic-contract-system-basics` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |
| 미서명 계약 관리: 놓치기 전에 확인할 업무 기준 | `/ko/contracts-payments/manage-unsigned-contracts` | ADSENSE_READY_CORE | 0 | checklist/table | frontmatter related links 유지 |
| 오프라인 카드결제 PG/VAN 분석: 고르기 전에 확인할 기준 | `/ko/contracts-payments/offline-card-payment-pg-van` | ADSENSE_READY_CORE | 0 | checklist/table | frontmatter related links 유지 |
| 미수금 관리: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/sales-ops/accounts-receivable-tracker` | ADSENSE_READY_CORE | 3 | formula/table | 미수금과 달성률 계산 연결 보강 |
| 일일 매출 목표: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/sales-ops/daily-sales-goal-breakdown` | ADSENSE_READY_CORE | 3 | formula/table | 오늘 목표 계산표 보강 |
| 영업팀 보고: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/sales-ops/daily-sales-report` | ADSENSE_READY_CORE | 3 | checklist/table | 유지 |
| 거래처 입금 확인 메시지: 독촉처럼 보이기 전에 정리할 기준 | `/ko/sales-ops/payment-reminder-message` | ADSENSE_READY_CORE | 3 | checklist/table | 유지 |
| 매출 달성률: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/sales-ops/sales-achievement-rate` | ADSENSE_READY_CORE | 3 | formula/table | 공식과 예시 보강 |
| 매출 미수금 구조: 놓치기 전에 확인할 업무 기준 | `/ko/sales-ops/sales-revenue-ar-structure` | ADSENSE_READY_CORE | 3 | checklist/table | 유지 |
| 거래처 주문 관리: 놓치기 전에 확인할 업무 기준 | `/ko/sales-ops/unify-order-channels-for-sales` | ADSENSE_READY_CORE | 3 | checklist/table | 유지 |
| AI 점장: 놓치기 전에 확인할 업무 기준 | `/ko/small-business/ai-knowledge-store-for-small-business` | ADSENSE_READY_CORE | 0 | checklist/table | frontmatter related links 유지 |
| 고객 정보: 놓치기 전에 확인할 업무 기준 | `/ko/small-business/customer-memory-system` | ADSENSE_READY_CORE | 0 | checklist/table | frontmatter related links 유지 |
| 소상공인 매일 숫자: 달성률 계산부터 매출 관리까지 | `/ko/small-business/daily-numbers-for-small-business` | ADSENSE_READY_CORE | 4 | formula/table | 공식 문자열 보강 |
| 예약 주문 리뷰 관리: 놓치기 전에 확인할 업무 기준 | `/ko/small-business/reservation-order-review-management` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |
| 1인 사업자 업무 시스템화: 시간을 잃기 전에 먼저 정리할 기준 | `/ko/small-business/solo-business-systemization` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |
| 주문 관리 자동화: 놓치기 전에 확인할 업무 기준 | `/ko/small-business/unify-order-channels` | ADSENSE_READY_CORE | 3 | related links | 본문 관련 글 보강 |

## 남은 관찰 사항

- `NOINDEX_CANDIDATE`는 이번 회복 작업에서 지정하지 않았습니다.
- 일부 초기 글은 본문 링크보다 relatedPosts 카드 의존도가 더 큽니다. 이번 배치에서는 핵심 10개만 본문 링크를 보강했고, 나머지는 이후 evergreen hardening에서 한 번에 2~5개씩 처리하는 것이 안전합니다.
- 자동화 도구 글은 기능 요약보다 "언제 쓰면 안 되는지", "도입 전 먼저 할 일", "운영 비용"을 계속 유지해야 합니다.
- SEO 운영 대시보드는 운영자 전용 noindex 화면으로 유지해야 하며 공개 자료실에서 직접 노출하지 않습니다.

## 정책 안전 확인

- fake analytics: NO
- fake Search Console data: NO
- fake AdSense status: NO
- meta keywords: NO
- new article queue: NO
- new generated article/image: NO
- manual deploy/redeploy: NO
- copied third-party content: NO
