import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LivingArticle } from "@/components/living/LivingArticle";
import { getLivingPost } from "@/lib/living-posts";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getLivingPost((await params).slug);
  if (!post) notFound();
  const title = `${post.title} | 생활용품 제휴 안내`;
  return {
    title: { absolute: title },
    description: post.summary,
    authors: [],
    creator: "Biz2Lab 생활용품",
    publisher: "Biz2Lab 생활용품",
    alternates: { canonical: absoluteUrl(`/living/${post.slug}`) },
    robots: { index: false, follow: true },
    openGraph: {
      title, description: post.summary, type: "article", locale: "ko_KR",
      url: absoluteUrl(`/living/${post.slug}`), siteName: "Biz2Lab 생활용품",
      publishedTime: post.publishedAt, images: [],
    },
    twitter: { card: "summary", title, description: post.summary, images: [] },
  };
}

export default async function LivingPostPage({ params }: Props) {
  const post = getLivingPost((await params).slug);
  if (!post) notFound();
  return <LivingArticle post={post} />;
}
