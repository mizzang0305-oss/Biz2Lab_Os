export const commercialServices = {
  mybiz: {
    key: "mybiz",
    href: "/mybiz",
    name: "MyBiz / Business Service OS",
    status: "BETA",
    audience: "작업 진행과 완료 근거를 체계적으로 관리하려는 서비스 사업자",
    problem: "고객 요청, 작업 상태, 사진·문서와 고객 확인 기록이 흩어지면 한 건의 업무를 끝까지 추적하기 어렵습니다.",
    value: "작업부터 다음 고객까지 이어지는 서비스 운영 흐름을 준비하고 있습니다. 지금은 샘플 매장 화면만 확인할 수 있습니다.",
    available: "실제 고객 데이터가 없는 샘플 매장 대시보드가 공개되어 있습니다. 저장되지 않는 시연이며 화면의 수치는 실제 성과가 아닙니다.",
    boundary: "공개 데모는 작업·증빙 저장이나 고객 확인을 시연하지 않습니다. 결제, 전자서명, 외부 게시와 운영 계정도 제공 범위로 확정되지 않았습니다. 도입 범위는 별도 확인이 필요합니다.",
    demoUrl: "https://mybiz.ai.kr/demo/dashboard",
    demoLabel: "샘플 매장 화면 보기",
  },
  web: {
    key: "web",
    href: "/web",
    name: "홈페이지 제작",
    status: "COMING_SOON",
    audience: "자사 서비스와 문의 경로를 분명하게 보여주고 싶은 사업자",
    problem: "방문자가 제공 범위와 다음 행동을 찾기 어려우면 상담으로 이어지지 않습니다.",
    value: "방문 목적과 문의 경로가 드러나는 홈페이지·랜딩 구성을 검토합니다.",
    available: "현재 독립된 제작 상품, 공개 사례, 계약 범위와 가격은 확인 중입니다.",
    boundary: "예약 시스템, 관리자 화면, 유지보수 범위를 확정된 제공 항목으로 홍보하지 않습니다. 실제 제작 사례·데모가 준비되기 전에는 판매 접수를 시작하지 않습니다.",
    demoUrl: null,
    demoLabel: null,
  },
  "minz-mind": {
    key: "minz-mind",
    href: "/minz-mind",
    name: "MINZ MIND",
    status: "COMING_SOON",
    audience: "짧은 대화와 시각 표현으로 자신의 생각을 돌아보고 싶은 성인 및 파일럿 협력자",
    problem: "긴 글이나 빠른 AI 결론이 부담스러울 때 스스로 생각을 정리할 방법이 필요합니다.",
    value: "대화와 그림을 함께 사용하는 비의료 자기성찰 경험을 준비하고 있습니다.",
    available: "통합 Preview와 기술 검증 자료가 있으며 공개 제품 체험은 아직 제공하지 않습니다.",
    boundary: "Human Gate 단계입니다. 의료 진단·상담·치료, 실사용 Auth, 결제, Production DB 사용을 제공한다고 표현하지 않습니다.",
    demoUrl: null,
    demoLabel: null,
  },
} as const;

export type CommercialService = keyof typeof commercialServices;
export type CommercialStatus = "LIVE" | "BETA" | "COMING_SOON" | "HIDDEN";
