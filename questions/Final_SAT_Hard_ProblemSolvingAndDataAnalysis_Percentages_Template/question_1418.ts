import { getRandomElement, getRandomInt, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1418
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [P1% greater (90..140), P2% less (40..70), base 30..80]
 * - Difficulty factors: [Chained percentage calculations]
 * - Distractor patterns: [N/A - fill-in]
 * - Constraints: [z = (1 - P2/100)·base, w = (1 + P1/100)·z]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 *
 * NUMBER CONSTRUCTION (clean ≤2-decimal answer, no float artifacts):
 *   Draw P1 and P2 as multiples of 10 (as in sibling question_1415). Then
 *   (100 - P2) and (100 + P1) are multiples of 10, so
 *     w = base·(100 - P2)·(100 + P1) / 10000
 *   has a numerator that is a multiple of 100 and therefore at most 2 decimals.
 *   Every displayed number is produced with round(...) from the same live
 *   variables used for the answer, so the explanation and answer always agree.
 */

export const generator_1418 = {
  metadata: {
    id: "1418",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Percentages as multiples of 10 so all results are clean 2-decimals.
    const P1 = getRandomElement([90, 100, 110, 120, 130, 140]); // w is P1% greater than z
    const P2 = getRandomElement([40, 50, 60, 70]);              // z is P2% less than base
    const baseValue = getRandomInt(30, 80);

    // STEP 2: Multipliers from integer numerators over 100 (no float drift).
    const zMultiplier = round((100 - P2) / 100, 2); // z = zMultiplier * baseValue
    const wMultiplier = round((100 + P1) / 100, 2); // w = wMultiplier * z

    // z is at most 1 decimal; w is at most 2 decimals. Derive w from the same
    // rounded intermediate that the explanation shows, so the two never disagree.
    const zValue = round(baseValue * (100 - P2) / 100, 2);
    const wValue = round(zValue * wMultiplier, 2);

    return {
      questionText: `The number $w$ is ${P1}% greater than the number $z$. The number $z$ is ${P2}% less than ${baseValue}. What is the value of $w$?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: wValue.toString(),
      explanation: `Since $z$ is ${P2}% less than ${baseValue}, we have $z = \\left(1 - \\frac{${P2}}{100}\\right)(${baseValue}) = ${zMultiplier} \\times ${baseValue} = ${zValue}$. Since $w$ is ${P1}% greater than $z$, we have $w = \\left(1 + \\frac{${P1}}{100}\\right)z = ${wMultiplier} \\times ${zValue} = ${wValue}$.`
    };
  }
};
