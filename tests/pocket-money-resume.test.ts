import assert from "node:assert/strict";import test from "node:test";
import {firstGuideDraft as guide} from "../lib/pocket-money/first-guide";
import {resolveResume,loadResume,saveResume,clearResume} from "../lib/pocket-money/resume";
const key="pocket-money:resume:declaration-finish";
const state=(stepId="declaration-entry")=>({guideId:guide.id,version:guide.version,stepId});
function storage(initial?:string){const map=new Map<string,string>();if(initial!==undefined)map.set(key,initial);return{getItem:(k:string)=>map.get(k)??null,setItem:(k:string,v:string)=>{map.set(k,v);},removeItem:(k:string)=>{map.delete(k);},map};}
test("valid fragment wins over saved position and invalid fragments fall back safely",()=>{
 assert.equal(resolveResume(guide,state(),"#step-consent-register").source,"hash");
 assert.equal(resolveResume(guide,state(),"#step-consent-register").stepId,"consent-register");
 assert.equal(resolveResume(guide,state("consent-register"),"#step-unknown").stepId,"consent-register");
 for(const fragment of ["","%","#step-%","javascript:bad","#step-__proto__"])assert.equal(resolveResume(guide,null,fragment).stepId,"declaration-entry");
});
test("another guide, version, deleted step or malformed state is never resumed",()=>{
 for(const saved of [null,{},42,"x",{...state(),guideId:"other"},{...state(),version:"old"},{...state(),stepId:"deleted"}]){
 const result=resolveResume(guide,saved,"");assert.equal(result.source,"start");assert.equal(result.stepId,"declaration-entry");}
 assert.equal(resolveResume({...guide,version:"next"},state(),"").stale,true);
 assert.equal(resolveResume(guide,{...state(),stepId:"deleted"},"").stale,true);
});
test("two tab stores independently retain only the guide version and reading step",()=>{
 const a=storage(),b=storage();assert.equal(saveResume(a,guide,"declaration-entry"),true);assert.equal(saveResume(b,guide,"consent-register"),true);
 assert.equal(loadResume(a,guide)?.stepId,"declaration-entry");assert.equal(loadResume(b,guide)?.stepId,"consent-register");
 assert.deepEqual(JSON.parse(a.map.get(key)!),state());
 clearResume(a,guide.id);assert.equal(loadResume(a,guide),null);assert.equal(loadResume(b,guide)?.stepId,"consent-register");
});
test("blocked, null and corrupted storage cannot break reading or save invalid steps",()=>{
 const denied={getItem(){throw new Error("SecurityError");},setItem(){throw new Error("QuotaExceededError");},removeItem(){throw new Error("SecurityError");}};
 for(const s of [null,denied]){assert.equal(loadResume(s,guide),null);assert.equal(saveResume(s,guide,"declaration-entry"),false);assert.doesNotThrow(()=>clearResume(s,guide.id));}
 const bad=storage("{");assert.equal(loadResume(bad,guide),null);
 const wrong=storage(JSON.stringify({...state(),version:"old"}));assert.equal(loadResume(wrong,guide),null);
 const good=storage();assert.equal(saveResume(good,guide,"deleted"),false);assert.equal(good.map.size,0);
});
test("clearing reports success only after removing this guide record",()=>{
 const s=storage(JSON.stringify(state("consent-register")));s.map.set("synthetic-other-guide","keep");
 assert.equal(clearResume(s,guide.id),true);assert.equal(s.getItem(key),null);assert.equal(s.getItem("synthetic-other-guide"),"keep");
 assert.equal(clearResume(s,guide.id),true);
});
test("failed or unavailable clearing preserves the synthetic saved record and permits retry",()=>{
 const s=storage(JSON.stringify(state("consent-register"))),before=s.getItem(key);
 const failed={...s,removeItem(){throw new Error("SecurityError");}};
 assert.equal(clearResume(failed,guide.id),false);assert.equal(s.getItem(key),before);
 assert.equal(clearResume(null,guide.id),false);
 assert.equal(clearResume(s,guide.id),true);assert.equal(s.getItem(key),null);
});

