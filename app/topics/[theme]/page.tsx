import Link from "next/link";
import { notFound } from "next/navigation";
import { getEssayTheme, getSeriesEssays } from "@/lib/essays/series";
import { knowledgeMetadata } from "@/lib/essays/seo";
import { EssayCollection } from "@/components/essays/EssayCollection";
import styles from "@/components/essays/essays.module.css";
type Props = { params: Promise<{ theme: string }> };
export const dynamic = "force-dynamic";
function findTheme(slug: string) {
  const theme = getEssayTheme(slug);
  if (!theme || !getSeriesEssays().some(essay => essay.theme === theme.name)) notFound();
  return theme;
}
export async function generateMetadata({ params }: Props) {
  const theme = findTheme((await params).theme);
  return knowledgeMetadata(`${theme.name}의 질문`, theme.question + " 원자료에서 시작해 과학·기술·역사가 인간의 생각을 바꾸는 과정을 함께 읽습니다.", `/topics/${theme.slug}`);
}
export default async function Page({ params }: Props) {
  const theme = findTheme((await params).theme);
  return <><header className={styles.topicHeader}><Link href="/" className={styles.backLink}>← 이야기 첫 화면</Link><p className={styles.kicker}>주제별 이야기</p><h1>{theme.name}</h1></header><EssayCollection themeSlug={theme.slug} /></>;
}
