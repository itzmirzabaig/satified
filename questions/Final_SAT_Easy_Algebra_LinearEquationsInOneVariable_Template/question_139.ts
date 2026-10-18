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

    const optionsData = [
      { text: `$${unitPrice}c$`, isCorrect: true, reason: '' },
      { text: `$${unitPrice} + c$`, isCorrect: false, reason: `it adds the price per pound and the number of pounds instead of multiplying them` },
      { text: `$\\frac{${unitPrice}}{c}$`, isCorrect: false, reason: `it divides the price per pound by the number of pounds instead of multiplying them` },
      { text: `$\\frac{c}{${unitPrice}}$`, isCorrect: false, reason: `it divides the number of pounds by the price per pound instead of multiplying them` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `One pound of grapes costs \\$${unitPrice}. At this rate, how many dollars will $c$ pounds of grapes cost?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${unitPrice}c$`,
      explanation: `Choice ${correctLetter} is correct. Each pound of grapes costs ${unitPrice} dollars, so $c$ pounds of grapes cost $${unitPrice}$ times $c$, or $${unitPrice}c$, dollars. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
