import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 685
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 24.5, 24.75, total: 641]
 * - Difficulty factors: [Interpreting coefficients as unit prices, subtraction]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Price difference should be small and positive]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 *
 * The linear equation (price1) x + (price2) y = total is given; the coefficients
 * are the unit prices, so the answer is price2 - price1 = diff, a clean multiple
 * of 0.25. Currency is written as \$ throughout; the equation and variables live
 * in proper math spans. Generic role ("a landscaper") replaces the personal name.
 */

export const generator_685 = {
  metadata: {
    id: "685",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Prices as exact 2-decimal money values with a small positive gap.
    // diff is a clean multiple of 0.25 (the answer). quarters counts the 0.25s.
    const basePrice = getRandomInt(20, 50);
    const quarters = getRandomInt(1, 5);           // 1..5
    const diff = quarters * 0.25;                  // 0.25, 0.50, 0.75, 1.00, 1.25
    const price1 = basePrice + 0.5;                // e.g. 24.50 (topsoil, per cubic yard)
    const price2 = price1 + diff;                  // e.g. 24.75 (crushed stone, per ton)
    const qty1 = getRandomInt(10, 20);
    const qty2 = getRandomInt(10, 20);
    // total is a given dollar amount consistent with these unit prices; it is
    // cosmetic (the answer depends only on the coefficients). Round to cents.
    const total = Math.round((price1 * qty1 + price2 * qty2) * 100) / 100;

    // Currency helper: always render money with a literal, escaped dollar sign.
    const money = (v: number): string => `\\$${v.toFixed(2)}`;

    // Reduced fraction form of diff for the "ways to enter" note.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(quarters, 4);
    const fracNum = quarters / g;
    const fracDen = 4 / g;
    const decStr = String(diff);                   // clean: "0.25","0.5","0.75","1","1.25"
    const fracStr = fracDen === 1 ? `${fracNum}` : `${fracNum}/${fracDen}`;

    return {
      questionText: `A landscaper ordered topsoil and crushed stone, which cost a total of ${money(total)}, for a garden. The equation $${price1.toFixed(2)}x+${price2.toFixed(2)}y=${total.toFixed(2)}$ represents the relationship between the number of cubic yards of topsoil, $x$, and the number of tons of crushed stone, $y$, that the landscaper ordered. How much more, in dollars, did a ton of crushed stone cost than a cubic yard of topsoil? (Enter your answer as a decimal or fraction.)`,
      figureCode: null,
      options: [],
      correctAnswer: decStr,
      explanation: `The correct answer is ${decStr}. The equation $${price1.toFixed(2)}x+${price2.toFixed(2)}y=${total.toFixed(2)}$ models the total cost, where $x$ is the number of cubic yards of topsoil and $y$ is the number of tons of crushed stone. Because $${price1.toFixed(2)}x$ is the total cost of the topsoil, the cost of one cubic yard of topsoil is ${money(price1)}. Likewise, because $${price2.toFixed(2)}y$ is the total cost of the crushed stone, the cost of one ton of crushed stone is ${money(price2)}. So a ton of crushed stone cost ${money(price2)} $-$ ${money(price1)} $=$ ${money(diff)} more than a cubic yard of topsoil. Both ${decStr} and ${fracStr} are accepted ways to enter this answer.`
    };
  }
};
