import {test,expect,type BrowserContext} from "@playwright/test";
import fs from "node:fs";
const origin=`http://127.0.0.1:${process.env.POCKET_PREVIEW_PORT??"33153"}`;
const proof=new WeakMap<BrowserContext,{external:string[];writes:string[]}>();
test.beforeAll(()=>{fs.mkdirSync("reports/local",{recursive:true});fs.writeFileSync("reports/local/pocket-money-home-motion-network.jsonl","");});
test.beforeEach(async({context})=>{
 const record={external:[] as string[],writes:[] as string[]};proof.set(context,record);
 context.on("request",r=>{if(new URL(r.url()).origin!==origin)record.external.push(r.url());if(!["GET","HEAD"].includes(r.method()))record.writes.push(r.method());});
 await context.route("**/*",r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
});
test.afterEach(async({context},info)=>{
 const record=proof.get(context)!;fs.mkdirSync("reports/local",{recursive:true});
 fs.appendFileSync("reports/local/pocket-money-home-motion-network.jsonl",JSON.stringify({scenario:info.title,externalAttempts:record.external.length,writeAttempts:record.writes.length})+"\n");
 expect(record.external).toEqual([]);expect(record.writes).toEqual([]);
});
for(const width of [360,390,430])test(`bold mobile home ${width}px keeps large type readable and touch targets usable`,async({page})=>{
 await page.setViewportSize({width,height:844});await page.goto("/",{waitUntil:"networkidle"});
 const heading=page.getByRole("heading",{level:1});await expect(heading).toHaveText("용돈 벌기, 가입하기 전에 조건부터.");
 expect(await heading.evaluate(n=>parseFloat(getComputedStyle(n).fontSize))).toBeGreaterThanOrEqual(38);
 expect(await page.locator('[data-testid="home-surface"]').evaluate(n=>getComputedStyle(n).backgroundColor)).toBe("rgb(16, 8, 36)");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 for(const node of await page.locator("[data-primary-target]").all()){const b=await node.boundingBox();expect(b?.height).toBeGreaterThanOrEqual(48);expect(b?.width).toBeGreaterThanOrEqual(48);}
 for(const button of await page.getByRole("button").all())expect((await button.boundingBox())?.height).toBeLessThanOrEqual(88);
 await page.getByRole("button",{name:"초등학생",exact:true}).click();await expect(page.getByTestId("audience-notice")).toContainText("만 14세 이상");
 await page.getByRole("button",{name:"중학생",exact:true}).click();await expect(page.getByTestId("audience-notice")).toContainText("학년만으로");
 expect(await page.locator("input,form,textarea").count()).toBe(0);
});
test("touch burst is decorative, short, bounded and rate limited",async({page})=>{
 await page.goto("/",{waitUntil:"networkidle"});const button=page.getByRole("button",{name:"중학생",exact:true});
 await button.click();const burst=page.getByTestId("touch-burst");await expect(burst).toHaveCount(1);
 await expect(burst).toHaveAttribute("aria-hidden","true");expect(await burst.locator("i").count()).toBeLessThanOrEqual(8);
 await expect(button).toHaveAttribute("aria-pressed","true");
 await page.waitForTimeout(700);await expect(burst).toHaveCount(0);await button.click();await expect(burst).toHaveCount(0);
 await page.waitForTimeout(1400);await button.click();await expect(burst).toHaveCount(1);
 await page.waitForTimeout(700);expect(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==="running").length)).toBe(0);
});
test("scroll entrance occurs once and content never relies on animation",async({page})=>{
 await page.goto("/",{waitUntil:"networkidle"});const card=page.locator("[data-home-reveal]").last();
 await card.scrollIntoViewIfNeeded();await expect(card).toHaveAttribute("data-reveal-played","true");
 await page.waitForTimeout(400);await page.evaluate(()=>scrollTo(0,0));await card.scrollIntoViewIfNeeded();
 expect(await card.evaluate(n=>n.getAnimations().filter(a=>a.playState==="running").length)).toBe(0);
 expect(await card.evaluate(n=>getComputedStyle(n).opacity)).toBe("1");
});
test("reduced motion disables effects while keyboard selection and navigation still work",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/",{waitUntil:"networkidle"});
 const button=page.getByRole("button",{name:"중학생",exact:true});await button.focus();await page.keyboard.press("Enter");
 await expect(button).toHaveAttribute("aria-pressed","true");await expect(page.getByTestId("touch-burst")).toHaveCount(0);
 expect(await button.evaluate(n=>getComputedStyle(n).outlineStyle)).not.toBe("none");
 await page.locator("[data-home-reveal]").last().scrollIntoViewIfNeeded();
 expect(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==="running").length)).toBe(0);
});
test("200 percent text zoom and no-JS fallback preserve conditions and health navigation",async({browser,page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto("/",{waitUntil:"networkidle"});
 await page.addStyleTag({content:'html{font-size:200% !important}'});
 expect(await page.getByRole("button",{name:"중학생",exact:true}).evaluate(n=>parseFloat(getComputedStyle(n).fontSize))).toBeGreaterThanOrEqual(32);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 for(const badge of await page.locator("#guides span").all()){
  const box=await badge.boundingBox(),parent=await badge.evaluate(n=>n.parentElement!.getBoundingClientRect().toJSON());
  expect(box!.x).toBeGreaterThanOrEqual(parent.left-1);expect(box!.x+box!.width).toBeLessThanOrEqual(parent.right+1);
 }
 await expect(page.getByRole("heading",{level:1})).toBeVisible();
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const fallback=await context.newPage();await fallback.goto(origin+"/");await expect(fallback.getByRole("heading",{level:1})).toBeVisible();
 await expect(fallback.getByRole("link",{name:"건강 정보",exact:true})).toHaveAttribute("href","/health");
 await expect(fallback.locator("#guides")).toContainText("준비 중");await context.close();
});
test("changing reduced-motion preference cancels an active burst without changing selection",async({page})=>{
 await page.goto("/",{waitUntil:"networkidle"});const button=page.getByRole("button",{name:"중학생",exact:true});await button.click();
 await expect(page.getByTestId("touch-burst")).toHaveCount(1);await page.emulateMedia({reducedMotion:"reduce"});
 await expect(page.getByTestId("touch-burst")).toHaveCount(0);await expect(button).toHaveAttribute("aria-pressed","true");
});
test("keyboard traversal keeps focused actions visible above the fixed navigation",async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto("/",{waitUntil:"networkidle"});
 for(let i=0;i<8;i++){
  await page.keyboard.press("Tab");
  const focused=await page.evaluate(()=>{const n=document.activeElement as HTMLElement,b=n.getBoundingClientRect(),nav=document.querySelector('nav[aria-label="빠른 메뉴"]')!.getBoundingClientRect();return {text:n.innerText,top:b.top,bottom:b.bottom,navTop:nav.top,inNav:n.closest('nav')!==null,outline:getComputedStyle(n).outlineStyle};});
  expect(focused.top).toBeGreaterThanOrEqual(0);if(!focused.inNav)expect(focused.bottom).toBeLessThanOrEqual(focused.navTop);expect(focused.outline).not.toBe("none");
 }
});
