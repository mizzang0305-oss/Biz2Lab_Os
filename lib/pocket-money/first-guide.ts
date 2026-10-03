import type { PocketGuide } from "./guide";
export const firstGuideDraft: PocketGuide = {
 id:"declaration-finish",slug:"declaration-finish",version:"2026-10-03.1",status:"draft",publicationApproved:false,
 title:"기후시민 선언 등록 버튼 찾기",description:"정보 입력을 마친 뒤, 선언 화면과 동의·등록 버튼 위치를 확인하는 두 단계 안내입니다.",
 serviceName:"탄소중립포인트 녹색생활 실천",updatedAt:"2026-10-03",scope:"정보 입력 이후 선언 마무리",
 conditions:{rewardKind:"points",age:"만 14세 이상 가입 가능",consent:null,cost:"회원 가입 회비 없음 · 활동 비용은 별도 확인",payout:null,
 officialUrl:"https://www.cpoint.or.kr/netzero/member/nv_memberRegistStep1.do",checkedAt:"2026-10-03"},
 observations:{signup:"verified",certificate:"verified",points:"unverified",cash:"unverified",login:"unverified"},
 resultNotice:"제공 화면에서 회원가입 완료와 기후시민증 발급을 확인했습니다. 포인트 적립·현금 지급·별도 로그인 성공은 미확인입니다. 이 글은 여러분의 가입이나 지급 완료를 확인하지 않습니다.",
 photos:[],
 steps:[{id:"declaration-entry",title:"기후시민 선언 화면 확인",instruction:"정보 입력을 마친 뒤 ‘기후시민 서약’ 화면인지 확인하세요. 약속 내용은 공식 페이지에서 읽으세요.",
 expectedScreen:"‘기후시민 서약’과 ‘기후시민 10가지 약속’ 안내가 보입니다.",stopCondition:"다른 화면이거나 나이·참여 조건이 맞지 않으면 여기서 멈추고 공식 안내를 확인하세요.",photoId:"libfile_20a21205d1f88191adfc615d8a61f238"},
 {id:"consent-register",title:"동의와 등록 버튼 위치 확인",instruction:"약속을 읽고 동의할 수 있을 때만 필수 동의 항목을 확인한 뒤 ‘기후행동 지구의 시민 등록하기’를 선택하세요.",
 expectedScreen:"확인된 다음 화면은 ‘회원가입이 완료되었습니다.’와 ‘나의 기후시민증 확인’ 안내입니다.",stopCondition:"동의할 수 없거나 화면이 다르면 진행하지 마세요. 완료 문구를 포인트 적립이나 현금 지급으로 판단하지 마세요.",photoId:"libfile_56d3f30ee2608191b4aecbd006289356"}]
};

