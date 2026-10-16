import Link from "next/link";
import { getSeriesEssay } from "@/lib/essays/series";
import { ArticlePreviewImage } from "./ArticlePreviewImage";
import { EssayCollection } from "./EssayCollection";
import styles from "./essays.module.css";
export function KnowledgeHome() {
  const lead = getSeriesEssay("earthrise")!;
  const recommendations = ["antikythera", "frankenstein-ai"].map(slug => getSeriesEssay(slug)!);
  return <>
    <section className={styles.homeSelection} id="stories" aria-labelledby="home-title">
      <article className={styles.leadFeature} data-home-feature={lead.slug}>
        <ArticlePreviewImage slug={lead.slug} priority />
        <p className={styles.kicker}>먼저 펼칠 이야기 · {lead.theme}</p>
        <h1 id="home-title"><Link href={lead.path}>{lead.title}</Link></h1>
        <p className={styles.featureQuestion}>{lead.question}</p>
        <Link href={lead.path} className={styles.readLink}>이 글부터 읽기 <span aria-hidden="true">→</span></Link>
      </article>
      <aside className={styles.homeRecommendations} aria-labelledby="recommendations-title">
        <h2 id="recommendations-title">함께 읽을 이야기</h2>
        {recommendations.map(essay => <article className={styles.smallFeature} key={essay.slug} data-home-feature={essay.slug}>
          <ArticlePreviewImage slug={essay.slug} compact />
          <div><p className={styles.kicker}>{essay.theme}</p><h3><Link href={essay.path}>{essay.title}</Link></h3><p className={styles.recommendationQuestion}>{essay.question}</p></div>
        </article>)}
      </aside>
    </section>
    <EssayCollection compact />
    <section className={styles.readingExperiments} aria-labelledby="experiments-title">
      <p className={styles.kicker}>읽고, 숫자로 확인하기</p>
      <h2 id="experiments-title">조건 하나가 달라지면 답도 달라질까요?</h2>
      <p>글에 나온 가상 예시의 숫자를 직접 바꾸고, 계산의 가정과 한계를 확인해 보세요.</p>
      <ul>
        <li><Link href="/essays/eratosthenes#reading-experiment">그림자 각도로 지구 둘레 계산하기 <span aria-hidden="true">→</span></Link></li>
        <li><Link href="/essays/longitude#reading-experiment">두 시각의 차이로 동서 방향 알아보기 <span aria-hidden="true">→</span></Link></li>
        <li><Link href="/essays/shannon#reading-experiment">네 가지 신호의 확률로 정보량 비교하기 <span aria-hidden="true">→</span></Link></li>
      </ul>
    </section>
    <section className={styles.editorial} id="editorial" aria-labelledby="editorial-title"><p className={styles.kicker}>이곳에서 읽는 이야기</p>
      <h2 id="editorial-title">익숙한 세상에,<br />낯선 질문을 놓습니다.</h2>
      <div><p>철학, 과학, 역사. 분야보다 궁금증을 먼저 따라갑니다. 설명을 외우기보다, 그 설명이 어디에서 왔는지 함께 들여다봅니다.</p><p>유물과 논문, 연구자의 기록을 읽고 하나의 이야기로 엮습니다. 확인된 것과 아직 모르는 것 사이에도 읽을 만한 이야기가 있습니다.</p></div>
    </section>
  </>;
}
