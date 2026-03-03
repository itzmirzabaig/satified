import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0d1dca87
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 3, x-value: 2-5, result: 15-30]
 * - Difficulty factors: [Standard form substitution]
 * - Constraints: [Integer answer]
 * - Question type: [Direct Solve→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_0d1dca87 = {
  metadata: {
    // id: "0d1dca87",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = getRandomInt(2, 5);
    const coef = getRandomInt(2, 5);
    const y = getRandomInt(15, 30);
    const total = coef * x + y;

    return {
      questionText: `If $(x,y)$ is the solution to the given system of equations, what is the value of $y$?$$\\begin{aligned} ${coef}x + y &= ${total} \\\\ x &= ${x} \\end{aligned}$$`,
      figureCode: null,
      options: null,
      correctAnswer: y.toString(),
      explanation: `Substitute $x = ${x}$ into the first equation: $${coef}(${x}) + y = ${total}$. This gives $${coef * x} + y = ${total}$, so $y = ${total} - ${coef * x} = ${y}$.`
    };
  }
};

/**
 * Question ID: ccc3ad6b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: -3 and -0.5, intercepts: 3 and -2]
 * - Difficulty factors: [Negative y-coordinate, finding intersection]
 * - Constraints: [Intersection at integer coordinates]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Lines with negative slopes]
 */