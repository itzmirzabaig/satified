import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 782
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -4, intercept: 4]
 * - Difficulty factors: [Point testing in strict inequality y < -4x + 4]
 * - Distractor patterns: [Points where calculation error leads to wrong conclusion]
 * - Constraints: [Strict inequality <, not ≤]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_782 = {
  metadata: {
    id: "782",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Inequality: y < slope*x + intercept, with slope negative, intercept positive.
    const slope = -getRandomInt(2, 6);      // negative slope
    const intercept = getRandomInt(2, 8);   // positive intercept

    const boundaryAt = (x: number) => slope * x + intercept;
    const fmt = (x: number, y: number) => `$(${x}, ${y})$`;

    // Correct point: strictly BELOW the line so y < slope*x + intercept holds.
    const testX = getRandomInt(1, 4);
    const testY = boundaryAt(testX) - getRandomInt(1, 5); // strictly less than boundary

    // Distractors: points ON or ABOVE the line (y >= boundary) so each FAILS the
    // strict inequality, whatever the sign of x. Distinct x-values plus a
    // non-negative offset keep them separated; a bounded retry guarantees all
    // four points are pairwise distinct.
    const used = new Set<string>([`${testX},${testY}`]);
    const makeFail = (x: number): { x: number; y: number } => {
      let y = boundaryAt(x) + getRandomInt(0, 3); // on line (offset 0) or above
      let tries = 0;
      while (used.has(`${x},${y}`) && tries++ < 50) {
        y = boundaryAt(x) + getRandomInt(0, 4);
      }
      used.add(`${x},${y}`);
      return { x, y };
    };

    const d1 = makeFail(-getRandomInt(1, 3)); // negative x
    const d2 = makeFail(0);                    // on the y-axis, at/above intercept
    const d3 = makeFail(getRandomInt(2, 5));   // positive x

    const optionsData = [
      { x: d1.x, y: d1.y, isCorrect: false },
      { x: d2.x, y: d2.y, isCorrect: false },
      { x: d3.x, y: d3.y, isCorrect: false },
      { x: testX, y: testY, isCorrect: true }
    ].map(o => ({ text: fmt(o.x, o.y), x: o.x, y: o.y, isCorrect: o.isCorrect }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const rhs = `${slope}x + ${intercept}`;
    const showTest = (x: number, y: number) =>
      `$${y} < ${slope}(${x}) + ${intercept} = ${boundaryAt(x)}$`;

    const distractorLines = incorrectOptions.map(o => {
      const bound = boundaryAt(o.x);
      const rel = o.y === bound ? 'lies on the boundary line' : 'lies above the boundary line';
      return `Choice ${o.letter} is incorrect. At $(${o.x}, ${o.y})$, the boundary value is $${slope}(${o.x}) + ${intercept} = ${bound}$, and since $${o.y} \\ge ${bound}$ the point ${rel} and does not satisfy the strict inequality.`;
    }).join(' ');

    const explanation = `Choice ${correctOption.letter} is correct. A point is a solution when its $y$-value is strictly less than $${rhs}$. Testing $(${testX}, ${testY})$: ${showTest(testX, testY)}, and $${testY} < ${boundaryAt(testX)}$ is true, so the point satisfies the inequality. ${distractorLines}`;

    return {
      questionText: `Which point $(x, y)$ is a solution to the given inequality in the $xy$-plane?\n\n$$y < ${rhs}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
