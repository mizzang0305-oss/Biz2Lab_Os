import Link from "next/link";
import styles from "./essays.module.css";
export function KnowledgeChrome({ children, pathname }: { children: React.ReactNode; pathname: string | null }) {
  return <div className={styles.chrome} data-testid={pathname === "/" ? "home-surface" : undefined}>
    <header className={styles.header}><div className={styles.headerInner}>
      <Link href="/" className={styles.brand} aria-label="Biz2Lab 지식 에세이 홈"><strong>Biz2Lab<span aria-hidden="true">.</span></strong><span>지식 에세이</span></Link>
      <nav aria-label="주요 탐색"><Link href="/#essays">모든 이야기</Link><Link href="/#themes">주제별 읽기</Link><Link href="/about">편집 안내</Link></nav>
    </div></header><main id="site-content" tabIndex={-1}>{children}</main>
    <footer className={styles.footer}><div className={styles.footerInner}><p>질문 하나에서 시작해, 근거를 따라 더 멀리.</p>
      <nav aria-label="사이트 안내"><Link href="/">홈</Link><Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>운영·편집 안내</Link><Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>문의 안내</Link><Link href="/living">생활용품 목록</Link><Link href="/privacy" aria-current={pathname === "/privacy" ? "page" : undefined}>개인정보·광고 안내</Link></nav>
    </div></footer></div>;
}
