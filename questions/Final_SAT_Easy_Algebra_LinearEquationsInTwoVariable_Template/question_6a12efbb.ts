import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 6a12efbb
 *
 * ORIGINAL ANALYSIS: [Rug perimeter subtraction]
 * - Number ranges: [perimeter: 30-70, width: 5-15]
 * - Difficulty factors: [Solving for length given perimeter and width]
 * - Constraints: [Result must be integer]
 */

export const generator_6a12efbb = {
  metadata: {
    // id: "6a12efbb",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize width (5-15)
    const w = getRandomInt(5, 15);
    // Randomize length (8-20)
    const l = getRandomInt(8, 20);
    // Calculate perimeter to ensure clean numbers
    const perimeter = 2 * (l + w);

    return {
      questionText: `$${perimeter} = 2x + 2y$ gives the perimeter for length $x$ and width $y$. If the width is ${w}, what is the length?`,
      figureCode: null,
      options: null,
      correctAnswer: l.toString(),
      explanation: `Substitute $y=${w}$ into the equation: $${perimeter} = 2x + 2(${w}) = 2x + ${2*w}$. Solving: $2x = ${perimeter - 2*w}$, so $x = ${l}$.`
    };
  }
};

/**
 * Question ID: 10c448d6
 *
 * ORIGINAL ANALYSIS: [Line with fractional slope]
 */
