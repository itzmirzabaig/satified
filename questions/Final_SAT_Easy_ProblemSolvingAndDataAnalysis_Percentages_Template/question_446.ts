import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 446
 * Percentages — find the tip amount as a percent of a restaurant bill.
 * FIXED:
 * - Currency now escaped as \$ everywhere (bare $ was pairing as MathJax
 *   delimiters -> odd $ count -> TEX_UNBALANCED). Math (\times, \frac) kept
 *   inside a single $...$ segment.
 * - Personal name replaced with a generic role ("a diner") + pronoun.
 * - 3 distractors from a percent pool (distinct amounts guaranteed: distinct
 *   integer percents differ by >= bill*1/100 >= 0.25, so no toFixed(2) tie).
 */

export const generator_446 = {
  metadata: {
    id: "446",
    assessment: "SAT",
    domain: "Problem Solving and Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },
  generate: (): QuestionData => {
    // 1. Setup reasonable numbers (bill $25-$65, tip 15%-25%)
    const bill = getRandomInt(25, 65);
    const tipPercent = getRandomInt(15, 25);
    const tipAmount = (bill * tipPercent) / 100;

    // 2. Three incorrect percentages -> four total options.
    //    Distinct integer percents on a fixed bill always yield distinct
    //    amounts (gap >= bill/100 >= 0.25), so no distractor can tie the
    //    correct amount or another distractor after .toFixed(2).
    const potentialDistractors = [10, 12, 15, 18, 20, 22, 25, 28, 30];
    const incorrectPercents = shuffle(
      potentialDistractors.filter(p => p !== tipPercent)
    ).slice(0, 3);

    // 3. Build option objects (text carries escaped currency).
    const optionsData = [
      {
        text: `\\$${tipAmount.toFixed(2)}`,
        isCorrect: true,
        percent: tipPercent
      },
      ...incorrectPercents.map(p => ({
        text: `\\$${((bill * p) / 100).toFixed(2)}`,
        isCorrect: false,
        percent: p
      }))
    ];

    // 4. Shuffle, then assign letters (letters only meaningful post-shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // 5. Return data.
    return {
      questionText: `A diner's total bill at a restaurant was \\$${bill.toFixed(2)}, including tax. If she left a tip of ${tipPercent}% of the total bill, what was the amount of the tip?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the amount of the tip, calculate ${tipPercent}% of \\$${bill.toFixed(2)}: $${bill.toFixed(2)} \\times \\frac{${tipPercent}}{100} = ${tipAmount.toFixed(2)}$, which is \\$${tipAmount.toFixed(2)}. Choice ${incorrectOptions[0].letter} is incorrect because it represents a tip of ${incorrectOptions[0].percent}%. Choice ${incorrectOptions[1].letter} is incorrect because it represents a tip of ${incorrectOptions[1].percent}%. Choice ${incorrectOptions[2].letter} is incorrect because it represents a tip of ${incorrectOptions[2].percent}%.`
    };
  }
};
