import {test,expect} from "@playwright/test";
import path from "node:path";
import fs from "node:fs";
import {execFile} from "node:child_process";
import {promisify} from "node:util";
const local=`http://127.0.0.1:${process.env.POCKET_PREVIEW_PORT??"33153"}`;
test.beforeEach(async({context})=>{
 await context.route("**/*",async route=>{const u=new URL(route.request().url());if(u.origin!==local)await route.abort();else await route.continue();});
});
for(const width of [360,390,430])test(`mobile main ${width}px preserves readable targets and zero external requests`,async({page,context})=>{
 const attempts:string[]=[];context.on("request",r=>{if(new URL(r.url()).origin!==local)attempts.push(r.url());});
 await page.setViewportSize({width,height:844});await page.goto("/",{waitUntil:"networkidle"});
 await expect(page.getByRole("heading",{level:1})).toHaveText("용돈 벌기, 가입하기 전에 조건부터.");
 await expect(page.getByRole("link",{name:"건강 정보",exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 for(const b of await page.locator("[data-primary-target]").all()){const box=await b.boundingBox();expect(box?.height).toBeGreaterThanOrEqual(48);}
 await page.getByRole("button",{name:"중학생",exact:true}).click();await expect(page.getByTestId("audience-notice")).toContainText("학년만으로");
 expect(await page.evaluate(()=>location.search)).toBe("");expect(await page.evaluate(()=>localStorage.length)).toBe(0);
 expect(await page.locator("input,textarea,form").count()).toBe(0);
 await page.screenshot({path:path.resolve(`../.pocket-money-${process.env.POCKET_PREVIEW_PORT==="33154"?"motion-":""}implementation`,`local-home-${width}.png`),fullPage:true});
 expect(attempts).toEqual([]);
});
test("unreviewed real images keep guide inaccessible and out of sitemap",async({page})=>{
 expect((await page.goto("/pocket-money/guides/declaration-finish"))?.status()).toBe(404);
 expect((await page.goto("/pocket-money/guides/unknown"))?.status()).toBe(404);
 const xml=await page.request.get("/sitemap.xml");expect(await xml.text()).not.toContain("/pocket-money/guides/declaration-finish");
});
test("health to new home uses each brand and never attempts ads or analytics",async({page,context})=>{
 const attempts:string[]=[];context.on("request",r=>{if(new URL(r.url()).origin!==local)attempts.push(r.url());});
 await page.goto("/health",{waitUntil:"networkidle"});await expect(page.getByRole("banner").getByRole("link",{name:"오누림 홈",exact:true})).toHaveAttribute("href","/health");
 await page.goto("/",{waitUntil:"networkidle"});
 expect((await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ")).toContain("즐거운 용돈벌이");
 expect((await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ")).not.toContain('"name":"오누림"');
 expect((await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ")).not.toContain('"name":"ONURIM"');
 await page.reload({waitUntil:"networkidle"});expect(attempts).toEqual([]);
});
test("health39 runtime body metadata sources schemas and 46 supporting URLs match frozen master",async()=>{
 test.setTimeout(120000);
 await promisify(execFile)(process.execPath,["node_modules/tsx/dist/cli.mjs","scripts/verify-pocket-money-health39.ts"],{env:process.env});
 const result=JSON.parse(fs.readFileSync("reports/local/pocket-money-health-runtime.json","utf8"));
 expect(result.changed).toEqual([]);expect(result.dataMatch).toBe(true);expect(result.protectedSourcesMatch).toBe(true);expect(result.articles).toBe(39);expect(result.auxiliary).toBe(46);
});
