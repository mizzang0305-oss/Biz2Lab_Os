import { z } from "zod";

export const affiliateDisclosure =
  "이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";

const copy = z.string().trim().min(1).refine(
  (value) => !/placeholder|TODO|TBD|샘플 상품|임시 상품|입력 대기|비공개 레이아웃 검증|\[상품|\[링크/i.test(value),
  "Unfinished copy must not be published",
);
const httpsUrl = z.string().url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "https:" && !url.username && !url.password && !/\s/.test(value);
}, "An unmodified HTTPS URL is required");

export const livingPostSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: copy.max(100),
  summary: copy.max(240),
  productName: copy.max(160),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
    (value) => !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value,
  ),
  // Preserve the supplied URL byte-for-byte: no query additions or redirect service.
  affiliateUrl: httpsUrl.refine((value) => {
    const url = new URL(value);
    return url.hostname === "link.coupang.com" && !url.port && /^\/(a|re)\/[^/]+/.test(url.pathname);
  }, "Supply the owner's original Coupang Partners link"),
  facts: z.array(z.object({ text: copy, sourceUrl: httpsUrl }).strict()).min(1),
  selectionTips: z.array(copy).min(1),
  limitations: z.array(copy).min(1),
  ownerConfirmedPartnersLink: z.literal(true),
  // Human review covers everyday goods, evidence, rights, and absence of medical claims/fake reviews.
  editorialReviewComplete: z.literal(true),
  publicationApproved: z.literal(true),
}).strict();

export type LivingPost = z.infer<typeof livingPostSchema>;

// Facts and the original link were returned by the owner's authenticated Partners API.
// Search observed 2026-10-01T12:46:04.327Z; deeplink observed 12:50:26.942Z.
const approvedRecords: unknown[] = [{
  slug: "a4-file-hospital-paperwork",
  title: "병원 서류를 날짜순으로 정리할 때 확인할 A4 파일 기준",
  summary: "검사 결과지, 진료 안내문, 영수증을 종류와 날짜로 나누어 보관하는 방법과 A4 파일을 고를 때 확인할 항목을 정리했습니다.",
  productName: "신라Pick A4 클리어화일 20매 1p 종이케이스",
  publishedAt: "2026-10-01",
  affiliateUrl: "https://link.coupang.com/re/AFFSDP?lptag=AF8944306&pageKey=9752776957&itemId=29202819841&vendorItemId=96123089106&traceid=V0-183-415d8e4bb0806590",
  facts: [{
    text: "쿠팡 파트너스 상품 조회에서 확인한 상품명에는 A4, 20매, 1p가 표시되어 있습니다. 옵션과 구성은 주문할 판매 페이지에서 다시 확인하세요.",
    sourceUrl: "https://www.coupang.com/vp/products/9752776957?itemId=29202819841&vendorItemId=96123089106",
  }, {
    text: "2026년 10월 1일 오후 9시 46분(한국 시간) API 조회 당시 상품가는 2,670원이었고 무료배송 표시는 없었습니다. 배송비를 포함한 결제 총액은 확인하지 않았으며, 가격은 바뀔 수 있습니다.",
    sourceUrl: "https://www.coupang.com/vp/products/9752776957?itemId=29202819841&vendorItemId=96123089106",
  }],
  selectionTips: [
    "먼저 서류를 검사 결과지, 진료 안내문, 영수증 등으로 나누고 실제 분량을 세어 보세요. 가지고 있는 파일에 충분히 들어간다면 새로 살 필요는 없습니다.",
    "한 사람의 서류를 한 파일에 모으거나 구분지로 나누면 찾기 쉽습니다. 가족 서류는 당사자 동의를 확인하고 서로 섞이지 않게 구분하세요.",
    "각 종류 안에서는 날짜순으로 정리하고, 첫 장에 서류 종류와 날짜를 적은 목록을 별도로 만들어 두세요. 정리 순서는 검사 수치의 의미나 진단을 대신하지 않습니다.",
    "상품명의 ‘20매’를 종이 40장 수납 보장으로 해석하지 마세요. 실제 포켓 수와 두꺼운 서류의 수납 여유는 판매 정보에서 확인하고 한 포켓에 무리하게 넣지 마세요.",
    "날짜나 분류 표시는 별도 구분지에 적으세요. 원본의 내용을 가리거나 서류를 자르지 않아야 나중에 다시 확인할 수 있습니다.",
    "겉면에는 ‘서류 보관’처럼 일반적인 이름만 쓰고 이름·주민등록번호·진단명이 밖에서 보이지 않게 보관하세요. 일반 파일은 개인정보 보호 기능을 보장하지 않습니다.",
    "구매 전 A4 규격, 선택 옵션, 수량, 포켓 구성, 배송비를 함께 확인하세요. 현재 판매 조건과 보관할 서류 분량이 맞는지 비교한 뒤 결정하세요.",
  ],
  limitations: [
    "이 제품을 직접 사용해 본 후기가 아닙니다. 내구성, 펼침 정도, 실제 수납량은 시험하지 않았습니다.",
    "종이케이스라는 상품명 외에 재질의 세부 사양, 방수 성능, 포함된 구분지나 색상은 확인하지 않았습니다.",
    "서류 정리를 위한 일반 생활용품입니다. 질병의 예방·치료 또는 건강 개선 효과를 주장하지 않습니다.",
    "위 정리 방법은 다른 적절한 파일에도 적용할 수 있습니다. 이 상품만 필요한 방법이 아닙니다.",
  ],
  ownerConfirmedPartnersLink: true,
  editorialReviewComplete: true,
  publicationApproved: true,
}];

export function validateLivingPosts(records: unknown[]): LivingPost[] {
  const posts = z.array(livingPostSchema).parse(records);
  if (new Set(posts.map((post) => post.slug)).size !== posts.length) {
    throw new Error("Duplicate living post slug");
  }
  return posts;
}

export const livingPosts = validateLivingPosts(approvedRecords);

export function getLivingPost(slug: string) {
  return livingPosts.find((post) => post.slug === slug);
}
