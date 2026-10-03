"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {siteSchemasForPath} from "@/lib/pocket-money/seo";
import {jsonLd} from "@/lib/seo";
import styles from "@/components/pocket-money/opportunity-list.module.css";
export function PublicRouteChrome({children}:{children:React.ReactNode}) {
  const pathname=usePathname();
  const living=pathname==="/living"||pathname?.startsWith("/living/")===true;
  const schemas=siteSchemasForPath(pathname);
  return <div className={`${styles.chrome}${living?` ${styles.livingChrome}`:""}`} data-testid={living?undefined:"home-surface"}>
    {schemas.map((schema,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(schema)}}/>)}
    <header className={styles.header}><div className={styles.headerInner}>
      {living?<><Link href="/living" className={styles.brand}>Biz2Lab 생활용품</Link><Link href="/living" className={styles.headerLink} aria-current={pathname==="/living"?"page":undefined}>생활용품 목록</Link></>:<><Link href="/" className={styles.brand}><span className={styles.mark} aria-hidden="true">₩</span>즐거운 용돈벌이</Link><Link href="/#conditions" className={styles.headerLink}>보상 읽는 법</Link></>}
    </div></header>
    <main id="site-content" tabIndex={-1}>{children}</main>
    <footer className={styles.siteFooter}>
      <nav aria-label="사이트 안내">
        <Link href="/">홈</Link>
        <Link href="/living" aria-current={pathname==="/living"?"page":undefined}>생활용품 목록</Link>
        <Link href="/privacy" aria-current={pathname==="/privacy"?"page":undefined}>개인정보·광고 안내</Link>
      </nav>
    </footer>
  </div>;
}
