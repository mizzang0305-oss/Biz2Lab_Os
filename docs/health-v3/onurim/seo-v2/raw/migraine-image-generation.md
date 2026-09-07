# 편두통 이미지 생성·검토 기록

2026-09-06 · built-in image_gen · LOCAL · 임상 검수 아님

기존 hero/concept/action 실제 확인, concept/action2개 새로 생성하고 이전 파일 보존. Main 및 독립 Astra 실제 시각 검토 P0/P1·재생성 P2 없음. Concept P2 캡션 보강 반영: 전구는 전조 섬광, 위는 장기 손상, 누운 모습은 치료 효과나 응급 증상 관찰 지시가 아니다. Action의 두 제목 및 빈 칸 실제 확인. 실제 환자·진료기록·약 복용 일정이 아닌 AI 가상 장면 표시.

- concept raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-298b9e3d-c2bc-428f-9ca7-0dd786c4e437.png
- action raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-40599091-75cf-4b59-b491-c27e399d84cc.png
- concept-v2.webp: 1536x1024 / 154964B / SHA256 5b1547c70c1d5a1ce0090aba0b8ca1ee2ddd1ac357221de90f678a3be075a1fd
- action-v2.webp: 1536x1024 / 74934B / SHA256 c73d4207e8e8f8a90674bcba965914378427511791097b6be30daaeb8767351e
- SOURCE_CONCEPT_CHECKED; clinicalReviewCompleted=false. [NHS Migraine](https://www.nhs.uk/conditions/migraine/) 관련 본문 직접 대조. 조짐·마비·말 이상을 일상 단계로 넣지 않음. 출처 이미지 복제 없음.

## Concept exact prompt

```text
Use case: scientific-educational.
Asset type: original conceptual illustration for an adult Korean migraine education page, landscape 1536x1024.
Primary request: one coherent gentle editorial illustration showing that migraine can involve more than the location of head pain. At the center show a fictional adult in three-quarter view, upper torso, seated and calmly resting a hand near the temple with a mildly uncomfortable but alert expression. Around them place three clearly separate small symbolic vignettes without boxes: a softly shaded light bulb beside a simple ear to suggest sensitivity to light and sound; a small neutral stomach outline to suggest nausea; and a resting head on a pillow to suggest tiredness. These are optional associated experiences, NOT mandatory steps or a sequence. No connecting arrows, no timeline, no diagnosis score. Head pain is not a brain wound or a literal electrical bolt.
Style: original contemporary editorial colored-pencil and soft gouache raster art, muted sage, ochre and warm cream, clean soft edges, generous whitespace, approachable adult publication, not childish clip art, no copied medical images.
Constraints: no words, numbers, logos, watermarks, medication, flashing zigzags, harsh stripes, brain scans, exposed brain, blood vessels, facial droop, asymmetric paralysis, speech-loss imagery or other neurological emergency signs normalized as routine migraine. No recovery-before/after promise, no three-card workflow.
```

## Action exact prompt

```text
Use case: photorealistic-natural.
Asset type: original supporting image for a Korean adult headache diary article, landscape 1536x1024.
Primary request: candid close-up editorial photo of a fictional Korean adult preparing a short headache diary at a home desk in quiet neutral daylight. Frame from shoulder to hands and desktop, no full face needed. One hand holds a plain graphite pencil above a single unfilled paper recording sheet. The sheet has exactly two large Korean column headings, "두통 기록" and "약 사용 기록", each with sparse empty writing lines underneath. Both headings must be spelled exactly. No entered dates, numbers, symptoms, patient names, checked boxes or completed clinical data. No printed diagnoses. A closed plain folder sits partly behind the sheet. Show natural skin and fabric texture and anatomically plausible hands.
The scene illustrates recording what happened and what medicine was actually used for discussion with a clinician, NOT when or how much to take medication. Do not show pills, medicine containers, dosing instructions, smartphone screens, calendar schedules, clinical equipment, food, coffee, clinician endorsement or a person ignoring emergency symptoms.
Composition: slightly oblique over-the-shoulder close crop with legible headings, soft uncluttered cream desk, muted green sleeve, calm practical atmosphere. No text overlay, logos, watermark, fake testimonial, diagram panels, arrows or three-box workflow.
```
