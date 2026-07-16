import type { Metadata } from "next";

import { CategoryHubPage } from "@/components/layout/CategoryHubPage";
import { categories } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";

const category = categories["after-the-credits"];

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: "/ko/after-the-credits",
});

export default function AfterTheCreditsPage() {
  return (
    <CategoryHubPage
      category={category}
      posts={getPostsByCategory("after-the-credits")}
    />
  );
}
