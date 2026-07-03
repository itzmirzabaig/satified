# HANDOFF — SAT question bank repair (branch: qbank-repair)

State document for continuing this work in a fresh Claude Code session (possibly
on a different machine). Read this fully, then continue from **Current status**.

## Mission

Verify and fix ALL questions in this SAT Math site (procedural generators under
`questions/<TemplateFolder>/question_<N>.ts`), integrate the repaired ex-backup
questions, and publish. Defect classes: wrong math, correct answers graded wrong,
duplicate options, rendering failures, broken graphs, stray `/` `\`, wrong
explanations, float artifacts, personal names.

**User amendments (binding):**
1. Multiple independent agents must verify EACH question and graph (≥3 lenses per
   question: solve-as-student math check; graph/rendering fidelity; explanation
   correctness). Counterexample-backed FAILs loop back to re-fix until clean.
2. Question IDs are sequential (`question_1.ts` … `question_1483.ts`) — DONE.
3. No personal names in word problems — generic role + pronouns.
4. User must be asked before starting the verification phase (Phase D), and
   before any deploy to production (push to main auto-deploys via Cloudflare).
5. Model fallback authorized: if the Fable 5 usage limit is hit, continue the
   remaining agent work on Opus 4.8 (or the next most capable available model)
   without asking again — user gave explicit permission (2026-07-02).

## Architecture crib sheet

- App loads questions via `import.meta.glob('../questions/**/*.ts')`
  (study/app.ts:231); folder registry `FOLDER_META` app.ts:4-62 (complete — no
  changes needed). Generator export must be named `generator_<N>`.
- Grading: `resolveCorrect` + fill-in normalization in study/app.ts (hardened:
  numeric equivalence incl. `a/b` fractions).
- `vite build` does NOT type-check. tsc is a separate gate.
- Contract for question files: `scripts/HOUSE_STYLE.md` (binding rulebook).

## Tooling (all in scripts/, run from repo root; tsx is a devDependency)

- `node scripts/audit-questions.mjs` — full seeded audit (200 draws/file, 8
  worker processes, 15s timeout per file) → `reports/audit.json` +
  `reports/audit-summary.md`. THE source of truth for remaining defects.
  Options: `--filter <substr>` (e.g. `_Easy_`), `--draws N`.
- `npx tsx scripts/smoke.mjs <file...>` — per-file gate (25 seeded draws), exit
  0 = clean. Fix agents MUST pass this before finishing a file.
- `npx tsx scripts/render.mjs <file> [n]` — print n seeded rendered draws
  (drawIndex-stable across machines; seed = fnv1a(fileId:i)).
- `node scripts/build-fix-batches.mjs` — regroup files with hard flags from
  reports/audit.json into fix batches → `reports/fix-batches.json`.
- `node scripts/split-batches.mjs` — write per-batch manifests
  (`reports/batches/<Diff>-<i>.json`) + compact `reports/batch-index.json`.
- `node scripts/build-verify-batches.mjs` — Phase D batches covering ALL
  questions (4/batch) → `reports/verify-batches/`, `reports/verify-index.json`.
- Phase A one-shots (already run; idempotent): codemods.mjs, repair-backup.mjs,
  renumber-questions.mjs, split-multi-generators.mjs, fix-ts2454.mjs.

## Phase plan and status

- [x] **A — infrastructure**: types fixed; getRandomNonZeroInt added; graders
  hardened; imports/paths/stubs codemodded; 106 corrupted backup files
  lexer-repaired (96 clean, 10 need agent rebuild); 28 hidden second-generators
  split out as new questions; global renumbering 1..1483.
- [x] **B — audit harness** built + full audit run: 664/1483 files with hard
  flags (see reports/audit-summary.md; regenerate any time).
- [~] **C — fix fan-out** (IN PROGRESS at handoff): one agent per batch
  (reports/batches/), re-derives math over full random ranges, fixes all
  defects, removes names, rebuilds broken figures per HOUSE_STYLE, gated by
  smoke.mjs exit 0. Fix-agent prompt template: see
  "Fix-agent prompt" below. Progress at handoff: see Current status.
- [ ] **D — multi-verifier panel** (AWAITING USER GO-AHEAD): 3 independent
  lens agents per verify batch (`reports/verify-batches/`): (1) MATH — render
  3 draws with render.mjs, solve as a student, then symbolic range audit for
  distractor collisions + boundary probes; FAIL requires concrete
  counterexample. (2) FIGURE/RENDERING — figure values match question numbers
  for each draw, axes contain data, valid SVG/Mafs; for figure-less files:
  LaTeX/MathJax hygiene, option formatting. (3) EXPLANATION — reasoning
  reproduces the answer with the draw's numbers, letters match resolved
  correct option, distractor reasons match construction, no names.
  FAILs → refix agent (1 file, failures verbatim, smoke-gated) → re-verify all
  3 lenses; loop max 3 rounds; residuals fixed by hand.
- [ ] **E — gates**: audit harness 0 hard flags; `npx tsc --noEmit` 0 errors;
  `npm run build` success; dev-server UI spot-check ~15 stratified questions.
- [ ] **F — ship** (ASK USER FIRST): merge qbank-repair → main, push
  (Cloudflare Pages auto-builds from source), production smoke-check.

## How to resume Phase C on this/a new machine

1. `npm install` (once), then `node scripts/audit-questions.mjs`.
2. `node scripts/build-fix-batches.mjs && node scripts/split-batches.mjs` —
   this shrinks automatically to whatever is still broken.
3. Re-launch the fix workflows (one per difficulty, concurrently — agent
   concurrency is per-workflow) using the fix-agent prompt below with each
   batch manifest. Commit per difficulty when its files pass smoke.
4. When the audit reports 0 hard-flag files (except any agents still running),
   Phase C is done → STOP and ask the user before Phase D.

## Fix-agent prompt (template used in Phase C)

Each agent gets: its manifest path (reports/batches/<Diff>-<i>.json), the
instruction to read scripts/HOUSE_STYLE.md first, then per file:
smoke → read → re-derive math symbolically across full ranges (boundaries
included) → fix everything (answers, distractor collisions with guards ≤50
retries, explanation letters/values from live shuffled state, exact
correctAnswer-option match, fill-in plain number or a/b, no float artifacts,
currency as `\$`, names → role+pronoun, figures rebuilt to house style when
broken) → smoke until PASS. Only touch assigned files. Structured return:
{file, status: fixed|rebuilt|already_clean, defects_fixed[], note}.

## Update (2026-07-02 latest): Phase C COMPLETE — 0 real hard flags

All 3 partitions fixed on Opus 4.8 (Easy 55 + Medium 80 + Hard 81 batches),
all committed. Final full audit: **1483 files, 0 real hard flags.** The single
TIMEOUT flag (question_12.ts) is a confirmed false positive — passes smoke solo
in 9.5s (0.2s CPU), loop is bounded `tries++<50`; it only tripped the 15s
kill-window under 8-worker audit load on this 2-core box. Remaining flags are
all soft and non-blocking: DOLLAR_RISK (heuristic false positives — legitimate
all-math `$10x^2$` fields, no currency), SIGN_GLITCH (cosmetic `1x`/spacing,
math correct + renders fine), CORRECT_FUZZY (grader resolves at runtime).
Next: Phase E deterministic gates (tsc/build), then PAUSE for user's Phase D
verification go-ahead.

## Update (2026-07-02 later): Fable 5 limit hit → now on Opus 4.8

Phase C round 2 was relaunched (Easy 62 / Medium 84 / Hard 86 batches).
The Fable 5 usage limit was reached ~16 batches in; the rest failed at spawn
(limit error before touching files — nothing half-edited). ~34 more files
fixed+committed. User switched the session to Opus 4.8 (`/model
claude-opus-4-8`) per the recorded fallback permission, so all remaining agent
work continues on Opus. Resume procedure unchanged (re-audit → rebuild batches
→ relaunch). On resume, if the main session is Opus the workflow agents
inherit Opus automatically; otherwise pass `model: 'opus'` on the agent()
calls.

## Current status at handoff (2026-07-02, session stopped cleanly)

- Phase C stopped mid-run by user request. Batch completion at stop:
  Easy 16/77, Medium 15/99, Hard 10/98 (41/274 batches).
- ~122 question files fixed, smoke-gated and committed on `qbank-repair`
  (checkpoint commits: "Phase C checkpoint: ..."). Every modified file passed
  `npx tsx scripts/smoke.mjs` at stop time — nothing is half-edited.
- Remaining work: roughly 540 of the original 664 hard-flagged files. DO NOT
  trust this count — re-derive it on resume:
  `node scripts/audit-questions.mjs` then `node scripts/build-fix-batches.mjs`
  and `node scripts/split-batches.mjs`. The rebuilt batches automatically
  exclude everything already fixed.
- The 10 syntax-corrupted ex-backup rebuild files (tsc/vite still fail on
  them; see reports/audit-summary.md IMPORT_FAIL rows) are among the remaining
  Hard/Medium batches — they are batch-size-1 entries with IMPORT_FAIL codes.
- Machine note: original device was a 2-core laptop → workflow agent
  concurrency capped at 2 per workflow (ran 3 difficulty workflows
  concurrently to get ~6). On a machine with more cores, concurrency scales
  as min(16, cores-2) per workflow — launch the same 3 workflows concurrently.
- Reminder of gates still ahead: Phase D (multi-verifier, AWAIT USER GO),
  Phase E (audit 0 hard flags + tsc 0 errors + vite build + UI spot-check),
  Phase F (merge to main = production deploy, ASK USER FIRST).
