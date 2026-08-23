import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { onurimTagline } from "@/lib/health-v3/content";
import styles from "./onurim.module.css";

export const metadata: Metadata = {
  title: { default: "오누림 Preview", template: "%s | 오누림 Preview" },
  description: onurimTagline,
  robots: { index: false, follow: false, noarchive: true, nosnippet: true, nocache: true },
};

const nav = [
  { href: "/health", label: "건강 첫걸음" },
  { href: "/health/hypertension", label: "심장·혈관" },
  { href: "/health/type-2-diabetes", label: "대사·혈당" },
  { href: "/health#tools", label: "기록 도구" },
  { href: "/health/trust/about", label: "오누림 소개" },
];

export default function HealthLayout({ children }: { children: React.ReactNode }) {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <div className={`onurim-app ${styles.shell}`}>
      <header className={styles.header}>
        <div className={styles.previewBar}>보호된 Preview · 의료인 검수 미완료 · Production 공개 차단</div>
        <div className={styles.headerInner}>
          <Link href="/health" className={styles.brand} aria-label="오누림 Preview 홈">
            <strong>오누림</strong>
            <span>{onurimTagline}</span>
          </Link>
          <nav aria-label="오누림 Preview 주요 메뉴" className={styles.nav}>
            {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
      </header>
      <div className={styles.main}>{children}</div>
      <footer className={styles.footer}>
        <div><strong>오누림</strong><p>질환을 이해하고, 기록하고, 필요한 도움을 제때 찾도록 돕는 건강정보 Preview</p></div>
        <div className={styles.footerLinks}>
          <Link href="/health/trust/editorial-policy">편집 정책</Link>
          <Link href="/health/trust/sources-policy">출처 정책</Link>
          <Link href="/health/trust/medical-review-policy">의료 검토 정책</Link>
          <Link href="/health/trust/ai-disclosure">AI 활용 공개</Link>
          <Link href="/health/trust/disclaimer">면책 안내</Link>
          <Link href="/health/trust/privacy">개인정보</Link>
        </div>
        <p className={styles.operator}>운영: Biz2Lab · 정정 연락처 준비 중</p>
      </footer>
    </div>
  );
}
