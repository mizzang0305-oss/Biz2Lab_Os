export const scenes=['showcase-landing','premium-auth','ops-control','campaign-editorial'];
export const sectionIds=['hero','features','story','faq','cta'];
export const templates=[
 {id:scenes[0],name:'Showcase',tag:'크고 선명한 브랜드',headline:'아이디어를, 움직이는 경험으로.',description:'당신의 이야기에 맞는 히어로와 랜딩페이지. 작은 디테일까지 직접 편집하고, 웹과 영상으로 내보내세요.'},
 {id:scenes[1],name:'Premium',tag:'차분한 에디토리얼',headline:'오래 기억되는 첫인상.',description:'절제된 타이포그래피와 따뜻한 색감. 브랜드의 깊이를 담는 프리미엄 랜딩페이지를 만드세요.'},
 {id:scenes[2],name:'Product',tag:'제품의 가치와 흐름',headline:'복잡한 일을, 명료하게.',description:'제품의 가치를 설명하고, 사용자가 다음 행동을 선택하게 하세요. 살아 있는 인터랙션이 이야기를 연결합니다.'},
 {id:scenes[3],name:'Campaign',tag:'대담한 컬러와 이야기',headline:'다음 장면을 만드는 사람들.',description:'하나의 메시지에서 시작하는 캠페인. 색, 움직임, 이야기로 브랜드의 다음 장면을 완성하세요.'}
];
export function createProject(scene=scenes[0]){const t=templates.find(t=>t.id===scene);return {schema:'minz-design-project-v5',version:1,scene,palette:scene,brand:'MINZ STUDIO',headline:t.headline,description:t.description,cta:'프로젝트 이야기하기',eyebrow:'DESIGN / MOTION / STORY',layout:'landing',motion:'subtle',spacing:'comfortable',font:'sans',sections:sectionIds.map(id=>({id,visible:true})),features:[{title:'직접 만드는 첫인상',body:'히어로부터 페이지 전체까지, 글과 순서를 자유롭게 편집하세요.'},{title:'손끝에서 살아나는 디자인',body:'클릭, 키보드, 스크롤과 터치로 같은 경험을 만납니다.'},{title:'웹과 영상, 두 가지 결과',body:'실행 가능한 웹 코드와 자막이 담긴 실제 영상을 별도로 만듭니다.'}],storyTitle:'좋은 디자인은 다음 행동을 만듭니다.',storyBody:'분명한 메시지와 자연스러운 움직임. 네 가지 디자인에서 시작해 당신만의 페이지로 발전시키세요.',faqQuestion:'결과물을 어떻게 사용할 수 있나요?',faqAnswer:'웹 ZIP을 풀어 로컬 서버로 열거나 정적 호스팅에 올릴 수 있습니다. 영상은 WebM과 WebVTT 자막으로 저장됩니다.',video:{resolution:'1280x720',duration:6,caption:'당신의 다음 장면을 만드세요.'}};}
const fields=Object.keys(createProject()).sort().join(',');
function exact(obj,names){if(!obj||typeof obj!=='object'||Array.isArray(obj)||Object.keys(obj).sort().join(',')!==[...names].sort().join(','))throw Error('프로젝트 형식이 올바르지 않습니다.');}
function text(v,max){if(typeof v!=='string'||!v.trim()||v.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(v))throw Error('빈 글, 너무 긴 글, 제어 문자는 사용할 수 없습니다.');}
export function validateProject(p){exact(p,fields.split(','));if(p.schema!=='minz-design-project-v5'||p.version!==1||!scenes.includes(p.scene)||!scenes.includes(p.palette)||!['hero','landing'].includes(p.layout)||!['off','subtle','showcase'].includes(p.motion)||!['compact','comfortable','spacious'].includes(p.spacing)||!['sans','serif'].includes(p.font))throw Error('지원하지 않는 디자인 옵션입니다.');
 for(const [k,max] of Object.entries({brand:64,headline:120,description:320,cta:40,eyebrow:80,storyTitle:120,storyBody:500,faqQuestion:120,faqAnswer:500}))text(p[k],max);
 if(!Array.isArray(p.sections)||p.sections.length!==5||new Set(p.sections.map(s=>s.id)).size!==5)throw Error('섹션 순서가 올바르지 않습니다.');for(const s of p.sections){exact(s,['id','visible']);if(!sectionIds.includes(s.id)||typeof s.visible!=='boolean'||s.id==='hero'&&!s.visible)throw Error('히어로는 표시되어야 합니다.');}
 if(p.sections[0].id!=='hero')throw Error('히어로는 첫 섹션이어야 합니다.');if(!Array.isArray(p.features)||p.features.length!==3)throw Error('특징 카드 세 개가 필요합니다.');for(const f of p.features){exact(f,['title','body']);text(f.title,80);text(f.body,240);}
 exact(p.video,['resolution','duration','caption']);if(!['1280x720','720x1280'].includes(p.video.resolution)||![6,10].includes(p.video.duration))throw Error('지원하지 않는 영상 설정입니다.');text(p.video.caption,100);return p;
}
export const clone=p=>JSON.parse(JSON.stringify(p));
export const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
