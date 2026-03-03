import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ee7b1de1
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Optimization problem involving budget and quantity constraints.
 * Fixes:
 * - Escaped currency symbols (\$) to prevent LaTeX errors.
 * - Formatted budget with commas.
 */
export const generator_ee7b1de1 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES
    // ----------------------------------------------------------------------
    // Budget: $2000 - $3000
    const budget = getRandomInt(200, 300) * 10; 
    
    // Minimum quantity needed
    const minCandles = getRandomInt(15, 25) * 10; 

    // Prices
    // Small: $4.50 - $6.50
    const smallPrice = (getRandomInt(45, 65) / 10);
    // Large: $6.00 - $8.00 more than small
    const largePrice = smallPrice + getRandomInt(6, 8); 
    
    // ----------------------------------------------------------------------
    // 2. OPTIMIZATION LOGIC
    // ----------------------------------------------------------------------
    // Let s = small, L = large.
    // Constraints:
    // 1) s + L >= minCandles
    // 2) smallPrice*s + largePrice*L <= Budget
    //
    // To maximize L, we want to minimize s.
    // From (1), min s = minCandles - L.
    // Substitute into (2):
    // smallPrice*(minCandles - L) + largePrice*L <= Budget
    // smallPrice*minCandles - smallPrice*L + largePrice*L <= Budget
    // L(largePrice - smallPrice) <= Budget - (smallPrice * minCandles)
    
    const numerator = budget - (smallPrice * minCandles);
    const denominator = largePrice - smallPrice;
    
    // Calculate max L
    const maxLargeExact = numerator / denominator;
    
    // If numerator is negative, budget is too low for even all small candles (unlikely with these ranges but possible check)
    if (maxLargeExact < 0) {
        // Fallback or regeneration logic could go here, but ranges are safe.
        // For safety, clamp to 0.
        return generator_ee7b1de1.generate();
    }
    
    const maxLarge = Math.floor(maxLargeExact);

    // ----------------------------------------------------------------------
    // 3. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `A small business owner budgets \\$${budget.toLocaleString()} to purchase candles. The owner must purchase a minimum of ${minCandles} candles to maintain the discounted pricing. If the owner pays \\$${smallPrice.toFixed(2)} per candle to purchase small candles and \\$${largePrice.toFixed(2)} per candle to purchase large candles, what is the maximum number of large candles the owner can purchase to stay within the budget and maintain the discounted pricing?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: maxLarge.toString(),
      explanation: `
        The correct answer is ${maxLarge}.
        <br/><br/>
        Let $s$ be the number of small candles and $\\ell$ be the number of large candles.
        <br/>
        1. <b>Quantity Constraint:</b> $s + \\ell \\ge ${minCandles}$. To maximize $\\ell$, we assume the minimum total candles are purchased, so $s = ${minCandles} - \\ell$.
        <br/>
        2. <b>Budget Constraint:</b>
        $$ ${smallPrice.toFixed(2)}s + ${largePrice.toFixed(2)}\\ell \\le ${budget} $$
        <br/>
        Substitute $s = ${minCandles} - \\ell$:
        $$ ${smallPrice.toFixed(2)}(${minCandles} - \\ell) + ${largePrice.toFixed(2)}\\ell \\le ${budget} $$
        $$ ${(smallPrice * minCandles).toFixed(2)} - ${smallPrice.toFixed(2)}\\ell + ${largePrice.toFixed(2)}\\ell \\le ${budget} $$
        Combine $\\ell$ terms ($${largePrice.toFixed(2)} - ${smallPrice.toFixed(2)} = ${denominator.toFixed(2)}$):
        $$ ${(smallPrice * minCandles).toFixed(2)} + ${denominator.toFixed(2)}\\ell \\le ${budget} $$
        <br/>
        Subtract ${(smallPrice * minCandles).toFixed(2)} from \\$${budget}:
        $$ ${denominator.toFixed(2)}\\ell \\le ${(budget - (smallPrice * minCandles)).toFixed(2)} $$
        <br/>
        Divide by ${denominator.toFixed(2)}:
        $$ \\ell \\le ${maxLargeExact.toFixed(2)} $$
        <br/>
        The maximum whole number of large candles is ${maxLarge}.
      `
    };
  }
};