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
  brandSubtitle: "B2B 유통 현장 시스템 구축 기록",
  description:
    "식자재 유통과 B2B 영업 현장의 주문, 미수금, 재고와 승인형 자동화를 직접 설계·개발한 화면 기록입니다.",
  author: "Biz2Lab",
  hero: {
    title: "주문·미수금·재고를 직접 시스템으로 바꾼 기록",
    description:
      "식자재 유통과 B2B 영업 현장에서 반복되는 주문 누락, 입금 약속, 피킹·검수 문제를 직접 설계·개발한 화면과 코드, 실패 사례로 설명합니다.",
    bullets: [
      "직접 구현한 화면과 코드 근거",
      "고객정보가 없는 로컬 데모 화면",
      "성공뿐 아니라 미완성 범위와 복구 기준 공개",
    ],
    primaryCta: { label: "대표 구축 사례 보기", href: "/ko/projects" },
    secondaryCta: { label: "운영자 경험 범위", href: "/ko/author/biz2lab" },
  },
  navItems: [
    { label: "B2B 영업·미수금", href: "/ko/sales-ops" },
    { label: "승인형 자동화", href: "/ko/automation" },
    { label: "주문·운영", href: "/ko/small-business" },
    { label: "물류·피킹", href: "/ko/warehouse-logistics" },
    { label: "프로젝트 기록", href: "/ko/projects" },
    { label: "실무 자료실", href: "/ko/resources" },
  ],
  footer: {
    description:
      "식자재 유통과 B2B 영업 현장에서 직접 만든 주문·미수금·물류·승인 시스템의 검증 범위와 한계를 기록합니다.",
    sections: [
      {
        title: "카테고리",
        links: [
          { label: "B2B 영업·미수금", href: "/ko/sales-ops" },
          { label: "승인형 업무 자동화", href: "/ko/automation" },
          { label: "주문·운영 시스템", href: "/ko/small-business" },
          { label: "물류·재고·피킹", href: "/ko/warehouse-logistics" },
          { label: "프로젝트 기록", href: "/ko/projects" },
          { label: "실무 자료실", href: "/ko/resources" },
        ],
      },
      {
        title: "정책",
        links: [
          { label: "운영자 소개", href: "/ko/author/biz2lab" },
          { label: "사이트 소개·편집 원칙", href: "/ko/about" },
          { label: "문의", href: "/ko/contact" },
          { label: "콘텐츠 수정 정책", href: "/ko/editorial-policy" },
          { label: "광고·제휴 안내", href: "/ko/advertising" },
          { label: "면책조항", href: "/ko/disclaimer" },
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
