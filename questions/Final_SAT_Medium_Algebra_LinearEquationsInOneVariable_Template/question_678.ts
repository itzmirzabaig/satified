import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 678
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [revenue per unit: 14, expenses: 112, profit: 406]
 * - Difficulty factors: [Word problem, profit equation setup]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Profit = Revenue - Expenses, solve for quantity]
 * - Question type: [Fill-in-the-blank]
 *
 * FIXED (missing dollar signs on money values in the stem): the three
 * monetary amounts (revenue per unit, profit, daily expenses) appeared as
 * bare numbers. They are now escaped currency (`\\$` in source), the house
 * convention used throughout the bank. The explanation already had its
 * dollar-sign math and is unchanged. No question logic changed.
 */

export const generator_678 = {
  metadata: {
    id: "678",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    const pricePerUnit = getRandomInt(8, 20);
    const expenses = getRandomInt(50, 150) * 2; // Even number
    const quantity = getRandomInt(15, 50);
    const profit = pricePerUnit * quantity - expenses;
    
    const correctAnswer = quantity.toString();
    
    // Random product
    const products = ["tablets", "audio guides", "headphones", "chargers"];
    const product = getRandomElement(products);
    
    return {
      questionText: `A museum rents ${product} to visitors. The museum earns revenue of \\$${pricePerUnit} for each ${product.slice(0, -1)} rented for the day. On Wednesday, the museum earned \\$${profit} in profit from renting ${product} after paying daily expenses of \\$${expenses}. How many ${product} did the museum rent on Wednesday? (profit = total revenue – total expenses)`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. If $x$ represents the number of ${product} the museum rented on Wednesday, the total revenue is $${pricePerUnit}x$. Because profit = total revenue - total expenses, the equation $${profit}=${pricePerUnit}x-${expenses}$ represents this situation. Adding ${expenses} to both sides yields $${pricePerUnit}x=${profit + expenses}$. Dividing both sides by ${pricePerUnit} yields $x=${correctAnswer}$.`
    };
  }
};