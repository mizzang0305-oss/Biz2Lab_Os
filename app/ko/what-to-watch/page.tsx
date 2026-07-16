import type { Metadata } from "next";

import { CategoryHubPage } from "@/components/layout/CategoryHubPage";
import { categories } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";

const category = categories["what-to-watch"];

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: "/ko/what-to-watch",
});

export default function WhatToWatchPage() {
  return (
    <CategoryHubPage
      category={category}
      posts={getPostsByCategory("what-to-watch")}
    />
  );
}
