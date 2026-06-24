# Biz2Lab Image Prompt Package

## Source
- slug: meilisearch-blog-product-search-automation
- title: Meilisearch 분석: 블로그와 카탈로그 검색 자동화에 쓸 수 있을까?
- category: automation
- usage: hero
- outputMode: prompt-only

## Image Goal
Create a safe, premium Biz2Lab hero image package for the article without generating or replacing production images in this step.

## Article Context
- articleTitle: Meilisearch 분석: 블로그와 카탈로그 검색 자동화에 쓸 수 있을까?
- categoryStyle: 업무 자동화, 검색 인덱스 운영, 문서/카탈로그 데이터 흐름
- visualDifferentiationHint: meilisearch-search-index-automation: search index pipeline with permission filter, reindex schedule, and hosting operations gate

## Recommended Image Type
Premium SaaS/editorial business illustration with a category-specific search-index workflow and minimal in-image text.

## Image Brief
Meilisearch 분석 글의 대표 이미지입니다. 블로그 글 카드, 문서 카드, 카탈로그 카드가 검색 인덱스 파이프라인을 거쳐 검색 결과 패널로 연결되고, indexing schedule, hosting operations gate, 권한 필터, reindex 체크리스트가 함께 보이는 프리미엄 Biz2Lab 기술 편집형 hero 이미지입니다. 검색 엔진 추천 과장이 아니라 운영 검토와 안전 게이트 중심으로 표현합니다. 공식 Meilisearch 로고, 실제 화면 캡처, 고객 데이터, 비공개 문서, 순위 보장 표현은 제외합니다.

## Provider Prompt (Korean)
Biz2Lab 한국어 비즈니스 글 "Meilisearch 검색 인덱스 자동화 분석"에 사용할 대표 이미지. 블로그 글 카드와 문서 및 카탈로그 카드가 검색 인덱스 파이프라인을 거쳐 검색 결과 패널로 연결되고, indexing schedule, hosting operations gate, 권한 필터, reindex 체크리스트가 함께 보이는 프리미엄 기술 편집형 hero 이미지. 검색 엔진 추천 과장이 아니라 운영 검토와 안전 게이트 중심으로 표현한다. 공식 Meilisearch 로고, 실제 화면 캡처, 고객 데이터, 비공개 문서, 순위 보장 표현은 제외한다. 색상은 dark navy, charcoal, teal, soft cyan, warm amber. 실제 브랜드나 서비스 화면이 아닌 추상 업무 시각화로 구성하고 이미지 안의 글자는 최소화한다.

## Provider Prompt (English)
Create a premium Biz2Lab editorial hero visual for a Korean business article about Meilisearch search-index automation. Show blog cards, document cards, catalog cards, a search index pipeline, a search result panel, indexing schedule, hosting operations gate, permission filter, and reindex checklist. The tone is a cautious operations review, not a blind recommendation. Use dark navy, charcoal, teal, soft cyan, and warm amber. No official Meilisearch logo, no third-party logos, no copied UI screenshots, no private data, no ranking guarantee, no placeholder graphics.

## Negative Prompt
watermark, real logo, 브랜드 로고, photo-realistic people, 사람 얼굴, packaging photo, Amazon, ecommerce storefront, real company name, private data, fake screenshot, copyrighted character, external URL, hotlinked image, cluttered UI, unreadable small text, generic workflow label, stock photo

## Filename And Paths
- filename: meilisearch-blog-product-search-automation-hero.png
- future rawPath: assets/images/raw/meilisearch-search-index-automation-hero.png
- future optimizedPath: public/images/posts/meilisearch-search-index-automation-hero.webp

## Alt Text
Meilisearch 검색 인덱스 자동화를 블로그와 카탈로그 운영 관점에서 검토하는 대표 이미지

## Caption
검색 인덱스, 권한 필터, 재색인, 호스팅 운영 게이트를 함께 보여주는 Meilisearch 검토 이미지입니다.

## Manifest Draft
```json
{
  "id": "meilisearch-search-index-automation-hero",
  "project": "biz2lab",
  "postSlug": "meilisearch-blog-product-search-automation",
  "usage": "hero",
  "src": "/images/posts/meilisearch-search-index-automation-hero.webp",
  "rawPath": "assets/images/raw/meilisearch-search-index-automation-hero.png",
  "altKo": "Meilisearch 검색 인덱스 자동화를 블로그와 카탈로그 운영 관점에서 검토하는 대표 이미지",
  "captionKo": "검색 인덱스, 권한 필터, 재색인, 호스팅 운영 게이트를 함께 보여주는 Meilisearch 검토 이미지입니다.",
  "width": 1200,
  "height": 675,
  "format": "webp",
  "licenseStatus": "local-prompt-package",
  "commerceAutoReusable": true,
  "status": "planned"
}
```

## Article Update Plan
- 실제 이미지 승인 후 frontmatter heroImage 후보: /images/posts/meilisearch-search-index-automation-hero.webp
- 실제 이미지 승인 후 frontmatter heroAlt 후보: Meilisearch 검색 인덱스 자동화를 블로그와 카탈로그 운영 관점에서 검토하는 대표 이미지
- 현재 단계에서는 기사 파일을 수정하지 않는다.
- 적용 전 optimized WebP 파일 존재 여부와 시각 검수를 먼저 확인한다.

## Manual Creation Instructions
- Use only the local Codex-generated artifact workflow or another explicitly approved local image tool.
- Keep the negative prompt rules active: no logos, people/faces, packaging imagery, Amazon/ecommerce storefront imagery, private data, fake screenshots, hotlinks, or copyrighted characters.
- Do not create or import production raw/public files in this prompt-package step.
- Future raw image path after approval: assets/images/raw/meilisearch-search-index-automation-hero.png.
- Future optimized image path after approval: public/images/posts/meilisearch-search-index-automation-hero.webp.
- Do not mutate article files unless the optimized local WebP exists and publication is explicitly requested.

## Validation Checklist
- 외부 이미지 URL 없음
- 실제 로고, 사람 얼굴, 고객 데이터, 비공개 문서 없음
- 이미지 내 텍스트는 최소화
- raw/public production image files are not created in this step
- npm run audit:image-briefs
- npm run audit:image-prompts
- npm run validate:images

## Validation Commands
```bash
npm run validate:images
npm run audit:image-briefs
npm run audit:image-prompts
```
