export const knowledgeBrand = "Biz2Lab 지식 에세이";
export const antikytheraEssay = {
  title: "2천 년 전의 컴퓨터, 우리가 아는 과거는 얼마나 정확할까?",
  path: "/essays/antikythera",
  description: "바다에서 건져 올린 청동 조각은 어떻게 고대의 하늘을 계산하는 기계가 되었을까. 남은 톱니와 CT, 2021년 제안 모델 사이를 따라갑니다.",
  status: "검토용 완성 원고", updatedAt: "2026-10-04",
} as const;
export const essaySources = [
  { id: "paper", label: "Freeth 외, Scientific Reports (2021)", url: "https://www.nature.com/articles/s41598-021-84310-w", note: "A Model of the Cosmos in the ancient Greek Antikythera Mechanism. 물리적 증거와 앞면의 제안 모델을 확인한 논문. 2021년 8월 저자 정정이 반영된 본문을 사용했습니다." },
  { id: "museum", label: "그리스 국립고고학박물관 · 연구의 역사", url: "https://antikythera-mechanism.namuseum.gr/en/science-historian/", note: "제작·난파·발견 시기와 연구 방법의 변화를 확인한 소장 기관 자료입니다." },
  { id: "ucl", label: "UCL · 모델 발표 (2021.03.12)", url: "https://www.ucl.ac.uk/news/2021/mar/experts-recreate-mechanical-cosmos-worlds-first-computer", note: "2021년 연구의 설명과 당시 남아 있던 제작 가능성 검증 과제를 확인한 대학 발표입니다." },
  { id: "video", label: "Clickspring · Antikythera Mechanism Episode 1 (2017)", url: "https://www.youtube.com/watch?v=ML4tw_UzqZE", note: "제작자가 공개한 제1편 설명에서 현대 재현 프로젝트의 계획을 확인했습니다. 2017년 영상이며, 2021년 UCL 제안 모델의 제작 기록과 구분합니다." },
] as const;
export const essayFigures = [
  { id: "evidence", src: "/images/essays/antikythera/figure-4.jpg", width: 2006, height: 2437, number: 4,
    description: "사진과 CT, 그리고 그 증거를 바탕으로 만든 재구성. a–l은 유물 사진·표면 영상·CT, m–p는 컴퓨터 재구성입니다.",
    alt: "논문 그림 4. A·D 조각의 사진과 CT가 위쪽 a–l에, 판과 금성 장치의 컴퓨터 재구성이 아래쪽 m–p에 배열되어 있다.", changes: "변경: 원본 내용을 유지하며 화면 크기와 웹 전달용 압축만 조절. 확대 화면은 원본 파일 사용." },
  { id: "cosmos", src: "/images/essays/antikythera/figure-7.jpg", width: 1297, height: 1298, number: 7,
    description: "2021년 연구팀의 제안 모델. 지구를 중심에 둔 우주 표시판의 컴퓨터 이미지이며, 발굴된 유물의 사진이 아닙니다.",
    alt: "2021년 논문의 제안 모델. 중심의 지구와 달, 행성을 표시하는 여러 동심원과 바늘로 구성된 금빛 원판.", changes: "변경: 원본 내용을 유지하며 화면 크기와 웹 전달용 압축만 조절. 확대 화면은 원본 파일 사용." },
] as const;
export type EssayFigureData = (typeof essayFigures)[number];
