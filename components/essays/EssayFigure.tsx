import Image from "next/image";
import { essaySources, type EssayFigureData } from "@/lib/essays/antikythera";
import styles from "./essays.module.css";
import { FigureViewer } from "./FigureViewer";
export function EssayFigure({ figure, hero = false }: { figure: EssayFigureData; hero?: boolean }) {
  return <figure data-essay-figure={figure.id} className={`${styles.figure} ${hero ? styles.heroFigure : ""}`}>
    <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} preload={hero} className={styles.figureImage} sizes={hero ? "(max-width: 760px) calc(100vw - 40px), 48vw" : "(max-width: 760px) calc(100vw - 40px), 680px"} />
    <FigureViewer figure={figure} />
    <figcaption><p className={styles.figureDescription}>{figure.description}</p>
      <p className={styles.credit}>Freeth 외 (2021), 그림 {figure.number} · 도판 제작: Tony Freeth. <a href={`${essaySources[0].url}#Fig${figure.number}`} target="_blank" rel="noopener noreferrer">논문 원본 (새 창)</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0 (새 창)</a><br />{figure.changes}</p>
    </figcaption></figure>;
}
