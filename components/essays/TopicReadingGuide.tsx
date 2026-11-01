import Link from "next/link";
import { getSeriesEssay } from "@/lib/essays/series";
import { topicGuides } from "@/lib/essays/topic-guides";
import styles from "./topic-reading-guide.module.css";

export function TopicReadingGuide({ themeSlug }: { themeSlug: string }) {
  const guide = topicGuides[themeSlug];
  if (!guide) return null;
  return <section className={styles.guide} aria-labelledby="reading-guide-title" data-topic-guide={themeSlug}>
    <h2 id="reading-guide-title">이 주제를 읽는 순서</h2>
    <p>{guide.introduction}</p>
    <p className={styles.takeaway}><strong>읽고 나면</strong> {guide.takeaway}</p>
    <ol className={styles.steps}>{guide.steps.map(step => {
      const essay = getSeriesEssay(step.slug);
      if (!essay) return null;
      return <li key={step.slug}><h3>{step.focus}</h3><Link href={essay.path}>{essay.title} →</Link><p>{step.question}</p></li>;
    })}</ol>
    <h3>비슷해 보이는 주장, 다르게 확인하기</h3>
    <div className={styles.tableScroll} role="region" aria-label="주장과 확인 기준 비교표" tabIndex={0}>
      <table><caption>위 글들을 함께 읽기 위한 Biz2Lab의 비교 기준</caption>
        <thead><tr><th scope="col">주장</th><th scope="col">먼저 확인할 것</th><th scope="col">넘어가지 말아야 할 범위</th></tr></thead>
        <tbody>{guide.comparison.map(row => <tr key={row.claim}><th scope="row">{row.claim}</th><td>{row.check}</td><td>{row.limit}</td></tr>)}</tbody>
      </table>
    </div>
    <aside className={styles.exercise} aria-labelledby="reading-exercise-title"><h3 id="reading-exercise-title">한 문장으로 확인해 보기</h3><p>{guide.exercise.question}</p>
      <details><summary>해설 펼쳐보기</summary><p>{guide.exercise.answer}</p></details>
    </aside>
    <p className={styles.note}>위 안내와 과제는 연결된 글의 설명을 비교하기 위해 구성했습니다. 새로운 실험·조사 결과가 아니며, 사실의 근거와 적용 한계는 각 글의 원자료에서 확인할 수 있습니다.</p>
    <a href="#essays">이 주제의 전체 글 보기 ↓</a>
  </section>;
}
