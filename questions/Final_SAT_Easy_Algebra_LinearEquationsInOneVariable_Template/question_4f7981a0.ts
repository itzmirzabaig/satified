import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 4f7981a0
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-5, const1: 1-5, rightSide: 10-30, multiplier: 2-4]
* - Difficulty factors: [Expression scaling by 3]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_4f7981a0 = {
  metadata: {
    // id: "4f7981a0",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 5);
    const const1 = getRandomInt(1, 5);
    const rightSide = getRandomInt(10, 30);
    const multiplier = getRandomInt(2, 4);
    const result = multiplier * rightSide;

    return {
      questionText: `If ${coeff}x + ${const1} = ${rightSide}, what is the value of ${multiplier * coeff}x + ${multiplier * const1}?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Multiply by ${multiplier}: ${multiplier}(${coeff}x + ${const1}) = ${multiplier}(${rightSide}), giving ${multiplier * coeff}x + ${multiplier * const1} = ${result}.`
    };
  }
};

/**
* Question ID: c841e8e8
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 5-20, result: 200-400]
* - Difficulty factors: [Simple subtraction]
* - Distractor patterns: [A: division, C: addition, D: multiplication]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
