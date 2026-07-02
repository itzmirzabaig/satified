// Some ex-backup files contain a SECOND complete generator (the app only ever
// loads the first export, so these were invisible). After renumbering they
// collide as duplicate `generator_<N>` exports. This script splits each extra
// generator into its own question_<nextN>.ts file — unless its questionText
// template already exists in another file of the same folder (then it's a
// duplicate and is dropped).
//
// Usage: node scripts/split-multi-generators.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname, basename, relative } from 'node:path';
import { ROOT, QUESTIONS_DIR, listQuestionFiles, parseError } from './lib.mjs';

const EXPORT_RE = /^export const generator_\d+ = \{/m;

function splitChunks(src) {
  // Boundaries: each `export const generator_...` line, extended upward to the
  // start of a directly preceding block comment (the question's header).
  const lines = src.split('\n');
  const exportIdx = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^export const generator_\d+\s*=/.test(lines[i])) exportIdx.push(i);
  }
  if (exportIdx.length < 2) return null;

  const boundaries = exportIdx.map(i => {
    let start = i;
    // Walk up through blank lines to an attached block comment.
    let j = i - 1;
    while (j >= 0 && lines[j].trim() === '') j--;
    if (j >= 0 && lines[j].trim() === '*/') {
      while (j >= 0 && !lines[j].trim().startsWith('/**')) j--;
      if (j >= 0) start = j;
    }
    return start;
  });

  const header = lines.slice(0, boundaries[0]).join('\n'); // imports etc.
  const chunks = boundaries.map((b, k) => {
    const end = k + 1 < boundaries.length ? boundaries[k + 1] : lines.length;
    return lines.slice(b, end).join('\n').trimEnd() + '\n';
  });
  return { header: header.trimEnd() + '\n', chunks };
}

function questionTextKey(chunk) {
  const m = chunk.match(/questionText:\s*`([\s\S]*?)`/);
  return m ? m[1].replace(/\s+/g, ' ').trim() : null;
}

function main() {
  const files = listQuestionFiles();
  let nextN = Math.max(...files.map(f => parseInt(basename(f).match(/question_(\d+)\.ts/)?.[1] ?? '0', 10))) + 1;

  // Index questionText keys per folder for duplicate detection.
  const folderTexts = new Map(); // folder -> Set of keys
  for (const f of files) {
    const folder = dirname(f);
    if (!folderTexts.has(folder)) folderTexts.set(folder, new Set());
    const key = questionTextKey(readFileSync(f, 'utf8'));
    if (key) folderTexts.get(folder).add(key);
  }

  const report = { split: [], dropped: [], untouched: 0 };
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    const parts = splitChunks(src);
    if (!parts) { report.untouched++; continue; }
    const folder = dirname(f);
    const texts = folderTexts.get(folder);

    // First generator keeps the file.
    const keep = parts.header + '\n' + parts.chunks[0];
    const keepErr = parseError(keep);

    const created = [];
    for (const chunk of parts.chunks.slice(1)) {
      const key = questionTextKey(chunk);
      const isDup = key && [...texts].some(t => t === key);
      if (isDup) {
        report.dropped.push({ from: relative(ROOT, f), reason: 'duplicate questionText in folder' });
        continue;
      }
      const n = nextN++;
      let content = parts.header + '\n' + chunk;
      content = content.replace(/generator_\d+/g, `generator_${n}`);
      content = content.replace(/Question \d+/g, `Question ${n}`);
      content = content.replace(/(\/\/\s*)?\bid:\s*"[^"]*"/, `id: "${n}"`);
      const dest = join(folder, `question_${n}.ts`);
      const err = parseError(content);
      writeFileSync(dest, content, 'utf8');
      if (key) texts.add(key);
      created.push({ n, err });
      report.split.push({ from: relative(ROOT, f), to: relative(ROOT, dest), parseError: err });
    }

    writeFileSync(f, keep, 'utf8');
    if (keepErr) report.split.push({ from: relative(ROOT, f), to: 'KEEP', parseError: keepErr });
  }
  console.log(JSON.stringify({
    untouched: report.untouched,
    splitCount: report.split.filter(s => s.to !== 'KEEP').length,
    droppedCount: report.dropped.length,
    withErrors: report.split.filter(s => s.parseError),
    dropped: report.dropped,
  }, null, 2));
}

main();
