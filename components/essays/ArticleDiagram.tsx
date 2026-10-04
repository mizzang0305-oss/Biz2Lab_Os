import Image from "next/image";
import type { EssayMedia } from "@/lib/essays/media";
import styles from "./essays.module.css";

export function ArticleDiagram({ figure }: { figure: EssayMedia }) {
  return <figure className={styles.articleDiagram} data-essay-body-media={figure.slug}>
    <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} unoptimized />
    <figcaption><strong>{figure.title}</strong><p>{figure.caption}</p>
      <p className={styles.diagramCredit}>{figure.credit}</p>
      <p className={styles.diagramSource}>관련 근거: <a href={figure.sourceUrl} target="_blank" rel="noopener noreferrer">{figure.sourceLabel}<span className={styles.srOnly}> (새 창)</span></a></p>
    </figcaption>
  </figure>;
}
