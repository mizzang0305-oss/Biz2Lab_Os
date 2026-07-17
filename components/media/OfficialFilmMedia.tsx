import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";

import { OfficialYoutubeEmbed } from "@/components/media/OfficialYoutubeEmbed";
import type { OfficialFilmMedia } from "@/lib/official-film-media";

export function OfficialFilmCardMedia({ media }: { media: OfficialFilmMedia }) {
  if (media.kind === "image") {
    return (
      <>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <MediaBadge label={media.label} />
      </>
    );
  }

  return (
    <>
      {/* YouTube oEmbed 썸네일은 원본 호스트에서 직접 표시하며 로컬로 복제하지 않습니다. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${media.videoId}/hqdefault.jpg`}
        alt={media.title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <MediaBadge label={media.label} video />
    </>
  );
}

export function OfficialFilmArticleMedia({ media }: { media: OfficialFilmMedia }) {
  if (media.kind === "image") {
    return (
      <figure
        className="overflow-hidden rounded-[1.25rem] border border-violet-200 bg-white shadow-sm"
        data-official-film-media="image"
      >
        <div className="relative aspect-video bg-violet-950">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            preload
            sizes="(min-width: 768px) 896px, 100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs leading-5 text-[#736b78] sm:px-5">
          <span>{media.label} · © {media.rightsHolder}</span>
          <SourceLink href={media.sourcePageUrl} label="공식 출처" />
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className="overflow-hidden rounded-[1.25rem] border border-violet-200 bg-white shadow-sm"
      data-official-film-media="youtube"
    >
      <div className="relative aspect-video bg-[#20162c]">
        <OfficialYoutubeEmbed
          videoId={media.videoId}
          title={media.title}
          playLabel={`${media.label} 재생`}
        />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs leading-5 text-[#736b78] sm:px-5">
        <span>{media.label} · 영상은 YouTube에서 직접 재생됩니다.</span>
        <span className="flex flex-wrap items-center gap-3">
          <SourceLink href={media.publisherUrl} label={media.publisher} />
          <SourceLink href={media.watchUrl} label="YouTube에서 보기" />
        </span>
      </figcaption>
    </figure>
  );
}

function MediaBadge({ label, video = false }: { label: string; video?: boolean }) {
  return (
    <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#20162c]/85 px-3 py-1.5 text-[11px] font-black text-white shadow-sm backdrop-blur-sm">
      {video ? <Play className="h-3 w-3 fill-current" /> : null}
      {label}
    </span>
  );
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-bold text-violet-700 hover:underline"
    >
      {label}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}
