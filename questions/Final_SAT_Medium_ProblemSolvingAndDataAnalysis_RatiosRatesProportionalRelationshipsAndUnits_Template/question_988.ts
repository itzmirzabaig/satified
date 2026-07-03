import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 988
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [moon1: 252 days, moon2: 287 days, 29 orbits]
 * - Difficulty factors: [Multiplication, then difference calculation]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 *
 * REPAIR NOTES:
 * - Fill-in answer must be a plain number: toLocaleString() inserted thousands
 *   separators (e.g. "2,280") which the grader rejects. Emit the raw integer.
 * - Math was already sound: difference = periodDiff * orbits is a positive integer
 *   for every draw (periodDiff in [20,60], orbits in [10,40] -> difference in
 *   [200,2400]). Removed separators everywhere so the explanation renders plain
 *   integers in MathJax, consistent with the answer.
 */

export const generator_988 = {
  metadata: {
    id: "988",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 252 and 287 days, 29 orbits, difference = 1015
    const period1 = getRandomInt(100, 300);
    const periodDiff = getRandomInt(20, 60);
    const period2 = period1 + periodDiff;
    const orbits = getRandomInt(10, 40);
    
    // STEP 2: Calculate answer
    const time1 = period1 * orbits;
    const time2 = period2 * orbits;
    const difference = time2 - time1; // = periodDiff * orbits
    
    return {
      questionText: `One of a planet's moons orbits the planet every $${period1}$ days. A second moon orbits the planet every $${period2}$ days. How many more days does it take the second moon to orbit the planet $${orbits}$ times than it takes the first moon to orbit the planet $${orbits}$ times?`,
      figureCode: null,
      options: null,
      correctAnswer: String(difference),
      explanation: `The correct answer is $${difference}$. It's given that the first moon orbits the planet every $${period1}$ days. Therefore, it takes the first moon $${period1}(${orbits})$, or $${time1}$, days to orbit the planet $${orbits}$ times. It's also given that the second moon orbits the planet every $${period2}$ days. Therefore, it takes the second moon $${period2}(${orbits})$, or $${time2}$, days to orbit the planet $${orbits}$ times. Since it takes the first moon $${time1}$ days and the second moon $${time2}$ days, it takes the second moon $${time2} - ${time1}$, or $${difference}$, more days than it takes the first moon to orbit the planet $${orbits}$ times.`
    };
  }
};
