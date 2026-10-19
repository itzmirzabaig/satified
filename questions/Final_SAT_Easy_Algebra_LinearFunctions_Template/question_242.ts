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
    // Redraw until the target profit is positive; draws such as 4(40) - 250
    // used to ask for "a profit of -90".
    let profitPerPoster = 4, fixedCost = 180, numPosters = 40;
    do {
      profitPerPoster = getRandomInt(4, 7);
      fixedCost = getRandomInt(180, 250);
      numPosters = getRandomInt(40, 60);
    } while (profitPerPoster * numPosters - fixedCost < 20);

    const targetProfit = profitPerPoster * numPosters - fixedCost;

    return {
      questionText: `A student council group is selling school posters for a fundraiser. They use the function $p(x)=${profitPerPoster}x-${fixedCost}$ to determine their profit $p(x)$, in dollars, for selling $x$ school posters. In order to earn a profit of \\$${targetProfit}, how many school posters must they sell?`,
      figureCode: null,
      options: [],
      correctAnswer: numPosters.toString(),
      explanation: `The correct answer is ${numPosters}. Substituting ${targetProfit} for $p(x)$ in the given function yields $${targetProfit} = ${profitPerPoster}x - ${fixedCost}$. Adding ${fixedCost} to both sides of this equation yields $${targetProfit + fixedCost} = ${profitPerPoster}x$. Dividing both sides by ${profitPerPoster} yields $x = ${numPosters}$. Therefore, the group must sell ${numPosters} school posters to earn a profit of \\$${targetProfit}.`
    };
  }
};
