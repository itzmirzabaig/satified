import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7038b587
 *
 * ORIGINAL ANALYSIS: [Party hats and cupcakes cost]
 * - Number ranges: [hatPrice: 2-5, cupPrice: 1-3, hats: 5-15]
 * - Constraints: [total must give integer cups]
 */

export const generator_7038b587 = {
  metadata: {
    // id: "7038b587",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate random values
    const hatPrice = getRandomInt(2, 5);   // price per package of hats
    const cupPrice = getRandomInt(1, 3);   // price per cupcake
    const hats = getRandomInt(5, 15);      // number of hat packages
    const cups = getRandomInt(20, 50);     // number of cupcakes
    
    // Calculate total to ensure clean integer
    const total = hatPrice * hats + cupPrice * cups;

    return {
      questionText: `Vivian spent ${total} dollars on hats (${hatPrice} dollars per package) and cupcakes (${cupPrice} dollars each). If she bought ${hats} packages of hats, how many cupcakes?`,
      figureCode: null,
      options: null,
      correctAnswer: cups.toString(),
      explanation: `Hats cost ${hatPrice} × ${hats} = ${hatPrice * hats} dollars. Remaining for cupcakes: ${total} - ${hatPrice * hats} = ${cupPrice * cups} dollars. Since each cupcake is ${cupPrice} dollars, she bought ${cupPrice * cups} / ${cupPrice} = ${cups} cupcakes.`
    };
  }
};

/**
 * Question ID: 4acd05cd
 *
 * ORIGINAL ANALYSIS: [Table matching Mafs graph]
 */