import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSeriesEssays, safeEssayHref, essayThemes, type SeriesEssay as Essay } from "@/lib/essays/series";
import { ReadingExperience } from "./ReadingExperience";
import { RelatedReading } from "./RelatedReading";
import { ArticleDiagram } from "./ArticleDiagram";
import { ArticlePhoto } from "./ArticlePhoto";
import { getEssayPhoto } from "@/lib/essays/photos";
import { getEssayMedia } from "@/lib/essays/media";
import styles from "./essays.module.css";

export function SeriesEssay({ essay }: { essay: Essay }) {
  const paths = getSeriesEssays().map(article => article.path);
  const theme = essayThemes.find(item => item.name === essay.theme)!;
  const figure = getEssayMedia(essay.slug);
  const photo = getEssayPhoto(essay.slug);
  const markdown = (content: string) => <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml urlTransform={url => safeEssayHref(url, paths) ?? ""} components={{
    a: ({ href, children }) => href ? <a href={href} className={styles.sourceLink} {...(href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}{href.startsWith("https:") && <span className={styles.srOnly}> (새 창)</span>}</a> : <span>{children}</span>,
    img: () => null,
    input: () => null,
    table: ({ children }) => <div className={styles.markdownTable}><table>{children}</table></div>,
  }}>{content}</ReactMarkdown>;
  return <article className={styles.article} data-essay-slug={essay.slug} data-manuscript-sha256={essay.manuscriptSha256} data-body-sha256={essay.bodySha256}>
    <header className={styles.articleHeader}><Link href="/" className={styles.backLink}>← 이야기 첫 화면</Link>
      <p className={styles.kicker}><Link href={`/topics/${theme.slug}`}>{essay.theme}</Link></p><h1>{essay.title}</h1>
      <p className={styles.articleDeck}>{essay.question}</p>
      <p className={styles.draftNote}>Biz2Lab 지식 에세이</p>
    </header>
    <div className={`${styles.prose} ${styles.markdownProse}`}>
      {photo && <ArticlePhoto photo={photo} opening />}
      {essay.intro && markdown(essay.intro)}
      <ReadingExperience chapters={[...essay.sections.map(section => [section.id, section.title] as const), ["sources", "직접 들여다볼 원자료"]]} />
      {essay.sections.map(section => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}><h2 id={`${section.id}-title`}>{section.title}</h2>{markdown(section.content)}{figure?.afterSection === section.id && (!photo || photo.keepDiagram) && <ArticleDiagram figure={figure} />}</section>)}
      <section className={styles.sources} id="sources" aria-labelledby="sources-title"><h2 id="sources-title">직접 들여다볼 원자료</h2>
        <p>아래 자료의 근거를 연결해 구성한 에세이입니다. 자료에서 확인한 사실과, 이를 오늘의 질문에 연결하는 원고의 해석을 구분해 읽어 주세요.</p>
        <ol>{essay.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <span aria-hidden="true">↗</span><span className={styles.srOnly}> (새 창)</span></a><p>{source.note}</p></li>)}</ol>
      </section>
      <RelatedReading slug={essay.slug} />
      <div className={styles.articleEnd}><Link href={`/topics/${theme.slug}`}>{essay.theme}의 다른 질문 보기</Link><br /><Link href="/">← 이야기 첫 화면</Link></div>
    </div>
  </article>;
}
