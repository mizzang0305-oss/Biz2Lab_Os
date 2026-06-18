import {
  getArticleImageConcept,
  premiumArticleImageSlugs,
} from "@/lib/article-image-concepts";
import { isLocalPostImage } from "@/lib/image";
import type { Post } from "@/lib/posts";

export type PremiumImageStatus = "approved" | "pending" | "none";

const preferredPremiumImageSlugOrder = [
  "ai-business-automation-guide",
  "accounts-receivable-tracker",
  "electronic-contract-system-basics",
] as const;
const preferredPremiumImageSlugSet = new Set<string>(preferredPremiumImageSlugOrder);

const retainedPremiumSlugSet = new Set(premiumArticleImageSlugs);
export const approvedPremiumImageSlugs = [
  ...preferredPremiumImageSlugOrder,
  ...premiumArticleImageSlugs.filter((slug) => !preferredPremiumImageSlugSet.has(slug)),
] as readonly string[];
const approvedPremiumSlugSet = new Set(approvedPremiumImageSlugs);
const approvedPremiumImageSourceBySlug = new Map(
  approvedPremiumImageSlugs.map((slug) => [
    slug,
    `/images/posts/${slug}-hero.webp`,
  ]),
);

export const premiumCandidateLicenseStatuses = [
  "codex-image-skill-generated",
  "manually-generated-premium",
] as const;

export const premiumCandidateVisualApprovalStatuses = [
  "approved",
  "pending-user-review",
] as const;

export function getPremiumImageStatus(postSlug: string): PremiumImageStatus {
  if (approvedPremiumSlugSet.has(postSlug)) {
    return "approved";
  }

  return getArticleImageConcept(postSlug) ? "pending" : "none";
}

export function isPremiumImageForPost(postSlug: string, imageSrc: string) {
  const approvedSource = approvedPremiumImageSourceBySlug.get(postSlug);

  return (
    Boolean(approvedSource) &&
    retainedPremiumSlugSet.has(postSlug) &&
    imageSrc === approvedSource &&
    isLocalPostImage(imageSrc) &&
    getPremiumImageStatus(postSlug) === "approved"
  );
}

export function shouldRenderCardImage(post: Pick<Post, "slug" | "frontmatter">) {
  return isPremiumImageForPost(post.slug, post.frontmatter.heroImage);
}

export function shouldRenderArticleHeroImage(post: Pick<Post, "slug" | "frontmatter">) {
  return isPremiumImageForPost(post.slug, post.frontmatter.heroImage);
}
