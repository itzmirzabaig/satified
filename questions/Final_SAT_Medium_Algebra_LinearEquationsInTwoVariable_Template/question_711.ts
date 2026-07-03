import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 711
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: num/den with num<den, intercept negative]
 * - Difficulty factors: [Identifying slope from slope-intercept form]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Fractional slope shown as the coefficient of x]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_711 = {
  metadata: {
    id: "711",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Parameters. The line is y = (num/den)x + intercept, written with
    // the slope as a single fraction coefficient. num < den keeps it a proper
    // fraction; intercept is negative so it reads as "... x - |b|".
    const num = getRandomInt(2, 10);
    const den = getRandomInt(num + 1, 20);
    const intercept = getRandomInt(-30, -10);

    // Fill-in answer must be a plain number or a/b fraction (no LaTeX), because
    // the student types it. The slope is exactly the coefficient of x, num/den.
    const answer = `${num}/${den}`;

    // Decimal equivalents for the "ways to enter" hint (kept to <=4 decimals so
    // no float artifact leaks into user-visible text).
    const decimal4 = (num / den).toFixed(4);

    return {
      questionText: `What is the slope of the graph of $y=\\frac{${num}x}{${den}}${intercept}$ in the $xy$-plane? (Enter your answer as a fraction or a decimal.)`,
      figureCode: null,
      options: [],
      correctAnswer: answer,
      explanation: `The correct answer is $\\frac{${num}}{${den}}$. A line in the $xy$-plane can be written as $y = mx + b$, where $m$ is the slope and $b$ is the $y$-coordinate of the $y$-intercept. The given equation is $y = \\frac{${num}}{${den}}x ${intercept} = \\left(\\frac{${num}}{${den}}\\right)x ${intercept}$, so the coefficient of $x$ is $\\frac{${num}}{${den}}$. Therefore the slope is $\\frac{${num}}{${den}}$. This can be entered as ${num}/${den} or as the decimal ${decimal4}.`
    };
  }
};
