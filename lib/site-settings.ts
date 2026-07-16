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
  koreanName: "비즈투랩 플레이",
  brandSubtitle: "오늘 볼 한 편을 고르는 영화·OTT 매거진",
  description:
    "영화 추천, 결말 해석, Netflix와 OTT 설정을 한곳에서 읽는 밝은 한국어 엔터테인먼트 매거진입니다.",
  author: "Biz2Lab",
  hero: {
    title: "오늘 뭐 볼지, 이제 오래 고민하지 마세요",
    description:
      "시간은 짧고 볼 것은 너무 많습니다. 지금 기분, 함께 보는 사람, 남은 시간을 기준으로 한 편을 고르고 엔딩 뒤의 이야기도 천천히 읽어보세요.",
    bullets: [
      "줄거리 복사보다 선택에 도움이 되는 판단",
      "스포일러 수준을 먼저 표시하는 해석 글",
      "공식 도움말로 다시 확인한 OTT 설정",
      "AI 초안은 공개 전 사람이 문장과 근거를 검토",
    ],
    primaryCta: { label: "오늘 볼 영화 고르기", href: "/ko/what-to-watch" },
    secondaryCta: { label: "취향 도구 열기", href: "/ko/resources" },
  },
  navItems: [
    { label: "오늘 뭐 볼까", href: "/ko/what-to-watch" },
    { label: "엔딩 뒤의 이야기", href: "/ko/after-the-credits" },
    { label: "OTT 생활", href: "/ko/streaming-life" },
    { label: "취향 도구", href: "/ko/resources" },
    { label: "소개", href: "/ko/about" },
    { label: "문의", href: "/ko/contact" },
  ],
  footer: {
    description:
      "Biz2Lab PLAY는 유명한 작품을 무조건 권하기보다, 오늘의 기분과 시간에 맞는 한 편을 고를 수 있도록 돕습니다.",
    sections: [
      {
        title: "둘러보기",
        links: [
          { label: "오늘 뭐 볼까", href: "/ko/what-to-watch" },
          { label: "엔딩 뒤의 이야기", href: "/ko/after-the-credits" },
          { label: "OTT 생활", href: "/ko/streaming-life" },
          { label: "취향 도구", href: "/ko/resources" },
        ],
      },
      {
        title: "운영",
        links: [
          { label: "소개·편집 원칙", href: "/ko/about" },
          { label: "문의", href: "/ko/contact" },
          { label: "개인정보처리방침", href: "/ko/privacy" },
          { label: "이용약관", href: "/ko/terms" },
        ],
      },
    ],
    copyright: "© 2026 Biz2Lab PLAY. 영화와 OTT를 고르는 독립 편집 매거진입니다.",
  },
  messages: {
    disabledSearch: "검색 기능은 현재 제공하지 않습니다.",
    searchIndexPending: "검색 색인은 정적 배포 색인 생성 후 활성화됩니다.",
    contactUnavailable:
      "문의 내용은 공개 이슈로 접수할 수 있습니다. 개인정보나 계정 정보는 남기지 마세요.",
    templateCta: "지금 기분과 남은 시간을 기준으로 다음 작품을 골라보세요.",
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
