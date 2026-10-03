import {PocketMoneyHome} from "@/components/pocket-money/PocketMoneyHome";
import {createPocketMetadata} from "@/lib/pocket-money/seo";
export const metadata=createPocketMetadata({title:"즐거운 용돈벌이",description:"가입 전에 나이·비용·지급 조건부터 확인하는 모바일 안내.",path:"/pocket-money"});
export default function PocketMoneyPage(){return <PocketMoneyHome/>;}

