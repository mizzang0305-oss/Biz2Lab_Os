import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getTrustPage, trustPages } from "@/lib/health-v3/content";
import { breadcrumbJsonLd, createMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return trustPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getTrustPage(slug);
  return page ? createMetadata({ title: page.seoTitle ?? page.title, description: page.description ?? page.intro,
    path: `/health/trust/${slug}`, noindex: page.indexDecision === "NOINDEX_FOLLOW", follow: true }) : {};
}

export default async function TrustPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getTrustPage(slug);
  if (!page) notFound();

  return (
    <article className="onurim-trust-page">
      {page.updatedAt ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd([
        { name: "오누림", url: absoluteUrl("/") },
        { name: page.title, url: absoluteUrl(`/health/trust/${slug}`) },
      ])) }} /> : null}
      <header><p className="onurim-eyebrow">오누림 신뢰 정책</p><h1>{page.title}</h1><p>{page.intro}</p></header>
      {page.updatedAt ? <p>안내 수정 <time dateTime={page.updatedAt}>{page.updatedAt}</time> · 의료 검수일이 아닙니다</p> : null}
      <div className="onurim-trust-sections">
        {page.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p>
          {section.links?.length ? <ul>{section.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul> : null}
        </section>)}
      </div>
      {slug === "privacy" ? (
        <ul>
          <li><a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google 광고 설정</a></li>
          <li><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google 파트너 사이트 정보 처리 안내</a></li>
        </ul>
      ) : null}
      <footer><p>운영: Biz2Lab · 작성: 박영훈(비의료인 건강정보 편집자) · 의료인 검수 완료 표기 없음</p></footer>
    </article>
  );
}
