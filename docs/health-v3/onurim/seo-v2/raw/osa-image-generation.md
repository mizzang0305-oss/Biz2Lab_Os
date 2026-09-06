# 수면무호흡증 이미지 생성 기록

2026-09-06 · built-in imagegen · local-only · medical review NOT completed.

기존 hero/concept/action 직접 확인. 추상 concept/action 대체, 원파일 보존. Main 및 독립 검토는 첫 concept의 청록색 공기길이 후두 뒤 식도로 이어져 보이는 P1, 상단 주머니처럼 보이는 P2를 발견해 미채택했다. 아래 수정으로 하부 경로 제거·상기도 빈 공간 강조. 재검토 잔여 P0/P1/재생성 P2 없음. action은 동의한 상대와의 선택적 대화 예시이며 임상검수 사진 아님.

## Concept draft — rejected, not public

Raw: `D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-384dcb50-7827-40b3-a082-3339086e561d.png`

```text
Use case: scientific-educational. Asset type: original raster patient-education illustration for a Korean adult sleep-apnea article, 1536x1024 landscape. Primary request: explain the location and mechanical idea of OBSTRUCTIVE sleep apnea in the upper airway, not central apnea. Composition: two clean matched midsagittal side-profile cutaways of the SAME adult head and neck, both facing left, aligned at identical scale. Left: a comfortably open pharyngeal air passage behind the tongue and soft palate. Right: relaxed soft tissues of the tongue base/soft palate narrowing the pharyngeal space behind them, with the narrow area visibly located in the throat, not nostrils or lung. Show a recognizable nasal cavity, mouth with tongue, soft palate, back wall of pharynx and continuation toward the windpipe; use simplified anatomically credible forms, restrained sage/teal lumen and warm beige tissue. White/off-white background, generous margins, crisp hand-painted medical editorial illustration, minimal visual noise. Air space should be visually distinct from solid tongue tissue. Do not turn the tongue into an airway tube. No airway arrows penetrating tissue, no CPAP mask, no external obstruction object, no brain lesion, no disease stage progression arrow. No text, labels, numbers, charts, logos, medical seals or diagnosis badges. No gore, frightening suffocation, cyanosis or exaggerated facial distress. These are conceptual anatomy illustrations, not patient scans, not a cure before/after, not an individual severity comparison.
```

## Corrective edit — selected

Input: preceding rejected raw. Raw: `D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-65d00e5f-ae5a-45f2-b7c1-a284bdc15e06.png`
Output: `public/images/onurim/sleep-apnea/concept-v2.webp`,1536×1024,164602bytes,SHA256 `4be12f5153599e7ea5140007d1d53d707f4250de8454058ca50482a192bb4e0d`.

```text
Edit the supplied original patient-education illustration. Preserve two matched same-scale midsagittal side-profile head cutaways and a calm scientific editorial style, no text/labels. Correct an anatomical error: the teal highlighted passage currently continues behind the larynx along the esophagus; do NOT depict that as the airway. Recompose as an enlarged close view of ONLY the nasal cavity, mouth, soft palate, tongue and oropharyngeal air space, terminating the illustrated field immediately below the tongue base, ABOVE the larynx. Completely exclude the lower neck, larynx, trachea and esophagus from both panels; use a clean lower crop/fade at the SAME level, not a rounded sealed tube ending. Left: the air space must visibly connect openly from the back of the nasal cavity around the free edge of the soft palate into the open space behind the tongue; show teal as a faint flat translucent highlight INSIDE that continuous empty air space, not a solid encapsulated tube, bulb, sac or foreign object. Right: show narrowed empty air space behind relaxed tongue/soft palate in the same crop and scale; do not change skeletal size. Simplify unnecessary texture so tissue and empty space are unmistakable. Keep an uncluttered white backdrop, 1536x1024 landscape. No connecting progression arrows, no pressure or oxygen readings, no labels, no symbols of cure, no text or logos. This is solely a concept of upper pharyngeal narrowing in obstructive sleep apnea, not a complete airway map, not central apnea, not individual diagnosis.
```

## Action — selected

Raw: `D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-f33d64b2-25b0-468d-8adb-6b767867f836.png`
Output: `public/images/onurim/sleep-apnea/action-v2.webp`,1536×1024,172174bytes,SHA256 `ab2f4bfd6fddf4cf579457aa43ded4058aa4ed9998c266619a654b7aea9ac62e`.

```text
Use case: photorealistic-natural. Asset type: original editorial supporting image for a Korean adult sleep-apnea educational page, 1536x1024 landscape. Primary request: a calm, respectful shared note-taking moment between two fictional Korean adult household members at a home table in soft daylight. One adult in late middle age describes their daytime tiredness while the other listens and contributes a separate short note about what they noticed at night. Both are awake, dressed casually, equal eye level and equal agency. Each has one simple small notebook on the table, one pen; the notebooks contain only sparse indistinct nonlinguistic pencil strokes, no legible health records, numbers, scores or medical forms. Candid natural expressions, realistic hands, no accusation or pointing at a person. Composition is one coherent home scene, no panels or sequential arrows, no duplicated montage. Warm neutral and sage accents, natural texture and gentle lighting. Do not show monitoring a sleeping person, filming or covert recording, wearable screens, oxygen readings, breathing devices, medication, coffee, alcohol, food treatment, clinician, lab coat, hospital or a person driving. No text overlay, logo, watermark, medical endorsement or real identifiable person. This is an explicitly fictional AI-generated illustration of communication, not proof of clinical review or treatment outcome.
```

## Concept verification

[NHLBI type distinction](https://www.nhlbi.nih.gov/health/sleep-apnea), [KDCA6308 upper airway](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6308), [NCI larynx/trachea anatomy](https://training.seer.cancer.gov/anatomy/respiratory/passages/larynx.html), [NCI pharynx/esophagus](https://training.seer.cancer.gov/anatomy/digestive/regions/pharynx.html). Anatomy references are not clinical approval. No original reference pictures copied; generated original illustration. Caption limits to upper pharyngeal space, not complete airway, central apnea, treatment stages or personal anatomy.
