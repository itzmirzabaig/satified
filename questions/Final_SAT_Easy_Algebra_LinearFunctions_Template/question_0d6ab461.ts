import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0d6ab461
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 400-800, weekly: 20-50, weeks: 3-6]
 * - Difficulty factors: [Linear growth model, word problem context]
 * - Distractor patterns: [subtraction error, one week calculation, random addition]
 * - Constraints: [None]
 * - Question type: [Word problem→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_0d6ab461 = {
  metadata: {
    // id: "0d6ab461",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialAmount = getRandomInt(400, 800);
    const weeklyDeposit = getRandomInt(20, 50);
    const numWeeks = getRandomInt(3, 6);
    const totalAmount = initialAmount + (weeklyDeposit * numWeeks);
    const distractor1 = initialAmount - (weeklyDeposit * numWeeks);
    const distractor2 = initialAmount + weeklyDeposit;
    const distractor3 = initialAmount + weeklyDeposit + numWeeks;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "results from subtracting the deposits instead of adding them" },
      { text: distractor2.toString(), isCorrect: false, reason: "results from calculating only one week of deposits" },
      { text: distractor3.toString(), isCorrect: false, reason: "results from adding the number of weeks instead of multiplying" },
      { text: totalAmount.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Gabriella deposits ${weeklyDeposit} in a savings account at the end of each week. At the beginning of the 1st week of a year there was ${initialAmount} in that savings account. How much money, in dollars, will be in the account at the end of the ${numWeeks}th week of that year?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: totalAmount.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The initial balance is ${initialAmount}. Over ${numWeeks} weeks, Gabriella deposits ${weeklyDeposit} × ${numWeeks} = ${weeklyDeposit * numWeeks}. The total is ${initialAmount} + ${weeklyDeposit * numWeeks} = ${totalAmount}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 520c8177
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 15-40, constant: 5-20]
 * - Difficulty factors: [Modeling linear relationship from word problem]
 * - Distractor patterns: [missing constant, added coefficients, swapped parameters]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */