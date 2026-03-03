import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4b06557b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 2 and -2, intercepts: -7 and 9]
 * - Difficulty factors: [Reading x-coordinate from graph intersection]
 * - Constraints: [Intersection at integer x-coordinate]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Two lines with opposite slopes]
 */

export const generator_4b06557b = {
  metadata: {
    // id: "4b06557b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m1 = getRandomInt(2, 4);
    const m2 = -m1;
    const xIntersect = getRandomInt(3, 6);
    const yIntersect = getRandomInt(1, 5);
    const b1 = yIntersect - m1 * xIntersect;
    const b2 = yIntersect - m2 * xIntersect;

    const mafsCode = `
      <Coordinates.Cartesian />
      <Plot.OfX y={(x) => ${m1} * x + ${b1}} color="#1a7cff" />
      <Plot.OfX y={(x) => ${m2} * x + ${b2}} color="#ff2a7a" />
    `;

    return {
      questionText: `The graph of a system of linear equations is shown. The solution to the system is $(x,y)$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: xIntersect.toString(),
      explanation: `The solution is the intersection point. The lines intersect where $${m1}x ${b1 >= 0 ? '+' : '-'}${Math.abs(b1)} = ${m2}x + ${b2}$. Solving: $${m1 - m2}x = ${b2 - b1}$, so $x = ${xIntersect}$.`
    };
  }
};

/**
 * Question ID: f6b055dc
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 1 and -1, intercept: 0 and 4]
 * - Difficulty factors: [Symmetric lines, finding intersection]
 * - Constraints: [Intersection at integer coordinates]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Perpendicular diagonal lines]
 */