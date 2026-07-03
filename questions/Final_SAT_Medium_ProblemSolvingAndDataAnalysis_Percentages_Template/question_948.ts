import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 948
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [bill in {30,40,50,60,80,100,120}, tip in {10,15,20}%, result: bill*tip/100]
 * - Difficulty factors: [Simple percentage calculation of a dollar amount]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [tip = bill * percent / 100, always a clean number]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */

export const generator_948 = {
  metadata: {
    id: "948",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values. Every bill/percent pair yields a clean
    // (integer or one-decimal) tip, so the typed answer never has float noise.
    const billAmounts = [30, 40, 50, 60, 80, 100, 120];
    const bill = billAmounts[getRandomInt(0, billAmounts.length - 1)];
    const tipPercent = getRandomInt(2, 4) * 5; // 10, 15, 20

    // STEP 2: Compute the tip. Rounding to cents is exact for these inputs.
    const tipAmount = Math.round(bill * tipPercent) / 100;

    // Fill-in answer: a plain number only (no units, no $, no %).
    const correctAnswer = tipAmount.toString();

    // STEP 3: Return question data. Currency is escaped as \$; percents in
    // prose are plain "%".
    return {
      questionText: `The amount of a customer's bill for a food order was \\$${bill}. The customer gave a tip of ${tipPercent}% of the amount of the bill. What is the amount, in dollars, of the tip the customer gave?`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. The bill was \\$${bill} and the customer left a tip of ${tipPercent}% of the bill. Computing ${tipPercent}% of ${bill} gives $\\frac{${tipPercent}}{100} \\times ${bill} = ${correctAnswer}$. Therefore, the amount of the tip, in dollars, is ${correctAnswer}.`
    };
  }
};
