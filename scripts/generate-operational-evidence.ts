import fs from "node:fs";
import path from "node:path";

import accountsReceivableFixture from "@/data/evidence-fixtures/accounts-receivable.json";
import cashConversionFixture from "@/data/evidence-fixtures/cash-conversion.json";
import {
  buildAccountsReceivableCsv,
  buildCashConversionCsv,
  calculateAccountsReceivableEvidence,
  calculateCashConversionEvidence,
} from "@/lib/operational-evidence";

const root = process.cwd();
const write = process.argv.includes("--write");
const outputs = [
  {
    path: path.join(root, "public", "downloads", "accounts-receivable-aging.csv"),
    content: buildAccountsReceivableCsv(accountsReceivableFixture),
  },
  {
    path: path.join(root, "public", "downloads", "cash-conversion-bridge.csv"),
    content: buildCashConversionCsv(cashConversionFixture),
  },
];

for (const output of outputs) {
  if (write) {
    fs.writeFileSync(output.path, output.content, "utf8");
    continue;
  }
  const current = fs.readFileSync(output.path, "utf8");
  if (current !== output.content) {
    throw new Error(`${path.relative(root, output.path)} does not match the deterministic fixture. Run with --write.`);
  }
}

console.log(JSON.stringify({
  mode: write ? "WRITE" : "CHECK",
  fixtureMode: "synthetic-anonymous",
  accountsReceivable: calculateAccountsReceivableEvidence(accountsReceivableFixture),
  cashConversion: calculateCashConversionEvidence(cashConversionFixture),
}, null, 2));
