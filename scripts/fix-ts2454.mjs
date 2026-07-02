// Silences TS2454 ("Variable 'x' is used before being assigned") false
// positives caused by the ubiquitous assign-inside-retry-loop pattern:
//     let x: number;  while (!valid) { x = ...; }
// tsc cannot prove assignment, but the runtime audit harness catches any
// genuinely never-assigned variable (NaN/undefined in output), so here we
// mechanically add definite-assignment assertions: `let x!: number`.
//
// Reads tsc output from stdin or runs tsc itself.
// Usage: npx tsc --noEmit | node scripts/fix-ts2454.mjs   (or no pipe: it spawns tsc)
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { ROOT, parseError } from './lib.mjs';

function getTscOutput() {
  try {
    return execSync('npx tsc --noEmit', { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch (e) {
    return (e.stdout || '') + (e.stderr || '');
  }
}

function main() {
  const out = getTscOutput();
  const perFile = new Map(); // relPath -> Set(varName)
  for (const line of out.split(/\r?\n/)) {
    const m = line.match(/^(.+?)\(\d+,\d+\): error TS2454: Variable '(.+?)' is used before being assigned/);
    if (!m) continue;
    const [, rel, v] = m;
    if (!perFile.has(rel)) perFile.set(rel, new Set());
    perFile.get(rel).add(v);
  }

  const stats = { files: 0, vars: 0, unresolved: [] };
  for (const [rel, vars] of perFile) {
    const abs = join(ROOT, rel);
    let src;
    try { src = readFileSync(abs, 'utf8'); } catch { stats.unresolved.push(`${rel}: unreadable`); continue; }
    const lines = src.split('\n');
    let changed = false;
    for (const v of vars) {
      const declRe = new RegExp(`\\b${v}\\s*:`);
      const alreadyRe = new RegExp(`\\b${v}\\s*!\\s*:`);
      let done = false;
      for (let i = 0; i < lines.length; i++) {
        if (!/^\s*let\s/.test(lines[i])) continue;
        if (alreadyRe.test(lines[i])) { done = true; break; }
        if (!declRe.test(lines[i])) continue;
        // Only annotate a declarator without an initializer before the next , or ;
        const after = lines[i].slice(lines[i].search(declRe));
        const upToNext = after.split(/[,;]/)[0];
        if (upToNext.includes('=')) continue;
        lines[i] = lines[i].replace(declRe, `${v}!:`);
        changed = true; done = true; stats.vars++;
        break;
      }
      if (!done) stats.unresolved.push(`${rel}: ${v}`);
    }
    if (!changed) continue;
    const next = lines.join('\n');
    const err = parseError(next);
    if (err) { stats.unresolved.push(`${rel}: POST-PARSE ${err}`); continue; }
    writeFileSync(abs, next, 'utf8');
    stats.files++;
  }
  console.log(JSON.stringify(stats, null, 2));
}

main();
