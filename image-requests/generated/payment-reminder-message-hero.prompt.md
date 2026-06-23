# Biz2Lab Image Prompt Package

## Provider Prompt (Korean)
거래처 독촉 문자와 입금 안내문 초안이 검토, 승인, 발송 단계로 이어지는 hero 인라인 이미지. 초안, 검토, 승인, 발송 상태가 보이되 실제 회사명, 고객명, 로고, 개인정보는 넣지 않는다. 작은 글자를 많이 넣지 말고 표, 카드, 화살표, 상태 칩을 사용한다.

## Provider Prompt (English)
Create a safe Biz2Lab inline hero image for payment reminder message approval. Use workflow cards, status chips, and clear operational structure. Avoid logos, people, private data, fake screenshots, and tiny unreadable text.

## Negative Prompt
실제 로고, 실명, 고객 정보, 계좌 정보, 카드 정보, 사람 얼굴, 외부 URL, 워터마크, 읽기 어려운 작은 글자

## Alt Text
거래처 독촉 문자와 입금 안내문 초안을 검토하고 승인 후 발송하는 메시지 승인 흐름

## Caption
거래처 안내문을 초안, 검토, 승인, 발송 단계로 나누어 표현한 이미지입니다.

## Output Paths
- rawPath: assets/images/raw/payment-reminder-message-hero.svg
- optimizedPath: public/images/posts/payment-reminder-message-hero.webp

## Validation
- localOnly: true
- outputMode: prompt-only
- no external image URL
- no private data
