import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/posts";

export function ArticleCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  const headingClassName = compact
    ? "mt-2 text-base font-semibold leading-7 tracking-normal text-slate-950"
    : "mt-2 text-lg font-semibold leading-7 tracking-normal text-slate-950";

  return (
    <article className="group relative min-w-0 max-w-full overflow-hidden rounded-md border border-slate-200 bg-white transition hover:border-teal-300 hover:shadow-sm">
      {!compact ? (
        <div className="relative aspect-[16/9] bg-slate-100">
          <Image
            src={post.frontmatter.heroImage}
            alt={post.frontmatter.heroAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className={compact ? "min-w-0 p-4" : "min-w-0 p-5"}>
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium leading-5 text-teal-700">
          <span>{post.categoryName}</span>
          <span aria-hidden="true" className="text-slate-300">
            /
          </span>
          <span className="text-slate-500">{post.readingTime}</span>
        </div>
        <h3 className={headingClassName}>
          <Link href={post.route} className="after:absolute after:inset-0">
            {post.frontmatter.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {post.frontmatter.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700 group-hover:text-teal-700">
          읽기 <ArrowRight className="h-4 w-4 shrink-0" />
        </div>
      </div>
    </article>
  );
}
