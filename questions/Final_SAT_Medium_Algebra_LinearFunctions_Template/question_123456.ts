import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 123456
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = -9x + 9]
 * - Difficulty factors: [Identifying y-intercept from slope-intercept form]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward identification]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_123456 = {
  metadata: {
    // id: "123456",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: -10 to -3 or 3 to 10
    const m = getRandomInt(3, 10) * (Math.random() > 0.5 ? 1 : -1);
    // Intercept: 3-15
    const b = getRandomInt(3, 15);
    
    // STEP 2: Return question data
    return {
      questionText: `The function $f$ is defined by $f(x) = ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}$. What is the $y$-coordinate of the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?`,
      figureCode: null,
      options: null,
      correctAnswer: b.toString(),
      explanation: `The function is in slope-intercept form $y = mx + b$ where $b$ is the y-intercept. Here $b = ${b}$, so the y-coordinate of the y-intercept is ${b}.`
    };
  }
};

/**
 * Question ID: 902468
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [w(t) = 300 - 4t]
 * - Difficulty factors: [Interpreting rate in context]
 * - Distractor patterns: [A = initial value, B = calculation error, C = rate calculation error]
 * - Constraints: [None - straightforward interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */