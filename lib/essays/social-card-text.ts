type SocialCardArticle = { theme: string; title: string; question: string; order: number };

export const seriesSocialCardLabels = {
  brand: "Biz2Lab 지식 에세이",
  footer: "원자료에서 시작하는 질문",
} as const;

/** The exact visible strings used by the series OG/Twitter card and font builder. */
export function getSeriesSocialCardText(article: SocialCardArticle): string {
  return `${seriesSocialCardLabels.brand}${article.theme}${article.title}${article.question}${seriesSocialCardLabels.footer}${String(article.order).padStart(2, "0")}`;
}
