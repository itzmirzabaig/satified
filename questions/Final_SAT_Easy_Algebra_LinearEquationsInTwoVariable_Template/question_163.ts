import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 163
 *
 * ORIGINAL ANALYSIS: [Parallelogram perimeter substitution]
 * - Number ranges: [perimeter: 30-80, side a: 5-15]
 * - Difficulty factors: [Solving for unknown side given perimeter]
 * - Constraints: [Perimeter must be even for integer result]
 */

export const generator_163 = {
  metadata: {
    id: "163",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize perimeter (30-80, must be even for clean division)
    const perimeter = getRandomInt(15, 40) * 2;
    // Randomize side a (5-15, but must be less than half perimeter)
    const maxA = Math.floor(perimeter / 4);
    const a = getRandomInt(5, Math.max(6, maxA));
    const b = (perimeter - 2 * a) / 2;

    return {
      questionText: `The equation $${perimeter} = 2a + 2b$ represents the perimeter, in centimeters, of a parallelogram with adjacent sides of length $a$ centimeters and $b$ centimeters. If $a = ${a}$, what is the value of $b$?`,
      figureCode: null,
      options: [],
      correctAnswer: b.toString(),
      explanation: `Substituting ${a} for $a$ in the given equation yields $${perimeter} = 2(${a}) + 2b$, or $${perimeter} = ${2 * a} + 2b$. Subtracting ${2 * a} from both sides yields $${perimeter - 2 * a} = 2b$, and dividing both sides by 2 yields $b = ${b}$.`
    };
  }
};
