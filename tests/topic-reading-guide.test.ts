import "./helpers/register-pocket-css";
import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TopicReadingGuide } from "../components/essays/TopicReadingGuide";
import { essayThemes, getSeriesEssay } from "../lib/essays/series";
import { topicGuides } from "../lib/essays/topic-guides";

test("every subject has an actionable reading path to preserved articles in that subject", () => {
  assert.deepEqual(Object.keys(topicGuides).sort(), essayThemes.map(t => t.slug).sort());
  for (const theme of essayThemes) {
    const guide = topicGuides[theme.slug];
    assert.equal(new Set(guide.steps.map(s => s.slug)).size, 3);
    for (const step of guide.steps) assert.equal(getSeriesEssay(step.slug)?.theme, theme.name, step.slug);
    const html = renderToStaticMarkup(createElement(TopicReadingGuide, { themeSlug: theme.slug }));
    for (const step of guide.steps) assert.ok(html.includes(`href="/essays/${step.slug}"`));
    assert.match(html, /href="#essays"/);
    assert.match(html, /<caption>/);
    assert.match(html, /<details><summary>해설 펼쳐보기<\/summary>/);
    assert.ok(html.includes(guide.exercise.answer)); // Available without JS, even when collapsed.
    assert.doesNotMatch(html, /<script|<form|<input|<iframe/);
  }
});

test("unknown subject cannot accidentally display another subject's exercise", () => {
  assert.equal(renderToStaticMarkup(createElement(TopicReadingGuide, { themeSlug: "missing" })), "");
});

