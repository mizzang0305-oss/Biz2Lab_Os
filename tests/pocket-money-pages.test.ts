import "./helpers/register-pocket-css";
import assert from "node:assert/strict";import test from "node:test";
import {createElement} from "react";import {renderToStaticMarkup} from "react-dom/server";
import {PocketGuide} from "../components/pocket-money/PocketGuide";
import {PocketMoneyHome} from "../components/pocket-money/PocketMoneyHome";
import {createPocketMetadata,siteSchemasForPath} from "../lib/pocket-money/seo";
import {organizationJsonLd,websiteJsonLd} from "../lib/seo";
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
test("home exposes age conditions without treating grade as participation eligibility",()=>{
 const html=renderToStaticMarkup(createElement(PocketMoneyHome));
 for(const copy of ["즐거운 용돈벌이","용돈 벌기, 가입하기 전에 조건부터.","초등학생","중학생","고등학생","대학생"])assert.ok(html.includes(copy),copy);
 assert.ok(html.includes('href="/health"'));
 assert.doesNotMatch(html,/<input|<form|추천인|예상 수익/);
 assert.deepEqual(getPublishedPocketGuides(),[]);
 assert.doesNotMatch(html,/href="\/pocket-money\/guides\/declaration-finish"/);
 assert.deepEqual(generateStaticParams(),[]);
});
test("new route metadata overrides root while health schemas remain exact",()=>{
 const metadata=createPocketMetadata({title:"즐거운 용돈벌이",description:"조건부터 읽기",path:"/"});
 assert.equal(metadata.alternates?.canonical,"https://www.biz2lab.com/");
 assert.deepEqual(metadata.title,{absolute:"즐거운 용돈벌이"});
 assert.equal(metadata.applicationName,"즐거운 용돈벌이");
 assert.deepEqual(siteSchemasForPath("/health"),[organizationJsonLd(),websiteJsonLd()]);
 assert.deepEqual(siteSchemasForPath("/health/guides/a"),[organizationJsonLd(),websiteJsonLd()]);
 assert.deepEqual(siteSchemasForPath(null),[]);
 for(const route of ["/","/pocket-money","/pocket-money/guides/declaration-finish"])assert.ok(JSON.stringify(siteSchemasForPath(route)).includes("즐거운 용돈벌이"));
 assert.ok(!JSON.stringify(siteSchemasForPath("/pocket-money-else")).includes("즐거운 용돈벌이"));
});

