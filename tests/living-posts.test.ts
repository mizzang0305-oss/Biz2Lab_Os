import assert from "node:assert/strict";
import test from "node:test";
import { affiliateDisclosure, getLivingPost, livingPosts, livingPostSchema, validateLivingPosts } from "../lib/living-posts";

test("no incomplete or fixture article enters the public catalog", () => {
  assert.equal(livingPosts.length, 1);
  assert.equal(livingPosts[0].productName, "신라Pick A4 클리어화일 20매 1p 종이케이스");
  assert.equal(livingPosts[0].affiliateUrl, "https://link.coupang.com/re/AFFSDP?lptag=AF8944306&pageKey=9752776957&itemId=29202819841&vendorItemId=96123089106&traceid=V0-183-415d8e4bb0806590");
  assert.deepEqual(validateLivingPosts([]), []);
  assert.equal(getLivingPost("layout-preview"), undefined);
  assert.throws(() => validateLivingPosts([{ slug: "pending" }]));
});

test("publication requires explicit owner and editorial confirmation", () => {
  for (const field of ["ownerConfirmedPartnersLink", "editorialReviewComplete", "publicationApproved"] as const) {
    assert.equal(livingPostSchema.shape[field].safeParse(false).success, false);
    assert.equal(livingPostSchema.shape[field].safeParse(undefined).success, false);
  }
});

test("affiliate URLs reject unrelated sites, insecure schemes and embedded credentials", () => {
  for (const url of ["https://example.com/product", "http://link.coupang.com/", "javascript:alert(1)", "https://link.coupang.com.evil.invalid/", "https://user:password@link.coupang.com/"]) {
    assert.equal(livingPostSchema.shape.affiliateUrl.safeParse(url).success, false);
  }
});

test("unfinished copy and invalid calendar dates fail review gate", () => {
  assert.equal(livingPostSchema.shape.title.safeParse("TODO").success, false);
  assert.equal(livingPostSchema.shape.productName.safeParse("[상품명]").success, false);
  assert.equal(livingPostSchema.shape.productName.safeParse("상품명 입력 대기").success, false);
  assert.equal(livingPostSchema.shape.title.safeParse("비공개 레이아웃 검증").success, false);
  assert.equal(livingPostSchema.shape.publishedAt.safeParse("2026-02-30").success, false);
});

test("required disclosure matches the supplied Coupang wording", () => {
  assert.equal(affiliateDisclosure, "이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.");
});
