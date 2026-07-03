import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 767
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = mx - 28, x values: 10,15,20,25, f(x): 82,137,192,247]
 * - Difficulty factors: [Finding slope from table with given intercept]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Intercept -28 given, find m]
 * - Question type: [Table in Question→Fill in Blank]
 * - Figure generation: [HTML Table]
 */

export const generator_767 = {
  metadata: {
    id: "767",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // Slope: 8-15 (medium range).
    const m = getRandomInt(8, 15);
    // Intercept: -30 to -20 (stored as a negative number).
    const b = -getRandomInt(20, 30);
    // Starting x value: 40, 45, 50, 55, or 60.
    const xStart = getRandomInt(8, 12) * 5;
    const xStep = 5;

    // STEP 2: Generate table values from f(x) = m*x + b (all integers).
    const x1 = xStart;
    const y1 = m * x1 + b;
    const x2 = x1 + xStep;
    const y2 = m * x2 + b;
    const x3 = x2 + xStep;
    const y3 = m * x3 + b;
    const x4 = x3 + xStep;
    const y4 = m * x4 + b;

    // Sign helpers for writing "mx - 28" / "mx + 28" style expressions.
    const bSign = b < 0 ? '-' : '+';
    const bAbs = Math.abs(b);

    // STEP 3: Build table.
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">f(x)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y3}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x4}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y4}</td></tr></tbody></table>`;

    // STEP 4: Return question data. All inline math is balanced $...$.
    return {
      questionText: `The table shows four values of $x$ and their corresponding values of $f(x)$. There is a linear relationship between $x$ and $f(x)$ that is defined by the equation $f(x) = mx ${bSign} ${bAbs}$, where $m$ is a constant. What is the value of $m$? ${tableCode}`,
      figureCode: null,
      options: [],
      correctAnswer: m.toString(),
      explanation: `Substitute a row from the table into $f(x) = mx ${bSign} ${bAbs}$. Using $x = ${x1}$ and $f(x) = ${y1}$ gives $f(${x1}) = m(${x1}) ${bSign} ${bAbs} = ${y1}$. Adding ${bAbs} to both sides gives $m \\cdot ${x1} = ${y1 + bAbs}$, so $m = \\frac{${y1 + bAbs}}{${x1}} = ${m}$.`
    };
  }
};
