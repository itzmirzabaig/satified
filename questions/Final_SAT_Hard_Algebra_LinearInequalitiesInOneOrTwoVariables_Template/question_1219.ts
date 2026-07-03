import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1219
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 3, subtract: 2, y-value: -4]
 * - Difficulty factors: [Word problem translation, "at most" = ≤, substitution]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must compute 3*(-4) - 2 correctly]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_1219 = {
  metadata: {
    id: "1219",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: x ≤ 3y - 2, y = -4
    // Generate similar: coefficient 2-4, subtract 1-3, y-value negative
    
    const coefficient = getRandomInt(2, 4);
    const subtractValue = getRandomInt(1, 3);
    const yValue = getRandomInt(-6, -2);
    
    // STEP 2: Calculate greatest possible x
    // x ≤ coefficient*y - subtractValue
    const maxX = coefficient * yValue - subtractValue;
    
    // STEP 3: Return question data
    return {
      questionText: `A number $x$ is at most ${subtractValue} less than ${coefficient} times the value of $y$. If the value of $y$ is $${yValue}$, what is the greatest possible value of $x$?`,
      figureCode: null,
      options: [],
      correctAnswer: maxX.toString(),
      explanation: `The correct answer is $${maxX}$. It's given that a number $x$ is at most ${subtractValue} less than ${coefficient} times the value of $y$. Therefore, $x$ is less than or equal to ${subtractValue} less than ${coefficient} times the value of $y$. The expression $${coefficient}y$ represents ${coefficient} times the value of $y$. The expression $${coefficient}y - ${subtractValue}$ represents ${subtractValue} less than ${coefficient} times the value of $y$. Therefore, $x$ is less than or equal to $${coefficient}y - ${subtractValue}$. This can be shown by the inequality $x \\\\leq ${coefficient}y - ${subtractValue}$. Substituting $${yValue}$ for $y$ in this inequality yields $x \\\\leq ${coefficient}(${yValue}) - ${subtractValue}$ or, $x \\\\leq ${maxX}$. Therefore, if the value of $y$ is $${yValue}$, the greatest possible value of $x$ is $${maxX}$.`
    };
  }
};
