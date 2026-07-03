// Builds Phase D verification batches covering EVERY question file (not just
// previously flagged ones). Batches of 4 within a folder. Each batch will be
// examined by 3 independent verifier agents (math / figure+rendering /
// explanation lenses). Emits per-batch manifests + a compact index per
// difficulty, marking which files have figures (from reports/audit.json
// samples where available, else source heuristic).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { ROOT, listQuestionFiles, difficultyRank } from './lib.mjs';

let auditFig = new Map();
try {
  const audit = JSON.parse(readFileSync(join(ROOT, 'reports', 'audit.json'), 'utf8'));
  for (const r of audit.results) {
    auditFig.set(r.rel, r.samples?.some(s => s && s.figureCode));
  }
} catch { /* fall back to source heuristic */ }

const files = listQuestionFiles().sort((a, b) => {
  const fa = basename(dirname(a)), fb = basename(dirname(b));
  const d = difficultyRank(fa) - difficultyRank(fb);
  if (d !== 0) return d;
  if (fa !== fb) return fa < fb ? -1 : 1;
  return Number(basename(a).match(/\d+/)[0]) - Number(basename(b).match(/\d+/)[0]);
});

mkdirSync(join(ROOT, 'reports', 'verify-batches'), { recursive: true });

const byDiff = { Easy: [], Medium: [], Hard: [] };
const byFolder = new Map();
for (const f of files) {
  const folder = basename(dirname(f));
  if (!byFolder.has(folder)) byFolder.set(folder, []);
  const rel = `questions/${folder}/${basename(f)}`;
  let hasFigure = auditFig.get(rel);
  if (hasFigure === undefined) hasFigure = /figureCode:\s*`/.test(readFileSync(f, 'utf8'));
  byFolder.get(folder).push({ rel, hasFigure });
}

for (const [folder, entries] of byFolder) {
  const diff = folder.includes('_Easy_') ? 'Easy' : folder.includes('_Medium_') ? 'Medium' : 'Hard';
  for (let i = 0; i < entries.length; i += 4) byDiff[diff].push({ folder, files: entries.slice(i, i + 4) });
}

const index = {};
for (const [diff, batches] of Object.entries(byDiff)) {
  index[diff] = batches.map((b, i) => {
    writeFileSync(join(ROOT, 'reports', 'verify-batches', `${diff}-${i}.json`), JSON.stringify(b, null, 1), 'utf8');
    return {
      i,
      manifest: `reports/verify-batches/${diff}-${i}.json`,
      ids: b.files.map(f => f.rel.match(/question_(\d+)/)[1]).join(','),
      figs: b.files.filter(f => f.hasFigure).length,
    };
  });
}
writeFileSync(join(ROOT, 'reports', 'verify-index.json'), JSON.stringify(index, null, 1), 'utf8');
console.log(JSON.stringify({
  files: files.length,
  batches: Object.fromEntries(Object.entries(index).map(([k, v]) => [k, v.length])),
  withFigures: [...byFolder.values()].flat().filter(f => f.hasFigure).length,
}, null, 2));
