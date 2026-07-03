import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 749
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [j(x) = mx + b, j(x1) given, find j(x2)]
 * - Difficulty factors: [Two-step: find m from a point, evaluate at new point]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [m must be a negative integer; b positive intercept]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_749 = {
  metadata: {
    id: "749",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (answer-first, so m is always an integer)
    // Negative integer slope.
    const m = getRandomInt(-15, -3);
    // First point x-value.
    const x1 = getRandomInt(10, 15);
    // Small positive value of j at x1.
    const j1 = getRandomInt(5, 40);
    // Derive the intercept so everything is an integer and b > 0.
    // j1 = m*x1 + b  ->  b = j1 - m*x1  (positive since m < 0)
    const b = j1 - m * x1;

    // Second x-value: strictly less than x1, so j2 > j1 (m is negative).
    const x2 = x1 - getRandomInt(1, 3);
    const j2 = m * x2 + b;

    // STEP 2: Return question data
    return {
      questionText: `$j(x) = mx + ${b}$ For the linear function $j$, $m$ is a constant and $j(${x1}) = ${j1}$. What is the value of $j(${x2})$?`,
      figureCode: null,
      options: [],
      correctAnswer: j2.toString(),
      explanation: `First find $m$: $j(${x1}) = m(${x1}) + ${b} = ${j1}$, so $m(${x1}) = ${m * x1}$, giving $m = ${m}$. Then $j(${x2}) = ${m}(${x2}) + ${b} = ${m * x2} + ${b} = ${j2}$.`
    };
  }
};
