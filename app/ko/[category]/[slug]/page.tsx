import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { EditorialEvidenceBox } from "@/components/article/EditorialEvidenceBox";
import { EditorialMediaGallery } from "@/components/article/EditorialMediaGallery";
import { FAQBox } from "@/components/article/FAQBox";
import { MarkdownRenderer } from "@/components/article/MarkdownRenderer";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { RelatedReadingBox } from "@/components/article/RelatedReadingBox";
import { TableOfContents } from "@/components/article/TableOfContents";
import { NextStepBox } from "@/components/cta/NextStepBox";
import { categories } from "@/lib/categories";
import { editorialIdentity, getEditorialEvidence } from "@/lib/editorial-evidence";
import { getEditorialMedia } from "@/lib/editorial-media";
import { shouldRenderArticleHeroImage } from "@/lib/images/premium-image-policy";
import { getPostBySlug, getPublicPosts, getRelatedPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, createMetadata, jsonLd } from "@/lib/seo";

type ArticleRouteProps = {
  params: Promise<{ category: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublicPosts().map((post) => ({
    category: post.frontmatter.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);

  if (!post) {
    return {};
  }

  return createMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: post.route,
    noindex: post.frontmatter.noindex,
    type: "article",
    image: post.frontmatter.heroImage,
  });
}

export default async function ArticlePage({ params }: ArticleRouteProps) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  const categoryInfo = categories[post.category];
  const relatedPosts = getRelatedPosts(post);
  const editorialEvidence = getEditorialEvidence(post.slug);
  const editorialMedia = getEditorialMedia(post.slug);
  const renderHeroImage = shouldRenderArticleHeroImage(post);
  const breadcrumbs = [
    { label: categoryInfo.name, href: `/ko/${categoryInfo.slug}` },
    { label: post.frontmatter.title, href: post.route },
  ];
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: absoluteUrl(post.frontmatter.heroImage),
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.updatedAt,
    author: {
      "@type": "Organization",
      name: editorialIdentity.authorName,
      url: absoluteUrl(editorialIdentity.authorUrl),
      sameAs: editorialIdentity.operatorUrl,
    },
    publisher: { "@type": "Organization", name: "Biz2Lab PLAY", url: absoluteUrl("/ko") },
    mainEntityOfPage: absoluteUrl(post.route),
    inLanguage: "ko-KR",
    isAccessibleForFree: true,
  };
  const faqJsonLd = post.frontmatter.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.frontmatter.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <article className="bg-[#fffdf9]">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd(breadcrumbs.map((item) => ({ name: item.label, url: absoluteUrl(item.href) })))) }}
      />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }} />
      ) : null}

      <header className="border-b border-orange-100 bg-[#fff8ee]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-14">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-7 flex flex-wrap items-center gap-2 text-sm font-bold">
            <span className="text-[#ef5b3f]">{categoryInfo.name}</span>
            {post.frontmatter.spoilerLevel ? (
              <span className="rounded-full border border-rose-200 bg-white px-2.5 py-1 text-xs text-rose-600">
                {post.frontmatter.spoilerLevel === "full"
                  ? "결말 스포일러 포함"
                  : post.frontmatter.spoilerLevel === "light"
                    ? "가벼운 스포일러"
                    : "스포일러 없음"}
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 text-4xl font-black leading-[1.15] tracking-[-0.03em] text-[#20162c] sm:text-5xl">
            {post.frontmatter.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#675f72]">{post.frontmatter.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#817687]">
            <Link className="font-bold text-[#d6422d] hover:underline" href="/ko/about">
              작성·검토: {editorialIdentity.authorName}
            </Link>
            <span>게시 {post.frontmatter.publishedAt}</span>
            <span>수정 {post.frontmatter.updatedAt}</span>
            <span>{post.readingTime}</span>
          </div>
          {post.frontmatter.audience?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.frontmatter.audience.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-bold text-[#5f5666]"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-5 sm:py-10">
        {renderHeroImage ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-slate-200 bg-slate-100">
            <Image
              src={post.frontmatter.heroImage}
              alt={post.frontmatter.heroAlt}
              fill
              preload
              sizes="(min-width: 768px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className={`mx-auto grid max-w-3xl min-w-0 gap-7 ${renderHeroImage ? "mt-8" : ""}`}>
          {post.frontmatter.editorNote ? (
            <section className="rounded-[1.25rem] border border-orange-200 bg-orange-50 p-5">
              <p className="text-sm font-black text-[#d6422d]">편집자의 한마디</p>
              <p className="mt-2 text-lg leading-8 text-[#403848]">{post.frontmatter.editorNote}</p>
            </section>
          ) : null}
          {editorialMedia ? <EditorialMediaGallery media={editorialMedia} /> : null}
          <EditorialEvidenceBox
            evidence={editorialEvidence}
            updatedAt={post.frontmatter.updatedAt}
          />
          <TableOfContents headings={post.headings} />
          <MarkdownRenderer content={post.content} />
          <FAQBox faq={post.frontmatter.faq} />
          <RelatedReadingBox posts={relatedPosts} />
          <NextStepBox nextStep={post.frontmatter.nextStep} />
        </div>
      </div>
    </article>
  );
}
