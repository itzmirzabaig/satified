import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 1863e3be
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [k: 10-50]
 * - Difficulty factors: [Calculating y-intercept of a basic quadratic]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Quadratic in form y = x^2 + k]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1863e3be = {
  metadata: {
    // id: "1863e3be",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const k = getRandomInt(10, 50);

    return {
      questionText: `The $y$-intercept of the graph of $y=x^2+${k}$ in the xy-plane is $(0, y)$. What is the value of $y$?`,
      figureCode: null,
      options: null,
      correctAnswer: k.toString(),
      explanation: `The y-intercept is the point on the graph where $x=0$. Substituting 0 for $x$ in $y = x^2 + ${k}$ gives $y = 0^2 + ${k} = ${k}$.`
    };
  }
};

/**
 * Question ID: 9619520
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 20000-30000, rate: 0.8-0.9]
 * - Difficulty factors: [Reading values from a table for an exponential model]
 * - Distractor patterns: [Value at 1 year, value at 2 years, random vehicle value]
 * - Constraints: [Values follow exponential decay]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

