import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {captureHealthRoutes,healthDataHash,protectedSourceHashes} from "./snapshot-health39";
async function main(){
 const baseline=JSON.parse(fs.readFileSync("tests/fixtures/pocket-money-health39-baseline.json","utf8"));
 const port=process.env.POCKET_PREVIEW_PORT??"33153";
 if(!["33153","33154"].includes(port))throw new Error("Health verification uses an owned local port only");
 const candidate=await captureHealthRoutes(`http://127.0.0.1:${port}`);
 const changed=candidate.entries.flatMap((entry,i)=>{
  const old=baseline.entries[i];const fields=["route","bodySha256","metadata","schemas","sourceLinks"].filter(k=>JSON.stringify(entry[k as keyof typeof entry])!==JSON.stringify(old[k]));
  return fields.length?[{route:entry.route,fields}]:[];
 });
 const result={articles:candidate.entries.length,auxiliary:candidate.auxiliary.length,changed,externalRequestAttempts:candidate.externalRequestAttempts,
 protectedSourcesMatch:JSON.stringify(protectedSourceHashes())===JSON.stringify(baseline.protectedSources),dataMatch:healthDataHash()===baseline.dataSha256};
 const output=path.join("reports","local","pocket-money-health-runtime.json");fs.mkdirSync(path.dirname(output),{recursive:true});
 fs.writeFileSync(output,JSON.stringify(result,null,2)+"\n");console.log(JSON.stringify(result));
 assert.deepEqual(changed,[]);assert.equal(result.dataMatch,true);assert.equal(result.protectedSourcesMatch,true);assert.deepEqual(candidate.auxiliary,baseline.auxiliary);
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});

