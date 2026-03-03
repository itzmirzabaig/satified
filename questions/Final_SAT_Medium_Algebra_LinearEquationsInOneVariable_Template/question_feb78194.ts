import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: feb78194
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [revenue per unit: 14, expenses: 112, profit: 406]
 * - Difficulty factors: [Word problem, profit equation setup]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Profit = Revenue - Expenses, solve for quantity]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_feb78194 = {
  metadata: {
    // id: "feb78194",
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
      questionText: `A museum rents ${product} to visitors. The museum earns revenue of ${pricePerUnit} for each ${product.slice(0, -1)} rented for the day. On Wednesday, the museum earned ${profit} in profit from renting ${product} after paying daily expenses of ${expenses}. How many ${product} did the museum rent on Wednesday? (profit = total revenue – total expenses)`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. If $x$ represents the number of ${product} the museum rented on Wednesday, the total revenue is $${pricePerUnit}x$. Because profit = total revenue - total expenses, the equation $${profit}=${pricePerUnit}x-${expenses}$ represents this situation. Adding ${expenses} to both sides yields $${pricePerUnit}x=${profit + expenses}$. Dividing both sides by ${pricePerUnit} yields $x=${correctAnswer}$.`
    };
  }
};

/**
 * Question ID: ce6b52d8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 1, 4, constants: -10, 40]
 * - Difficulty factors: [Solving for expression 3t rather than t]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Target expression 3t appears naturally in solution]
 * - Question type: [Fill-in-the-blank]
 */