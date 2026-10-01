import {renderLanding,diagnostics,pauseMotions} from './landing.mjs';
const catalog=await(await fetch('./catalog.json')).json();
window.factoryPreview={apply:p=>renderLanding(p,catalog.scenes),diagnostics,stop:pauseMotions,async qa(){
 pauseMotions();if(!window.axe){await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='./oss/axe-core/axe.min.js';s.onload=resolve;s.onerror=()=>reject(Error('접근성 검사 도구를 불러오지 못했습니다.'));document.head.append(s);});}
 const r=await axe.run(document,{preload:false,iframes:false,runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});
 return {engine:r.testEngine,testedAt:r.timestamp,violations:r.violations,incomplete:r.incomplete,passes:r.passes.map(p=>p.id),certification:false};}};
window.dispatchEvent(new Event('factory-ready'));
