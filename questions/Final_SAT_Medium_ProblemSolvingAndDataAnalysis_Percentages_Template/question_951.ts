import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 951
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 450, percent: 6%, result: 27]
 * - Difficulty factors: [Simple percentage of a number]
 * - Distractor patterns: [N/A - fill in blank, but format shows empty options]
 * - Constraints: [result = total * percent / 100]
 * - Question type: [Text→Fill-in-the-blank (no options shown)]
 * - Figure generation: [No figure]
 */

export const generator_951 = {
  metadata: {
    id: "951",
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
