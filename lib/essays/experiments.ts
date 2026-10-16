/** Local, educational calculations. These functions do not collect or persist inputs. */
export type ExperimentResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export const experimentSlugs = ["eratosthenes", "longitude", "shannon"] as const;
export type ExperimentSlug = (typeof experimentSlugs)[number];

export function hasReadingExperiment(slug: string): slug is ExperimentSlug {
  return experimentSlugs.some((candidate) => candidate === slug);
}

/** An empty input is missing, not the number zero. */
export function parseExperimentNumber(input: string): number {
  return input.trim() === "" ? Number.NaN : Number(input);
}

export function calculateCircumference(
  distanceKm: number,
  angleDegrees: number,
): ExperimentResult<{ circumferenceKm: number; circleFraction: number }> {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0 || distanceKm > 1_000_000) {
    return { ok: false, error: "거리는 0보다 크고 1,000,000 이하인 유한한 수로 입력해 주세요." };
  }
  if (!Number.isFinite(angleDegrees) || angleDegrees <= 0 || angleDegrees > 180) {
    return { ok: false, error: "각도 차이는 0보다 크고 180 이하인 유한한 수로 입력해 주세요." };
  }
  const circumferenceKm = (distanceKm * 360) / angleDegrees;
  if (!Number.isFinite(circumferenceKm)) {
    return { ok: false, error: "각도 차이가 너무 작아 계산 범위를 벗어났습니다. 더 큰 각도를 입력해 주세요." };
  }
  return { ok: true, value: { circumferenceKm, circleFraction: angleDegrees / 360 } };
}

export function calculateLongitude(
  localMinusReferenceMinutes: number,
): ExperimentResult<{ signedDegrees: number; degrees: number; direction: "east" | "west" | "same" }> {
  if (!Number.isFinite(localMinusReferenceMinutes) || Math.abs(localMinusReferenceMinutes) > 720) {
    return { ok: false, error: "태양시 차이는 −720분부터 +720분까지의 유한한 수로 입력해 주세요." };
  }
  // Normalize negative zero so the reference meridian has no east/west label.
  const signedDegrees = localMinusReferenceMinutes === 0 ? 0 : localMinusReferenceMinutes / 4;
  return {
    ok: true,
    value: {
      signedDegrees,
      degrees: Math.abs(signedDegrees),
      direction: signedDegrees > 0 ? "east" : signedDegrees < 0 ? "west" : "same",
    },
  };
}

export function calculateEntropy(
  weights: readonly number[],
): ExperimentResult<{ probabilities: number[]; entropyBits: number; totalWeight: number }> {
  if (weights.length !== 4) {
    return { ok: false, error: "이 실험에는 네 가지 메시지의 가중치가 필요합니다." };
  }
  if (weights.some((weight) => !Number.isFinite(weight) || weight < 0 || weight > 1_000_000)) {
    return { ok: false, error: "가중치는 각각 0부터 1,000,000까지의 유한한 수로 입력해 주세요." };
  }
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  if (totalWeight === 0) {
    return { ok: false, error: "적어도 한 메시지의 가중치는 0보다 커야 합니다." };
  }
  const probabilities = weights.map((weight) => weight / totalWeight);
  const entropyBits = probabilities.reduce(
    (sum, probability) => probability === 0 ? sum : sum - probability * Math.log2(probability),
    0,
  );
  return { ok: true, value: { probabilities, entropyBits, totalWeight } };
}
