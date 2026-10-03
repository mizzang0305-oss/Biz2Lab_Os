import assert from "node:assert/strict";
import test from "node:test";
import {NextRequest} from "next/server";
import {unstable_doesMiddlewareMatch} from "next/experimental/testing/server";
import {proxy,config} from "../proxy";
import {isRetiredPublicPath,isRetiredImage} from "../lib/public-retirement";
import {healthInventory} from "../scripts/snapshot-health39";
import {opportunities,filterOpportunities,opportunityCategories} from "../lib/pocket-money/opportunities";
import sitemap from "../app/sitemap";
import {GET} from "../app/rss.xml/route";
import PocketMoneyAlias from "../app/pocket-money/page";

test("all 39 articles, 46 auxiliary URLs, hub and assets retire before rendering",async()=>{
  const inventory=healthInventory();
  const paths=["/health",...inventory.articles,...inventory.tools,...inventory.trust,"/health/samples/medication-list-blank.html","/health/review/medical/packet.csv","/images/onurim/example.png","/social/onurim/BZ-260929-001/instagram-v2-final.png","/pagefind/pagefind.js"];
  for(const path of paths){
    assert.equal(unstable_doesMiddlewareMatch({config,url:path}),true,path);
    for(const headers of [new Headers(),new Headers({rsc:"1","next-router-prefetch":"1"})]){
      const response=proxy(new NextRequest(`https://www.biz2lab.com${path}`,{headers}));
      assert.equal(response.status,410,path);assert.match(response.headers.get("x-robots-tag")!,/noindex/);
      assert.equal(await response.text(),"이 페이지는 더 이상 제공하지 않습니다.");
    }
  }
});
test("health image optimization is blocked without blocking unrelated images",()=>{
  assert.equal(unstable_doesMiddlewareMatch({config,url:"/_next/image?url=%2Fimages%2Fonurim%2Fa.png&w=640&q=75"}),true);
  for(const value of ["/images/onurim/a.png","https://www.biz2lab.com/images/onurim/a.png","/%68ealth/samples/a.html"]){
    assert.equal(isRetiredImage(value,"https://www.biz2lab.com"),true);
    assert.equal(proxy(new NextRequest(`https://www.biz2lab.com/_next/image?url=${encodeURIComponent(value)}&w=640&q=75`)).status,410);
  }
  assert.equal(proxy(new NextRequest("https://www.biz2lab.com/_next/image?url=%2Fimages%2Fother.png&w=640&q=75")).headers.get("x-middleware-next"),"1");
  for(const path of ["/","/healthier","/pocket-money","/api/contact"]){assert.equal(isRetiredPublicPath(path),false);assert.equal(unstable_doesMiddlewareMatch({config,url:path}),false);}
});
test("legacy redirect and admin gate still fail closed",()=>{
  assert.equal(proxy(new NextRequest("https://www.biz2lab.com/ko")).status,308);
  assert.equal(proxy(new NextRequest("https://www.biz2lab.com/ko/about")).status,410);
  assert.equal(proxy(new NextRequest("https://www.biz2lab.com/admin/content-automation")).status,404);
});
test("sitemap includes the site disclosure without retired health; duplicate home redirects",async()=>{
  assert.deepEqual(sitemap().map(entry=>entry.url),["https://www.biz2lab.com/","https://www.biz2lab.com/privacy"]);
  const rss=await GET().text();assert.doesNotMatch(rss,/health|onurim|오누림/);assert.equal((rss.match(/<item>/g)??[]).length,opportunities.length);
  assert.throws(()=>PocketMoneyAlias(),error=>error instanceof Error && "digest" in error && error.digest==="NEXT_REDIRECT;replace;/;308;");
});
test("every category has actionable official information with visible constraints",()=>{
  for(const category of opportunityCategories)assert.ok(filterOpportunities(category).length>0,category);
  assert.equal(new Set(opportunities.map(item=>item.id)).size,opportunities.length);
  for(const item of opportunities){
    for(const value of [item.task,item.reward,item.age,item.cost,item.deadline,item.duration,item.conditions])assert.ok(value.length>0);
    assert.equal(new URL(item.startUrl).protocol,"https:");assert.ok(item.sources.length);assert.ok(item.steps.length>=2);
    assert.ok(item.sources.every(source=>new URL(source.url).protocol==="https:"));
  }
  assert.ok(!filterOpportunities("전체",true).some(item=>item.minimumAge===null));
  assert.equal(opportunities.find(item=>item.id==="crowdworks-labeling")?.minimumAge,null);
});
