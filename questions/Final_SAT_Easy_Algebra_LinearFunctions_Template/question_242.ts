import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 242
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [profitPerPoster: 4-7, fixedCost: 180-250]
 * - Difficulty factors: [Solving linear equation for target]
 * - Constraints: [Ensure clean result]
 * - Question type: [Solve for x→Fill in blank]
 * - Figure generation: null
 */

export const generator_242 = {
  metadata: {
    id: "242",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const profitPerPoster = getRandomInt(4, 7);

    const fixedCost = getRandomInt(180, 250);

    const numPosters = getRandomInt(40, 60);

    const targetProfit = profitPerPoster * numPosters - fixedCost;

    return {
      questionText: `A student council group is selling school posters for a fundraiser. They use the function $p(x)=${profitPerPoster}x-${fixedCost}$ to determine their profit $p(x)$, in dollars, for selling $x$ school posters. In order to earn a profit of $${targetProfit}$, how many school posters must they sell?`,
      figureCode: null,
      options: [],
      correctAnswer: numPosters.toString(),
      explanation: `Setting $p(x) = ${targetProfit}$ gives ${targetProfit} = ${profitPerPoster}x - ${fixedCost}$. Adding ${fixedCost} to both sides: ${targetProfit + fixedCost} = ${profitPerPoster}x$. Dividing by ${profitPerPoster}: $x = ${numPosters}$.`
    };
  }
};
