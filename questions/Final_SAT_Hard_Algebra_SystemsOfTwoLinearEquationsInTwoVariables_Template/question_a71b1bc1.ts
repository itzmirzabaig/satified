import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: a71b1bc1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 32, x = 3y + 4, answer: 25]
 * - Difficulty factors: [Word problem, substitution]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Answer must be integer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_a71b1bc1 = {
  metadata: {
    // id: "a71b1bc1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;
    
    while (attempts < maxAttempts && !result) {
      attempts++;
      
      const total = getRandomInt(20, 40);
      const mult = getRandomInt(2, 4);
      const add = getRandomInt(2, 6);
      
      const y_val = (total - add) / (mult + 1);
      
      if (y_val !== Math.floor(y_val) || y_val <= 0) {
        continue;
      }
      
      const x_val = mult * y_val + add;
      
      result = {
        questionText: `A piece of wire with a length of ${total} inches is cut into two parts. One part has a length of $x$ inches, and the other part has a length of $y$ inches. The value of $x$ is ${add} more than ${mult} times the value of $y$. What is the value of $x$?`,
        figureCode: null,
        options: null,
        correctAnswer: x_val.toString(),
        explanation: `The system is $x + y = ${total}$ and $x = ${mult}y + ${add}$. Substituting gives ${mult}y + ${add} + y = ${total}$, so ${mult + 1}y = ${total - add}$ and $y = ${y_val}$. Therefore, $x = ${mult}(${y_val}) + ${add} = ${x_val}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: 567ac7ab
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 6, answer options with various coefficients]
 * - Difficulty factors: [No solution identification from given equation]
 * - Distractor patterns: [Same line, wrong slope, perpendicular]
 * - Constraints: [Correct option must have slope 1/3, different intercept]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */