import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c256b723
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [bill: $50, tip: 20%, result: $10]
 * - Difficulty factors: [Simple percentage calculation of a dollar amount]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [tip = bill * percent / 100]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */

export const generator_c256b723 = {
  metadata: {
    // id: "c256b723",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: $50 bill, 20% tip → $10
    // Generate bill amounts that work with percentage for clean integer answers
    const billAmounts = [30, 40, 50, 60, 80, 100, 120];
    const bill = billAmounts[getRandomInt(0, billAmounts.length - 1)];
    const tipPercent = getRandomInt(2, 4) * 5; // 10, 15, 20
    
    // STEP 2: Calculate answer
    const tipAmount = (bill * tipPercent) / 100;
    
    const correctAnswer = tipAmount.toString();
    
    // STEP 3: Return question data
    return {
      questionText: `The amount of Hanna's bill for a food order was $${bill}. Hanna gave a tip of ${tipPercent}% of the amount of the bill. What is the amount, in dollars, of the tip Hanna gave?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. It's given that the amount of Hanna's food order was $${bill} and that Hanna gave a tip of ${tipPercent}% of the amount of the bill. ${tipPercent}% of ${bill} can be calculated as (${tipPercent}/100)(${bill}), which yields ${bill * tipPercent}/100, or ${correctAnswer}. Therefore, the amount, in dollars, of the tip Hanna gave is ${correctAnswer}.`
    };
  }
};
/**
 * Question ID: 7f84b136
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Group A: 375, Group C: 690, result: 184%]
 * - Difficulty factors: [Finding what percent one number is of another, large numbers]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [p = (C / A) * 100]
 * - Question type: [Text with Table→Fill-in-the-blank]
 * - Figure generation: [HTML Table]
 */
