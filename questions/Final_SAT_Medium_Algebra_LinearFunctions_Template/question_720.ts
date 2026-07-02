import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 720
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(0) = 45]
 * - Difficulty factors: [Identifying y-intercept]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward identification]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_720 = {
  metadata: {
    id: "720",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // h(0) value: 30-60
    const h0 = getRandomInt(30, 60);
    
    // STEP 2: Return question data
    return {
      questionText: `For the linear function $h$, $b$ is a constant and $h(x) = x + b$. If $h(0)=${h0}$, what is the value of $b$?`,
      figureCode: null,
      options: null,
      correctAnswer: h0.toString(),
      explanation: `Since $h(0) = 0 + b = b$, and $h(0) = ${h0}$, we have $b = ${h0}$.`
    };
  }
};
