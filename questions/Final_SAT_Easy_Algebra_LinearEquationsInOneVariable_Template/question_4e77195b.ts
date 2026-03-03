import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 4e77195b
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 2-8, rightSide: 20-100, multiplier: 4-10]
* - Difficulty factors: [Expression scaling]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_4e77195b = {
  metadata: {
    // id: "4e77195b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const addend = getRandomInt(2, 8);
    const rightSide = getRandomInt(20, 100);
    const multiplier = getRandomInt(4, 10);
    const result = multiplier * rightSide;

    return {
      questionText: `If \\( ${addend} + x = ${rightSide} \\), what is the value of \\( ${multiplier * addend} + ${multiplier}x \\)?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Multiply by ${multiplier}: ${multiplier * addend} + ${multiplier}x = ${multiplier} × ${rightSide} = ${result}.`
    };
  }
};

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
