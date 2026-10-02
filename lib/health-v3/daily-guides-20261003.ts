import type { HealthSupportGuide } from "./support-guides";

// Original educational prose. No affiliate offers, personal cases or clinical review claims.
export const dailyGuides20261003: HealthSupportGuide[] = [
  {
    slug: "health-claim-before-forwarding",
    title: "건강 글을 보내기 전, 제목 대신 한 문장을 확인해 보세요",
    seoTitle: "건강정보 검증: 공유하기 전 원문·대상·근거 확인",
    description: "단체 대화방에 건강 글이 올라오면 ‘좋은 정보니까 보내야겠다’는 생각부터 들 수 있습니다. 공유 버튼을 누르기 전에, 그 글이 무엇을 주장하는지 한 문장만 골라 보세요. 제목의 확신과 원문의 근거가 같은 말을 하는지 확인하는 데서 시작합니다.",
    publishedAt: "2026-10-03", updatedAt: "2026-10-03", sourceCheckedAt: "2026-10-03",
    sections: [
      { id: "one-claim", title: "읽은 느낌을, 확인할 질문으로 바꿉니다", paragraphs: [
        "‘이 글은 믿을 만할까?’는 너무 큰 질문입니다. ‘누구에게 어떤 효과가 있다고 말하는가?’로 좁히면 확인할 곳이 보입니다. 아래 문장은 실제 제품이나 연구를 가리키지 않는 가상 연습 문구입니다.",
        "가상 제목: ‘이 습관만 하면 모두 좋아집니다.’ → 확인할 질문: 어떤 사람을 대상으로, 무엇이 달라졌으며, 그 말을 뒷받침하는 원문은 어디에 있나요?",
        "결론을 먼저 적지 말고 ‘확인됨’과 ‘아직 못 찾음’을 나눠 보세요. 원문을 못 찾은 상태를 곧바로 거짓이라고 판정할 필요도 없습니다. 다만 확인하지 않은 확신을 덧붙여 전달하지는 않습니다.",
      ] },
      { id: "follow-source", title: "기관 이름이 있으면, 그 기관의 글까지 가 봅니다", paragraphs: [
        "운영주체와 작성자의 자격, 작성·검토 날짜, 근거 링크, 광고나 후원 관계를 살펴봅니다. NIH의 정보평가 안내는 정보를 낸 곳과 원래 출처, 재정 지원을 구분해 확인하도록 설명합니다. 기관 로고가 보인다는 사실만으로 지금 문장을 그 기관이 확인했다고 생각하지 마세요.",
        "근거 링크를 열었다면 제목만 보지 말고 해당 주장과 연결되는 대목을 찾습니다. 글의 작성일과 인용한 자료의 날짜는 서로 다를 수 있습니다. 최근에 게시됐다는 이유만으로 근거도 새것이라고 판단하지 않습니다.",
      ], links: [{ href: "https://ods.od.nih.gov/HealthInformation/How_To_Evaluate_Health_Information_on_the_Internet_Questions_and_Answers.aspx", label: "NIH: 운영주체·원래 출처·후원·날짜 확인" }] },
      { id: "same-subject", title: "후기의 진심과 효과의 근거는 다른 질문입니다", paragraphs: [
        "후기가 사실이어도 같은 결과가 다른 사람에게 생긴다는 근거가 되지는 않습니다. MedlinePlus는 치료를 보장하는 표현을 경계하고, 연구가 사람에게서 이뤄졌는지, 참여자는 누구인지, 연구 유형과 지원 주체는 무엇인지 확인하도록 안내합니다.",
        "‘사람 대상 연구’라는 말을 발견해도 내 상황에 적용되는지는 별도 질문입니다. 연령이나 건강 상태, 평가한 결과가 글의 제목과 같은 범위인지 확인하세요. 온라인 글을 근거로 약을 시작·중단·변경하지 않고, 건강에 영향을 줄 결정을 하기 전 의료진과 상의합니다.",
      ], links: [{ href: "https://medlineplus.gov/evaluatinghealthinformation.html", label: "MedlinePlus: 건강정보와 연구 보도 평가" }] },
      { id: "finished-note", title: "오늘 남길 것은 점수가 아니라 확인 메모입니다", paragraphs: [
        "확인할 주장 ___ / 원문 주소 ___ / 원문의 대상 ___ / 확인한 날짜 ___ / 아직 모르는 점 ___. 개인정보나 검사 결과를 적지 않아도 되는 메모입니다. 이 화면에는 입력·저장 기능이 없습니다.",
        "공유가 필요하다면 ‘효과가 확실하대요’보다 ‘이 기관은 이 대상을 이렇게 설명합니다. 개인 적용은 의료진에게 확인할 부분입니다’처럼 확인한 범위만 전하세요. 불확실한 정보는 다시 보내지 않고 원문을 먼저 확인합니다.",
        "이 글도 같은 기준으로 살펴볼 수 있습니다. 작성자와 출처, 의료 검토의 현재 상태를 아래에서 확인하세요. 일반 건강정보 읽기 안내이며 진단과 치료를 대신하지 않습니다. 면허 의료인의 검수를 받지 않았습니다.",
      ], links: [{ href: "/health/trust/sources-policy", label: "오누림의 출처 선택 원칙 확인" }, { href: "/health/trust/medical-review-policy", label: "의료 검토의 실제 상태 확인" }] },
    ],
    sources: [
      { id: "ODS_EVALUATE", organization: "NIH Office of Dietary Supplements", title: "How To Evaluate Health Information on the Internet: Questions and Answers", url: "https://ods.od.nih.gov/HealthInformation/How_To_Evaluate_Health_Information_on_the_Internet_Questions_and_Answers.aspx", sourceDate: "2022-05-04", retrievedAt: "2026-10-03" },
      { id: "NLM_EVALUATE", organization: "미국 국립의학도서관 MedlinePlus", title: "Evaluating Health Information", url: "https://medlineplus.gov/evaluatinghealthinformation.html", sourceDate: "2024-02-26", retrievedAt: "2026-10-03" },
    ],
  },
  {
    slug: "soap-or-sanitizer-different-jobs",
    title: "손소독제를 썼으니, 흙 묻은 손도 씻은 걸까요?",
    seoTitle: "손씻기와 손소독제: 흙·기름·물 없는 상황 구분",
    description: "손소독제가 마르면 손이 깨끗해진 느낌이 듭니다. 하지만 화분을 만진 뒤 손에 남은 흙이나 음식의 기름까지 그 느낌으로 판단할 수는 없습니다. 손의 상태와 물·비누를 쓸 수 있는지를 먼저 나누면, 두 방법을 같은 것으로 생각하는 실수를 줄일 수 있습니다.",
    publishedAt: "2026-10-03", updatedAt: "2026-10-03", sourceCheckedAt: "2026-10-03",
    sections: [
      { id: "choose-situation", title: "‘더 강한 제품’보다 지금 손의 상태를 봅니다", paragraphs: [
        "CDC는 가능하면 물과 비누로 손을 씻도록 안내합니다. 눈에 띄게 더럽거나 기름진 손에서는 손소독제가 충분히 작용하지 않을 수 있습니다. 손소독제는 모든 종류의 미생물을 없애거나 모든 오염물질을 제거하는 방법이 아닙니다.",
      ], table: { caption: "일상 상황을 구분하는 메모 — 특정 제품의 성능 비교가 아닙니다", columns: ["지금 상황", "선택할 방향"], rows: [
        ["물과 비누를 사용할 수 있음", "물과 비누로 꼼꼼히 씻고 말리기"],
        ["눈에 보이는 흙이나 기름이 묻음", "손소독제로 씻기를 대신했다고 생각하지 않기; 물과 비누로 씻기"],
        ["물과 비누가 없고, 눈에 보이는 오염이 없음", "알코올 60% 이상 손소독제의 표시와 사용법 확인"],
      ] }, links: [{ href: "https://www.cdc.gov/clean-hands/data-research/facts-stats/hand-sanitizer-facts.html", label: "CDC: 손소독제로 대체하기 어려운 상황" }] },
      { id: "wash-and-dry", title: "30초를 세는 동안 놓치는 부위를 찾습니다", paragraphs: [
        "질병관리청 국가건강정보포털의 요약 안내는 물과 비누로 30초 이상 꼼꼼히 닦도록 권합니다. 손바닥만 문지르고 끝내지 말고 손등·손가락 사이·엄지·손끝까지 씻으세요. 흐르는 물에 헹군 뒤 물기를 말립니다.",
        "시간만 채우면 모든 부위가 저절로 닦이는 것은 아닙니다. 다음에 씻을 때는 ‘엄지를 문질렀나, 손끝도 닦았나, 말리기까지 끝냈나’를 떠올려 보세요. 집에서 균을 배양하거나 세척 효과를 시험할 필요는 없습니다.",
      ], links: [{ href: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6545", label: "질병관리청: 손씻기·건조와 놓치기 쉬운 부위" }] },
      { id: "label-not-recipe", title: "물·비누가 없을 때는 제품 표시를 읽습니다", paragraphs: [
        "손소독제를 사용할 상황이라면 알코올 함량이 60% 이상인지와 표시된 사용량·사용법을 확인합니다. 손의 모든 표면에 바르고 마를 때까지 문지릅니다. 마르기 전에 닦아 내지 않습니다. 소독제를 삼키지 않고 어린이는 어른의 감독 아래 사용하며, 손이 닿지 않는 곳에 보관합니다.",
        "알코올 함량의 숫자는 직접 제조하거나 여러 제품을 섞으라는 뜻이 아닙니다. 이 글은 제조·희석법이나 특정 상품을 권하지 않습니다. 필요한 물과 비누가 없다면 손소독제를 만능 대체품으로 생각하기보다 손을 씻을 수 있는 장소를 함께 찾으세요.",
      ], links: [{ href: "https://www.cdc.gov/clean-hands/data-research/facts-stats/hand-sanitizer-facts.html", label: "CDC: 함량·사용법·보관 주의" }] },
      { id: "last-step", title: "오늘의 점검은 세 가지면 충분합니다", bullets: [
        "흙·기름이 보이는가?", "물과 비누를 사용할 수 있는가?", "씻거나 문지른 뒤, 말리기까지 끝냈는가?",
      ], paragraphs: ["손위생은 감염 위험을 줄이는 생활 습관이며 감염을 완전히 막는 보장은 아닙니다. 일반 건강정보이며 개인의 진단과 치료를 대신하지 않습니다. 면허 의료인의 검수를 받지 않았습니다."] },
    ],
    sources: [
      { id: "KDCA_HANDS", organization: "질병관리청 국가건강정보포털", title: "손씻기", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6545", sourceDate: "2026-04-15", retrievedAt: "2026-10-03" },
      { id: "CDC_SANITIZER", organization: "미국 질병통제예방센터 CDC", title: "Hand Sanitizer Facts", url: "https://www.cdc.gov/clean-hands/data-research/facts-stats/hand-sanitizer-facts.html", sourceDate: "2024-04-17", retrievedAt: "2026-10-03" },
    ],
  },
  {
    slug: "hearing-sound-and-words",
    title: "소리는 들리는데 말이 잘 안 들릴 때, 청력검사에서 물어볼 것",
    seoTitle: "청력검사 준비: 순음·말소리 검사와 대화환경",
    description: "TV 소리가 들리는지와 여러 사람이 이야기할 때 말을 알아듣는지는 같은 질문이 아닙니다. ‘볼륨만 올리면 되겠지’에서 멈추기보다, 어떤 상황에서 어떤 말이 어려웠는지 짧게 설명해 보세요. 검사표의 숫자와 실제 대화의 어려움을 함께 묻는 준비입니다.",
    publishedAt: "2026-10-03", updatedAt: "2026-10-03", sourceCheckedAt: "2026-10-03",
    sections: [
      { id: "sudden-first", title: "갑자기 청력이 떨어졌다면 기록보다 즉시 진료가 먼저입니다", tone: "warning", paragraphs: [
        "갑자기 한쪽 또는 양쪽 귀의 청력이 떨어졌다면 귀지나 감기 때문이라고 스스로 정하고 기다리지 마세요. NIDCD는 갑작스러운 청력저하를 응급으로 보고 즉시 의료진에게 진료받도록 안내합니다. 이 글을 끝까지 읽거나 관찰 메모를 완성하며 지체하지 않습니다.",
      ], links: [{ href: "https://www.nidcd.nih.gov/health/sudden-deafness", label: "NIDCD: 갑작스러운 청력저하의 즉시 진료 안내" }] },
      { id: "test-questions", title: "두 검사는 서로 다른 질문에 답합니다", paragraphs: [
        "MedlinePlus는 순음검사를 높낮이가 다른 소리에서 들을 수 있는 가장 작은 소리를 확인하는 검사로 설명합니다. 말소리검사에서는 들려주는 단어를 따라 말하며, 검사에 따라 배경 소음이 포함되기도 합니다. 실제 시행할 검사의 구성은 의료진에게 확인합니다.",
      ], table: { caption: "검사 이름을 진료 질문으로 바꿔 보기 — 결과 판정표가 아닙니다", columns: ["들어 본 검사 이름", "물어볼 질문"], rows: [
        ["순음검사", "소리의 높낮이에 따라 들리는 정도가 어떻게 다른가요?"],
        ["말소리검사", "단어를 알아듣는 결과는 어떤 조건에서 측정했나요?"],
      ] }, links: [{ href: "https://medlineplus.gov/lab-tests/hearing-tests-for-adults/", label: "MedlinePlus: 성인 청력검사의 종류와 과정" }] },
      { id: "conversation-scene", title: "‘잘 안 들려요’ 옆에 장소 하나를 붙입니다", paragraphs: [
        "아래는 실제 환자의 사례가 아닌 가상 표현 연습입니다.",
        "‘소리가 작아요’ → ‘조용한 방에서는 대화가 되지만 TV가 켜져 있으면 상대의 단어를 자주 놓칩니다.’",
        "‘항상 못 알아들어요’ → ‘여러 사람이 동시에 말할 때 어렵습니다. 언제부터인지와 한쪽·양쪽의 차이는 확인이 필요합니다.’",
        "본인에게 없던 증상을 예시에 맞춰 만들지 마세요. 실제로 어려웠던 환경과 변화한 시점만 의료진에게 전합니다. 숫자 하나로 병명이나 보청기 필요 여부를 자가판정하지 않습니다.",
      ] },
      { id: "change-environment", title: "함께 말하는 사람도 환경을 바꿀 수 있습니다", bullets: [
        "TV 등 배경 소음을 줄이고, 서로 얼굴을 볼 수 있게 앉습니다.",
        "소리를 지르기보다 분명하게 말합니다. 여러 사람이 있다면 한 사람씩 이야기해 보세요.",
        "못 들은 대목은 ‘어느 말부터 다시 말씀드릴까요?’라고 묻고, 상대가 원하는 속도와 방법을 확인합니다.",
      ], paragraphs: [
        "NIDCD는 상대의 얼굴을 보고 이야기하기, 배경 소음 줄이기, 소리 지르지 않기를 안내합니다. 환경을 바꾸는 것은 진료를 대신하지 않습니다. 계속되는 어려움은 의료진에게 상담하고, 갑작스러운 변화라면 위의 즉시 진료 안내가 먼저입니다.",
        "일반 건강정보이며 개인의 진단과 치료를 대신하지 않습니다. 면허 의료인의 검수를 받지 않았습니다.",
      ], links: [{ href: "https://www.nidcd.nih.gov/health/age-related-hearing-loss", label: "NIDCD: 가족·친구가 대화를 도울 방법" }, { href: "/health/guides/appointment-questions", label: "진료에서 물어볼 질문 준비" }] },
    ],
    sources: [
      { id: "NIDCD_SUDDEN", organization: "미국 국립난청·의사소통장애연구소 NIDCD", title: "Sudden Deafness", url: "https://www.nidcd.nih.gov/health/sudden-deafness", sourceDate: "2018-09-14", retrievedAt: "2026-10-03" },
      { id: "NLM_HEARING", organization: "미국 국립의학도서관 MedlinePlus", title: "Hearing Tests for Adults", url: "https://medlineplus.gov/lab-tests/hearing-tests-for-adults/", sourceDate: "2023-10-25", retrievedAt: "2026-10-03" },
      { id: "NIDCD_AGE", organization: "미국 국립난청·의사소통장애연구소 NIDCD", title: "Age-Related Hearing Loss", url: "https://www.nidcd.nih.gov/health/age-related-hearing-loss", sourceDate: "2023-03-17", retrievedAt: "2026-10-03" },
    ],
  },
  {
    slug: "vaccination-record-not-found",
    title: "성인 접종기록이 조회되지 않으면, 안 맞았다는 뜻일까요?",
    seoTitle: "성인 예방접종기록 누락: 조회·원본·기억 구분",
    description: "맞았던 것 같은데 예방접종 내역에는 보이지 않습니다. 이때 기억만으로 ‘접종 완료’라고 적거나, 빈 화면만 보고 ‘미접종’이라고 정하면 확인할 과정이 사라집니다. 조회 결과와 접종 사실을 나눠 두고, 기록을 찾을 다음 곳을 정해 보세요.",
    publishedAt: "2026-10-03", updatedAt: "2026-10-03", sourceCheckedAt: "2026-10-03",
    sections: [
      { id: "missing-record", title: "조회 화면의 빈칸은 접종 여부의 최종 판정이 아닙니다", paragraphs: [
        "질병관리청 예방접종도우미는 전산등록된 기록을 조회하는 서비스입니다. 공식 기록찾기 안내에는 접종했지만 확인되지 않는 경우, 접종기관에 누락 기록의 전산등록이나 등록 가능 여부를 문의하는 절차가 설명돼 있습니다. 조회되지 않는다는 사실만으로 미접종이라고 단정하지 않습니다.",
        "본인 내역 조회에는 로그인·본인 확인이 필요할 수 있습니다. 이 글에서 대신 조회하거나 인증정보를 받지 않습니다. 공식 사이트에서 직접 확인하고 주민등록번호나 접종증명서 사진을 댓글·공개 게시판에 올리지 마세요.",
      ], links: [{ href: "https://nip.kdca.go.kr/irhp/mngm/goVcntMngm.do?menuCd=32&menuLv=3", label: "예방접종도우미: 본인 내역 조회와 기록찾기 안내" }] },
      { id: "three-piles", title: "기록을 ‘확인한 것·기억하는 것·확인할 것’으로 나눕니다", table: { caption: "가상 분류 예시 — 실제 사람의 접종 이력이 아닙니다", columns: ["현재 가진 정보", "메모할 상태"], rows: [
        ["발급기관·접종명이 적힌 원본 증명서", "원본에서 확인한 항목과 확인한 날짜"],
        ["몇 년 전 맞았던 것 같다는 기억", "기억일 뿐, 접종명·날짜 확인 필요"],
        ["조회 화면에서 찾지 못한 접종", "전산 미조회; 접종기관에 확인할 것"],
      ] }, paragraphs: [
        "이 분류는 접종 여부를 인증하는 양식이 아닙니다. 기억이 불분명한 날짜를 정확한 날짜처럼 바꾸거나, 빈칸을 임의로 채우지 않습니다. 원본이 있으면 발급기관과 기재 내용을 그대로 확인할 준비를 하세요.",
      ] },
      { id: "next-place", title: "다음 확인 장소를 한 곳 정합니다", paragraphs: [
        "접종한 기관을 안다면 ‘접종기록을 확인하거나 증명서를 발급받을 수 있는지, 전산등록 가능 여부는 어떻게 확인하는지’를 문의합니다. 기관이 폐업했다면 관할 보건소에 기록 확인 경로를 문의할 수 있습니다. 기록이 언제나 남아 있거나 반드시 복원된다고 보장할 수는 없습니다.",
        "공식 등록사업 안내는 접종기록이 여러 기관에 나뉘어 관리돼 왔다는 배경을 설명합니다. 기록을 찾는 일과 어떤 접종이 필요한지 결정하는 일은 구분하세요. 미국의 접종 일정표를 국내 성인의 개인 일정으로 그대로 옮기지 않습니다.",
      ], links: [{ href: "https://nip.kdca.go.kr/irhp/mngm/goVcntMngm.do?menuCd=32&menuLv=3", label: "예방접종도우미: 누락·폐업기관의 기록 문의 경로" }, { href: "https://nip.kdca.go.kr/irhp/infm/goVcntInfo.do?menuCd=137&menuLv=1", label: "질병관리청: 예방접종 등록사업의 목적" }] },
      { id: "clinical-question", title: "진료에는 빈칸을 숨기지 않고 가져갑니다", paragraphs: [
        "의료진에게는 ‘이 항목은 원본에서 확인했고, 이 항목은 기억만 있으며, 이 접종은 조회되지 않았습니다. 무엇을 더 확인해야 하나요?’라고 물을 수 있습니다. 확인한 자료와 아직 모르는 점을 함께 가져가세요.",
        "조회가 안 된다는 이유로 스스로 재접종을 정하거나 필요한 접종을 생략하지 않습니다. 실제 접종 계획은 기록과 건강 상태를 의료진이 확인해 판단합니다. 이 글은 특정 백신·횟수·간격을 정해 주지 않습니다.",
        "오늘 마칠 일은 접종 완료를 선언하는 것이 아니라, 확인되지 않은 한 항목과 다음 문의처를 정하는 것입니다. 일반 건강정보이며 개인의 진단과 치료를 대신하지 않습니다. 면허 의료인의 검수를 받지 않았습니다.",
      ], links: [{ href: "/health/guides/appointment-questions", label: "확인하지 못한 내용을 진료 질문으로 정리" }] },
    ],
    sources: [
      { id: "KDCA_RECORD", organization: "질병관리청 예방접종도우미", title: "본인 예방접종 관리·예방접종 기록찾기", url: "https://nip.kdca.go.kr/irhp/mngm/goVcntMngm.do?menuCd=32&menuLv=3", sourceDate: "공식 페이지에 문서 날짜 미표시", retrievedAt: "2026-10-03" },
      { id: "KDCA_REGISTER", organization: "질병관리청 예방접종도우미", title: "예방접종 등록사업", url: "https://nip.kdca.go.kr/irhp/infm/goVcntInfo.do?menuCd=137&menuLv=1", sourceDate: "2024-01-10", retrievedAt: "2026-10-03" },
    ],
  },
  {
    slug: "eye-exam-and-trip-home",
    title: "안과에서 시력만 재는 줄 알았는데, 귀가 준비도 필요한가요?",
    seoTitle: "안과검사 준비: 시력·시야·안압·산동과 귀가",
    description: "안과 예약을 잡을 때 ‘글자를 읽는 검사겠지’라고 생각하면, 검사 뒤 이동 계획은 놓치기 쉽습니다. 시력·시야·안압·산동은 살펴보는 내용이 다릅니다. 내 예약에 어떤 검사가 포함될지 묻고, 산동검사가 예정돼 있다면 귀가 방법도 함께 확인해 보세요.",
    publishedAt: "2026-10-03", updatedAt: "2026-10-03", sourceCheckedAt: "2026-10-03",
    sections: [
      { id: "different-tests", title: "잘 보이는지, 옆쪽도 보이는지, 안쪽은 어떤지", paragraphs: [
        "미국 국립안연구소 NEI는 안과검사의 여러 과정을 구분해 설명합니다. 아래는 용어를 알아보기 위한 요약이며, 모두에게 같은 검사를 시행한다는 뜻은 아닙니다. 개인별 검사 구성은 의료진에게 확인하세요.",
      ], table: { caption: "검사별로 살펴보는 내용 — 정상 수치나 자가진단 기준이 아닙니다", columns: ["검사", "살펴보는 내용"], rows: [
        ["시력검사", "가까이·멀리 있는 글자 등을 얼마나 선명하게 보는지"],
        ["시야검사", "정면을 보는 동안 주변 방향의 대상이 보이는지"],
        ["안압검사", "눈 안의 압력"],
        ["산동검사", "안약으로 동공을 넓혀 눈 안쪽을 살펴보기"],
      ] }, links: [{ href: "https://www.nei.nih.gov/eye-health-information/healthy-vision/finding-eye-doctor/get-dilated-eye-exam", label: "NEI: 안과검사의 구성과 산동 과정" }] },
      { id: "not-one-score", title: "시력 숫자 하나로 검사가 끝났다고 생각하지 않습니다", paragraphs: [
        "글자를 잘 읽는 정도와 다른 검사에서 확인하는 내용은 서로 다릅니다. 예약 때는 ‘오늘 산동검사가 포함될 수 있나요? 검사 전 준비와 검사 뒤 주의사항은 무엇인가요?’라고 물을 수 있습니다.",
        "검사 이름을 안다고 눈 질환을 스스로 판정할 수는 없습니다. 검사표의 한 항목을 인터넷의 숫자와 비교해 전체 눈 상태가 괜찮다고 결론 내리지 마세요. 결과 설명과 다음 검사 계획은 의료진에게 확인합니다.",
      ] },
      { id: "trip-home", title: "산동이 예정됐다면, 예약표 옆에 귀가 방법을 적습니다", paragraphs: [
        "NEI는 산동검사 뒤 몇 시간 동안 시야가 흐리거나 빛에 민감할 수 있으며, 다른 사람이 운전해 집에 데려다주도록 준비하라고 안내합니다. 선글라스가 있다면 가져가는 것도 빛 민감에 도움이 될 수 있습니다.",
        "직접 운전해 돌아올 계획으로 고정하지 말고, 동행이나 대체 교통편을 미리 정합니다. 정확히 언제 다시 운전할 수 있는지 이 글에서 시간을 정하지 않습니다. 검사기관의 안내를 확인하고, 흐리거나 불편한 상태에서 운전하지 마세요.",
      ], links: [{ href: "https://www.nei.nih.gov/eye-health-information/healthy-vision/finding-eye-doctor/get-dilated-eye-exam", label: "NEI: 산동 뒤 흐림·빛 민감과 귀가 준비" }] },
      { id: "reservation-note", title: "예약 메모를 이렇게 바꿔 보세요", paragraphs: [
        "가상 준비 메모입니다. 실제 예약이나 검사 완료 사례가 아닙니다.",
        "기존 메모: ‘안과, 오후 예약.’ → 준비 메모: ‘산동 포함 여부와 준비사항 확인 / 귀가 ___ / 동행·교통편 확인 필요 ___ / 결과 설명 때 물어볼 검사 이름 ___.’",
        "빈칸을 채우기 위해 모든 검사를 요청할 필요는 없습니다. 본인에게 예정된 검사와 안내를 확인하는 메모입니다. 화면 입력·저장 기능은 없으며 개인정보를 제출하지 않습니다.",
        "검사 주기는 개인별 위험과 상황에 따라 의료진과 정합니다. 미국 자료의 연령별 검사 간격을 한국 독자의 개인 일정으로 옮기지 않습니다. 일반 건강정보이며 개인의 진단과 치료를 대신하지 않습니다. 면허 의료인의 검수를 받지 않았습니다.",
      ], links: [{ href: "/health/guides/appointment-route-entrance-and-lift", label: "평소 외래 이동 경로와 출입구 준비" }, { href: "/health/guides/appointment-questions", label: "검사 결과 설명에서 물어볼 질문" }] },
    ],
    sources: [
      { id: "NEI_EXAM", organization: "미국 국립안연구소 NEI", title: "Get a Dilated Eye Exam", url: "https://www.nei.nih.gov/eye-health-information/healthy-vision/finding-eye-doctor/get-dilated-eye-exam", sourceDate: "2025-11-26", retrievedAt: "2026-10-03" },
    ],
  },
];
