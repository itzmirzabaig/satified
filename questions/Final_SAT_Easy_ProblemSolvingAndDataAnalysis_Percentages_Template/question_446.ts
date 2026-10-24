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

    // 2. Wrong choices are real slips: the bill plus the tip, the bill minus
    //    the tip, and the percent written with the decimal point one place
    //    too far right. They used to be tips at other percents, which appear
    //    nowhere in the question.
    const m = (x: number) => `\\$${x.toFixed(2)}`;
    const total = bill + tipAmount;
    const less = bill - tipAmount;
    const big = (bill * tipPercent) / 10;
    const optionsData = [
      { text: m(tipAmount), isCorrect: true, reason: '' },
      { text: m(total), isCorrect: false, reason: `${m(total)} is the total amount the diner paid, the bill plus the tip` },
      { text: m(less), isCorrect: false, reason: `${m(less)} results from subtracting the tip from the bill` },
      { text: m(big), isCorrect: false, reason: `${m(big)} results from writing ${tipPercent}% as ${tipPercent / 10} instead of ${(tipPercent / 100).toFixed(2)}` }
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
      explanation: `Choice ${correctOption.letter} is correct. The tip is ${tipPercent}% of \\$${bill.toFixed(2)}: $${bill.toFixed(2)} \\times ${(tipPercent / 100).toFixed(2)} = ${tipAmount.toFixed(2)}$, so the tip was ${m(tipAmount)}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
