import { ArrowUpRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/posts";

const cardToneByCategory = {
  "what-to-watch": "border-orange-200 bg-gradient-to-br from-white to-orange-50",
  "after-the-credits": "border-violet-200 bg-gradient-to-br from-white to-violet-50",
  "streaming-life": "border-teal-200 bg-gradient-to-br from-white to-teal-50",
} as const;

const accentToneByCategory = {
  "what-to-watch": "text-orange-700",
  "after-the-credits": "text-violet-700",
  "streaming-life": "text-teal-700",
} as const;

export function ArticleCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  const cardTone =
    cardToneByCategory[post.category as keyof typeof cardToneByCategory] ??
    "border-slate-200 bg-white";
  const accentTone =
    accentToneByCategory[post.category as keyof typeof accentToneByCategory] ??
    "text-slate-700";

  return (
    <article
      className={`group relative flex h-full min-w-0 flex-col rounded-[1.35rem] border p-5 transition hover:-translate-y-1 hover:shadow-xl ${cardTone} ${
        compact ? "sm:p-5" : "sm:p-6"
      }`}
      data-card-image="article-hero"
    >
      <div className="relative -mx-5 -mt-5 mb-5 aspect-[16/9] overflow-hidden rounded-t-[1.3rem] bg-[#f3ecf6] sm:-mx-6 sm:-mt-6">
        <Image
          src={post.frontmatter.heroImage}
          alt={post.frontmatter.heroAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-wrap items-center gap-2 text-xs font-bold ${accentTone}`}>
        <span>{post.categoryName}</span>
        <span className="text-[#a99fad]">·</span>
        <span className="inline-flex items-center gap-1 text-[#716977]">
          <Clock3 className="h-3.5 w-3.5" />
          {post.readingTime}
        </span>
        {post.frontmatter.spoilerLevel && post.frontmatter.spoilerLevel !== "none" ? (
          <>
            <span className="text-[#a99fad]">·</span>
            <span className="text-rose-600">
              {post.frontmatter.spoilerLevel === "full" ? "결말 스포일러" : "가벼운 스포일러"}
            </span>
          </>
        ) : null}
      </div>
      <h3
        className={`mt-4 font-black leading-[1.35] tracking-[-0.015em] text-[#20162c] ${
          compact ? "text-lg" : "text-xl"
        }`}
      >
        <Link href={post.route} className="after:absolute after:inset-0">
          {post.frontmatter.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-[#675f72]">
        {post.frontmatter.description}
      </p>
      <div className={`mt-5 inline-flex items-center gap-2 text-sm font-black ${accentTone}`}>
        편집 노트 읽기
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </article>
  );
}
