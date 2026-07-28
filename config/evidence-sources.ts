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
  readySelector: string;
  captureSelector: string;
  maskSelectors: string[];
  hideSelectors: string[];
  viewport: { width: number; height: number };
  altKo: string;
  captionKo: string;
  dataMode: "fixture" | "local-demo";
  claimSupportedKo: string;
  claimNotSupportedKo: string;
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
    captureSelector:
      "main > div.space-y-5 > section:nth-of-type(3) > div:nth-of-type(2)",
    maskSelectors: [],
    hideSelectors: ["nextjs-portal"],
    viewport: { width: 1440, height: 960 },
    altKo: "외부 업로드 가능 여부와 차단 사유, 다음 조치가 분리된 승인형 자동화 준비 화면",
    captionKo:
      "로컬 데모 화면. 승인 조건이 충족되지 않으면 외부 업로드가 차단되고 비밀값 대신 상태 요약만 표시됩니다.",
    dataMode: "local-demo",
    claimSupportedKo: "승인 문구와 준비 조건이 충족되기 전 외부 업로드를 차단하는 UI 경계",
    claimNotSupportedKo: "실제 플랫폼 업로드 성공, 매출 또는 운영시간 절감",
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
    maskSelectors: [],
    hideSelectors: ["nextjs-portal"],
    viewport: { width: 1440, height: 960 },
    altKo: "자동화 실행 결과와 안전 메시지, 실패 상태를 구분해 확인하는 로컬 실행 로그 화면",
    captionKo:
      "fixture 화면. 실행 결과와 실패 상태를 남기는 구조만 보여 주며 실제 외부 게시 실행을 증명하지 않습니다.",
    dataMode: "fixture",
    claimSupportedKo: "자동화 작업의 실행 결과와 실패 상태를 별도 로그로 남기는 화면 구조",
    claimNotSupportedKo: "운영 환경의 장기 보존, 장애 복구 시간 또는 외부 서비스 처리 결과",
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
    captureSelector: "section.screen.v262-page",
    maskSelectors: [
      "[aria-label='거래처 빠른 검색']",
      "[aria-label='source_reference']",
    ],
    hideSelectors: [],
    viewport: { width: 1440, height: 960 },
    altKo: "전화와 카카오, 영업, 포털 주문 원본과 재고·한도 보류 상태를 분리한 WMS 주문 작업대",
    captionKo:
      "fixture 화면. 거래처와 원본 참조값은 가렸으며 주문 채널과 검증 상태를 분리하는 설계만 확인할 수 있습니다.",
    dataMode: "fixture",
    claimSupportedKo: "주문 원본 종류와 재고·한도 검증 상태를 별도 필드로 유지하는 작업대",
    claimNotSupportedKo: "실제 거래처 주문 누락 감소율, 실재고 또는 거래처별 가격",
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
    maskSelectors: [],
    hideSelectors: [],
    viewport: { width: 1440, height: 960 },
    altKo: "출고지시와 피킹, 검수, 상차 및 차이 확인을 별도 상태로 표시한 식자재 유통 WMS 화면",
    captionKo:
      "fixture 화면. 가상 작업 건으로 단계 분리와 검수 전 상차 차단 설계를 보여 주며 실제 출고 성과는 포함하지 않습니다.",
    dataMode: "fixture",
    claimSupportedKo: "피킹·검수·상차를 별도 상태로 두고 검수 전 상차 완료를 차단하는 설계",
    claimNotSupportedKo: "실제 물류 처리시간, 오배송 감소율 또는 운영 DB의 출고 상태",
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
    captureSelector:
      "main[data-demo-dashboard='readonly'] > div > section:nth-of-type(1)",
    maskSelectors: [],
    hideSelectors: ["footer"],
    viewport: { width: 1440, height: 960 },
    altKo: "고객 기억과 예약, 웨이팅, QR 주문을 서로 다른 운영 숫자로 표시한 읽기 전용 매장 데모",
    captionKo:
      "로컬 데모 화면. 모든 값은 가상 데이터이며 지표를 분리해 보는 UI만 확인할 수 있고 실제 매장 성과를 뜻하지 않습니다.",
    dataMode: "local-demo",
    claimSupportedKo: "고객 기록·예약·웨이팅·주문을 서로 다른 운영 지표로 표시하는 읽기 전용 화면",
    claimNotSupportedKo: "실제 고객 수, 재방문율, 매출 또는 AI 예측 정확도",
  },
];
