import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: eac739b2
*
* ORIGINAL ANALYSIS:
* - Number ranges: [factor: 2-4, multiplier: 4, baseCoeff: 2-4]
* - Difficulty factors: [Expression scaling, recognizing multiples]
* - Distractor patterns: [A: close error, C: wrong multiple, D: addition error]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_eac739b2 = {
  metadata: {
    // id: "eac739b2",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const factor = getRandomInt(2, 4);
    const multiplier = 4;
    const baseCoeff = getRandomInt(2, 4);
    const xCoeff = factor * baseCoeff;
    const const1 = factor * getRandomInt(1, 4);
    const rightSide = factor * getRandomInt(3, 8);
    const result = multiplier * rightSide;

    const optionsData = [
      { text: (result - 8).toString(), isCorrect: false, reason: "results from calculation errors" },
      { text: result.toString(), isCorrect: true },
      { text: (result + 8).toString(), isCorrect: false, reason: "results from calculation errors" },
      { text: (result + 12).toString(), isCorrect: false, reason: "results from calculation errors" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${xCoeff}x + ${const1} = ${rightSide}$, what is the value of $${multiplier * xCoeff}x + ${multiplier * const1}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Notice that $${multiplier * xCoeff}x + ${multiplier * const1}$ is exactly ${multiplier} times the left side of the given equation. Therefore, multiply the right side by ${multiplier}: ${multiplier} \\times ${rightSide} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 2e98b1df
*
* ORIGINAL ANALYSIS:
* - Number ranges: [initial: 50-150, daily: 5-20, days: 3-8]
* - Difficulty factors: [Word problem, arithmetic sequence]
* - Distractor patterns: [A: mult error, C: ignored rate, D: ignored increase]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
