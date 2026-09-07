# 통풍 이미지 생성·검토 기록

2026-09-06 · built-in image_gen · LOCAL · 임상 검수 아님

기존 hero/concept/action3개를 실제 확인했다. 새 원본 concept/action2개를 생성하고 이전 파일은 보존했다. Main 및 독립 Astra 실제 시각 대조에서 P0/P1 및 재생성이 필요한 P2 없음. 독립 P2 caption 보강: 혈액검사로 관절 결정을 직접 보는 것은 아님; 두 질문은 치료 순서·약 시작/중단 시점이 아님. 실제 진료·환자·검사 결과를 만들지 않았다.

- concept raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-5f19360a-e08e-4850-881d-14ece3ad08e4.png
- action raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-dc68f7a9-8cd5-485b-bb6c-26aaac084aff.png
- optimized concept: public/images/onurim/gout/concept-v2.webp ·1536x1024·96338B·SHA25606f77598485f18317e10c0efcabe40e6ad5331be9dec7d149e59eb4887611dc5
- optimized action: public/images/onurim/gout/action-v2.webp ·1536x1024·61580B·SHA2567661b7639ae425caa52103ee7a761bf209cbfd4b1045e5ab67fa409b5849975d
- Action의 한국어 두 제목 실제 확인: 이번 통증 / 다음 관리. 날짜·용량·가짜 진료기록 없음. Concept의 관절 간격·결정은 단순화하며 임상 정확 비율/특정 관절 아님.
- SOURCE_CONCEPT_CHECKED; clinicalReviewCompleted=false. [NIAMS 진단·치료](https://www.niams.nih.gov/health-topics/gout/diagnosis-treatment-and-steps-to-take), [MedlinePlus 요산검사](https://medlineplus.gov/lab-tests/uric-acid-test/) 관련 본문 대조. 출처 이미지 복제 없음.

## Concept exact prompt

```text
Use case: scientific-educational.
Asset type: original editorial explanatory image for a Korean adult gout guide, landscape 1536x1024.
Primary request: explain that urate crystals in a joint are a different kind of information from a blood uric-acid measurement. Show one large, anatomically plausible simplified synovial joint cutaway: two opposing smooth rounded bone ends with thin intact blue-grey articular cartilage, a narrow fluid space between them enclosed by a continuous soft synovial capsule. A small sparse cluster of short slender urate crystal symbols lies within the synovial fluid near the lining, with subtle localized warm pink inflammation. Crystals must be much smaller than the bone ends, not huge spears, not piercing or destroying bone/cartilage. Off to the side, a separate small circular inset contains one plain unlabelled blood sample tube, with no numerical reading. No arrow joins the tube and the joint: this is not an inevitable progression, a diagnostic test result, or treatment before/after.
Style: original polished medical-education raster illustration with restrained watercolor texture, off-white background, muted mauve and sage accents, clear anatomy silhouette, generous whitespace, calm and non-frightening. Do not depict a particular person's anatomy or a clinical microscopic photo.
No words, letters, numerals, labels, arrows, checkmarks, logos, watermarks, food/alcohol blame, medication, dosage, blood spilling, people or ornamental three-card workflow.
```

## Action exact prompt

```text
Use case: scientific-educational.
Asset type: original supporting illustration for a Korean gout consultation guide, landscape 1536x1024.
Primary request: show two different consultation purposes side by side on the two pages of one open notebook, seen from directly overhead on a clean warm neutral desk. Left page heading exactly "이번 통증" and a simple small outline of a joint with a restrained warm accent, followed by three empty writing lines. Right page heading exactly "다음 관리" and a simple small blank calendar symbol with no dates or check marks, followed by three empty writing lines. Only these two Korean headings may be readable. One ordinary pen resting below the notebook, two subtle differently colored page tabs. The pages are prompts to prepare questions, not completed health records, not a dosing schedule or an actual treatment plan. No arrows and no before-after recovery story.
Style: polished original editorial raster illustration, soft natural paper texture, warm cream paper, restrained mauve and sage color accents, dark high-contrast Korean sans-serif headings large enough for mobile, balanced whitespace. Anatomically abstract joint icon, not a diagnostic x-ray.
Constraints: no other text, numerals, medication or pill bottles, food, lab values, private or fake patient records, badges, people, logos, watermarks or three-box workflow.
```
