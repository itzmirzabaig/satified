import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 876
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ST: 10-18, QP: 12-20, PR: 15-25, QR: 20-30]
 * - Difficulty factors: [Similar triangles, corresponding sides, setting up proportion]
 * - Distractor patterns: [B: wrong correspondence, C: wrong sides used, D: wrong ratio direction]
 * - Constraints: [Triangle QPR ~ Triangle STR, maintain similarity ratio]
 * - Question type: [Figure->Multiple Choice Text]
 * - Figure generation: [Two similar triangles sharing angle at R]
 *
 * FIXED:
 * - Rebuilt corrupted figure IIFEs into a single plain-SVG template literal
 *   (nested similar right triangles sharing vertex R); side labels use the
 *   live values ST, QP, PR, QR every draw.
 * - Collapsed doubled backslashes (\\\\ -> \\) so MathJax renders \frac, \triangle,
 *   \overline, \sim, \cdot correctly.
 * - Correct answer SR = ST*QR/QP shown as an exact (unsimplified) fraction.
 * - Distractors are distinct misconception fractions; a bounded retry (<=50)
 *   redraws inputs on the rare draw where two option VALUES coincide, so no
 *   two options are ever numerically equal.
 */

export const generator_876 = {
  metadata: {
    id: "876",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate similar-triangle side lengths from a genuine right
    // triangle so the figure is geometrically honest (right angle at P means
    // QR is the hypotenuse and the longest side; the three sides satisfy the
    // triangle inequality). QP and PR are the legs, QR the hypotenuse:
    // QP^2 + PR^2 = QR^2. The scaleFactor divides all three so the smaller
    // similar triangle STR has integer sides ST, TR, SR.
    //
    // Correspondence triangle QPR ~ triangle STR: Q<->S, P<->T, R<->R, so
    // QP<->ST, PR<->TR, QR<->SR. Then SR = ST*QR/QP = QR/scaleFactor.
    const baseTriples: [number, number][] = [
      [3, 4], [4, 3], [5, 12], [12, 5], [8, 15], [15, 8],
      [7, 24], [24, 7], [20, 21], [21, 20], [6, 8], [8, 6],
    ];
    let ST = 0, QP = 0, PR = 0, QR = 0, scaleFactor = 2;
    let correctNum = 0, correctDen = 0;
    let optionSpecs: { num: number; den: number; isCorrect: boolean; reason?: string }[] = [];

    let tries = 0;
    while (tries++ < 50) {
      const [legA, legB] = baseTriples[getRandomInt(0, baseTriples.length - 1)];
      const hyp = Math.round(Math.sqrt(legA * legA + legB * legB)); // exact int for triples
      const m = getRandomInt(2, 6);           // scale the primitive triple up
      QP = legA * m;                            // vertical leg (Q to P)
      PR = legB * m;                            // horizontal leg (P to R)
      QR = hyp * m;                             // hypotenuse (Q to R)

      scaleFactor = getRandomInt(2, 4);
      // Need integer sides for the smaller similar triangle STR.
      if (QP % scaleFactor !== 0 || PR % scaleFactor !== 0 || QR % scaleFactor !== 0) continue;
      ST = QP / scaleFactor;                    // corresponds to QP
      if (ST < 3) continue;                     // keep the small triangle readable

      // Correct: SR = ST*QR / QP  (exact, shown unsimplified)
      correctNum = ST * QR;
      correctDen = QP;

      // Distractor B: inverted ratio QP/ST = SR/QR -> SR = QP*QR/ST
      const bNum = QP * QR, bDen = ST;
      // Distractor C: uses PR in place of QR -> SR = ST*PR/QP
      const cNum = ST * PR, cDen = QP;
      // Distractor D: mixes denominators -> SR = ST*QR/PR
      const dNum = ST * QR, dDen = PR;

      const specs = [
        { num: correctNum, den: correctDen, isCorrect: true },
        { num: bNum, den: bDen, isCorrect: false, reason: "inverts the proportion, solving for the wrong side" },
        { num: cNum, den: cDen, isCorrect: false, reason: "uses $PR$ instead of $QR$ in the numerator" },
        { num: dNum, den: dDen, isCorrect: false, reason: "divides by $PR$ instead of the corresponding side $QP$" },
      ];

      // Require all four VALUES pairwise distinct (grader compares numerically).
      const vals = specs.map(s => s.num / s.den);
      let ok = true;
      for (let a = 0; a < vals.length && ok; a++) {
        for (let b = a + 1; b < vals.length; b++) {
          if (Math.abs(vals[a] - vals[b]) < 1e-9) { ok = false; break; }
        }
      }
      if (ok) { optionSpecs = specs; break; }
    }

    // Fallback (should never trigger): a canonical 3-4-5 based configuration.
    if (optionSpecs.length === 0) {
      scaleFactor = 2; QP = 24; PR = 18; QR = 30; ST = 12;
      correctNum = ST * QR; correctDen = QP;
      optionSpecs = [
        { num: correctNum, den: correctDen, isCorrect: true },
        { num: QP * QR, den: ST, isCorrect: false, reason: "inverts the proportion, solving for the wrong side" },
        { num: ST * PR, den: QP, isCorrect: false, reason: "uses $PR$ instead of $QR$ in the numerator" },
        { num: ST * QR, den: PR, isCorrect: false, reason: "divides by $PR$ instead of the corresponding side $QP$" },
      ];
    }

    // STEP 2: Figure — two nested similar right triangles sharing vertex R.
    // Right angle at P (large triangle QPR) and at T (small triangle STR).
    // The small triangle STR is drawn at the true similarity ratio r = 1/scale
    // anchored at R, so S lies exactly on hypotenuse QR and T on leg PR — the
    // figure honestly depicts the nesting. Side labels use the live values.
    const W = 420, H = 300;
    const Px = 70, Py = 250;              // P (right angle, large)
    const Rx = 370, Ry = 250;            // R (shared)
    const Qx = 70, Qy = 60;              // Q (top of large)
    // Similar triangle STR shares vertex R with ratio r; T = foot of S on PR.
    const r = 1 / scaleFactor;
    const Sx = Rx + (Qx - Rx) * r, Sy = Ry + (Qy - Ry) * r;   // S on hypotenuse QR
    const Tx = Sx, Ty = Py;                                    // T on PR, below S
    const svg =
      `<div style="width:100%;max-width:420px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // large triangle QPR
      `<polygon points="${Qx},${Qy} ${Px},${Py} ${Rx},${Ry}" fill="none" stroke="currentColor" stroke-width="2"/>` +
      // small triangle STR (highlighted)
      `<polygon points="${Sx},${Sy} ${Tx},${Ty} ${Rx},${Ry}" fill="#3b82f6" fill-opacity="0.10" stroke="#3b82f6" stroke-width="2"/>` +
      // right-angle marks
      `<path d="M ${Px + 14} ${Py} L ${Px + 14} ${Py - 14} L ${Px} ${Py - 14}" fill="none" stroke="currentColor" stroke-width="1"/>` +
      `<path d="M ${Tx + 12} ${Ty} L ${Tx + 12} ${Ty - 12} L ${Tx} ${Ty - 12}" fill="none" stroke="#3b82f6" stroke-width="1"/>` +
      // vertex labels
      `<text x="${Qx - 12}" y="${Qy}" font-size="14" font-style="italic" fill="currentColor">Q</text>` +
      `<text x="${Px - 14}" y="${Py + 6}" font-size="14" font-style="italic" fill="currentColor">P</text>` +
      `<text x="${Rx + 6}" y="${Ry + 6}" font-size="14" font-style="italic" fill="currentColor">R</text>` +
      `<text x="${Sx + 8}" y="${Sy - 2}" font-size="14" font-style="italic" fill="#3b82f6">S</text>` +
      `<text x="${Tx - 4}" y="${Ty + 18}" font-size="14" font-style="italic" fill="#3b82f6">T</text>` +
      // side-length labels (live values)
      `<text x="${Qx - 30}" y="${(Qy + Py) / 2}" font-size="13" fill="currentColor">${QP}</text>` +
      `<text x="${(Px + Rx) / 2}" y="${Py + 20}" text-anchor="middle" font-size="13" fill="currentColor">${PR}</text>` +
      `<text x="${(Qx + Rx) / 2 + 6}" y="${(Qy + Ry) / 2 - 6}" font-size="13" fill="currentColor">${QR}</text>` +
      `<text x="${(Sx + Tx) / 2 + 8}" y="${(Sy + Ty) / 2}" font-size="13" fill="#3b82f6">${ST}</text>` +
      `</svg></div>`;

    // STEP 3: Build option strings and shuffle.
    const toFrac = (n: number, d: number) => `\\frac{${n}}{${d}}`;
    const correctText = toFrac(correctNum, correctDen);

    const optionsData = optionSpecs.map(s => ({
      text: toFrac(s.num, s.den),
      isCorrect: s.isCorrect,
      reason: s.reason,
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `$\\triangle QPR$ is similar to $\\triangle STR$. The lengths represented by $\\overline{ST}$, $\\overline{QP}$, $\\overline{PR}$, and $\\overline{QR}$ in the figure are ${ST}, ${QP}, ${PR}, and ${QR}, respectively. What is the length of $\\overline{SR}$?`,
      figureCode: svg,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Since $\\triangle QPR \\sim \\triangle STR$, corresponding sides are proportional: $\\frac{QP}{ST} = \\frac{QR}{SR}$. Substituting the given values gives $\\frac{${QP}}{${ST}} = \\frac{${QR}}{SR}$. Cross-multiplying yields $SR \\cdot ${QP} = ${ST} \\cdot ${QR} = ${correctNum}$, so $SR = \\frac{${correctNum}}{${QP}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
