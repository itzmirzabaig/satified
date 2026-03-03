import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d693f563
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base plants: 35, increase: 60%, result: 56]
 * - Difficulty factors: [Percent increase calculation, adding increase to original]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must calculate increase then add to original, or use multiplier 1.6]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */

export const generator_d693f563 = {
  metadata: {
    // id: "d693f563",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 35 plants, 60% increase
    // Generate base value (25-50 range for reasonable mental math)
    const baseAmount = getRandomInt(25, 50);
    // Generate percent increase (ends in 0 or 5, 20-80%)
    const percentIncrease = getRandomInt(2, 8) * 10 + getRandomInt(0, 1) * 5;
    
    // STEP 2: Calculate result
    // Method: base + (base * percent/100) or base * (1 + percent/100)
    const increaseAmount = Math.round((baseAmount * percentIncrease) / 100);
    const finalAmount = baseAmount + increaseAmount;
    
    const correctAnswer = finalAmount.toString();
    
    // STEP 3: Return question data
    return {
      questionText: `Last year, Cedric had ${baseAmount} plants in his garden. This year, the number of plants in Cedric's garden is ${percentIncrease}% greater than the number of plants in his garden last year. How many plants does Cedric have in his garden this year?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. It's given that Cedric had ${baseAmount} plants in his garden last year and that the number of plants in Cedric's garden this year is ${percentIncrease}% greater than the number of plants in his garden last year. It follows that the number of plants in Cedric's garden this year is ${baseAmount} plus ${percentIncrease}% of ${baseAmount}, which is equal to \\( ${baseAmount}+${baseAmount}\\left(\\frac{${percentIncrease}}{100}\\right) \\), or \\( ${baseAmount}+${baseAmount}(${percentIncrease/100}) \\). This expression is equivalent to \\( ${baseAmount}+${increaseAmount} \\), or ${correctAnswer}.`
    };
  }
};
/**
 * Question ID: 7cab9fe1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 43%, variable: w]
 * - Difficulty factors: [Algebraic expression with percent increase, converting to decimal multiplier]
 * - Distractor patterns: [B: decrease (1-0.43), C: multiply by 43 (forgot decimal), D: just the increase (0.43w)]
 * - Constraints: [Correct form is 1.43w = w + 0.43w]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
