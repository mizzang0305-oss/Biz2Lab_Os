import "./helpers/register-pocket-css";
import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ReadingExperiment } from "../components/essays/ReadingExperiment";
import {
  calculateCircumference,
  calculateEntropy,
  calculateLongitude,
  parseExperimentNumber,
  type ExperimentResult,
} from "../lib/essays/experiments";

function value<T>(result: ExperimentResult<T>): T {
  if (!result.ok) throw new Error(result.error);
  return result.value;
}

function close(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} differs from ${expected}`);
}

test("empty numeric input is missing while an explicit zero remains zero", () => {
  assert.ok(Number.isNaN(parseExperimentNumber("")));
  assert.ok(Number.isNaN(parseExperimentNumber("  ")));
  assert.equal(parseExperimentNumber("0"), 0);
  assert.equal(parseExperimentNumber("-120"), -120);
});

test("circumference example distinguishes doubling distance from doubling angle", () => {
  assert.equal(value(calculateCircumference(1000, 9)).circumferenceKm, 40_000);
  assert.equal(value(calculateCircumference(2000, 9)).circumferenceKm, 80_000);
  assert.equal(value(calculateCircumference(1000, 18)).circumferenceKm, 20_000);
  assert.equal(value(calculateCircumference(2000, 18)).circumferenceKm, 40_000);
  assert.equal(value(calculateCircumference(1000, 180)).circleFraction, 0.5);
});

test("circumference rejects missing, zero, negative, out-of-range and overflowing inputs", () => {
  for (const bad of [0, -1, NaN, Infinity, -Infinity, 1_000_001]) {
    assert.equal(calculateCircumference(bad, 9).ok, false, `distance ${bad}`);
  }
  for (const bad of [0, -1, 181, NaN, Infinity, -Infinity, Number.MIN_VALUE]) {
    assert.equal(calculateCircumference(1000, bad).ok, false, `angle ${bad}`);
  }
  assert.equal(calculateCircumference(1_000_000, 180).ok, true);
});

test("local noon with reference 14:00 is west 30 degrees; the reverse is east", () => {
  assert.deepEqual(value(calculateLongitude(-120)), { signedDegrees: -30, degrees: 30, direction: "west" });
  assert.deepEqual(value(calculateLongitude(120)), { signedDegrees: 30, degrees: 30, direction: "east" });
  assert.equal(value(calculateLongitude(-116)).signedDegrees - value(calculateLongitude(-120)).signedDegrees, 1);
});

test("longitude preserves the opposite-meridian boundary and rejects ambiguous extra turns", () => {
  assert.equal(value(calculateLongitude(720)).signedDegrees, 180);
  assert.equal(value(calculateLongitude(-720)).signedDegrees, -180);
  assert.deepEqual(value(calculateLongitude(-0)), { signedDegrees: 0, degrees: 0, direction: "same" });
  for (const bad of [720.01, -720.01, Infinity, -Infinity, NaN]) assert.equal(calculateLongitude(bad).ok, false);
});

test("entropy known models include certainty, an equiprobable binary choice, and four choices", () => {
  assert.equal(value(calculateEntropy([0, 1, 0, 0])).entropyBits, 0);
  assert.equal(value(calculateEntropy([1, 1, 0, 0])).entropyBits, 1);
  assert.equal(value(calculateEntropy([1, 1, 1, 1])).entropyBits, 2);
  // Dyadic probabilities 1/2, 1/4, 1/8, 1/8 have exact average code length 1.75.
  assert.equal(value(calculateEntropy([4, 2, 1, 1])).entropyBits, 1.75);
});

test("entropy depends on normalized proportions, not scale or state names/order", () => {
  const unequal = value(calculateEntropy([1, 7, 1, 1]));
  assert.deepEqual(unequal.probabilities, [0.1, 0.7, 0.1, 0.1]);
  close(unequal.entropyBits, 1.3567796494470397);
  close(unequal.entropyBits, value(calculateEntropy([10, 70, 10, 10])).entropyBits);
  close(unequal.entropyBits, value(calculateEntropy([7, 1, 1, 1])).entropyBits);
  assert.ok(unequal.entropyBits < 2);
});

test("entropy handles zero terms and validates all four finite nonnegative weights", () => {
  for (const bad of [[], [1], [1, 1, 1], [1, 1, 1, 1, 1], [0, 0, 0, 0], [-1, 1, 1, 1], [NaN, 1, 1, 1], [Infinity, 1, 1, 1], [1_000_001, 1, 1, 1]]) {
    assert.equal(calculateEntropy(bad).ok, false, String(bad));
  }
  assert.equal(value(calculateEntropy([1_000_000, 1_000_000, 1_000_000, 1_000_000])).entropyBits, 2);
  assert.equal(value(calculateEntropy([Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE])).entropyBits, 2);
});

test("all three experiments provide labeled inputs, computed SSR defaults and a no-script explanation", () => {
  for (const [slug, expected] of [["eratosthenes", "40,000 km"], ["longitude", "서쪽 30°"], ["shannon", "2 비트"]]) {
    const html = renderToStaticMarkup(createElement(ReadingExperiment, { slug }));
    assert.ok(html.includes(expected), slug);
    assert.match(html, /aria-live="polite"/);
    assert.match(html, /<noscript>/);
    assert.match(html, /href="#sources"/);
    assert.match(html, /저장하거나 전송하지 않습니다/);
    for (const match of html.matchAll(/<input id="([^"]+)"/g)) assert.ok(html.includes(`for="${match[1]}"`));
    assert.doesNotMatch(html, /<form|<iframe/);
  }
  assert.equal(renderToStaticMarkup(createElement(ReadingExperiment, { slug: "maps" })), "");
});
