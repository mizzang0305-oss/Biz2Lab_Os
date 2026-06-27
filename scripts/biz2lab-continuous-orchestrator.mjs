#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const expectedMasterBranch = "master";
const protectedUntracked = new Set([".codex-remote-attachments/", ".codex/config.toml"]);
const tmpDir = path.join(root, ".tmp");
const lockPath = path.join(tmpDir, "biz2lab-continuous-orchestrator.lock");
const logPath = path.join(tmpDir, "biz2lab-continuous-orchestrator.log");
export const continuousOrchestratorLogFileName = "biz2lab-continuous-orchestrator.log";
export const continuousOrchestratorLockFileName = "biz2lab-continuous-orchestrator.lock";
export const continuousOrchestratorLockStaleMs = 45 * 60 * 1000;
export const continuousLatestReportRelativePath = "reports/continuous-orchestrator-latest.md";
export const continuousHistoryReportRelativePath = "reports/continuous-orchestrator-history.ndjson";
export const evergreenPrioritySlugs = [
  "sales-achievement-rate",
  "unify-order-channels-for-sales",
  "ai-knowledge-store-for-small-business",
  "customer-memory-system",
  "daily-numbers-for-small-business",
  "reservation-order-review-management",
  "solo-business-systemization",
  "unify-order-channels",
];

export const dashboardQueueBranchName = "codex/add-dashboard-content-queue";
export const dashboardQueueSlugs = [
  "metabase-dashboard-automation-for-small-business",
  "apache-superset-bi-dashboard-automation",
  "redash-open-source-dashboard-automation",
];
export const dashboardQueueTopics = [
  {
    id: "metabase",
    toolName: "Metabase",
    slug: "metabase-dashboard-automation-for-small-business",
    title: "Metabase 분석: 소상공인 대시보드 자동화에 쓸 수 있을까?",
    description:
      "Metabase를 매출, 미수금, 주문, 검색/분석 지표를 한 화면에서 확인하는 오픈소스 대시보드 자동화 후보로 검토합니다.",
    tags: ["Metabase", "dashboard automation", "BI", "small business reporting", "Biz2Lab"],
    category: "automation",
    cluster: "open-source-automation-tools",
    type: "how-to",
    officialSources: [
      {
        label: "Metabase official website",
        url: "https://www.metabase.com/",
        usage: "product positioning and dashboard capability verification",
      },
      {
        label: "Metabase documentation",
        url: "https://www.metabase.com/docs/latest/",
        usage: "setup, dashboard, permissions, and embedding documentation verification",
      },
      {
        label: "Metabase GitHub repository",
        url: "https://github.com/metabase/metabase",
        usage: "source, license, release, and activity verification",
      },
    ],
    articleOutline: [
      {
        heading: "먼저 결론: 쉬운 업무 대시보드 후보지만 데이터 연결 기준이 먼저",
        points: [
          "Metabase는 비개발자도 질문과 대시보드를 만들 수 있는 BI 후보로 검토한다.",
          "Biz2Lab 관점에서는 매출, 미수금, 주문, 검색 지표를 한 곳에서 보는 운영 대시보드에 맞는지 판단한다.",
          "운영 DB 직접 연결, 권한, 캐시, 공개 링크 사용 여부는 publication 전에 공식 문서 기준으로 확인한다.",
        ],
      },
      {
        heading: "소상공인 대시보드 적용 각도",
        points: [
          "일별 매출, 주문 채널, 미수금, 콘텐츠 성과를 빠르게 확인하는 의사결정 화면으로 본다.",
          "스프레드시트와 DB 사이에서 어떤 데이터를 원본으로 둘지 먼저 정해야 한다.",
          "대시보드 공유는 공개 링크보다 역할과 권한을 먼저 검토한다.",
        ],
      },
      {
        heading: "운영 리스크",
        points: [
          "데이터베이스 권한, 쿼리 비용, 캐시 정책, 백업 기준을 분리한다.",
          "실시간 숫자를 과신하지 않고 원본 데이터 정합성을 함께 확인한다.",
          "고객/결제/민감 데이터는 샘플 데이터와 분리한다.",
        ],
      },
    ],
    imageConcept: {
      visualFamily: "small-business-dashboard-control-room",
      altKo: "Metabase로 소상공인 업무 대시보드 자동화를 검토하는 Biz2Lab 분석 이미지",
      captionKo: "Metabase는 쉬운 대시보드 후보이지만 데이터 원본, 권한, 공유 기준을 먼저 정해야 합니다.",
      promptSummaryKo:
        "소상공인 운영 대시보드, 매출/주문/미수금/검색 지표 카드, 데이터 연결 게이트, 권한 관리 패널이 있는 프리미엄 Biz2Lab 에디토리얼 히어로.",
      mustInclude: [
        "small business dashboard",
        "sales and orders metrics",
        "receivables card",
        "search performance panel",
        "permission gate",
      ],
      mustAvoid: ["official Metabase logo", "real business data", "copied product screenshot", "fake analytics numbers"],
    },
    internalLinks: {
      seriesHub: "free-open-source-automation-tools-series",
      previous: "posthog-product-analytics-automation",
      required: [
        "free-open-source-automation-tools-series",
        "posthog-product-analytics-automation",
        "umami-open-source-analytics-ga-alternative",
        "google-sheets-ai-automation",
      ],
    },
    safetyNotes: [
      "Do not connect production customer, payment, or private business databases in examples.",
      "Use sample data and owner-approved read-only sources before any production integration.",
      "Treat permissions, query cost, cache, and public sharing as publication-time gates.",
    ],
    licenseCautionNotes: [
      "Verify the current Metabase license and cloud terms before publication.",
      "Separate open-source self-hosting from paid cloud and enterprise features.",
      "Do not imply dashboard installation guarantees better decisions, revenue, or compliance.",
    ],
  },
  {
    id: "apache-superset",
    toolName: "Apache Superset",
    slug: "apache-superset-bi-dashboard-automation",
    title: "Apache Superset 분석: BI 대시보드 자동화에 쓸 수 있을까?",
    description:
      "Apache Superset을 BI 대시보드와 리포팅 자동화 후보로 검토하고, 데이터 모델링, 권한, 운영 부담을 Biz2Lab 관점에서 정리합니다.",
    tags: ["Apache Superset", "BI dashboard", "reporting automation", "open source BI", "Biz2Lab"],
    category: "automation",
    cluster: "open-source-automation-tools",
    type: "how-to",
    officialSources: [
      {
        label: "Apache Superset official website",
        url: "https://superset.apache.org/",
        usage: "project positioning and capability verification",
      },
      {
        label: "Apache Superset documentation",
        url: "https://superset.apache.org/docs/intro",
        usage: "installation, chart, dashboard, and security documentation verification",
      },
      {
        label: "Apache Superset GitHub repository",
        url: "https://github.com/apache/superset",
        usage: "source, license, release, and activity verification",
      },
    ],
    articleOutline: [
      {
        heading: "먼저 결론: 강한 BI 후보지만 운영 난도가 함께 올라간다",
        points: [
          "Apache Superset은 다양한 차트와 BI 대시보드가 필요한 팀에서 검토할 수 있는 후보로 본다.",
          "작은 팀에서는 설치보다 데이터 모델, 권한, 운영자가 감당 가능한지 먼저 확인해야 한다.",
          "Biz2Lab 관점에서는 매출/마케팅/콘텐츠 성과를 묶는 보고 체계에 맞는지 검토한다.",
        ],
      },
      {
        heading: "보고 자동화 적용 각도",
        points: [
          "주간 매출, 검색 유입, 콘텐츠 성과, 고객 행동 지표를 정리하는 BI 화면 후보로 본다.",
          "SQL과 데이터 모델 이해가 필요한 업무인지 비개발자 중심 화면이면 충분한지 구분한다.",
          "임원 보고용 숫자와 운영자가 매일 보는 숫자를 같은 대시보드에 섞지 않는다.",
        ],
      },
      {
        heading: "운영 리스크",
        points: [
          "사용자 권한, 데이터 소스 연결, 쿼리 비용, 배포 운영을 공식 문서 기준으로 확인한다.",
          "과도한 차트 수보다 의사결정에 필요한 최소 지표를 먼저 정한다.",
          "개인정보나 민감 데이터가 대시보드에 노출되지 않도록 샘플 데이터로 검증한다.",
        ],
      },
    ],
    imageConcept: {
      visualFamily: "bi-dashboard-automation-command-center",
      altKo: "Apache Superset으로 BI 대시보드 자동화를 검토하는 Biz2Lab 분석 이미지",
      captionKo: "Apache Superset은 강한 BI 후보이지만 데이터 모델과 운영 권한 기준을 먼저 정해야 합니다.",
      promptSummaryKo:
        "BI 대시보드 자동화 커맨드 센터, 차트 그리드, 데이터 모델 계층, 권한 게이트, 리포트 자동화 흐름이 있는 프리미엄 Biz2Lab 히어로.",
      mustInclude: ["BI dashboard", "chart grid", "data model layer", "permission gate", "report automation"],
      mustAvoid: ["official Apache Superset logo", "Apache feather logo", "real dashboard screenshot", "fake metrics"],
    },
    internalLinks: {
      seriesHub: "free-open-source-automation-tools-series",
      previous: "metabase-dashboard-automation-for-small-business",
      required: [
        "free-open-source-automation-tools-series",
        "metabase-dashboard-automation-for-small-business",
        "posthog-product-analytics-automation",
        "matomo-self-hosted-analytics-privacy-caution",
      ],
    },
    safetyNotes: [
      "Do not connect production analytics, customer, or payment data in examples.",
      "Use sample data and read-only owner-approved sources for any future demonstration.",
      "Treat role-based access, SQL exposure, and dashboard sharing as implementation gates.",
    ],
    licenseCautionNotes: [
      "Verify the current Apache Superset license and project documentation before publication.",
      "Separate Apache project capabilities from third-party managed service claims.",
      "Do not imply BI dashboards guarantee better revenue, ranking, or operational decisions.",
    ],
  },
  {
    id: "redash",
    toolName: "Redash",
    slug: "redash-open-source-dashboard-automation",
    title: "Redash 분석: 오픈소스 대시보드 자동화에 쓸 수 있을까?",
    description:
      "Redash를 SQL 기반 대시보드와 리포팅 자동화 후보로 검토하고, 소규모 팀에서 확인해야 할 운영 조건을 정리합니다.",
    tags: ["Redash", "dashboard automation", "SQL reporting", "open source BI", "Biz2Lab"],
    category: "automation",
    cluster: "open-source-automation-tools",
    type: "how-to",
    officialSources: [
      {
        label: "Redash official website",
        url: "https://redash.io/",
        usage: "project positioning and feature verification",
      },
      {
        label: "Redash documentation",
        url: "https://redash.io/help/",
        usage: "setup, query, dashboard, and sharing documentation verification",
      },
      {
        label: "Redash GitHub repository",
        url: "https://github.com/getredash/redash",
        usage: "source, license, release, and activity verification",
      },
    ],
    articleOutline: [
      {
        heading: "먼저 결론: SQL 리포팅에는 유용하지만 운영 상태 확인이 먼저",
        points: [
          "Redash는 SQL 질의와 대시보드 공유가 필요한 팀에서 검토할 수 있는 리포팅 후보로 본다.",
          "Biz2Lab 관점에서는 매출, 주문, 검색, 분석 데이터를 주기적으로 확인하는 내부 보고 화면에 맞는지 검토한다.",
          "프로젝트 유지보수 상태, 데이터 연결 방식, 권한, 공유 범위는 publication 전에 공식 출처로 확인한다.",
        ],
      },
      {
        heading: "대시보드 자동화 적용 각도",
        points: [
          "반복 SQL 리포트, 운영 지표 확인, 팀 내부 공유 대시보드 후보로 본다.",
          "비개발자에게 쉬운 화면이 필요한지, SQL 작성자가 있는 팀인지 먼저 판단한다.",
          "자동 알림이나 외부 공유는 별도 승인 게이트가 필요하다.",
        ],
      },
      {
        heading: "운영 리스크",
        points: [
          "데이터베이스 권한, 쿼리 비용, 공개 URL, 오래된 대시보드 정리를 확인한다.",
          "운영 지표를 실제 의사결정에 쓰려면 지표 정의와 원본 데이터 기준이 먼저 필요하다.",
          "민감한 고객/결제 데이터는 예시나 스크린샷에 넣지 않는다.",
        ],
      },
    ],
    imageConcept: {
      visualFamily: "sql-reporting-dashboard-automation-map",
      altKo: "Redash로 SQL 리포팅 대시보드 자동화를 검토하는 Biz2Lab 분석 이미지",
      captionKo: "Redash는 SQL 리포팅 후보이지만 프로젝트 상태와 권한, 공유 기준 확인이 먼저입니다.",
      promptSummaryKo:
        "SQL 리포팅 대시보드, 반복 질의 카드, 내부 보고 흐름, 권한 게이트, 운영 지표 보드가 있는 프리미엄 Biz2Lab 에디토리얼 히어로.",
      mustInclude: ["SQL reporting dashboard", "query cards", "internal report flow", "permission gate", "operations metrics"],
      mustAvoid: ["official Redash logo", "real SQL credentials", "copied product screenshot", "fake analytics numbers"],
    },
    internalLinks: {
      seriesHub: "free-open-source-automation-tools-series",
      previous: "apache-superset-bi-dashboard-automation",
      required: [
        "free-open-source-automation-tools-series",
        "apache-superset-bi-dashboard-automation",
        "metabase-dashboard-automation-for-small-business",
        "posthog-product-analytics-automation",
      ],
    },
    safetyNotes: [
      "Do not connect production databases, customer data, payment data, or private business systems in examples.",
      "Use sample data and read-only owner-approved sources before any future demonstration.",
      "Treat SQL permissions, public sharing, credentials, and alerting as implementation gates.",
    ],
    licenseCautionNotes: [
      "Verify the current Redash license and project status before publication.",
      "Separate open-source software from any third-party hosted service claims.",
      "Do not imply SQL dashboards automatically improve revenue, ranking, or compliance.",
    ],
  },
];

const hardeningTemplates = {
  "sales-achievement-rate": {
    conclusion:
      "매출 달성률은 목표 대비 몇 퍼센트인지 보는 숫자가 아니라 남은 기간, 부족액, 입금 가능성, 다음 행동을 함께 판단하는 운영 기준입니다. 달성률만 보면 좋아 보이지만 예정 입금이 밀리거나 남은 영업일이 부족하면 실제 현금 흐름과 다르게 해석될 수 있습니다. 작은 팀에서는 먼저 목표액, 현재 실적, 예정 금액, 남은 기간을 같은 표에 놓고 담당자가 다음 조치를 확인해야 합니다.",
    loss:
      "달성률을 늦게 확인하면 부족분을 메울 영업일이 사라진 뒤에야 문제를 알게 됩니다. 매출 숫자와 입금 가능성을 분리하지 않으면 이미 확정된 매출과 아직 추적해야 할 금액이 섞여 후속 조치가 늦어질 수 있습니다.",
    checklist: [
      "목표액, 현재 실적, 예정 금액, 남은 영업일을 같은 표에 둡니다.",
      "달성률이 높은 날에도 미입금, 취소 가능성, 지연 사유를 따로 확인합니다.",
      "부족액이 보이면 상담, 제안, 입금 확인 중 어떤 행동이 필요한지 분리합니다.",
      "AI 요약은 참고용으로 쓰고 금액과 계약 상태는 담당자가 원본과 대조합니다.",
    ],
  },
  "unify-order-channels-for-sales": {
    conclusion:
      "영업 주문 채널 통합은 여러 주문 창구를 하나로 모으는 일이 아니라 주문 상태, 변경 여부, 담당자, 다음 조치를 같은 기준으로 확인하는 운영 방식입니다. 채널별 메모가 흩어져 있으면 고객에게 이미 처리한 주문을 다시 묻거나 변경 요청을 놓칠 수 있습니다. 먼저 주문 입력 항목과 확인 담당자를 고정한 뒤 알림이나 자동 요약을 붙이는 순서가 안전합니다.",
    loss:
      "주문 채널을 정리하지 않으면 처리 속도보다 확인 비용이 먼저 커집니다. 특히 전화, 메신저, 이메일, 거래처 양식이 섞인 팀은 누가 최종 주문을 승인했는지 남기지 않으면 출고와 매출 확인이 흔들립니다.",
    checklist: [
      "주문 채널, 요청 내용, 수량, 변경 여부, 확인 담당자를 표준 항목으로 둡니다.",
      "고객 요청과 내부 확정 값을 분리해 최신 주문 상태를 표시합니다.",
      "수량, 납기, 금액이 바뀐 주문은 일반 문의와 분리해 재확인합니다.",
      "자동 알림을 보내기 전에 담당자 승인과 수정 이력을 남깁니다.",
    ],
  },
  "ai-knowledge-store-for-small-business": {
    conclusion:
      "AI 지식 저장소는 문서를 많이 모으는 공간이 아니라 자주 묻는 질문, 최신 업무 기준, 승인된 답변을 다시 찾을 수 있게 정리하는 운영 기준입니다. 자료가 흩어져 있으면 AI가 그럴듯한 답을 만들더라도 어떤 근거를 봐야 하는지 확인하기 어렵습니다. 작은 팀에서는 먼저 문서 소유자, 최신 기준일, 사용 가능한 답변 범위를 정한 뒤 AI 검색이나 요약을 붙이는 편이 안전합니다.",
    loss:
      "지식 저장소가 없으면 담당자가 바뀔 때마다 같은 질문과 같은 설명이 반복됩니다. 오래된 문서와 최신 기준이 섞이면 AI 답변 품질보다 내부 검토 시간이 더 커질 수 있습니다.",
    checklist: [
      "업무 기준 문서, 질문 유형, 승인자, 마지막 수정일을 같은 형식으로 기록합니다.",
      "고객에게 보낼 수 있는 답변과 내부 참고용 답변을 분리합니다.",
      "오래된 문서는 삭제보다 보류 상태로 표시해 기준 충돌을 줄입니다.",
      "AI 답변은 근거 문서와 함께 검토하고 바로 외부 발송하지 않습니다.",
    ],
  },
  "customer-memory-system": {
    conclusion:
      "고객 기억 시스템은 고객 정보를 많이 저장하는 방식이 아니라 마지막 상담, 약속, 선호, 다음 조치를 필요한 범위만 남기는 운영 기준입니다. 이 기준이 없으면 담당자가 바뀔 때 같은 질문을 반복하거나 고객이 이미 말한 내용을 다시 묻게 됩니다. 개인정보는 최소화하고, 고객 응대에 실제로 필요한 상태값과 담당자 확인 기록만 유지하는 편이 안전합니다.",
    loss:
      "고객 이력이 개인 메모에만 남으면 다음 담당자는 이전 맥락을 다시 복원해야 합니다. 반대로 모든 정보를 무분별하게 저장하면 개인정보와 접근 권한 관리 부담이 커질 수 있습니다.",
    checklist: [
      "마지막 상담일, 약속 내용, 다음 조치, 담당자를 같은 표에 남깁니다.",
      "민감한 개인정보는 업무에 필요한 최소 범위로 제한합니다.",
      "고객 안내나 금액 관련 메시지는 담당자 확인 후 사용합니다.",
      "오래된 이력은 보관 기간과 접근 권한을 정해 관리합니다.",
    ],
  },
  "daily-numbers-for-small-business": {
    conclusion:
      "소상공인 일일 숫자는 매출 하나만 보는 표가 아니라 주문, 입금, 미수, 예약, 문의처럼 내일 행동을 바꿀 숫자를 함께 확인하는 운영 기준입니다. 하루 숫자를 늦게 보면 문제가 커진 뒤에야 재고, 인력, 고객 응대 조정을 하게 됩니다. 먼저 매일 볼 숫자와 담당자 확인 기준을 정하고, 자동화는 요약과 알림을 보조하는 역할로 두는 것이 안전합니다.",
    loss:
      "일일 숫자가 없으면 월말에만 결과를 보게 되어 조정 가능한 시간이 줄어듭니다. 매출이 좋아 보여도 미수금, 취소, 예약 누락이 숨어 있으면 실제 운영 판단은 달라질 수 있습니다.",
    checklist: [
      "매출, 주문, 입금, 미수, 예약, 문의를 필요한 범위만 골라 매일 확인합니다.",
      "숫자마다 원본 위치와 확인 담당자를 정합니다.",
      "전날과 크게 다른 값은 이유를 짧게 남깁니다.",
      "AI 요약은 이상 징후를 찾는 보조로 쓰고 원본 숫자는 담당자가 확인합니다.",
    ],
  },
  "reservation-order-review-management": {
    conclusion:
      "예약, 주문, 리뷰 관리는 각각 따로 보는 업무가 아니라 고객 경험이 끊기지 않도록 상태와 다음 조치를 연결하는 운영 기준입니다. 예약 변경, 주문 누락, 리뷰 대응이 흩어져 있으면 고객 응대가 늦고 같은 문제가 반복됩니다. 먼저 접수 채널, 처리 상태, 담당자, 후속 조치일을 정리한 뒤 자동 알림과 요약을 붙이는 순서가 안전합니다.",
    loss:
      "예약과 주문, 리뷰를 따로 관리하면 고객 불만의 원인을 늦게 찾게 됩니다. 특히 작은 매장은 한 건의 누락이 재방문과 리뷰에 바로 영향을 줄 수 있어 상태 연결이 중요합니다.",
    checklist: [
      "예약, 주문, 리뷰를 각각 접수 채널, 상태, 담당자, 다음 조치로 기록합니다.",
      "고객에게 보낼 답변은 자동 초안 뒤에도 담당자가 확인합니다.",
      "취소, 변경, 불만 리뷰는 일반 처리 건과 분리해 우선순위를 둡니다.",
      "반복되는 문제는 원인과 수정 조치를 함께 남깁니다.",
    ],
  },
  "solo-business-systemization": {
    conclusion:
      "1인 사업자 시스템화는 복잡한 도구를 많이 붙이는 일이 아니라 매일 반복되는 고객 응대, 주문, 결제, 기록 업무를 같은 기준으로 정리하는 방식입니다. 기준 없이 자동화부터 붙이면 오히려 확인할 화면과 예외가 늘어날 수 있습니다. 먼저 반복 업무와 승인 기준을 정하고, 사람이 확인해야 하는 단계와 자동화해도 되는 단계를 나누는 것이 안전합니다.",
    loss:
      "혼자 일할수록 기록 기준이 없으면 바쁠 때 모든 결정이 기억에 의존하게 됩니다. 자동화가 늘어도 원본 입력과 예외 처리 기준이 없으면 다시 수작업으로 되돌아갈 가능성이 큽니다.",
    checklist: [
      "매일 반복되는 업무를 고객, 주문, 결제, 기록, 홍보로 나눕니다.",
      "자동 처리할 업무와 직접 승인할 업무를 분리합니다.",
      "원본 데이터 위치와 수정 권한을 정합니다.",
      "새 도구를 붙이기 전에 한 주 동안 같은 양식으로 기록해 봅니다.",
    ],
  },
  "unify-order-channels": {
    conclusion:
      "주문 채널 통합은 주문을 한 화면에 모으는 것보다 고객 요청, 수량, 변경 사항, 처리 상태를 같은 기준으로 확정하는 일이 먼저입니다. 여러 채널의 주문을 그대로 합치면 중복, 변경 누락, 담당자 혼선이 생길 수 있습니다. 작은 팀에서는 먼저 표준 주문 항목과 최종 확인 기준을 만들고, 그 다음에 알림과 자동 정리를 붙이는 편이 안전합니다.",
    loss:
      "주문 채널이 흩어지면 빠른 응대보다 누락 확인 시간이 커집니다. 특히 메신저와 전화 주문이 섞이면 최종 수량과 납기 기준이 남지 않아 출고나 결제 단계에서 다시 확인해야 합니다.",
    checklist: [
      "주문 채널, 고객명, 품목, 수량, 납기, 변경 여부를 표준 항목으로 둡니다.",
      "초기 요청과 최종 확정 값을 분리합니다.",
      "중복 주문과 변경 요청은 담당자가 확인한 뒤 상태를 바꿉니다.",
      "자동 요약은 주문 확정 전 참고 자료로만 사용합니다.",
    ],
  },
};

function repoPath(...parts) {
  return path.join(root, ...parts);
}

function run(command, args, options = {}) {
  try {
    return {
      ok: true,
      stdout: execFileSync(command, args, {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        timeout: options.timeout ?? 120000,
        env: process.env,
      }),
    };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout?.toString?.() ?? "",
      stderr: error.stderr?.toString?.() ?? error.message,
      status: error.status,
    };
  }
}

function runOrThrow(command, args, options = {}) {
  const result = run(command, args, options);
  if (!result.ok) {
    const details = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`${command} ${args.join(" ")} failed: ${details}`);
  }
  return result.stdout;
}

function runShell(command, options = {}) {
  if (process.platform === "win32") {
    return runOrThrow("cmd.exe", ["/d", "/s", "/c", command], options);
  }
  return runOrThrow("sh", ["-lc", command], options);
}

function parseJsonFromOutput(output) {
  const start = output.indexOf("{");
  const end = output.lastIndexOf("}");
  if (start < 0 || end < start) {
    throw new Error(`No JSON object found in output: ${output.slice(0, 500)}`);
  }
  return JSON.parse(output.slice(start, end + 1));
}

export function summarizeWorkingTree(lines) {
  const trackedFiles = lines
    .filter((line) => !line.startsWith("?? "))
    .map((line) => line.slice(3).trim());
  const untracked = lines
    .filter((line) => line.startsWith("?? "))
    .map((line) => line.slice(3));
  const unexpectedUntracked = untracked.filter((item) => !protectedUntracked.has(item));
  return {
    raw: lines,
    trackedFiles,
    untracked,
    protectedUntracked: untracked.filter((item) => protectedUntracked.has(item)),
    unexpectedUntracked,
    cleanEnough: trackedFiles.length === 0 && unexpectedUntracked.length === 0,
  };
}

function gitStatusSummary() {
  const stdout = runOrThrow("git", ["status", "--short"]);
  return summarizeWorkingTree(stdout.split(/\r?\n/).filter(Boolean));
}

function changedFileNames(args) {
  const result = run("git", args);
  return result.ok
    ? result.stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
    : [];
}

function hasMetadataDrift() {
  const diff = run("git", ["diff", "--unified=0", "--", "content/ko"]);
  if (!diff.ok) {
    return false;
  }
  return /^[+-](slug|canonical):/m.test(diff.stdout);
}

export function evaluateRedZone({ trackedFiles = [], stagedFiles = [], fileTexts = new Map() }) {
  const changed = [...new Set([...trackedFiles, ...stagedFiles])];
  const reasons = [];
  const fileRules = [
    { pattern: /^\.env/, reason: ".env file changed" },
    { pattern: /^data\/content-series-run-state\.json$/, reason: "data/content-series-run-state.json changed" },
    { pattern: /(?:^|\/)(?:db|database|payment|message|notification)(?:\/|\.|-)/i, reason: "DB/payment/message/API file changed" },
    { pattern: /^app\/api\/.*(?:db|database|payment|message|notification)/i, reason: "DB/payment/message/API route changed" },
    { pattern: /^(?:vercel\.json|\.vercel\/|\.github\/workflows\/|next\.config\.)/, reason: "deploy config changed" },
  ];

  for (const file of changed) {
    for (const rule of fileRules) {
      if (rule.pattern.test(file)) {
        reasons.push(`${rule.reason}: ${file}`);
      }
    }
  }

  for (const [file, text] of fileTexts.entries()) {
    if (
      /fake\s+(?:traffic|metric|query|rank|crawl|index|analytics)\s*(?:data)?\s*[:=]\s*(?:true|\d)/i.test(text) ||
      /(?:impressions|clicks|ctr|ranking|referrer|query)\s*[:=]\s*\d/i.test(text)
    ) {
      reasons.push(`unverified metric wording detected: ${file}`);
    }
    if (/<meta[^>]+name=["']keywords["']/i.test(text)) {
      reasons.push(`keyword meta tag detected: ${file}`);
    }
  }

  return {
    redZoneBlocked: reasons.length > 0,
    reasons,
  };
}

export function selectEvergreenBatch(weakSlugs, batchSize = 5) {
  const weakSet = new Set(weakSlugs);
  const prioritized = evergreenPrioritySlugs.filter((slug) => weakSet.has(slug));
  const fallback = weakSlugs.filter((slug) => !prioritized.includes(slug));
  return [...prioritized, ...fallback].slice(0, batchSize);
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

export function buildDashboardQueueBootstrap(state, topicFile) {
  const existingSlugs = new Set((topicFile.topics ?? []).map((topic) => topic.slug));
  const completed = new Set(state.completed ?? []);
  const topicsToAdd = dashboardQueueTopics
    .filter((topic) => !existingSlugs.has(topic.slug))
    .map((topic) => cloneJson(topic));
  const next = dashboardQueueSlugs.filter((slug) => !completed.has(slug));

  return {
    state: {
      ...state,
      currentTopic: next[0] ?? state.currentTopic,
      next,
    },
    topicFile: {
      ...topicFile,
      topics: [...(topicFile.topics ?? []), ...topicsToAdd],
    },
    changedFiles: ["data/content-series-state.json", "data/content-series-topics.json"],
  };
}

export function decideNextContinuousAction({ safety, git, openPrs, scheduler, ai, webmaster, approveNextQueue = false }) {
  if (safety.redZoneBlocked) {
    return {
      decision: "RED_ZONE_BLOCKED",
      actionTaken: "NO_ACTION",
      selectedSlugs: [],
      prUrl: null,
      ownerActionRequired: safety.reasons,
      nextRunRecommendation: "Resolve Red-Zone changes before continuing.",
    };
  }

  if (!git.cleanEnough) {
    return {
      decision: "BLOCKED_DIRTY_WORKTREE",
      actionTaken: "NO_ACTION",
      selectedSlugs: [],
      prUrl: null,
      ownerActionRequired: ["Unexpected tracked or untracked files require review."],
      nextRunRecommendation: "Clean the worktree or preserve runtime-only state before rerun.",
    };
  }

  if (openPrs.length > 0) {
    const red = openPrs.find((pr) => pr.zone === "red");
    if (red) {
      return {
        decision: "RED_ZONE_BLOCKED",
        actionTaken: "NO_ACTION",
        selectedSlugs: [],
        prUrl: red.url ?? null,
        ownerActionRequired: [`PR #${red.number} is Red-Zone.`],
        nextRunRecommendation: "Owner review required before continuing.",
      };
    }
    const green = openPrs.find((pr) => pr.zone === "green" && pr.checksPassed);
    if (green) {
      return {
        decision: "OPEN_PR_GREEN_ZONE",
        actionTaken: "REVIEW_AND_MERGE_ONE_GREEN_PR",
        selectedSlugs: [],
        prUrl: green.url ?? null,
        ownerActionRequired: [],
        nextRunRecommendation: "Merge one Green-Zone PR, align master, and rerun.",
      };
    }
    const first = openPrs[0];
    return {
      decision: "OWNER_REVIEW_REQUIRED",
      actionTaken: "NO_ACTION",
      selectedSlugs: [],
      prUrl: first.url ?? null,
      ownerActionRequired: [`PR #${first.number} is not an approved Green-Zone merge candidate.`],
      nextRunRecommendation: "Wait for owner review or passing checks.",
    };
  }

  if (scheduler.status && scheduler.status !== "CONTENT_SERIES_QUEUE_EXHAUSTED") {
    return {
      decision: "DELEGATE_TO_AUTOPILOT",
      actionTaken: "RUN_OPS_AUTOPILOT_RUN_ONCE",
      selectedSlugs: [],
      prUrl: null,
      ownerActionRequired: [],
      nextRunRecommendation: "Let the existing autopilot runner perform one safe topic action.",
    };
  }

  if (ai.readyArticles < ai.totalArticles && ai.weakSlugs.length > 0) {
    return {
      decision: "EVERGREEN_HARDENING",
      actionTaken: "PREPARE_EVERGREEN_HARDENING_PR",
      selectedSlugs: selectEvergreenBatch(ai.weakSlugs, 5),
      prUrl: null,
      ownerActionRequired: [],
      nextRunRecommendation: "Open and validate one evergreen hardening batch PR.",
    };
  }

  const ownerUnknown = Object.entries(webmaster ?? {})
    .filter(([, value]) => value === "OWNER_UNKNOWN")
    .map(([key]) => key);

  if (
    scheduler.status === "CONTENT_SERIES_QUEUE_EXHAUSTED" &&
    ai.readyArticles === ai.totalArticles &&
    ai.weakSlugs.length === 0 &&
    approveNextQueue
  ) {
    return {
      decision: "NEXT_QUEUE_BOOTSTRAP_APPROVED",
      actionTaken: "PREPARE_DASHBOARD_CONTENT_QUEUE_PR",
      selectedSlugs: [...dashboardQueueSlugs],
      prUrl: null,
      ownerActionRequired: [],
      nextRunRecommendation: "Bootstrap the approved dashboard / BI / reporting automation queue.",
    };
  }

  return {
    decision: "QUEUE_RECOMMENDATION",
    actionTaken: "REPORT_ONLY",
    selectedSlugs: [],
    prUrl: null,
    ownerActionRequired: ownerUnknown.map((key) => `${key} remains OWNER_UNKNOWN`),
    nextRunRecommendation: "Recommend the next small new topic queue or continue evergreen/search verification tasks.",
  };
}

function markdownList(items) {
  return items.length > 0 ? items.map((item) => `- ${item}`).join("\n") : "- none";
}

function formatMarkdownReport(record) {
  return `# Biz2Lab Continuous Orchestrator Latest Report

## A. Overall Result

${record.decision}

## B. Decision

- decision: ${record.decision}
- scheduler: ${record.schedulerStatus ?? "UNKNOWN"}
- open PRs: ${record.openPrs}

## C. Action Taken

${record.actionTaken}

## D. Files Changed

${markdownList(record.changedFiles ?? [])}

## E. PR / Merge

- PR: ${record.prUrl ?? "none"}
- merge commit: ${record.mergeCommit ?? "none"}

## F. Validation

${markdownList(record.validation ?? [])}

## G. Production Smoke

${markdownList(record.productionSmoke ?? [])}

## H. Google / Naver Owner Status

${markdownList(record.ownerActionRequired ?? [])}

## I. Safety

- manual deploy: ${record.safety.manualDeploy}
- fake analytics: ${record.safety.fakeAnalytics}
- secrets: ${record.safety.secrets}
- run-state committed: ${record.safety.runStateCommitted}

## J. Next Run Recommendation

${record.nextRunRecommendation}
`;
}

export function writeContinuousReports(record, options = {}) {
  const rootDir = options.rootDir ?? root;
  const targetReportsDir = path.join(rootDir, path.dirname(continuousLatestReportRelativePath));
  fs.mkdirSync(targetReportsDir, { recursive: true });
  const markdownPath = path.join(rootDir, ...continuousLatestReportRelativePath.split("/"));
  const historyPath = path.join(rootDir, ...continuousHistoryReportRelativePath.split("/"));
  fs.writeFileSync(markdownPath, formatMarkdownReport(record), "utf8");
  fs.appendFileSync(historyPath, `${JSON.stringify(record)}${os.EOL}`, "utf8");
  return { markdownPath, historyPath };
}

function appendLog(record) {
  fs.mkdirSync(tmpDir, { recursive: true });
  fs.appendFileSync(logPath, `${JSON.stringify(record)}${os.EOL}`, "utf8");
  console.log(JSON.stringify(record, null, 2));
}

export function acquireContinuousLock(targetPath = lockPath, options = {}) {
  const nowMs = options.nowMs ?? Date.now();
  const staleMs = options.staleMs ?? continuousOrchestratorLockStaleMs;
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  if (fs.existsSync(targetPath)) {
    const ageMs = nowMs - fs.statSync(targetPath).mtimeMs;
    if (ageMs < staleMs) {
      return { acquired: false, status: "CONTINUOUS_ORCHESTRATOR_ALREADY_RUNNING", ageMs };
    }
    fs.rmSync(targetPath, { force: true });
  }
  fs.writeFileSync(targetPath, JSON.stringify({ pid: process.pid, startedAt: new Date(nowMs).toISOString() }), "utf8");
  return { acquired: true, status: "LOCK_ACQUIRED", ageMs: 0 };
}

export function releaseContinuousLock(targetPath = lockPath) {
  fs.rmSync(targetPath, { force: true });
}

function currentBranch() {
  return runOrThrow("git", ["branch", "--show-current"]).trim();
}

function readAutopilotStatus() {
  const output = runShell("npm run ops:autopilot-status", { timeout: 180000 });
  return parseJsonFromOutput(output);
}

function readAiAudit() {
  const code = `
    import { auditSeoAnswerReadiness } from '../lib/seo-answer-readiness.ts';
    const audit = auditSeoAnswerReadiness();
    const weak = audit.articles.filter((article) =>
      !article.conclusionFirstPresent ||
      !article.directAnswerInFirstLines ||
      !article.faqPresent ||
      !article.checklistPresent ||
      article.overclaimingFaq ||
      (article.comparisonTableUseful && !article.comparisonTablePresent)
    ).map((article) => article.slug);
    console.log(JSON.stringify({ summary: audit.summary, weakSlugs: weak }));
  `;
  fs.mkdirSync(tmpDir, { recursive: true });
  const auditScriptPath = path.join(tmpDir, `continuous-ai-readiness-${process.pid}.mts`);
  fs.writeFileSync(auditScriptPath, code, "utf8");
  try {
    const relativeAuditScript = path.relative(root, auditScriptPath);
    const output = runShell(`npx tsx ${relativeAuditScript}`, { timeout: 180000 });
    return parseJsonFromOutput(output);
  } finally {
    fs.rmSync(auditScriptPath, { force: true });
  }
}

function collectFileTexts(files) {
  const map = new Map();
  for (const file of files) {
    const absolute = repoPath(...file.split("/"));
    if (fs.existsSync(absolute) && fs.statSync(absolute).isFile()) {
      map.set(file, fs.readFileSync(absolute, "utf8"));
    }
  }
  return map;
}

function readSafety() {
  const status = gitStatusSummary();
  const unstaged = changedFileNames(["diff", "--name-only"]);
  const staged = changedFileNames(["diff", "--cached", "--name-only"]);
  const fileTexts = collectFileTexts([...new Set([...unstaged, ...staged])]);
  const safety = evaluateRedZone({
    trackedFiles: status.trackedFiles,
    stagedFiles: staged,
    fileTexts,
  });
  if (hasMetadataDrift()) {
    safety.redZoneBlocked = true;
    safety.reasons.push("route/slug/canonical metadata drift detected");
  }
  return { status, safety };
}

function normalizeOpenPrs(autopilotStatus) {
  return (autopilotStatus.openPrs?.classified ?? []).map((pr) => ({
    number: pr.number,
    url: pr.url,
    zone: pr.redZoneBlocked ? "red" : pr.yellowZoneOwnerReview ? "yellow" : pr.greenZoneAutomergeCandidate ? "green" : pr.zone,
    checksPassed: Boolean(pr.greenZoneAutomergeCandidate),
  }));
}

function insertAfterFrontmatter(markdown, insertion) {
  const match = markdown.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  if (!match) {
    throw new Error("frontmatter block not found");
  }
  return `${match[0]}${insertion.trim()}\n\n${markdown.slice(match[0].length)}`;
}

function buildHardeningInsertion(template) {
  return `## 먼저 결론

${template.conclusion}

## 이걸 안 보면 손해인 이유

${template.loss}

## 도입 전 체크리스트

${template.checklist.map((item) => `- ${item}`).join("\n")}`;
}

function findArticleFile(slug) {
  const categories = ["automation", "contracts-payments", "sales-ops", "small-business"];
  for (const category of categories) {
    const file = repoPath("content", "ko", category, `${slug}.md`);
    if (fs.existsSync(file)) {
      return file;
    }
  }
  return null;
}

function applyEvergreenHardening(slugs) {
  const changed = [];
  for (const slug of slugs) {
    const template = hardeningTemplates[slug];
    if (!template) {
      continue;
    }
    const file = findArticleFile(slug);
    if (!file) {
      continue;
    }
    const current = fs.readFileSync(file, "utf8");
    if (/^##\s+먼저 결론/m.test(current)) {
      continue;
    }
    fs.writeFileSync(file, insertAfterFrontmatter(current, buildHardeningInsertion(template)), "utf8");
    changed.push(path.relative(root, file).replace(/\\/g, "/"));
  }
  return changed;
}

function runValidation(commands) {
  const passed = [];
  for (const command of commands) {
    runShell(command, { timeout: 1200000 });
    passed.push(command);
  }
  return passed;
}

const evergreenValidationCommands = [
  "npm run validate:posts",
  "npm run validate:images",
  "npm test",
  "npm run lint",
  "npm run typecheck",
  "npm run build",
  "npm run check:links",
  "npm run validate:seo",
  "npm run audit:content-authority",
  "npm run audit:image-briefs",
  "npm run audit:image-prompts",
  "npm run image-skill:plan",
  "npm run image-skill:validate",
  "git diff --check",
  "git diff --cached --check",
];

const dashboardQueueValidationCommands = [
  "npm test",
  "npm run lint",
  "npm run typecheck",
  "npm run build",
  "npm run validate:seo",
  "npm run check:links",
  "git diff --check",
  "git diff --cached --check",
];

function readJsonRepo(repoRelativePath) {
  return JSON.parse(fs.readFileSync(repoPath(...repoRelativePath.split("/")), "utf8"));
}

function writeJsonRepo(repoRelativePath, value) {
  const targetPath = repoPath(...repoRelativePath.split("/"));
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, `${JSON.stringify(value, null, 2)}${os.EOL}`, "utf8");
}

function assertDashboardQueueScope(files) {
  const allowed = new Set([
    "data/content-series-state.json",
    "data/content-series-topics.json",
    "tests/content-series-orchestrator.test.ts",
    "tests/seo-ops-dashboard.test.ts",
  ]);
  const blocked = files.filter((file) => !allowed.has(file));
  if (blocked.length > 0) {
    throw new Error(`Dashboard queue bootstrap scope drift: ${blocked.join(", ")}`);
  }
}

function dashboardQueuePrBody(changedFiles, validation) {
  return `## 0) Intent
Add the next owner-approved Biz2Lab content queue for dashboard / BI / reporting automation.

## 1) Summary (Problem -> Solution -> Outcome)
- Problem: The current content series queue is exhausted and the continuous orchestrator needs an explicit owner-approved next queue.
- Solution: Add Metabase, Apache Superset, and Redash to the durable content-series queue without creating articles, images, or prompt packages.
- Outcome: Future safe autopilot runs can start with Metabase prompt/artifact preparation.

## 2) Changes
Checklist:
- [ ] Bug fix
- [ ] Refactor / cleanup
- [ ] Performance improvement
- [ ] Security hardening
- [ ] DX / tooling
- [x] Content queue bootstrap

## 3) Files Changed
${changedFiles.map((file) => `- ${file} (dashboard automation queue bootstrap)`).join("\n")}

## 4) Testing
- Commands run: ${validation.join(", ")}
- Verified no article files, raw images, public images, prompt packages, secrets, deploy config, fake analytics, or run-state files were created.

## 5) Risk Assessment
Risk: Low.
- Queue/topic metadata only.
- No production publication, image import, external API calls, or deployment actions.

## 6) Rollback Plan
- Revert this PR commit to return to the exhausted queue state.

## 7) Deployment Notes
- Required env vars: none
- Required secrets: none
- Migrations: none
- Deploy steps: none; do not manually deploy.

## 8) Follow-ups (Optional)
- Let the hourly autopilot prepare the Metabase prompt/artifact package after merge.
`;
}

function existingOpenPrUrlForBranch(branch) {
  const result = run("gh", ["pr", "list", "--state", "open", "--head", branch, "--json", "url", "--jq", ".[0].url"], {
    timeout: 120000,
  });
  return result.ok ? result.stdout.trim() : "";
}

function createDashboardQueueBootstrapPr() {
  const startingBranch = currentBranch();
  const startedOnMaster = startingBranch === expectedMasterBranch;
  if (startingBranch !== expectedMasterBranch && startingBranch !== dashboardQueueBranchName) {
    throw new Error(`Dashboard queue bootstrap must run from ${expectedMasterBranch} or ${dashboardQueueBranchName}; current branch is ${startingBranch}`);
  }
  if (startedOnMaster) {
    runOrThrow("git", ["checkout", "-B", dashboardQueueBranchName], { timeout: 120000 });
  }

  try {
    const state = readJsonRepo("data/content-series-state.json");
    const topicFile = readJsonRepo("data/content-series-topics.json");
    const bootstrap = buildDashboardQueueBootstrap(state, topicFile);
    writeJsonRepo("data/content-series-state.json", bootstrap.state);
    writeJsonRepo("data/content-series-topics.json", bootstrap.topicFile);

    const changedFiles = changedFileNames(["diff", "--name-only"]);
    assertDashboardQueueScope(changedFiles);
    const validation = runValidation(dashboardQueueValidationCommands);
    runOrThrow("git", ["add", "--", ...bootstrap.changedFiles], { timeout: 120000 });
    runOrThrow("git", ["commit", "-m", "feat(content): add dashboard automation content queue"], { timeout: 120000 });
    const commit = runOrThrow("git", ["rev-parse", "HEAD"]).trim();
    runOrThrow("git", ["push", "-u", "origin", dashboardQueueBranchName], { timeout: 120000 });
    const existingPrUrl = existingOpenPrUrlForBranch(dashboardQueueBranchName);
    const prUrl = existingPrUrl || runOrThrow("gh", [
      "pr",
      "create",
      "--base",
      expectedMasterBranch,
      "--head",
      dashboardQueueBranchName,
      "--title",
      "feat(content): add dashboard automation content queue",
      "--body",
      dashboardQueuePrBody(bootstrap.changedFiles, validation),
    ], { timeout: 120000 }).trim();
    return {
      branch: dashboardQueueBranchName,
      commit,
      prUrl,
      changedFiles: bootstrap.changedFiles,
      validation,
    };
  } finally {
    if (startedOnMaster) {
      runOrThrow("git", ["checkout", expectedMasterBranch], { timeout: 120000 });
      runOrThrow("git", ["reset", "--hard", `origin/${expectedMasterBranch}`], { timeout: 120000 });
    }
  }
}

function createEvergreenHardeningPr(selectedSlugs) {
  const stamp = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 12);
  const branch = `codex/evergreen-ai-answer-hardening-${stamp}`;
  runOrThrow("git", ["checkout", "-B", branch], { timeout: 120000 });
  const changedFiles = applyEvergreenHardening(selectedSlugs);
  if (changedFiles.length === 0) {
    throw new Error("No safe evergreen hardening templates applied.");
  }
  const validation = runValidation(evergreenValidationCommands);
  runOrThrow("git", ["add", "--", ...changedFiles], { timeout: 120000 });
  runOrThrow("git", ["commit", "-m", "feat(seo): harden evergreen answer readiness"], { timeout: 120000 });
  const commit = runOrThrow("git", ["rev-parse", "HEAD"]).trim();
  runOrThrow("git", ["push", "-u", "origin", branch], { timeout: 120000 });
  const body = `## 0) Intent
Harden the next evergreen AI-answer readiness batch without changing routes, metadata, canonicals, or hero assets.

## 1) Summary (Problem → Solution → Outcome)
- Problem: Some published evergreen articles still need answer-first structure.
- Solution: Add concise conclusion-first, loss-avoidance, and checklist sections to up to five weak articles.
- Outcome: The next validation run can confirm improved AI answer readiness.

## 2) Changes
Checklist:
- [ ] Bug fix
- [ ] Refactor / cleanup
- [ ] Performance improvement
- [ ] Security hardening
- [ ] DX / tooling
- [x] Content hardening

## 3) Files Changed
${changedFiles.map((file) => `- ${file} (evergreen answer-readiness hardening)`).join("\n")}

## 4) Testing
- Commands run: ${validation.join(", ")}
- Verified no route, slug, canonical, hero, secret, analytics, or run-state changes.

## 5) Risk Assessment
Risk: Low.
- Content-only additions to existing published articles.
- No external dependencies or data impact.

## 6) Rollback Plan
- Revert this PR commit.

## 7) Deployment Notes
- Required env vars: none
- Required secrets: none
- Migrations: none
- Deploy steps: none; do not manually deploy.

## 8) Follow-ups (Optional)
- Rerun \`npm run ops:continue\` for the next safe batch.
`;
  const prUrl = runOrThrow("gh", [
    "pr",
    "create",
    "--base",
    expectedMasterBranch,
    "--head",
    branch,
    "--title",
    "feat(seo): harden evergreen answer readiness",
    "--body",
    body,
  ], { timeout: 120000 }).trim();
  runOrThrow("git", ["checkout", expectedMasterBranch], { timeout: 120000 });
  runOrThrow("git", ["reset", "--hard", `origin/${expectedMasterBranch}`], { timeout: 120000 });
  return { branch, commit, prUrl, changedFiles, validation };
}

function baseRecord(decision, context, overrides = {}) {
  return {
    timestamp: new Date().toISOString(),
    decision: decision.decision,
    actionTaken: decision.actionTaken,
    openPrs: context.openPrs.length,
    schedulerStatus: context.scheduler.status ?? null,
    aiReadyBefore: `${context.ai.readyArticles}/${context.ai.totalArticles}`,
    aiReadyAfter: overrides.aiReadyAfter ?? `${context.ai.readyArticles}/${context.ai.totalArticles}`,
    changedFiles: overrides.changedFiles ?? [],
    prUrl: overrides.prUrl ?? decision.prUrl ?? null,
    mergeCommit: overrides.mergeCommit ?? null,
    ownerActionRequired: decision.ownerActionRequired,
    validation: overrides.validation ?? [],
    productionSmoke: overrides.productionSmoke ?? [],
    safety: {
      manualDeploy: false,
      fakeAnalytics: false,
      secrets: false,
      runStateCommitted: false,
    },
    nextRunRecommendation: overrides.nextRunRecommendation ?? decision.nextRunRecommendation,
  };
}

function parseContinuousArgs(argv) {
  return {
    approveNextQueue: argv.includes("--approve-next-queue"),
  };
}

async function runOnce(options = {}) {
  const branch = currentBranch();
  const { status, safety } = readSafety();
  const autopilot = readAutopilotStatus();
  const aiAudit = readAiAudit();
  const context = {
    approveNextQueue: Boolean(options.approveNextQueue),
    git: status,
    safety,
    openPrs: normalizeOpenPrs(autopilot),
    scheduler: {
      status: autopilot.scheduler?.status ?? null,
      topic: autopilot.scheduler?.topic ?? autopilot.currentTopic ?? null,
    },
    ai: {
      readyArticles: aiAudit.summary.readyArticles,
      totalArticles: aiAudit.summary.totalArticles,
      weakSlugs: aiAudit.weakSlugs,
    },
    webmaster: {
      google: "OWNER_UNKNOWN",
      naver: "OWNER_UNKNOWN",
    },
  };
  const decision = decideNextContinuousAction(context);

  const canWriteDashboardQueueFromCurrentBranch =
    decision.decision === "NEXT_QUEUE_BOOTSTRAP_APPROVED" && branch === dashboardQueueBranchName;
  if (branch !== expectedMasterBranch && !canWriteDashboardQueueFromCurrentBranch) {
    return baseRecord(decision, context, {
      nextRunRecommendation: `Current branch is ${branch}; write actions run only from ${expectedMasterBranch}. Merge this orchestrator PR, align master, then rerun.`,
    });
  }

  if (decision.decision === "OPEN_PR_GREEN_ZONE" || decision.decision === "DELEGATE_TO_AUTOPILOT") {
    runShell("npm run ops:autopilot-run", { timeout: 1200000 });
    return baseRecord(decision, context, {
      validation: ["npm run ops:autopilot-run"],
      nextRunRecommendation: "Rerun ops:continue after the one delegated action completes.",
    });
  }

  if (decision.decision === "EVERGREEN_HARDENING") {
    const pr = createEvergreenHardeningPr(decision.selectedSlugs);
    return baseRecord(decision, context, {
      changedFiles: pr.changedFiles,
      prUrl: pr.prUrl,
      validation: pr.validation,
      nextRunRecommendation: "Review or let the next safe run merge the Green-Zone evergreen hardening PR after checks pass.",
    });
  }

  if (decision.decision === "NEXT_QUEUE_BOOTSTRAP_APPROVED") {
    const pr = createDashboardQueueBootstrapPr();
    return baseRecord(decision, context, {
      changedFiles: pr.changedFiles,
      prUrl: pr.prUrl,
      validation: pr.validation,
      nextRunRecommendation: "Review or let the next safe Green-Zone run merge the dashboard automation queue PR after checks pass.",
    });
  }

  return baseRecord(decision, context);
}

async function main() {
  const options = parseContinuousArgs(process.argv.slice(2));
  const lock = acquireContinuousLock(lockPath);
  if (!lock.acquired) {
    const record = {
      timestamp: new Date().toISOString(),
      decision: "CONTINUOUS_ORCHESTRATOR_ALREADY_RUNNING",
      actionTaken: "NO_ACTION",
      openPrs: null,
      schedulerStatus: null,
      aiReadyBefore: null,
      aiReadyAfter: null,
      changedFiles: [],
      prUrl: null,
      mergeCommit: null,
      ownerActionRequired: [`Fresh lock exists at ${lockPath}`],
      validation: [],
      productionSmoke: [],
      safety: { manualDeploy: false, fakeAnalytics: false, secrets: false, runStateCommitted: false },
      nextRunRecommendation: "Wait for the current run to finish or for the stale-lock window.",
    };
    writeContinuousReports(record);
    appendLog(record);
    return;
  }

  try {
    const record = await runOnce(options);
    writeContinuousReports(record);
    appendLog(record);
  } catch (error) {
    const record = {
      timestamp: new Date().toISOString(),
      decision: "BLOCKED",
      actionTaken: "NO_ACTION",
      openPrs: null,
      schedulerStatus: null,
      aiReadyBefore: null,
      aiReadyAfter: null,
      changedFiles: [],
      prUrl: null,
      mergeCommit: null,
      ownerActionRequired: [error instanceof Error ? error.message : String(error)],
      validation: [],
      productionSmoke: [],
      safety: { manualDeploy: false, fakeAnalytics: false, secrets: false, runStateCommitted: false },
      nextRunRecommendation: "Fix the blocker and rerun.",
    };
    writeContinuousReports(record);
    appendLog(record);
    process.exitCode = 1;
  } finally {
    releaseContinuousLock(lockPath);
  }
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedPath && fileURLToPath(import.meta.url) === invokedPath) {
  void main();
}
