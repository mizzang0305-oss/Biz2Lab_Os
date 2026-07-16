import { ExternalLink } from "lucide-react";
import Image from "next/image";

import type { EditorialMediaSet } from "@/lib/editorial-media";

export function EditorialMediaGallery({ media }: { media: EditorialMediaSet }) {
  const keyArt = media.assets.find((asset) => asset.kind === "key-art");
  const stills = media.assets.filter((asset) => asset.kind === "still");

  return (
    <section className="not-prose overflow-hidden rounded-[1.5rem] border border-violet-200 bg-white shadow-sm">
      <div className="border-b border-violet-100 bg-violet-50 px-5 py-5 sm:px-6">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">Official media</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#20162c]">{media.title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#675f72]">{media.note}</p>
      </div>

      {keyArt ? (
        <div className="grid gap-0 lg:grid-cols-[minmax(240px,0.72fr)_1.28fr]">
          <figure className="border-b border-violet-100 bg-[#20162c] p-5 lg:border-b-0 lg:border-r">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl">
              <Image
                src={keyArt.src}
                alt={keyArt.alt}
                fill
                sizes="(min-width: 1024px) 360px, 82vw"
                className="object-cover"
              />
            </div>
            <MediaCaption asset={keyArt} />
          </figure>

          <div className="grid content-start gap-0">
            {stills.map((asset) => (
              <figure key={asset.id} className="border-b border-violet-100 p-5 last:border-b-0 sm:p-6">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-violet-950">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    sizes="(min-width: 1024px) 620px, 92vw"
                    className="object-cover"
                  />
                </div>
                <MediaCaption asset={asset} />
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function MediaCaption({ asset }: { asset: EditorialMediaSet["assets"][number] }) {
  return (
    <figcaption className="mt-3 text-xs leading-5 text-[#736b78]">
      <span className="block">{asset.caption}</span>
      <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>권리자: {asset.rightsHolder}</span>
        <span>확인: {asset.checkedAt}</span>
        <a
          href={asset.sourcePageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-violet-700 hover:underline"
        >
          공식 출처
          <ExternalLink className="h-3 w-3" />
        </a>
      </span>
    </figcaption>
  );
}
