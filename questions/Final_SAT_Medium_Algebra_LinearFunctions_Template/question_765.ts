import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 765
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [earnings: 215, fraction: 2/5, weeks: 9]
 * - Difficulty factors: [Fraction multiplication, multi-step calculation]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_765 = {
  metadata: {
    id: "765",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // Denominator 3-6; numerator is a proper-fraction numerator (1..denom-1)
    // so the fraction is always a genuine proper fraction (never n/n = 1).
    const denom = getRandomInt(3, 6);
    const num = getRandomInt(1, denom - 1);
    // Weeks: 6-12.
    const weeks = getRandomInt(6, 12);

    // STEP 2: Choose weekly earnings as a multiple of denom in [180, 250]
    // so the weekly savings (num/denom of earnings) is always a clean integer.
    const minMult = Math.ceil(180 / denom);
    const maxMult = Math.floor(250 / denom);
    const weeklyEarnings = getRandomInt(minMult, maxMult) * denom;

    // STEP 3: Calculate answer (all integer by construction).
    const weeklySavings = (num * weeklyEarnings) / denom; // integer
    const totalSavings = weeklySavings * weeks;           // integer

    // STEP 4: Return question data. Currency is always written as \$ so
    // MathJax never pairs a bare $ with the $...$ math delimiters.
    return {
      questionText: `A worker saves $\\frac{${num}}{${denom}}$ of the \\$${weeklyEarnings} they earn each week from their job. If the worker continues to save at this rate, how much money, in dollars, will they save in ${weeks} weeks?`,
      figureCode: null,
      options: null,
      correctAnswer: totalSavings.toString(),
      explanation: `Each week the worker saves $\\frac{${num}}{${denom}}$ of \\$${weeklyEarnings}, which is $\\frac{${num}}{${denom}} \\times ${weeklyEarnings} = ${weeklySavings}$ dollars per week. Over ${weeks} weeks, the total saved is $\\frac{${num}}{${denom}} \\times ${weeklyEarnings} \\times ${weeks} = ${totalSavings}$ dollars. Therefore, the worker saves \\$${totalSavings}.`
    };
  }
};
