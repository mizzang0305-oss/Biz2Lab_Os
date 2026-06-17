import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ResponsiveTable } from "@/components/article/ResponsiveTable";
import { slugifyHeading } from "@/lib/posts";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose-biz2lab min-w-0 max-w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith("/")) {
              return (
                <Link href={href} className="font-medium text-teal-700 underline-offset-4 hover:underline">
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} rel="noopener noreferrer" target="_blank">
                {children}
              </a>
            );
          },
          img: ({ src, alt, title }) => {
            const imageSrc = typeof src === "string" ? src : "";
            const imageAlt = alt ?? "";

            if (!imageSrc.startsWith("/images/posts/")) {
              // External Markdown images are not optimized without explicit remote image policy.
              // eslint-disable-next-line @next/next/no-img-element
              return <img src={imageSrc} alt={imageAlt} title={title} />;
            }

            return (
              <span className="not-prose my-8 block min-w-0 max-w-full">
                <span className="relative block aspect-[3/2] min-w-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                  />
                </span>
                {title ? (
                  <span className="mt-3 block text-sm leading-6 text-slate-600">
                    {title}
                  </span>
                ) : null}
              </span>
            );
          },
          h2: ({ children }) => {
            const text = String(children);
            return (
              <h2 id={slugifyHeading(text)} className="scroll-mt-28">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            return (
              <h3 id={slugifyHeading(text)} className="scroll-mt-28">
                {children}
              </h3>
            );
          },
          table: ({ children, node }) => (
            <ResponsiveTable node={node}>{children}</ResponsiveTable>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
