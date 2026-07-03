import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 125
*
* ORIGINAL ANALYSIS:
* - Number ranges: [decimals: 1.0-4.0]
* - Difficulty factors: [Decimal subtraction]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Decimal result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_125 = {
  metadata: {
    id: "125",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const addend = parseFloat((Math.random() * 3 + 1).toFixed(1));
    const result = parseFloat((Math.random() * 2 + 0.5).toFixed(1));
    const rightSide = parseFloat((addend + result).toFixed(1));

    return {
      questionText: `What value of $x$ is the solution to the given equation $${addend} + x = ${rightSide}$?`,
      figureCode: null,
      options: [],
      correctAnswer: result.toString(),
      explanation: `Subtract ${addend}: x = ${rightSide} - ${addend} = ${result}.`
    };
  }
};
