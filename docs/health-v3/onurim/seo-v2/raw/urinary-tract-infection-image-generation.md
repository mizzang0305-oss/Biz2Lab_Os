# 요로감염 이미지 생성·검토 기록

2026-09-06 · built-in image_gen · LOCAL · 임상 검수 아님

기존3개 실제 열람 후 위치 구분 concept와 검사 역할 action2개 생성. 기존 파일 보존. Main+독립 실제 시각 대조 P0/P1·재생성P2없음. 위치 그림은 감염 진행 단계·배타적 상태·한쪽만 감염·범위/중증도 진단 아님. 현미경은 일부 방법, 빈 접시는 음성 결과 아님. 두 검사는 필수 조합·순서·대기시간·실행법 아님. 권장 캡션 모두 반영.

- concept raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-a6eb8c0d-7b86-4308-96e0-dc486404aba0.png
- action raw: D:/CodexData/.codex/generated_images/01a02fae-2a15-7442-828f-3a8fdbb80e4d/exec-b89a03de-a149-467b-a999-0de2f7440a66.png
- concept-v2.webp:1536x1024/42656B/SHA256 40ba897d90f7c994c2cc89c30824454da353e31ea3ec9d85c52e0a1d2a42bd2d
- action-v2.webp:1536x1024/109204B/SHA256 a115df6ff23fd2a551ca6f148b981410e7c2211219fbeea4704010f9733f3f0b
- Main+독립 [KDCA6674 개요·검사](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6674), [NIDDK 진단](https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/diagnosis) 실제 본문 대조. 출처그림 복제 없음.
- SOURCE_CONCEPT_CHECKED; clinicalReviewCompleted=false.

## Concept exact prompt

```text
Use case: scientific-educational.
Asset type: original Korean adult urinary tract infection educational raster illustration, landscape 1536x1024.
Create two large independent side-by-side panels on warm cream paper, each with the same simplified anatomically plausible frontal urinary tract: two bean-shaped kidneys, each medial renal pelvis draining to its own independent ureter, both ureters entering one bladder, and one urethra exiting below. In the LEFT panel only the bladder has a restrained warm coral highlight; all other anatomy is muted lavender. In the RIGHT panel only one kidney has a restrained warm coral highlight; the rest is muted lavender. Left panel heading exactly "방광", right panel heading exactly "콩팥". These are the only visible words. Leave generous gap between the two examples, no arrows or numbering, because these are different possible infection locations, not mandatory stages of one person's illness. Highlight means a location discussed, not severe damage, a diagnostic image, or confirmed infection. No blood, no stones, no bacterial faces, no magnifying inset, no other organs, no pelvis bones, no people.
Style: clear original gouache and colored-pencil educational illustration with warm ivory background, soft restrained purple, coral only for location, strong readable silhouettes and accurate connections. Mobile-readable large Korean labels. No source diagram imitation, logo, watermark, diagnostic criteria, measurements, temperature, severity color scale, recovery checkmarks, treatment, or before-after narrative. Ureters must exit medial renal hila, not kidney lower convex edges; ureters must stay separate until bladder, not join above it.
```

## Action exact prompt

```text
Use case: scientific-educational.
Asset type: original Korean urinary-tract infection consultation question illustration, landscape 1536x1024.
An elegant cream-paper two-part educational composition explaining TWO DIFFERENT TEST ROLES, not sequential required tests. On the left, one clear simplified laboratory microscope on a broad lavender paper area with exactly the heading "소변검사". On the right, two closed transparent shallow round laboratory culture dishes containing plain pale amber medium on a separate soft sand paper area with exactly the heading "배양검사". No specimens, urine, bacteria colonies, positive or negative result. These two headings are the only text, large and easy to read. The microscope symbolizes looking for clues in urine, the closed culture dishes symbolize laboratory culture; do not show someone performing the test or giving a sample. Side by side, same importance, generous blank gap, no connecting arrows, no step numbers, no clock or waiting duration. No test report or patient information, no drugs, no checkmarks, no charts or antibiotic susceptibility result.
Style: distinctive editorial colored-pencil and gouache on warm ivory paper, gentle realistic object proportions, restrained lavender and golden sand palette with subtle tactile shadows. Clean accessible silhouettes, no tiny illegible detail, no generic three-card workflow or clipboard checklist. No people, anatomy, food, branded devices, logos, watermark, proof of diagnosis or clinical endorsement.
```

