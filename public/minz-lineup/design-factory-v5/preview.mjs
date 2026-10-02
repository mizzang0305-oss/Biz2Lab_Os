import {renderLanding,diagnostics,pauseMotions} from './landing.mjs';
window.factoryState={status:'loading'};
try{
const response=await fetch('./catalog.json');if(!response.ok)throw Error('catalog unavailable');
const catalog=await response.json();
let qaTail=Promise.resolve(),axeLoading=null;
async function scan(signal){
 const check=()=>{if(signal?.aborted)throw new DOMException('검사를 취소했습니다.','AbortError');};check();
 pauseMotions();if(!window.axe){if(!axeLoading)axeLoading=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='./oss/axe-core/axe.min.js';s.onload=resolve;s.onerror=()=>{s.remove();reject(Error('접근성 검사 도구를 불러오지 못했습니다.'));};document.head.append(s);}).catch(e=>{axeLoading=null;throw e;});await axeLoading;}check();
 const r=await axe.run(document,{preload:false,iframes:false,runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});
 check();return {engine:r.testEngine,testedAt:r.timestamp,violations:r.violations,incomplete:r.incomplete,passes:r.passes.map(p=>p.id),certification:false};}
window.factoryPreview={apply:p=>renderLanding(p,catalog.scenes),diagnostics,stop:pauseMotions,qa({signal}={}){
 const task=qaTail.then(()=>scan(signal));qaTail=task.catch(()=>{});return task;}};
window.factoryState={status:'ready'};
window.dispatchEvent(new Event('factory-ready'));
}catch(e){window.factoryState={status:'error'};window.dispatchEvent(new Event('factory-error'));}
