import { z } from "zod";

const yyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;
const sha256 = /^[a-f0-9]{64}$/;
const sourceCommit = /^[a-f0-9]{40}$/;
const evidenceImage = /^\/images\/evidence\/[a-z0-9][a-z0-9-]*\.webp$/;

export const evidenceStatusSchema = z.enum([
  "candidate",
  "approved",
  "blocked",
  "retired",
]);

const baseSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  postSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  projectKey: z.string().min(1),
  projectLabelKo: z.string().min(1),
  repositoryName: z.string().min(1),
  sourceCommit: z.string().regex(sourceCommit),
  sourceDirty: z.boolean(),
  sourceRoute: z.string().startsWith("/"),
});

const publicAssetSchema = z.object({
  image: z.string().regex(evidenceImage),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  altKo: z.string().min(1),
  captionKo: z
    .string()
    .min(1)
    .refine(
      (value) =>
        /(fixture|로컬 데모|가상 데이터)/i.test(value) &&
        /(증명하지|뜻하지|포함하지|확인할 수 없|실제 .*아님)/.test(value),
      "caption must state the fixture/local-demo mode and an unsupported-claim boundary",
    ),
  capturedAt: z.string().regex(yyyyMmDd),
  dataMode: z.enum(["fixture", "local-demo"]),
  transformations: z.array(z.string().min(1)).optional(),
  redactions: z.array(z.string().min(1)),
  redactionReason: z.string().min(1).optional(),
  piiScan: z.literal("pass"),
  sha256: z.string().regex(sha256),
  claimSupportedKo: z.string().min(1),
  claimNotSupportedKo: z.string().min(1),
});

const candidateSchema = baseSchema
  .extend({
    ...publicAssetSchema.shape,
    status: z.literal("candidate"),
  })
  .strict()
  .superRefine((item, context) => {
    if (item.redactions.length > 0 && !item.redactionReason) {
      context.addIssue({
        code: "custom",
        path: ["redactionReason"],
        message: "redacted candidate evidence requires a reason",
      });
    }
  });

const approvedSchema = baseSchema
  .extend({
    ...publicAssetSchema.shape,
    status: z.literal("approved"),
    approvedBy: z.string().min(1),
    approvedAt: z.string().datetime(),
  })
  .strict()
  .superRefine((item, context) => {
    if (item.redactions.length > 0 && !item.redactionReason) {
      context.addIssue({
        code: "custom",
        path: ["redactionReason"],
        message: "redacted approved evidence requires a reason",
      });
    }
  });

const blockedSchema = baseSchema
  .extend({
    status: z.literal("blocked"),
    blockedReason: z.string().min(1),
  })
  .strict();

const retiredSchema = baseSchema
  .extend({
    status: z.literal("retired"),
    retiredReason: z.string().min(1),
    retiredAt: z.string().regex(yyyyMmDd),
  })
  .strict();

export const evidenceItemSchema = z.union([
  candidateSchema,
  approvedSchema,
  blockedSchema,
  retiredSchema,
]);

export const evidenceManifestSchema = z
  .array(evidenceItemSchema)
  .superRefine((items, context) => {
    const ids = new Map<string, number>();
    const images = new Map<string, number>();

    items.forEach((item, index) => {
      const previousId = ids.get(item.id);
      if (previousId !== undefined) {
        context.addIssue({
          code: "custom",
          path: [index, "id"],
          message: `duplicate evidence id (first at index ${previousId})`,
        });
      }
      ids.set(item.id, index);

      if (item.status === "candidate" || item.status === "approved") {
        const previousImage = images.get(item.image);
        if (previousImage !== undefined) {
          context.addIssue({
            code: "custom",
            path: [index, "image"],
            message: `duplicate evidence image (first at index ${previousImage})`,
          });
        }
        images.set(item.image, index);
      }
    });
  });

export type EvidenceItem = z.infer<typeof evidenceItemSchema>;
export type PublicEvidenceItem = Extract<
  EvidenceItem,
  { status: "candidate" | "approved" }
>;
