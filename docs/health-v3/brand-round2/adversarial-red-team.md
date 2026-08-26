# Adversarial Red-Team

| 후보 | 거절하려 한 지점 | 결과 |
|---|---|---|
| 하도림 | clinic/공공기관 어감, exact mark, Roman 오타, AI 느낌 | 강한 clinic·공공 의미 없음; exact KIPRIS 0. 유사표장과 사람 발음은 보류. **조건부 생존** |
| 아노림 | 제약품처럼 들리는지, 사전 단어인지, spelling 혼선 | provider 의미 없음; exact KIPRIS 0. 의미 불투명성은 tag line으로만 보완 가능. **조건부 생존** |
| 오누림 | 유아·돌봄 서비스/사람 이름처럼 보이는지 | 의료·정부 의미 없음; exact KIPRIS 0. 어린이 사이트 오해는 reader test hard question. **조건부 생존** |
| 로아든 | `루아든` 계열과 혼동, 철자 기억성 | .com pre-screen은 양호하나 음절-family redundancy. **reserve** |
| 누아림 | 개인 이름/상담 서비스로 읽히는지 | exact 0이나 사람 이름 연상. **reserve** |
| 유로담 | pharma 또는 foreign-company 느낌 | domain signal은 양호하나 전문적·차가운 인상. **hold** |
| 레노움/네아론/다루온 | active `.com` 사용 또는 domain coupling | **reject from final three** |

공통 hard stop: exact KIPRIS 0은 음성·관념·지정상품 유사 0을 뜻하지 않는다. final selection 전 수동 유사표장·NICE 입력도우미·IP 전문가 검토가 필요하다.
