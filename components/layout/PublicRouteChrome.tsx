"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {siteSchemasForPath} from "@/lib/pocket-money/seo";
import {jsonLd} from "@/lib/seo";
import styles from "@/components/pocket-money/opportunity-list.module.css";
export function PublicRouteChrome({children}:{children:React.ReactNode}) {
  const schemas=siteSchemasForPath(usePathname());
  return <div className={styles.chrome} data-testid="home-surface">
    {schemas.map((schema,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(schema)}}/>)}
    <header className={styles.header}><div className={styles.headerInner}><Link href="/" className={styles.brand}><span className={styles.mark} aria-hidden="true">₩</span>즐거운 용돈벌이</Link><Link href="/#conditions" className={styles.headerLink}>보상 읽는 법</Link></div></header>
    <main id="site-content" tabIndex={-1}>{children}</main>
  </div>;
}
