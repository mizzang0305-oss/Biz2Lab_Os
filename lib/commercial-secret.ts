import type { CommercialSubmission } from "@/lib/commercial-submission";

const credentialPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /\bAuthorization\s*:\s*Bearer\s+[A-Za-z0-9._~+/-]{20,}/i,
  /\bBearer\s+[A-Za-z0-9._~+/-]{20,}/i,
  /\b(?:DATABASE_URL|SUPABASE_SERVICE_ROLE_KEY|OPENAI_API_KEY|AWS_SECRET_ACCESS_KEY)\s*=\s*\S+/i,
  /\bsk-(?:proj-)?[A-Za-z0-9_-]{16,}\b/,
  /\bghp_[A-Za-z0-9]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\b[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{16,}\b/,
] as const;

export function containsCommercialSecret(data: CommercialSubmission) {
  const fields = [
    data.source,
    data.utm_source,
    data.utm_medium,
    data.utm_campaign,
    data.kind === "inquiry" ? data.name : "",
    data.kind === "inquiry" ? data.message : "",
  ];
  return fields.some((value) => credentialPatterns.some((pattern) => pattern.test(value)));
}
