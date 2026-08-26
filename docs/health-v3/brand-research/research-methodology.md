# 연구 방법론

상태: `PRELIMINARY_NOT_LEGAL_OPINION`

## 판단 순서

1. 의사·병원·정부·진단·처방을 암시하는 후보를 언어 단계에서 제외했다.
2. 60개 후보를 발음, 기억성, 가족 친화성, 비의료 편집 정체성, 확장성으로 20개까지 줄였다.
3. 남은 10개에 대해 공개 검색, `.com` DNS/RDAP/HTTPS, 가능한 경우 public archive indicator를 확인했다.
4. KIPRIS와 WIPO Global Brand Database의 역할과 한계를 기록했다. 후보별 KIPRIS 결과를 자동으로 해석하거나 CAPTCHA를 우회하지 않았다.
5. 상표·등록원·사람 발음 테스트가 끝나기 전에는 final brand를 선택하지 않는다.

## 증거 구분

| 구분 | 이 패키지에서 의미하는 것 | 의미하지 않는 것 |
|---|---|---|
| `SEARCH_CONFUSION_*` | 공개 웹 검색에서 관찰된 경쟁·혼동 신호 | 상표 충돌 또는 법적 결론 |
| `TRADEMARK_HUMAN_VERIFICATION_REQUIRED` | KIPRIS에서 사람의 정확·유사·상품류 검색이 필요함 | 상표 부재 또는 등록 가능 |
| `DOMAIN_APPEARS_AVAILABLE_UNCONFIRMED` | `.com` RDAP 404, DNS 미해결, HTTPS 접속 실패라는 관찰 | 구매 가능, 소유 또는 history 안전 |
| `DOMAIN_HUMAN_REGISTRAR_CHECK_REQUIRED` | `.kr`·`.co.kr` 등 등록원 확인이 남음 | 사용 불가 또는 사용 가능 |

## 관련 서비스 영역

정확한 지정상품·서비스는 출원 전략과 실제 사업 내용에 따라 달라진다. 현재 제품 형태에 비추어 출판·교육, 온라인 정보 제공, 소프트웨어/디지털 서비스 관련 범위를 KIPRIS 분류 입력도우미와 전문가가 함께 확인해야 한다. Nice Classification은 상품·서비스 분류 체계이며 현재 판본과 실제 지정문구를 별도로 확인한다.

## 재현 한계

- KIPRIS는 상표명칭, 출원인, 상품분류 등을 포함해 검색할 수 있지만, 후보별 유사 판단은 사람이 실제 결과와 상품류를 검토해야 한다.
- WIPO Global Brand Database는 여러 국제·국가 컬렉션을 제공하지만 national register 검색도 권고한다.
- 검색엔진 결과는 지역·개인화·색인 상태에 따라 바뀐다. Naver, Bing, YouTube, 앱스토어는 사람이 별도 확인한다.
