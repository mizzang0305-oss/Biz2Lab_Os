export const imageWidths = [1200, 800, 400] as const;

const postImagePattern = /^\/images\/posts\/[a-z0-9][a-z0-9-]*\.webp$/;
const forbiddenImagePathSegments = [
  "/amazon",
  "/products",
  "/shop",
  "/affiliate",
] as const;

export function isLocalPostImage(src: string) {
  return (
    postImagePattern.test(src) &&
    !src.startsWith("//") &&
    !src.includes("..") &&
    !src.includes("?") &&
    !src.includes("#") &&
    !/^https?:\/\//i.test(src) &&
    forbiddenImagePathSegments.every((segment) => !src.includes(segment))
  );
}

export function assertLocalPostImage(src: string) {
  if (!isLocalPostImage(src)) {
    throw new Error(`Unsafe post image path: ${src}`);
  }
}

export function publicImagePath(src: string) {
  return src.replace(/^\//, "");
}
