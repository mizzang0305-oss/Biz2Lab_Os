import { ArticleCard } from "@/components/cards/ArticleCard";
import type { Post } from "@/lib/posts";

export function RelatedReadingBox({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="min-w-0 max-w-full" data-testid="related-reading">
      <h2 className="text-xl font-semibold tracking-normal text-slate-950">관련 글</h2>
      <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} compact />
        ))}
      </div>
    </section>
  );
}
