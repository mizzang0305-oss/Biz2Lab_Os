export type OfficialFilmImage = {
  kind: "image";
  src: string;
  alt: string;
  label: string;
  rightsHolder: string;
  usageBasis: string;
  sourcePageUrl: string;
  checkedAt: string;
};

export type OfficialFilmVideo = {
  kind: "youtube";
  videoId: string;
  title: string;
  label: string;
  publisher: string;
  publisherUrl: string;
  sourcePageUrl: string;
  watchUrl: string;
  usageBasis: string;
  checkedAt: string;
};

export type OfficialFilmMedia = OfficialFilmImage | OfficialFilmVideo;

const mediaBySlug = {
  "devil-wears-prada-ending-interpretation": {
    kind: "youtube",
    videoId: "97XCFu-4RH8",
    title: "The Devil Wears Prada | Miranda's Most Savage Moments",
    label: "20th Century Studios 공식 클립",
    publisher: "20th Century Studios",
    publisherUrl: "https://www.youtube.com/@20thCenturyStudios",
    sourcePageUrl: "https://www.20thcenturystudios.com/movies/the-devil-wears-prada",
    watchUrl: "https://www.youtube.com/watch?v=97XCFu-4RH8",
    usageBasis: "Official YouTube embed; no local copy",
    checkedAt: "2026-07-17",
  },
  "her-ai-relationship-interpretation": {
    kind: "youtube",
    videoId: "XsQqMwacZQw",
    title: "Her - Official Trailer 1 [HD]",
    label: "Warner Bros. 공식 예고편",
    publisher: "Warner Bros.",
    publisherUrl: "https://www.youtube.com/@WarnerBros",
    sourcePageUrl: "https://www.youtube.com/watch?v=XsQqMwacZQw",
    watchUrl: "https://www.youtube.com/watch?v=XsQqMwacZQw",
    usageBasis: "Official YouTube embed; no local copy",
    checkedAt: "2026-07-17",
  },
  "inside-out-2-emotions-interpretation": {
    kind: "image",
    src: "/images/editorial/inside-out-2/all-emotions.webp",
    alt: "기존 감정들과 새 감정들이 감정 본부에서 마주한 인사이드 아웃 2 공식 장면",
    label: "Disney 공식 장면 스틸",
    rightsHolder: "Disney",
    usageBasis: "Disney UK Press: Editorial use only",
    sourcePageUrl: "https://press.disney.co.uk/gallery/inside-out-2",
    checkedAt: "2026-07-17",
  },
  "inside-out-emotion-interpretation": {
    kind: "youtube",
    videoId: "yRUAzGQ3nSY",
    title: "Inside Out - Official US Trailer",
    label: "Pixar 공식 예고편",
    publisher: "Pixar",
    publisherUrl: "https://www.youtube.com/@pixar",
    sourcePageUrl: "https://www.pixar.com/inside-out",
    watchUrl: "https://www.youtube.com/watch?v=yRUAzGQ3nSY",
    usageBasis: "Official YouTube embed; no local copy",
    checkedAt: "2026-07-17",
  },
  "lalaland-ending-interpretation": {
    kind: "youtube",
    videoId: "0pdqf4P9MB8",
    title: "La La Land (2016 Movie) Official Trailer - Dreamers",
    label: "Lionsgate 공식 예고편",
    publisher: "Lionsgate Movies",
    publisherUrl: "https://www.youtube.com/@LionsgateMovies",
    sourcePageUrl: "https://www.lionsgate.com/movies/la-la-land",
    watchUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    usageBasis: "Official YouTube embed; no local copy",
    checkedAt: "2026-07-17",
  },
  "parasite-ending-interpretation": {
    kind: "youtube",
    videoId: "hb1iOVvkykY",
    title: "PARASITE Official Int'l Main Trailer",
    label: "CJ ENM 공식 예고편",
    publisher: "CJ ENM",
    publisherUrl: "https://www.youtube.com/@CJENMMOVIE",
    sourcePageUrl: "https://www.youtube.com/watch?v=hb1iOVvkykY",
    watchUrl: "https://www.youtube.com/watch?v=hb1iOVvkykY",
    usageBasis: "Official YouTube embed; no local copy",
    checkedAt: "2026-07-17",
  },
  "the-intern-work-and-age-interpretation": {
    kind: "youtube",
    videoId: "ZU3Xban0Y6A",
    title: "The Intern - Official Trailer [HD]",
    label: "Warner Bros. 공식 예고편",
    publisher: "Warner Bros.",
    publisherUrl: "https://www.youtube.com/@WarnerBros",
    sourcePageUrl: "https://www.youtube.com/watch?v=ZU3Xban0Y6A",
    watchUrl: "https://www.youtube.com/watch?v=ZU3Xban0Y6A",
    usageBasis: "Official YouTube embed; no local copy",
    checkedAt: "2026-07-17",
  },
  "truman-show-ending-interpretation": {
    kind: "youtube",
    videoId: "dlnmQbPGuls",
    title: "The Truman Show (1998) Trailer #1",
    label: "배급 예고편 영상",
    publisher: "Rotten Tomatoes Classic Trailers",
    publisherUrl: "https://www.youtube.com/@RottenTomatoesCLASSICTRAILERS",
    sourcePageUrl:
      "https://www.paramountplus.com/movies/trailer/video/Sm6NLSa3hNyroSydu5y_WYZ65UGK7x_m/",
    watchUrl: "https://www.youtube.com/watch?v=dlnmQbPGuls",
    usageBasis: "YouTube publisher embed; no local copy",
    checkedAt: "2026-07-17",
  },
} as const satisfies Record<string, OfficialFilmMedia>;

export function getOfficialFilmMedia(slug: string): OfficialFilmMedia | null {
  return mediaBySlug[slug as keyof typeof mediaBySlug] ?? null;
}

export function getOfficialFilmMediaEntries(): [string, OfficialFilmMedia][] {
  return Object.entries(mediaBySlug);
}
