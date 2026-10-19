import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
// Removed duplicate import of getRandomInt

/**
 * Question 277
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-4, xInt: 8-20]
 * - Difficulty factors: [Reading x-intercept from table]
 * - Distractor patterns: [reversed coordinates, y-intercept, opposite sign]
 * - Constraints: [Ensure negative x-intercept]
 * - Question type: [Table reading→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_277 = {
  metadata: {
    id: "277",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(1, 4);
    const xIntercept = -getRandomInt(8, 20);
    const points = [];

    for (let i = -2; i <= 3; i++) {
      const x = xIntercept + (i * 4);
      const y = slope * (x - xIntercept);
      points.push({ x, y });
    }

    // Light gray borders: the old black borders were nearly invisible on the dark theme.
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto;"><thead><tr><th style="border: 1px solid #ccc; padding: 8px 12px;">$x$</th><th style="border: 1px solid #ccc; padding: 8px 12px;">$f(x)$</th></tr></thead><tbody>${points.map(p => `<tr><td style="border: 1px solid #ccc; padding: 8px 12px;">${p.x}</td><td style="border: 1px solid #ccc; padding: 8px 12px;">${p.y}</td></tr>`).join('')}</tbody></table>`;

    const yInterceptValue = slope * -xIntercept;

    // Every wrong choice is a real slip. The old choices were the origin and
    // (1/slope, 0), "the reciprocal of the slope".
    const optionsData = [
      { text: `$(${xIntercept}, 0)$`, isCorrect: true, reason: '' },
      { text: `$(0, ${xIntercept})$`, isCorrect: false, reason: `it reverses the coordinates of the $x$-intercept; the point $(0, ${xIntercept})$ is on the $y$-axis, not the $x$-axis` },
      { text: `$(0, ${yInterceptValue})$`, isCorrect: false, reason: `$(0, ${yInterceptValue})$ is the $y$-intercept of the graph, where $x = 0$, not the $x$-intercept` },
      { text: `$(${-xIntercept}, 0)$`, isCorrect: false, reason: `the table shows that $f(x) = 0$ when $x = ${xIntercept}$, not when $x = ${-xIntercept}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The table shows several values of $x$ and their corresponding values of $f(x)$ for the linear function $f$. What is the $x$-intercept of the graph of $y=f(x)$ in the $xy$-plane?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$(${xIntercept}, 0)$`,
      explanation: `Choice ${correctOption.letter} is correct. The $x$-intercept is the point where $f(x) = 0$. The table shows that when $x = ${xIntercept}$, $f(x) = 0$. Therefore, the $x$-intercept of the graph is $(${xIntercept}, 0)$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
