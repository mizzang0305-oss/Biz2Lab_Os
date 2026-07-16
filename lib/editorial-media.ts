export type EditorialMediaAsset = {
  id: string;
  kind: "key-art" | "still";
  src: string;
  alt: string;
  caption: string;
  rightsHolder: string;
  usageBasis: string;
  sourcePageUrl: string;
  sourceAssetUrl: string;
  checkedAt: string;
};

export type EditorialMediaSet = {
  title: string;
  note: string;
  assets: EditorialMediaAsset[];
};

const mediaBySlug = {
  "inside-out-2-emotions-interpretation": {
    title: "공식 포스터와 장면 스틸",
    note:
      "아래 이미지는 Disney UK Press가 편집 용도로 제공한 공식 보도 자료입니다. 작품 해설을 돕는 범위에서만 사용하며 출처와 권리 정보를 함께 표시합니다.",
    assets: [
      {
        id: "inside-out-2-key-art",
        kind: "key-art",
        src: "/images/editorial/inside-out-2/key-art.webp",
        alt: "기쁨, 슬픔, 불안, 당황, 부럽 등 인사이드 아웃 2의 감정 캐릭터가 모인 공식 키아트",
        caption: "《인사이드 아웃 2》 공식 키아트. © Disney. Editorial use only.",
        rightsHolder: "Disney",
        usageBasis: "Disney UK Press: Editorial use only",
        sourcePageUrl: "https://press.disney.co.uk/gallery/inside-out-2-logo-and-key-art",
        sourceAssetUrl:
          "https://lumiere-a.akamaihd.net/v1/images/d6e25f1bb223e6ebc7d5ac549d68196f_3276x4096_1abc0b5c.jpeg",
        checkedAt: "2026-07-17",
      },
      {
        id: "inside-out-2-joy-sadness",
        kind: "still",
        src: "/images/editorial/inside-out-2/joy-and-sadness.webp",
        alt: "기쁨과 슬픔이 새로운 기억 저장 공간을 함께 바라보는 인사이드 아웃 2 공식 장면",
        caption: "기쁨과 슬픔이 기억 저장 공간을 바라보는 장면. © Disney. Editorial use only.",
        rightsHolder: "Disney",
        usageBasis: "Disney UK Press: Editorial use only",
        sourcePageUrl: "https://press.disney.co.uk/gallery/inside-out-2",
        sourceAssetUrl:
          "https://lumiere-a.akamaihd.net/v1/images/6b0ca2988384d3209b65931200a76327_4096x1715_bea983ea.jpeg?region=524%2C0%2C3048%2C1715",
        checkedAt: "2026-07-17",
      },
      {
        id: "inside-out-2-all-emotions",
        kind: "still",
        src: "/images/editorial/inside-out-2/all-emotions.webp",
        alt: "기쁨과 기존 감정들이 새로 등장한 당황을 바라보는 인사이드 아웃 2 공식 장면",
        caption: "기존 감정들이 새 감정 ‘당황’을 처음 마주하는 장면. © Disney. Editorial use only.",
        rightsHolder: "Disney",
        usageBasis: "Disney UK Press: Editorial use only",
        sourcePageUrl: "https://press.disney.co.uk/gallery/inside-out-2",
        sourceAssetUrl:
          "https://lumiere-a.akamaihd.net/v1/images/ee494e120fccf899f51ff0b5aaf629e4_4096x1713_10e18869.jpeg?region=525%2C0%2C3046%2C1713",
        checkedAt: "2026-07-17",
      },
    ],
  },
} as const satisfies Record<string, EditorialMediaSet>;

export function getEditorialMedia(slug: string): EditorialMediaSet | null {
  return mediaBySlug[slug as keyof typeof mediaBySlug] ?? null;
}

export function getEditorialMediaEntries(): [string, EditorialMediaSet][] {
  return Object.entries(mediaBySlug);
}
