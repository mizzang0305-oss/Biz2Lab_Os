import {defineConfig} from "@playwright/test";
const port=process.env.POCKET_PREVIEW_PORT??"33153";
if(!["33153","33154","33155"].includes(port))throw new Error("Pocket preview uses an owned local port only");
export default defineConfig({
 testDir:"./tests/pocket-money-browser",timeout:45000,fullyParallel:false,workers:1,retries:0,
 use:{baseURL:`http://127.0.0.1:${port}`,trace:"retain-on-failure"},
 webServer:{command:`"${process.execPath}" node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${port}`,url:`http://127.0.0.1:${port}`,env:{...process.env,VERCEL_ENV:"preview",EVIDENCE_REVIEW_MODE:"false",BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED:"false"},reuseExistingServer:false,timeout:60000,stdout:"pipe",stderr:"pipe"},
 reporter:[["list"],["json",{outputFile:"../.pocket-money-resume-clear-implementation/mobile-results.json"}]]
});

