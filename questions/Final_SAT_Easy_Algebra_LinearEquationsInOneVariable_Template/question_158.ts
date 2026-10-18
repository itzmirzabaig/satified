import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 158
*
* ORIGINAL ANALYSIS:
* - Number ranges: [fixedCost: 1-5, rate: 1.0-3.0, pounds: 2-8]
* - Difficulty factors: [Word problem, decimal arithmetic]
* - Distractor patterns: [B: subtraction, C: swapped values, D: wrong operations]
* - Constraints: [Decimal money values]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_158 = {
  metadata: {
    id: "158",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const fixedCost = getRandomInt(2, 5); // at least 2, so the swapped choices never show "1p"
    const rate = (getRandomInt(10, 30) / 10);
    const pounds = getRandomInt(2, 8);
    const total = fixedCost + rate * pounds;
    const rateStr = rate.toFixed(2);
    const totalStr = total.toFixed(2);

    const optionsData = [
      { text: `$${rateStr}p + ${fixedCost} = ${totalStr}$`, isCorrect: true, reason: '' },
      { text: `$${rateStr}p - ${fixedCost} = ${totalStr}$`, isCorrect: false, reason: `it subtracts the \\$${fixedCost} cost of the cereal instead of adding it` },
      { text: `$${rateStr} + ${fixedCost}p = ${totalStr}$`, isCorrect: false, reason: `it multiplies the number of pounds by the cost of the cereal, \\$${fixedCost}, instead of by the price per pound, \\$${rateStr}` },
      { text: `$${rateStr} - ${fixedCost}p = ${totalStr}$`, isCorrect: false, reason: `it multiplies the number of pounds by the cost of the cereal instead of by the price per pound, and it subtracts instead of adds` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A shopper purchased a box of cereal and some strawberries. They paid \\$${fixedCost} for the box of cereal and \\$${rateStr} per pound for the strawberries. If they paid a total of \\$${totalStr}, which equation can be used to find $p$, the number of pounds of strawberries?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${rateStr}p + ${fixedCost} = ${totalStr}$`,
      explanation: `Choice ${correctLetter} is correct. The strawberries cost \\$${rateStr} per pound, so $p$ pounds cost $${rateStr}p$ dollars. Adding the \\$${fixedCost} paid for the cereal gives the total amount paid, so $${rateStr}p + ${fixedCost} = ${totalStr}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
