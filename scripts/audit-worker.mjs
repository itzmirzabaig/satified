// Audit worker: receives one absolute file path per stdin line, audits it,
// writes one JSON result line to stdout. Run under tsx so it can import the
// TypeScript question files:  node --import tsx/esm scripts/audit-worker.mjs
import readline from 'node:readline';
import { runChecksOnFile } from './checks.mjs';

const DRAWS = Number(process.env.AUDIT_DRAWS || 200);

const rl = readline.createInterface({ input: process.stdin, terminal: false });
for await (const line of rl) {
  const file = line.trim();
  if (!file) continue;
  let result;
  try {
    result = await runChecksOnFile(file, DRAWS);
  } catch (e) {
    result = { file, id: file, flags: [{ code: 'IMPORT_FAIL', detail: `worker error: ${e.message}`, drawIndex: -1 }], samples: [], drawsRun: 0 };
  }
  process.stdout.write(JSON.stringify(result) + '\n');
}
