# Biz2Lab Image Prompt Package

## Source
- slug: sales-ops
- title: 영업 운영 허브
- category: sales-ops
- usage: hub
- outputMode: prompt-only

## Image Goal
Create a safe, premium Biz2Lab hub image package for the article without generating or replacing production images in this step.

## Article Context
- articleTitle: 영업 운영 허브
- categoryStyle: 영업 운영: 매출, 미수금, 목표, 리포트 흐름이 정돈되어 보이는 실무형 영업 운영 보드
- visualDifferentiationHint: 후속 조치 타임라인를 중심 모티프로 사용하고, 대시보드 일부와 추상 다이어그램을 겹쳐 보여주되 실제 서비스 화면처럼 보이지 않게 처리한다.

## Recommended Image Type
Premium SaaS/editorial business illustration with category-specific workflow structure and minimal in-image text.

## Image Brief
매출 목표, 일일 보고, 미수금, 주문 채널 관리를 영업 운영의 핵심 축으로 묶는 카테고리 허브 이미지

## Provider Prompt (Korean)
Biz2Lab 한국어 비즈니스 글 "영업 운영 허브"에 사용할 카테고리 허브 이미지. 사용자 설명: 매출 목표, 일일 보고, 미수금, 주문 채널 관리를 영업 운영의 핵심 축으로 묶는 카테고리 허브 이미지. 목표 톤: 차분하고 신뢰감 있는 프리미엄 Korean SaaS/editorial style. 매출, 미수금, 목표, 리포트 흐름이 정돈되어 보이는 실무형 영업 운영 보드. 색상은 navy, slate, teal, amber. 실제 브랜드나 서비스 화면이 아닌 추상 업무 시각화. 카테고리 허브의 첫 인상에 맞게 여러 글을 묶는 넓은 주제 이미지로 구성하고 특정 기사 하나의 화면처럼 보이지 않게 한다. 후속 조치 타임라인를 중심 모티프로 사용하고, 대시보드 일부와 추상 다이어그램을 겹쳐 보여주되 실제 서비스 화면처럼 보이지 않게 처리한다. 핵심 업무 맥락이 한눈에 보이게 한다. 실제 로고, 사람 얼굴, 제품 사진은 넣지 않는다. 이미지 안의 글자는 최소화하고, 읽어야 하는 설명은 alt/caption/본문에 둔다. 1200:630 비율에 맞춘 깔끔한 편집 이미지, 충분한 여백, 광고 친화적이고 신뢰감 있는 구성.

## Provider Prompt (English)
Create a Biz2Lab hub visual for a Korean business article titled "영업 운영 허브". Direction: 매출 목표, 일일 보고, 미수금, 주문 채널 관리를 영업 운영의 핵심 축으로 묶는 카테고리 허브 이미지. Style: sales dashboard, receivables, target tracking, reporting flow, operational clarity; premium SaaS/editorial look; navy, slate, teal, amber. 카테고리 허브의 첫 인상에 맞게 여러 글을 묶는 넓은 주제 이미지로 구성하고 특정 기사 하나의 화면처럼 보이지 않게 한다. Use abstract workflow modules and useful business-diagram structure, with minimal in-image text. No real logos, no people or faces, no product photography, no private data, no fake screenshots.

## Negative Prompt
watermark, real logo, 브랜드 로고, photo-realistic people, 사람 얼굴, product package, Amazon, ecommerce, real company name, private data, fake screenshot, copyrighted character, external URL, hotlinked image, cluttered UI, unreadable small text, generic Article workflow label, stock photo

## Filename And Paths
- filename: sales-ops-hub.png
- rawPath: assets/images/raw/sales-ops-hub.png
- optimizedPath: public/images/posts/sales-ops-hub-1200.webp

## Alt Text
매출 목표, 일일 보고, 미수금, 주문 채널 관리를 영업 운영의 핵심 축으로 묶는 카테고리 허브 이미지를 설명하는 영업 운영 이미지

## Caption
매출 목표, 일일 보고, 미수금, 주문 채널 관리를 영업 운영의 핵심 축으로 묶는 카테고리 허브 이미지를 안전한 로컬 이미지 제작용 브리프로 정리합니다.

## Manifest Draft
```json
{
  "id": "sales-ops-hub",
  "project": "biz2lab",
  "postSlug": "sales-ops",
  "usage": "hub",
  "src": "/images/posts/sales-ops-hub-1200.webp",
  "rawPath": "assets/images/raw/sales-ops-hub.png",
  "altKo": "매출 목표, 일일 보고, 미수금, 주문 채널 관리를 영업 운영의 핵심 축으로 묶는 카테고리 허브 이미지를 설명하는 영업 운영 이미지",
  "captionKo": "매출 목표, 일일 보고, 미수금, 주문 채널 관리를 영업 운영의 핵심 축으로 묶는 카테고리 허브 이미지를 안전한 로컬 이미지 제작용 브리프로 정리합니다.",
  "width": 1200,
  "height": 630,
  "format": "webp",
  "licenseStatus": "local-prompt-package",
  "commerceAutoReusable": true,
  "status": "planned"
}
```

## Article Update Plan
- 실제 이미지 승인 후 해당 카테고리 허브 페이지의 이미지 슬롯 적용을 검토한다.
- 허브 이미지 후보 경로: /images/posts/sales-ops-hub-1200.webp
- 현재 단계에서는 허브 페이지나 라우트를 수정하지 않는다.
- 적용 전 optimized WebP 파일과 반응형 표시를 검수한다.

## Manual Creation Instructions
- Copy the Korean provider prompt into ChatGPT image generation or another explicitly approved manual/local image tool.
- Keep the negative prompt rules active: no logos, people/faces, product/Amazon imagery, private data, fake screenshots, hotlinks, or copyrighted characters.
- Save the raw image to assets/images/raw/sales-ops-hub.png.
- Optimize to public/images/posts/sales-ops-hub-1200.webp only after manual review.
- Do not mutate article files unless the optimized local WebP exists and --apply is explicitly requested.

## Validation Checklist
- 외부 이미지 URL 없음
- 실제 로고, 제품/Amazon 이미지, 사람 얼굴 없음
- 개인정보와 실제 회사/고객 데이터 없음
- 이미지 속 텍스트 최소화
- assets/images/raw 원본과 public/images/posts WebP 경로 확인
- npm run optimize-images
- npm run validate:images
- 브라우저에서 기사 또는 허브 이미지 수동 확인

## Validation Commands
```bash
npm run optimize-images
npm run validate:images
npm run audit:image-briefs
```
