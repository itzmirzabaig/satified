import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 880
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AB: 5-15, BC: 15-25, FE: 5-12]
 * - Difficulty factors: [Parallel lines, proportional segments, solving proportion]
 * - Distractor patterns: [A: rounding error, C: swapped ratio, D: added instead of multiplied]
 * - Constraints: [AB/BC = FE/ED, all values positive]
 * - Question type: [Figure->Multiple Choice Text]
 * - Figure generation: [Three parallel lines cut by two transversals]
 *
 * FIXED:
 * - Rebuilt the corrupted figure IIFEs into one plain-SVG template literal:
 *   two transversals (AC, FD) crossed by three parallel segments (AF, BE, CD).
 *   Segment labels are plain "AB"/"BC"/"FE" (old figure printed literal "$AB").
 *   B and E sit at the same fractional height (AB/(AB+BC) = FE/(FE+ED) by the
 *   intercept theorem), so all three connectors are drawn horizontal.
 * - Collapsed doubled backslashes (\\\\ -> \\) so MathJax renders \overline,
 *   \parallel, \frac, \cdot, \implies correctly.
 * - correctAnswer = round(BC*FE/AB, 1), presented to the nearest tenth.
 * - Distractors are distinct misconception values; a bounded retry (<=50)
 *   redraws AB/BC/FE whenever two of the four rounded values coincide or any
 *   is non-positive, so no two options ever match (fixes DUP_OPTIONS and the
 *   downstream LETTER_MISMATCH). Explanation letters come from the shuffled
 *   array; its numbers come from the same live variables.
 */

export const generator_880 = {
  metadata: {
    id: "880",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const round1 = (v: number) => Math.round(v * 10) / 10;

    // STEP 1: draw AB, BC, FE so the four option values are distinct & positive.
    let AB = 0, BC = 0, FE = 0, ED = 0;
    let correctVal = 0;
    let optionSpecs: { val: number; isCorrect: boolean; reason?: string }[] = [];

    let tries = 0;
    while (tries++ < 50) {
      AB = getRandomInt(5, 15);
      BC = getRandomInt(15, 25);
      FE = getRandomInt(5, 12);

      ED = (BC * FE) / AB;                 // intercept theorem: AB/BC = FE/ED
      correctVal = round1(ED);

      // Distractor B: reciprocal proportion AB/BC = ED/FE  -> ED = AB*FE/BC
      const bVal = round1((AB * FE) / BC);
      // Distractor C: wrong pairing AB*BC/FE
      const cVal = round1((AB * BC) / FE);
      // Distractor D: adds intercepts instead of scaling -> FE + (BC - AB)
      const dVal = round1(FE + BC - AB);

      const specs = [
        { val: correctVal, isCorrect: true },
        { val: bVal, isCorrect: false, reason: "uses the reciprocal proportion $\\frac{AB}{BC} = \\frac{ED}{FE}$" },
        { val: cVal, isCorrect: false, reason: "multiplies $AB$ and $BC$ instead of applying the proportion" },
        { val: dVal, isCorrect: false, reason: "adds the segment lengths instead of scaling them" },
      ];

      const vals = specs.map(s => s.val);
      const allPositive = vals.every(v => v > 0);
      let distinct = true;
      for (let a = 0; a < vals.length && distinct; a++) {
        for (let b = a + 1; b < vals.length; b++) {
          if (Math.abs(vals[a] - vals[b]) < 0.05) { distinct = false; break; }
        }
      }
      if (allPositive && distinct) { optionSpecs = specs; break; }
    }

    // STEP 2: figure — transversals AC (left) and FD (right) cut by three
    // parallel segments AF, BE, CD. B and E at the same fractional height.
    const W = 420, H = 300;
    const topY = 50, botY = 250;
    const Ax = 90, Cx = 130;              // left transversal drifts right going down
    const Fx = 300, Dx = 340;             // right transversal drifts right going down
    const fMid = AB / (AB + BC);          // fractional height of B and E
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const Bx = lerp(Ax, Cx, fMid), Ex = lerp(Fx, Dx, fMid);
    const midY = lerp(topY, botY, fMid);

    const svg =
      `<div style="width:100%;max-width:420px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // transversals
      `<line x1="${Ax}" y1="${topY}" x2="${Cx}" y2="${botY}" stroke="currentColor" stroke-width="2"/>` +
      `<line x1="${Fx}" y1="${topY}" x2="${Dx}" y2="${botY}" stroke="currentColor" stroke-width="2"/>` +
      // three parallel connectors
      `<line x1="${Ax}" y1="${topY}" x2="${Fx}" y2="${topY}" stroke="#3b82f6" stroke-width="2"/>` +
      `<line x1="${Bx}" y1="${midY}" x2="${Ex}" y2="${midY}" stroke="#3b82f6" stroke-width="2"/>` +
      `<line x1="${Cx}" y1="${botY}" x2="${Dx}" y2="${botY}" stroke="#3b82f6" stroke-width="2"/>` +
      // vertex labels
      `<text x="${Ax - 18}" y="${topY + 4}" font-size="14" font-style="italic" fill="currentColor">A</text>` +
      `<text x="${Bx - 18}" y="${midY + 4}" font-size="14" font-style="italic" fill="currentColor">B</text>` +
      `<text x="${Cx - 18}" y="${botY + 4}" font-size="14" font-style="italic" fill="currentColor">C</text>` +
      `<text x="${Fx + 8}" y="${topY + 4}" font-size="14" font-style="italic" fill="currentColor">F</text>` +
      `<text x="${Ex + 8}" y="${midY + 4}" font-size="14" font-style="italic" fill="currentColor">E</text>` +
      `<text x="${Dx + 8}" y="${botY + 4}" font-size="14" font-style="italic" fill="currentColor">D</text>` +
      // segment-length labels (live values) on the transversals
      `<text x="${lerp(Ax, Bx, 0.5) - 26}" y="${lerp(topY, midY, 0.5) + 4}" font-size="13" fill="currentColor">AB = ${AB}</text>` +
      `<text x="${lerp(Bx, Cx, 0.5) - 26}" y="${lerp(midY, botY, 0.5) + 4}" font-size="13" fill="currentColor">BC = ${BC}</text>` +
      `<text x="${lerp(Fx, Ex, 0.5) + 12}" y="${lerp(topY, midY, 0.5) + 4}" font-size="13" fill="currentColor">FE = ${FE}</text>` +
      `</svg></div>`;

    // STEP 3: build option strings (nearest tenth) and shuffle.
    const correctText = correctVal.toFixed(1);
    const optionsData = optionSpecs.map(s => ({
      text: s.val.toFixed(1),
      isCorrect: s.isCorrect,
      reason: s.reason,
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const exact = (BC * FE) / AB;

    return {
      questionText: `In the figure, $\\overline{AF}$, $\\overline{BE}$, and $\\overline{CD}$ are parallel. Points $B$ and $E$ lie on $\\overline{AC}$ and $\\overline{FD}$, respectively. If $AB = ${AB}$, $BC = ${BC}$, and $FE = ${FE}$, what is the length of $\\overline{ED}$, to the nearest tenth?`,
      figureCode: svg,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Because $\\overline{AF} \\parallel \\overline{BE} \\parallel \\overline{CD}$, the segments they cut on the transversals $\\overline{AC}$ and $\\overline{FD}$ are proportional: $\\frac{AB}{BC} = \\frac{FE}{ED}$. Substituting the given values gives $\\frac{${AB}}{${BC}} = \\frac{${FE}}{ED}$, so $ED = \\frac{${BC} \\cdot ${FE}}{${AB}} = \\frac{${BC * FE}}{${AB}}$, which gives $ED \\approx ${exact.toFixed(2)}$. Rounded to the nearest tenth, $ED = ${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
