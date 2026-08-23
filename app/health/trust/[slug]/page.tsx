import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTrustPage, trustPages } from "@/lib/health-v3/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return trustPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getTrustPage(slug);
  return page ? { title: { absolute: `${page.title} | 오누림 Preview` }, description: page.intro } : {};
}

export default async function TrustPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getTrustPage(slug);
  if (!page) notFound();

  return (
    <article className="onurim-trust-page">
      <header><p className="onurim-eyebrow">오누림 신뢰 정책 · Preview</p><h1>{page.title}</h1><p>{page.intro}</p></header>
      <div className="onurim-trust-sections">
        {page.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
      </div>
      <footer><p>상태: PREVIEW_ONLY · 운영: Biz2Lab · Production 공개 차단</p></footer>
    </article>
  );
}
