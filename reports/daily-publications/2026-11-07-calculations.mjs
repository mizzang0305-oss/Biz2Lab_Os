import assert from 'node:assert/strict';
const profiles=[[4,'ABC'],[3,'BCA'],[2,'CAB']];
const votes=(a,b)=>profiles.reduce((s,[n,p])=>s+(p.indexOf(a)<p.indexOf(b)?n:0),0);
assert.deepEqual([votes('A','B'),votes('B','C'),votes('C','A')],[6,7,5]);
const win=(a,b)=>votes(a,b)>4?a:b;
assert.deepEqual([win(win('A','B'),'C'),win(win('B','C'),'A'),win(win('C','A'),'B')],['C','A','B']);
assert.deepEqual([...'ABC'].map(a=>profiles.reduce((s,[n,p])=>s+n*(2-p.indexOf(a)),0)),[10,10,7]);
const edges=[['A','B'],['A','B'],['A','C'],['A','C'],['A','D'],['B','D'],['C','D']];
function degree(es){return [...'ABCD'].map(v=>es.flat().filter(x=>x===v).length)}
assert.deepEqual(degree(edges),[5,3,3,3]);
function check(es,route){let unused=es.map((e,i)=>({e,i}));for(let j=1;j<route.length;j++){const k=unused.findIndex(({e})=>e.includes(route[j-1])&&e.includes(route[j]));assert.ok(k>=0);unused.splice(k,1)}assert.equal(unused.length,0)}
const e8=[...edges,['B','C']],e9=[...e8,['A','D']];
check(e8,[...'ABACBDCAD']);check(e9,[...'ABACBDCADA']);
assert.deepEqual(degree(e8),[5,4,4,3]);assert.deepEqual(degree(e9),[6,4,4,4]);
const ages=[0,.01,.05].map(c=>-5730*Math.log2((1-c)*.25+c));
assert.deepEqual(ages.map(Math.round),[11460,11216,10305]);
assert.deepEqual(ages.map(t=>Math.round(11460-t)),[0,244,1155]);
console.log(JSON.stringify({votes:[6,7,5],borda:[10,10,7],routes:'all edges exactly once',ages},null,2));
