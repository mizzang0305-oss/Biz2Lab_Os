# Gyeotsalpim 자동 공개 조회 스크린

상태: `HUMAN_IP_PROFESSIONAL_REVIEW_REQUIRED`

기준일: 2026-08-24 KST

## 범위와 한계

이 문서는 `곁살핌`을 비의료 건강정보 편집·온라인 교육형 콘텐츠 후보로 검토하면서 수행한 **공개·읽기 전용 자동 화면 확인**을 요약한다. 등록 가능성, 표장 유사성, 지정서비스 유사성, 선행권리, 도메인 사용 가능성에 관한 법률 의견이나 확정 판단이 아니다.

- 원본 화면·CSV·해시는 로컬 비커밋 증거 묶음 `reports/local/health-v3-brand-clearance/20260824-003046-KST/`에만 있다.
- CAPTCHA·로그인·차단은 우회하지 않았다. Google은 CAPTCHA/429 화면에서 중단했다.
- 검색 결과의 생성형 요약은 정확성을 보장하지 않으므로, 문맥 관찰 외의 근거로 사용하지 않았다.
- 도메인 DNS 미해결 또는 RDAP 404는 등록 가능·권리 무부재·과거 사용 부재를 뜻하지 않는다.

## KIPRIS 관찰

공식 KIPRIS 상표 검색에서 `곁살핌`, `곁 살핌`, 파생 한글 표기 4개, 로마자 표기 3개는 각각 0건으로 표시되었다. 그러나 구성요소 `살핌` 검색은 6건을 표시했고, 다음 두 출원은 현재 계획과의 관계를 사람이 해석해야 하는 관찰 항목이다.

| 표장 | 출원번호 | 표시 상태 | 류 | 화면에서 보인 관련 서비스 범위 | 자동 분류 |
|---|---:|---|---:|---|---|
| `살핌 (SALPIM)` | 4020260134099 | 출원 | 41 | 심리상담 관련 강의·교육·연구, 온라인 교육·자문 등 | `POTENTIAL_CLASS_41_OVERLAP_HUMAN_IP_REVIEW` |
| `살핌 (SALPIM)` | 4020260134100 | 출원 | 44 | 개인·집단 심리상담, 고령자 심리상담, 생활상담, 심리 분석·검사·진단·치료 등 | `POTENTIAL_HEALTH_CONTEXT_OVERLAP_HUMAN_IP_REVIEW` |

두 항목은 `곁살핌`과 동일 표장이 아니며, 화면상 “출원”으로 표시된 항목이다. 따라서 자동 조회만으로 충돌 여부나 최종 결과를 단정할 수 없다. 특히 Class 41은 초기 비의료 온라인 교육형 정보 제공과의 서비스 설명을, Class 44는 의료·상담으로 오인되지 않도록 브랜드 사용 문맥을 각각 전문가가 검토해야 한다.

## 공개 검색 문맥

Naver의 `곁살핌` 관련 검색은 정확한 단일 상호보다 안부 확인·돌봄·정신건강복지센터·지방정부·복지서비스의 문맥을 많이 반환했다. `곁살핌 돌봄` 화면의 AI 브리핑과 광고 영역은 검색 엔진 생성·키워드 연관 표시일 뿐, 특정 상표나 사업자 존재의 증거가 아니다. 다만 브랜드가 의료기관·공공 돌봄 서비스로 오인될 수 있는 문맥 위험은 사람의 브랜드 사용 검토 대상이다.

Bing과 YouTube는 정확 표장 검색에서 무관하거나 토큰 분해된 결과가 많아, 부재 판단 근거로 쓰지 않았다. Apple App Store 공개 검색 URL은 두 표기 모두 404 화면을 반환하여 앱 충돌 조사는 미완료 상태다.

## 도메인 관찰

| 후보 | 관찰 | 자동 결론 |
|---|---|---|
| `gyeotsalpim.com` | Verisign RDAP 경로 404, DNS 및 HTTP/HTTPS 미해결, Internet Archive CDX 유효 질의는 빈 배열 | `HUMAN_REGISTRAR_AND_RIGHTS_CHECK_REQUIRED` |
| `gyeotsalpim.kr` | DNS 및 HTTP/HTTPS 미해결, KISA WHOIS 자동 화면에 결과 미표시 | `HUMAN_REGISTRAR_AND_RIGHTS_CHECK_REQUIRED` |
| `gyeotsalpim.co.kr` | DNS 및 HTTP/HTTPS 미해결, KISA WHOIS 자동 화면에 결과 미표시 | `HUMAN_REGISTRAR_AND_RIGHTS_CHECK_REQUIRED` |

## 현재 보류 지점

1. 변리사 또는 상표 전문가는 `살핌 (SALPIM)`의 Class 41·44 출원과 `곁살핌`의 외관·호칭·관념 및 실제 지정서비스의 중첩을 해석해야 한다.
2. 브랜드 사용 시 비의료 건강정보 편집이라는 성격을 명확히 하고, 공공 돌봄·의료기관·상담서비스 제공자로 오인될 표현을 별도로 검토해야 한다.
3. 실제 도메인 등록 전에는 원하는 등록기관에서 `.com`, `.kr`, `.co.kr`의 등록 상태·권리·가격·약관을 사람이 확인해야 한다. 이 단계에서는 구매·등록·DNS 변경을 수행하지 않는다.

## 공식 분류 참고

- [WIPO Nice Class 41, 13th edition 2026](https://nclpub.wipo.int/esen/pdf-download.pdf?classNumber=41&dateInForce=20260101&lang=en&tab=&viewMode=flat)
- [WIPO Nice Class 9, 13th edition 2026](https://nclpub.wipo.int/esen/pdf-download.pdf?classNumber=9&dateInForce=20260101&lang=en&tab=&viewMode=flat)
- [WIPO Nice Class 16, 13th edition 2026](https://nclpub.wipo.int/esen/pdf-download.pdf?classNumber=16&dateInForce=20260101&lang=en&tab=&viewMode=flat)
- [WIPO Nice Class 42, 13th edition 2026](https://nclpub.wipo.int/esen/pdf-download.pdf?classNumber=42&dateInForce=20260101&lang=en&tab=&viewMode=flat)
- [WIPO Nice Class 44, 13th edition 2026](https://nclpub.wipo.int/esen/pdf-download.pdf?classNumber=44&dateInForce=20260101&lang=en&tab=&viewMode=flat)
- [KIPRIS](https://www.kipris.or.kr/)
- [KISA WHOIS](https://whois.kr/)
