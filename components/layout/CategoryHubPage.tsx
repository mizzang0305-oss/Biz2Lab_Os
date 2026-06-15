import Link from "next/link";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { categoryList, type Category } from "@/lib/categories";
import type { Post } from "@/lib/posts";

export function CategoryHubPage({ category, posts }: { category: Category; posts: Post[] }) {
  const pillar = posts.find((post) => post.frontmatter.type === "pillar") ?? posts[0];
  const clusters = posts.filter((post) => post.slug !== pillar?.slug);
  const otherHubs = categoryList.filter((item) => item.slug !== category.slug);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
          <p className="text-sm font-semibold text-teal-700">{category.name}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl">
            {category.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {category.hubIntro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-normal text-slate-950">
              {category.pillarIdea}
            </h2>
            <div className="mt-5">{pillar ? <ArticleCard post={pillar} /> : null}</div>
          </div>
          <aside className="min-w-0 rounded-md border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-xl font-bold tracking-normal text-slate-950">어디서 시작할까</h2>
            <p className="mt-3 leading-7 text-slate-700">{category.startGuide}</p>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5">
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">클러스터 글</h2>
          <div className="mt-6 grid min-w-0 gap-5 md:grid-cols-2">
            {clusters.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5">
        <h2 className="text-2xl font-bold tracking-normal text-slate-950">관련 허브</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {otherHubs.map((hub) => (
            <Link
              key={hub.slug}
              href={`/ko/${hub.slug}`}
              className="max-w-full rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold leading-6 text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
            >
              {hub.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
