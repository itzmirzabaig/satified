import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1333
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [MR=6, LR=7, RP=11, answer: 119/6]
 * - Difficulty factors: [Similar triangles, proportionality, segment addition]
 * - Distractor patterns: [A: 119/11, B: 77/6, C: 113/6]
 * - Constraints: [LM || PQ creates similar triangles LMR and QPR]
 * - Question type: [Figure→Multiple Choice]
 *
 * MATH: LQ and MP intersect at R with LM || PQ, so triangles LMR and QPR are
 * similar by AA (vertical angles at R + alternate interior angles). The
 * correspondence L<->Q, M<->P gives RQ/LR = RP/MR, hence RQ = LR*RP/MR and
 * LQ = LR + RQ = (LR*MR + LR*RP)/MR. All options are reduced a/b fractions;
 * a bounded redraw guarantees the four options are numerically distinct.
 */

export const generator_1333 = {
  metadata: {
    id: "1333",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => {
      a = Math.abs(a); b = Math.abs(b);
      return b === 0 ? a : gcd(b, a % b);
    };
    const frac = (num: number, den: number): string => {
      const g = gcd(num, den) || 1;
      return `${num / g}/${den / g}`;
    };
    const val = (s: string): number => {
      const [n, d] = s.split('/').map(Number);
      return n / d;
    };

    // STEP 1: pick segment lengths; redraw until the four options are all
    // numerically distinct (bounded retry, per house style).
    let MR = 0, LR = 0, RP = 0;
    let correct = '', d1 = '', d2 = '', d3 = '';
    let tries = 0;
    do {
      MR = getRandomInt(4, 8);
      LR = getRandomInt(5, 10);
      RP = getRandomInt(8, 14);

      // Correct: LQ = LR + RQ, with RQ = LR*RP/MR.
      correct = frac(LR * MR + LR * RP, MR);
      // D1: computed RQ but forgot to add LR.
      d1 = frac(LR * RP, MR);
      // D2: inverted the ratio (RQ = LR*MR/RP) then added LR.
      d2 = frac(LR * RP + LR * MR, RP);
      // D3: added RP instead of LR to RQ.
      d3 = frac(RP * MR + LR * RP, MR);

      const vals = [val(correct), val(d1), val(d2), val(d3)];
      var distinct = vals.every((v, i) =>
        vals.every((w, j) => i === j || Math.abs(v - w) > 1e-9));
    } while (!distinct && ++tries < 50);

    // STEP 2: package options and shuffle; letters come from the shuffled array.
    const optionsData = [
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false },
      { text: correct, isCorrect: true }
    ];
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const letterOf = (text: string) =>
      shuffledOptions.find(o => o.text === text)!.letter;

    const RQ = frac(LR * RP, MR);

    // STEP 3: schematic figure — two lines LQ and MP crossing at their true
    // intersection R, with LM parallel to PQ (an hourglass of similar
    // triangles). Fixed layout; the figure is illustrative and not to scale.
    const W = 400, H = 320, P = 45;
    const xmin = -6, xmax = 6, ymin = -5, ymax = 5;
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);
    // Coordinates: R at origin; L,M on top (triangle LMR), P,Q on bottom.
    const L = { x: -4, y: 3 }, M = { x: 3, y: 3 };
    const Q = { x: 4, y: -3 }, Rp = { x: -3, y: -3 };
    const seg = (a: {x:number;y:number}, b: {x:number;y:number}) =>
      `<line x1="${mx(a.x).toFixed(1)}" y1="${my(a.y).toFixed(1)}" x2="${mx(b.x).toFixed(1)}" y2="${my(b.y).toFixed(1)}" stroke="currentColor" stroke-width="2.2"/>`;
    const dot = (p: {x:number;y:number}) =>
      `<circle cx="${mx(p.x).toFixed(1)}" cy="${my(p.y).toFixed(1)}" r="3" fill="#3b82f6"/>`;
    const label = (p: {x:number;y:number}, t: string, dx = 0, dy = 0) =>
      `<text x="${(mx(p.x) + dx).toFixed(1)}" y="${(my(p.y) + dy).toFixed(1)}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">${t}</text>`;
    const R = { x: 0, y: 0 };
    const figureCode =
      `<div style="width:100%;max-width:400px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      seg(L, Q) +          // line LQ through R
      seg(M, Rp) +         // line MP through R
      seg(L, M) +          // LM
      seg(Rp, Q) +         // PQ (parallel to LM)
      dot(R) + dot(L) + dot(M) + dot(Q) + dot(Rp) +
      label(L, 'L', -12, 0) +
      label(M, 'M', 12, 0) +
      label(R, 'R', 12, -6) +
      label(Q, 'Q', 12, 6) +
      label(Rp, 'P', -12, 6) +
      `</svg></div>`;

    return {
      questionText: `In the figure, $\\\\overline{LQ}$ intersects $\\\\overline{MP}$ at point $R$, and $\\\\overline{LM}$ is parallel to $\\\\overline{PQ}$. Given that $\\\\overline{MR} = ${MR}$, $\\\\overline{LR} = ${LR}$, and $\\\\overline{RP} = ${RP}$, what is the length of $\\\\overline{LQ}$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Because $\\\\overline{LM}$ is parallel to $\\\\overline{PQ}$, triangles $LMR$ and $QPR$ are similar by AA, so $\\\\frac{RQ}{LR} = \\\\frac{RP}{MR}$. Then $RQ = \\\\frac{LR \\\\cdot RP}{MR} = \\\\frac{${LR} \\\\cdot ${RP}}{${MR}} = ${RQ}$, and $LQ = LR + RQ = ${LR} + ${RQ} = ${correct}$. Choice ${letterOf(d1)} is $RQ$ alone (it forgets to add $LR$). Choice ${letterOf(d2)} inverts the ratio, using $\\\\frac{RQ}{LR} = \\\\frac{MR}{RP}$. Choice ${letterOf(d3)} adds $RP$ instead of $LR$ to $RQ$.`
    };
  }
};
