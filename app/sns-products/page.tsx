import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "SNS 선물 메모 | Biz2Lab" },
  description: "11/11 선물과 11/19 수능 응원 선물 후보. 차 세트, 텀블러와 보온도시락의 모델·옵션을 확인하세요. 쿠팡 파트너스 광고가 포함되어 있습니다.",
  alternates: { canonical: "https://www.biz2lab.com/sns-products" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "SNS 선물 메모 | Biz2Lab",
    description: "차 한 상자, 텀블러, 보온도시락. 모델과 구성을 정리한 선물 메모입니다. 쿠팡 파트너스 광고 포함.",
    url: "https://www.biz2lab.com/sns-products",
    type: "website",
  },
};

const products = [
  {
    id: "herb-garden",
    name: "오설록 티 에디션 허브가든",
    model: "허브가든 6종 × 4입",
    option: "피라미드 티백 · 1세트 · 총 24입",
    occasion: "11/11 선물 후보",
    description: "한 상자에서 서로 다른 차를 골라 마실 수 있는 구성입니다.",
    features: ["차 6종을 4입씩 담은 총 24입 구성입니다.", "제조사 표기상 무카페인 구성입니다."],
    url: "https://link.coupang.com/a/h46gxgapB6",
  },
  {
    id: "daily-tumbler",
    name: "써모스 올뉴 데일리 원터치 텀블러",
    model: "JNL-S350K-PK",
    option: "핑크 · 350ml · 1개",
    occasion: "11/19 수능 응원 선물 후보",
    description: "가방에 넣을 텀블러를 찾는다면 용량과 색상부터 살펴보세요.",
    features: ["350ml 용량의 원터치 텀블러입니다.", "선택 옵션은 JNL-S350K-PK 핑크입니다."],
    url: "https://link.coupang.com/a/h46nILxxqS",
  },
  {
    id: "lunch-peach",
    name: "써모스 보온도시락",
    model: "TKLF-1200F",
    option: "피치핑크 · 1개",
    occasion: "11/19 수능 응원 선물 후보",
    description: "도시락을 챙기는 사람에게 줄 선물 후보로 모델과 색상을 확인해 보세요.",
    features: ["TKLF-1200F 모델의 보온도시락입니다.", "선택 옵션은 피치핑크 1개입니다."],
    url: "https://link.coupang.com/a/h48ZvkRi3M",
  },
  {
    id: "lunch-cream",
    name: "써모스 보온도시락 세트",
    model: "TKLG-901",
    option: "크림 · 1세트 · 구성 합계 885ml",
    occasion: "11/19 수능 응원 선물 후보",
    description: "용기별 용량과 포함 구성을 함께 확인하고 고르세요.",
    features: ["245ml·340ml·300ml 구성으로 합계 885ml입니다.", "수저는 포함되지 않습니다."],
    url: "https://link.coupang.com/a/h488C5JQ7w",
  },
  {
    id: "island-tea",
    name: "오설록 에디션 아일랜드 티백 세트",
    model: "아일랜드 6종 18입",
    option: "티백 6종 · 1세트 · 총 18입",
    occasion: "11/11 선물 후보",
    description: "여러 종류의 차를 한 상자에 담은 선물을 살펴보세요.",
    features: ["차 6종을 담은 총 18입 세트입니다.", "전체 무카페인 세트는 아닙니다."],
    url: "https://link.coupang.com/a/h4898AeTTM",
  },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-7 sm:px-8 sm:py-12">
      <aside aria-label="제휴 광고 안내" className="mb-8 rounded-2xl border border-[#cbd4bd] bg-[#eef2e8] px-5 py-4 text-sm leading-7 text-[#293525]">
        <p className="mb-1 text-xs font-bold tracking-widest">광고 · 쿠팡 파트너스</p>
        <p>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>
      </aside>

      <header className="mb-9 max-w-2xl">
        <p className="mb-3 text-xs font-bold tracking-widest text-[#657357]">SNS GIFT NOTES</p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-[#20291d] sm:text-5xl">SNS에서 만난<br />선물 메모</h1>
        <p className="text-base leading-8 text-[#5c6357]">11/11 선물, 11/19 수능 응원 선물로 살펴볼 다섯 가지를 모았습니다. 상품명과 선택 옵션을 보고 필요한 구성을 골라 보세요.</p>
        <p className="mt-4 border-l-2 border-[#b2bea4] pl-4 text-sm leading-7 text-[#626a5b]">가격·할인·재고·배송 조건과 최신 옵션은 판매 페이지에서 확인해 주세요.</p>
      </header>

      <section aria-label="선물 후보 상품 5개" className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {products.map((product, index) => (
          <article key={product.id} id={product.id} data-product={product.id} className="flex min-w-0 flex-col rounded-3xl border border-[#e1e5d9] bg-white p-6 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold tabular-nums text-[#909984]">{String(index + 1).padStart(2, "0")}</span>
              <span className="rounded-full bg-[#f1f3eb] px-3 py-1 text-xs font-semibold text-[#566446]">{product.occasion}</span>
            </div>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-[#20291d]">{product.name}</h2>
            <dl className="mb-5 grid gap-2 text-sm leading-6">
              <div className="grid grid-cols-[3.25rem_1fr] gap-2"><dt className="text-[#77806f]">모델</dt><dd className="font-semibold text-[#3a4633]">{product.model}</dd></div>
              <div className="grid grid-cols-[3.25rem_1fr] gap-2"><dt className="text-[#77806f]">옵션</dt><dd className="text-[#3a4633]">{product.option}</dd></div>
            </dl>
            <p className="mb-4 text-base leading-8 text-[#596151]">{product.description}</p>
            <ul className="mb-7 space-y-2 text-sm leading-7 text-[#596151]">
              {product.features.map((feature) => <li key={feature} className="flex gap-2"><span aria-hidden="true" className="text-[#8c9c7a]">·</span><span>{feature}</span></li>)}
            </ul>
            <div className="mt-auto">
              <a href={product.url} target="_blank" rel="sponsored noopener noreferrer" style={{ color: "#ffffff" }} aria-label={`${product.name} ${product.option} 상품·옵션 확인, 쿠팡 새 창`} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#34462c] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#24341d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34462c]">쿠팡에서 상품·옵션 확인 <span aria-hidden="true">↗</span></a>
              <p className="mt-2 text-center text-xs text-[#7b8472]">광고 링크 · 새 창에서 판매 페이지로 이동</p>
            </div>
          </article>
        ))}
      </section>

      <section aria-label="구매 전 확인" className="mt-8 rounded-2xl bg-[#f0f2eb] px-5 py-5 text-sm leading-7 text-[#616b57] sm:px-7">
        <h2 className="mb-2 text-base font-bold text-[#34462c]">구매 전 한 번 더 확인해 주세요</h2>
        <p>상품 구성 확인 기준: 2026년 10월 23일. 판매 페이지에서 모델·색상·구성 및 최종 결제 조건을 확인해 주세요.</p>
        <p className="mt-2">수능 응원 선물 제안이며, 시험장 반입 가능 여부를 안내하는 글은 아닙니다.</p>
      </section>
    </div>
  );
}
