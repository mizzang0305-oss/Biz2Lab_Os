import Link from "next/link";
import { antikytheraEssay, essayFigures, essaySources } from "@/lib/essays/antikythera";
import { ReadingExperience } from "./ReadingExperience";
import { EssayFigure } from "./EssayFigure";
import styles from "./essays.module.css";
function Source({ id, children }: { id: typeof essaySources[number]["id"]; children: React.ReactNode }) {
  const source = essaySources.find(item => item.id === id)!;
  return <a className={styles.sourceLink} href={source.url} target="_blank" rel="noopener noreferrer">{children}<span className={styles.srOnly}> (새 창)</span></a>;
}
export function AntikytheraEssay({ comments }: { comments?: React.ReactNode } = {}) {
  return <article className={styles.article}>
    <header className={styles.articleHeader}><Link href="/" className={styles.backLink}>← 이야기 첫 화면</Link>
      <p className={styles.kicker}>과학 × 역사 · 안티키테라 메커니즘</p><h1>{antikytheraEssay.title}</h1>
      <p className={styles.articleDeck}>고대의 기계가 바꾼 것은 과거일까,<br />과거를 바라보는 우리의 눈일까.</p>
    </header>
    <div className={styles.prose}>
      <p className={styles.opening}>내일 밤, 달은 어떤 모양일까. 손잡이를 돌려 그 답을 찾는 기계가 2천 년 전에 있었다면, 우리는 그 시대를 제대로 알고 있다고 말할 수 있을까?</p>
      <p>안티키테라 메커니즘은 이런 질문을 피하기 어렵게 만든다. 화면도 전자 회로도 없다. 남아 있는 것은 부식된 청동과 맞물린 톱니바퀴다. 그런데 연구자들은 이 장치를 천체의 움직임을 계산하던 기계로 설명한다. <Source id="ucl">‘고대의 컴퓨터’라는 별명</Source>은 여기서 나온다.</p>
      <p>별명은 흥미롭지만, 답을 대신하지는 못한다. 무엇을 계산했기에 컴퓨터일까? 그리고 부서진 조각만으로, 사라진 기계의 모습을 어디까지 알 수 있을까? 바다에서 시작해 그 질문을 하나씩 따라가 보자.</p>
      <ReadingExperience />
      <section id="wreck" aria-labelledby="wreck-title"><p className={styles.chapter}>01 · 발견</p><h2 id="wreck-title">바다에서 올라온 것은<br />답보다 질문에 가까웠다.</h2>
        <p>1900~1901년, 그리스 안티키테라 섬 근처에서 난파선이 발견되고 인양 작업이 진행됐다. 박물관은 장치의 제작 시기를 대략 기원전 150~100년, 배가 가라앉은 시기를 기원전 70년 무렵으로 안내한다. 정확한 제작 연도를 적은 보증서가 남아 있는 것은 아니다. <Source id="museum">유물과 난파선의 시간을 맞추며 얻은 범위</Source>다.</p>
        <p>오늘날 금빛 복원도를 먼저 보면, 바다에서도 그런 기계가 나왔을 것처럼 느껴진다. 실제로 남은 조각은 훨씬 거칠고 불완전하다. 완성된 장치가 먼저 있고 조각이 그 설명을 뒷받침한 것이 아니라, 조각이 먼저 있었고 설명은 오랫동안 달라졌다.</p>
        <p>박물관의 연구사에는 천체 관측 기구나 항해 도구라는 초기 해석, 달력 계산 장치라는 설명, X선과 CT를 활용한 연구가 차례로 등장한다. 같은 물건을 두고 왜 설명이 바뀌었을까? 겉으로 보이던 것만으로는 안쪽에서 무엇이 연결되어 있는지 알기 어려웠기 때문이다.</p>
        <p>이제 청동 표면의 얼룩보다 그 안에 반복되는 톱니의 모양을 보자.</p>
      </section>
      <section id="gears" aria-labelledby="gears-title"><p className={styles.chapter}>02 · 계산</p><h2 id="gears-title">숫자를 쓰는 대신,<br />회전의 비율을 만들면?</h2>
        <p>톱니바퀴는 회전을 전달하면서 속도를 바꾼다. 원리만 보자면, 톱니 20개인 바퀴가 40개인 바퀴를 돌릴 때 작은 바퀴의 두 바퀴는 큰 바퀴의 한 바퀴가 된다. 이 숫자는 유물의 부품 수치를 인용한 것이 아니라, 비율을 설명하기 위한 간단한 예다.</p>
        <p>여러 바퀴를 연결하면 더 복잡한 비율도 만들 수 있다. 관측한 하늘의 반복을 그 비율에 대응시킬 수 있다면 어떨까. 달력을 눈으로 세는 대신, 손잡이를 돌릴 때 바늘이 다음 위치로 움직이게 만들 수 있다.</p>
        <p>그런 의미에서 이 장치는 ‘계산’한다. 아무 프로그램이나 실행하는 오늘의 컴퓨터와 같은 물건이라는 뜻은 아니다. 천체의 주기와 당시의 천문 이론을 기어에 담아 움직임으로 나타내는, 특정한 목적의 기계다. <Source id="ucl">달의 변화와 식의 예측을 보여 주는 장치</Source>라는 설명을 읽으면 별명이 조금 덜 막연해진다.</p>
        <p>하지만 톱니가 있다는 사실만으로 모든 기능을 알 수는 없다. 어떤 바퀴가 무엇에 물렸는지, 어디로 회전이 전달됐는지 알아야 한다. 사라진 연결을 찾으려면, 조각을 깨뜨리지 않고 안을 볼 방법이 필요했다.</p>
      </section>
      <section id="inside" aria-labelledby="inside-title"><p className={styles.chapter}>03 · 증거</p><h2 id="inside-title">기계가 말하기 시작한 순간은<br />겉을 더 잘 본 때가 아니었다.</h2>
        <p>2005년의 미세 초점 X선 CT는 남은 조각의 내부와 가려진 글자를 살피는 데 큰 역할을 했다. 2021년 논문은 이때의 연구로 뒷면 구조가 많이 밝혀졌지만 앞면은 여전히 큰 문제로 남았다고 설명한다. <Source id="paper">논문이 다루는 유물은 82개 조각, 원래 장치의 약 3분의 1</Source>이며 부식된 청동 톱니바퀴 30개가 남아 있다.</p>
        <p>CT는 잃어버린 부품을 만들어 내는 도구가 아니다. 남아 있는데 볼 수 없던 것을 드러내는 도구다. 기둥의 구멍, 판이 놓였을 자리, 안쪽에 남은 톱니. 하나씩 따로 보면 사소해 보이지만, 복원하는 사람에게는 “여기에는 이 크기와 형태의 부품이 들어가야 한다”는 제약이 된다.</p>
        <EssayFigure figure={essayFigures[0]} />
        <p>이 도판을 위에서 아래로 읽으면 중요한 경계가 보인다. 위쪽의 사진과 CT는 남아 있는 조각을 보여 준다. 아래쪽의 금빛 판과 기어는 연구팀이 그 흔적을 설명하기 위해 재구성한 것이다. 둘은 연결되어 있지만 같은 종류의 증거는 아니다.</p>
        <p>부품의 흔적만 있는 것도 아니다. 장치에 새겨진 글자는 어떤 하늘을 보여 주려 했는지 힌트를 준다. 금성과 토성에 관한 부분에서 읽힌 462와 442라는 수가 좋은 예다. 이것은 각 행성이 태양을 한 바퀴 도는 데 걸리는 시간이라는 뜻이 아니다. <Source id="ucl">하늘에서 반복되는 행성의 움직임을 맞추는 장기간의 주기 관계</Source>와 관련된다.</p>
        <p>맞물린 기어와 남은 글자. 이제 질문은 “이런 계산이 가능했을까?”에서 조금 더 까다로워진다. “그 계산을 이 좁은 장치 안에서 할 수 있었을까?”</p>
      </section>
      <section id="model" aria-labelledby="model-title"><p className={styles.chapter}>04 · 재구성</p><h2 id="model-title">아름다운 그림이 나오면,<br />수수께끼는 끝난 걸까?</h2>
        <p>2021년, UCL 연구진이 참여한 팀은 앞면에 고대 그리스의 우주를 표시하는 새 모델을 제안했다. 아래 그림은 그 모델의 컴퓨터 이미지다. 땅을 중심에 놓고, 달과 태양, 당시 알려진 다섯 행성의 움직임을 여러 고리로 나타낸다.</p>
        <EssayFigure figure={essayFigures[1]} />
        <p>모델의 목표는 그럴듯한 장식품을 만드는 일이 아니었다. 판과 기둥의 흔적에 맞아야 하고, 비문에 적힌 설명과도 어긋나지 않아야 하며, 필요한 기어가 실제 공간 안에 들어가야 했다. 서로 다른 단서가 한 구조 안에서 함께 설명되는지가 핵심이다.</p>
        <p>따라서 이 그림에서 볼 것은 금빛의 정교함만이 아니다. 남은 흔적이 어느 부분을 정했고, 어느 부분은 연구자의 선택으로 채워졌는지도 봐야 한다. <Source id="paper">논문이 제시한 것은 증거에 맞추려는 2021년 제안 모델</Source>이지, 발견 당시 그대로의 기계 사진이 아니다.</p>
        <p>손으로 만들어 보는 일은 여기서 또 다른 질문을 던진다. 도면에서 맞는 구조가 실제 재료와 공구를 만나도 움직일까?</p>
        <aside className={styles.videoLink} aria-labelledby="video-title"><span className={styles.chapter}>원본 제작자의 작업실로</span><h3 id="video-title">그림에서 기계로 가는 길</h3><p>2017년 Clickspring 제1편은 현대 재현 프로젝트의 계획을 소개한다. 위의 2021년 UCL 제안 모델의 제작 기록과는 구분한다.</p><Source id="video">Clickspring 원본 영상 보기 ↗</Source><p className={styles.credit}>YouTube에서 재생 · 영상과 영상 속 이미지를 이 사이트에 복제하지 않았습니다.</p></aside>
      </section>
      <section id="unknown" aria-labelledby="unknown-title"><p className={styles.chapter}>05 · 빈칸</p><h2 id="unknown-title">정교한 모델일수록,<br />빈칸도 함께 봐야 한다.</h2>
        <p>2021년 논문은 태양과 일부 행성의 기어 구조에 직접 남은 증거가 없어서 이론적 장치를 설계해야 했다고 밝힌다. 표시판의 모든 세부가 똑같은 확실성을 갖는 것은 아니다.</p>
        <p>가령 논문의 ‘용의 바늘’은 달 궤도의 교점을 표시하는 요소다. 연구자들은 이 기능에 직접적인 물리적 증거가 없는 만큼, <Source id="paper">자신들이 더한 가설적 요소</Source>라고 명시한다. 그림에 선명하게 그려졌다는 이유만으로 유물에서 확인된 부품이 되는 것은 아니다.</p>
        <p>UCL의 당시 발표도 고대의 제작 기술로 이 구조를 만들 수 있는지 검증하는 일이 남았다고 설명한다. 특히 서로 안에 들어가는 관을 만드는 문제가 언급된다. 이것은 2021년 발표 당시의 과제이지, 이후 모든 연구의 현재 상태를 단정하는 문장이 아니다.</p>
        <p>제작자의 이름, 정확한 제작 장소, 기술이 이어지거나 사라진 경로도 이 자료들만으로 확정할 수 없다. 빈칸을 보면 이야기를 붙이고 싶어진다. 어떤 비밀이 묻혔을 것 같고, 어느 사건이 모든 것을 끊었을 것 같다. 하지만 남은 기어가 말하지 않는 원인까지 대신 말해 주지는 않는다.</p>
        <p>그래서 이 장치의 매력은 “고대에는 무엇이든 가능했다”는 선언보다, 어느 설명이 어떤 흔적을 견디는지 확인하는 과정에 있다. 다음 증거가 나오면 모델은 다시 바뀔 수 있다. 그 가능성이 모델의 가치를 없애는 것은 아니다.</p>
      </section>
      <section id="today" aria-labelledby="today-title" className={styles.closing}><p className={styles.chapter}>06 · 오늘의 질문</p><h2 id="today-title">우리가 아는 과거는,<br />얼마나 남아 있는 과거일까?</h2>
        <p>처음에는 고대의 기계가 놀랍다. 끝에 가서는 그 기계를 알아보는 데 걸린 시간이 더 오래 마음에 남는다. 같은 조각이라도 어떤 도구로 보고, 어떤 질문을 던지느냐에 따라 전혀 다른 설명이 시작될 수 있다.</p>
        <p>안티키테라의 톱니가 역사를 전부 다시 쓰라고 요구하는 것은 아니다. 다만 쉽게 그려 온 장면을 한 번 더 보게 한다. “그 시대에는 이런 것은 없었을 거야”라는 생각은, 무엇이 없었다는 증거에 기대고 있었을까. 아직 발견하지 못했다는 사실과 정말 존재하지 않았다는 판단 사이에는 얼마나 큰 틈이 있을까.</p>
        <p>다음에 과거에 관한 자신만만한 이야기를 만나면, 한 가지를 물어볼 수 있겠다. <strong>이 설명은 남아 있는 무엇에서 시작했고, 어디부터 빈칸을 채우고 있을까?</strong> 2천 년 전의 기계는 그 질문을 오늘도 움직이게 한다.</p>
      </section>
      <section id="sources" className={styles.sources} aria-labelledby="sources-title"><p className={styles.chapter}>이야기 뒤의 자료</p><h2 id="sources-title">직접 들여다볼 원자료</h2>
        <p>이 글은 아래 자료를 비교해 새로 구성한 에세이입니다. 영상의 번역이나 줄거리 요약이 아닙니다. 사실 설명과 별도로, 질문을 잇는 문장과 맺음말에는 이 원고의 해석이 담겨 있습니다.</p>
        <ol>{essaySources.map(source => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <span aria-hidden="true">↗</span><span className={styles.srOnly}> (새 창)</span></a><p>{source.note}</p></li>)}</ol>
        <p className={styles.credit}>도판: Freeth, T., Higgon, D., Dacanalis, A., MacDonald, L., Georgakopoulou, M. &amp; Wojcik, A. (2021), Scientific Reports 11, 5821, 그림 4·7. 도판 제작 Tony Freeth. 논문은 CC BY 4.0이며 두 도판에 별도의 이용 제외 표시는 없습니다. 유물 사진·CT와 모델의 구분 및 변경 내역은 각 그림 아래에 표시했습니다.</p>
      </section>
      {comments}
      <div className={styles.articleEnd}><Link href="/">← 다른 질문을 생각하러, 첫 화면으로</Link></div>
    </div></article>;
}
