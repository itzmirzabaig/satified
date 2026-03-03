import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 349a5bc1
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-8, const1: 2-10, result: 20-100]
* - Difficulty factors: [Two-step equation]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_349a5bc1 = {
  metadata: {
    // id: "349a5bc1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 8);
    const const1 = getRandomInt(2, 10);
    const result = getRandomInt(20, 100);
    const rightSide = coeff * result + const1;

    return {
      questionText: `What is the solution to the given equation? $$${coeff}x + ${const1} = ${rightSide}$$`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Subtract ${const1}: $${coeff}x = ${rightSide - const1}$. Divide by ${coeff}: $x = ${result}$. Check: $${coeff}(${result}) + ${const1} = ${coeff * result} + ${const1} = ${rightSide}$.`
    };
  }
};

/**
* Question ID: 6105234d
*
* ORIGINAL ANALYSIS:
* - Number ranges: [downPayment: 20-60, monthlyRate: 10-25, months: 3-12]
* - Difficulty factors: [Word problem, setting up linear equation]
* - Distractor patterns: [A: subtraction, B: swapped variable, D: swapped values]
* - Constraints: [Realistic money values]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
