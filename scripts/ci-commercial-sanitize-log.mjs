import { readFileSync } from 'node:fs';

const text = readFileSync(process.argv[2], 'utf8');
const safe = text
  .replace(/postgres(?:ql)?:\/\/\S+/gi, '[REDACTED_DB_URL]')
  .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[REDACTED_JWT]')
  .replace(/(?:secret|password|key|token)\s*[:=]\s*\S+/gi, '[REDACTED_CREDENTIAL]');
process.stdout.write(safe.split(/\r?\n/).slice(-35).join('\n'));
