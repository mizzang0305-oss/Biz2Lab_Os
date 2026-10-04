import Link from "next/link";
import { getRelatedEssays } from "@/lib/essays/series";
import { readingBridge } from "@/lib/essays/reading-bridges";
import { ArticlePreviewImage } from "./ArticlePreviewImage";
import styles from "./essays.module.css";
export function RelatedReading({ slug }: { slug: string }) {
  const articles = getRelatedEssays(slug);
  if (!articles.length) return null;
  return <section className={`${styles.relatedReading} ${styles.visualReading}`} aria-labelledby={`related-${slug}`}>
    <h2 id={`related-${slug}`}>이 질문에서, 다음 이야기로</h2>
    <ul>{articles.map(article => <li className={styles.relatedStory} key={article.slug} data-next-story={article.slug}>
      <ArticlePreviewImage slug={article.slug} compact />
      <div><h3><Link href={article.path}>{article.title}</Link></h3><p className={styles.readingBridge}>{readingBridge(slug, article.slug)}</p></div>
    </li>)}</ul>
  </section>;
}
