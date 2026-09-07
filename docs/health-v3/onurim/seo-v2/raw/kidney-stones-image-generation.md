# 신장결석 이미지 생성·검토 기록

2026-09-06 · built-in image_gen · LOCAL · 임상 검수 아님

기존3개 실제 확인 후 concept/action2개 생성, 이전 파일 보존. Main+독립 Astra 실제 시각 확인 P0/P1·재생성P2없음. Concept 두신우/각요관/방광/단일요도 연결, 다른 위치 예시와 확대원(추가결석 아님) 캡션 명시. 기관 비율·돌크기개수·막힌정도·배출 가능성 판정 아님. Action 질문 네 제목 정확, 빈칸이고 실제 결과·진료기록·치료 순서·일정 아님.

- concept raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-2bd72936-3286-443c-bff9-5a56a36896b3.png
- action raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-d852b360-ea47-4fe4-a18b-647a9ac57d98.png
- concept-v2.webp:1536x1024/88570B/SHA256 1dbfad0647ef53fc236cbf4e0d53cdb2cf38c954c85281b828268dcb1894abb6
- action-v2.webp:1536x1024/124762B/SHA256 8e6e96e86e853fcefb534dd4d0cf99166f1af50fdda8ded4e0d5b50f79cda3ea
- Main [KDCA 개요·진단](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5433), [NIDDK 진단](https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/diagnosis) 본문 직접 대조. 독립 검토는 [NIDDK 요로 설명](https://www.niddk.nih.gov/health-information/urologic-diseases/urinary-tract-how-it-works) 추가 참조. 출처 이미지 복제 없음.
- SOURCE_CONCEPT_CHECKED; clinicalReviewCompleted=false.

## Concept exact prompt

```text
Use case: scientific-educational.
Asset type: original Korean adult kidney-stone educational raster illustration, landscape 1536x1024.
Primary request: a clear anatomically plausible simplified frontal view of the urinary tract on a warm cream background. Show two separate bean-shaped kidneys with their medial hila facing inward. Each kidney has a visible cutaway of a pale branching collecting system draining into a funnel-shaped renal pelvis. From each pelvis exactly one slender ureter descends independently and enters the upper back/side of one central urinary bladder. One single urethra exits downward from the bladder. All tubes remain separate and continuous; no blood vessels or gastrointestinal organs. Put one small ochre irregular stone inside one renal pelvis, and a separate small circular magnified inset showing a stone lying within a ureter lumen, to explain two possible locations, NOT a sequence. Use a thin neutral leader line from that ureter segment to the inset, no movement arrows. Stone size in the inset is explicitly visually magnified, not a size threshold. Do not show severe swelling, perforation or blood.
Style: elegant original medical-education colored-pencil/gouache illustration, restrained slate blue and warm tan, subtle paper texture, strong readable silhouette and ample whitespace. Accurate connections matter more than decoration. No anatomy copied from any source.
Constraints: no text, letters, numbers, measurements, diagnostic labels, treatment plans, glasses of water, flushing jets, tablets, people, urine spurting, inevitable-passage arrows, three-card workflow, logos or watermark. Do not connect ureters together before the bladder, do not attach a ureter to the convex outer kidney edge, and do not confuse ureter with urethra.
```

## Action exact prompt

```text
Use case: scientific-educational.
Asset type: original consultation-preparation raster illustration for Korean kidney-stone education, landscape 1536x1024.
Primary request: one large open folder on a clean warm cream desk, viewed from above. Inside it lies one blank consultation sheet titled exactly "검사 후 질문". The sheet has four generously spaced rows, each with exactly one Korean heading and one empty writing line. Headings in order: "위치와 크기", "막힘과 감염", "배출 확인", "성분과 예방". These must be the only readable text. Show a simple pencil lying diagonally outside the sheet, and two modest blue index tabs at the folder edge. No checkboxes, dates, measured results or completed patient data. The empty lines are for questions to a clinician after evaluation, not a diagnostic score or a treatment selection menu.
Style: refined tactile editorial paper illustration, colored pencil with soft gouache, restrained slate blue, sand and cream, clear dark Korean typography readable on mobile, subtle paper shadows, generous white space. No clinical room or implied clinician endorsement.
Constraints: no drug names, pills, drinking containers, fluid amounts, stone measurements, arrows, patients, anatomy diagrams, money, diagnostic scan, logos, watermarks, three-box workflow or before-after recovery promise. Do not imply this paper needs filling out before seeking urgent help.
```
