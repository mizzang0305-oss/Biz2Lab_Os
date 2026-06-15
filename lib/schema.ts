import { z } from "zod";

export const categorySlugs = [
  "automation",
  "sales-ops",
  "small-business",
  "contracts-payments",
  "pillar",
] as const;

export const publicCategorySlugs = categorySlugs.filter(
  (category) => category !== "pillar",
) as Exclude<(typeof categorySlugs)[number], "pillar">[];

export const postTypes = [
  "pillar",
  "cluster",
  "how-to",
  "checklist",
  "case-study",
] as const;

export const postStatuses = ["draft", "published"] as const;

const yyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const nextStepSchema = z.object({
  label: z.string().min(1),
  href: z.string().startsWith("/"),
  description: z.string().min(1).optional(),
});

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  locale: z.literal("ko"),
  category: z.enum(categorySlugs),
  cluster: z.string().min(1),
  type: z.enum(postTypes),
  status: z.enum(postStatuses),
  draft: z.boolean(),
  author: z.literal("Biz2Lab"),
  publishedAt: z.string().regex(yyyyMmDd),
  updatedAt: z.string().regex(yyyyMmDd),
  tags: z.array(z.string().min(1)).min(1),
  heroImage: z.string().startsWith("/images/posts/"),
  heroAlt: z.string().min(1),
  canonical: z.string().url(),
  noindex: z.boolean(),
  relatedPosts: z.array(z.string().min(1)).min(1),
  templateCta: z.string().min(1).optional(),
  nextStep: nextStepSchema.optional(),
  faq: z.array(faqItemSchema).optional(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type PublicCategorySlug = (typeof publicCategorySlugs)[number];

