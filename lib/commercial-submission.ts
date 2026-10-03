import { z } from "zod";
import { containsSensitiveValue } from "@/lib/commercial-sensitive";

const attribution = z.object({
  service: z.enum(["mybiz", "web", "minz-mind"]),
  source: z.string().trim().min(1).max(100).refine((value) => !containsSensitiveValue(value)),
  landing_url: z.enum(["/mybiz", "/web", "/minz-mind"]),
  utm_source: z.string().trim().max(100).refine((value) => !containsSensitiveValue(value)),
  utm_medium: z.string().trim().max(100).refine((value) => !containsSensitiveValue(value)),
  utm_campaign: z.string().trim().max(100).refine((value) => !containsSensitiveValue(value)),
  consent: z.literal(true),
  website: z.string().max(0),
  opened_at: z.number().int().positive(),
});

export const commercialSubmissionSchema = z.discriminatedUnion("kind", [
  attribution.extend({
    kind: z.literal("inquiry"),
    name: z.string().trim().min(1).max(120).refine((value) => !containsSensitiveValue(value)),
    email: z.email().max(240),
    message: z.string().trim().min(10).max(5000).refine((value) => !containsSensitiveValue(value), {
      message: "CREDENTIAL_MATERIAL_NOT_ALLOWED",
    }),
  }),
  attribution.extend({
    kind: z.literal("email_lead"),
    email: z.email().max(240),
  }),
]).refine((value) => value.landing_url === `/${value.service}`, {
  message: "SERVICE_PATH_MISMATCH",
});

export type CommercialSubmission = z.infer<typeof commercialSubmissionSchema>;
