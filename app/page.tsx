import { KnowledgeHome } from "@/components/essays/KnowledgeHome";
import { EssayStructuredData } from "@/components/essays/EssayStructuredData";
import { knowledgeMetadata } from "@/lib/essays/seo";
export const dynamic = "force-dynamic";

export const metadata = knowledgeMetadata("과학·기술·역사가 생각을 바꾸는 순간", "유물과 실험, 도구와 기록에서 시작해 과학·기술·역사가 인간의 생각과 삶을 바꾸는 과정을 읽습니다. 관찰과 추론, 생명과 모형, 기술과 책임의 질문을 원자료와 함께 따라갑니다.", "/");

export default function Home() {
  return <><EssayStructuredData path="/" /><KnowledgeHome /></>;
}
