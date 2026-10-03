import {defineConfig} from "@playwright/test";
export default defineConfig({
 testDir:"./tests/pocket-money-browser",timeout:45000,fullyParallel:false,workers:1,retries:0,
 use:{baseURL:"http://127.0.0.1:33153",trace:"retain-on-failure"},
 webServer:{command:`"${process.execPath}" node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 33153`,url:"http://127.0.0.1:33153",env:{...process.env,VERCEL_ENV:"preview",EVIDENCE_REVIEW_MODE:"false",BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED:"false"},reuseExistingServer:false,timeout:60000,stdout:"pipe",stderr:"pipe"},
 reporter:[["list"],["json",{outputFile:"../.pocket-money-implementation/mobile-results.json"}]]
});

