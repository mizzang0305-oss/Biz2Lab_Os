import { z } from "zod";

export const evidenceStatusSchema = z.enum([
  "candidate",
  "approved",
  "blocked",
  "retired",
]);

export const evidenceItemSchema = z.object({
  id: z.string().min(1),
  postSlug: z.string().min(1),
  projectKey: z.string().min(1),
  projectLabelKo: z.string().min(1),
  repositoryName: z.string().min(1),
  sourceCommit: z.string().regex(/^[a-f0-9]{40}$/),
  sourceDirty: z.boolean(),
  sourceRoute: z.string().startsWith("/"),
  image: z.string().startsWith("/images/posts/"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  altKo: z.string().min(1),
  captionKo: z.string().min(1),
  capturedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dataMode: z.enum(["fixture", "local-demo"]),
  redactions: z.array(z.string()),
  piiScan: z.literal("pass"),
  status: evidenceStatusSchema,
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  claimSupportedKo: z.string().min(1),
  claimNotSupportedKo: z.string().min(1),
  approvedBy: z.string().min(1).optional(),
  approvedAt: z.string().datetime().optional(),
});

export const evidenceManifestSchema = z.array(evidenceItemSchema);

export type EvidenceItem = z.infer<typeof evidenceItemSchema>;
