# Biz2Lab Image Prompt Package

## Source
- slug: free-open-source-automation-tools-series
- title: 무료 오픈소스 자동화 도구 실전 분석: 소상공인·블로거·SaaS 운영자를 위한 도구 지도
- category: automation
- usage: hero
- outputMode: prompt-only

## Image Goal
Create a safe, premium Biz2Lab hero image package for the article without calling an external API or replacing production images in this step.

## Article Context
- articleTitle: 무료 오픈소스 자동화 도구 실전 분석: 소상공인·블로거·SaaS 운영자를 위한 도구 지도
- categoryStyle: 무료 자동화 도구를 콘텐츠, 업무, 데이터 자산화 흐름으로 연결해 보는 시리즈 허브
- visualDifferentiationHint: 단순 도구 목록이 아니라 반복 업무와 데이터가 Biz2Lab / MyBiz 자동화 자산으로 모이는 구조를 보여준다.

## Recommended Image Type
Premium SaaS/editorial business illustration with a 16:9 automation tool map, minimal in-image text, and no official brand marks.

## Image Brief
여러 자동화 노드가 하나의 도구 지도처럼 연결되고, 블로그 콘텐츠, 영상 제작, 고객관리, 데이터베이스, 업무 리포트가 Biz2Lab / MyBiz 자동화 허브로 모이는 대표 이미지.

## Provider Prompt (Korean)
Biz2Lab 자동화 시리즈를 위한 16:9 프리미엄 편집형 대표 이미지. 여러 자동화 노드가 하나의 도구 지도로 연결된다. 좌측에는 블로그 콘텐츠, 영상 제작, 고객관리, 데이터베이스, 업무 리포트 카드가 있고 중앙에는 Biz2Lab과 MyBiz 자동화 허브가 있으며 우측에는 셀프호스팅, 라이선스 확인, 데이터 소유권, AI 흐름 카드가 정돈되어 있다. 화면 안 텍스트는 '무료 오픈소스 자동화 도구 실전 분석'과 '콘텐츠·업무·데이터 자동화를 내 자산으로 만드는 도구 지도'만 사용한다. 특정 서비스 로고, 실제 앱 화면 복제, 사람 얼굴, 개인정보, 과장 광고 느낌, 워터마크는 넣지 않는다. 밝고 신뢰감 있는 Korean B2B SaaS/editorial 스타일, teal, navy, cyan, restrained amber 색상.

## Provider Prompt (English)
Create a 16:9 premium Biz2Lab editorial hero image for a Korean article series about free and open-source automation tools. Show an automation tool map with connected workflow nodes: blog content, video creation, customer management, database, business reports, self-hosting, license review, data ownership, and AI flow cards. Put a central Biz2Lab and MyBiz automation hub. Use only these Korean in-image texts: '무료 오픈소스 자동화 도구 실전 분석' and '콘텐츠·업무·데이터 자동화를 내 자산으로 만드는 도구 지도'. Avoid official service logos, copied real app screens, faces, private data, hype-style advertising, and watermarks.

## Negative Prompt
공식 로고, 실제 앱 화면 복제, 사람 얼굴, 개인정보, 고객 데이터, 워터마크, 외부 URL, 작은 글씨 과다, 특정 서비스 상표 강조, 과장 광고 배너

## Filename And Paths
- filename: free-open-source-automation-tools-series-hero.png
- rawPath: assets/images/raw/free-open-source-automation-tools-series-hero.png
- optimizedPath: public/images/posts/free-open-source-automation-tools-series-hero.webp

## Alt Text
무료 오픈소스 자동화 도구 지도를 Biz2Lab과 MyBiz 업무 흐름 관점에서 정리한 대표 이미지

## Caption
무료 자동화 도구를 콘텐츠, 업무, 데이터 자산화 흐름으로 연결해 보는 Biz2Lab 시리즈 대표 이미지입니다.

## Manifest Draft
```json
{
  "id": "free-open-source-automation-tools-series-hero",
  "project": "biz2lab",
  "postSlug": "free-open-source-automation-tools-series",
  "usage": "hero",
  "src": "/images/posts/free-open-source-automation-tools-series-hero.webp",
  "rawPath": "assets/images/raw/free-open-source-automation-tools-series-hero.png",
  "altKo": "무료 오픈소스 자동화 도구 지도를 Biz2Lab과 MyBiz 업무 흐름 관점에서 정리한 대표 이미지",
  "captionKo": "무료 자동화 도구를 콘텐츠, 업무, 데이터 자산화 흐름으로 연결해 보는 Biz2Lab 시리즈 대표 이미지입니다.",
  "width": 1200,
  "height": 630,
  "format": "webp",
  "licenseStatus": "local-prompt-package",
  "commerceAutoReusable": true,
  "status": "planned"
}
```

## Article Update Plan
- 실제 이미지 승인 후 frontmatter heroImage 후보: /images/posts/free-open-source-automation-tools-series-hero.webp
- 실제 이미지 승인 후 frontmatter heroAlt 후보: 무료 오픈소스 자동화 도구 지도를 Biz2Lab과 MyBiz 업무 흐름 관점에서 정리한 대표 이미지
- 현재 글은 noindex draft 상태이며 public hero WebP가 생성되기 전까지 published로 전환하지 않는다.

## Manual Creation Instructions
- Use this prompt only after explicit image generation approval.
- Keep the negative prompt rules active: no official logos, no copied real UI, no people or faces, no private data, no watermarks.
- Save the raw image to assets/images/raw/free-open-source-automation-tools-series-hero.png.
- Optimize to public/images/posts/free-open-source-automation-tools-series-hero.webp only after manual review.

## Validation Checklist
- 외부 이미지 URL 없음
- 공식 로고와 실제 서비스 UI 복제 없음
- 사람 얼굴과 개인정보 없음
- 이미지 내부 텍스트 최소화
- assets/images/raw 원본과 public/images/posts WebP 경로 확인
- npm run validate:images

## Validation Commands
```bash
npm run validate:images
npm run audit:image-briefs
```
