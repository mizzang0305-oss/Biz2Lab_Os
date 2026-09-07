# 이상지질혈증 — 원본 시각자료 교체

2026-09-06. Built-in imagegen으로 두 원본 생성. 기존 3원본을 직접 확인한 뒤 추상 concept/반복 action은 교체하고 이전 파일은 보존했다. hero는 검사값을 나타내지 않는 장식 표지로 명시. SOURCE_CONCEPT_CHECKED, licensedMedicalReviewCompleted=false. 한국어 설명은 HTML alt/caption/표로 제공한다.

## 혈관 벽과 플라크

- 근거: [NHLBI](https://www.nhlbi.nih.gov/health/blood-cholesterol), [MedlinePlus](https://medlineplus.gov/cholesterol.html). 벽 안쪽 플라크가 통로를 좁힐 수 있다는 개념만 사용.
- Raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-a325c4e4-6009-4210-aa83-2932d1547343.png
- WebP: public/images/onurim/dyslipidemia/concept-v2.webp, Sharp quality82 형식 변환만, 1536×1024, 170280bytes.
- SHA256: 4bb2038b2f649040c436bd27739b5d9ef1a195ba9617cdb526ac2123027a0059
- Main과 독립 AI 시각 확인: 벽 내 편심 플라크/열린 좁은 통로, 떠다니는 혈전 없음, 필연적 진행/치료 전후/실제 검사 및 척도 아님을 caption에 명시. 의료인 해부학 검수와 구분.

Exact prompt:

Create an original, medically restrained educational illustration for a Korean public-health article about dyslipidemia. Landscape 1536x1024 composition on a warm ivory background, refined hand-drawn editorial illustration, calm dark teal outlines, muted coral vessel wall, soft golden plaque, accessible contrast. Show two LARGE side-by-side transverse artery cross sections viewed straight on. LEFT: concentric artery wall layers with a wide open circular pale lumen. RIGHT: the same outer diameter and same wall layers, with one eccentric crescent-shaped soft golden atherosclerotic plaque embedded in the inner wall under the luminal lining on the lower right, pushing the smooth lining inward and leaving a clearly open but narrower irregular lumen. The deposit must be part of the wall, NOT a loose ball floating in the lumen and NOT an external growth outside the vessel. A few small red blood cells in each open lumen clarify that these are blood vessels, but do not fill the space or imply exact blood cell scale. Do not add arrows between the two examples; they are conceptual structural comparison, not a guaranteed disease progression or before-after treatment result. No liver, heart, extra anatomy, treatment, pills, blood clot, ruptured plaque, gore or emergency alarm. Absolutely NO words, letters, numbers, labels, logo, watermark, pseudo-text, generic flowchart boxes or decorative medical crosses. Clean generous margins, focused precise geometry, subtle paper texture. All explanatory labels and medical limitations will be real HTML below the image.

## 두 결과표와 진료 질문

- 근거: [NHLBI Diagnosis](https://www.nhlbi.nih.gov/health/blood-cholesterol/diagnosis). 이전·현재 검사 및 병력 대화에 쓰는 편집적 예시.
- Raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-361a05ba-f1d7-47de-9bc4-50899d80e6a6.png
- WebP: public/images/onurim/dyslipidemia/action-v2.webp, Sharp quality82 형식 변환만, 1536×1024, 189530bytes.
- SHA256: 7c23d40b5591acaf092f8b41c36fad26f037e0f1beaae1afaf168549d57af5fa
- 두 결과표 각각 네 줄/별도 질문 노트. 값·진단·약 용량 없음. 시계는 금식 시간 지시가 아님을 HTML로 명시. 가상 인물이며 실제 독자나 검수자 증거 아님.

Exact prompt:

Original patient-education editorial illustration for a Korean dyslipidemia guide, landscape 1536x1024. Warm ivory paper texture, calm muted teal and coral, refined hand painted style with natural anatomy. A middle-aged Korean adult and an older Korean adult seated side by side at an ordinary home desk, comparing TWO clearly separate blood lipid laboratory reports placed together: each report has exactly FOUR simple aligned result rows, blank ruled lines and small neutral teal row markers, absolutely NO actual values or readable text. One person points to a corresponding row across the two separate sheets, the other writes questions on a SMALL separate notepad. A simple analog clock and closed generic medicine box stand beside the papers to suggest remembering test timing and current medicines; no visible pills, dosage, treatment or clinician. Both faces thoughtful and relaxed, not frightened or celebratory. The reports should be central, unobstructed and clearly two different sheets side by side, not a single merged page. Realistic hands with five fingers, seated safe natural posture. No healthcare uniform, lab coat, stethoscope, badge, logo, brand, checkmarks, ticked approval, graphs, scales, medical crosses, arrows, floating flowchart panels, letters, numbers, pseudotext, watermark. Image conveys bringing previous and current results together for a medical conversation, not diagnosing from a report or promising improvement. All dates, result labels and instructional text will appear in accessible HTML outside the image.
