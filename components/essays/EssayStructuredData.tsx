import { knowledgeSchemas, type KnowledgeArticleSeo } from "@/lib/essays/seo";
import { jsonLd } from "@/lib/seo";
export function EssayStructuredData({ path, article }: { path: string; article?: KnowledgeArticleSeo }) {
  return <>{knowledgeSchemas(path, article).map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />)}</>;
}
