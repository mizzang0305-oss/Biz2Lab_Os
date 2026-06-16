# Biz2Lab Image Prompt Package

## Source
- slug: customer-memory-system
- title: 고객 정보를 기억하는 시스템이 중요한 이유
- category: small-business
- usage: hero
- outputMode: prompt-only

## Image Goal
Create a safe, premium Biz2Lab hero image package for the article without generating or replacing production images in this step.

## Article Context
- articleTitle: 고객 정보를 기억하는 시스템이 중요한 이유
- categoryStyle: 소상공인 운영: 주문, 예약, 고객 메모, 리뷰 대응이 한 화면에서 정리되는 친근하지만 전문적인 매장 운영 워크플로
- visualDifferentiationHint: 사장님 운영 노트를 중심 모티프로 사용하고, 중앙에 여백을 크게 둔 편집형 표지 구성을 만들고 주변에 관련 업무 단서를 얇게 배치한다.

## Recommended Image Type
Premium SaaS/editorial business illustration with category-specific workflow structure and minimal in-image text.

## Image Brief
고객 요청, 선호, 이전 응대 이력이 안전한 메모 레이어로 정리되어 재방문 응대를 돕는 대표 이미지

## Provider Prompt (Korean)
Biz2Lab 한국어 비즈니스 글 "고객 정보를 기억하는 시스템이 중요한 이유"에 사용할 대표 이미지. 사용자 설명: 고객 요청, 선호, 이전 응대 이력이 안전한 메모 레이어로 정리되어 재방문 응대를 돕는 대표 이미지. 목표 톤: 차분하고 신뢰감 있는 프리미엄 Korean SaaS/editorial style. 주문, 예약, 고객 메모, 리뷰 대응이 한 화면에서 정리되는 친근하지만 전문적인 매장 운영 워크플로. 색상은 teal, forest green, slate, warm yellow. 실제 브랜드나 서비스 화면이 아닌 추상 업무 시각화. 글 상단 대표 이미지로 사용할 수 있게 한눈에 주제가 잡히는 넓은 16:9 에디토리얼 구도로 만든다. 사장님 운영 노트를 중심 모티프로 사용하고, 중앙에 여백을 크게 둔 편집형 표지 구성을 만들고 주변에 관련 업무 단서를 얇게 배치한다. 핵심 업무 맥락이 한눈에 보이게 한다. 실제 로고, 사람 얼굴, 제품 사진은 넣지 않는다. 이미지 안의 글자는 최소화하고, 읽어야 하는 설명은 alt/caption/본문에 둔다. 1200:675 비율에 맞춘 깔끔한 편집 이미지, 충분한 여백, 광고 친화적이고 신뢰감 있는 구성.

## Provider Prompt (English)
Create a Biz2Lab hero visual for a Korean business article titled "고객 정보를 기억하는 시스템이 중요한 이유". Direction: 고객 요청, 선호, 이전 응대 이력이 안전한 메모 레이어로 정리되어 재방문 응대를 돕는 대표 이미지. Style: order, reservation, customer, and review operations, practical owner dashboard, friendly but professional; premium SaaS/editorial look; teal, forest green, slate, warm yellow. 글 상단 대표 이미지로 사용할 수 있게 한눈에 주제가 잡히는 넓은 16:9 에디토리얼 구도로 만든다. Use abstract workflow modules and useful business-diagram structure, with minimal in-image text. No real logos, no people or faces, no product photography, no private data, no fake screenshots.

## Negative Prompt
watermark, real logo, 브랜드 로고, photo-realistic people, 사람 얼굴, product package, Amazon, ecommerce, real company name, private data, fake screenshot, copyrighted character, external URL, hotlinked image, cluttered UI, unreadable small text, generic Article workflow label, stock photo

## Filename And Paths
- filename: customer-memory-system-hero.png
- rawPath: assets/images/raw/customer-memory-system-hero.png
- optimizedPath: public/images/posts/customer-memory-system-1200.webp

## Alt Text
고객 요청, 선호, 이전 응대 이력이 안전한 메모 레이어로 정리되어 재방문 응대를 돕는 대표 이미지를 설명하는 소상공인 운영 이미지

## Caption
고객 요청, 선호, 이전 응대 이력이 안전한 메모 레이어로 정리되어 재방문 응대를 돕는 대표 이미지를 안전한 로컬 이미지 제작용 브리프로 정리합니다.

## Manifest Draft
```json
{
  "id": "customer-memory-system-hero",
  "project": "biz2lab",
  "postSlug": "customer-memory-system",
  "usage": "hero",
  "src": "/images/posts/customer-memory-system-1200.webp",
  "rawPath": "assets/images/raw/customer-memory-system-hero.png",
  "altKo": "고객 요청, 선호, 이전 응대 이력이 안전한 메모 레이어로 정리되어 재방문 응대를 돕는 대표 이미지를 설명하는 소상공인 운영 이미지",
  "captionKo": "고객 요청, 선호, 이전 응대 이력이 안전한 메모 레이어로 정리되어 재방문 응대를 돕는 대표 이미지를 안전한 로컬 이미지 제작용 브리프로 정리합니다.",
  "width": 1200,
  "height": 675,
  "format": "webp",
  "licenseStatus": "local-prompt-package",
  "commerceAutoReusable": true,
  "status": "planned"
}
```

## Article Update Plan
- 실제 이미지 승인 후 frontmatter heroImage 후보: /images/posts/customer-memory-system-1200.webp
- 실제 이미지 승인 후 frontmatter heroAlt 후보: 고객 요청, 선호, 이전 응대 이력이 안전한 메모 레이어로 정리되어 재방문 응대를 돕는 대표 이미지를 설명하는 소상공인 운영 이미지
- 현재 단계에서는 기사 파일을 수정하지 않는다.
- 적용 전 optimized WebP 파일 존재 여부와 시각 검수를 먼저 확인한다.

## Manual Creation Instructions
- Copy the Korean provider prompt into ChatGPT image generation or another explicitly approved manual/local image tool.
- Keep the negative prompt rules active: no logos, people/faces, product/Amazon imagery, private data, fake screenshots, hotlinks, or copyrighted characters.
- Save the raw image to assets/images/raw/customer-memory-system-hero.png.
- Optimize to public/images/posts/customer-memory-system-1200.webp only after manual review.
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
