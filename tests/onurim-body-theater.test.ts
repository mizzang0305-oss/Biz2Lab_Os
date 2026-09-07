import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { BODY_THEATER_DISCLOSURE, bodyTheaterScenes } from "../lib/health-v3/body-theater";
import { healthArticles, healthSources } from "../lib/health-v3/content";

test("20개 질환에 서로 다른 BodyTheater 장면과 확인 가능한 출처가 있다", () => {
  const scenes = Object.values(bodyTheaterScenes);
  assert.equal(scenes.length, 20);
  assert.equal(new Set(scenes.map(scene => scene.sceneKey)).size, 20);
  assert.equal(new Set(scenes.map(scene => scene.path)).size, 20);
  const sourceIds = new Set(healthSources.map(source => source.id));
  for (const scene of scenes) {
    assert.ok(healthArticles[scene.slug]);
    assert.equal(scene.labels.length, 3);
    assert.ok(scene.explanation.length >= 45);
    for (const sourceId of scene.sourceIds) {
      assert.ok(sourceIds.has(sourceId), `${scene.slug}: ${sourceId}`);
      assert.ok(healthArticles[scene.slug].sourceIds.includes(sourceId), `${scene.slug}: article source ${sourceId}`);
    }
  }
});

test("BodyTheater는 의료 한계 고지와 reduced-motion 정적 대체를 유지한다", () => {
  assert.equal(BODY_THEATER_DISCLOSURE, "이 애니메이션은 몸속 작용을 이해하기 쉽게 단순화한 교육용 설명입니다. 실제 해부 구조나 개인의 검사 결과를 나타내지 않습니다.");
  const component = readFileSync("components/health/BodyTheater.tsx", "utf8");
  const css = readFileSync("app/health/onurim.module.css", "utf8");
  assert.match(component, /role="img"/);
  assert.match(component, /<title/);
  assert.match(component, /<desc/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /animation: none !important/);
});
