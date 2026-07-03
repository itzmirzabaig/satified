import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 270
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [baseCost: 10-20, perGame: 3-6]
 * - Difficulty factors: [Solving linear equation]
 * - Constraints: [None]
 * - Question type: [Solve for x→Fill in blank]
 * - Figure generation: null
 */

export const generator_270 = {
  metadata: {
    id: "270",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const baseCost = getRandomInt(10, 20);

    const perGame = getRandomInt(3, 6);

    const numGames = getRandomInt(10, 15);

    const targetCost = baseCost + perGame * numGames;

    return {
      questionText: `The function $f$ represents the total cost, in dollars, of attending an arcade when $x$ games are played. The function is $f(x) = ${baseCost} + ${perGame}x$. How many games can be played for a total cost of $${targetCost}$?`,
      figureCode: null,
      options: [],
      correctAnswer: numGames.toString(),
      explanation: `Setting $f(x) = ${targetCost}$ gives ${targetCost} = ${baseCost} + ${perGame}x$. Subtracting ${baseCost} from both sides: ${targetCost - baseCost} = ${perGame}x$. Dividing by ${perGame}: $x = ${numGames}$.`
    };
  }
};
