import type { Metadata } from "next";

import { CategoryHubPage } from "@/components/layout/CategoryHubPage";
import { categories } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";

const category = categories["streaming-life"];

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: "/ko/streaming-life",
});

export default function StreamingLifePage() {
  return (
    <CategoryHubPage
      category={category}
      posts={getPostsByCategory("streaming-life")}
    />
  );
}
