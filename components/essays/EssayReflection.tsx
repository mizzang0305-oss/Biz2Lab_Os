import reflectionText from "@/data/knowledge-reflections.json";
import styles from "./essays.module.css";

const reflections: Record<string, readonly string[]> = reflectionText;

export function EssayReflection({ slug }: { slug: string }) {
  const paragraphs = reflections[slug];
  if (!paragraphs) return null;

  return <section id="reflection" className={styles.closing} aria-labelledby="reflection-title" data-essay-reflection={slug}>
    <h2 id="reflection-title">이 글을 정리하며</h2>
    {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
  </section>;
}
