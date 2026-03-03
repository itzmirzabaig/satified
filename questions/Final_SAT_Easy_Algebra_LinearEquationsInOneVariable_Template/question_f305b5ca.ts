import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: f305b5ca
*
* ORIGINAL ANALYSIS:
* - Number ranges: [fixedCost: 1-5, rate: 1.0-3.0, pounds: 2-8]
* - Difficulty factors: [Word problem, decimal arithmetic]
* - Distractor patterns: [B: subtraction, C: swapped values, D: wrong operations]
* - Constraints: [Decimal money values]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_f305b5ca = {
  metadata: {
    // id: "f305b5ca",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const fixedCost = getRandomInt(1, 5);
    const rate = (getRandomInt(10, 30) / 10);
    const pounds = getRandomInt(2, 8);
    const total = fixedCost + rate * pounds;
    const rateStr = rate.toFixed(2);
    const totalStr = total.toFixed(2);

    const optionsData = [
      { text: `$${rateStr}p + ${fixedCost} = ${totalStr}$`, isCorrect: true },
      { text: `$${rateStr}p - ${fixedCost} = ${totalStr}$`, isCorrect: false, reason: "subtracts the fixed cost" },
      { text: `$${rateStr} + ${fixedCost}p = ${totalStr}$`, isCorrect: false, reason: "swaps the variable and constant" },
      { text: `$${rateStr} - ${fixedCost}p = ${totalStr}$`, isCorrect: false, reason: "uses wrong operations" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Lorenzo purchased a box of cereal and some strawberries. Lorenzo paid ${fixedCost} dollars for the box of cereal and ${rateStr} dollars per pound for the strawberries. If Lorenzo paid a total of ${totalStr} dollars, which equation can be used to find p, the number of pounds of strawberries?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${rateStr}p + ${fixedCost} = ${totalStr}$`,
      explanation: `Total = Cereal + (Rate × Pounds): ${fixedCost} + ${rateStr}p = ${totalStr}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 5c94e6fa
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, const1: 10-30]
* - Difficulty factors: [Infinitely many solutions concept]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [k must equal constant for infinite solutions]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/