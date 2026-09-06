import type { HealthArticle, HealthClaim, HealthSource, HealthTool } from "./content";
import { dyslipidemiaArticle, dyslipidemiaSources } from "./seo-v2/dyslipidemia";
import { obesityArticle, obesitySources } from "./seo-v2/obesity";
import { masldArticle, masldSources } from "./seo-v2/masld";
import { ibsArticle, ibsSources } from "./seo-v2/irritable-bowel-syndrome";
import { asthmaArticle, asthmaSources } from "./seo-v2/asthma";
import { sleepApneaArticle, sleepApneaSources } from "./seo-v2/sleep-apnea";
import { goutArticle, goutSources } from "./seo-v2/gout";
import { migraineArticle, migraineSources } from "./seo-v2/migraine";
import { kidneyStonesArticle, kidneyStonesSources } from "./seo-v2/kidney-stones";
import { urinaryTractInfectionArticle, urinaryTractInfectionSources } from "./seo-v2/urinary-tract-infection";
import { depressionArticle, depressionSources } from "./seo-v2/depression";
import { anxietyArticle, anxietySources } from "./seo-v2/anxiety-disorder";
import { strokeArticle, strokeSources } from "./seo-v2/stroke";

type ExpansionSlug = Exclude<HealthArticle["slug"],
  | "hypertension"
  | "type-2-diabetes"
  | "allergic-rhinitis"
  | "gastroesophageal-reflux-disease"
  | "osteoarthritis"
  | "osteoporosis"
>;

type SourceInput = Omit<HealthSource, "retrievedAt">;

type GuideConfig = {
  slug: ExpansionSlug;
  prefix: string;
  title: string;
  cluster: string;
  archetype: NonNullable<HealthArticle["archetype"]>;
  description: string;
  outcome: string;
  definition: string;
  signs: string;
  evaluation: string;
  careBoundary: string;
  urgent: string;
  observationItems: string[];
  questions: string[];
  sources: [SourceInput, SourceInput, SourceInput];
};

const retrievedAt = "2026-08-26";

const guides: GuideConfig[] = [
  {
    slug: "dyslipidemia",
    prefix: "DLP",
    title: "이상지질혈증",
    cluster: "심장·혈관",
    archetype: "MYTH_FIRST",
    description: "겉으로 느껴지는 증상이 없어도 혈액검사에 나타날 수 있는 지질 수치를, 한 항목만 떼어 보지 않고 진료 질문으로 바꿉니다.",
    outcome: "검사표의 LDL·HDL·중성지방을 혼자 판정하지 않고, 의료진에게 물을 맥락을 정리할 수 있습니다.",
    definition: "이상지질혈증은 혈액 속 콜레스테롤과 중성지방 같은 지질 수치가 건강에 불리한 범위로 나타나는 상태를 가리킵니다. 여러 수치를 함께 해석합니다.",
    signs: "대개 뚜렷한 증상만으로 알아채기 어려워 혈액검사와 개인의 다른 위험 요인을 함께 확인합니다.",
    evaluation: "의료진은 지질검사 결과뿐 아니라 나이, 가족력, 흡연, 혈압, 당뇨병과 심혈관질환 이력을 함께 살펴봅니다.",
    careBoundary: "검사표의 한 숫자로 약을 시작·중단하거나 인터넷 목표치에 맞추지 않습니다. 결과의 의미와 다음 검사 시점은 의료진에게 확인합니다.",
    urgent: "새롭고 심한 가슴 통증, 숨쉬기 어려움, 갑작스러운 한쪽 마비나 말 이상은 콜레스테롤 수치를 다시 볼 때가 아니라 119 도움을 요청할 때입니다.",
    observationItems: ["검사 날짜와 검사명", "의료진이 설명한 목표", "가족력과 현재 질환", "복용 중인 약·보충제"],
    questions: ["각 지질 수치는 제 상황에서 무엇을 뜻하나요?", "다음 검사는 언제 필요한가요?", "생활 조정과 치료 선택지는 어떻게 정하나요?"],
    sources: [
      { id: "SRC-MEDLINEPLUS-CHOLESTEROL", organization: "NIH/MedlinePlus", title: "Cholesterol", url: "https://medlineplus.gov/cholesterol.html", sourceDate: "2025" },
      { id: "SRC-CDC-CHOLESTEROL", organization: "CDC", title: "About Cholesterol", url: "https://www.cdc.gov/cholesterol/about/", sourceDate: "2025" },
      { id: "SRC-NHLBI-BLOOD-CHOLESTEROL", organization: "NIH/NHLBI", title: "Blood Cholesterol", url: "https://www.nhlbi.nih.gov/health/blood-cholesterol", sourceDate: "2024" },
    ],
  },
  {
    slug: "obesity",
    prefix: "OBS",
    title: "비만",
    cluster: "대사·내분비",
    archetype: "FAMILY_SITUATION",
    description: "체중을 의지나 외모의 문제로 몰아가지 않고, 건강 상태와 생활 환경을 함께 살피는 질문을 준비합니다.",
    outcome: "낙인 없이 건강 위험과 진료 목표를 이야기하고, 혼자 무리한 감량 계획을 세우지 않을 수 있습니다.",
    definition: "비만은 몸에 지방이 과도하게 축적되어 건강 위험이 커질 수 있는 만성적인 건강 상태입니다. 한 사람의 가치나 노력 부족을 뜻하지 않습니다.",
    signs: "체중과 허리둘레는 참고 지표이지만 근육량, 나이, 질환과 생활 조건을 모두 설명하지는 못합니다.",
    evaluation: "의료진은 체중 변화의 흐름, 관련 질환, 복용 약, 수면과 생활 여건을 함께 확인할 수 있습니다.",
    careBoundary: "빠른 감량을 약속하는 식단·보충제·약을 스스로 시작하지 않습니다. 목표와 속도는 현재 건강 상태를 아는 의료진과 정합니다.",
    urgent: "실신, 의식 저하, 새롭고 심한 가슴 통증이나 호흡곤란이 있으면 체중 문제로 단정하지 말고 119에 도움을 요청합니다.",
    observationItems: ["최근 체중 변화의 시기", "수면과 활동 변화", "현재 질환과 복용 약", "일상에서 실제로 어려운 점"],
    questions: ["체중 외에 함께 볼 건강 지표는 무엇인가요?", "현재 약이나 수면이 영향을 줄 수 있나요?", "제게 안전하고 현실적인 목표는 무엇인가요?"],
    sources: [
      { id: "SRC-NIDDK-OBESITY-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts for Adult Overweight & Obesity", url: "https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/definition-facts", sourceDate: "2024" },
      { id: "SRC-NIDDK-OBESITY-FACTORS", organization: "NIH/NIDDK", title: "Factors Affecting Weight & Health", url: "https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/factors-affecting-weight-health", sourceDate: "2024" },
      { id: "SRC-NIDDK-OBESITY-RISKS", organization: "NIH/NIDDK", title: "Health Risks of Overweight & Obesity", url: "https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/health-risks", sourceDate: "2024" },
    ],
  },
  {
    slug: "metabolic-dysfunction-associated-steatotic-liver-disease",
    prefix: "MASLD",
    title: "지방간(MASLD)",
    cluster: "위장·간",
    archetype: "QUESTION_FIRST",
    description: "건강검진에서 지방간 이야기를 들었을 때, 증상이 없다는 말과 관리가 필요 없다는 말을 구분해 봅니다.",
    outcome: "검사 결과와 함께 확인할 대사 건강 요인을 정리하고, 무리한 민간요법 대신 진료 질문을 준비할 수 있습니다.",
    definition: "대사이상 관련 지방간질환(MASLD)은 간에 지방이 쌓이는 상태가 대사 건강 문제와 함께 나타나는 질환 범주입니다. 과거에는 NAFLD라는 이름이 널리 쓰였습니다.",
    signs: "증상이 없거나 피로·오른쪽 윗배 불편처럼 모호한 변화만 있을 수 있어 증상만으로 확인하기 어렵습니다.",
    evaluation: "의료진은 병력, 혈액검사와 영상검사를 바탕으로 간의 상태를 살피고 다른 원인을 확인합니다.",
    careBoundary: "간 수치나 초음파 문구를 혼자 해석해 보충제나 약을 시작하지 않습니다. 음주, 기존 질환과 복용 약을 진료에서 함께 알립니다.",
    urgent: "피부나 눈이 노래지거나, 심한 복통·반복 구토·의식 변화가 새로 나타나면 온라인 기록보다 신속한 의료 평가를 우선합니다.",
    observationItems: ["검사 날짜와 결과 문구", "음주 여부와 빈도", "대사질환과 복용 약", "새로 생긴 불편"],
    questions: ["다른 간질환 원인도 확인해야 하나요?", "어떤 추적검사가 필요한가요?", "제 상황에서 우선할 생활 변화는 무엇인가요?"],
    sources: [
      { id: "SRC-NIDDK-MASLD-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts of NAFLD & NASH", url: "https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/definition-facts", sourceDate: "2025" },
      { id: "SRC-NIDDK-MASLD-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of NAFLD & NASH", url: "https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/symptoms-causes", sourceDate: "2025" },
      { id: "SRC-NIDDK-MASLD-DIAGNOSIS", organization: "NIH/NIDDK", title: "Diagnosis of NAFLD & NASH", url: "https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/diagnosis", sourceDate: "2025" },
    ],
  },
  {
    slug: "irritable-bowel-syndrome",
    prefix: "IBS",
    title: "과민성장증후군",
    cluster: "위장·간",
    archetype: "BODY_SIGNAL",
    description: "배 아픔과 배변 변화의 흐름을 살피되, 모든 복통을 과민성장증후군으로 부르지 않도록 경계를 세웁니다.",
    outcome: "복통과 배변 변화를 진료에 설명할 수 있고, 다른 원인을 확인해야 할 신호를 구분할 수 있습니다.",
    definition: "과민성장증후군은 반복되는 복통과 설사·변비 같은 배변 변화가 함께 나타나는 증상 묶음입니다.",
    signs: "통증이 배변과 관련되거나 배변 횟수와 모양이 달라질 수 있지만, 사람마다 패턴이 다릅니다.",
    evaluation: "의료진은 증상 흐름과 병력을 확인하고, 필요하면 빈혈·감염·염증성 장질환 같은 다른 문제를 살피는 검사를 합니다.",
    careBoundary: "특정 음식 하나를 원인으로 확정하거나 장기간 과도하게 제한하지 않습니다. 기록을 바탕으로 의료진과 개인별 계획을 상의합니다.",
    urgent: "혈변이나 검은 변, 원인 없는 체중 감소, 심한 탈수·실신, 새롭고 심한 복통이 있으면 과민성장증후군으로 넘기지 말고 의료 도움을 받습니다.",
    observationItems: ["복통이 시작된 시간", "배변 횟수와 모양 변화", "먹은 것과 수면", "혈변·체중 변화 여부"],
    questions: ["다른 원인을 확인할 검사가 필요한가요?", "기록에서 어떤 패턴을 볼까요?", "무리한 음식 제한을 피하려면 어떻게 하나요?"],
    sources: [
      { id: "SRC-NIDDK-IBS-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts for Irritable Bowel Syndrome", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/definition-facts", sourceDate: "2017" },
      { id: "SRC-NIDDK-IBS-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of Irritable Bowel Syndrome", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/symptoms-causes", sourceDate: "2017" },
      { id: "SRC-NIDDK-IBS-DIAGNOSIS", organization: "NIH/NIDDK", title: "Diagnosis of Irritable Bowel Syndrome", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/diagnosis", sourceDate: "2017" },
    ],
  },
  {
    slug: "asthma",
    prefix: "AST",
    title: "천식",
    cluster: "호흡기·알레르기",
    archetype: "SIMPLE_ANALOGY",
    description: "기도가 예민해져 좁아질 때 나타날 수 있는 변화를 이해하고, 평소 증상과 응급 호흡곤란을 분리합니다.",
    outcome: "기침·쌕쌕거림의 패턴을 기록하고, 숨쉬기 매우 어려운 때는 지체 없이 도움을 요청할 수 있습니다.",
    definition: "천식은 폐로 공기가 드나드는 기도에 염증과 좁아짐이 반복되어 호흡이 어려워질 수 있는 만성 질환입니다.",
    signs: "쌕쌕거림, 기침, 숨참, 가슴 답답함이 나타날 수 있으며 시간과 유발 상황에 따라 오르내릴 수 있습니다.",
    evaluation: "의료진은 증상 패턴을 듣고 폐기능검사 등으로 숨을 내쉬는 흐름을 확인할 수 있습니다.",
    careBoundary: "흡입기 종류와 사용 시점은 개인별 천식 행동계획을 따릅니다. 다른 사람의 흡입기를 쓰거나 온라인 글로 약을 바꾸지 않습니다.",
    urgent: "숨쉬기가 매우 어렵거나 말하기 힘들고, 입술이 푸르게 보이거나 처지고 혼란스러우면 즉시 119에 도움을 요청합니다.",
    observationItems: ["기침·쌕쌕거림 시간", "운동·감기·환경과의 관계", "수면 방해 여부", "처방된 행동계획과 실제 반응"],
    questions: ["폐기능검사가 필요한가요?", "제 천식 행동계획을 어떻게 읽나요?", "응급실로 가야 할 신호는 무엇인가요?"],
    sources: [
      { id: "SRC-NHLBI-ASTHMA-SYMPTOMS", organization: "NIH/NHLBI", title: "Asthma Symptoms", url: "https://www.nhlbi.nih.gov/health/asthma/symptoms", sourceDate: "2024" },
      { id: "SRC-NHLBI-ASTHMA-DIAGNOSIS", organization: "NIH/NHLBI", title: "Asthma Diagnosis", url: "https://www.nhlbi.nih.gov/health/asthma/diagnosis", sourceDate: "2024" },
      { id: "SRC-NHLBI-ASTHMA-ATTACK", organization: "NIH/NHLBI", title: "Asthma Attack", url: "https://www.nhlbi.nih.gov/health/asthma/attacks", sourceDate: "2024" },
    ],
  },
  {
    slug: "sleep-apnea",
    prefix: "OSA",
    title: "수면무호흡증",
    cluster: "호흡기·알레르기",
    archetype: "FAMILY_SITUATION",
    description: "함께 사는 사람이 먼저 알아채는 코골이와 숨 멎음, 낮 졸림의 단서를 비난 없이 진료 정보로 바꿉니다.",
    outcome: "밤과 낮의 변화를 함께 기록하고, 코골이만으로 진단하지 않으면서 수면검사 질문을 준비할 수 있습니다.",
    definition: "수면무호흡증은 잠자는 동안 호흡이 반복해서 멈췄다가 다시 시작되는 수면 관련 호흡 질환입니다.",
    signs: "큰 코골이, 숨이 멎는 듯한 모습, 헐떡이며 깸, 낮 졸림과 집중 어려움이 나타날 수 있습니다.",
    evaluation: "의료진은 증상과 위험 요인을 확인하고 수면검사로 유형과 심한 정도를 평가할 수 있습니다.",
    careBoundary: "코골이 녹음이나 스마트기기 수치만으로 진단하지 않습니다. 졸리면 운전과 위험 작업을 피하고 의료진과 상의합니다.",
    urgent: "깨우기 어렵거나 호흡이 돌아오지 않는 것처럼 보이거나 입술이 푸르게 보이면 즉시 119에 도움을 요청합니다.",
    observationItems: ["코골이·숨 멎음 관찰", "헐떡이며 깬 횟수", "낮 졸림과 운전 영향", "수면 시간과 복용 약"],
    questions: ["수면검사가 필요한가요?", "낮 졸림 동안 피해야 할 활동은 무엇인가요?", "치료 선택지는 어떤 검사 뒤 정하나요?"],
    sources: [
      { id: "SRC-NHLBI-APNEA-OVERVIEW", organization: "NIH/NHLBI", title: "What Is Sleep Apnea?", url: "https://www.nhlbi.nih.gov/health/sleep-apnea", sourceDate: "2025" },
      { id: "SRC-NHLBI-APNEA-SYMPTOMS", organization: "NIH/NHLBI", title: "Sleep Apnea Symptoms", url: "https://www.nhlbi.nih.gov/health/sleep-apnea/symptoms", sourceDate: "2025" },
      { id: "SRC-NHLBI-APNEA-DIAGNOSIS", organization: "NIH/NHLBI", title: "Sleep Apnea Diagnosis", url: "https://www.nhlbi.nih.gov/health/sleep-apnea/diagnosis", sourceDate: "2025" },
    ],
  },
  {
    slug: "gout",
    prefix: "GOUT",
    title: "통풍",
    cluster: "뼈·관절",
    archetype: "MYTH_FIRST",
    description: "통풍을 음식 하나의 벌처럼 설명하지 않고, 갑작스러운 관절 변화와 요산 검사의 한계를 함께 봅니다.",
    outcome: "관절 변화와 복용 약을 기록하고, 요산 수치만으로 통풍을 확정하지 않을 수 있습니다.",
    definition: "통풍은 몸에 쌓인 요산염 결정이 관절 주변에 염증을 일으켜 갑작스러운 통증과 부종을 만들 수 있는 염증성 관절염입니다.",
    signs: "한 관절이 갑자기 매우 아프고 붓거나 붉고 뜨거워질 수 있으며, 엄지발가락이나 발목·무릎에서 시작하기도 합니다.",
    evaluation: "의료진은 병력과 관절 상태를 확인하고 혈액검사, 관절액 검사나 영상검사를 선택할 수 있습니다.",
    careBoundary: "요산 수치 하나로 진단하거나 약을 임의로 끊지 않습니다. 음식만 탓하기보다 질환, 복용 약과 신장 상태를 함께 알립니다.",
    urgent: "열이 나면서 관절이 매우 붓고 아프거나 몸 상태가 빠르게 나빠지면 감염 등 다른 원인도 가능하므로 신속히 의료 도움을 받습니다.",
    observationItems: ["아픈 관절과 시작 시각", "붓기·열감·발열 여부", "최근 질환·음주·식사", "현재 복용 약"],
    questions: ["다른 관절 질환과 어떻게 구분하나요?", "요산 수치는 제 경우 어떻게 해석하나요?", "약과 생활 계획은 어떻게 함께 정하나요?"],
    sources: [
      { id: "SRC-NIAMS-GOUT", organization: "NIH/NIAMS", title: "Gout", url: "https://www.niams.nih.gov/health-topics/gout", sourceDate: "2023" },
      { id: "SRC-NIAMS-GOUT-DIAGNOSIS", organization: "NIH/NIAMS", title: "Gout: Diagnosis, Treatment, and Steps to Take", url: "https://www.niams.nih.gov/health-topics/gout/diagnosis-treatment-and-steps-to-take", sourceDate: "2023" },
      { id: "SRC-MEDLINEPLUS-GOUT", organization: "NIH/MedlinePlus", title: "Gout", url: "https://medlineplus.gov/gout.html", sourceDate: "2024" },
    ],
  },
  {
    slug: "migraine",
    prefix: "MIG",
    title: "편두통",
    cluster: "뇌·마음",
    archetype: "BODY_SIGNAL",
    description: "편두통을 단순히 한쪽 머리가 아픈 병으로 줄이지 않고, 반복되는 두통과 동반 변화를 시간표로 살핍니다.",
    outcome: "평소 두통 패턴을 기록하면서 처음 생긴 신경 증상과 갑작스러운 심한 두통은 응급으로 구분할 수 있습니다.",
    definition: "편두통은 반복되는 두통과 메스꺼움, 빛·소리 민감성 같은 여러 증상이 함께 나타날 수 있는 신경계 질환입니다.",
    signs: "욱신거리는 중등도 이상의 통증이 한쪽에 나타날 수 있지만 양쪽일 수도 있고, 일부 사람은 두통 전 시각·감각 변화를 경험합니다.",
    evaluation: "의료진은 두통의 시작과 양상, 신경학적 증상과 진찰을 바탕으로 다른 원인을 확인하고 검사 필요성을 판단합니다.",
    careBoundary: "진통제나 편두통 약을 자주 또는 임의로 바꾸지 않습니다. 두통 일지는 진단기가 아니라 진료에 패턴을 설명하는 자료입니다.",
    urgent: "갑자기 시작된 매우 심한 두통, 처음 겪는 말·시야·움직임 이상, 의식 저하나 균형 상실이 동반되면 즉시 119에 도움을 요청합니다.",
    observationItems: ["시작 시각과 지속 시간", "통증 위치와 느낌", "빛·소리·메스꺼움", "처음 생긴 신경 증상"],
    questions: ["다른 원인을 확인할 검사가 필요한가요?", "두통 일지에서 무엇을 볼까요?", "약을 얼마나 자주 쓰는지 왜 중요한가요?"],
    sources: [
      { id: "SRC-NINDS-MIGRAINE", organization: "NIH/NINDS", title: "Migraine", url: "https://www.ninds.nih.gov/health-information/disorders/migraine", sourceDate: "2025" },
      { id: "SRC-MEDLINEPLUS-MIGRAINE", organization: "NIH/MedlinePlus", title: "Migraine", url: "https://medlineplus.gov/migraine.html", sourceDate: "2025" },
      { id: "SRC-MEDLINEPLUS-HEADACHE", organization: "NIH/MedlinePlus", title: "Headache", url: "https://medlineplus.gov/headache.html", sourceDate: "2025" },
    ],
  },
  {
    slug: "kidney-stones",
    prefix: "KST",
    title: "신장결석",
    cluster: "신장·비뇨기",
    archetype: "SIMPLE_ANALOGY",
    description: "소변 속 물질이 작은 돌처럼 뭉치는 과정을 이해하고, 통증 위치와 소변 변화를 정확히 설명하도록 돕습니다.",
    outcome: "옆구리 통증과 소변 변화를 기록하고, 막힘이나 감염 가능성이 있는 신호를 놓치지 않을 수 있습니다.",
    definition: "신장결석은 소변 속 특정 무기질이 높은 농도로 모여 콩팥이나 요로에 단단한 덩어리를 만드는 상태입니다.",
    signs: "등·옆구리·아랫배·사타구니의 날카로운 통증, 혈뇨, 배뇨 통증이나 잦은 소변이 나타날 수 있습니다.",
    evaluation: "의료진은 병력과 진찰, 소변·혈액검사와 영상검사를 이용해 결석의 위치와 막힘 여부를 확인할 수 있습니다.",
    careBoundary: "통증만으로 결석의 크기나 통과 여부를 예측하지 않습니다. 심장·신장 질환으로 수분 제한을 받은 사람은 물 섭취를 임의로 늘리지 않습니다.",
    urgent: "열·오한, 반복 구토, 소변이 거의 나오지 않음, 견디기 어려운 통증이 있으면 막힘이나 감염 가능성 때문에 신속한 의료 평가가 필요합니다.",
    observationItems: ["통증 위치와 파도처럼 변하는지", "소변 색과 양", "열·오한·구토 여부", "과거 결석과 수분 제한"],
    questions: ["결석의 위치와 크기는 어떻게 확인하나요?", "감염이나 막힘 신호가 있나요?", "결석 종류를 알면 예방이 달라지나요?"],
    sources: [
      { id: "SRC-NIDDK-STONE-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of Kidney Stones", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/symptoms-causes", sourceDate: "2017" },
      { id: "SRC-NIDDK-STONE-DIAGNOSIS", organization: "NIH/NIDDK", title: "Diagnosis of Kidney Stones", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/diagnosis", sourceDate: "2017" },
      { id: "SRC-NIDDK-STONE-TREATMENT", organization: "NIH/NIDDK", title: "Treatment for Kidney Stones", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/treatment", sourceDate: "2017" },
    ],
  },
  {
    slug: "urinary-tract-infection",
    prefix: "UTI",
    title: "요로감염",
    cluster: "신장·비뇨기",
    archetype: "QUESTION_FIRST",
    description: "소변 볼 때 불편하면 모두 같은 감염인지, 언제 콩팥 쪽 감염을 의심해 빨리 진료받아야 하는지 설명합니다.",
    outcome: "배뇨 증상과 전신 증상을 구분해 기록하고, 항생제를 임의로 사용하지 않을 수 있습니다.",
    definition: "요로감염은 세균 등이 요도·방광·콩팥을 포함한 소변길에 감염을 일으키는 상태를 말합니다.",
    signs: "소변 볼 때 화끈거림, 잦고 급한 소변, 아랫배 불편, 탁하거나 피가 섞인 소변이 나타날 수 있습니다.",
    evaluation: "의료진은 증상과 병력을 확인하고 소변검사와 소변배양검사 등으로 감염과 치료 선택을 살필 수 있습니다.",
    careBoundary: "남은 항생제나 다른 사람의 약을 쓰지 않습니다. 임신 가능성, 반복 감염, 다른 질환과 복용 약을 진료에서 알립니다.",
    urgent: "발열·오한과 함께 옆구리나 등 통증, 메스꺼움·구토가 나타나면 콩팥 감염 가능성이 있어 빠르게 의료 도움을 받습니다.",
    observationItems: ["배뇨 불편 시작 시각", "소변 횟수·색·냄새 변화", "열·오한·옆구리 통증", "임신 가능성과 반복 감염"],
    questions: ["소변검사나 배양검사가 필요한가요?", "콩팥 감염 신호가 있나요?", "약을 복용하며 어떤 변화를 알려야 하나요?"],
    sources: [
      { id: "SRC-NIDDK-UTI-DEFINITION", organization: "NIH/NIDDK", title: "Definition & Facts of Bladder Infection in Adults", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/definition-facts", sourceDate: "2024" },
      { id: "SRC-NIDDK-UTI-SYMPTOMS", organization: "NIH/NIDDK", title: "Symptoms & Causes of Bladder Infection in Adults", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/symptoms-causes", sourceDate: "2024" },
      { id: "SRC-NIDDK-UTI-DIAGNOSIS", organization: "NIH/NIDDK", title: "Diagnosis of Bladder Infection in Adults", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/diagnosis", sourceDate: "2024" },
    ],
  },
  {
    slug: "depression",
    prefix: "DEP",
    title: "우울증",
    cluster: "뇌·마음",
    archetype: "FAMILY_SITUATION",
    description: "우울증을 의지 부족으로 보지 않고, 오래 이어지는 기분·흥미·생활 변화와 위기 신호를 존중하며 살핍니다.",
    outcome: "낙인 없이 변화를 기록하고, 자해·자살 위험이 있으면 혼자 두지 않고 즉시 도움을 연결할 수 있습니다.",
    definition: "우울증은 우울한 기분이나 흥미·즐거움의 저하가 오래 이어지며 수면, 식사, 집중과 일상 기능에 영향을 줄 수 있는 정신건강 질환입니다.",
    signs: "슬픔·공허감, 흥미 저하, 피로, 수면·식욕 변화, 집중 어려움과 절망감 등이 나타날 수 있지만 모든 사람이 같은 모습을 보이지는 않습니다.",
    evaluation: "정신건강 전문가는 증상의 기간과 일상 영향, 다른 신체 질환이나 약물 가능성을 함께 확인합니다.",
    careBoundary: "온라인 체크리스트만으로 진단하거나 치료를 중단하지 않습니다. 가족은 평가하거나 설득하기보다 안전하게 이야기를 듣고 전문 도움 연결을 돕습니다.",
    urgent: "자해·자살 생각이나 구체적인 위험이 있거나 즉시 안전을 지키기 어렵다면 혼자 두지 말고 119에 연락합니다. 24시간 자살예방 상담전화 109에도 도움을 요청할 수 있습니다.",
    observationItems: ["기분과 흥미 변화 기간", "수면·식사·집중 변화", "일상에 미친 영향", "자해·자살 생각 여부"],
    questions: ["다른 건강 문제도 확인해야 하나요?", "어떤 전문 도움을 받을 수 있나요?", "위기 때 가족이 따를 계획을 함께 만들 수 있나요?"],
    sources: [
      { id: "SRC-NIMH-DEPRESSION", organization: "NIH/NIMH", title: "Depression", url: "https://www.nimh.nih.gov/health/publications/depression", sourceDate: "2024" },
      { id: "SRC-WHO-DEPRESSION", organization: "WHO", title: "Depressive disorder (depression)", url: "https://www.who.int/news-room/fact-sheets/detail/depression", sourceDate: "2025-08-29" },
      { id: "SRC-MOHW-109", organization: "보건복지부", title: "자살예방 정책 추진 및 24시간 상담전화 109", url: "https://www.mohw.go.kr/menu.es?mid=a10716040000", sourceDate: "2026" },
    ],
  },
  {
    slug: "anxiety-disorder",
    prefix: "ANX",
    title: "불안장애",
    cluster: "뇌·마음",
    archetype: "MYTH_FIRST",
    description: "누구나 느끼는 걱정과 일상을 오래 방해하는 불안의 차이를 살피되, 스스로 병명을 확정하지 않습니다.",
    outcome: "불안이 언제 어떻게 일상을 방해하는지 기록하고, 위기와 비응급 상담 경로를 구분할 수 있습니다.",
    definition: "불안장애는 걱정과 두려움이 일시적인 긴장을 넘어 오래 이어지거나 여러 상황에서 커져 일상생활을 방해하는 질환군입니다.",
    signs: "조절하기 어려운 걱정, 초조함, 집중·수면 어려움, 근육 긴장과 숨이 가쁜 느낌 등이 나타날 수 있습니다.",
    evaluation: "의료진은 증상의 기간과 상황, 일상 영향, 다른 신체 질환이나 물질·약물 영향을 함께 확인합니다.",
    careBoundary: "숨이 가쁘거나 가슴이 답답하다는 이유를 모두 불안으로 단정하지 않습니다. 치료법이나 약은 전문 평가 뒤 개인 상황에 맞게 정합니다.",
    urgent: "자신이나 다른 사람을 해칠 위험이 있거나 안전을 지키기 어렵다면 즉시 119에 연락합니다. 자살 관련 위기에는 24시간 상담전화 109도 이용할 수 있습니다.",
    observationItems: ["불안이 시작된 상황", "몸에서 느낀 변화", "피하게 된 활동", "수면과 일상 영향"],
    questions: ["신체 원인을 함께 확인해야 하나요?", "불안의 종류는 어떻게 평가하나요?", "치료와 위기 계획을 어떻게 세우나요?"],
    sources: [
      { id: "SRC-NIMH-ANXIETY", organization: "NIH/NIMH", title: "Anxiety Disorders", url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders", sourceDate: "2025" },
      { id: "SRC-NIMH-GAD", organization: "NIH/NIMH", title: "Generalized Anxiety Disorder: What You Need to Know", url: "https://www.nimh.nih.gov/health/publications/generalized-anxiety-disorder-gad", sourceDate: "2024" },
      { id: "SRC-MOHW-109-ANX", organization: "보건복지부", title: "자살예방 정책 추진 및 24시간 상담전화 109", url: "https://www.mohw.go.kr/menu.es?mid=a10716040000", sourceDate: "2026" },
    ],
  },
  {
    slug: "stroke",
    prefix: "STR",
    title: "뇌졸중",
    cluster: "뇌·마음",
    archetype: "BODY_SIGNAL",
    description: "갑작스러운 한쪽 마비와 말·시야 변화를 알아보고, 증상이 잠깐 좋아져도 기다리지 않아야 하는 이유를 설명합니다.",
    outcome: "뇌졸중 의심 신호를 보면 시간을 재며 관찰하지 않고 119를 먼저 요청할 수 있습니다.",
    definition: "뇌졸중은 뇌혈관이 막히거나 터져 뇌 일부가 손상되면서 갑작스러운 신경학적 증상이 나타나는 질환입니다.",
    signs: "갑자기 한쪽 얼굴·팔·다리에 힘이 빠지거나, 말이 어눌해지고 이해하기 어렵거나, 시야·균형에 변화가 생길 수 있습니다.",
    evaluation: "응급실에서는 증상 시작 시각과 신경학적 상태를 확인하고 뇌 영상검사 등으로 원인과 치료 가능성을 판단합니다.",
    careBoundary: "증상이 잠깐 좋아져도 집에서 쉬며 기다리거나 음식·약을 억지로 먹이지 않습니다. 발생 시각을 기억하고 119 지시를 따릅니다.",
    urgent: "한쪽 마비, 말 이상, 시야 이상, 갑작스러운 심한 두통이나 균형 상실 중 하나라도 갑자기 나타나면 즉시 119에 연락합니다.",
    observationItems: ["마지막으로 정상으로 보인 시각", "갑자기 달라진 얼굴·팔·말", "시야·균형·두통 변화", "119에 전달할 복용 약"],
    questions: ["증상 시작 시각을 어떻게 전달하나요?", "가족이 하지 말아야 할 행동은 무엇인가요?", "퇴원 뒤 재발 신호와 추적 계획은 무엇인가요?"],
    sources: [
      { id: "SRC-KDCA-STROKE-PUBLIC", organization: "질병관리청 국가건강정보포털", title: "뇌졸중", url: "https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5495", sourceDate: "2026-04-29" },
      { id: "SRC-KDCA-STROKE-119", organization: "질병관리청", title: "뇌졸중 조기증상 의심되면 즉시 119", url: "https://www.kdca.go.kr/kdca/2855/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGa2RjYSUyRjQ3JTJGMjE4NzQ4JTJGYXJ0Y2xWaWV3LmRvJTNG", sourceDate: "2025-12-16" },
      { id: "SRC-CDC-STROKE-SIGNS", organization: "CDC", title: "Signs and Symptoms of Stroke", url: "https://www.cdc.gov/stroke/signs-symptoms/", sourceDate: "2025" },
    ],
  },
  {
    slug: "acute-myocardial-infarction",
    prefix: "AMI",
    title: "급성심근경색",
    cluster: "심장·혈관",
    archetype: "QUESTION_FIRST",
    description: "가슴 통증이 어느 정도여야 119를 불러야 하는지 망설이지 않도록, 다양한 심근경색 의심 신호와 행동을 정리합니다.",
    outcome: "심근경색이 의심되면 스스로 운전하거나 약을 찾아 시간을 보내지 않고 119를 요청할 수 있습니다.",
    definition: "급성심근경색은 심장근육에 산소를 보내는 혈류가 갑자기 막혀 심장근육이 손상되는 생명을 위협하는 응급질환입니다.",
    signs: "가슴 중앙이나 왼쪽의 통증·압박감, 팔·등·목·턱의 불편, 숨참, 식은땀, 메스꺼움이나 갑작스러운 어지럼이 나타날 수 있습니다.",
    evaluation: "응급의료진은 증상과 심전도, 혈액검사 등을 이용해 심장 손상 여부를 빠르게 확인합니다.",
    careBoundary: "증상을 소화불량으로 단정하거나 직접 운전하지 않습니다. 아스피린을 포함한 약을 먼저 찾느라 119 연락을 늦추지 않습니다.",
    urgent: "새로운 심한 가슴 통증·압박감이나 숨참, 식은땀, 갑작스러운 어지럼이 심근경색처럼 느껴지면 확신이 없어도 즉시 119에 연락합니다.",
    observationItems: ["증상이 시작된 시각", "통증·압박 위치와 퍼짐", "숨참·식은땀·메스꺼움", "119에 전달할 병력과 약"],
    questions: ["재발 의심 신호는 무엇인가요?", "퇴원 뒤 활동은 어떻게 늘리나요?", "약을 잊거나 이상 반응이 있을 때 어디에 연락하나요?"],
    sources: [
      { id: "SRC-KDCA-CARDIO-2026", organization: "질병관리청", title: "갑작스러운 마비·언어장애·가슴통증 조기 대응", url: "https://kdca.go.kr/kdca/2848/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGa2RjYSUyRjQyJTJGMzEwMDYxJTJGYXJ0Y2xWaWV3LmRvJTNG", sourceDate: "2026-02-11" },
      { id: "SRC-NHLBI-HEART-ATTACK", organization: "NIH/NHLBI", title: "What Is a Heart Attack?", url: "https://www.nhlbi.nih.gov/health/heart-attack", sourceDate: "2022-03-24" },
      { id: "SRC-NHLBI-HEART-ATTACK-SYMPTOMS", organization: "NIH/NHLBI", title: "Heart Attack Symptoms", url: "https://www.nhlbi.nih.gov/health/heart-attack/symptoms", sourceDate: "2022-03-24" },
    ],
  },
];

// Source metadata can be refreshed without rewriting the original claim ledger.
export const expansionHealthSources: HealthSource[] = Array.from(new Map([
  ...guides.flatMap(guide => guide.sources.map(source => ({ ...source, retrievedAt }))),
  ...dyslipidemiaSources,
  ...obesitySources,
  ...masldSources,
  ...ibsSources,
  ...asthmaSources,
  ...sleepApneaSources,
  ...goutSources,
  ...migraineSources,
  ...kidneyStonesSources,
  ...urinaryTractInfectionSources,
  ...depressionSources,
  ...anxietySources,
  ...strokeSources,
].map(source => [source.id, source])).values());

function makeClaims(guide: GuideConfig): HealthClaim[] {
  const [primary, secondary, urgent] = guide.sources.map((source) => source.id);
  const base = {
    articleSlug: guide.slug,
    lastVerified: retrievedAt,
    publicReleaseDecision: "KEEP_AS_SAFE_GENERAL_EDUCATION" as const,
    publicDecisionRationale: "권위 있는 공식 출처의 일반 건강교육 범위로 제한하고 개인 진단·약물·용량 결정을 배제함",
  };
  return [
    { ...base, id: `${guide.prefix}-P3-001`, section: "definition", text: guide.definition, type: "DEFINITION", sourceIds: [primary], clinicalReviewRequired: false, wordingRisk: "LOW", riskClass: "P2_PATIENT_EDUCATION", emergencyRelevance: false, treatmentRelevance: false, diagnosticRelevance: false },
    { ...base, id: `${guide.prefix}-P3-002`, section: "possible-signs", text: guide.signs, type: "SYMPTOM", sourceIds: [primary, secondary], clinicalReviewRequired: false, wordingRisk: "LOW", riskClass: "P2_PATIENT_EDUCATION", emergencyRelevance: false, treatmentRelevance: false, diagnosticRelevance: false },
    { ...base, id: `${guide.prefix}-P3-003`, section: "evaluation", text: guide.evaluation, type: "TEST", sourceIds: [secondary], clinicalReviewRequired: false, wordingRisk: "LOW", riskClass: "P2_PATIENT_EDUCATION", emergencyRelevance: false, treatmentRelevance: false, diagnosticRelevance: true },
    { ...base, id: `${guide.prefix}-P3-004`, section: "care-boundary", text: guide.careBoundary, type: "SELF_CARE_LIMIT", sourceIds: [primary, secondary], clinicalReviewRequired: false, wordingRisk: "MEDIUM", riskClass: "P1_CLINICAL", publicReleaseDecision: "SIMPLIFY", publicDecisionRationale: "치료 세부사항을 제거하고 자가 판단 금지와 진료 질문 경계만 공개함", emergencyRelevance: false, treatmentRelevance: true, diagnosticRelevance: true },
    { ...base, id: `${guide.prefix}-P3-005`, section: "urgent", text: guide.urgent, type: "EMERGENCY_SIGN", sourceIds: [primary, urgent], clinicalReviewRequired: false, wordingRisk: "MEDIUM", riskClass: guide.urgent.includes("119") ? "P0_EMERGENCY" : "P1_CLINICAL", publicDecisionRationale: "공식기관 2개 근거를 사용한 단순 행동 문장으로 제한하고 개인별 임상 판단을 배제함", emergencyRelevance: true, treatmentRelevance: false, diagnosticRelevance: false },
  ];
}

export const expansionHealthClaims: HealthClaim[] = guides.flatMap(makeClaims);

function imageIds(guide: GuideConfig) {
  return [`${guide.prefix.toLowerCase()}-hero`, `${guide.prefix.toLowerCase()}-concept`, `${guide.prefix.toLowerCase()}-action`];
}

function articleFor(guide: GuideConfig): HealthArticle {
  const ids = Array.from({ length: 5 }, (_, index) => `${guide.prefix}-P3-00${index + 1}`);
  return {
    slug: guide.slug,
    title: guide.title,
    eyebrow: `${guide.cluster} · ${guide.archetype.replaceAll("_", " ")}`,
    description: guide.description,
    outcome: guide.outcome,
    summary: [guide.definition, guide.careBoundary, guide.urgent],
    sections: [
      { title: `${guide.title}, 먼저 이 뜻부터`, paragraphs: [guide.definition], claimIds: [ids[0]], imageId: imageIds(guide)[1] },
      { title: `몸에서 살필 ${guide.title}의 변화`, paragraphs: [guide.signs], claimIds: [ids[1]] },
      { title: `검사와 진료에서는 무엇을 확인할까요`, paragraphs: [guide.evaluation], claimIds: [ids[2]], tone: "note" },
      { title: `혼자 결정하지 않을 경계`, paragraphs: [guide.careBoundary], claimIds: [ids[3]] },
      { title: `${guide.title} 기록에 남길 네 가지`, bullets: guide.observationItems, claimIds: [ids[1], ids[2]], imageId: imageIds(guide)[2] },
      { title: `기다리지 말아야 하는 변화`, paragraphs: [guide.urgent], claimIds: [ids[4]], tone: "warning" },
      { title: `진료실에서 바로 꺼낼 질문`, bullets: guide.questions, claimIds: [ids[2], ids[3]], tone: "note" },
    ],
    faq: [
      { question: `이 설명만으로 ${guide.title}인지 알 수 있나요?`, answer: "아닙니다. 증상과 검사 결과는 다른 원인과 겹칠 수 있어 의료진의 평가가 필요합니다.", claimIds: [ids[2], ids[3]] },
      { question: "기록은 어디까지 도움이 되나요?", answer: "증상의 시간과 맥락을 설명하는 데 쓰입니다. 기록 자체가 진단이나 치료 결정을 대신하지 않습니다.", claimIds: [ids[2], ids[3]] },
    ],
    sourceIds: guide.sources.map((source) => source.id),
    imageIds: imageIds(guide),
    toolSlugs: [`${guide.slug}-visit-card`],
    archetype: guide.archetype,
  };
}

const seoArticles: Partial<Record<ExpansionSlug, HealthArticle>> = {
  dyslipidemia: dyslipidemiaArticle,
  obesity: obesityArticle,
  "metabolic-dysfunction-associated-steatotic-liver-disease": masldArticle,
  "irritable-bowel-syndrome": ibsArticle,
  asthma: asthmaArticle,
  "sleep-apnea": sleepApneaArticle,
  gout: goutArticle,
  migraine: migraineArticle,
  "kidney-stones": kidneyStonesArticle,
  "urinary-tract-infection": urinaryTractInfectionArticle,
  depression: depressionArticle,
  "anxiety-disorder": anxietyArticle,
  stroke: strokeArticle,
};

export const expansionHealthArticles = Object.fromEntries(
  guides.map((guide) => [guide.slug, seoArticles[guide.slug] ?? articleFor(guide)]),
) as Record<ExpansionSlug, HealthArticle>;

export const expansionHealthTools: HealthTool[] = guides.map((guide) => ({
  slug: `${guide.slug}-visit-card`,
  articleSlug: guide.slug,
  title: `${guide.title} 관찰·진료 질문 카드`,
  description: "개인 진단 대신 증상 흐름과 의료진에게 물을 내용을 한 장에 정리합니다.",
  claimIds: [`${guide.prefix}-P3-002`, `${guide.prefix}-P3-003`, `${guide.prefix}-P3-004`],
  kind: "questions",
  fields: guide.observationItems,
  items: guide.questions,
}));

export const expansionGuideSummaries = guides.map((guide) => ({
  slug: guide.slug,
  prefix: guide.prefix,
  title: guide.title,
  cluster: guide.cluster,
  description: guide.description,
  archetype: guide.archetype,
}));
