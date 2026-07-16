import Link from "next/link";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { categoryList, type Category } from "@/lib/categories";
import type { Post } from "@/lib/posts";

const toneByCategory = {
  "what-to-watch": {
    eyebrow: "text-orange-700",
    hero: "border-orange-100 bg-[#fff8ee]",
    panel: "border-orange-200 bg-orange-50",
  },
  "after-the-credits": {
    eyebrow: "text-violet-700",
    hero: "border-violet-100 bg-[#f8f3ff]",
    panel: "border-violet-200 bg-violet-50",
  },
  "streaming-life": {
    eyebrow: "text-teal-700",
    hero: "border-teal-100 bg-[#effcf8]",
    panel: "border-teal-200 bg-teal-50",
  },
} as const;

export function CategoryHubPage({ category, posts }: { category: Category; posts: Post[] }) {
  const featured = posts[0];
  const remainingPosts = posts.slice(1);
  const otherHubs = categoryList.filter((item) => item.slug !== category.slug);
  const tone = toneByCategory[category.slug as keyof typeof toneByCategory];

  return (
    <div className="bg-[#fffdf9]">
      <section className={`border-b ${tone.hero}`}>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-18">
          <p className={`text-sm font-bold ${tone.eyebrow}`}>{category.name}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-[-0.03em] text-[#20162c] sm:text-5xl">
            {category.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#675f72]">{category.hubIntro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
          <div>
            <p className={`text-sm font-bold ${tone.eyebrow}`}>먼저 읽을 글</p>
            <h2 className="mt-2 text-2xl font-black text-[#20162c]">{category.pillarIdea}</h2>
            <div className="mt-5">{featured ? <ArticleCard post={featured} /> : null}</div>
          </div>
          <aside className={`rounded-[1.5rem] border p-6 ${tone.panel}`}>
            <p className={`text-sm font-bold ${tone.eyebrow}`}>이렇게 시작하세요</p>
            <p className="mt-4 text-lg leading-8 text-[#403848]">{category.startGuide}</p>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#eee8e2] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
          <h2 className="text-3xl font-black tracking-[-0.025em] text-[#20162c]">이 주제의 편집 노트</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5">
        <p className="text-sm font-bold text-[#675f72]">다른 방식으로 골라보기</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {otherHubs.map((hub) => (
            <Link
              key={hub.slug}
              href={`/ko/${hub.slug}`}
              className="rounded-full border border-[#ddd3e4] bg-white px-5 py-2.5 text-sm font-bold text-[#403848] transition hover:border-[#ef5b3f] hover:text-[#ef5b3f]"
            >
              {hub.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
