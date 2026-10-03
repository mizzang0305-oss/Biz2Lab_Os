import { z } from "zod";
import { firstGuideDraft } from "./first-guide";
export const photoIds = {3:"libfile_20a21205d1f88191adfc615d8a61f238",7:"libfile_56d3f30ee2608191b4aecbd006289356"} as const;
const photoSchema=z.object({
 inputNumber:z.union([z.literal(3),z.literal(7)]),imageId:z.string().min(1),image:z.string().regex(/^\/images\/pocket-money\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp)$/),
 originalSha256:z.string().regex(/^[a-f0-9]{64}$/),publishedSha256:z.string().regex(/^[a-f0-9]{64}$/),width:z.number().int().positive(),height:z.number().int().positive(),altKo:z.string().min(1),
 sourceUrl:z.url().refine(u=>new URL(u).hostname==="www.cpoint.or.kr"),reuseScopeVerified:z.literal(true),piiReviewed:z.literal(true),consumerFileVerified:z.literal(true),publicPixelsReviewed:z.literal(true),platform:z.enum(["android","ios","unknown"])
});
const stepSchema=z.object({id:z.enum(["declaration-entry","consent-register"]),title:z.string().min(1),instruction:z.string().min(1),expectedScreen:z.string().min(1),stopCondition:z.string().min(1),photoId:z.string().min(1)});
const condition=z.string().nullable();
const schema=z.object({id:z.literal("declaration-finish"),slug:z.literal("declaration-finish"),version:z.string().min(1),status:z.enum(["draft","published"]),publicationApproved:z.boolean(),
 title:z.string().min(1),description:z.string().min(1),serviceName:z.string().min(1),updatedAt:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),scope:z.literal("정보 입력 이후 선언 마무리"),
 conditions:z.object({rewardKind:z.enum(["cash","points","coupon","unknown"]),age:condition,consent:condition,cost:condition,payout:condition,officialUrl:z.url().nullable(),checkedAt:condition}),
 observations:z.object({signup:z.literal("verified"),certificate:z.literal("verified"),points:z.literal("unverified"),cash:z.literal("unverified"),login:z.literal("unverified")}),
 resultNotice:z.string().min(1),photos:z.array(photoSchema),steps:z.array(stepSchema).length(2)
}).superRefine((g,ctx)=>{
 const issue=(message:string)=>ctx.addIssue({code:"custom",message});
 if(g.steps[0].id!=="declaration-entry"||g.steps[1].id!=="consent-register")issue("Steps must keep the reviewed order");
 if(g.steps[0].photoId!==photoIds[3]||g.steps[1].photoId!==photoIds[7])issue("Only reviewed photo3/7 IDs are allowed");
 if(g.photos.length>0&&(g.photos.length!==2||g.photos[0].inputNumber!==3||g.photos[1].inputNumber!==7))issue("Exactly photo3/7 in order");
 for(const p of g.photos)if(p.imageId!==photoIds[p.inputNumber])issue("Photo number and identity mismatch");
 if(g.status==="published"&&(!g.publicationApproved||g.photos.length!==2))issue("Publication requires local files and pixel/reuse review");
});
export type ApprovedPhoto=z.infer<typeof photoSchema>;
export type PocketStep=z.infer<typeof stepSchema>;
export type PocketGuide=z.infer<typeof schema>;
export function validateGuide(input:unknown):PocketGuide{return schema.parse(input);}
export function getPublishedPocketGuides():PocketGuide[]{const guide=validateGuide(firstGuideDraft);return guide.status==="published"&&guide.publicationApproved?[guide]:[];}
export function getPocketGuide(slug:string):PocketGuide|undefined{return getPublishedPocketGuides().find(g=>g.slug===slug);}

