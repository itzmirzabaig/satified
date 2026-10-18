import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 177
 *
 * ORIGINAL ANALYSIS: [Rug perimeter subtraction]
 * - Number ranges: [perimeter: 30-70, width: 5-15]
 * - Difficulty factors: [Solving for length given perimeter and width]
 * - Constraints: [Result must be integer]
 */

export const generator_177 = {
  metadata: {
    id: "177",
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
      questionText: `The equation $${perimeter} = 2x + 2y$ represents the perimeter, in feet, of a rectangular rug with length $x$ feet and width $y$ feet. If the width of the rug is ${w} feet, what is the length of the rug, in feet?`,
      figureCode: null,
      options: [],
      correctAnswer: l.toString(),
      explanation: `Substituting ${w} for $y$ in the given equation yields $${perimeter} = 2x + 2(${w})$, or $${perimeter} = 2x + ${2 * w}$. Subtracting ${2 * w} from both sides yields $${perimeter - 2 * w} = 2x$, and dividing both sides by 2 yields $x = ${l}$. Therefore, the length of the rug is ${l} feet.`
    };
  }
};
