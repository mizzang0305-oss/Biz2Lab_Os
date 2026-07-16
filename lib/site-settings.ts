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
  siteName: "Biz2Lab",
  koreanName: "비즈투랩",
  brandSubtitle: "한국어 AI 업무 자동화 콘텐츠",
  description:
    "소상공인, 영업팀, 1인 사업자를 위한 운영 숫자, 주문 관리, 업무 자동화 실무 자료입니다.",
  author: "Biz2Lab",
  hero: {
    title: "AI 업무 자동화로 사업 운영을 시스템화하는 방법",
    description:
      "소상공인과 영업팀이 매일 놓치기 쉬운 숫자, 주문, 미수금, 자동화 기준을 실무형 체크리스트와 계산 기준으로 정리합니다.",
    bullets: [
      "20개 핵심 글만 공개 운영",
      "글마다 실제 CSV 실무 자료 제공",
      "샘플 데이터와 계산 과정을 공개",
      "AI 초안과 사람 승인을 분리",
    ],
    primaryCta: { label: "처음 시작하기", href: "/ko/automation" },
    secondaryCta: { label: "실무 자료실", href: "/ko/resources" },
  },
  navItems: [
    { label: "AI 업무 자동화", href: "/ko/automation" },
    { label: "영업·매출 관리", href: "/ko/sales-ops" },
    { label: "소상공인 운영", href: "/ko/small-business" },
    { label: "실무 자료실", href: "/ko/resources" },
    { label: "소개", href: "/ko/about" },
    { label: "문의", href: "/ko/contact" },
  ],
  footer: {
    description:
      "소상공인, 영업팀, 1인 사업자가 반복 업무와 운영 지표를 정리할 수 있도록 실전형 AI 자동화 글을 제공합니다.",
    sections: [
      {
        title: "카테고리",
        links: [
          { label: "AI 업무 자동화", href: "/ko/automation" },
          { label: "영업·매출 관리", href: "/ko/sales-ops" },
          { label: "소상공인 운영", href: "/ko/small-business" },
          { label: "실무 자료실", href: "/ko/resources" },
        ],
      },
      {
        title: "정책",
        links: [
          { label: "소개·편집 원칙", href: "/ko/about" },
          { label: "문의", href: "/ko/contact" },
          { label: "개인정보처리방침", href: "/ko/privacy" },
          { label: "이용약관", href: "/ko/terms" },
        ],
      },
    ],
    copyright: "© 2026 Biz2Lab. 현장형 업무 자동화와 운영 기준을 정리합니다.",
  },
  messages: {
    disabledSearch: "검색 기능은 현재 제공하지 않습니다.",
    searchIndexPending: "검색 색인은 정적 배포 색인 생성 후 활성화됩니다.",
    contactUnavailable:
      "현재 문의 저장 기능이 설정되지 않아 자동 제출할 수 없습니다. 입력 내용은 보존되며, 연락처가 연결되면 제출 기능이 활성화됩니다.",
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
