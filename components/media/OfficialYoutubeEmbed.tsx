"use client";

import { Play } from "lucide-react";
import { useState } from "react";

export function OfficialYoutubeEmbed({
  videoId,
  title,
  playLabel,
}: {
  videoId: string;
  title: string;
  playLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
        title={title}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full overflow-hidden text-left"
      aria-label={playLabel}
    >
      {/* YouTube oEmbed가 제공하는 원본 썸네일을 복사하지 않고 직접 표시합니다. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white shadow-xl transition group-hover:scale-105">
          <Play className="h-5 w-5 fill-current" />
          공식 예고편 재생
        </span>
      </span>
    </button>
  );
}
