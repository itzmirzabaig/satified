import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 147
*
* ORIGINAL ANALYSIS:
* - Number ranges: [outerCoeff: 2-9, innerCoeff: 2-5, innerConst: 2-8]
* - Difficulty factors: [Dividing equation by coefficient, equivalent equations]
* - Distractor patterns: [multiplied the right side instead of dividing,
*   distributed to the constant only, distributed to the x term only]
* - Constraints: [Result must be clean integer division]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*
* FIX NOTES:
* The explanation listed three fixed reasons in a fixed order while the
* letters came from the shuffled choices, so reasons landed on the wrong
* choices. The first reason also had the wrong math (2x - 8 = 8 is equivalent
* to 2(2x - 8) = 16, not 8), and one distractor added the coefficient to the
* right side, which no real error produces. Each reason now lives on its option.
*/

export const generator_147 = {
  metadata: {
    id: "147",
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

    const o = outerCoeff, i = innerCoeff, c = innerConst, R = rightSide;
    const distributed = `$${o * i}x - ${o * c} = ${R}$`;

    // Each reason is attached to its own option, so it stays with the right
    // letter after shuffling.
    const optionsData = [
      { text: `$${i}x - ${c} = ${simplifiedRight}$`, isCorrect: true, reason: '' },
      { text: `$${i}x - ${c} = ${R * o}$`, isCorrect: false, reason: `it results from multiplying the right side by ${o} instead of dividing it by ${o}; multiplying both sides of this equation by ${o} gives $${o}(${i}x - ${c}) = ${R * o * o}$, not $${o}(${i}x - ${c}) = ${R}$` },
      { text: `$${i}x - ${o * c} = ${R}$`, isCorrect: false, reason: `it results from multiplying only the constant term, ${c}, by ${o}; distributing ${o} to both terms yields ${distributed}` },
      { text: `$${o * i}x - ${c} = ${R}$`, isCorrect: false, reason: `it results from multiplying only the $x$ term by ${o}; distributing ${o} to both terms yields ${distributed}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(opt => opt.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `$$${o}(${i}x - ${c}) = ${R}$$ Which equation has the same solution as the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `$${i}x - ${c} = ${simplifiedRight}$`,
      explanation: `Choice ${correctLetter} is correct. Dividing each side of the given equation by ${o} yields $\\frac{${o}(${i}x - ${c})}{${o}} = \\frac{${R}}{${o}}$, or $${i}x - ${c} = ${simplifiedRight}$. Therefore, this equation is equivalent to the given equation and has the same solution. ${incorrectOptions.map(opt => `Choice ${opt.letter} is incorrect because ${opt.reason}.`).join(' ')}`
    };
  }
};
