import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: e7b6f0d1
*
* ORIGINAL ANALYSIS:
* - Number ranges: [xCoeff: 2-6, const1: 20-50, const2: 5-15]
* - Difficulty factors: [Equivalent equations, subtracting from both sides]
* - Distractor patterns: [A, B, D: calculation errors]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_e7b6f0d1 = {
  metadata: {
    // id: "e7b6f0d1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const xCoeff = getRandomInt(2, 6);
    const const1 = getRandomInt(20, 50);
    const const2 = getRandomInt(5, 15);
    const result = const1 - const2;

    const optionsData = [
      { text: `${xCoeff}x = ${result + 20}`, isCorrect: false, reason: "results from calculation errors" },
      { text: `${xCoeff}x = ${result + 10}`, isCorrect: false, reason: "results from calculation errors" },
      { text: `${xCoeff}x = ${result}`, isCorrect: true },
      { text: `${xCoeff}x = ${Math.floor(result / 2)}`, isCorrect: false, reason: "results from calculation errors" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Which equation has the same solution as the given equation? $$${xCoeff}x + ${const2} = ${const1}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${xCoeff}x = ${result}`,
      explanation: `Subtract ${const2}: ${xCoeff}x = ${const1} - ${const2} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 8339793c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [numBins: 5-15, unitPrice: 5-15, finalPrice: 20-50]
* - Difficulty factors: [Multi-step word problem, reverse operations]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
