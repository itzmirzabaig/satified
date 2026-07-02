// Single-file smoke gate for question fixes. Run after editing any question:
//   npx tsx scripts/smoke.mjs questions/<Folder>/question_N.ts [more files...]
// Runs 25 seeded draws through the full check catalog. Exit 0 = clean,
// exit 1 = hard flags remain (listed on stdout).
import { resolve } from 'node:path';
import { runChecksOnFile, isHardFlag } from './checks.mjs';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: npx tsx scripts/smoke.mjs <question file> [...]');
  process.exit(2);
}

let failed = false;
for (const f of files) {
  const abs = resolve(f);
  const r = await runChecksOnFile(abs, 25);
  const hard = r.flags.filter(fl => isHardFlag(fl.code));
  const soft = r.flags.filter(fl => !isHardFlag(fl.code));
  if (hard.length > 0) {
    failed = true;
    console.log(`FAIL ${f}`);
    for (const fl of hard) console.log(`  [${fl.code}] draw ${fl.drawIndex}: ${fl.detail}`);
  } else {
    console.log(`PASS ${f}${soft.length ? ` (soft: ${soft.map(s => s.code).join(', ')})` : ''}`);
  }
  for (const fl of soft) console.log(`  (soft) [${fl.code}] draw ${fl.drawIndex}: ${fl.detail}`);
}
process.exit(failed ? 1 : 0);
