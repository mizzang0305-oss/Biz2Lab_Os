# Biz2Lab AdSense Approval Master Audit

Date: 2026-07-07
Scope: public static routes, `/ko/ops/seo-dashboard`, and all published Korean articles from `content/ko`.

## Official policy basis

- AdSense content and user experience: Google asks sites to provide enough unique, valuable content and a usable navigation experience before monetization review. Source: https://support.google.com/adsense/answer/10015918?hl=ko
- Google Publisher Policies: Google ad code must follow publisher policy and avoid misleading, low-value, unfinished, or unsafe inventory. Source: https://support.google.com/adsense/answer/10502938?hl=ko

## Summary

- total public indexable pages: 64
- total noindex intended pages: 1
- LOW risk count: 65
- MEDIUM risk count: 0
- HIGH risk count: 0
- noindex candidates: 0
- pages fixed: homepage, resources, about, SEO ops dashboard readiness fields, Baserow, Huginn, Kestra, Windmill
- pages still requiring owner review: none for repository-level approval blockers; live recrawl still required after deploy
- recommendation: `WAIT_FOR_RECRAWL`

## Ads / policy scan

- existing AdSense client loader: YES
- ad slot markup: NO
- fake analytics: NO
- meta keywords: NO
- policy risk: LOW
- note: `public/ads.txt` exists as a readiness artifact. No ad slot markup was added.

## NOINDEX_OR_MERGE_REVIEW_CANDIDATES

| route | decision | reason |
|---|---|---|
| `/ko/ops/seo-dashboard` | leave noindex | operator-only dashboard, locked screen, excluded from sitemap/RSS |

No indexable public page is currently marked as HIGH risk in this repository audit. Strengthening was preferred over noindex.

## Audit Objects

| route | title | type | indexStatus | contentValueScore | originalityScore | practicalUtilityScore | navigationScore | trustScore | templateRiskScore | adsenseRisk | issue | requiredFix |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---|---|---|
| `/` | Biz2Lab | homepage | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | homepage now foregrounds practical numbers and resources | monitor after recrawl |
| `/ko` | Biz2Lab | homepage | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | homepage now foregrounds practical numbers and resources | monitor after recrawl |
| `/ko/automation` | AI 업무 자동화 | static | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | category hub points to practical articles | monitor after recrawl |
| `/ko/sales-ops` | 영업·매출 관리 | static | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | category hub points to formulas and checklists | monitor after recrawl |
| `/ko/small-business` | 소상공인 운영 | static | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | category hub points to daily operations content | monitor after recrawl |
| `/ko/contracts-payments` | 전자계약·결제 | static | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | category hub remains policy-safe | monitor after recrawl |
| `/ko/about` | 소개 | static | indexable | 4 | 4 | 4 | 4 | 5 | 1 | LOW | editorial trust and risk review principles strengthened | monitor after recrawl |
| `/ko/resources` | Biz2Lab 실무 자료실 | resource | indexable | 5 | 4 | 5 | 5 | 4 | 1 | LOW | upgraded from link list into five practical clusters | monitor after recrawl |
| `/ko/contact` | 문의 | static | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | contact path supports trust | monitor after recrawl |
| `/ko/privacy` | 개인정보처리방침 | static | indexable | 4 | 4 | 4 | 4 | 5 | 1 | LOW | privacy route supports trust | monitor after recrawl |
| `/ko/terms` | 이용약관 | static | indexable | 4 | 4 | 4 | 4 | 5 | 1 | LOW | terms route supports trust | monitor after recrawl |
| `/ko/ops/seo-dashboard` | Biz2Lab SEO 운영 대시보드 | ops-noindex | noindex-intended | 0 | 0 | 0 | 0 | 4 | 0 | LOW | operator-only dashboard excluded from approval content | keep noindex/nofollow and excluded from sitemap/RSS |
| `/ko/automation/apache-superset-bi-dashboard-automation` | Apache Superset 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision-guide article | monitor after recrawl |
| `/ko/automation/metabase-dashboard-automation-for-small-business` | Metabase 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision-guide article | monitor after recrawl |
| `/ko/automation/redash-open-source-dashboard-automation` | Redash 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision-guide article | monitor after recrawl |
| `/ko/automation/matomo-self-hosted-analytics-privacy-caution` | Matomo 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | analytics privacy caution keeps added value | monitor after recrawl |
| `/ko/automation/plausible-open-source-analytics-ga-alternative` | Plausible 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | analytics decision-guide article | monitor after recrawl |
| `/ko/automation/posthog-product-analytics-automation` | PostHog 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | product analytics decision guide | monitor after recrawl |
| `/ko/automation/umami-open-source-analytics-ga-alternative` | Umami 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | analytics decision-guide article | monitor after recrawl |
| `/ko/automation/meilisearch-blog-product-search-automation` | Meilisearch 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | search automation decision guide | monitor after recrawl |
| `/ko/automation/supabase-self-hosting-cost-operations-caution` | Supabase 셀프호스팅 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | cost and operations caution included | monitor after recrawl |
| `/ko/automation/typesense-product-document-search-automation` | Typesense 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | search automation decision guide | monitor after recrawl |
| `/ko/automation/directus-headless-cms-data-automation` | Directus 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | data automation decision guide | monitor after recrawl |
| `/ko/automation/pocketbase-lightweight-backend-saas-mvp` | PocketBase 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | SaaS MVP caution included | monitor after recrawl |
| `/ko/automation/flowise-ai-agent-workflow-automation` | Flowise 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | AI workflow decision guide | monitor after recrawl |
| `/ko/automation/open-webui-local-llm-admin-portal` | Open WebUI 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | local LLM operations guide | monitor after recrawl |
| `/ko/automation/crawl4ai-blog-research-automation` | Crawl4AI 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | content automation caution included | monitor after recrawl |
| `/ko/automation/dify-llm-app-builder-business-automation` | Dify 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | LLM app builder decision guide | monitor after recrawl |
| `/ko/automation/langflow-ai-workflow-automation` | Langflow 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | workflow decision guide | monitor after recrawl |
| `/ko/automation/n8n-workflow-automation-license-caution` | n8n 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | license caution included | monitor after recrawl |
| `/ko/automation/nocodb-airtable-alternative-license-caution` | NocoDB 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | license caution included | monitor after recrawl |
| `/ko/automation/appsmith-internal-dashboard-automation` | Appsmith 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision criteria present | monitor after recrawl |
| `/ko/automation/baserow-open-source-database-automation` | Baserow 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision criteria strengthened | monitor after recrawl |
| `/ko/automation/huginn-monitoring-automation-agent` | Huginn 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision criteria strengthened | monitor after recrawl |
| `/ko/automation/kestra-data-ai-workflow-orchestration` | Kestra 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision criteria strengthened | monitor after recrawl |
| `/ko/automation/node-red-local-business-automation-server` | Node-RED 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision criteria present | monitor after recrawl |
| `/ko/automation/windmill-developer-workflow-automation` | Windmill 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision criteria strengthened | monitor after recrawl |
| `/ko/automation/activepieces-ai-business-automation-n8n-alternative` | Activepieces 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | decision criteria present | monitor after recrawl |
| `/ko/automation/free-open-source-automation-tools-series` | 무료 오픈소스 자동화 도구 실전 분석 | series-hub | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | series hub anchors tool cluster | monitor after recrawl |
| `/ko/automation/opencut-free-open-source-video-editor-ai-content-automation` | OpenCut 분석 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | practical caution article | monitor after recrawl |
| `/ko/automation/ai-business-automation-guide` | AI 업무 자동화 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | practical automation criteria | monitor after recrawl |
| `/ko/automation/automation-priority-method` | 업무 자동화 우선순위 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | prioritization criteria | monitor after recrawl |
| `/ko/automation/chatgpt-document-cleanup` | ChatGPT 문서 정리 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | practical checklist content | monitor after recrawl |
| `/ko/automation/google-sheets-ai-automation` | Google Sheets AI 자동화 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | spreadsheet automation criteria | monitor after recrawl |
| `/ko/automation/obsidian-business-knowledge-base` | 옵시디언 업무 지식창고 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | knowledge base operations guide | monitor after recrawl |
| `/ko/automation/pre-automation-task-list` | 자동화 전 업무 정리 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | pre-automation checklist | monitor after recrawl |
| `/ko/automation/reduce-repetitive-work-with-ai` | 반복 업무 줄이기 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | practical AI automation guidance | monitor after recrawl |
| `/ko/contracts-payments/connect-contract-payment-customer-management` | 계약 결제 고객관리 연결 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | workflow guidance | monitor after recrawl |
| `/ko/contracts-payments/e-signature-identity-check` | 전자서명 본인확인 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | identity-check caution included | monitor after recrawl |
| `/ko/contracts-payments/electronic-contract-system-basics` | 전자계약 기본 기능 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | contract basics guidance | monitor after recrawl |
| `/ko/contracts-payments/manage-unsigned-contracts` | 미서명 계약 관리 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | practical contract follow-up | monitor after recrawl |
| `/ko/contracts-payments/offline-card-payment-pg-van` | 오프라인 카드결제 PG/VAN 분석 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | payment decision criteria | monitor after recrawl |
| `/ko/sales-ops/accounts-receivable-tracker` | 미수금 관리 | article | indexable | 5 | 4 | 5 | 4 | 4 | 1 | LOW | formula and checklist present | monitor after recrawl |
| `/ko/sales-ops/daily-sales-goal-breakdown` | 일일 매출 목표 | article | indexable | 5 | 4 | 5 | 4 | 4 | 1 | LOW | formula and checklist present | monitor after recrawl |
| `/ko/sales-ops/daily-sales-report` | 영업팀 보고 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | practical reporting guidance | monitor after recrawl |
| `/ko/sales-ops/payment-reminder-message` | 거래처 입금 확인 메시지 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | practical template content | monitor after recrawl |
| `/ko/sales-ops/sales-achievement-rate` | 매출 달성률 | article | indexable | 5 | 4 | 5 | 4 | 4 | 1 | LOW | formulas present | monitor after recrawl |
| `/ko/sales-ops/sales-revenue-ar-structure` | 매출 미수금 구조 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | revenue and AR structure guidance | monitor after recrawl |
| `/ko/sales-ops/unify-order-channels-for-sales` | 거래처 주문 관리 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | order workflow guidance | monitor after recrawl |
| `/ko/small-business/ai-knowledge-store-for-small-business` | AI 점장 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | practical small-business guidance | monitor after recrawl |
| `/ko/small-business/customer-memory-system` | 고객 정보 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | customer-memory caution included | monitor after recrawl |
| `/ko/small-business/daily-numbers-for-small-business` | 소상공인 매일 숫자 | article | indexable | 5 | 4 | 5 | 4 | 4 | 1 | LOW | daily checklist and formulas present | monitor after recrawl |
| `/ko/small-business/reservation-order-review-management` | 예약 주문 리뷰 관리 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | practical operations checklist | monitor after recrawl |
| `/ko/small-business/solo-business-systemization` | 1인 사업자 업무 시스템화 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | solo-operator systemization guide | monitor after recrawl |
| `/ko/small-business/unify-order-channels` | 주문 관리 자동화 | article | indexable | 4 | 4 | 4 | 4 | 4 | 1 | LOW | order-channel checklist | monitor after recrawl |

## Fixed Pages

- Homepage: added reviewer-facing practical blocks for loss-making numbers, practical resources, tool decision criteria, recent practical posts, and recommended paths.
- `/ko/resources`: rebuilt as a five-cluster practical proof page with formulas, checklists, decision guides, template labels, loss framing, and next links.
- `/ko/about`: strengthened editorial principles, risk review, privacy/contact paths, and anti-overclaim language.
- Core practical article cluster: retained formulas, tables, checklists, today-check framing, and internal links.
- Tool decision guides: Baserow, Huginn, Kestra, and Windmill now include the exact `Biz2Lab 판단 기준: 이런 경우에만 검토하세요` section.
- SEO ops dashboard: added content value, navigation/discovery, noindex candidate, and policy-risk readiness signals while keeping noindex/nofollow.

## Remaining Owner Review

- Deploy is not performed here.
- After Git/Vercel deployment, wait for recrawl before requesting AdSense review.
- Live Search Console/AdSense UI states remain owner-side checks and are not claimed from repository evidence.
