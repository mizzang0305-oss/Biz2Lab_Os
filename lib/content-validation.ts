import type { PublicCategorySlug } from "@/lib/schema";

export type ContentIndexRow = {
  slug?: string;
  route?: string;
  category?: string;
  heroImage?: string;
  heroAlt?: string;
  title?: string;
};

export type PublicPostValidationRecord = {
  slug: string;
  route: string;
  category: PublicCategorySlug | string;
  frontmatter: {
    locale: string;
    status: string;
    draft: boolean;
    noindex?: boolean;
    heroImage: string;
    heroAlt: string;
    title?: string;
  };
};

export type PublishedPostSummary = {
  total: number;
  categoryCounts: Record<string, number>;
};

export function isCountedPublishedPost(post: PublicPostValidationRecord) {
  return (
    post.frontmatter.locale === "ko" &&
    post.frontmatter.status === "published" &&
    post.frontmatter.draft === false &&
    post.frontmatter.noindex !== true
  );
}

export function getCountedPublishedPosts(posts: PublicPostValidationRecord[]) {
  return posts.filter(isCountedPublishedPost);
}

export function summarizePublishedPosts(posts: PublicPostValidationRecord[]): PublishedPostSummary {
  const countedPosts = getCountedPublishedPosts(posts);
  const categoryCounts: Record<string, number> = {};

  for (const post of countedPosts) {
    categoryCounts[post.category] = (categoryCounts[post.category] ?? 0) + 1;
  }

  return {
    total: countedPosts.length,
    categoryCounts,
  };
}

function duplicatedValues(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return [...duplicates];
}

export function validatePublishedPostInventory({
  posts,
  contentIndexRows,
  publicFileExists,
}: {
  posts: PublicPostValidationRecord[];
  contentIndexRows: ContentIndexRow[];
  publicFileExists: (src: string) => boolean;
}) {
  const errors: string[] = [];
  const countedPosts = getCountedPublishedPosts(posts);
  const postSlugs = countedPosts.map((post) => post.slug);
  const indexSlugs = contentIndexRows.map((row) => row.slug).filter((slug): slug is string => Boolean(slug));
  const postsBySlug = new Map(countedPosts.map((post) => [post.slug, post]));
  const indexRowsBySlug = new Map<string, ContentIndexRow>();

  for (const duplicate of duplicatedValues(postSlugs)) {
    errors.push(`${duplicate}: duplicate published markdown slug`);
  }

  for (const row of contentIndexRows) {
    if (!row.slug) {
      errors.push("content-index entry is missing slug");
      continue;
    }
    if (indexRowsBySlug.has(row.slug)) {
      errors.push(`${row.slug}: duplicate content-index entry`);
    }
    indexRowsBySlug.set(row.slug, row);
  }

  for (const duplicate of duplicatedValues(indexSlugs)) {
    errors.push(`${duplicate}: duplicate content-index slug`);
  }

  for (const post of countedPosts) {
    const row = indexRowsBySlug.get(post.slug);
    if (!row) {
      errors.push(`${post.slug}: missing content-index entry`);
      continue;
    }

    if (row.route !== post.route) {
      errors.push(`${post.slug}: content-index route must be ${post.route}`);
    }
    if (row.category !== post.category) {
      errors.push(`${post.slug}: content-index category must be ${post.category}`);
    }
    if (row.heroImage !== post.frontmatter.heroImage) {
      errors.push(`${post.slug}: content-index heroImage must match frontmatter`);
    }
    if (row.heroAlt !== post.frontmatter.heroAlt) {
      errors.push(`${post.slug}: content-index heroAlt must match frontmatter`);
    }
    if (!post.frontmatter.heroImage || !publicFileExists(post.frontmatter.heroImage)) {
      errors.push(`${post.slug}: missing hero image ${post.frontmatter.heroImage}`);
    }
  }

  for (const row of contentIndexRows) {
    if (row.slug && !postsBySlug.has(row.slug)) {
      errors.push(`${row.slug}: content-index entry has no counted published markdown post`);
    }
  }

  return errors;
}
