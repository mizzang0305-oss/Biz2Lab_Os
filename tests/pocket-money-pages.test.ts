import "./helpers/register-pocket-css";
import assert from "node:assert/strict";import test from "node:test";
import {createElement} from "react";import {renderToStaticMarkup} from "react-dom/server";
import {PocketGuide} from "../components/pocket-money/PocketGuide";
import {PocketMoneyHome} from "../components/pocket-money/PocketMoneyHome";
import {createPocketMetadata,siteSchemasForPath} from "../lib/pocket-money/seo";
import {firstGuideDraft} from "../lib/pocket-money/first-guide";
import {validateGuide,getPublishedPocketGuides} from "../lib/pocket-money/guide";
import {generateStaticParams} from "../app/pocket-money/guides/[slug]/page";
test("two-step SSR uses one approved photo each and distinguishes completion from payout",()=>{
 const guide=validateGuide({...firstGuideDraft,status:"published",publicationApproved:true,photos:[3,7].map((n,i)=>({inputNumber:n,imageId:firstGuideDraft.steps[i].photoId,image:`/images/pocket-money/test-${n}.jpg`,originalSha256:"a".repeat(64),publishedSha256:"b".repeat(64),width:1044,height:2048,altKo:`테스트 사진${n}`,sourceUrl:"https://www.cpoint.or.kr/netzero/climateCitizen/nv_climateCitizen.do",reuseScopeVerified:true,piiReviewed:true,consumerFileVerified:true,publicPixelsReviewed:true,platform:"unknown"}))});
 const html=renderToStaticMarkup(createElement(PocketGuide,{guide}));
 assert.ok(html.includes("정보 입력 이후 선언 마무리"));
 assert.ok(html.includes("포인트 적립·현금 지급·별도 로그인 성공은 미확인"));
 assert.equal((html.match(/data-guide-step=/g)??[]).length,2);
 assert.equal((html.match(/<img /g)??[]).length,2);
 assert.doesNotMatch(html,/<input|<textarea|<form|시민증\.jpg|보장 수익/);
 assert.ok(html.includes("기후행동 지구의 시민 등록하기"));
 assert.ok(html.includes("기준 기기 미확인"));
});
test("home shows concrete opportunities and actions without the retired health surface",()=>{
 const html=renderToStaticMarkup(createElement(PocketMoneyHome));
 const text=html.replace(/<[^>]+>/g,"");
 for(const copy of ["용돈벌이·부업, 할 일부터 골라요","패널나우","탄소중립포인트","크라우드웍스","방법 보기","공식 시작","만 14세 이상","연령 조건 미확인","소요시간 미확인"])assert.ok(text.includes(copy),copy);
 assert.equal((html.match(/data-opportunity=/g)??[]).length,4);
 assert.doesNotMatch(html,/href="\/health|오누림|<form|추천인|예상 수익/);
 assert.deepEqual(getPublishedPocketGuides(),[]);
 assert.doesNotMatch(html,/href="\/pocket-money\/guides\/declaration-finish"/);
 assert.deepEqual(generateStaticParams(),[]);
});

test("pocket metadata stays distinct and retired routes receive no public site schema",()=>{
 const metadata=createPocketMetadata({title:"즐거운 용돈벌이",description:"조건부터 읽기",path:"/"});
 assert.equal(metadata.alternates?.canonical,"https://www.biz2lab.com/");
 assert.deepEqual(metadata.title,{absolute:"즐거운 용돈벌이"});
 assert.equal(metadata.applicationName,"즐거운 용돈벌이");
 assert.deepEqual(siteSchemasForPath("/health"),[]);
 assert.deepEqual(siteSchemasForPath("/health/guides/a"),[]);
 assert.deepEqual(siteSchemasForPath(null),[]);
 for(const route of ["/","/pocket-money","/pocket-money/guides/declaration-finish"])assert.ok(JSON.stringify(siteSchemasForPath(route)).includes("즐거운 용돈벌이"));
 assert.ok(!JSON.stringify(siteSchemasForPath("/pocket-money-else")).includes("즐거운 용돈벌이"));
});

