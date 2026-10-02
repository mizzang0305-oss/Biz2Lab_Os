import assert from "node:assert/strict";
import test from "node:test";
import { healthArticles, type HealthArticle } from "../lib/health-v3/content";
import { approvedAsthmaGlossary, assertAsthmaTerminologyContract } from "./helpers/asthma-terminology-contract";

function rejectMutation(label: string, mutate: (article: HealthArticle) => void) {
  const article = structuredClone(healthArticles.asthma);
  mutate(article);
  assert.throws(() => assertAsthmaTerminologyContract(article), label);
}

test("asthma permits only the published glossary and rejects extra prescribing instructions in that slot", () => {
  assert.doesNotThrow(() => assertAsthmaTerminologyContract(structuredClone(healthArticles.asthma)));
  for (const [label, extra] of [
    ["SABA inside the glossary", " SABA 용어를 추가합니다."],
    ["universal AIR selection", " 개인 지침 확인 후에는 누구나 AIR를 선택하세요."],
    ["unapproved drug selection without an acronym", " 개인 처방과 관계없이 누구나 같은 약을 선택하세요."],
  ]) rejectMutation(label, article => { article.sections[1].paragraphs![0] += extra; });
});

test("asthma keeps dose and acronym rejection outside the exact approved tokens across the whole article", () => {
  for (const term of ["SABA", "AIR", "MART"]) {
    rejectMutation(`${term} in another section`, article => { article.sections[2].paragraphs!.push(term); });
    rejectMutation(`${term} in a second paragraph of the glossary section`, article => { article.sections[1].paragraphs!.push(term); });
  }
  rejectMutation("approved glossary duplicated in another section", article => { article.sections[2].paragraphs!.push(approvedAsthmaGlossary); });
  for (const dose of ["2puff", "2회씩", "2번씩", "2분마다", "2mg", "2회분", "2퍼프", "2밀리그램"]) {
    rejectMutation(`${dose} inside the approved slot`, article => { article.sections[1].paragraphs![0] += ` ${dose}`; });
    rejectMutation(`${dose} in another article field`, article => { article.description += ` ${dose}`; });
  }
});
