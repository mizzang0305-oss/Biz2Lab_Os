export const publicProjects = [
  {
    name: "Commerce Automation Control Center",
    repository: "commerce-automation",
    url: "https://github.com/mizzang0305-oss/commerce-automation",
    summary:
      "콘텐츠 생성 제어 화면과 Python 작업자를 분리하고, 외부 게시·업로드는 명시적 승인 전까지 잠그는 자동화 운영 구조입니다.",
    verified:
      "공개 저장소에서 generate-only 기본값, 수동 검토 패키지, 업로드 차단 상태와 비밀값을 출력하지 않는 준비 점검 구조를 확인할 수 있습니다.",
    boundary:
      "공개 업로드 성과나 매출 효과를 보여 주는 사례가 아니라, 외부 실행을 안전하게 막고 검토하는 설계 근거입니다.",
    relatedArticle: "/ko/automation/ai-business-automation-guide",
    relatedLabel: "AI 자동화 승인 경계 읽기",
  },
  {
    name: "MyBizLab MVP",
    repository: "mybizLab",
    url: "https://github.com/mizzang0305-oss/mybizLab",
    summary:
      "매장 운영, 주문·설문, 고객 후속 조치와 운영 지표를 로컬 데모 데이터로 검증할 수 있게 만든 소상공인 운영 SaaS입니다.",
    verified:
      "외부 서비스가 없어도 실행되는 local 데이터 모드, 실결제와 분리된 데모 흐름, 알려진 결제 웹훅 이벤트 재검증 원칙이 공개되어 있습니다.",
    boundary:
      "데모 화면의 지표는 실제 매장 성과가 아니며, Firebase·결제 공급자의 production 연결은 별도 환경과 검증이 필요합니다.",
    relatedArticle: "/ko/small-business/daily-numbers-for-small-business",
    relatedLabel: "일일 운영 숫자 기준 읽기",
  },
  {
    name: "CN EXEFLOW",
    repository: "CN_ExeFlow",
    url: "https://github.com/mizzang0305-oss/CN_ExeFlow",
    summary:
      "지시, 실행, 증빙, 승인과 결산을 연결하고 역할별 조회 범위와 활동 로그를 남기는 조직 실행 통제 시스템입니다.",
    verified:
      "로그인·사용자 활동·알림 상태를 삭제하지 않고 기록하며, 승인·반려와 실패 상태를 감사 가능한 흐름으로 유지하는 구조를 확인할 수 있습니다.",
    boundary:
      "특정 조직의 생산성 개선 수치를 공개하는 사례가 아니라, 승인과 실행 기록을 분리하는 구현 근거입니다.",
    relatedArticle: "/ko/automation/automation-priority-method",
    relatedLabel: "자동화 우선순위 기준 읽기",
  },
] as const;

export const representativeArticleSlugs = [
  "ai-business-automation-guide",
  "automation-priority-method",
  "accounts-receivable-tracker",
  "daily-numbers-for-small-business",
  "unify-order-channels",
] as const;
