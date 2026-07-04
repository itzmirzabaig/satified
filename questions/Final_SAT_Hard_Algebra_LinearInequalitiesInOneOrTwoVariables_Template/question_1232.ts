import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1232
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Optimization problem involving budget and quantity constraints.
 * Fixes:
 * - Escaped currency symbols (\$) to prevent LaTeX errors.
 * - Formatted budget with commas.
 */
export const generator_1232 = {
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

    // Prices held in integer CENTS so all optimization arithmetic is exact.
    // (Float dollars like 4.8 carry rounding error that made Math.floor drop
    //  the true integer optimum by one, e.g. 176.99999997 -> 176.)
    // Small: $4.50 - $6.50
    const smallCents = getRandomInt(45, 65) * 10;
    const smallPrice = smallCents / 100;
    // Large: $6 - $8 more than small
    const diffDollars = getRandomInt(6, 8);
    const largeCents = smallCents + diffDollars * 100;
    const largePrice = largeCents / 100;
    const budgetCents = budget * 100;
    
    // ----------------------------------------------------------------------
    // 2. OPTIMIZATION LOGIC
    // ----------------------------------------------------------------------
    // Let s = small, L = large. All three constraints must hold:
    //   (0) s >= 0            (cannot buy a negative number of small candles)
    //   (1) s + L >= minCandles
    //   (2) smallPrice*s + largePrice*L <= budget
    //
    // To maximize L we minimize s. The smallest feasible s is
    //   s = max(0, minCandles - L),
    // so there are two regimes:
    //
    //   Case A: L >= minCandles. The quantity minimum is already met with
    //   s = 0, and the budget alone caps L:  largePrice*L <= budget
    //     => L <= floor(budget / largePrice).
    //   This L is valid only if that cap is itself >= minCandles.
    //
    //   Case B: L < minCandles. The quantity minimum forces s = minCandles - L
    //   (>= 0), so substituting into (2):
    //     smallPrice*(minCandles - L) + largePrice*L <= budget
    //     L*(largePrice - smallPrice) <= budget - smallPrice*minCandles
    //     => L <= (budget - smallPrice*minCandles) / (largePrice - smallPrice).
    //
    // The true maximum is the larger feasible L over the two cases.
    const denominator = diffDollars; // largePrice - smallPrice, exact integer

    // Case A cap (buy 0 small candles; budget-limited). Integer-cents division.
    const budgetOnlyCap = Math.floor(budgetCents / largeCents);
    const caseA = budgetOnlyCap >= minCandles ? budgetOnlyCap : -1;

    // Case B cap (quantity minimum forces some small candles). All in cents.
    const caseBNumerCents = budgetCents - smallCents * minCandles;
    const caseBDenomCents = largeCents - smallCents; // = diffDollars * 100, exact
    const caseBExact = caseBDenomCents > 0 ? caseBNumerCents / caseBDenomCents : 0;
    // In this regime L must stay below minCandles (L = minCandles is Case A).
    const caseB = caseBNumerCents >= 0
      ? Math.min(Math.floor(caseBNumerCents / caseBDenomCents), minCandles - 1)
      : -1;

    const maxLarge = Math.max(caseA, caseB);

    // Safety: the ranges above always admit a feasible plan, but guard anyway.
    if (maxLarge < 0) {
      return generator_1232.generate();
    }

    // Which regime produced the answer (drives the explanation wording).
    const usedCaseA = maxLarge >= minCandles;

    // ----------------------------------------------------------------------
    // 3. RETURN DATA
    // ----------------------------------------------------------------------
    // Values used in the explanation text.
    const budgetOnlyExact = budgetCents / largeCents;
    const smallForAnswer = Math.max(0, minCandles - maxLarge); // s at the optimum
    const costAtAnswer = (smallCents * smallForAnswer + largeCents * maxLarge) / 100;

    const explanation = usedCaseA
      ? `
        The correct answer is ${maxLarge}.
        <br/><br/>
        Let $s$ be the number of small candles and $\\ell$ be the number of large candles. Every plan must satisfy three conditions: $s \\ge 0$, the quantity minimum $s + \\ell \\ge ${minCandles}$, and the budget $${smallPrice.toFixed(2)}s + ${largePrice.toFixed(2)}\\ell \\le ${budget.toLocaleString()}$.
        <br/><br/>
        To buy as many large candles as possible, buy no small candles, so let $s = 0$. The quantity condition then reads $\\ell \\ge ${minCandles}$, and the budget condition becomes:
        $$ ${largePrice.toFixed(2)}\\ell \\le ${budget.toLocaleString()} $$
        <br/>
        Divide by ${largePrice.toFixed(2)}:
        $$ \\ell \\le ${budgetOnlyExact.toFixed(2)} $$
        <br/>
        The greatest whole number satisfying this is ${maxLarge}. Since $${maxLarge} \\ge ${minCandles}$, the quantity minimum is already met with $s = 0$. The cost is then \\$${largePrice.toFixed(2)} times ${maxLarge}, or \\$${costAtAnswer.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}, which stays within the \\$${budget.toLocaleString()} budget.
        <br/><br/>
        The maximum number of large candles is ${maxLarge}.
      `
      : `
        The correct answer is ${maxLarge}.
        <br/><br/>
        Let $s$ be the number of small candles and $\\ell$ be the number of large candles. Every plan must satisfy three conditions: $s \\ge 0$, the quantity minimum $s + \\ell \\ge ${minCandles}$, and the budget $${smallPrice.toFixed(2)}s + ${largePrice.toFixed(2)}\\ell \\le ${budget.toLocaleString()}$.
        <br/><br/>
        Buying only large candles cannot reach the ${minCandles}-candle minimum within budget, so the quantity condition is met exactly: $s + \\ell = ${minCandles}$, giving $s = ${minCandles} - \\ell$. Substitute this into the budget condition:
        $$ ${smallPrice.toFixed(2)}(${minCandles} - \\ell) + ${largePrice.toFixed(2)}\\ell \\le ${budget.toLocaleString()} $$
        $$ ${(smallPrice * minCandles).toFixed(2)} - ${smallPrice.toFixed(2)}\\ell + ${largePrice.toFixed(2)}\\ell \\le ${budget.toLocaleString()} $$
        Combine the $\\ell$ terms ($${largePrice.toFixed(2)} - ${smallPrice.toFixed(2)} = ${denominator.toFixed(2)}$):
        $$ ${(smallPrice * minCandles).toFixed(2)} + ${denominator.toFixed(2)}\\ell \\le ${budget.toLocaleString()} $$
        <br/>
        Subtract ${(smallPrice * minCandles).toFixed(2)} from both sides:
        $$ ${denominator.toFixed(2)}\\ell \\le ${(budget - (smallPrice * minCandles)).toFixed(2)} $$
        <br/>
        Divide by ${denominator.toFixed(2)}:
        $$ \\ell \\le ${caseBExact.toFixed(2)} $$
        <br/>
        The greatest whole number satisfying this is ${maxLarge}. This uses $s = ${minCandles} - ${maxLarge} = ${smallForAnswer}$ small candles, for a total cost of \\$${costAtAnswer.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}, within the \\$${budget.toLocaleString()} budget.
        <br/><br/>
        The maximum number of large candles is ${maxLarge}.
      `;

    return {
      questionText: `A small business owner budgets \\$${budget.toLocaleString()} to purchase candles. The owner must purchase a minimum of ${minCandles} candles to maintain the discounted pricing. If the owner pays \\$${smallPrice.toFixed(2)} per candle to purchase small candles and \\$${largePrice.toFixed(2)} per candle to purchase large candles, what is the maximum number of large candles the owner can purchase to stay within the budget and maintain the discounted pricing?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: maxLarge.toString(),
      explanation
    };
  }
};