import type { Post } from "@/lib/posts";

export function getStartHereLinks(currentPath?: string) {
  return [
    { href: "/ko/automation", label: "AI 업무 자동화" },
    { href: "/ko/sales-ops", label: "영업·매출 관리" },
    { href: "/ko/small-business", label: "소상공인 운영" },
    { href: "/ko/resources", label: "실무 자료실" },
  ].filter((link) => link.href !== currentPath);
}

export function getPostLink(post: Post) {
  return `/ko/${post.frontmatter.category}/${post.slug}`;
}

