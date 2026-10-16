import Link from "next/link";
import styles from "./essays.module.css";

export function EssayProvenance({ sourceCheckedAt }: { sourceCheckedAt: string | null }) {
  const date = sourceCheckedAt && Number.isFinite(Date.parse(sourceCheckedAt))
    ? new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(new Date(sourceCheckedAt))
    : null;

  return <aside className={styles.provenance} aria-label="글의 발행 주체와 자료 검토 안내">
    <p><strong>작성·발행: <Link href="/about">Biz2Lab</Link></strong></p>
    {date && <p>자료 대조 기록: <time dateTime={date}>{date}</time> (한국 시간)</p>}
    <p>자료 대조일은 원자료를 검토한 기록일이며, 글의 발행일이나 모든 출처의 최신성을 뜻하지 않습니다. 각 자료에서 확인한 범위와 제한은 위의 출처 설명에 적었습니다.</p>
    <p>초안·구성·교정에는 AI를 활용했습니다. <Link href="/about">편집 기준</Link> · <Link href="/contact">오류·출처 정정 제안</Link></p>
  </aside>;
}
