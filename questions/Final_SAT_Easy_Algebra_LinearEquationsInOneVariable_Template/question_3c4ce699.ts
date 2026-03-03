import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 3c4ce699
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 2-10, rightSide: 4-20, multiplier: 2-5]
* - Difficulty factors: [Expression scaling]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_3c4ce699 = {
  metadata: {
    // id: "3c4ce699",
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
      options: null,
      correctAnswer: result.toString(),
      explanation: `Multiply both sides by ${multiplier}: ${multiplier}(${addend} + x) = ${multiplier}(${rightSide}), giving ${multiplier * addend} + ${multiplier}x = ${result}.`
    };
  }
};

/**
* Question ID: 9fc31513
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side: 8-18, base: 5-20]
* - Difficulty factors: [Geometric context, perimeter formula]
* - Distractor patterns: [A: congruent side, B/D: wrong calc]
* - Constraints: [Triangle inequality]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
