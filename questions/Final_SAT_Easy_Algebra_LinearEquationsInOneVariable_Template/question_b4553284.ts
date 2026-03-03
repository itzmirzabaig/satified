import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: b4553284
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-5, rightSide: 10-75, multiplier: 3-6]
* - Difficulty factors: [Solve for expression, scaling]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_b4553284 = {
  metadata: {
    // id: "b4553284",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 5);
    const rightSide = coeff * getRandomInt(5, 15);
    const multiplier = getRandomInt(3, 6);
    const x = rightSide / coeff;
    const result = multiplier * coeff * x;

    return {
      questionText: `If \\( ${coeff}x = ${rightSide} \\), what is the value of \\( ${multiplier * coeff}x \\)?`,
      figureCode: null,
      options: null,
      correctAnswer: (multiplier * rightSide).toString(),
      explanation: `Multiply both sides by ${multiplier}: ${multiplier * coeff}x = ${multiplier} × ${rightSide} = ${multiplier * rightSide}.`
    };
  }
};

/**
* Question ID: ed18c4f7
*
* ORIGINAL ANALYSIS:
* - Number ranges: [multiplier: 2-4, addend: 2-8]
* - Difficulty factors: [Translating words to expression]
* - Distractor patterns: [A: wrong ops, B: wrong coeff, C: subtraction]
* - Constraints: [Proper algebraic translation]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
