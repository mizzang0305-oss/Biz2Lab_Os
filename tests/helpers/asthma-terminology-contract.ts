import assert from "node:assert/strict";
import type { HealthArticle } from "../../lib/health-v3/content";

// Repository-published PR143 (2fb4b06c); this is not clinical-review certification.
export const approvedAsthmaGlossary = "비슷한 색의 흡입기를 보고 같은 약이라고 생각하기 쉽습니다. 하지만 기기의 색·모양만으로 역할과 사용법을 정할 수 없습니다. NHS에는 증상이 있을 때 쓰는 AIR, 평소 사용과 증상 완화를 함께 하는 MART 등 서로 다른 처방 방식이 나옵니다. 이는 내 약을 골라 주는 기준이 아니라 이름과 개인 지침을 확인해야 하는 이유입니다.";

export function assertAsthmaTerminologyContract(article: HealthArticle) {
  assert.equal(article.slug, "asthma");
  // Keep the original numeric dosing prohibition over every article field; SABA has no exception.
  assert.doesNotMatch(JSON.stringify(article), /\d+\s*(puff|회씩|번씩|분마다|mg|회분|퍼프|밀리그램)|SABA/);
  const paragraphs = article.sections[1].paragraphs;
  assert.ok(paragraphs);
  assert.equal(paragraphs[0], approvedAsthmaGlossary);
  // Remove only the two approved acronym tokens at the exact verified slot, keeping the paragraph.
  const withoutApprovedTokens = JSON.stringify({
    ...article,
    sections: article.sections.map((section, sectionIndex) => sectionIndex === 1
      ? { ...section, paragraphs: paragraphs.map((paragraph, index) => index === 0 ? paragraph.replace(/\b(?:AIR|MART)\b/g, "[approved term]") : paragraph) }
      : section),
  });
  assert.doesNotMatch(withoutApprovedTokens, /SABA|MART|AIR/);
}
