export type SiteFeatureFlags = {
  searchEnabled: boolean;
  newsletterEnabled: boolean;
  downloadsEnabled: boolean;
  adminEnabled: boolean;
  commerceEnabled: boolean;
  aiEnabled: boolean;
  multilingualEnabled: boolean;
};

export type SiteLink = {
  label: string;
  href: `/${string}`;
};

export type SiteSettings = {
  siteName: string;
  koreanName: string;
  brandSubtitle: string;
  description: string;
  author: string;
  hero: {
    title: string;
    description: string;
    bullets: string[];
    primaryCta: SiteLink;
    secondaryCta: SiteLink;
  };
  navItems: SiteLink[];
  footer: {
    description: string;
    sections: {
      title: string;
      links: SiteLink[];
    }[];
    copyright: string;
  };
  messages: {
    disabledSearch: string;
    searchIndexPending: string;
    contactUnavailable: string;
    templateCta: string;
  };
  featureFlags: SiteFeatureFlags;
};

export const siteSettings = {
  siteName: "ONURIM",
  koreanName: "오누림",
  brandSubtitle: "질환을 쉽게 이해하고 필요한 도움을 찾는 건강 안내서",
  description:
    "권위 있는 건강정보 출처를 바탕으로 질환의 큰 흐름, 기록할 변화와 의료 도움을 받아야 할 때를 쉬운 말과 원본 그림으로 설명합니다.",
  author: "박영훈",
  hero: {
    title: "어려운 질병 이야기를 가족에게 설명하듯 쉽게",
    description:
      "질환을 스스로 진단하는 대신 몸의 변화를 이해하고, 기록하고, 진료에서 물을 내용을 준비합니다.",
    bullets: [
      "공식 건강정보 출처를 문장 단위로 연결",
      "개인정보를 저장하지 않는 인쇄용 기록 도구",
      "의료인 검수 미완료와 AI 보조 사실을 투명하게 공개",
    ],
    primaryCta: { label: "질환 안내 보기", href: "/health" },
    secondaryCta: { label: "작성 원칙", href: "/health/trust/editorial-policy" },
  },
  navItems: [
    { label: "질환 알아보기", href: "/health" },
    { label: "몸이 보내는 신호", href: "/health/guides/danger-signals" },
    { label: "검사·건강수치", href: "/health/guides/reading-health-results" },
    { label: "가족 건강", href: "/health/guides/family-medication-support" },
    { label: "건강 도구", href: "/health#tools" },
    { label: "오누림 소개", href: "/health/trust/about" },
  ],
  footer: {
    description:
      "오누림은 일반 건강교육 정보입니다. 개인의 진단이나 치료를 대신하지 않으며, 위급한 변화에는 온라인 정보보다 119와 의료 도움을 우선합니다.",
    sections: [
      {
        title: "건강 안내",
        links: [
          { label: "20개 질환 안내", href: "/health" },
          { label: "위험 신호", href: "/health/guides/danger-signals" },
          { label: "진료 질문 준비", href: "/health/guides/appointment-questions" },
          { label: "건강 기록 도구", href: "/health#tools" },
        ],
      },
      {
        title: "신뢰와 정책",
        links: [
          { label: "작성자", href: "/health/trust/author" },
          { label: "출처 원칙", href: "/health/trust/sources-policy" },
          { label: "정정·문의", href: "/health/trust/corrections-policy" },
          { label: "AI 활용 공개", href: "/health/trust/ai-disclosure" },
          { label: "광고 정책", href: "/health/trust/advertising" },
          { label: "면책 안내", href: "/health/trust/disclaimer" },
          { label: "개인정보", href: "/health/trust/privacy" },
          { label: "이용약관", href: "/health/trust/terms" },
        ],
      },
    ],
    copyright: "© 2026 ONURIM by Biz2Lab. 일반 건강교육 정보를 제공합니다.",
  },
  messages: {
    disabledSearch: "검색 기능은 현재 제공하지 않습니다.",
    searchIndexPending: "검색 색인은 정적 배포 색인 생성 후 활성화됩니다.",
    contactUnavailable:
      "문의는 공개 GitHub Issue로 접수합니다. 개인정보나 계정 정보는 남기지 마세요.",
    templateCta:
      "각 글에서 샘플 데이터가 포함된 CSV 실무 자료를 직접 내려받을 수 있습니다.",
  },
  featureFlags: {
    searchEnabled: false,
    newsletterEnabled: false,
    downloadsEnabled: true,
    adminEnabled: false,
    commerceEnabled: false,
    aiEnabled: false,
    multilingualEnabled: false,
  },
} as const satisfies SiteSettings;
