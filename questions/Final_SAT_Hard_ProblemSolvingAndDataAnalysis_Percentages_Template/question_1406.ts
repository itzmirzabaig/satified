import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1406
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [110%, 90%, 47]
 * - Difficulty factors: [Chained "greater than" and "less than" calculations]
 * - Distractor patterns: [Sign errors, decimal errors]
 * - Constraints: [b = 0.1 * 47, a = 2.1 * b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1406 = {
  metadata: {
    id: "1406",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Format an integer numerator over a power-of-ten scale as an exact, clean
    // decimal string (no floating-point artifacts, trailing zeros trimmed).
    const fmtScaled = (num: number, digits: number): string => {
      const neg = num < 0;
      const abs = Math.abs(num);
      if (digits === 0) return (neg ? '-' : '') + abs.toString();
      const s = abs.toString().padStart(digits + 1, '0');
      const intPart = s.slice(0, s.length - digits);
      const fracPart = s.slice(s.length - digits).replace(/0+$/, '');
      return (neg ? '-' : '') + intPart + (fracPart ? '.' + fracPart : '');
    };

    // STEP 1: Generate random parameters
    const P1 = getRandomInt(80, 150); // a is P1% greater than b
    const P2 = getRandomInt(70, 95);  // b is P2% less than base
    const baseValue = getRandomInt(30, 80);

    // STEP 2: Compute exactly using integer numerators, then format.
    // b = base * (100 - P2)/100      -> exact to 2 decimals
    // a = b   * (100 + P1)/100       -> exact to 4 decimals
    const c2 = 100 - P2;              // complement multiplier numerator (percent stayed)
    const c1 = 100 + P1;              // growth multiplier numerator
    const bNum = baseValue * c2;      // value of b, scaled by 100
    const aNum = baseValue * c2 * c1; // value of a, scaled by 10000

    const bStr = fmtScaled(bNum, 2);              // e.g. "9.3"
    const aStr = fmtScaled(aNum, 4);              // e.g. "16.74"  (final answer)
    const lessMultStr = fmtScaled(c2, 2);         // e.g. "0.3"  (1 - P2/100)
    const greaterMultStr = fmtScaled(c1, 2);      // e.g. "1.8"  (1 + P1/100)

    return {
      questionText: `The number $a$ is ${P1}% greater than the number $b$. The number $b$ is ${P2}% less than ${baseValue}. What is the value of $a$?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: aStr,
      explanation: `It is given that $b$ is ${P2}% less than ${baseValue}. Therefore, $b = \\left(1 - \\frac{${P2}}{100}\\right)(${baseValue}) = ${lessMultStr} \\times ${baseValue} = ${bStr}$. It is also given that $a$ is ${P1}% greater than $b$. Therefore, $a = \\left(1 + \\frac{${P1}}{100}\\right)b = ${greaterMultStr} \\times ${bStr} = ${aStr}$.`
    };
  }
};
