import { AntikytheraEssay } from "@/components/essays/AntikytheraEssay";
import { EssayStructuredData } from "@/components/essays/EssayStructuredData";
import { antikytheraEssay } from "@/lib/essays/antikythera";
import { knowledgeMetadata } from "@/lib/essays/seo";
import { RelatedReading } from "@/components/essays/RelatedReading";
export const dynamic = "force-dynamic";
export const metadata = knowledgeMetadata(antikytheraEssay.title, antikytheraEssay.description, antikytheraEssay.path);
export default function Page() { return <><EssayStructuredData path={antikytheraEssay.path} /><AntikytheraEssay /><RelatedReading slug="antikythera" /></>; }
