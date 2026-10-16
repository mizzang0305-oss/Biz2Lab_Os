import { AntikytheraEssay } from "@/components/essays/AntikytheraEssay";
import { EssayStructuredData } from "@/components/essays/EssayStructuredData";
import { antikytheraEssay } from "@/lib/essays/antikythera";
import { knowledgeMetadata } from "@/lib/essays/seo";
import { RelatedReading } from "@/components/essays/RelatedReading";
import { EssayProvenance } from "@/components/essays/EssayProvenance";
import { getSeriesEssay } from "@/lib/essays/series";
export const dynamic = "force-dynamic";
export const metadata = knowledgeMetadata(antikytheraEssay.title, antikytheraEssay.description, antikytheraEssay.path);
export default function Page() {
  const essay = getSeriesEssay("antikythera")!;
  return <><EssayStructuredData path={antikytheraEssay.path} /><AntikytheraEssay comments={<EssayProvenance sourceCheckedAt={essay.authorRecordMatches ? essay.sourceCheckedAt : null} />} /><RelatedReading slug="antikythera" /></>;
}
