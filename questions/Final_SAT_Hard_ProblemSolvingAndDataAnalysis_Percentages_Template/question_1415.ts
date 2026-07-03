import { getRandomElement, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1415
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [70%, 80% (medium-high percentages)]
 * - Difficulty factors: [Sequential percentage changes, "less than" vs "greater than"]
 * - Distractor patterns: [Sign errors in final calculation, order of operations]
 * - Constraints: [a = 0.3b, c = 1.8a, so c = 0.54b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1415 = {
  metadata: {
    id: "1415",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Draw the two percentages as multiples of 10 so every result is a
    // clean 2-decimal value: (100-P1) and (100+P2) are multiples of 10, so their
    // product is a multiple of 100 and dividing by 10000 gives at most 2 decimals.
    const P1 = getRandomElement([60, 70, 80]);       // a is P1% less than b
    const P2 = getRandomElement([60, 70, 80, 90, 100]); // c is P2% greater than a

    // STEP 2: Build multipliers from integer numerators over 100 (no float drift).
    const aMultiplier = round((100 - P1) / 100, 2); // a = aMultiplier * b
    const cMultiplier = round((100 + P2) / 100, 2); // c = cMultiplier * a
    // c = aMultiplier * cMultiplier * b; compute the ratio exactly via integers.
    const finalRatio = round(((100 - P1) * (100 + P2)) / 10000, 2); // c as a multiple of b

    return {
      questionText: `The number $a$ is ${P1}% less than the positive number $b$. The number $c$ is ${P2}% greater than $a$. The number $c$ is how many times $b$?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: finalRatio.toString(),
      explanation: `Since $a$ is ${P1}% less than $b$, we have $a = \\left(1 - \\frac{${P1}}{100}\\right)b = ${aMultiplier}b$. Since $c$ is ${P2}% greater than $a$, we have $c = \\left(1 + \\frac{${P2}}{100}\\right)a = ${cMultiplier}a$. Substituting the first result into the second gives $c = ${cMultiplier}(${aMultiplier}b) = ${finalRatio}b$. Therefore, $c$ is ${finalRatio} times $b$.`
    };
  }
};
