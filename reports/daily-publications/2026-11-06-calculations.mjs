// Recompute the published examples. Values transcribed from Anscombe (1973), p.19,
// and cross-checked against https://svn.r-project.org/R/trunk/src/library/datasets/data/anscombe.R.
// These are constructed teaching data, not observations collected by Biz2Lab.
import assert from "node:assert/strict";
export const data = {
  "x": [
    10,
    8,
    13,
    9,
    11,
    14,
    6,
    4,
    12,
    7,
    5
  ],
  "x4": [
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    19,
    8,
    8,
    8
  ],
  "ys": [
    [
      8.04,
      6.95,
      7.58,
      8.81,
      8.33,
      9.96,
      7.24,
      4.26,
      10.84,
      4.82,
      5.68
    ],
    [
      9.14,
      8.14,
      8.74,
      8.77,
      9.26,
      8.1,
      6.13,
      3.1,
      9.13,
      7.26,
      4.74
    ],
    [
      7.46,
      6.77,
      12.74,
      7.11,
      7.81,
      8.84,
      6.08,
      5.39,
      8.15,
      6.42,
      5.73
    ],
    [
      6.58,
      5.76,
      7.71,
      8.84,
      8.47,
      7.04,
      5.25,
      12.5,
      5.56,
      7.91,
      6.89
    ]
  ]
};
export const stats = function stats(x,y){const sum=a=>a.reduce((a,b)=>a+b,0),n=x.length,mx=sum(x)/n,my=sum(y)/n,sxx=sum(x.map(v=>(v-mx)**2)),syy=sum(y.map(v=>(v-my)**2)),sxy=sum(x.map((v,i)=>(v-mx)*(y[i]-my))),slope=sxy/sxx;return {n,mx,my,sxx,syy,sxy,vx:sxx/(n-1),vy:syy/(n-1),slope,intercept:my-slope*mx,r:sxy/Math.sqrt(sxx*syy),r2:sxy**2/(sxx*syy)}};
export const summaries = data.ys.map((y,i) => stats(i === 3 ? data.x4 : data.x, y));
for (const s of summaries) {
  assert.equal(s.n, 11); assert.equal(s.mx, 9); assert.equal(s.sxx, 110);
  assert.equal(s.r.toFixed(2), "0.82");
}
assert.equal(summaries[0].sxy.toFixed(2), "55.01");
export const withoutIII = stats(data.x.filter((_,i)=>i!==2), data.ys[2].filter((_,i)=>i!==2));
export const withoutIV = stats(data.x4.filter((_,i)=>i!==7), data.ys[3].filter((_,i)=>i!==7));
assert.equal(withoutIII.sxx.toFixed(1), "92.4");
assert.equal(withoutIII.sxy.toFixed(3), "31.914");
assert.equal(withoutIII.slope.toFixed(5), "0.34539");
assert.equal(withoutIV.sxx, 0);
assert.ok(Number.isNaN(withoutIV.slope)); // undefined slope, not zero
const residuals = [4,9,14].map(x => {
  const y = data.ys[1][data.x.indexOf(x)];
  const predicted = summaries[1].intercept + summaries[1].slope*x;
  return {x,y,predicted,residual:y-predicted};
});
const sample = (f,n,rate) => Math.sin(2*Math.PI*f*n/rate);
let maxAliasDifference = 0;
for (let n=0;n<8000;n++) maxAliasDifference=Math.max(maxAliasDifference,Math.abs(sample(200,n,800)-sample(1000,n,800)));
assert.ok(maxAliasDifference<1e-10);
const boundaryMax = Math.max(...Array.from({length:2000},(_,n)=>Math.abs(sample(1000,n,2000))));
assert.ok(boundaryMax<1e-10);
const folded = (f,rate) => {const r=((f%rate)+rate)%rate;return Math.min(r,rate-r);};
const aliasTable = [800,900,2400].map(rate=>({rate,input200:folded(200,rate),input1000:folded(1000,rate)}));
assert.deepEqual(aliasTable,[{rate:800,input200:200,input1000:200},{rate:900,input200:200,input1000:100},{rate:2400,input200:200,input1000:1000}]);
console.log(JSON.stringify({summaries,withoutIII,withoutIV:{...withoutIV,slope:"undefined (Sxx=0)",intercept:"not separately identifiable",r:"undefined",r2:"undefined"},residuals,maxAliasDifference,boundaryMax,aliasTable},null,2));
