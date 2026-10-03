import { PocketMoneyHome } from "@/components/pocket-money/PocketMoneyHome";
import { createPocketMetadata } from "@/lib/pocket-money/seo";

export const metadata = createPocketMetadata({
  title: "즐거운 용돈벌이",
  description: "가입하기 전에 나이·비용·지급 조건부터 확인하세요. 확인한 화면과 공식 안내로 차근차근 읽어요.",
  path: "/",
});

export default function Home() {
  return <PocketMoneyHome />;
}
