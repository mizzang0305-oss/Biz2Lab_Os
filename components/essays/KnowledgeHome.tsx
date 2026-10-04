import Link from "next/link";
import { antikytheraEssay, essayFigures } from "@/lib/essays/antikythera";
import { EssayFigure } from "./EssayFigure";
import { EssayCollection } from "./EssayCollection";
import styles from "./essays.module.css";
export function KnowledgeHome() {
  return <><section className={styles.hero} id="stories" aria-labelledby="home-title" data-essay-entry="antikythera">
    <div className={styles.heroCopy}><p className={styles.kicker}>첫 번째 이야기 · 과학과 역사</p>
      <h1 id="home-title">2천 년 전의 컴퓨터,<br />{" "}우리가 아는 과거는<br />{" "}얼마나 정확할까?</h1>
      <p className={styles.heroLead}>전기도, 화면도 없는 기계가<br className={styles.mobileBreak} /> 내일의 하늘을 계산했다면?</p>
      <p className={styles.heroDescription}>바다에서 건져 올린 청동 조각. 그 안의 톱니를 따라가면, 고대보다 먼저 우리의 상상이 시험대에 오른다.</p>
      <Link href={antikytheraEssay.path} className={styles.readLink}>이야기 읽기 <span aria-hidden="true">↗</span></Link>
    </div><EssayFigure figure={essayFigures[1]} hero /></section>
    <EssayCollection />
    <section className={styles.editorial} id="editorial" aria-labelledby="editorial-title"><p className={styles.kicker}>이곳에서 읽는 이야기</p>
      <h2 id="editorial-title">익숙한 세상에,<br />낯선 질문을 놓습니다.</h2>
      <div><p>철학, 과학, 역사. 분야보다 궁금증을 먼저 따라갑니다. 설명을 외우기보다, 그 설명이 어디에서 왔는지 함께 들여다봅니다.</p><p>유물과 논문, 연구자의 기록을 읽고 하나의 이야기로 엮습니다. 확인된 것과 아직 모르는 것 사이에도 읽을 만한 이야기가 있습니다.</p></div>
    </section>
    </>;
}
