import Image from "next/image";

import { assertLocalPostImage } from "@/lib/image";

type ArticleImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
};

export function ArticleImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  priority = false,
  className,
}: ArticleImageProps) {
  assertLocalPostImage(src);

  if (!alt.trim()) {
    throw new Error(`ArticleImage alt text is required for ${src}`);
  }

  const wrapperClassName = [
    "my-8 min-w-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={wrapperClassName}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 768px) 896px, 100vw"
        className="h-auto w-full object-cover"
      />
      {caption ? (
        <figcaption className="border-t border-slate-200 px-4 py-3 text-sm leading-6 text-slate-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
