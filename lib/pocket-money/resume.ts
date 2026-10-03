import type { PocketGuide } from "./guide";
export type ResumeState={guideId:string;version:string;stepId:string};
export type ResumeStorage=Pick<Storage,"getItem"|"setItem"|"removeItem">;
export type ResumeResolution={stepId:string;source:"hash"|"storage"|"start";stale:boolean};
const key=(id:string)=>`pocket-money:resume:${id}`;
function validState(guide:PocketGuide,saved:unknown):saved is ResumeState{
 if(!saved||typeof saved!=="object")return false;
 const s=saved as Partial<ResumeState>;
 return s.guideId===guide.id&&s.version===guide.version&&typeof s.stepId==="string"&&guide.steps.some(step=>step.id===s.stepId);
}
export function resolveResume(guide:PocketGuide,saved:unknown,fragment:string):ResumeResolution{
 const stale=saved!=null&&!validState(guide,saved);
 const id=fragment.startsWith("#step-")?fragment.slice(6):"";
 if(guide.steps.some(step=>step.id===id))return{stepId:id,source:"hash",stale};
 if(validState(guide,saved))return{stepId:saved.stepId,source:"storage",stale:false};
 return{stepId:guide.steps[0].id,source:"start",stale};
}
export function loadResume(storage:ResumeStorage|null,guide:PocketGuide):ResumeState|null{
 try{const raw=storage?.getItem(key(guide.id));if(!raw)return null;const saved:unknown=JSON.parse(raw);return validState(guide,saved)?{guideId:guide.id,version:guide.version,stepId:saved.stepId}:null;}catch{return null;}
}
export function saveResume(storage:ResumeStorage|null,guide:PocketGuide,stepId:string):boolean{
 if(!storage||!guide.steps.some(step=>step.id===stepId))return false;
 try{storage.setItem(key(guide.id),JSON.stringify({guideId:guide.id,version:guide.version,stepId}));return true;}catch{return false;}
}
export function clearResume(storage:ResumeStorage|null,guideId:string):boolean{
 if(!storage)return false;
 try{storage.removeItem(key(guideId));return true;}catch{return false;}
}

