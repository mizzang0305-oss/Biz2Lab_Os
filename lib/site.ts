export const siteConfig = {
  name: "Biz2Lab",
  koreanName: "비즈투랩",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://biz2lab.com",
  description:
    "소상공인, 영업팀, 1인 사업자를 위한 현장형 AI 업무 자동화 블로그입니다.",
  author: "Biz2Lab",
  email: "hello@biz2lab.com",
} as const;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url.replace(/\/$/, "")}${normalizedPath}`;
}

