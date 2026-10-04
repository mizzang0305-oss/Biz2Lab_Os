import { essayPhotoSrc, type EssayPhoto } from "@/lib/essays/photos";
import styles from "./essays.module.css";

export function ArticlePhoto({ photo, opening = false }: { photo: EssayPhoto; opening?: boolean }) {
  const srcSet = (format: "avif" | "webp" | "jpg") => photo.widths.map(width => `${essayPhotoSrc(photo, width, format)} ${width}w`).join(", ");
  const sizes = "(max-width: 760px) calc(100vw - 40px), 680px";
  return <figure className={`${styles.articlePhoto} ${opening ? styles.openingPhoto : ""}`} data-source-photo={photo.slug}>
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      {/* Precomputed, local picture variants provide format negotiation without runtime requests. */}
      <img src={essayPhotoSrc(photo, photo.width, "jpg")} srcSet={srcSet("jpg")} sizes={sizes}
        width={photo.width} height={photo.height} alt={photo.alt} loading={opening ? "eager" : "lazy"} decoding="async" />
    </picture>
    <figcaption><strong>{photo.title}</strong><p>{photo.caption}</p>
      <p className={styles.photoCredit}>{photo.credit}</p>
      <p className={styles.photoCredit}><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">{photo.sourceLabel}</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a></p>
      <p className={styles.photoCredit}>웹 전송용 크기 조절과 AVIF/WebP/JPEG 형식 변환. 구도와 내용은 유지했습니다.{photo.license.startsWith("CC BY-SA") && ` 이 이미지의 변환본에도 ${photo.license}을 적용합니다.`}</p>
    </figcaption>
  </figure>;
}
