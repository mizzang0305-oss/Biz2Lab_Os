import Link from "next/link";
import { essayThemes, getSeriesEssays } from "@/lib/essays/series";
import styles from "./essays.module.css";
export function EssayCollection({ themeSlug, compact = false }: { themeSlug?: string; compact?: boolean } = {}) {
  const all = getSeriesEssays();
  const themes = essayThemes.filter(theme => (!themeSlug || theme.slug === themeSlug) && all.some(essay => essay.theme === theme.name));
  const Heading = themeSlug ? "h2" : "h3";
  const CardHeading = themeSlug ? "h3" : "h4";
  if (compact) return <section className={`${styles.essayCollection} ${styles.compactCollection}`} id="essays" aria-labelledby="collection-title">
    <h2 id="collection-title">모든 이야기</h2>
    <nav id="themes" className={styles.themeNavigation} aria-label="주제별 이야기">{themes.map(theme => <Link key={theme.slug} href={`/topics/${theme.slug}`}>{theme.name}</Link>)}</nav>
    <div className={styles.compactThemes}>{themes.map(theme => <section className={styles.compactTheme} key={theme.slug} aria-labelledby={`theme-${theme.slug}`}>
      <h3 id={`theme-${theme.slug}`}><Link href={`/topics/${theme.slug}`}>{theme.name}</Link></h3>
      <ul className={styles.compactList}>{all.filter(essay => essay.theme === theme.name).map(essay => <li key={essay.slug} data-series-entry={essay.slug}>
        <Link href={essay.path}><span className={styles.listNumber}>{String(essay.order).padStart(2, "0")}</span><span>{essay.title}</span><span aria-hidden="true">→</span></Link>
      </li>)}</ul>
    </section>)}</div>
  </section>;
  return <section className={styles.essayCollection} id="essays" aria-labelledby={themeSlug ? `theme-${themeSlug}` : "collection-title"}>
    {!themeSlug && <><p className={styles.kicker}>질문을 따라 읽기</p><h2 id="collection-title">과학·기술·역사가 생각을 바꾸는 순간</h2>
      <p className={styles.collectionIntro}>사람들은 무엇을 보고, 어떤 도구를 만들고, 어느 설명을 고쳐 왔을까요. 원자료에서 출발해 그 변화의 과정을 따라갑니다.</p>
      <nav id="themes" className={styles.themeNavigation} aria-label="주제별 이야기">{themes.map(theme => <Link key={theme.slug} href={`/topics/${theme.slug}`}>{theme.name}</Link>)}</nav></>}
    {themes.map(theme => {
      const essays = all.filter(essay => essay.theme === theme.name);
      if (!essays.length) return null;
      return <section className={styles.themeGroup} key={theme.slug} aria-labelledby={`theme-${theme.slug}`}>
        <Heading id={`theme-${theme.slug}`}>{themeSlug ? theme.question : <Link href={`/topics/${theme.slug}`}>{theme.name} <span aria-hidden="true">↗</span></Link>}</Heading>
        {!themeSlug && <p className={styles.themeQuestion}>{theme.question}</p>}
        <ul className={styles.essayGrid}>{essays.map(essay => <li className={styles.essayCard} key={essay.slug} data-series-entry={essay.slug}>
          <p className={styles.essayNumber}>{String(essay.order).padStart(2, "0")}</p><CardHeading><Link href={essay.path}>{essay.title}</Link></CardHeading><p>{essay.question}</p><Link className={styles.cardReadLink} href={essay.path} aria-label={`${essay.title} 읽기`}>이야기 읽기 <span aria-hidden="true">↗</span></Link>
        </li>)}</ul>
      </section>;
    })}
  </section>;
}
