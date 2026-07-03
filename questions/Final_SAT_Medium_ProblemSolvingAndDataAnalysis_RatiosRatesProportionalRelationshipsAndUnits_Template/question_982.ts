import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 982
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 874 in², pressure: 19 psi]
 * - Difficulty factors: [Pressure × Area = Force, large number multiplication]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must multiply]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Fill-in answer is now a plain number string (was force.toLocaleString(),
 *   which inserted a comma and failed the grader's typed-answer format).
 * - Explanation computation wrapped in proper inline math ($...$); removed the
 *   stray "/" and the \text{} command that was sitting in bare prose.
 * - force = area * pressure is always an integer over the declared ranges, so
 *   there is no float artifact and no rounding needed.
 */

export const generator_982 = {
  metadata: {
    id: "982",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 874 in², 19 psi, force = 16606
    const area = getRandomInt(500, 1200);
    const pressure = getRandomInt(10, 40);

    // STEP 2: Calculate. Both are integers, so force is an exact integer.
    const force = area * pressure;

    return {
      questionText: `One side of a flat board has an area of $${area}$ square inches. If a pressure of $${pressure}$ pounds per square inch of area is exerted on this side of the board, what is the total force, in pounds, exerted on this side of the board?`,
      figureCode: null,
      options: [],
      // Fill-in: students type the answer, so it must be a plain number (no comma).
      correctAnswer: force.toString(),
      explanation: `The correct answer is ${force.toLocaleString()}. It is given that one side of the board has an area of $${area}$ square inches, and a pressure of $${pressure}$ pounds per square inch is exerted on that side. Force is pressure multiplied by area, so the total force is $${pressure} \\times ${area} = ${force}$ pounds.`
    };
  }
};
