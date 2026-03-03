import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 4f8bd093
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff1: 10-25, coeff2: 11-35, const1: 10-40]
* - Difficulty factors: [Variables on both sides]
* - Distractor patterns: [A: sign error, B/C: wrong fraction]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_4f8bd093 = {
  metadata: {
    // id: "4f8bd093",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff1 = getRandomInt(10, 25);
    const coeff2 = getRandomInt(coeff1 + 1, coeff1 + 10);
    const adjustedConst1 = (coeff2 - coeff1) * getRandomInt(2, 6);
    const finalResult = adjustedConst1 / (coeff2 - coeff1);

    const optionsData = [
      { text: (-finalResult).toString(), isCorrect: false, reason: "sign error" },
      { text: `\\(\\frac{3}{10}\\)`, isCorrect: false, reason: "wrong fraction" },
      { text: `\\(\\frac{1}{3}\\)`, isCorrect: false, reason: "wrong fraction" },
      { text: finalResult.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $x$ is the solution to the equation $${coeff1}x + ${adjustedConst1} = ${coeff2}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: finalResult.toString(),
      explanation: `Subtract ${coeff1}x: ${adjustedConst1} = ${coeff2 - coeff1}x. Divide: x = ${adjustedConst1}/${coeff2 - coeff1} = ${finalResult}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 9ff10b3b
*
* ORIGINAL ANALYSIS:
* - Number ranges: [d1: 1-3, factor: 2-3]
* - Difficulty factors: [Fraction arithmetic, common denominators]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
