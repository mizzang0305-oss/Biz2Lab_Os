export function containsSensitiveValue(value: string) {
  return /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i.test(value)
    || /\b(?:password|passwd|api[_ -]?key|access[_ -]?token|refresh[_ -]?token|secret[_ -]?key)\s*[:=]\s*\S+/i.test(value)
    || /\bbearer\s+[A-Za-z0-9._~+/-]{12,}/i.test(value)
    || /\b(?:sk_live_|sk_test_|ghp_|xoxb-)[A-Za-z0-9_-]{8,}/i.test(value)
    || /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(value);
}

export function safeAttributionValue(value: string | null) {
  const trimmed = (value || "").trim().slice(0, 100);
  return containsSensitiveValue(trimmed) ? "" : trimmed;
}
