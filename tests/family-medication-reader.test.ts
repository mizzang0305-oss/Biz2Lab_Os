import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import SupportGuidePage from "../app/health/guides/[slug]/page";
import { getHealthSupportGuide, healthSupportGuides } from "../lib/health-v3/support-guides";
import { toolEditorial } from "../lib/health-v3/tool-editorial";

const baseline = JSON.parse(readFileSync("tests/fixtures/health-p1-baseline.json", "utf8"));
const digest = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const guide = getHealthSupportGuide("family-medication-support")!;

test("general family medication support leads to the existing general medication guide", () => {
  assert.deepEqual(guide.sections[0].links, [{ href: "/health/guides/medication-list", label: "당사자가 동의한 범위에서 함께 정리할 약 목록" }]);
  assert.ok(getHealthSupportGuide("medication-list"));
  assert.ok(toolEditorial["family-support-checklist"].title.includes("당뇨병"));
  assert.ok(!guide.sections.flatMap(section => section.links ?? []).some(link => link.href === "/health/tools/family-support-checklist"));
});

test("only the mismatched CTA and actual revision date change; original medical evidence stays", () => {
  const original = structuredClone(guide);
  original.updatedAt = "2026-09-06";
  original.sections[0].links = [{ href: "/health/tools/family-support-checklist", label: "당사자가 원하는 도움을 함께 확인할 가족 지원표" }];
  assert.equal(digest(original), baseline.supportGuideSha256[guide.slug]);
  for (const other of healthSupportGuides.filter(item=>Object.hasOwn(baseline.supportGuideSha256, item.slug)&&!["reading-health-results","symptom-journal","appointment-questions"].includes(item.slug)&&item.slug !== guide.slug && item.slug !== "danger-signals" && item.slug !== "medication-list" && item.slug !== "older-parent-health-organizer" && item.slug !== "measuring-blood-pressure" && item.slug !== "understanding-hba1c")) assert.equal(digest(other), baseline.supportGuideSha256[other.slug], other.slug);
  assert.equal(guide.sourceCheckedAt, "2026-09-06");
});

test("actual reader markup keeps consent, dosage, swallowing and urgent-care boundaries with aligned SEO", async () => {
  const html = renderToStaticMarkup(await SupportGuidePage({params: Promise.resolve({slug: guide.slug})}));
  for (const text of ["‘어디까지 도와드릴까요?’", "당사자가 동의한 범위", "임의로 두 배", "지시 없이 쪼개거나 갈거나 씹지", "즉시 119", "면허 의료인 검수 미완료", "당사자가 동의한 범위에서 함께 정리할 약 목록"]) assert.ok(html.includes(text), text);
  const data = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1])).find(item => item["@type"] === "Article");
  assert.equal(data.headline, guide.title);
  assert.equal(data.description, guide.description);
  assert.equal(data.dateModified, "2026-10-01");
  assert.equal(data.isBasedOn.length, 5);
});

test("large-text grid fix is limited to family medication support; other support markup is unchanged", async () => {
  const family = renderToStaticMarkup(await SupportGuidePage({params: Promise.resolve({slug: guide.slug})}));
  assert.ok(family.includes('style="grid-template-columns:minmax(0, 1fr)"'));
  for (const other of healthSupportGuides.filter(item=>Object.hasOwn(baseline.supportGuideSha256, item.slug)&&!["reading-health-results","symptom-journal","appointment-questions"].includes(item.slug)&&item.slug !== guide.slug && item.slug !== "danger-signals" && item.slug !== "medication-list" && item.slug !== "older-parent-health-organizer" && item.slug !== "measuring-blood-pressure" && item.slug !== "understanding-hba1c")) {
    const html = renderToStaticMarkup(await SupportGuidePage({params: Promise.resolve({slug: other.slug})}));
    assert.equal(createHash("sha256").update(html).digest("hex"), baseline.supportGuideHtml[other.slug], other.slug);
  }
});
