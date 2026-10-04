import Image from "next/image";
import Link from "next/link";
import { essayPhotoSrc, getEssayPhoto } from "@/lib/essays/photos";
import { essayFigures, essaySources } from "@/lib/essays/antikythera";
import styles from "./essays.module.css";
export function ArticlePreviewImage({ slug, priority = false, compact = false }: { slug: string; priority?: boolean; compact?: boolean }) {
  const photo = getEssayPhoto(slug);
  const href = `/essays/${slug}`;
  const sizes = compact ? "(max-width:760px) 110px, 164px" : "(max-width:760px) calc(100vw - 40px), 720px";
  if (!photo && slug !== "antikythera") return null;
  const figure = essayFigures[0];
  return <figure className={styles.previewFigure} data-preview-photo={slug}>
    <Link href={href} className={styles.previewMedia}>
      {photo ? <picture>
        <source type="image/avif" srcSet={photo.widths.map(width => `${essayPhotoSrc(photo, width, "avif")} ${width}w`).join(", ")} sizes={sizes} />
        <source type="image/webp" srcSet={photo.widths.map(width => `${essayPhotoSrc(photo, width, "webp")} ${width}w`).join(", ")} sizes={sizes} />
        {/* Existing precomputed local format/width variants need no new image service. */}
        <img src={essayPhotoSrc(photo, photo.width, "jpg")} srcSet={photo.widths.map(width => `${essayPhotoSrc(photo, width, "jpg")} ${width}w`).join(", ")} sizes={sizes}
          width={photo.width} height={photo.height} alt={photo.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
      </picture> : <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} sizes={sizes} preload={priority} />}
    </Link>
    <figcaption className={styles.previewCredit}>
      {photo ? <>{photo.creator || photo.credit} · <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">출처</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a></> : <>Freeth 외 (2021), 그림 4 · <a href={`${essaySources[0].url}#Fig4`} target="_blank" rel="noopener noreferrer">출처</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></>}
    </figcaption>
  </figure>;
}
