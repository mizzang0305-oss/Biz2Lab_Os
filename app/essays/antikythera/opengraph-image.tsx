import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { antikytheraEssay } from "@/lib/essays/antikythera";
export const alt = antikytheraEssay.title + " · 2021년 제안 모델";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function SocialImage() {
  const image = await readFile(join(process.cwd(), "public/images/essays/antikythera/figure-7.jpg"));
  const font = await readFile(join(process.cwd(), "assets/fonts/NotoSansKR-social-subset.woff"));
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",padding:48,background:"#f7f4ed",color:"#202b2c",gap:36,fontFamily:"Noto Sans KR"}}>
    <div style={{display:"flex",flexDirection:"column",width:600,justifyContent:"space-between"}}>
      <div style={{fontSize:27}}>Biz2Lab 지식 에세이</div>
      <div style={{display:"flex",flexDirection:"column",fontSize:51,lineHeight:1.5}}><div>2천 년 전의 컴퓨터,</div><div>우리가 아는 과거는</div><div>얼마나 정확할까?</div></div>
      <div style={{display:"flex",flexDirection:"column",fontSize:16,color:"#566262",gap:6}}><div>2021년 제안 모델 · 그림 7 · Tony Freeth</div><div>Scientific Reports · DOI 10.1038/s41598-021-84310-w</div><div>CC BY 4.0 · creativecommons.org/licenses/by/4.0/</div></div>
    </div>
    <div style={{display:"flex",alignItems:"center",width:460}}>
      {/* Original scientific raster, resized only. */}
      <img src={`data:image/jpeg;base64,${image.toString("base64")}`} width={460} height={460} alt="2021 proposed model" />
    </div>
  </div>, {...size,fonts:[{name:"Noto Sans KR",data:font,weight:600,style:"normal"}]});
}
