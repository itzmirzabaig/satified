import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 114
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 2-10, rightSide: 4-20, multiplier: 2-5]
* - Difficulty factors: [Expression scaling]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_114 = {
  metadata: {
    id: "114",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const addend = getRandomInt(2, 10);
    const rightSide = getRandomInt(addend + 2, addend + 10);
    const multiplier = getRandomInt(2, 5);
    const result = multiplier * rightSide;

    return {
      questionText: `If \\( ${addend} + x = ${rightSide} \\), what is the value of \\( ${multiplier * addend} + ${multiplier}x \\)?`,
      figureCode: null,
      options: [],
      correctAnswer: result.toString(),
      explanation: `Multiply both sides by ${multiplier}: ${multiplier}(${addend} + x) = ${multiplier}(${rightSide}), giving ${multiplier * addend} + ${multiplier}x = ${result}.`
    };
  }
};
