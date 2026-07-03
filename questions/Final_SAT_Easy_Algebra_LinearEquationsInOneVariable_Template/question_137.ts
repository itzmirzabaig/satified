import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 137
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 20-60, result: 30-80]
* - Difficulty factors: [Simple subtraction]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_137 = {
  metadata: {
    id: "137",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const addend = getRandomInt(20, 60);
    const result = getRandomInt(30, 80);
    const rightSide = result + addend;

    return {
      questionText: `What value of $x$ is the solution to the equation $x + ${addend} = ${rightSide}$?`,
      figureCode: null,
      options: [],
      correctAnswer: result.toString(),
      explanation: `Subtract ${addend}: x = ${rightSide} - ${addend} = ${result}.`
    };
  }
};
