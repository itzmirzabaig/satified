import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: da2e9202
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 10-20, const1: 20-50, result: 50-300]
* - Difficulty factors: [Equivalent equations, subtraction]
* - Distractor patterns: [A: wrong constant, B: wrong sub, D: ignored constant]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_da2e9202 = {
  metadata: {
    // id: "da2e9202",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(10, 20);
    const const1 = getRandomInt(20, 50);
    const rightSide = const1 + coeff * getRandomInt(5, 15);
    const result = rightSide - const1;

    const optionsData = [
      { text: `$$${coeff}x = ${const1}$$`, isCorrect: false, reason: "wrong constant" },
      { text: `$$${coeff}x = ${result - 30}$$`, isCorrect: false, reason: "wrong subtraction" },
      { text: `$$${coeff}x = ${result}$$`, isCorrect: true },
      { text: `$$${coeff}x = ${rightSide}$$`, isCorrect: false, reason: "ignored the constant" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `$$${coeff}x + ${const1} = ${rightSide}$$ Which equation has the same solution as the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$$${coeff}x = ${result}$$`,
      explanation: `Subtract ${const1}: ${coeff}x = ${rightSide} - ${const1} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

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
