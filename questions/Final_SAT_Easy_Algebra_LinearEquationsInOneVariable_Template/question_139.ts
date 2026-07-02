import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 139
*
* ORIGINAL ANALYSIS:
* - Number ranges: [unitPrice: 2-8]
* - Difficulty factors: [Unit rate, variable expression]
* - Distractor patterns: [B: addition, C: division, D: inverse rate]
* - Constraints: [Simple proportional reasoning]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_139 = {
  metadata: {
    id: "139",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const unitPrice = getRandomInt(2, 8);
    const c = 'c';

    const optionsData = [
      { text: `$${unitPrice}c$`, isCorrect: true },
      { text: `$${unitPrice} + c$`, isCorrect: false, reason: "adds dollars and pounds" },
      { text: `$\\frac{${unitPrice}}{c}$`, isCorrect: false, reason: "divides instead of multiplying" },
      { text: `$\\frac{c}{${unitPrice}}$`, isCorrect: false, reason: "gives pounds per dollar instead of total cost" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `One pound of grapes costs ${unitPrice}. At this rate, how many dollars will ${c} pounds of grapes cost?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${unitPrice}c$`,
      explanation: `Total cost = unit price × quantity = ${unitPrice} × c = ${unitPrice}c. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
