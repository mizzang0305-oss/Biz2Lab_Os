"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {isPocketPath,siteSchemasForPath} from "@/lib/pocket-money/seo";
import {jsonLd} from "@/lib/seo";
import styles from "@/components/pocket-money/pocket-money.module.css";
export function PublicRouteChrome({children,legacyHeader,legacyFooter}:{children:React.ReactNode;legacyHeader:React.ReactNode;legacyFooter:React.ReactNode}){
 const pathname=usePathname(),pocket=isPocketPath(pathname);
 const schemas=siteSchemasForPath(pathname);
 const main=<main id="site-content" tabIndex={-1} className="flex-1">{children}</main>;
 const schemaNodes=schemas.map((schema,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(schema)}}/>);
 if(!pocket)return <>{schemaNodes}{legacyHeader}{main}{legacyFooter}</>;
 return <div className={styles.pocketChrome}>{schemaNodes}
 <header className={styles.header}><div className={styles.headerInner}><Link href="/" className={styles.brand} data-primary-target><span className={styles.brandMark} aria-hidden="true">✳</span>즐거운 용돈벌이</Link><Link href="/health" className={styles.healthHeaderLink} data-primary-target>건강 정보</Link></div></header>
 {main}<nav className={styles.bottomNav} aria-label="빠른 메뉴"><div className={styles.bottomNavInner}><Link href="/" aria-current={pathname==="/"?"page":undefined} data-primary-target><span aria-hidden="true">⌂</span>홈</Link><Link href="/pocket-money#guides" data-primary-target><span aria-hidden="true">▤</span>가이드</Link><Link href="/pocket-money#conditions" data-primary-target><span aria-hidden="true">✓</span>조건 먼저</Link><Link href="/health" data-primary-target><span aria-hidden="true">+</span>오누림</Link></div></nav></div>;
}
