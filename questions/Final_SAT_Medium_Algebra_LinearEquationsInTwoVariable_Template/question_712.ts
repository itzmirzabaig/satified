import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 712
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [s: 3,6,9, P: 8,18,28, slope: 10/3, intercept: -2]
 * - Difficulty factors: [Finding linear equation from table data]
 * - Distractor patterns: [A: wrong slope, B: wrong intercept, D: inverted slope]
 * - Constraints: [Clean fraction slope]
 * - Question type: [Table -> Multiple Choice Text]
 * - Figure generation: [HTML table of (s, P) points]
 */

export const generator_712 = {
  metadata: {
    id: "712",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate a linear relationship P = slope*s + intercept.
    // The x-values are 3, 6, 9 (all multiples of 3), so slope = a/3 always
    // yields integer P values; slope = a/1 gives an integer slope. We exclude
    // slope == 1 so the "inverted slope" distractor 1/slope is genuinely wrong.
    const sVals = [3, 6, 9];
    let a: number, b: number, slope: number, intercept: number;
    let tries = 0;
    do {
      b = getRandomElement([1, 3]);   // denominator: 1 -> integer slope, 3 -> often a fraction
      a = getRandomInt(2, 10);        // numerator
      slope = a / b;
      intercept = getRandomInt(-5, 5);
      tries++;
    } while ((slope === 1 || intercept === 0) && tries < 50);
    // Deterministic fallbacks in case the bounded loop exhausts.
    if (slope === 1) { a = 2; b = 1; slope = 2; }
    if (intercept === 0) intercept = 3;

    const isIntSlope = Number.isInteger(slope);
    const pVals = sVals.map(s => slope * s + intercept); // always integers here

    // Display string for the true slope.
    const slopeStr = isIntSlope ? String(slope) : `\\frac{${a}}{${b}}`;
    // Display string for the inverted (reciprocal) slope: 1/slope.
    const recipStr = isIntSlope ? `\\frac{1}{${slope}}` : `\\frac{${b}}{${a}}`;

    // Signed constant formatter: never produces "+ -3".
    const fmt = (n: number) => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);

    // STEP 2: Build the table (the figure) from the SAME values used above.
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Side length, $s$ (inches)</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Price, $P$ (dollars)</th>
    </tr>
  </thead>
  <tbody>
    ${sVals.map((s, i) => `<tr>
      <td style="border: 1px solid currentColor; padding: 8px;">${s}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${pVals[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;

    // STEP 3: Build four provably-distinct options.
    // - correct:     slope = slopeStr, intercept = intercept
    // - wrongInter:  same slope, shifted intercept (constant differs)
    // - inverted:    reciprocal slope (a fraction), same intercept
    // - wrongSlope:  a larger integer slope with a different intercept
    let dInt = getRandomElement([2, 3, 4]);
    let wrongIntercept = intercept + dInt;
    if (wrongIntercept === 0) wrongIntercept = intercept - dInt; // keep it nonzero & != intercept

    const wrongSlope = Math.round(slope) + getRandomElement([2, 3]); // integer, >= 3, != slope
    let wrongSlopeIntercept = intercept + getRandomElement([-2, 1, 2]);
    if (wrongSlopeIntercept === 0) wrongSlopeIntercept = intercept + 3;

    const correctText = `$P = ${slopeStr}s ${fmt(intercept)}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$P = ${slopeStr}s ${fmt(wrongIntercept)}$`, isCorrect: false },
      { text: `$P = ${recipStr}s ${fmt(intercept)}$`, isCorrect: false },
      { text: `$P = ${wrongSlope}s ${fmt(wrongSlopeIntercept)}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 4: Explanation from the same live variables.
    const deltaP = pVals[1] - pVals[0]; // = 3*slope = a  (integer)
    const deltaS = sVals[1] - sVals[0]; // = 3

    return {
      questionText: `An artist paints and sells square tiles. The selling price $P$, in dollars, of a painted tile is a linear function of the side length of the tile $s$, in inches, as shown in the table. Which equation could represent this relationship?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Using the first two rows of the table, the slope is $\\frac{${pVals[1]} - ${pVals[0]}}{${sVals[1]} - ${sVals[0]}} = \\frac{${deltaP}}{${deltaS}} = ${slopeStr}$. Substituting the point $(${sVals[0]}, ${pVals[0]})$ into $P = ${slopeStr}s + b$ and solving gives $b = ${pVals[0]} - ${slopeStr}(${sVals[0]}) = ${intercept}$. Therefore the equation is $P = ${slopeStr}s ${fmt(intercept)}$.`
    };
  }
};
