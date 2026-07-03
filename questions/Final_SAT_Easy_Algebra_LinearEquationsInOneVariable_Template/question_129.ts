import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 129
*
* ORIGINAL ANALYSIS:
* - Number ranges: [downPayment: 20-60, monthlyRate: 10-25, months: 3-12]
* - Difficulty factors: [Word problem, setting up linear equation]
* - Distractor patterns: [subtraction, swapped variable, swapped values]
* - Constraints: [Realistic money values; downPayment !== monthlyRate so the
*   swapped-value distractors can never duplicate the correct equation]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_129 = {
  metadata: {
    id: "129",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const monthlyRate = getRandomInt(10, 25);
    let downPayment = getRandomInt(20, 60);
    // Guard: if the two dollar amounts coincide, every "swapped" distractor
    // would collapse into another option. Bump keeps downPayment within range
    // (collision only possible for downPayment <= 25, so +5 stays <= 30).
    if (downPayment === monthlyRate) downPayment += 5;
    const months = getRandomInt(3, 12);
    const total = downPayment + monthlyRate * months;

    const optionsData = [
      { text: `$${monthlyRate}p - ${downPayment} = ${total}$`, isCorrect: false, reason: `it subtracts the \\$${downPayment} down payment from the cost of the monthly payments instead of adding it` },
      { text: `$${downPayment}p - ${monthlyRate} = ${total}$`, isCorrect: false, reason: `it swaps the two dollar amounts and also subtracts instead of adds` },
      { text: `$${monthlyRate}p + ${downPayment} = ${total}$`, isCorrect: true },
      { text: `$${downPayment}p + ${monthlyRate} = ${total}$`, isCorrect: false, reason: `it treats \\$${downPayment} as the monthly amount and \\$${monthlyRate} as the down payment` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A student paid a total of \\$${total} for a microscope by making a down payment of \\$${downPayment} and then $p$ monthly payments of \\$${monthlyRate} each. Which of the following equations represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${monthlyRate}p + ${downPayment} = ${total}$`,
      explanation: `The total cost equals the cost of the monthly payments plus the down payment. The monthly payments cost \\$${monthlyRate} each, so together they cost $${monthlyRate}p$ dollars, and the down payment adds \\$${downPayment}. Setting this sum equal to the total paid gives $${monthlyRate}p + ${downPayment} = ${total}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
