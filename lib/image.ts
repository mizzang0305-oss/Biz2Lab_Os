export const imageWidths = [1200, 800, 400] as const;

export function isLocalPostImage(src: string) {
  return src.startsWith("/images/posts/") && !src.startsWith("//");
}

