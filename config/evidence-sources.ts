export type EvidenceCaptureDefinition = {
  id: string;
  projectKey: string;
  repositoryName: string;
  projectLabelKo: string;
  repoCandidates: string[];
  startCommand: string;
  port: number;
  healthPath: string;
  env: Record<string, string>;
  postSlug: string;
  route: string;
  initialReadySelector?: string;
  readySelector: string;
  captureSelector: string;
  captureBounds?: {
    startSelector: string;
    endSelector: string;
  };
  captureStyle?: string;
  inputValues?: Array<{ selector: string; value: string }>;
  clickSelectors?: string[];
  textReplacements?: Array<{ selector: string; value: string }>;
  textSubstitutions?: Array<{ from: string; to: string }>;
  disclosureLabel?: string;
  focusedListItem?: { listSelector: string; includesText: string };
  requiredVisibleText?: string[];
  forbiddenVisibleText?: string[];
  settleTimeMs?: number;
  transformations: string[];
  maskSelectors: string[];
  hideSelectors: string[];
  viewport: { width: number; height: number };
  altKo: string;
  captionKo: string;
  dataMode: "fixture" | "local-demo";
  claimSupportedKo: string;
  claimNotSupportedKo: string;
  minRenderedHeightAt390?: number;
  aspectRatio?: { min: number; max: number };
};

export const evidenceCaptureDefinitions: EvidenceCaptureDefinition[] = [
  {
    id: "commerce-upload-approval-gate",
    projectKey: "commerce-automation",
    repositoryName: "commerce-automation",
    projectLabelKo: "승인형 콘텐츠 자동화 제어 시스템",
    repoCandidates: ["commerce-automation"],
    startCommand:
      "npm run build && npx next start -H 127.0.0.1 -p 4311",
    port: 4311,
    healthPath: "/uploads",
    env: {
      DATA_PROVIDER: "local-json",
      PUBLIC_UPLOAD_ENABLED: "false",
      YOUTUBE_UPLOAD_ENABLED: "false",
    },
    postSlug: "ai-business-automation-guide",
    route: "/uploads",
    readySelector: "h1:has-text('업로드 준비 대시보드')",
    captureSelector: "main > div.space-y-5 > section:nth-of-type(3)",
    captureStyle: `
      main > div.space-y-5 > section:nth-of-type(3) {
        width: 390px !important;
        padding: 16px !important;
      }
      main > div.space-y-5 > section:nth-of-type(3) > div:first-of-type {
        display: grid !important;
        gap: 12px !important;
      }
      main > div.space-y-5 > section:nth-of-type(3) > div:nth-of-type(2) {
        grid-template-columns: minmax(0, 1fr) !important;
      }
      main > div.space-y-5 > section:nth-of-type(3) > div:nth-of-type(2) > div:first-child {
        font-size: 15px !important;
        line-height: 1.6 !important;
      }
      main > div.space-y-5 > section:nth-of-type(3) ul > li ~ li,
      main > div.space-y-5 > section:nth-of-type(3) > div:nth-of-type(2) > div + div,
      main > div.space-y-5 > section:nth-of-type(3) > div:nth-of-type(n+3) {
        display: none !important;
      }
    `,
    disclosureLabel: "로컬 데모 · 가상 readiness 데이터 · 외부 업로드 비활성화",
    focusedListItem: {
      listSelector:
        "main > div.space-y-5 > section:nth-of-type(3) > div:nth-of-type(2) > div:first-child > ul",
      includesText: "YouTube 할당량 준비",
    },
    requiredVisibleText: [
      "로컬 데모",
      "외부 업로드 비활성화",
      "업로드 실행 차단",
      "왜 실행이 막혔나요?",
      "YouTube 할당량 준비",
      "Confirm quota in Google Cloud Console and set YOUTUBE_QUOTA_READY=true.",
      "token, client secret, raw auth header는 렌더링하지 않습니다.",
    ],
    transformations: [
      "390px 세로형으로 기존 readiness 섹션을 재배치",
      "첫 번째 차단 사유와 사람의 다음 조치를 행 전체로 표시",
      "추가 차단 항목과 관련 없는 서버 env 안내 카드 제외",
      "외곽 readiness 섹션의 하단 padding까지 전체 캡처해 카드 중간 잘림 방지",
      "로컬 데모·외부 업로드 비활성화 disclosure 배너 추가",
      "navigation·Next.js 개발 overlay 제외",
    ],
    maskSelectors: [],
    hideSelectors: [
      "nextjs-portal",
      "main > div.space-y-5 > section:nth-of-type(3) > div:nth-of-type(2) > div:nth-child(2)",
      "main > div.space-y-5 > section:nth-of-type(3) > div:nth-of-type(n+3)",
    ],
    viewport: { width: 460, height: 1100 },
    altKo: "외부 업로드 가능 여부와 차단 사유, 다음 조치가 분리된 승인형 자동화 준비 화면",
    captionKo:
      "로컬 데모 화면. 승인 조건이 충족되지 않으면 외부 업로드가 차단되고 비밀값 대신 상태 요약만 표시되며 실제 플랫폼 업로드 성공은 증명하지 않습니다.",
    dataMode: "local-demo",
    claimSupportedKo: "승인 문구와 준비 조건이 충족되기 전 외부 업로드를 차단하는 UI 경계",
    claimNotSupportedKo: "실제 플랫폼 업로드 성공, 매출 또는 운영시간 절감",
    minRenderedHeightAt390: 420,
  },
  {
    id: "commerce-run-audit-log",
    projectKey: "commerce-automation",
    repositoryName: "commerce-automation",
    projectLabelKo: "승인형 콘텐츠 자동화 제어 시스템",
    repoCandidates: ["commerce-automation"],
    startCommand:
      "npm run build && npx next start -H 127.0.0.1 -p 4311",
    port: 4311,
    healthPath: "/runs",
    env: { DATA_PROVIDER: "local-json", PUBLIC_UPLOAD_ENABLED: "false" },
    postSlug: "automation-priority-method",
    route: "/runs",
    readySelector: "h1:has-text('실행 로그')",
    captureSelector: "main > div.space-y-5",
    captureStyle: `
      main > div.space-y-5 { width: 390px !important; }
      table { min-width: 0 !important; display: block !important; }
      thead { display: none !important; }
      tbody { display: grid !important; gap: 12px !important; }
      tr { display: grid !important; gap: 9px !important; padding: 16px !important; border-radius: 12px !important; }
      td { display: none !important; }
      td:nth-child(1), td:nth-child(3), td:nth-child(8), td:nth-child(9) {
        display: block !important; max-width: none !important; padding: 0 !important;
      }
      td:nth-child(1)::before, td:nth-child(3)::before, td:nth-child(8)::before, td:nth-child(9)::before {
        display: block; margin-bottom: 3px; color: #64748b; font-size: 11px; font-weight: 700;
      }
      td:nth-child(1)::before { content: "실행 유형"; }
      td:nth-child(3)::before { content: "상태"; }
      td:nth-child(8)::before { content: "안전 메시지"; }
      td:nth-child(9)::before { content: "로그 / 수동 확인"; }
    `,
    transformations: [
      "390px 세로형으로 기존 실행 로그 열을 재배치",
      "실행 유형·상태·안전 메시지·로그 열만 표시",
      "navigation·Next.js 개발 overlay 제외",
    ],
    maskSelectors: [],
    hideSelectors: ["nextjs-portal"],
    viewport: { width: 520, height: 960 },
    altKo: "자동화 실행 결과와 안전 메시지, 실패 상태를 구분해 확인하는 로컬 실행 로그 화면",
    captionKo:
      "fixture 화면. 후보 검수용으로 실행 유형·상태·안전 메시지·로그 열만 세로로 재배치했으며 실제 외부 게시 실행을 증명하지 않습니다.",
    dataMode: "fixture",
    claimSupportedKo: "자동화 작업의 실행 결과와 실패 상태를 별도 로그로 남기는 화면 구조",
    claimNotSupportedKo: "운영 환경의 장기 보존, 장애 복구 시간 또는 외부 서비스 처리 결과",
    minRenderedHeightAt390: 220,
  },
  {
    id: "wms-order-source-workbench",
    projectKey: "cn-wms",
    repositoryName: "CN_WMS",
    projectLabelKo: "식자재 유통 WMS",
    repoCandidates: ["CN_WMS"],
    startCommand: "npm --prefix apps/ops-console run dev -- --host 127.0.0.1 --port 4312",
    port: 4312,
    healthPath: "/orders/workbench",
    env: { VITE_PORTAL_DATA_SOURCE: "mock" },
    postSlug: "unify-order-channels",
    route: "/orders/workbench",
    readySelector: "h1:has-text('주문 작업대')",
    captureSelector:
      "section.screen.v262-page > div.v262-grid-two > section:nth-child(1)",
    inputValues: [
      { selector: "[aria-label='거래처 빠른 검색']", value: "검수용 샘플 거래처" },
      { selector: "[aria-label='source_reference']", value: "FIXTURE-ORDER-001" },
    ],
    transformations: [
      "검수용 합성 거래처명과 fixture 주문 참조값 입력",
      "주문 원본 패널만 집중 캡처",
    ],
    maskSelectors: [],
    hideSelectors: [],
    viewport: { width: 1440, height: 960 },
    altKo: "전화와 카카오, 영업, 포털 주문 원본과 재고·한도 보류 상태를 분리한 WMS 주문 작업대",
    captionKo:
      "fixture 화면. 검수 전용 샘플 거래처와 원본 참조값을 주입해 주문 채널 필드 구조만 확인하며 실제 주문 처리 결과는 증명하지 않습니다.",
    dataMode: "fixture",
    claimSupportedKo: "주문 원본 종류와 재고·한도 검증 상태를 별도 필드로 유지하는 작업대",
    claimNotSupportedKo: "실제 거래처 주문 누락 감소율, 실재고 또는 거래처별 가격",
  },
  {
    id: "wms-order-hold-validation",
    projectKey: "cn-wms",
    repositoryName: "CN_WMS",
    projectLabelKo: "식자재 유통 WMS",
    repoCandidates: ["CN_WMS"],
    startCommand: "npm --prefix apps/ops-console run dev -- --host 127.0.0.1 --port 4312",
    port: 4312,
    healthPath: "/orders/workbench",
    env: { VITE_PORTAL_DATA_SOURCE: "mock" },
    postSlug: "unify-order-channels",
    route: "/orders/workbench",
    readySelector: "h1:has-text('주문 작업대')",
    captureSelector:
      "section.screen.v262-page > div.v262-grid-two > section:nth-child(2)",
    captureStyle: `
      section.screen.v262-page > div.v262-grid-two > section:nth-child(2) {
        width: 390px !important;
        padding: 18px !important;
      }
      .v262-error-summary, .v262-error-summary li, .v262-badge {
        font-size: 15px !important;
        line-height: 1.55 !important;
      }
      .v262-badge-row {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) !important;
        gap: 10px !important;
      }
    `,
    inputValues: [
      { selector: "[aria-label='거래처 빠른 검색']", value: "검수용 샘플 거래처" },
      { selector: "[aria-label='source_reference']", value: "FIXTURE-ORDER-001" },
    ],
    disclosureLabel: "FIXTURE · 합성 주문 검증 상태",
    transformations: [
      "390px 세로형으로 기존 검증 패널을 재배치",
      "fixture disclosure 배너 추가",
      "주문 입력·상품·수량·가격 영역 제외",
    ],
    maskSelectors: [],
    hideSelectors: [],
    viewport: { width: 460, height: 1100 },
    altKo: "재고 보류와 한도 보류, 검토 대기 상태를 분리해 표시한 WMS 주문 검증 패널",
    captionKo:
      "fixture 화면. 재고·한도 보류와 검토 대기 상태의 분리만 확인하며 실제 재고 수량이나 거래처 한도 적용 결과는 증명하지 않습니다.",
    dataMode: "fixture",
    claimSupportedKo: "주문 제출 전에 재고 보류와 한도 보류를 별도 상태로 표시하는 검증 패널",
    claimNotSupportedKo: "실재고 정확도, 실제 여신 한도 또는 주문 승인 결과",
  },
  {
    id: "wms-picking-inspection-loading",
    projectKey: "cn-wms",
    repositoryName: "CN_WMS",
    projectLabelKo: "식자재 유통 WMS",
    repoCandidates: ["CN_WMS"],
    startCommand: "npm --prefix apps/ops-console run dev -- --host 127.0.0.1 --port 4312",
    port: 4312,
    healthPath: "/operations/flow",
    env: { VITE_PORTAL_DATA_SOURCE: "mock" },
    postSlug: "separate-picking-inspection-loading-status",
    route: "/operations/flow",
    readySelector: "h1:has-text('운영 흐름')",
    captureSelector: "section.screen.v262-page",
    captureStyle: `
      section.screen.v262-page {
        width: 390px !important;
      }
      section.screen.v262-page > div.v262-grid-four {
        grid-template-columns: minmax(0, 1fr) !important;
        gap: 12px !important;
      }
      .v262-card {
        min-width: 0 !important;
      }
    `,
    disclosureLabel: "FIXTURE · 가상 작업 상태",
    transformations: [
      "390px 세로형으로 기존 작업 lane을 재배치",
      "fixture disclosure 배너 추가",
      "재고 차이·품목·수량·담당자 영역 제외",
    ],
    maskSelectors: [],
    hideSelectors: [
      ".sidebar",
      ".top-status-bar",
      ".api-boundary-notice",
      "section.screen.v262-page > section",
      "section.screen.v262-page > article.v262-blocking-alert",
    ],
    viewport: { width: 460, height: 1200 },
    altKo: "출고지시와 피킹, 검수, 상차 및 차이 확인을 별도 상태로 표시한 식자재 유통 WMS 화면",
    captionKo:
      "fixture 화면. 가상 작업 건으로 단계 분리와 검수 전 상차 차단 설계를 보여 주며 실제 출고 성과는 포함하지 않습니다.",
    dataMode: "fixture",
    claimSupportedKo: "피킹·검수·상차를 별도 상태로 두고 검수 전 상차 완료를 차단하는 설계",
    claimNotSupportedKo: "실제 물류 처리시간, 오배송 감소율 또는 운영 DB의 출고 상태",
    minRenderedHeightAt390: 220,
  },
  {
    id: "wms-loading-block-before-inspection",
    projectKey: "cn-wms",
    repositoryName: "CN_WMS",
    projectLabelKo: "식자재 유통 WMS",
    repoCandidates: ["CN_WMS"],
    startCommand: "npm --prefix apps/ops-console run dev -- --host 127.0.0.1 --port 4312",
    port: 4312,
    healthPath: "/operations/flow",
    env: { VITE_PORTAL_DATA_SOURCE: "mock" },
    postSlug: "separate-picking-inspection-loading-status",
    route: "/operations/flow",
    readySelector: "article.v262-blocking-alert",
    captureSelector: "article.v262-blocking-alert",
    captureStyle: `
      article.v262-blocking-alert {
        width: 390px !important;
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) !important;
        gap: 12px !important;
        padding: 18px !important;
        font-size: 16px !important;
        line-height: 1.65 !important;
      }
    `,
    disclosureLabel: "FIXTURE · 가상 검수/상차 상태",
    transformations: [
      "기존 검수 전 상차 차단 alert만 390px로 집중 캡처",
      "fixture disclosure 배너 추가",
      "창고·직원·차량·상품·수량·시각 영역 제외",
    ],
    maskSelectors: [],
    hideSelectors: [".sidebar", ".top-status-bar", ".api-boundary-notice"],
    viewport: { width: 460, height: 900 },
    altKo: "검수 통과 전 상차 완료 처리가 차단되고 다음 행동으로 검수 통과가 제시된 WMS fixture 알림",
    captionKo:
      "fixture 화면. 검수 통과 전 상차 완료 차단과 다음 필수 행동만 보여 주며 실제 창고 처리 결과나 운영 DB 상태는 포함하지 않습니다.",
    dataMode: "fixture",
    claimSupportedKo: "검수 통과 전 상차 완료 처리를 차단하는 설계",
    claimNotSupportedKo: "실제 처리시간, 오배송 감소율, 재고 정확도 또는 Production 데이터베이스 상태",
    minRenderedHeightAt390: 220,
  },
  {
    id: "mybiz-readonly-operations-dashboard",
    projectKey: "mybizlab",
    repositoryName: "mybizLab",
    projectLabelKo: "매장 운영 SaaS",
    repoCandidates: ["mybizLab"],
    startCommand: "npm run dev -- --host 127.0.0.1 --port 4313",
    port: 4313,
    healthPath: "/demo/dashboard",
    env: { VITE_DATA_PROVIDER: "local", VITE_APP_RUNTIME_MODE: "demo" },
    postSlug: "daily-numbers-for-small-business",
    route: "/demo/dashboard",
    readySelector: "main[data-demo-dashboard='readonly']",
    captureSelector: "main[data-demo-dashboard='readonly'] > div",
    captureStyle: `
      main[data-demo-dashboard='readonly'] > div {
        width: 390px !important;
        padding: 20px !important;
      }
      main[data-demo-dashboard='readonly'] > div > div:nth-of-type(2) {
        align-items: flex-start !important;
      }
      main[data-demo-dashboard='readonly'] > div > section:nth-of-type(1) {
        grid-template-columns: minmax(0, 1fr) !important;
      }
      main[data-demo-dashboard='readonly'] > div > div:nth-of-type(2) > div:nth-of-type(2) {
        display: none !important;
      }
      main[data-demo-dashboard='readonly'] > div > section:nth-of-type(1) article p:nth-of-type(n+3),
      main[data-demo-dashboard='readonly'] > div > section:nth-of-type(1) article > span {
        display: none !important;
      }
    `,
    textReplacements: [
      {
        selector:
          "main[data-demo-dashboard='readonly'] > div > div:first-child p",
        value:
          "이 화면은 저장되지 않는 가상 데이터입니다. 실제 고객·매출·재방문 성과를 뜻하지 않습니다.",
      },
      {
        selector:
          "main[data-demo-dashboard='readonly'] > div > div:nth-of-type(2) h1",
        value: "가상 데모 매장",
      },
      {
        selector:
          "main[data-demo-dashboard='readonly'] > div > div:nth-of-type(2) > div:first-child p",
        value: "로컬 데모 · 읽기 전용",
      },
      {
        selector:
          "main[data-demo-dashboard='readonly'] > div > section:nth-of-type(1) > article:first-child > p:first-of-type",
        value: "고객 기록",
      },
    ],
    textSubstitutions: [
      { from: "서울 단골 커피", to: "가상 데모 매장" },
      { from: "김하린", to: "샘플 고객 A" },
      { from: "박지훈", to: "샘플 고객 B" },
      { from: "이서연", to: "샘플 고객 C" },
    ],
    disclosureLabel: "로컬 데모 · 가상 데이터 · 읽기 전용",
    requiredVisibleText: [
      "로컬 데모 · 가상 데이터 · 읽기 전용",
      "가상 데모 매장",
      "이 화면은 저장되지 않는 가상 데이터입니다.",
      "실제 고객·매출·재방문 성과를 뜻하지 않습니다.",
      "고객 기록",
      "예약",
      "웨이팅",
      "QR 주문",
    ],
    forbiddenVisibleText: [
      "무료로 시작",
      "실제 매장 관리",
      "매출 상승",
      "고객 증가",
      "재방문 향상",
      "AI 예측",
      "실시간 성과",
      "production-ready",
    ],
    settleTimeMs: 1600,
    transformations: [
      "기존 매장명을 가상 데모 매장으로 치환",
      "기존 운영 상태 문구를 로컬 데모·읽기 전용으로 치환",
      "무료 시작·실제 매장 관리 홍보 문구를 저장되지 않는 가상 데이터 안내로 치환",
      "첫 지표를 고객 기록으로 명확화",
      "DOM의 데모 고객명을 샘플 고객 A·B·C로 치환",
      "390px 세로형으로 기존 4개 지표 카드를 재배치",
      "fixture 수치의 변화율·성과성 보조 문구 제외",
      "로컬 데모·가상 데이터·읽기 전용 disclosure 배너 추가",
      "고객명·메모·차트·매출·예측 영역 제외",
      "기존 count-up 애니메이션 종료 후 캡처",
    ],
    maskSelectors: [],
    hideSelectors: [
      "footer",
      "main[data-demo-dashboard='readonly'] > div > div:nth-of-type(3)",
      "main[data-demo-dashboard='readonly'] > div > section:nth-of-type(1) ~ *",
    ],
    viewport: { width: 460, height: 1200 },
    altKo: "고객 기억과 예약, 웨이팅, QR 주문을 서로 다른 운영 숫자로 표시한 읽기 전용 매장 데모",
    captionKo:
      "로컬 데모 화면. 모든 값은 가상 데이터이며 지표를 분리해 보는 UI만 확인할 수 있고 실제 매장 성과를 뜻하지 않습니다.",
    dataMode: "local-demo",
    claimSupportedKo: "고객 기록·예약·웨이팅·주문을 서로 다른 운영 지표로 표시하는 읽기 전용 화면",
    claimNotSupportedKo: "실제 고객 수, 재방문율, 매출 또는 AI 예측 정확도",
    minRenderedHeightAt390: 220,
  },
];
