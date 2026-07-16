import { z } from "zod";

export const publicCategorySlugs = [
  "what-to-watch",
  "after-the-credits",
  "streaming-life",
] as const;

export const categorySlugs = [
  ...publicCategorySlugs,
  "automation",
  "sales-ops",
  "small-business",
  "contracts-payments",
  "pillar",
] as const;

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
  heroImage: z.union([
    z.string().startsWith("/images/posts/"),
    z.literal("/opengraph-image"),
  ]),
  heroAlt: z.string().min(1),
  canonical: z.string().url(),
  noindex: z.boolean(),
  relatedPosts: z.array(z.string().min(1)).min(1),
  editorNote: z.string().min(1).optional(),
  spoilerLevel: z.enum(["none", "light", "full"]).optional(),
  audience: z.array(z.string().min(1)).min(1).optional(),
  templateCta: z.string().min(1).optional(),
  nextStep: nextStepSchema.optional(),
  faq: z.array(faqItemSchema).optional(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type CategorySlug = (typeof categorySlugs)[number];
export type PublicCategorySlug = (typeof publicCategorySlugs)[number];

