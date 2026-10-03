import { PocketMoneyHome } from "@/components/pocket-money/PocketMoneyHome";
import { createPocketMetadata } from "@/lib/pocket-money/seo";

export const metadata = createPocketMetadata({
  title: "즐거운 용돈벌이",
  description: "설문, 앱테크, 재택부업과 혜택을 목록으로 살펴보세요. 할 일·보상·연령·비용·마감 조건과 공식 시작 링크를 함께 안내합니다.",
  path: "/",
});

export default function Home() {
  return <PocketMoneyHome />;
}
