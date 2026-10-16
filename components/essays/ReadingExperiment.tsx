"use client";

import { useState, type ReactNode } from "react";
import {
  calculateCircumference,
  calculateEntropy,
  calculateLongitude,
  parseExperimentNumber,
} from "@/lib/essays/experiments";
import styles from "./reading-experiment.module.css";

function format(value: number, digits = 2) {
  // Keep unusually small/large user values legible instead of rounding them to zero.
  if (value !== 0 && (Math.abs(value) < 10 ** -digits || Math.abs(value) >= 1e12)) {
    return value.toExponential(2);
  }
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: digits }).format(value);
}

function NumberField({ id, label, value, onChange, min, max, hintId, invalid }: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max: number;
  hintId: string;
  invalid: boolean;
}) {
  return <label className={styles.field} htmlFor={id}>{label}
    <input id={id} type="number" inputMode="decimal" step="any" min={min} max={max}
      value={value} onChange={(event) => onChange(event.target.value)}
      aria-describedby={hintId} aria-invalid={invalid} autoComplete="off" />
  </label>;
}

function ExperimentShell({ slug, title, children, fallback }: {
  slug: string; title: string; children: ReactNode; fallback: string;
}) {
  return <section id="reading-experiment" className={styles.experiment}
    data-reading-experiment={slug} aria-labelledby="reading-experiment-title">
    <p className={styles.eyebrow}>직접 바꿔 보는 생각 실험</p>
    <h2 id="reading-experiment-title">{title}</h2>
    {children}
    <noscript><p>입력값을 바꾸는 실험에는 JavaScript가 필요합니다. {fallback}</p></noscript>
    <p className={styles.localNote}>입력한 숫자는 이 화면의 계산에만 쓰며 저장하거나 전송하지 않습니다.</p>
    <a className={styles.sourceLink} href="#sources">계산의 배경이 된 원자료 확인하기 →</a>
  </section>;
}

function CircumferenceExperiment() {
  const [distance, setDistance] = useState("1000");
  const [angle, setAngle] = useState("9");
  const result = calculateCircumference(parseExperimentNumber(distance), parseExperimentNumber(angle));
  const distanceInvalid = !Number.isFinite(parseExperimentNumber(distance)) || Number(distance) <= 0 || Number(distance) > 1_000_000;
  const angleInvalid = !Number.isFinite(parseExperimentNumber(angle)) || Number(angle) <= 0 || Number(angle) > 180;
  function setExample(nextAngle: string) { setDistance("1000"); setAngle(nextAngle); }
  return <ExperimentShell slug="eratosthenes" title="각도 하나를 바꾸면 지구의 크기도 바뀔까?"
    fallback="기본 가상 예시는 거리 1,000 km, 각도 9°로 둘레 40,000 km입니다. 각도만 18°로 바꾸면 20,000 km가 됩니다.">
    <p>본문의 가상 관측을 출발점으로 삼았습니다. 거리는 그대로 두고 각도 차이를 두 배로 바꾸기 전에, 둘레가 커질지 작아질지 먼저 예상해 보세요.</p>
    <p className={styles.formula}>둘레 = 자오선 거리 × 360 ÷ 중심각</p>
    <div className={styles.fields}>
      <NumberField id="experiment-distance" label="두 지점의 자오선 거리 (km)" value={distance} onChange={setDistance}
        min={0} max={1_000_000} hintId="circumference-hint circumference-result" invalid={distanceInvalid} />
      <NumberField id="experiment-angle" label="그림자에서 구한 각도 차이 (°)" value={angle} onChange={setAngle}
        min={0} max={180} hintId="circumference-hint circumference-result" invalid={angleInvalid} />
    </div>
    <p id="circumference-hint" className={styles.inputHint}>거리: 0 초과~1,000,000 km. 각도: 0 초과~180°. 두 도시가 같은 자오선에 있고 한쪽 태양이 천정에 오는 이상화된 배치입니다.</p>
    <div className={styles.actions}>
      <button type="button" onClick={() => setExample("18")}>비교 예시: 1,000 km · 18°</button>
      <button type="button" onClick={() => setExample("9")}>처음 예시로: 1,000 km · 9°</button>
    </div>
    <div id="circumference-result" className={styles.result} aria-live="polite" aria-atomic="true">
      {result.ok ? <>
        <p className={styles.resultLabel}>이 가정에서 계산한 둘레</p>
        <output htmlFor="experiment-distance experiment-angle">{format(result.value.circumferenceKm)} km</output>
        <p>입력한 거리는 원 한 바퀴의 {format(result.value.circleFraction * 100, 3)}%에 해당합니다.</p>
      </> : <p className={styles.error}>{result.error}</p>}
    </div>
    <p className={styles.exercise}><strong>계산 뒤에 남는 질문</strong><br />거리를 두 배로 해도 둘레를 40,000 km로 유지하려면 각도는 어떻게 바꿔야 할까요? 2,000 km와 18°를 직접 넣어 보고, 두 관측값의 비율이 맡는 역할을 설명해 보세요.</p>
    <p className={styles.limits}>이 숫자는 역사적 실측값이 아닙니다. 구형 지구, 평행한 태양광, 같은 천문 조건을 가정하며 도로 길이를 자오선 거리로 바꿔 주지 않습니다. 실제 지구의 타원체 모양이나 관측 오차도 보정하지 않습니다.</p>
  </ExperimentShell>;
}

function LongitudeExperiment() {
  const [minutes, setMinutes] = useState("-120");
  const result = calculateLongitude(parseExperimentNumber(minutes));
  return <ExperimentShell slug="longitude" title="정오에 두 시계가 다르면 어느 쪽에 있을까?"
    fallback="기본 가상 예시는 현지 12시, 기준 장소 14시로 차이가 −120분이며 기준 자오선의 서쪽 30°입니다. +120분이면 동쪽 30°입니다.">
    <p>현지에서 정오를 관측했는데 기준 장소의 시계는 오후 2시를 가리킨다고 해 봅시다. 현지 시각에서 기준 시각을 빼면 −120분입니다. 부호를 뒤집었을 때 위치의 방향도 바뀌는지 확인해 보세요.</p>
    <p className={styles.formula}>경도 차이 (°) = (현지 태양시 − 기준 태양시) (분) ÷ 4</p>
    <div className={styles.fields}>
      <NumberField id="experiment-minutes" label="현지 − 기준 태양시 (분)" value={minutes} onChange={setMinutes}
        min={-720} max={720} hintId="longitude-hint longitude-result" invalid={!result.ok} />
    </div>
    <p id="longitude-hint" className={styles.inputHint}>−720~+720분. 같은 순간의 시각을 비교하며, 양수는 현지가 앞선 경우입니다. 날짜 경계를 반영한 차이를 입력해 주세요.</p>
    <div className={styles.actions}>
      <button type="button" onClick={() => setMinutes("120")}>비교 예시: +120분</button>
      <button type="button" onClick={() => setMinutes("-120")}>처음 예시로: −120분</button>
    </div>
    <div id="longitude-result" className={styles.result} aria-live="polite" aria-atomic="true">
      {result.ok ? <>
        <p className={styles.resultLabel}>선택한 기준 자오선으로부터의 차이</p>
        <output htmlFor="experiment-minutes">{result.value.direction === "same" ? "같은 자오선 · 0°" : `${result.value.direction === "east" ? "동쪽" : "서쪽"} ${format(result.value.degrees)}°`}</output>
        <p>{result.value.degrees === 180
          ? "180°는 기준의 반대편 자오선입니다. +180°와 −180°는 같은 자오선을 가리킵니다."
          : result.value.direction === "same" ? "이 모형에서는 두 장소의 평균 태양시가 같습니다. 위도가 같다는 뜻은 아닙니다."
            : result.value.direction === "east" ? "현지가 기준 장소보다 먼저 정오를 맞는 경우입니다." : "기준 장소가 현지보다 먼저 정오를 맞는 경우입니다."}</p>
      </> : <p className={styles.error}>{result.error}</p>}
    </div>
    <p className={styles.exercise}><strong>시계의 오차를 위치의 오차로</strong><br />기본값 −120분을 −116분으로 바꿔 보세요. 4분의 차이가 경도를 얼마나 바꾸나요? 같은 각도 차이가 적도와 높은 위도에서 같은 이동 거리인지도 본문의 설명과 비교해 보세요.</p>
    <p className={styles.limits}>관측한 태양시를 같은 평균 태양시 체계로 보정했다고 가정합니다. 표준 시간대·서머타임의 시차를 넣는 계산기가 아니며, 실제 항해·측위에 사용할 수 없습니다. 기준이 그리니치라는 가정도 자동으로 붙지 않습니다.</p>
  </ExperimentShell>;
}

const messageNames = ["문이 열림", "문이 닫힘", "점검 중", "전원 부족"] as const;

function EntropyExperiment() {
  const [weights, setWeights] = useState(["1", "1", "1", "1"]);
  const result = calculateEntropy(weights.map(parseExperimentNumber));
  function changeWeight(index: number, value: string) {
    setWeights((previous) => previous.map((weight, position) => position === index ? value : weight));
  }
  return <ExperimentShell slug="shannon" title="메시지는 그대로인데 예측 가능성이 달라진다면?"
    fallback="기본 가상 예시는 네 가중치가 모두 1이라 확률이 각각 25%, 엔트로피가 2비트입니다. 한 상태만 나오면 0비트입니다.">
    <p>본문의 가상 장치가 보내는 네 상태에 상대적인 가중치를 줘 보세요. 모두 1이면 같은 확률, ‘문이 닫힘’만 1이고 나머지가 0이면 한 상태만 나오는 모형입니다.</p>
    <p className={styles.formula}>확률 p = 가중치 ÷ 가중치 합<br />엔트로피 H = −Σ p log₂ p (비트)</p>
    <div className={styles.fields}>
      {messageNames.map((name, index) => {
        const value = parseExperimentNumber(weights[index]);
        return <NumberField key={name} id={`experiment-weight-${index}`} label={`${name} (상대 가중치)`}
          value={weights[index]} onChange={(next) => changeWeight(index, next)} min={0} max={1_000_000}
          hintId="entropy-hint entropy-result" invalid={!Number.isFinite(value) || value < 0 || value > 1_000_000 || weights.every((weight) => parseExperimentNumber(weight) === 0)} />;
      })}
    </div>
    <p id="entropy-hint" className={styles.inputHint}>각 가중치: 0~1,000,000, 소수 허용. 네 값의 합으로 나누어 확률을 구하므로 합을 100으로 맞출 필요가 없습니다. 모두 0일 수는 없습니다. 확률 0의 항은 0으로 계산합니다.</p>
    <div className={styles.actions}>
      <button type="button" onClick={() => setWeights(["0", "1", "0", "0"])}>비교 예시: 닫힘만 발생</button>
      <button type="button" onClick={() => setWeights(["1", "7", "1", "1"])}>비교 예시: 닫힘에 7배 가중치</button>
      <button type="button" onClick={() => setWeights(["1", "1", "1", "1"])}>처음 예시로: 네 상태 균등</button>
    </div>
    <div id="entropy-result" className={styles.result} aria-live="polite" aria-atomic="true">
      {result.ok ? <>
        <p className={styles.resultLabel}>한 번의 메시지 선택에 대한 평균 불확실성</p>
        <output htmlFor="experiment-weight-0 experiment-weight-1 experiment-weight-2 experiment-weight-3">{format(result.value.entropyBits, 3)} 비트</output>
        <ul className={styles.probabilities} aria-label="가중치로 계산한 메시지 확률">
          {result.value.probabilities.map((probability, index) => <li key={messageNames[index]}><span>{messageNames[index]}</span><span>{format(probability * 100, 2)}%</span></li>)}
        </ul>
        <p>{result.value.entropyBits === 0 ? "어느 상태가 나올지 이미 정해져 있습니다. 그 메시지가 중요하지 않다는 뜻은 아닙니다." : "네 상태가 같은 확률일 때의 최댓값은 2비트입니다. 표시값은 반올림한 값입니다."}</p>
      </> : <p className={styles.error}>{result.error}</p>}
    </div>
    <p className={styles.exercise}><strong>숫자와 의미를 따로 바꿔 보기</strong><br />가중치 1·7·1·1을 10·70·10·10으로 바꾸면 엔트로피도 열 배가 될까요? 그런 다음 가장 드문 메시지의 이름만 ‘위험 경보’로 바꿨다고 상상해 보세요. 계산값과 사람에게 중요한 정도가 같은 문제인지 생각해 보세요.</p>
    <p className={styles.limits}>가중치는 설명을 위한 가상 값이며 실제 센서 기록이 아닙니다. 이 실험은 한 번의 선택에 대한 확률분포만 계산합니다. 연속 메시지의 상관관계, 파일 헤더, 오류 정정 비용은 포함하지 않으며 실제 압축 파일 크기·문장의 진실·의미의 가치를 예측하지 않습니다.</p>
  </ExperimentShell>;
}

export function ReadingExperiment({ slug }: { slug: string }) {
  if (slug === "eratosthenes") return <CircumferenceExperiment />;
  if (slug === "longitude") return <LongitudeExperiment />;
  if (slug === "shannon") return <EntropyExperiment />;
  return null;
}
