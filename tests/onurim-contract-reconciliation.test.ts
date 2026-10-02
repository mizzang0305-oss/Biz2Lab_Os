import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { healthArticles, healthSources } from "../lib/health-v3/content";
import { getHealthSupportGuide } from "../lib/health-v3/support-guides";
import GuidePage, { generateMetadata } from "../app/health/guides/[slug]/page";

const articles = ["hypertension", "type-2-diabetes", "allergic-rhinitis", "gastroesophageal-reflux-disease", "osteoarthritis", "osteoporosis", "kidney-stones", "migraine", "gout", "sleep-apnea", "asthma", "irritable-bowel-syndrome", "metabolic-dysfunction-associated-steatotic-liver-disease", "obesity", "acute-myocardial-infarction", "stroke", "urinary-tract-infection", "dyslipidemia"] as const;
const guides = ["understanding-hba1c", "danger-signals", "measuring-blood-pressure", "reading-health-results", "family-medication-support", "symptom-journal", "appointment-questions", "medication-list", "older-parent-health-organizer"];

function assertReferences(ids: string[], registered: ReadonlySet<string>) {
  assert.equal(new Set(ids).size, ids.length, "Duplicate source IDs are not valid provenance");
  for (const id of ids) assert.ok(registered.has(id), `Unregistered source ${id}`);
}

function assertHttps(href: string) {
  assert.equal(new URL(href).protocol, "https:");
}

function assertReaderOutput(html: string, title: string, description: string, modified: string | undefined) {
  const plain = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");
  assert.match(plain, /면허 의료인의 검수를 받지 않았습니다|면허 의료인 검수 미완료/);
  // The approved MASLD image caption explicitly denies that its graphic certifies review.
  const claims = plain.replace("의료 검수 완료 표시가 아닙니다", "검수 미완료 설명");
  assert.doesNotMatch(claims, /의료 검수 완료|OFFICIAL_SOURCE_CHECKED|NOT_MEDICALLY_REVIEWED/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  assert.ok(!schemas.some(schema => schema["@type"] === "FAQPage"), "Do not fabricate a FAQ rich result from removed or ineligible FAQs");
  assert.doesNotMatch(JSON.stringify(schemas), /"@type":"Physician"|"reviewedBy"/);
  const article = schemas.find(schema => schema["@type"] === "Article");
  assert.ok(article);
  assert.equal(article.headline, title);
  assert.equal(article.description, description);
  assert.equal(article.dateModified, modified);
}

test("all 27 reconciled reader subjects retain honest schema, unreviewed status and resolvable source provenance", async () => {
  const registry = new Set(healthSources.map(source => source.id));
  for (const slug of articles) {
    const article = healthArticles[slug];
    assert.ok(article.sourceIds.length);
    assertReferences(article.sourceIds, registry);
    for (const section of article.sections) {
      assert.ok(section.sourceIds?.length);
      assertReferences(section.sourceIds, new Set(article.sourceIds));
    }
    for (const id of article.sourceIds) assertHttps(healthSources.find(source => source.id === id)!.url);
    const direct = existsSync(new URL(`../app/health/${slug}/page.tsx`, import.meta.url));
    const route = await import(direct ? `../app/health/${slug}/page.tsx` : "../app/health/[...missing]/page.tsx");
    const params = direct ? Promise.resolve({slug}) : Promise.resolve({missing: [slug]});
    const html = renderToStaticMarkup(await route.default({params}));
    assertReaderOutput(html, article.title, article.description, article.updatedAt);
    const metadata = route.metadata ?? await route.generateMetadata({params});
    assert.equal(metadata.alternates.canonical, `https://www.biz2lab.com/health/${slug}`);
  }
  for (const slug of guides) {
    const guide = getHealthSupportGuide(slug)!;
    const ids = guide.sources.map(source => source.id);
    assert.ok(ids.length);
    assertReferences(ids, new Set(ids));
    for (const section of guide.sections) {
      if (!section.sourceIds?.length) {
        // PR148 adds a communication prompt, not an uncited medical explanation.
        // Pin that sole exception; every other section still requires evidence.
        assert.equal(slug, "understanding-hba1c");
        assert.deepEqual(section, {
          title: "검사 원본과 함께 가져갈 세 가지 질문",
          bullets: [
            "‘이 표기와 단위가 이전 검사와 같은가요?’ — 두 결과표를 함께 보여 주세요.",
            "‘제 혈당과 HbA1c의 차이를 설명할 상황이 있나요?’ — 검사 날짜와 최근 건강 변화를 적어 갑니다.",
            "‘확인 검사가 필요하다면 무엇을 언제 하나요?’ — 다음 일정과 문의할 곳을 메모합니다.",
          ],
          links: [
            {href: "/health/tools/diabetes-questions", label: "제2형 당뇨병 진료 질문지 인쇄하기"},
            {href: "/health/type-2-diabetes", label: "제2형 당뇨병의 증상·검사·기록을 함께 이해하기"},
          ],
        });
      } else assertReferences(section.sourceIds, new Set(ids));
    }
    for (const faq of guide.faq ?? []) {
      assert.ok(faq.sourceIds?.length);
      assertReferences(faq.sourceIds, new Set(ids));
    }
    for (const source of guide.sources) assertHttps(source.url);
    const params = Promise.resolve({slug});
    const html = renderToStaticMarkup(await GuidePage({params}));
    assertReaderOutput(html, guide.title, guide.description, guide.updatedAt);
    const metadata = await generateMetadata({params});
    assert.equal(metadata.alternates?.canonical, `https://www.biz2lab.com/health/guides/${slug}`);
  }
});

test("provenance guards reject duplicate or unknown source IDs and non-HTTPS evidence links", () => {
  assert.throws(() => assertReferences(["known", "known"], new Set(["known"])));
  assert.throws(() => assertReferences(["unknown"], new Set(["known"])));
  for (const href of ["http://example.invalid/source", "javascript:alert(1)", "/missing"]) assert.throws(() => assertHttps(href));
});
