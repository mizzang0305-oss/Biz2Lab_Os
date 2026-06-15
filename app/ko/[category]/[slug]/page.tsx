import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { ChecklistBox } from "@/components/article/ChecklistBox";
import { FAQBox } from "@/components/article/FAQBox";
import { MarkdownRenderer } from "@/components/article/MarkdownRenderer";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { RelatedReadingBox } from "@/components/article/RelatedReadingBox";
import { SummaryBox } from "@/components/article/SummaryBox";
import { TableOfContents } from "@/components/article/TableOfContents";
import { NextStepBox } from "@/components/cta/NextStepBox";
import { TemplateCTA } from "@/components/cta/TemplateCTA";
import { categories } from "@/lib/categories";
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

function checklistForPost(title: string) {
  return [
    `${title}에 필요한 입력 자료를 먼저 한곳에 모읍니다.`,
    "금액, 날짜, 고객명처럼 틀리면 안 되는 항목은 원본과 대조합니다.",
    "AI 결과는 초안으로 두고 사람이 마지막으로 확인합니다.",
    "관련 글과 다음 단계를 연결해 후속 업무가 끊기지 않게 합니다.",
  ];
}

export default async function ArticlePage({ params }: ArticleRouteProps) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  const categoryInfo = categories[post.category];
  const relatedPosts = getRelatedPosts(post);
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
    author: { "@type": "Organization", name: "Biz2Lab" },
    publisher: { "@type": "Organization", name: "Biz2Lab" },
    mainEntityOfPage: absoluteUrl(post.route),
    inLanguage: "ko-KR",
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
    <article className="bg-white">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd(breadcrumbs.map((item) => ({ name: item.label, url: absoluteUrl(item.href) })))) }}
      />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }} />
      ) : null}

      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 sm:py-12">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mt-8 text-sm font-semibold text-teal-700">{categoryInfo.name}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl md:text-5xl">
            {post.frontmatter.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{post.frontmatter.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
            <span>게시 {post.frontmatter.publishedAt}</span>
            <span>수정 {post.frontmatter.updatedAt}</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-slate-200 bg-slate-100">
          <Image
            src={post.frontmatter.heroImage}
            alt={post.frontmatter.heroAlt}
            fill
            priority
            sizes="(min-width: 768px) 896px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-8 grid min-w-0 gap-8">
          <SummaryBox summary={post.frontmatter.description} />
          <TableOfContents headings={post.headings} />
          <MarkdownRenderer content={post.content} />
          <ChecklistBox items={checklistForPost(post.frontmatter.title)} />
          <RelatedReadingBox posts={relatedPosts} />
          <TemplateCTA label={post.frontmatter.templateCta} />
          <NextStepBox nextStep={post.frontmatter.nextStep} />
          <FAQBox faq={post.frontmatter.faq} />
        </div>
      </div>
    </article>
  );
}
