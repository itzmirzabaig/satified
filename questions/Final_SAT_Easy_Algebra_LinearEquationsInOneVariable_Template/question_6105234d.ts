import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 6105234d
*
* ORIGINAL ANALYSIS:
* - Number ranges: [downPayment: 20-60, monthlyRate: 10-25, months: 3-12]
* - Difficulty factors: [Word problem, setting up linear equation]
* - Distractor patterns: [A: subtraction, B: swapped variable, D: swapped values]
* - Constraints: [Realistic money values]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_6105234d = {
  metadata: {
    // id: "6105234d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const downPayment = getRandomInt(20, 60);
    const monthlyRate = getRandomInt(10, 25);
    const months = getRandomInt(3, 12);
    const total = downPayment + monthlyRate * months;

    const optionsData = [
      { text: `$${monthlyRate}p - ${downPayment} = ${total}$`, isCorrect: false, reason: "suggests the down payment is subtracted" },
      { text: `$${downPayment}p - ${monthlyRate} = ${total}$`, isCorrect: false, reason: "swaps the variable and values incorrectly" },
      { text: `$${monthlyRate}p + ${downPayment} = ${total}$`, isCorrect: true },
      { text: `$${downPayment}p + ${monthlyRate} = ${total}$`, isCorrect: false, reason: `implies the monthly payment is ${downPayment} and down payment is ${monthlyRate}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `John paid a total of \\$${total} for a microscope by making a down payment of \\$${downPayment} plus $p$ monthly payments of \\$${monthlyRate} each. Which of the following equations represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${monthlyRate}p + ${downPayment} = ${total}$`,
      explanation: `The total cost is the down payment plus monthly payments: \\$${downPayment} + \\$${monthlyRate}p = \\$${total}, or $${monthlyRate}p + ${downPayment} = ${total}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

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