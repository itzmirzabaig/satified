import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';



/**
 * Question 1404
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [P1 in 40..80 (% greater), P2 in 30..60 (% less)]
 * - Difficulty factors: [Sequential percentage changes, exact ratio]
 * - Distractor patterns: [Fill-in, no options]
 * - Constraints: [a = (1 + P1/100)b, c = (1 - P2/100)a, so c = (1 + P1/100)(1 - P2/100)b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 *
 * CORRECTNESS NOTE:
 * The exact ratio is (100 + P1)(100 - P2) / 10000, an integer numerator over 10000 and so it
 * terminates in at most 4 decimal places. The previous version rounded to 2 decimals
 * (Math.round(x*100)/100), producing the WRONG answer for most draws (e.g. P1=40, P2=31 gives an
 * exact 0.966 but rounded to 0.97) and printing raw float multipliers. We now build every
 * displayed number as an EXACT decimal string from integer arithmetic, so the answer is provably
 * correct and free of floating-point artifacts.
 */

/** value = numerator / 10^scale, formatted exactly with trailing zeros stripped (no float math). */
function exactDecimal(numerator: number, scale: number): string {
  const neg = numerator < 0;
  const digits = String(Math.abs(numerator)).padStart(scale + 1, '0');
  const intPart = digits.slice(0, digits.length - scale) || '0';
  const frac = digits.slice(digits.length - scale).replace(/0+$/, '');
  const body = frac.length ? `${intPart}.${frac}` : intPart;
  return neg ? `-${body}` : body;
}

export const generator_1404 = {
  metadata: {
    id: "1404",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate percentages.
    const P1 = getRandomInt(40, 80); // a is P1% greater than b
    const P2 = getRandomInt(30, 60); // c is P2% less than a

    // STEP 2: Exact multipliers as decimal strings (2 decimal places each).
    const aMultiplierStr = exactDecimal(100 + P1, 2);       // 1 + P1/100
    const cMultiplierStr = exactDecimal(100 - P2, 2);       // 1 - P2/100

    // STEP 3: Exact final ratio = (100 + P1)(100 - P2) / 10000, terminates in <= 4 decimals.
    const ratioNumerator = (100 + P1) * (100 - P2);
    const finalRatioStr = exactDecimal(ratioNumerator, 4);

    return {
      questionText: `The number $a$ is ${P1}% greater than the positive number $b$. The number $c$ is ${P2}% less than $a$. The number $c$ is how many times $b$? Enter your answer as a decimal.`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: finalRatioStr,
      explanation: `It's given that $a$ is ${P1}% greater than $b$, so $a = \\left(1 + \\frac{${P1}}{100}\\right)b = ${aMultiplierStr}b$. It's also given that $c$ is ${P2}% less than $a$, so $c = \\left(1 - \\frac{${P2}}{100}\\right)a = ${cMultiplierStr}a$. Substituting the expression for $a$ gives $c = ${cMultiplierStr}\\left(${aMultiplierStr}b\\right) = ${finalRatioStr}b$. Therefore, $c$ is ${finalRatioStr} times $b$.`
    };
  }
};
