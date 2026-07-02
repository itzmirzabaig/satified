// Audit harness orchestrator: runs every questions/**/question_*.ts through a
// pool of worker processes (process isolation so an infinitely-looping or
// crashing generator can never kill the run — it gets TIMEOUT and the worker
// is respawned). Emits reports/audit.json and reports/audit-summary.md.
//
// Usage: node scripts/audit-questions.mjs [--filter <substring>] [--draws N]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import readline from 'node:readline';
import { ROOT, listQuestionFiles } from './lib.mjs';
import { isHardFlag } from './checks.mjs';

const POOL = Number(process.env.AUDIT_POOL || 8);
const TIMEOUT_MS = Number(process.env.AUDIT_TIMEOUT_MS || 15000);

const argFilter = (() => {
  const i = process.argv.indexOf('--filter');
  return i !== -1 ? process.argv[i + 1] : null;
})();
const argDraws = (() => {
  const i = process.argv.indexOf('--draws');
  return i !== -1 ? process.argv[i + 1] : null;
})();

function spawnWorker() {
  const w = spawn(process.execPath, ['--import', 'tsx/esm', join(ROOT, 'scripts', 'audit-worker.mjs')], {
    cwd: ROOT,
    env: { ...process.env, ...(argDraws ? { AUDIT_DRAWS: argDraws } : {}) },
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  w.rl = readline.createInterface({ input: w.stdout, terminal: false });
  return w;
}

async function main() {
  let files = listQuestionFiles();
  if (argFilter) files = files.filter(f => f.includes(argFilter));
  const queue = [...files];
  const results = [];
  let done = 0;
  const t0 = Date.now();

  await new Promise((resolveAll) => {
    let active = 0;

    function runNext(worker) {
      const file = queue.shift();
      if (file === undefined) {
        worker.stdin.end();
        worker.kill();
        if (active === 0 && queue.length === 0 && done >= files.length) resolveAll();
        return;
      }
      active++;
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        worker.rl.removeAllListeners('line');
        worker.kill('SIGKILL');
        results.push({ file, id: file, flags: [{ code: 'TIMEOUT', detail: `no result in ${TIMEOUT_MS}ms (likely unbounded retry loop)`, drawIndex: -1 }], samples: [], drawsRun: 0 });
        finish(spawnWorker());
      }, TIMEOUT_MS);

      worker.rl.once('line', (line) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        try { results.push(JSON.parse(line)); }
        catch { results.push({ file, id: file, flags: [{ code: 'IMPORT_FAIL', detail: 'unparseable worker output', drawIndex: -1 }], samples: [], drawsRun: 0 }); }
        finish(worker);
      });

      function finish(nextWorker) {
        active--; done++;
        if (done % 100 === 0) console.error(`  ${done}/${files.length} audited (${Math.round((Date.now() - t0) / 1000)}s)`);
        if (done >= files.length) resolveAll();
        else runNext(nextWorker);
      }

      worker.stdin.write(file + '\n');
    }

    for (let i = 0; i < Math.min(POOL, files.length); i++) runNext(spawnWorker());
  });

  // Normalize + summarize
  for (const r of results) r.rel = relative(ROOT, r.file).replaceAll('\\', '/');
  results.sort((a, b) => (a.rel < b.rel ? -1 : 1));

  const byCode = {};
  let filesWithHard = 0;
  for (const r of results) {
    let hard = false;
    for (const fl of r.flags) {
      byCode[fl.code] = (byCode[fl.code] || 0) + 1;
      if (isHardFlag(fl.code)) hard = true;
    }
    if (hard) filesWithHard++;
  }

  mkdirSync(join(ROOT, 'reports'), { recursive: true });
  writeFileSync(join(ROOT, 'reports', 'audit.json'), JSON.stringify({ generatedAt: new Date().toISOString(), draws: Number(argDraws || 200), results }, null, 1), 'utf8');

  const lines = [
    `# Question audit summary`,
    ``,
    `- Files audited: ${results.length}`,
    `- Files with hard flags: ${filesWithHard}`,
    `- Elapsed: ${Math.round((Date.now() - t0) / 1000)}s`,
    ``,
    `## Flags by code`,
    ...Object.entries(byCode).sort((a, b) => b[1] - a[1]).map(([c, n]) => `- ${c}: ${n}${isHardFlag(c) ? '' : ' (soft)'}`),
    ``,
    `## Files with hard flags`,
    ...results.filter(r => r.flags.some(f => isHardFlag(f.code)))
      .map(r => `- ${r.rel}: ${r.flags.filter(f => isHardFlag(f.code)).map(f => `${f.code}(${f.detail.slice(0, 60)})`).join('; ')}`),
  ];
  writeFileSync(join(ROOT, 'reports', 'audit-summary.md'), lines.join('\n'), 'utf8');

  console.log(JSON.stringify({ files: results.length, filesWithHardFlags: filesWithHard, byCode }, null, 2));
}

main();
