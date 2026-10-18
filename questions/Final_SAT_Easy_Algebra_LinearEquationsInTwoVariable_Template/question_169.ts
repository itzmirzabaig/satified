import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 169
 *
 * ORIGINAL ANALYSIS: [Parallel slope fraction value]
 *
 * FIX NOTES:
 * The question was fixed text (always y = 1/4 x + 1), so regenerating never
 * changed it, and the stem was shorthand ("Line j is parallel. What is the
 * slope of j?"). The slope is now a random proper fraction in lowest terms,
 * positive or negative, the intercept is random, and the stem is a full
 * question. Answers stay enterable (at most 4 characters, such as -3/7).
 */

export const generator_169 = {
  metadata: {
    id: "169",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let num = 1, den = 4;
    do {
      den = getRandomInt(2, 9);
      num = getRandomInt(1, den - 1);
    } while (gcd(num, den) !== 1);
    const sign = getRandomElement([1, -1]);
    const intercept = getRandomInt(1, 12) * getRandomElement([1, -1]);

    const slopeTex = `${sign < 0 ? '-' : ''}\\frac{${num}}{${den}}`;
    const interceptTex = intercept > 0 ? ` + ${intercept}` : ` - ${-intercept}`;
    const answer = `${sign < 0 ? '-' : ''}${num}/${den}`;

    return {
      questionText: `In the $xy$-plane, line $k$ is defined by $y = ${slopeTex}x${interceptTex}$. Line $j$ is parallel to line $k$. What is the slope of line $j$?`,
      figureCode: null,
      options: [],
      correctAnswer: answer,
      explanation: `The equation of line $k$ is written in slope-intercept form, $y = mx + b$, where $m$ is the slope. So the slope of line $k$ is $${slopeTex}$. Parallel lines have equal slopes, so the slope of line $j$ is also $${slopeTex}$. Note that ${(sign < 0 ? -1 : 1) * num}/${den} and its decimal equivalent are examples of ways to enter a correct answer.`
    };
  }
};
