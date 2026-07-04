import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 949
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base plants: 35, increase: 60%, result: 56]
 * - Difficulty factors: [Percent increase calculation, adding increase to original]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must calculate increase then add to original, or use multiplier 1.6]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */

export const generator_949 = {
  metadata: {
    id: "949",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // Original: 35 plants, 60% increase.
    // The question asks for an exact plant COUNT, so the increase
    // (base * percent/100) must itself be a whole number — otherwise the
    // total is not an integer and the "equivalent to base + increase" step in
    // the explanation would be false. Restrict to (base, percent) pairs where
    // base * percent is divisible by 100, giving an exact integer increase.
    const percentChoices: number[] = [];
    for (let k = 2; k <= 8; k++) {
      percentChoices.push(k * 10);     // 20, 30, ..., 80
      percentChoices.push(k * 10 + 5); // 25, 35, ..., 85
    }
    const pairs: Array<{ base: number; pct: number }> = [];
    for (let base = 25; base <= 50; base++) {
      for (const pct of percentChoices) {
        if ((base * pct) % 100 === 0) pairs.push({ base, pct });
      }
    }
    const { base: baseAmount, pct: percentIncrease } = getRandomElement(pairs);

    // STEP 2: Calculate result. increaseAmount is an exact integer here.
    const increaseAmount = (baseAmount * percentIncrease) / 100;
    const finalAmount = baseAmount + increaseAmount;

    const correctAnswer = finalAmount.toString();

    // Decimal form of the percent for the explanation (e.g. 0.6, 0.25).
    const decimal = (percentIncrease / 100).toString();

    // STEP 3: Return question data. Generic role ("a gardener") introduced once,
    // consistent "she"/"her" pronouns thereafter — no personal names.
    return {
      questionText: `Last year, a gardener had ${baseAmount} plants in her garden. This year, the number of plants in her garden is ${percentIncrease}% greater than the number of plants in her garden last year. How many plants does the gardener have in her garden this year?`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. It's given that the gardener had ${baseAmount} plants last year and that the number of plants this year is ${percentIncrease}% greater than the number last year. It follows that the number of plants this year is ${baseAmount} plus ${percentIncrease}% of ${baseAmount}, which is equal to \\( ${baseAmount}+${baseAmount}\\left(\\frac{${percentIncrease}}{100}\\right) \\), or \\( ${baseAmount}+${baseAmount}(${decimal}) \\). This expression is equivalent to \\( ${baseAmount}+${increaseAmount} \\), or ${correctAnswer}.`
    };
  }
};
