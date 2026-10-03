"use client";
import {useEffect,useRef,useState} from "react";
import type {PocketGuide} from "@/lib/pocket-money/guide";
import {clearResume,loadResume,resolveResume,saveResume,type ResumeResolution,type ResumeStorage} from "@/lib/pocket-money/resume";
import styles from "./pocket-money.module.css";
function sessionStore():ResumeStorage|null{try{return window.sessionStorage;}catch{return null;}}
function readSession(guide:PocketGuide){
 const store=sessionStore();if(!store)return {saved:null,available:false};
 try{const raw=store.getItem(`pocket-money:resume:${guide.id}`);if(raw===null)return {saved:null,available:true};try{return {saved:JSON.parse(raw) as unknown,available:true};}catch{return {saved:{},available:true};}}
 catch{return {saved:null,available:false};}
}
export function GuideResume({guide}:{guide:PocketGuide}){
 const [resume,setResume]=useState<ResumeResolution|null>(null),[message,setMessage]=useState("");
 const current=useRef<string>(guide.steps[0].id),cleared=useRef(false);
 useEffect(()=>{
  const refresh=()=>{const stored=readSession(guide),resolution=resolveResume(guide,stored.saved,window.location.hash);current.current=resolution.stepId;setResume(resolution);if(!stored.available)setMessage("읽기 위치를 저장할 수 없어요. 단계 링크는 계속 사용할 수 있어요.");else if(resolution.stale)setMessage("저장된 단계가 바뀌어 유효한 단계부터 안내해요.");};
  const persist=()=>{if(!cleared.current&&!saveResume(sessionStore(),guide,current.current))setMessage("읽기 위치를 저장할 수 없어요. 단계 링크는 계속 사용할 수 있어요.");};
  const scroll=()=>{let id=guide.steps[0].id;for(const step of guide.steps){const node=document.getElementById(`step-${step.id}`);if(node&&node.getBoundingClientRect().top<=window.innerHeight*.4)id=step.id;}current.current=id;};
  const visibility=()=>{if(document.visibilityState==="hidden")persist();else refresh();};
  const hash=()=>{cleared.current=false;const resolved=resolveResume(guide,loadResume(sessionStore(),guide),window.location.hash);current.current=resolved.stepId;saveResume(sessionStore(),guide,resolved.stepId);setResume(resolved);};
  const click=(event:MouseEvent)=>{if((event.target as Element)?.closest?.('a[href^="http"]'))persist();};
  const timer=window.setTimeout(refresh,0);
  window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("pagehide",persist);window.addEventListener("pageshow",refresh);window.addEventListener("hashchange",hash);
  document.addEventListener("visibilitychange",visibility);document.addEventListener("click",click,true);
  return()=>{window.clearTimeout(timer);window.removeEventListener("scroll",scroll);window.removeEventListener("pagehide",persist);window.removeEventListener("pageshow",refresh);window.removeEventListener("hashchange",hash);document.removeEventListener("visibilitychange",visibility);document.removeEventListener("click",click,true);};
 },[guide]);
 const move=(stepId:string)=>{cleared.current=false;current.current=stepId;saveResume(sessionStore(),guide,stepId);window.history.replaceState(null,"",`#step-${stepId}`);document.getElementById(`step-${stepId}`)?.scrollIntoView({block:"start"});setResume({stepId,source:"hash",stale:false});};
 const clear=()=>{
  if(cleared.current||!window.confirm("이 탭의 저장된 읽기 위치를 지울까요?"))return;
  if(!clearResume(sessionStore(),guide.id)){setMessage("읽기 위치를 지우지 못했어요. 현재 읽기 위치를 유지합니다. 잠시 후 다시 눌러 주세요.");return;}
  cleared.current=true;current.current=guide.steps[0].id;window.history.replaceState(null,"",window.location.pathname+window.location.search);setResume(null);setMessage("이 탭의 읽기 위치를 지웠어요.");
 };
 const number=guide.steps.findIndex(s=>s.id===resume?.stepId)+1;
 return <aside className={styles.resumePanel} aria-label="읽기 위치" data-testid="resume-panel">
 <p aria-live="polite">{number>0?`${number}단계부터 이어 읽기`:"같은 탭에서 읽던 단계부터 이어 읽어요."}</p>
 <div className={styles.resumeActions}>{resume?<button type="button" data-primary-target onClick={()=>move(resume.stepId)}>이어 읽기</button>:null}
 <button type="button" data-primary-target onClick={()=>move(guide.steps[0].id)}>처음부터 읽기</button>
 <button type="button" data-primary-target onClick={clear}>읽기 위치 지우기</button></div>
 <p className={styles.small}>이 탭의 읽기 위치만 기억해요. 가입·참여·지급 완료를 확인하지 않아요.</p>
 {message?<p role="status" className={styles.small}>{message}</p>:null}</aside>;
}
