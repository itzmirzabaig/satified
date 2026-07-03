// Builds the Phase C fix-batch plan from reports/audit.json.
// Batches never span folders; size shrinks with severity:
//   heavy (IMPORT_FAIL/TIMEOUT/THROWS/NO_GENERATOR/FIGURE_BAD or >=5 hard codes) -> 1
//   medium (>=3 distinct hard codes) -> 2, light -> 3
// Output: reports/fix-batches.json  { Easy: [batch...], Medium: [...], Hard: [...] }
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, difficultyRank } from './lib.mjs';
import { isHardFlag } from './checks.mjs';

const HEAVY = new Set(['IMPORT_FAIL', 'TIMEOUT', 'THROWS', 'NO_GENERATOR', 'FIGURE_BAD']);
const audit = JSON.parse(readFileSync(join(ROOT, 'reports', 'audit.json'), 'utf8'));

const flagged = audit.results
  .map(r => {
    const hardCodes = [...new Set(r.flags.filter(f => isHardFlag(f.code)).map(f => f.code))];
    const softCodes = [...new Set(r.flags.filter(f => !isHardFlag(f.code)).map(f => f.code))];
    return { rel: r.rel, hardCodes, softCodes };
  })
  .filter(r => r.hardCodes.length > 0);

const byFolder = new Map();
for (const f of flagged) {
  const folder = f.rel.split('/')[1];
  if (!byFolder.has(folder)) byFolder.set(folder, []);
  byFolder.get(folder).push(f);
}

const out = { Easy: [], Medium: [], Hard: [] };
for (const [folder, files] of [...byFolder.entries()].sort()) {
  const diff = folder.includes('_Easy_') ? 'Easy' : folder.includes('_Medium_') ? 'Medium' : 'Hard';
  const heavy = files.filter(f => f.hardCodes.some(c => HEAVY.has(c)) || f.hardCodes.length >= 5);
  const medium = files.filter(f => !heavy.includes(f) && f.hardCodes.length >= 3);
  const light = files.filter(f => !heavy.includes(f) && !medium.includes(f));
  for (const f of heavy) out[diff].push({ folder, files: [f] });
  for (let i = 0; i < medium.length; i += 2) out[diff].push({ folder, files: medium.slice(i, i + 2) });
  for (let i = 0; i < light.length; i += 3) out[diff].push({ folder, files: light.slice(i, i + 3) });
}

writeFileSync(join(ROOT, 'reports', 'fix-batches.json'), JSON.stringify(out, null, 1), 'utf8');
console.log(JSON.stringify({
  files: flagged.length,
  batches: { Easy: out.Easy.length, Medium: out.Medium.length, Hard: out.Hard.length },
}, null, 2));
