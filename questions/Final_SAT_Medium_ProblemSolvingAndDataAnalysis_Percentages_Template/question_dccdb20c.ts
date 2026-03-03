import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: dccdb20c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 450, percent: 6%, result: 27]
 * - Difficulty factors: [Simple percentage of a number]
 * - Distractor patterns: [N/A - fill in blank, but format shows empty options]
 * - Constraints: [result = total * percent / 100]
 * - Question type: [Text→Fill-in-the-blank (no options shown)]
 * - Figure generation: [No figure]
 */

export const generator_dccdb20c = {
  metadata: {
    // id: "dccdb20c",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 450 tiles, 6% black → 27
    const total = getRandomInt(20, 80) * 10; // 200-800
    const percent = getRandomInt(3, 12); // 3% to 12%
    
    // STEP 2: Calculate answer
    const result = Math.round((percent / 100) * total);
    
    const correctAnswer = result.toString();
    
    // STEP 3: Return question data
    return {
      questionText: `There are ${total} tiles in a box. Of these tiles, ${percent}\\% are black. How many black tiles are in the box?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. It's given that ${percent}\\% of the ${total} tiles in a box are black. Therefore, the number of black tiles in the box can be calculated by multiplying the number of tiles in the box by \\( \\frac{${percent}}{100} \\), which is equivalent to \\( ${total} \\times \\frac{${percent}}{100} = ${correctAnswer} \\).`
    };
  }
};
/**
 * Question ID: 566759ef
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: $800, depreciation: 20% per year, years: 2, result: $512]
 * - Difficulty factors: [Compound depreciation over multiple years, successive percentage decrease]
 * - Distractor patterns: [A: $480 (linear depreciation), C: $556 (random), D: $640 (after 1 year only)]
 * - Constraints: [value = initial * (1 - rate)^years]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
