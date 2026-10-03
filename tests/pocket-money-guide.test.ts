import assert from "node:assert/strict";
import test from "node:test";
import { validateGuide,getPocketGuide,getPublishedPocketGuides } from "../lib/pocket-money/guide";
import { firstGuideDraft } from "../lib/pocket-money/first-guide";
const copy=()=>structuredClone(firstGuideDraft);
test("unprepared real photos keep first guide draft and outside public registry",()=>{
 assert.equal(validateGuide(firstGuideDraft).status,"draft");
 assert.equal(getPocketGuide("declaration-finish"),undefined);
 assert.equal(getPocketGuide("unknown"),undefined);
 assert.deepEqual(getPublishedPocketGuides(),[]);
 const input=copy();input.status="published";input.publicationApproved=true;
 assert.throws(()=>validateGuide(input));
});
test("the verified scope stays two photo3/7 steps with no payout or login claim",()=>{
 const input=validateGuide(firstGuideDraft);
 assert.equal(input.scope,"정보 입력 이후 선언 마무리");
 assert.equal(input.steps.length,2);
 assert.deepEqual(input.steps.map(s=>s.photoId),["libfile_20a21205d1f88191adfc615d8a61f238","libfile_56d3f30ee2608191b4aecbd006289356"]);
 assert.deepEqual(input.observations,{signup:"verified",certificate:"verified",points:"unverified",cash:"unverified",login:"unverified"});
});
test("publication rejects wrong, duplicate and unreviewed photo identities",()=>{
 const valid={...copy(),status:"published",publicationApproved:true,photos:[3,7].map((n,i)=>({
 inputNumber:n,imageId:firstGuideDraft.steps[i].photoId,image:`/images/pocket-money/photo-${n}.jpg`,originalSha256:"a".repeat(64),publishedSha256:"b".repeat(64),width:1044,height:2048,altKo:"테스트 전용 설명",sourceUrl:"https://www.cpoint.or.kr/netzero/climateCitizen/nv_climateCitizen.do",
 reuseScopeVerified:true,piiReviewed:true,consumerFileVerified:true,publicPixelsReviewed:true,platform:"unknown"}))};
 assert.deepEqual(validateGuide(valid).photos.map(p=>p.inputNumber),[3,7]);
 for(const n of [1,2,4,5,6,8,9,10]){const input=structuredClone(valid);input.photos[0].inputNumber=n;assert.throws(()=>validateGuide(input));}
 for(const field of ["reuseScopeVerified","piiReviewed","consumerFileVerified","publicPixelsReviewed"]){const input=structuredClone(valid);Object.assign(input.photos[0],{[field]:false});assert.throws(()=>validateGuide(input));}
 const unknown=structuredClone(valid);unknown.steps[0].photoId="unknown";assert.throws(()=>validateGuide(unknown));
 const duplicate=structuredClone(valid);duplicate.photos[1]=duplicate.photos[0];assert.throws(()=>validateGuide(duplicate));
 const traversal=structuredClone(valid);traversal.photos[0].image="/images/pocket-money/../private.jpg";assert.throws(()=>validateGuide(traversal));
});

