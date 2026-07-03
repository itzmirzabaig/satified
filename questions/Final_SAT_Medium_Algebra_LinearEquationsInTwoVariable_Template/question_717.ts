import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 717
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (4,6), (15,24), slope: 18/11]
 * - Difficulty factors: [Calculating slope from two points]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Non-integer slope result]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_717 = {
  metadata: {
    id: "717",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // A line through (x1,y1) and (x2,y2); find its slope (y2-y1)/(x2-x1).
    // Construct so rise = slopeNum > 0 and run = slopeDen > 0 (x2 > x1),
    // so the slope is always positive and reduces to finalNum/finalDen.
    const x1 = getRandomInt(1, 10);
    const y1 = getRandomInt(2, 15);
    const slopeDen = getRandomInt(5, 15); // run = x2 - x1, strictly positive
    const slopeNum = getRandomInt(10, 30); // rise = y2 - y1, strictly positive
    const x2 = x1 + slopeDen;
    const y2 = y1 + slopeNum;

    // Reduce the slope fraction (both parts positive => finalNum, finalDen > 0).
    const gcd = (a: number, b: number): number => {
      let n1 = Math.abs(a);
      let n2 = Math.abs(b);
      while (n2 !== 0) {
        const t = n2;
        n2 = n1 % n2;
        n1 = t;
      }
      return n1;
    };

    const divisor = gcd(slopeNum, slopeDen);
    const finalNum = slopeNum / divisor;
    const finalDen = slopeDen / divisor;

    // Fill-in answer: plain integer or "a/b" fraction only (students type it).
    const correctAnswer = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;
    // LaTeX form used ONLY inside $...$ in the explanation.
    const answerTex = finalDen === 1 ? `${finalNum}` : `\\frac{${finalNum}}{${finalDen}}`;

    return {
      questionText: `A line passes through the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$ in the $xy$-plane. What is the slope of the line? Enter your answer as a fraction or decimal.`,
      figureCode: null,
      options: [], // Empty array for fill-in-the-blank, not null
      correctAnswer: correctAnswer,
      explanation: `For a line that passes through the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$ in the $xy$-plane, the slope can be found using the slope formula $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. Substituting the given points yields $m=\\frac{${y2}-${y1}}{${x2}-${x1}}=\\frac{${slopeNum}}{${slopeDen}}=${answerTex}$. Therefore, the slope of the line is $m=${answerTex}$.`
    };
  }
};
