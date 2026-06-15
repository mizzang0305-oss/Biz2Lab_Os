import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ArticleImage } from "@/components/article/ArticleImage";
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
          img: ({ src, alt, title }) => (
            <ArticleImage
              src={typeof src === "string" ? src : ""}
              alt={typeof alt === "string" ? alt : ""}
              caption={typeof title === "string" ? title : undefined}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
