import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getHealthSupportGuide, healthSupportGuides } from "@/lib/health-v3/support-guides";
import { breadcrumbJsonLd, createMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { HealthComparisonTable } from "@/components/health/HealthComparisonTable";

export const dynamicParams = false;

export function generateStaticParams() {
  return healthSupportGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getHealthSupportGuide(slug);
  return guide ? createMetadata({ title: guide.seoTitle ?? guide.title, description: guide.description, path: `/health/guides/${slug}`, type: "article" }) : {};
}

export default async function HealthSupportGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getHealthSupportGuide(slug);
  if (!guide) notFound();
  const sourceLinks = (ids?: string[]) => ids?.length ? (
    <p className="onurim-section-sources">근거: {ids.map((id, index) => {
      const source = guide.sources.find(s => s.id === id);
      if (!source) throw new Error(`Missing support source ${id}`);
      return <span key={id}>{index > 0 ? " · " : ""}<a href={`#source-${id}`}>{source.organization}</a></span>;
    })}</p>
  ) : null;
  const dateSchema = guide.publishedAt && guide.updatedAt ? {
    "@context": "https://schema.org", "@type": "Article",
    headline: guide.title, description: guide.description, inLanguage: "ko-KR",
    mainEntityOfPage: absoluteUrl(`/health/guides/${slug}`),
    datePublished: guide.publishedAt, dateModified: guide.updatedAt,
    author: { "@type": "Person", name: "박영훈", jobTitle: "비의료인 건강정보 편집자", url: absoluteUrl("/health/trust/author") },
    publisher: { "@type": "Organization", name: "오누림", url: absoluteUrl("/") },
    isBasedOn: guide.sources.map(s => s.url),
  } : undefined;

  return (
    <article className={`onurim-trust-page${guide.seoTitle ? " onurim-support-page" : ""}`}>
      {dateSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(dateSchema) }} /> : null}
      {guide.seoTitle ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd([
        { name: "오누림", url: absoluteUrl("/") }, { name: "건강 가이드", url: absoluteUrl("/health") },
        { name: guide.title, url: absoluteUrl(`/health/guides/${slug}`) },
      ])) }} /> : null}
      <header>
        <p className="onurim-eyebrow">오누림 생활 건강 가이드</p>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        {guide.publishedAt ? <p className="onurim-state-note">작성: <Link href="/health/trust/author">박영훈 · 비의료인 건강정보 편집자</Link><br />
          발행 <time dateTime={guide.publishedAt}>{guide.publishedAt}</time> · 수정 <time dateTime={guide.updatedAt}>{guide.updatedAt}</time><br />
          <Link href="/health/trust/medical-review-policy">면허 의료인 검수 미완료</Link> · 공식 출처 대조와 의료 검수는 다릅니다.</p> : null}
      </header>
      <div className="onurim-trust-sections">
        {guide.sections.map((section) => (
          <section key={section.title} className={section.tone === "warning" ? "onurim-tone-warning" : undefined}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
            {section.table ? <HealthComparisonTable table={section.table} /> : null}
            {section.links ? <ul className="onurim-context-links">{section.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul> : null}
            {sourceLinks(section.sourceIds)}
          </section>
        ))}
      </div>
      {guide.faq?.length ? <section className="onurim-content-section">
        <h2>검사표를 보며 자주 묻는 질문</h2>
        <div className="onurim-faq-list">{guide.faq.map(item => <details key={item.question}>
          <summary>{item.question}</summary><p>{item.answer}</p>{sourceLinks(item.sourceIds)}
        </details>)}</div>
      </section> : null}
      <section className="onurim-content-section">
        <h2>확인한 공식 출처</h2>
        <ol className="onurim-source-list">
          {guide.sources.map((source) => (
            <li key={source.id} id={`source-${source.id}`}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.organization}, {source.title}</a>
              <span>확인 {source.retrievedAt}</span>
            </li>
          ))}
        </ol>
        <p className="onurim-state-note">일반 건강교육 정보 · 개인 진단·치료를 대신하지 않음 · 마지막 출처 대조 {guide.sourceCheckedAt ?? "2026-08-26"}</p>
        {guide.seoTitle ? <p><Link href="/health/trust/sources-policy">출처 선정 기준</Link> · <Link href="/health/trust/editorial-policy">편집 원칙</Link> · <Link href="/health/trust/corrections-policy">오류 제보·정정 절차</Link> · <Link href="/health">건강 가이드 전체 보기</Link></p> : null}
      </section>
    </article>
  );
}
