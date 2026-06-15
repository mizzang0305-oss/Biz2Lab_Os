# Biz2Lab Image Prompt Package

## Source
- slug: ai-business-automation-guide
- title: AI 업무 자동화 가이드
- category: automation
- usage: hero
- outputMode: prompt-only

## Image Goal
AI 업무 자동화 입문 글의 핵심을 보여주는 안전한 대표 이미지 패키지를 만든다. 이 단계에서는 실제 이미지를 생성하거나 기존 production 이미지를 교체하지 않는다.

## Article Context
- articleTitle: AI 업무 자동화 가이드
- categoryStyle: 업무 자동화 - 문서, 데이터, 반복 업무가 AI 자동화 후보로 분류되는 추상 SaaS 워크플로
- visualDifferentiationHint: 입력 업무 묶음, AI 분류 노드, 실행 우선순위 패널을 사선 흐름으로 연결해 다른 글의 단순 3박스 플로와 구분한다.

## Recommended Image Type
Premium SaaS/editorial business illustration. Use abstract workflow modules, Korean business context, generous whitespace, and minimal in-image text.

## Image Brief
반복 업무를 AI 자동화 후보로 분류하고, 실행 우선순위를 정한 뒤 작은 자동화 흐름으로 이어지는 모습을 보여주는 대표 이미지.

## Provider Prompt (Korean)
Biz2Lab 한국어 비즈니스 글 "AI 업무 자동화 가이드"에 사용할 16:9 hero 이미지. 반복 업무가 왼쪽의 문서/스프레드시트 조각에서 시작해 중앙의 추상 AI 분류 노드를 지나 오른쪽의 실행 우선순위 패널로 정리되는 장면을 만든다. 실제 앱 스크린샷처럼 보이지 않는 프리미엄 SaaS 에디토리얼 일러스트 스타일. 색상은 teal, navy, soft cyan, warm amber를 절제해서 사용한다. 핵심 모티프는 반복 업무, 자동화 후보, 우선순위, 실행 흐름이다. 카드 3개만 나열한 일반적인 흐름도나 "Article workflow" 같은 라벨은 피한다. 이미지 안 텍스트는 아주 짧은 추상 라벨 수준으로 최소화하고, 작은 글자는 넣지 않는다. 실제 로고, 브랜드명, 사람 얼굴, 제품 사진, 고객 데이터, 계좌/카드 정보, 현실적인 개인정보가 들어간 가짜 스크린샷은 넣지 않는다. 넉넉한 여백, 선명한 초점, 광고 친화적이고 신뢰감 있는 비즈니스 이미지로 만든다.

## Provider Prompt (English)
Create a 16:9 premium SaaS/editorial hero illustration for a Korean Biz2Lab article titled "AI 업무 자동화 가이드". Show repetitive work items moving from document/spreadsheet fragments on the left, through an abstract AI classification node in the center, into an execution-priority panel on the right. Use teal, navy, soft cyan, and restrained warm amber. Keep in-image text minimal and readable. Avoid generic three-box workflows and any "Article workflow" label. No real logos, no brand names, no people or faces, no product photography, no private customer data, no payment data, no fake realistic screenshots.

## Negative Prompt
watermark, real logo, 브랜드 로고, photo-realistic people, 사람 얼굴, product package, Amazon, ecommerce, real company name, private data, fake screenshot, copyrighted character, external URL, hotlinked image, cluttered UI, unreadable small text, generic Article workflow label, stock photo

## Filename And Paths
- filename: ai-business-automation-guide-hero.png
- rawPath: assets/images/raw/ai-business-automation-guide-hero.png
- optimizedPath: public/images/posts/ai-business-automation-guide-1200.webp

## Alt Text
반복 업무를 AI 자동화 후보로 분류하고 실행 우선순위를 보여주는 업무 자동화 이미지

## Caption
반복 업무를 자동화 후보로 분류하고 실행 우선순위를 정리하는 AI 업무 자동화 이미지 브리프

## Manifest Draft
```json
{
  "id": "ai-business-automation-guide-hero",
  "project": "biz2lab",
  "postSlug": "ai-business-automation-guide",
  "usage": "hero",
  "src": "/images/posts/ai-business-automation-guide-1200.webp",
  "rawPath": "assets/images/raw/ai-business-automation-guide-hero.png",
  "altKo": "반복 업무를 AI 자동화 후보로 분류하고 실행 우선순위를 보여주는 업무 자동화 이미지",
  "captionKo": "반복 업무를 자동화 후보로 분류하고 실행 우선순위를 정리하는 AI 업무 자동화 이미지 브리프",
  "width": 1200,
  "height": 675,
  "format": "webp",
  "licenseStatus": "local-prompt-package",
  "commerceAutoReusable": true,
  "status": "planned"
}
```

## Article Update Plan
- 생성된 원본이 승인되면 `assets/images/raw/ai-business-automation-guide-hero.png`에 저장한다.
- 최적화 후 `public/images/posts/ai-business-automation-guide-1200.webp`가 생성되는지 확인한다.
- article frontmatter의 `heroImage` 후보는 `/images/posts/ai-business-automation-guide-1200.webp`이다.
- article frontmatter의 `heroAlt` 후보는 위 `Alt Text` 값이다.
- 이 단계에서는 article 파일을 수정하지 않는다.

## Manual Creation Instructions
- Korean prompt를 ChatGPT image generation 또는 명시적으로 승인된 로컬/수동 도구에 복사한다.
- negative prompt의 금지 항목을 함께 적용한다.
- 결과 이미지를 사람이 검수한 뒤 rawPath에 저장한다.
- WebP 최적화와 이미지 검증이 통과하기 전에는 article에 적용하지 않는다.

## Validation Checklist
- 외부 이미지 URL 없음
- 실제 로고, 제품/Amazon 이미지, 사람 얼굴 없음
- 개인정보나 실제 회사/고객 데이터 없음
- 이미지 안 텍스트 최소화
- rawPath와 optimizedPath가 로컬 경로임
- deterministic fallback을 premium final로 주장하지 않음

## Validation Commands
```bash
npm run optimize-images
npm run validate:images
npm run audit:image-briefs
```
