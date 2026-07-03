import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1343
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [RS = 440, ST = 384, TR = 584 (55:48:52 -> Pythagorean triple scaled)]
 * - Difficulty factors: [Similar triangles, tangent ratio, corresponding angles]
 * - Constraints: [Scale factor between triangles, tan preserves under similarity]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Right triangle with labeled vertices]
 *
 * MATH: right triangle RST, right angle at S (legs RS, ST; hypotenuse TR).
 *   tan T = opposite / adjacent = RS / ST = leg1 / leg2.
 *   Triangle RST ~ triangle UVW with T <-> W, so tan W = tan T = RS / ST.
 *
 * FIXED:
 * - `getGCD` was undefined (THROWS) -> inlined a local `gcd`.
 * - Correct option was the INVERTED ratio (b/a); flipped so a/b (= RS/ST) is
 *   the flagged-correct option, matching `correctAnswer` and the explanation.
 * - `\\\\frac` (renders as a MathJax line break) -> `\\frac` throughout.
 * - Rebuilt the broken nested-IIFE figure as a plain proportional SVG right
 *   triangle with a right-angle mark at S and live side-length labels.
 * - Distractor reasons made mathematically honest.
 */

export const generator_1343 = {
  metadata: {
    id: "1343",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => {
      a = Math.abs(a); b = Math.abs(b);
      while (b) { const t = b; b = a % b; a = t; }
      return a || 1;
    };

    // Pythagorean triple [leg, leg, hypotenuse]; all coprime.
    const triple = getRandomElement([
      [11, 60, 61],
      [16, 63, 65],
      [33, 56, 65],
      [48, 55, 73],
      [13, 84, 85]
    ]) as [number, number, number];

    const scale = getRandomInt(3, 8);
    const leg1 = triple[0] * scale;      // RS (opposite angle T)
    const leg2 = triple[1] * scale;      // ST (adjacent to angle T)
    const hypotenuse = triple[2] * scale; // TR (hypotenuse)

    // tan T = RS / ST = leg1 / leg2 = triple[0] / triple[1]; reduce it.
    const g = gcd(triple[0], triple[1]);
    const reducedNum = triple[0] / g;     // numerator of tan W
    const reducedDen = triple[1] / g;     // denominator of tan W

    // ── Figure: proportional right triangle, right angle at S ────────────────
    // S bottom-left, T bottom-right (ST horizontal = leg2), R above S (RS vertical = leg1).
    const W = 420, H = 300, P = 46;
    const spanX = W - 2 * P, spanY = H - 2 * P;
    // Scale so the longer leg fills its axis; keep the true leg1:leg2 ratio.
    const k = Math.min(spanX / leg2, spanY / leg1);
    const legX = leg2 * k;
    const legY = leg1 * k;
    const sx = P, syB = H - P;            // S (right-angle vertex)
    const tx = P + legX, ty = syB;        // T
    const rx = P, ry = syB - legY;        // R
    const rm = 16;                        // right-angle square size
    const figureCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${sx},${syB} ${tx},${ty} ${rx},${ry}" fill="#3b82f6" fill-opacity="0.10" stroke="#3b82f6" stroke-width="2"/>` +
      `<path d="M ${sx + rm} ${syB} L ${sx + rm} ${syB - rm} L ${sx} ${syB - rm}" fill="none" stroke="#3b82f6" stroke-width="1.5"/>` +
      `<circle cx="${sx}" cy="${syB}" r="3.5" fill="#3b82f6"/>` +
      `<circle cx="${tx}" cy="${ty}" r="3.5" fill="#3b82f6"/>` +
      `<circle cx="${rx}" cy="${ry}" r="3.5" fill="#3b82f6"/>` +
      `<text x="${sx - 10}" y="${syB + 18}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">S</text>` +
      `<text x="${tx + 12}" y="${ty + 18}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">T</text>` +
      `<text x="${rx - 12}" y="${ry - 6}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">R</text>` +
      `<text x="${rx - 14}" y="${(syB + ry) / 2}" text-anchor="middle" font-size="13" fill="currentColor">${leg1}</text>` +
      `<text x="${(sx + tx) / 2}" y="${syB + 20}" text-anchor="middle" font-size="13" fill="currentColor">${leg2}</text>` +
      `<text x="${(tx + rx) / 2 + 14}" y="${(ty + ry) / 2 - 6}" text-anchor="middle" font-size="13" fill="currentColor">${hypotenuse}</text>` +
      `</svg></div>`;

    // ── Options ──────────────────────────────────────────────────────────────
    // correct: a/b (= RS/ST). Distractors: reciprocal b/a, and two sum-based errors.
    const optionsData = [
      { text: `\\frac{${reducedNum}}{${reducedDen}}`, isCorrect: true, reason: "correct: tan W = tan T = RS/ST = opposite over adjacent" },
      { text: `\\frac{${reducedDen}}{${reducedNum}}`, isCorrect: false, reason: "inverts the ratio, giving $\\tan R$ (adjacent over opposite) instead of $\\tan W$" },
      { text: `\\frac{${reducedDen}}{${reducedNum + reducedDen}}`, isCorrect: false, reason: "divides a leg by the sum of the two legs rather than by the other leg" },
      { text: `\\frac{${reducedNum + reducedDen}}{${reducedDen}}`, isCorrect: false, reason: "adds the legs in the numerator instead of taking the tangent ratio" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Since $RS^2 + ST^2 = ${leg1}^2 + ${leg2}^2 = ${hypotenuse}^2 = TR^2$, the right angle is at $S$ and $TR$ is the hypotenuse. In right triangle $RST$, $\\tan T = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{RS}{ST} = \\frac{${leg1}}{${leg2}} = \\frac{${reducedNum}}{${reducedDen}}$. Because $\\triangle RST \\sim \\triangle UVW$ with $T$ corresponding to $W$, the angles are equal, so $\\tan W = \\tan T = \\frac{${reducedNum}}{${reducedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In right triangle $RST$, the side lengths are $RS = ${leg1}$, $ST = ${leg2}$, and $TR = ${hypotenuse}$. Triangle $RST$ is similar to triangle $UVW$, where $S$ corresponds to $V$ and $T$ corresponds to $W$. What is the value of $\\tan W$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `\\frac{${reducedNum}}{${reducedDen}}`,
      explanation: explanation
    };
  }
};
