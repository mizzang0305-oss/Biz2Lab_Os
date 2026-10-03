import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import { assertSnapshotBaseline, healthInventory,healthDataHash,protectedSourceHashes } from "../scripts/snapshot-health39";
const base="bc70eab53635db475210e91cad7558f7dbbbd0d0";
test("baseline refuses another SHA and an inventory other than health39",()=>{
 const inventory=healthInventory();
 assert.throws(()=>assertSnapshotBaseline(base,"wrong",inventory));
 assert.throws(()=>assertSnapshotBaseline(base,base,{...inventory,articles:inventory.articles.slice(1)}));
 assert.doesNotThrow(()=>assertSnapshotBaseline(base,base,inventory));
});
test("health inventory includes current disease20 support19 tool34 trust12",()=>{
 const inventory=healthInventory();
 assert.equal(inventory.articles.length,39);
 assert.equal(inventory.tools.length,34);
 assert.equal(inventory.trust.length,12);
 assert.equal(new Set(inventory.articles).size,39);
});
test("archived health39 data, content and assets remain byte-identical after public retirement",()=>{
 const fixture=JSON.parse(readFileSync("tests/fixtures/pocket-money-health39-baseline.json","utf8"));
 assert.equal(fixture.baseSha,base);
 assert.deepEqual(fixture.inventory,healthInventory());
 assert.equal(fixture.entries.length,39);
 assert.equal(fixture.auxiliary.length,46);
 assert.equal(fixture.externalRequestAttempts,0);
 assert.equal(fixture.dataSha256,healthDataHash());
 // These delivery entrypoints now retire the public health surface. Original bytes are archived at 2d12404.
 const deliveryChanges=new Set(["proxy.ts","app/rss.xml/route.ts"]);
 const preserved=(sources:Record<string,string>)=>Object.fromEntries(Object.entries(sources).filter(([file])=>!deliveryChanges.has(file)));
 assert.deepEqual(preserved(fixture.protectedSources),preserved(protectedSourceHashes()));
});
