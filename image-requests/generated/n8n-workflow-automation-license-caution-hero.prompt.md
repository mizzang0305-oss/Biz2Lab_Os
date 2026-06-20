# Biz2Lab Image Prompt Package

## Source
- slug: n8n-workflow-automation-license-caution
- title: n8n 분석: 유명한 자동화 도구지만 오픈소스라고 말해도 될까?
- category: automation
- usage: hero
- outputMode: prompt-only

## Image Goal
Create a safe, premium Biz2Lab hero image package for the article without generating, importing, or replacing production images in this repository step.

## Article Context
- articleTitle: n8n 분석: 유명한 자동화 도구지만 오픈소스라고 말해도 될까?
- categoryStyle: automation category visual with workflow nodes, license checkpoint, self-hosted server, and approval gate
- visualDifferentiationHint: n8n license-caution article should feel like a decision review board for workflow automation, not a branded app screen.

## Recommended Image Type
Premium SaaS/editorial business illustration with a clear workflow-license review structure and minimal in-image text.

## Image Brief
n8n을 업무 자동화 후보로 검토하되, 라이선스와 셀프호스팅 사용 범위를 먼저 확인해야 한다는 메시지를 담은 16:9 한국어 비즈니스 에디토리얼 히어로 이미지.

## Provider Prompt (Korean)
Biz2Lab 한국어 비즈니스 글 "n8n 분석: 유명한 자동화 도구지만 오픈소스라고 말해도 될까?"에 사용할 16:9 히어로 이미지. 중앙에는 추상 워크플로 노드와 연결선, 오른쪽에는 라이선스 체크포인트 카드, 셀프호스팅 서버, 업무 승인 게이트가 균형 있게 배치된다. 실제 서비스 화면처럼 보이지 않는 고급 SaaS/editorial 비주얼이며 charcoal, deep navy, cool gray 기반에 teal과 restrained amber를 포인트로 사용한다. 이미지 안의 텍스트는 최소화하고, 정확히 읽히는 경우에만 "n8n 분석", "라이선스 확인", "셀프호스팅", "승인 후 적용" 네 문구를 작은 라벨로 배치한다. 브랜드 표식 없이, 실제 credential이나 고객 데이터 없이, 검토와 승인 흐름이 먼저 보이게 만든다.

## Provider Prompt (English)
Create a 16:9 Biz2Lab hero image for a Korean business article titled "n8n 분석: 유명한 자동화 도구지만 오픈소스라고 말해도 될까?". Show an abstract workflow automation map with connected nodes, a license checkpoint card, a self-hosted server block, and a human approval gate. Use a premium SaaS editorial look, not a real app screenshot. Palette: charcoal, deep navy, cool gray, teal accents, restrained amber warning accents. Keep in-image text minimal; only render these Korean labels if they can be clean and legible: "n8n 분석", "라이선스 확인", "셀프호스팅", "승인 후 적용". No real logos, no official marks, no third-party logos, no credentials, no customer data, no watermark, no placeholder elements.

## Negative Prompt
official n8n logo, third-party logo, real service screenshot, real credentials, customer data, API key, secret token, unverified open-source claim, watermark, placeholder graphic, distorted text, dense UI text, external URL, copyrighted character, people faces, stock photo

## Filename And Paths
- filename: n8n-workflow-automation-license-caution-hero.png
- rawPath: assets/images/raw/n8n-workflow-automation-license-caution-hero.png
- optimizedPath: public/images/posts/n8n-workflow-automation-license-caution-hero.webp

## Alt Text
n8n 워크플로 자동화 후보를 라이선스 체크포인트와 셀프호스팅 승인 게이트로 검토하는 이미지

## Caption
n8n은 자동화 흐름을 연결하는 후보지만 업무 적용 전 라이선스와 셀프호스팅 범위를 확인해야 합니다.

## Manifest Draft
```json
{
  "id": "n8n-workflow-automation-license-caution-hero",
  "project": "biz2lab",
  "postSlug": "n8n-workflow-automation-license-caution",
  "usage": "hero",
  "src": "/images/posts/n8n-workflow-automation-license-caution-hero.webp",
  "rawPath": "assets/images/raw/n8n-workflow-automation-license-caution-hero.png",
  "altKo": "n8n 워크플로 자동화 후보를 라이선스 체크포인트와 셀프호스팅 승인 게이트로 검토하는 이미지",
  "captionKo": "n8n은 자동화 흐름을 연결하는 후보지만 업무 적용 전 라이선스와 셀프호스팅 범위를 확인해야 합니다.",
  "width": 1200,
  "height": 675,
  "format": "webp",
  "licenseStatus": "local-prompt-package",
  "commerceAutoReusable": true,
  "status": "planned"
}
```

## Article Update Plan
- 실제 이미지 승인 전에는 article frontmatter를 변경하지 않는다.
- 실제 이미지 승인 전에는 raw image 또는 optimized WebP를 저장하지 않는다.
- 적용 단계에서는 rawPath와 optimizedPath 파일 존재, 시각 검수, 이미지 검증을 먼저 확인한다.

## Manual Creation Instructions
- Copy the provider prompt into an explicitly approved local/manual image tool.
- Keep the negative prompt rules active: no official logo, no third-party logo, no credentials, no customer data, no real service screenshot, no watermark, no placeholder elements.
- Save any approved local raw image to assets/images/raw/n8n-workflow-automation-license-caution-hero.png only during the later publication/import step.
- Optimize to public/images/posts/n8n-workflow-automation-license-caution-hero.webp only after manual review.
- Do not mutate article files unless the optimized local WebP exists and an apply/publish step is explicitly approved.

## Validation Checklist
- 외부 이미지 URL 없음
- 실제 로고, 실제 credential, 고객 데이터 없음
- 공식 로고나 제3자 로고 없음
- 이미지 안 텍스트는 최소화
- assets/images/raw 원본과 public/images/posts WebP 경로 확인
- npm run validate:images
- npm run audit:image-briefs
- npm run audit:image-prompts

## Validation Commands
```bash
npm run validate:images
npm run audit:image-briefs
npm run audit:image-prompts
```
