import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 179
 *
 * ORIGINAL ANALYSIS: [Party hats and cupcakes cost]
 * - Number ranges: [hatPrice: 2-5, cupPrice: 1-3, hats: 5-15]
 * - Constraints: [total must give integer cups]
 */

export const generator_179 = {
  metadata: {
    id: "179",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate random values
    const hatPrice = getRandomInt(2, 5);   // price per package of party hats
    const cupPrice = getRandomInt(2, 3);   // price per cupcake (not 1, which made the last step trivial)
    const hats = getRandomInt(5, 15);      // number of hat packages
    const cups = getRandomInt(20, 50);     // number of cupcakes

    // Calculate total to ensure clean integer
    const total = hatPrice * hats + cupPrice * cups;

    return {
      questionText: `A customer spent \\$${total} on party hats and cupcakes. The party hats cost \\$${hatPrice} per package, and the cupcakes cost \\$${cupPrice} each. If the customer bought ${hats} packages of party hats, how many cupcakes did the customer buy?`,
      figureCode: null,
      options: [],
      correctAnswer: cups.toString(),
      explanation: `The ${hats} packages of party hats cost $${hatPrice}(${hats}) = ${hatPrice * hats}$ dollars, which leaves $${total} - ${hatPrice * hats} = ${cupPrice * cups}$ dollars for cupcakes. Since each cupcake costs \\$${cupPrice}, the customer bought $\\frac{${cupPrice * cups}}{${cupPrice}} = ${cups}$ cupcakes.`
    };
  }
};
