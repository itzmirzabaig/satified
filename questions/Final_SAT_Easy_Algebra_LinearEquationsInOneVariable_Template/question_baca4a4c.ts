import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: baca4a4c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [outerCoeff: 2-9, innerCoeff: 2-5, innerConst: 2-8]
* - Difficulty factors: [Dividing equation by coefficient, equivalent equations]
* - Distractor patterns: [B: multiplied instead of divided, C/D: distributed incorrectly]
* - Constraints: [Result must be clean integer division]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_baca4a4c = {
  metadata: {
    // id: "baca4a4c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const outerCoeff = getRandomInt(2, 9);
    const innerCoeff = getRandomInt(2, 5);
    const innerConst = getRandomInt(2, 8);
    const rightSide = outerCoeff * getRandomInt(2, 6);
    const simplifiedRight = rightSide / outerCoeff;

    const distractorBRight = rightSide * outerCoeff;
    const distractorCRight = rightSide;
    const distractorDRight = rightSide + outerCoeff;

    const optionsData = [
      { text: `\\(${innerCoeff}x - ${innerConst} = ${simplifiedRight}\\)`, isCorrect: true },
      { text: `\\(${innerCoeff}x - ${innerConst} = ${distractorBRight}\\)`, isCorrect: false, reason: "is equivalent to multiplying the original right side by ${outerCoeff} instead of dividing" },
      { text: `\\(${innerCoeff}x - ${outerCoeff * innerConst} = ${rightSide}\\)`, isCorrect: false, reason: "incorrectly distributes ${outerCoeff} to the constant term" },
      { text: `\\(${innerCoeff}x - ${outerCoeff * innerConst} = ${distractorDRight}\\)`, isCorrect: false, reason: "incorrectly distributes ${outerCoeff} to the constant term" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `\\(${outerCoeff}(${innerCoeff}x - ${innerConst}) = ${rightSide}\\) Which equation has the same solution as the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `\\(${innerCoeff}x - ${innerConst} = ${simplifiedRight}\\)`,
      explanation: `Choice ${correctLetter} is correct. Dividing each side of the given equation by ${outerCoeff} yields \\( \\frac{${outerCoeff}(${innerCoeff}x - ${innerConst})}{${outerCoeff}} = \\frac{${rightSide}}{${outerCoeff}} \\), or \\( ${innerCoeff}x - ${innerConst} = ${simplifiedRight} \\). Therefore, the equation \\( ${innerCoeff}x - ${innerConst} = ${simplifiedRight} \\) is equivalent to the given equation and has the same solution. Choice ${incorrectOptions[0].letter} is incorrect. This equation is equivalent to \\( ${outerCoeff}(${innerCoeff}x - ${innerConst}) = ${distractorBRight} \\), not \\( ${outerCoeff}(${innerCoeff}x - ${innerConst}) = ${rightSide} \\). Choice ${incorrectOptions[1].letter} is incorrect. Distributing ${outerCoeff} on the left-hand side of the given equation yields ${outerCoeff * innerCoeff}x - ${outerCoeff * innerConst} = ${rightSide}, not ${innerCoeff}x - ${outerCoeff * innerConst} = ${rightSide}. Choice ${incorrectOptions[2].letter} is incorrect. Distributing ${outerCoeff} on the left-hand side of the given equation yields ${outerCoeff * innerCoeff}x - ${outerCoeff * innerConst} = ${rightSide}, not ${innerCoeff}x - ${outerCoeff * innerConst} = ${distractorDRight}.`
    };
  }
};

/**
* Question ID: 097e10f5
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 2-9, constants: 100-300, multiplier: 10-50]
* - Difficulty factors: [Two-step equation solving, larger numbers]
* - Distractor patterns: [B: subtraction error, C: added instead of subtracted, D: ignored left side]
* - Constraints: [Result must be positive integer]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
