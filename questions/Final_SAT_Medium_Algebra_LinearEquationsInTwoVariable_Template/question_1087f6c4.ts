import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1087f6c4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 24.5, 24.75, total: 641]
 * - Difficulty factors: [Interpreting coefficients as unit prices, subtraction]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Price difference should be small and positive]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1087f6c4 = {
  metadata: {
    // id: "1087f6c4",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate prices with small difference
    // Original: 24.5 and 24.75, difference = 0.25
    const basePrice = getRandomInt(20, 50);
    const diff = getRandomInt(1, 5) * 0.25; // 0.25, 0.5, 0.75, 1.0
    const price1 = basePrice + 0.5;
    const price2 = price1 + diff;
    const total = Math.round((price1 * getRandomInt(10, 20) + price2 * getRandomInt(10, 20)) * 100) / 100;
    
    return {
      questionText: `Isabel ordered topsoil and crushed stone, which cost a total of ${total}, for her garden. The given equation represents the relationship between the number of cubic yards of topsoil, $x$, and the number of tons of crushed stone, $y$, Isabel ordered. How much more, in dollars, did a ton of crushed stone cost Isabel than a cubic yard of topsoil?`,
      figureCode: null,
      options: null,
      correctAnswer: diff.toFixed(2),
      explanation: `The correct answer is ${diff.toFixed(2)}. It's given that the topsoil and crushed stone Isabel ordered for her garden cost a total of ${total}. It's also given that the equation ${price1.toFixed(2)} x+${price2.toFixed(2)} y=${total}$ represents the relationship between the number of cubic yards of topsoil, $x$, and the number of tons of crushed stone, $y$, that Isabel ordered. Since $x$ represents the number of cubic yards of topsoil ordered, $${price1.toFixed(2)} x$ represents the total cost, in dollars, of the topsoil, and the cost per cubic yard of topsoil is $${price1.toFixed(2)}. Similarly, since $y$ represents the number of tons of crushed stone ordered, $${price2.toFixed(2)} y$ represents the total cost, in dollars, of crushed stone ordered, and the cost per ton of crushed stone is $${price2.toFixed(2)}. Therefore, a ton of crushed stone cost Isabel $${price2.toFixed(2)}-${price1.toFixed(2)}$, or ${diff.toFixed(2)}, more dollars than a cubic yard of topsoil. Note that ${diff.toFixed(2)} and ${Math.round(diff * 4)}/4 are examples of ways to enter a correct answer.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-3c03cbd8.ts
/**
 * Question ID: 3c03cbd8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5 hectares, 24 hectares, 4529 trees]
 * - Difficulty factors: [Interpreting linear equation in context]
 * - Distractor patterns: [Confusing x with y, confusing total with average]
 * - Constraints: [Equation: 5x + 24y = 4529]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
