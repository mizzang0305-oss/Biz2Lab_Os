# Biz2Lab Image Prompt Package

## Source
- slug: activepieces-ai-business-automation-n8n-alternative
- title: Activepieces 분석: n8n 대안이 될 수 있는 AI 업무 자동화 도구
- category: automation
- usage: hero
- outputMode: prompt-only

## Image Goal
Create a safe, premium Biz2Lab hero image package for the article without calling an external API or replacing production images in this step.

## Article Context
- articleTitle: Activepieces 분석: n8n 대안이 될 수 있는 AI 업무 자동화 도구
- categoryStyle: AI 업무 자동화, MCP, trigger-action workflow를 Biz2Lab 업무 흐름으로 검토하는 글
- visualDifferentiationHint: 로고 비교나 제품 화면 복제가 아니라 문의, 블로그, 쇼츠 요청, 데이터 기록이 하나의 workflow로 연결되는 구조를 보여준다.

## Recommended Image Type
Premium SaaS/editorial business illustration with a 16:9 abstract workflow builder, minimal in-image text, and no official brand marks.

## Image Brief
trigger에서 action으로 이어지는 workflow builder 느낌과 AI agent, MCP, 문의 접수, 블로그 발행, 쇼츠 제작 요청, 데이터 기록 흐름을 보여주는 대표 이미지.

## Provider Prompt (Korean)
Biz2Lab 자동화 글을 위한 16:9 프리미엄 편집형 대표 이미지. trigger에서 action으로 이어지는 workflow builder 화면을 추상화해 보여준다. 문의 접수, 블로그 발행, 쇼츠 제작 요청, 데이터 기록, AI 분류, MCP 연결 카드가 한 흐름으로 이어진다. 중앙에는 Activepieces 분석이라는 큰 제목과 AI 업무 자동화와 n8n 대안 가능성 검토라는 보조 문구를 넣는다. n8n, Zapier, Activepieces 공식 로고를 직접 사용하지 않는다. 실제 서비스 UI 복제, 사람 얼굴, 개인정보, 고객 데이터, 워터마크는 넣지 않는다. 차분한 Korean B2B SaaS/editorial 스타일, teal, navy, cyan, restrained amber 색상.

## Provider Prompt (English)
Create a 16:9 premium Biz2Lab editorial hero image for a Korean article analyzing Activepieces as an AI business automation candidate and n8n alternative. Show an abstract trigger-to-action workflow builder with connected cards for inquiry intake, blog publishing, shorts creation request, data logging, AI classification, and MCP connection. Add Korean in-image title 'Activepieces 분석' and subtitle 'AI 업무 자동화와 n8n 대안 가능성 검토'. Do not use official Activepieces, n8n, or Zapier logos. Avoid copied real app UI, faces, private data, customer records, and watermarks.

## Negative Prompt
공식 로고, 실제 앱 화면 복제, 사람 얼굴, 개인정보, 고객 데이터, 워터마크, 외부 URL, 과장 광고 배너, 읽기 어려운 작은 글씨

## Filename And Paths
- filename: activepieces-ai-business-automation-n8n-alternative-hero.jpg
- rawPath: assets/images/raw/activepieces-ai-business-automation-n8n-alternative-hero.jpg
- optimizedPath: public/images/posts/activepieces-ai-business-automation-n8n-alternative-hero.webp

## Alt Text
Activepieces를 AI 업무 자동화와 n8n 대안 관점에서 분석한 대표 이미지

## Caption
Activepieces를 문의, 블로그, 쇼츠 요청, 데이터 흐름을 연결하는 AI 업무 자동화 후보로 분석한 이미지입니다.

## Manifest Draft
```json
{
  "id": "activepieces-ai-business-automation-n8n-alternative-hero",
  "project": "biz2lab",
  "postSlug": "activepieces-ai-business-automation-n8n-alternative",
  "usage": "hero",
  "src": "/images/posts/activepieces-ai-business-automation-n8n-alternative-hero.webp",
  "rawPath": "assets/images/raw/activepieces-ai-business-automation-n8n-alternative-hero.jpg",
  "altKo": "Activepieces를 AI 업무 자동화와 n8n 대안 관점에서 분석한 대표 이미지",
  "captionKo": "Activepieces를 문의, 블로그, 쇼츠 요청, 데이터 흐름을 연결하는 AI 업무 자동화 후보로 분석한 이미지입니다.",
  "width": 1200,
  "height": 675,
  "format": "webp",
  "licenseStatus": "codex-image-skill-generated",
  "commerceAutoReusable": true,
  "status": "active"
}
```

## Article Update Plan
- 실제 이미지 승인 후 frontmatter heroImage 후보: /images/posts/activepieces-ai-business-automation-n8n-alternative-hero.webp
- 실제 이미지 승인 후 frontmatter heroAlt 후보: Activepieces를 AI 업무 자동화와 n8n 대안 관점에서 분석한 대표 이미지
- raw JPG와 public hero WebP 생성 후 published/noindex false 상태로 전환한다.

## Manual Creation Instructions
- Use this prompt only after explicit image generation approval.
- Keep the negative prompt rules active: no official logos, no copied real UI, no people or faces, no private data, no watermarks.
- Save the raw image to assets/images/raw/activepieces-ai-business-automation-n8n-alternative-hero.jpg.
- Optimize to public/images/posts/activepieces-ai-business-automation-n8n-alternative-hero.webp only after manual review.

## Validation Checklist
- 외부 이미지 URL 없음
- Activepieces, n8n, Zapier 공식 로고 없음
- 실제 서비스 UI 복제 없음
- 사람 얼굴과 개인정보 없음
- assets/images/raw 원본과 public/images/posts WebP 경로 확인
- npm run validate:images

## Validation Commands
```bash
npm run validate:images
npm run audit:image-briefs
```
