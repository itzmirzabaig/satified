import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
// Removed duplicate import of getRandomInt

/**
 * Question ID: c10ad793
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-4, xInt: 8-20]
 * - Difficulty factors: [Reading x-intercept from table]
 * - Distractor patterns: [origin, reciprocal slope, positive version of negative intercept]
 * - Constraints: [Ensure negative x-intercept]
 * - Question type: [Table reading→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_c10ad793 = {
  metadata: {
    // id: "c10ad793",
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

    // Added border styles to table, th, and td - NO background colors
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto;"><thead><tr><th style="border: 1px solid black; padding: 8px 12px;">$x$</th><th style="border: 1px solid black; padding: 8px 12px;">$f(x)$</th></tr></thead><tbody>${points.map(p => `<tr><td style="border: 1px solid black; padding: 8px 12px;">${p.x}</td><td style="border: 1px solid black; padding: 8px 12px;">${p.y}</td></tr>`).join('')}</tbody></table>`;

    const distractor1 = `(0, 0)`;
    const distractor2 = `(\\frac{1}{${slope}}, 0)`;
    const distractor3 = `(${-xIntercept}, 0)`;

    const optionsData = [
      { text: `(${xIntercept}, 0)`, isCorrect: true },
      { text: distractor1, isCorrect: false, reason: "is the origin, not where the function crosses the x-axis" },
      { text: distractor2, isCorrect: false, reason: "uses the reciprocal of the slope" },
      { text: distractor3, isCorrect: false, reason: "uses the positive version of the x-intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The table above shows several values of $x$ and their corresponding values of $f(x)$ for the linear function $f$. What is the $x$-intercept of the graph of $y=f(x)$ in the $xy$-plane?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `(${xIntercept}, 0)`,
      explanation: `Choice ${correctOption.letter} is correct. The $x$-intercept is the point where $f(x) = 0$. From the table, when $x = ${xIntercept}$, $f(x) = 0$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: d11910d6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 0.5-2.5, yIntercept: 1-6]
 * - Difficulty factors: [Reading y-intercept from graph]
 * - Distractor patterns: [x-intercept, swapped coordinates, wrong sign]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */