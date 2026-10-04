import Link from "next/link";
import { getRelatedEssays } from "@/lib/essays/series";
import styles from "./essays.module.css";
export function RelatedReading({ slug }: { slug: string }) {
  const articles = getRelatedEssays(slug);
  if (!articles.length) return null;
  return <section className={styles.relatedReading} aria-labelledby={`related-${slug}`}>
    <p className={styles.kicker}>이어 읽는 질문</p><h2 id={`related-${slug}`}>다른 이야기와 연결해 보기</h2>
    <ul>{articles.map(article => <li key={article.slug}><Link href={article.path}>{article.title}</Link><p>{article.question}</p></li>)}</ul>
  </section>;
}
