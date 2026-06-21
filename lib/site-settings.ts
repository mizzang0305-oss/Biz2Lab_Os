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
  contactEmail: string;
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
    "소상공인, 영업팀, 1인 사업자를 위한 현장형 AI 업무 자동화 블로그입니다.",
  author: "Biz2Lab",
  contactEmail: "hello@biz2lab.com",
  hero: {
    title: "AI 업무 자동화로 사업 운영을 시스템화하는 방법",
    description:
      "반복 업무, 매출 관리, 전자계약, 고객 관리까지 현장에서 바로 적용할 수 있는 자동화 구조를 정리합니다.",
    bullets: [
      "반복 업무를 자동화 후보로 분류",
      "매출·미수금·계약 상태를 연결",
      "글마다 관련 글과 다음 행동을 제공",
      "필요한 기능만 안전하게 단계 공개",
    ],
    primaryCta: { label: "처음 시작하기", href: "/ko/automation" },
    secondaryCta: { label: "문의하기", href: "/ko/contact" },
  },
  navItems: [
    { label: "AI 업무 자동화", href: "/ko/automation" },
    { label: "영업·매출 관리", href: "/ko/sales-ops" },
    { label: "소상공인 운영", href: "/ko/small-business" },
    { label: "전자계약·결제", href: "/ko/contracts-payments" },
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
          { label: "전자계약·결제", href: "/ko/contracts-payments" },
        ],
      },
      {
        title: "정책",
        links: [
          { label: "소개", href: "/ko/about" },
          { label: "문의", href: "/ko/contact" },
          { label: "개인정보처리방침", href: "/ko/privacy" },
          { label: "이용약관", href: "/ko/terms" },
        ],
      },
    ],
    copyright: "© 2026 Biz2Lab. 한국어 최소 공개 버전입니다.",
  },
  messages: {
    disabledSearch: "검색은 승인 후 활성화 예정입니다.",
    searchIndexPending: "검색 색인은 정적 배포 색인 생성 후 활성화됩니다.",
    contactUnavailable:
      "현재 문의 저장 기능이 설정되지 않아 자동 제출할 수 없습니다. 입력 내용은 보존되며, 연락처가 연결되면 제출 기능이 활성화됩니다.",
    templateCta:
      "다운로드 시스템은 이후 단계로 두고, 현재는 글 안에서 점검 기준을 먼저 제공합니다.",
  },
  featureFlags: {
    searchEnabled: false,
    newsletterEnabled: false,
    downloadsEnabled: false,
    adminEnabled: false,
    commerceEnabled: false,
    aiEnabled: false,
    multilingualEnabled: false,
  },
} as const satisfies SiteSettings;
