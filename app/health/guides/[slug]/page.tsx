import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getHealthSupportGuide, healthSupportGuides } from "@/lib/health-v3/support-guides";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return healthSupportGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getHealthSupportGuide(slug);
  return guide ? createMetadata({ title: guide.title, description: guide.description, path: `/health/guides/${slug}`, type: "article" }) : {};
}

export default async function HealthSupportGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getHealthSupportGuide(slug);
  if (!guide) notFound();

  return (
    <article className="onurim-trust-page">
      <header>
        <p className="onurim-eyebrow">오누림 생활 건강 가이드</p>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
      </header>
      <div className="onurim-trust-sections">
        {guide.sections.map((section) => (
          <section key={section.title} className={section.tone === "warning" ? "onurim-tone-warning" : undefined}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
          </section>
        ))}
      </div>
      <section className="onurim-content-section">
        <h2>확인한 공식 출처</h2>
        <ol className="onurim-source-list">
          {guide.sources.map((source) => (
            <li key={source.id}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.organization}, {source.title}</a>
              <span>확인 {source.retrievedAt}</span>
            </li>
          ))}
        </ol>
        <p className="onurim-state-note">일반 건강교육 정보 · 개인 진단·치료를 대신하지 않음 · 마지막 출처 대조 2026-08-26</p>
      </section>
    </article>
  );
}
