import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 202
 *
 * ORIGINAL ANALYSIS: [Standard form table verification]
 * - Number ranges: [a: 2-6, b: -6 to -2, c derived]
 * - Difficulty factors: [Matching a table of (x, y) pairs to ax + by = c]
 * - Constraints: [Every (x, y) pair in the correct table must satisfy the
 *   equation with integer values.]
 *
 * Construction: for a line a*x + b*y = c, stepping x by |b| and y by a keeps
 * a*x + b*y constant, because a*|b| + b*a = 0. So an arithmetic table with
 * dx = |b| and dy = a lands three collinear integer points on the line.
 */

export const generator_202 = {
  metadata: {
    id: "202",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Coefficients. b is negative (standard-form Easy convention).
    const a = getRandomInt(2, 6);
    const bAbs = getRandomInt(2, 6);
    const b = -bAbs;

    // Base point and arithmetic steps that keep a*x + b*y constant.
    const x0 = getRandomInt(1, 5);
    const y0 = getRandomInt(6, 12);
    const xVals = [x0, x0 + bAbs, x0 + 2 * bAbs];
    const yVals = [y0, y0 + a, y0 + 2 * a]; // increasing by a > 0

    // Constant right-hand side (identical for all three rows by construction).
    const c = a * x0 + b * y0;

    const createTable = (ys: number[]) =>
      `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${ys[i]}</td></tr>`).join('')}</table>`;

    // All four y-triples are pairwise distinct for every draw:
    //  - correct: increasing by a (a >= 2)
    //  - +5 shift: differs from correct in every entry (5 != 0)
    //  - reversed: decreasing; equals correct only if a = 0 (never)
    //  - negated: all negative; equals correct only if y0 = 0 (never, y0 >= 6)
    const optionsData = [
      { text: "Table A", code: createTable(yVals), isCorrect: true },
      { text: "Table B", code: createTable(yVals.map(y => y + 5)), isCorrect: false, reason: "shifts the y-values, so the points no longer satisfy the equation" },
      { text: "Table C", code: createTable([yVals[2], yVals[1], yVals[0]]), isCorrect: false, reason: "pairs the y-values with the wrong x-values" },
      { text: "Table D", code: createTable(yVals.map(y => -y)), isCorrect: false, reason: "uses the wrong sign for each y-value" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(o => o.isCorrect)!;

    // Sign-aware equation display: b is negative, so render "ax - |b|y".
    const equation = `${a}x - ${bAbs}y = ${c}`;

    return {
      questionText: `Which table contains only ordered pairs $(x, y)$ that satisfy the equation $${equation}$?`,
      figureCode: null,
      options: shuffled.map(o => o.code),
      correctAnswer: correctOption.code,
      explanation: `Choice ${correctOption.letter} is correct. Each row must make $${equation}$ true. For example, the pair $(${xVals[0]}, ${yVals[0]})$ gives $${a}(${xVals[0]}) - ${bAbs}(${yVals[0]}) = ${c}$, and the pairs $(${xVals[1]}, ${yVals[1]})$ and $(${xVals[2]}, ${yVals[2]})$ also give ${c}. The other tables shift the y-values, reverse them, or negate their signs, so at least one pair fails the equation.`
    };
  }
};
