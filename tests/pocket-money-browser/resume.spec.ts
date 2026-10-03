import {test,expect,type Page,type BrowserContext} from "@playwright/test";
import fs from "node:fs";
import {build} from "esbuild";
const origin=`http://127.0.0.1:${process.env.POCKET_PREVIEW_PORT??"33153"}`,harness=origin+"/__resume-test-harness";
const key="pocket-money:resume:declaration-finish";
let html="";
const network=new WeakMap<BrowserContext,{automatic:string[];writes:string[];intentional:number;allowNavigation:boolean}>();
test.beforeAll(async()=>{
 fs.mkdirSync("reports/local",{recursive:true});fs.writeFileSync("reports/local/pocket-money-resume-network.jsonl","");
 const output=await build({entryPoints:["tests/pocket-money-browser/resume-harness.tsx"],bundle:true,write:false,outdir:"out",format:"iife",loader:{".css":"local-css"},logLevel:"silent"});
 const js=output.outputFiles.find(f=>f.path.endsWith(".js"))!.text,css=output.outputFiles.find(f=>f.path.endsWith(".css"))!.text;
 html=`<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style><body><div id="root"></div><script>${js}</script></body></html>`;
});
test.beforeEach(async({context})=>{
 const proof={automatic:[] as string[],writes:[] as string[],intentional:0,allowNavigation:false};network.set(context,proof);
 context.on("request",r=>{const u=new URL(r.url());if(u.origin!==origin){if(proof.allowNavigation&&r.isNavigationRequest()&&r.url()==="https://www.cpoint.or.kr/netzero/climateCitizen/nv_climateCitizen.do"){proof.intentional++;proof.allowNavigation=false;}else proof.automatic.push(u.hostname);}if(r.method()!=="GET"&&r.method()!=="HEAD")proof.writes.push(r.method());});
 await context.route("**/*",async route=>{const u=new URL(route.request().url());if(u.origin!==origin)await route.abort();else if(u.pathname==="/__resume-test-harness")await route.fulfill({status:200,contentType:"text/html",body:html});else await route.continue();});
});
test.afterEach(async({context},info)=>{const proof=network.get(context)!;fs.appendFileSync("reports/local/pocket-money-resume-network.jsonl",JSON.stringify({scenario:info.title,automaticExternalAttempts:proof.automatic.length,writeAttempts:proof.writes.length,intentionalMockNavigations:proof.intentional})+"\n");expect(proof.automatic).toEqual([]);expect(proof.writes).toEqual([]);});
async function ready(page:Page,fragment=""){await page.goto(harness+fragment);await expect(page.getByTestId("resume-panel")).toBeVisible();await expect(page.getByRole("button",{name:"처음부터 읽기"})).toBeVisible();}
async function scrollSecond(page:Page){await page.locator("#step-consent-register").scrollIntoViewIfNeeded();await page.evaluate(()=>document.getElementById("step-consent-register")!.scrollIntoView({block:"start"}));await page.evaluate(()=>new Promise<void>(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r()))));}
for(const width of [360,390,430])test(`reading controls ${width}px resume after refresh without covering heading`,async({page})=>{
 await page.setViewportSize({width,height:844});await ready(page,"#step-consent-register");
 await expect(page.getByTestId("resume-panel")).toContainText("2단계부터 이어 읽기");
 await page.getByRole("button",{name:"이어 읽기",exact:true}).click();
 const y=(await page.locator("#step-consent-register h2").boundingBox())!.y;expect(y).toBeGreaterThanOrEqual(60);expect(y).toBeLessThan(300);
 await page.reload();await expect(page.getByTestId("resume-panel")).toContainText("2단계부터 이어 읽기");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test("external webpage then back preserves a scroll-derived step; repeated pageshow does not jump",async({page,context})=>{
 await context.route("https://www.cpoint.or.kr/netzero/climateCitizen/nv_climateCitizen.do",r=>r.fulfill({status:200,contentType:"text/html; charset=utf-8",body:'<meta charset="utf-8"><h1>로컬 모형 외부 안내</h1>'}));
 await ready(page);await scrollSecond(page);network.get(context)!.allowNavigation=true;await page.locator("#step-consent-register").getByRole("link",{name:"공식 안내 확인"}).click();
 await expect(page.getByRole("heading")).toHaveText("로컬 모형 외부 안내");
 await page.goBack();await expect(page.getByTestId("resume-panel")).toContainText("2단계부터 이어 읽기");
 const before=await page.evaluate(()=>scrollY);await page.evaluate(()=>{for(let i=0;i<3;i++)window.dispatchEvent(new PageTransitionEvent("pageshow",{persisted:true}));});
 expect(Math.abs((await page.evaluate(()=>scrollY))-before)).toBeLessThan(2);
});
test("two tabs refresh their own records independently",async({page,context})=>{
 const second=await context.newPage();await ready(page,"#step-declaration-entry");await ready(second,"#step-consent-register");
 await page.getByRole("button",{name:"이어 읽기",exact:true}).click();await second.getByRole("button",{name:"이어 읽기",exact:true}).click();
 await page.reload();await second.reload();await expect(page.getByTestId("resume-panel")).toContainText("1단계부터");await expect(second.getByTestId("resume-panel")).toContainText("2단계부터");
 await second.close();
});
test("sessionStorage property denied still allows manual step links and clear",async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,"sessionStorage",{get(){throw new DOMException("blocked","SecurityError");}}));
 await ready(page,"#step-consent-register");await expect(page.getByTestId("resume-panel")).toContainText("저장할 수 없어요");
 await page.getByRole("button",{name:"이어 읽기",exact:true}).click();await page.getByRole("button",{name:"읽기 위치 지우기"}).click();await expect(page.getByRole("status")).toHaveText("이 탭의 읽기 위치를 지웠어요.");
});
for(const [index,saved] of ["{",JSON.stringify({guideId:"declaration-finish",version:"old",stepId:"consent-register"}),JSON.stringify({guideId:"declaration-finish",version:"2026-10-03.1",stepId:"deleted"})].entries())test(`stale or corrupted record ${index} safely explains reset`,async({page})=>{
 await page.addInitScript(({key,saved})=>sessionStorage.setItem(key,saved),{key,saved});await ready(page);await expect(page.getByTestId("resume-panel")).toContainText("1단계부터");
 await expect(page.getByRole("status")).toContainText("저장된 단계가 바뀌어");
});
test("clearing a position survives hide and return and never records participation",async({page})=>{
 await ready(page,"#step-consent-register");await page.getByRole("button",{name:"이어 읽기",exact:true}).click();
 expect(JSON.parse((await page.evaluate(k=>sessionStorage.getItem(k),key))!)).toEqual({guideId:"declaration-finish",version:"2026-10-03.1",stepId:"consent-register"});
 await page.getByRole("button",{name:"읽기 위치 지우기"}).click();await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent("pagehide")));
 expect(await page.evaluate(k=>sessionStorage.getItem(k),key)).toBeNull();expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test("simulated visibility interruption resumes the scroll-derived position without jumping",async({page})=>{
 await ready(page);await scrollSecond(page);
 await page.evaluate(()=>{Object.defineProperty(document,"visibilityState",{configurable:true,value:"hidden"});document.dispatchEvent(new Event("visibilitychange"));});
 expect(JSON.parse((await page.evaluate(k=>sessionStorage.getItem(k),key))!).stepId).toBe("consent-register");
 const before=await page.evaluate(()=>scrollY);
 await page.evaluate(()=>{Object.defineProperty(document,"visibilityState",{configurable:true,value:"visible"});document.dispatchEvent(new Event("visibilitychange"));});
 await expect(page.getByTestId("resume-panel")).toContainText("2단계부터");expect(Math.abs((await page.evaluate(()=>scrollY))-before)).toBeLessThan(2);
});
