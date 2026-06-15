import type { Metadata } from "next";

import { CategoryHubPage } from "@/components/layout/CategoryHubPage";
import { categories } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";

const category = categories["contracts-payments"];

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: "/ko/contracts-payments",
});

export default function ContractsPaymentsHubPage() {
  return (
    <CategoryHubPage category={category} posts={getPostsByCategory("contracts-payments")} />
  );
}

