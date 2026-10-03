import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
require.extensions[".css"]=(module:NodeJS.Module)=>{module.exports={__esModule:true,default:new Proxy({},{get:(_,key)=>String(key)})};};
