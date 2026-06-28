# Biz2Lab AdSense policy-based content value recovery audit

작성일: 2026-06-28
범위: 공개 Korean static routes and all published Korean articles.

데이터 원칙: AdSense API, Search Console API, GA4, Vercel Analytics, Umami API를 호출하지 않았고 클릭, 노출, CTR, 순위, 유입 수치를 만들지 않았습니다. 이 문서는 정책 리스크를 줄이기 위한 로컬 콘텐츠 감사입니다.

## Policy Risk Categories

- LOW_VALUE_CONTENT_RISK: 실무 예시, 계산식, 체크리스트, 판단 기준이 부족한 공개 콘텐츠.
- THIN_CONTENT_RISK: 분량과 구조가 부족해 독립 페이지 가치가 약한 콘텐츠.
- DUPLICATE_TEMPLATE_RISK: 반복 템플릿처럼 보이며 고유 판단 기준이 약한 콘텐츠.
- GENERIC_TOOL_SUMMARY_RISK: 도구 기능 요약에 머물고 Biz2Lab 판단 기준이 약한 콘텐츠.
- NO_ORIGINAL_PRACTICAL_VALUE: 현장 입력값, 손실 회피, 다음 행동이 약한 콘텐츠.
- WEAK_NAVIGATION_OR_DISCOVERY: 내부 링크나 허브 연결이 약한 콘텐츠.
- WEAK_AUTHOR_EDITORIAL_TRUST: 운영 목적, 편집 기준, 과장 금지, 문의 경로가 약한 페이지.
- ADSENSE_READY_CORE: 현재 공개 상태에서 독립 가치, 구조, 탐색, 신뢰 신호가 갖춰진 핵심 콘텐츠.

## Summary After Recovery

- Public static routes audited: 11
- Published Korean articles audited: 53
- ADSENSE_READY_CORE: 42
- LOW_VALUE_CONTENT_RISK: 0
- THIN_CONTENT_RISK: 0
- GENERIC_TOOL_SUMMARY_RISK: 15
- NO_ORIGINAL_PRACTICAL_VALUE: 0
- WEAK_NAVIGATION_OR_DISCOVERY: 7
- AdSense ad code added: NO
- Fake analytics added: NO
- Meta keywords added: NO
- New content queue added: NO

## Static Public Route Audit

| route | title | category | substance level | original Biz2Lab value | checklist/formula/template/table presence | internal links | repeated-template risk | answers 이걸 안 보면 손해 | policy risk category | exact recommended fix |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | Biz2Lab home | home | static public page | 소상공인·영업팀 실무 문제와 핵심 자료로 진입시키는 공개 첫 화면 | page navigation | internal route links | low | YES | ADSENSE_READY_CORE | 정기적으로 핵심 자료 링크와 손실 방지 문구를 최신화 |
| /ko | Biz2Lab Korean home | home | static public page | Korean public content entry | page navigation | internal route links | low | N/A | ADSENSE_READY_CORE | 홈과 동일한 핵심 자료 탐색 유지 |
| /ko/automation | AI 업무 자동화 | hub | static public page | 자동화 글 탐색 허브 | page navigation | internal route links | low | N/A | WEAK_NAVIGATION_OR_DISCOVERY | 시리즈와 실무 기준 글 연결 유지 |
| /ko/sales-ops | 영업·매출 관리 | hub | static public page | 매출, 달성률, 미수금, 리포트 글 탐색 허브 | page navigation | internal route links | low | N/A | WEAK_NAVIGATION_OR_DISCOVERY | 달성률·미수금 핵심 글을 상단 유지 |
| /ko/small-business | 소상공인 운영 | hub | static public page | 매일 숫자, 주문 채널, 예약·리뷰, 시스템화 글 탐색 허브 | page navigation | internal route links | low | N/A | WEAK_NAVIGATION_OR_DISCOVERY | 매일 숫자와 주문 통합 링크 유지 |
| /ko/contracts-payments | 전자계약·결제 | hub | static public page | 계약, 결제, 미서명 관리 글 탐색 허브 | page navigation | internal route links | low | N/A | WEAK_NAVIGATION_OR_DISCOVERY | 계약·결제 리스크 경고 유지 |
| /ko/about | Biz2Lab 소개 | trust | static public page | 운영 목적, 콘텐츠 검토 기준, 과장 금지, 문의 경로를 설명 | page navigation | internal route links | low | N/A | ADSENSE_READY_CORE | 가짜 약력 없이 실제 편집 기준 유지 |
| /ko/resources | Biz2Lab 실무 자료실 | resources | static public page | 계산식·체크리스트·도구 판단 기준을 문제/손실/다음 글로 연결 | page navigation | internal route links | low | YES | ADSENSE_READY_CORE | 새 공용 자료를 추가할 때 기존 글 기반으로만 연결 |
| /ko/contact | 문의 | contact | static public page | 공개 문의 경로 | page navigation | internal route links | low | N/A | WEAK_NAVIGATION_OR_DISCOVERY | 실제 문의 경로 유지 |
| /ko/privacy | 개인정보 처리방침 | policy | static public page | 사이트 운영 정책 정보 | page navigation | internal route links | low | N/A | WEAK_NAVIGATION_OR_DISCOVERY | 정책 변경 시 갱신 |
| /ko/terms | 이용약관 | policy | static public page | 사이트 이용 기준 정보 | page navigation | internal route links | low | N/A | WEAK_NAVIGATION_OR_DISCOVERY | 정책 변경 시 갱신 |

## Published Article Audit

| route | title | category | substance level | original Biz2Lab value | checklist/formula/template/table presence | internal links | repeated-template risk | answers 이걸 안 보면 손해 | policy risk category | exact recommended fix |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| /ko/automation/apache-superset-bi-dashboard-automation | Apache Superset 분석: BI 대시보드 자동화에 쓸 수 있을까? | automation | solid (3923 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 6 in-body / 4 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/metabase-dashboard-automation-for-small-business | Metabase 분석: 소상공인 대시보드 자동화에 쓸 수 있을까? | automation | solid (3794 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 7 in-body / 4 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/redash-open-source-dashboard-automation | Redash 분석: 오픈소스 대시보드 자동화에 쓸 수 있을까? | automation | solid (3736 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 4 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/matomo-self-hosted-analytics-privacy-caution | Matomo 분석: 셀프호스팅 웹 분석과 개인정보 운영 리스크를 감당할 수 있을까 | automation | solid (4870 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 4 in-body / 4 related | low | YES | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/plausible-open-source-analytics-ga-alternative | Plausible 분석: GA 대체 오픈소스 웹 분석 도구로 쓸 수 있을까? | automation | solid (4981 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 3 in-body / 4 related | low | YES | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/posthog-product-analytics-automation | PostHog 분석: 제품 분석과 이벤트 자동화에 쓸 수 있을까 | automation | high (5658 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 4 related | medium | YES | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/umami-open-source-analytics-ga-alternative | Umami 분석: GA 대체 오픈소스 웹 분석 도구로 쓸 수 있을까? | automation | solid (3927 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 6 in-body / 4 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/meilisearch-blog-product-search-automation | Meilisearch 분석: 블로그와 상품 검색 자동화에 쓸 수 있을까? | automation | solid (4462 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 4 related | medium | YES | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/supabase-self-hosting-cost-operations-caution | Supabase 셀프호스팅 분석: 도입 전에 확인할 비용·라이선스 리스크 | automation | high (5201 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 5 in-body / 4 related | low | YES | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/typesense-product-document-search-automation | Typesense 분석: 상품·문서 검색 자동화 엔진으로 쓸 수 있을까? | automation | high (5668 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 4 related | medium | YES | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/directus-headless-cms-data-automation | Directus 분석: headless CMS 도입 전에 확인할 업무 기준 | automation | high (5136 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 4 related | medium | YES | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/pocketbase-lightweight-backend-saas-mvp | PocketBase 분석: SaaS MVP 도입 전에 확인할 업무 기준 | automation | high (5094 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 5 in-body / 4 related | medium | YES | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/flowise-ai-agent-workflow-automation | Flowise 분석: AI 에이전트 운영 전에 확인할 기준 | automation | high (5205 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 4 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/open-webui-local-llm-admin-portal | Open WebUI 분석: 로컬 LLM 운영 전에 확인할 기준 | automation | solid (3898 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 4 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/crawl4ai-blog-research-automation | Crawl4AI 분석: 콘텐츠 자동화 전에 확인할 시간·비용 기준 | automation | solid (3990 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 4 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/dify-llm-app-builder-business-automation | Dify 분석: LLM 앱 빌더 운영 전에 확인할 기준 | automation | solid (3813 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 7 in-body / 4 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/langflow-ai-workflow-automation | Langflow 분석: AI 워크플로우 운영 전에 확인할 기준 | automation | solid (3956 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 7 in-body / 4 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/n8n-workflow-automation-license-caution | n8n 분석: 자동화 도구 도입 전에 확인할 비용·라이선스 리스크 | automation | high (7355 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 7 in-body / 6 related | low | PARTIAL | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/nocodb-airtable-alternative-license-caution | NocoDB 분석: 도입 전에 확인할 비용·라이선스 리스크 | automation | high (8597 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 6 in-body / 6 related | low | PARTIAL | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/appsmith-internal-dashboard-automation | Appsmith 분석: 내부 대시보드 자동화 도입 전에 확인할 업무 기준 | automation | solid (4402 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 7 in-body / 6 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/baserow-open-source-database-automation | Baserow 분석: 오픈소스 데이터베이스 대체 도구로 고르기 전에 확인할 기준 | automation | high (5912 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 5 related | low | PARTIAL | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/huginn-monitoring-automation-agent | Huginn 분석: 모니터링 자동화 도입 전에 확인할 업무 기준 | automation | high (5373 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 3 in-body / 4 related | low | PARTIAL | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/kestra-data-ai-workflow-orchestration | Kestra 분석: 데이터 AI 워크플로 도입 전에 확인할 업무 기준 | automation | high (6691 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 9 in-body / 6 related | medium | PARTIAL | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/node-red-local-business-automation-server | Node-RED 분석: 로컬 자동화 서버 도입 전에 확인할 업무 기준 | automation | high (5908 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 3 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/windmill-developer-workflow-automation | Windmill 분석: 개발자 워크플로우 자동화 도입 전에 확인할 업무 기준 | automation | high (7234 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 8 in-body / 6 related | medium | PARTIAL | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/activepieces-ai-business-automation-n8n-alternative | Activepieces 분석: 업무 자동화 대체 도구로 고르기 전에 확인할 기준 | automation | high (6858 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 2 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/free-open-source-automation-tools-series | 무료 오픈소스 자동화 도구 실전 분석: 도입 전에 확인할 기준 | automation | high (8511 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 27 in-body / 6 related | low | PARTIAL | GENERIC_TOOL_SUMMARY_RISK | add Biz2Lab decision criteria section |
| /ko/automation/opencut-free-open-source-video-editor-ai-content-automation | OpenCut 분석: 무료 영상 편집기 대체 도구로 고르기 전에 확인할 기준 | automation | high (6916 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 5 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/ai-business-automation-guide | AI 업무 자동화: 시간을 잃기 전에 먼저 정리할 기준 | automation | high (5396 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 3 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/automation-priority-method | 업무 자동화 우선순위: 시간을 잃기 전에 먼저 정리할 기준 | automation | solid (4955 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 3 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/chatgpt-document-cleanup | ChatGPT 문서 정리: 시간을 잃기 전에 먼저 정리할 기준 | automation | solid (4901 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/google-sheets-ai-automation | Google Sheets AI 자동화: 시간을 잃기 전에 먼저 정리할 기준 | automation | solid (4876 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 3 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/obsidian-business-knowledge-base | 옵시디언 업무 지식창고: 시간을 잃기 전에 먼저 정리할 기준 | automation | solid (4317 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 0 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/pre-automation-task-list | 자동화 전 업무 정리: 시간을 잃기 전에 먼저 정리할 기준 | automation | solid (4318 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 0 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/automation/reduce-repetitive-work-with-ai | 반복 업무 줄이기: 시간을 잃기 전에 먼저 정리할 기준 | automation | solid (4583 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 3 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/contracts-payments/connect-contract-payment-customer-management | 계약 결제 고객관리 연결: 놓치기 전에 확인할 업무 기준 | contracts-payments | high (5015 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/contracts-payments/e-signature-identity-check | 전자서명 본인확인: 시간을 잃기 전에 먼저 정리할 기준 | contracts-payments | solid (4132 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 0 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/contracts-payments/electronic-contract-system-basics | 전자계약 기본 기능: 시간을 잃기 전에 먼저 정리할 기준 | contracts-payments | high (5211 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/contracts-payments/manage-unsigned-contracts | 미서명 계약 관리: 놓치기 전에 확인할 업무 기준 | contracts-payments | solid (4082 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 0 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/contracts-payments/offline-card-payment-pg-van | 오프라인 카드결제 PG/VAN 분석: 고르기 전에 확인할 기준 | contracts-payments | solid (4510 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 0 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/sales-ops/accounts-receivable-tracker | 미수금 관리: 시간을 잃기 전에 먼저 정리할 기준 | sales-ops | high (6150 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/sales-ops/daily-sales-goal-breakdown | 일일 매출 목표: 시간을 잃기 전에 먼저 정리할 기준 | sales-ops | high (5260 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/sales-ops/daily-sales-report | 영업팀 보고: 시간을 잃기 전에 먼저 정리할 기준 | sales-ops | solid (4489 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 3 in-body / 3 related | low | PARTIAL | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/sales-ops/payment-reminder-message | 거래처 입금 확인 메시지: 독촉처럼 보이기 전에 정리할 기준 | sales-ops | high (5123 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/sales-ops/sales-achievement-rate | 매출 달성률: 시간을 잃기 전에 먼저 정리할 기준 | sales-ops | high (5171 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/sales-ops/sales-revenue-ar-structure | 매출 미수금 구조: 놓치기 전에 확인할 업무 기준 | sales-ops | high (5033 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/sales-ops/unify-order-channels-for-sales | 거래처 주문 관리: 놓치기 전에 확인할 업무 기준 | sales-ops | solid (4702 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/small-business/ai-knowledge-store-for-small-business | AI 점장: 놓치기 전에 확인할 업무 기준 | small-business | solid (4214 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 0 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/small-business/customer-memory-system | 고객 정보: 놓치기 전에 확인할 업무 기준 | small-business | solid (4500 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 0 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/small-business/daily-numbers-for-small-business | 소상공인 매일 숫자: 달성률 계산부터 매출 관리까지 | small-business | high (5243 chars) | 도구 기능 요약보다 설정 부담, 운영 비용, 데이터 리스크, 사람 승인 기준을 제시 | YES | 4 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/small-business/reservation-order-review-management | 예약 주문 리뷰 관리: 놓치기 전에 확인할 업무 기준 | small-business | solid (4508 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/small-business/solo-business-systemization | 1인 사업자 업무 시스템화: 시간을 잃기 전에 먼저 정리할 기준 | small-business | solid (4482 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |
| /ko/small-business/unify-order-channels | 주문 관리 자동화: 놓치기 전에 확인할 업무 기준 | small-business | solid (4745 chars) | 현장 업무 입력값, 계산식, 확인 담당자, 다음 행동을 제시 | YES | 3 in-body / 3 related | low | YES | ADSENSE_READY_CORE | leave as-is; monitor after recrawl |

## NOINDEX_OR_MERGE_REVIEW_CANDIDATES

| route | title | risk | recommendation |
| --- | --- | --- | --- |
| /ko/automation/matomo-self-hosted-analytics-privacy-caution | Matomo 분석: 셀프호스팅 웹 분석과 개인정보 운영 리스크를 감당할 수 있을까 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/plausible-open-source-analytics-ga-alternative | Plausible 분석: GA 대체 오픈소스 웹 분석 도구로 쓸 수 있을까? | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/posthog-product-analytics-automation | PostHog 분석: 제품 분석과 이벤트 자동화에 쓸 수 있을까 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/meilisearch-blog-product-search-automation | Meilisearch 분석: 블로그와 상품 검색 자동화에 쓸 수 있을까? | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/supabase-self-hosting-cost-operations-caution | Supabase 셀프호스팅 분석: 도입 전에 확인할 비용·라이선스 리스크 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/typesense-product-document-search-automation | Typesense 분석: 상품·문서 검색 자동화 엔진으로 쓸 수 있을까? | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/directus-headless-cms-data-automation | Directus 분석: headless CMS 도입 전에 확인할 업무 기준 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/pocketbase-lightweight-backend-saas-mvp | PocketBase 분석: SaaS MVP 도입 전에 확인할 업무 기준 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/n8n-workflow-automation-license-caution | n8n 분석: 자동화 도구 도입 전에 확인할 비용·라이선스 리스크 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/nocodb-airtable-alternative-license-caution | NocoDB 분석: 도입 전에 확인할 비용·라이선스 리스크 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/baserow-open-source-database-automation | Baserow 분석: 오픈소스 데이터베이스 대체 도구로 고르기 전에 확인할 기준 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/huginn-monitoring-automation-agent | Huginn 분석: 모니터링 자동화 도입 전에 확인할 업무 기준 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/kestra-data-ai-workflow-orchestration | Kestra 분석: 데이터 AI 워크플로 도입 전에 확인할 업무 기준 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/windmill-developer-workflow-automation | Windmill 분석: 개발자 워크플로우 자동화 도입 전에 확인할 업무 기준 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |
| /ko/automation/free-open-source-automation-tools-series | 무료 오픈소스 자동화 도구 실전 분석: 도입 전에 확인할 기준 | GENERIC_TOOL_SUMMARY_RISK | strengthen first; do not noindex without separate owner review |

## Reviewer-facing changes made

- Homepage now explains Biz2Lab identity, daily loss-sensitive numbers, practical checklists, automation adoption criteria, blog resources, and topic exploration.
- About page states operating purpose, content review criteria, no-overclaim rule, real-work-first tool review principle, and contact path.
- `/ko/resources` is a practical hub, not a tag page. Each item explains the problem solved, the loss if ignored, and the next article to read.
- Core practical articles preserve formulas, examples, checklists, related links, and practical CTAs.
- Priority tool articles expose Biz2Lab decision criteria for setup burden, operating cost, data/self-hosting risk, and what to test before adoption.
- SEO ops dashboard shows AdSense policy readiness without fake analytics and remains noindex/nofollow.

## Next Step

Wait 3-7 days for recrawl, inspect indexed pages and query evidence in owner-controlled webmaster tools, then request AdSense review only after the public deployed pages are stable.
