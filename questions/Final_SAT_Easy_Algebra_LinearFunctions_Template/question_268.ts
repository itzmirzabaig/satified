import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 268
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 1-3, denominator: 5-15, intercept: -2 to -5]
 * - Difficulty factors: [Identifying y-intercept from equation]
 * - Distractor patterns: [reversed coordinates, slope as y-coordinate, x-intercept]
 * - Constraints: [Slope in lowest terms]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_268 = {
  metadata: {
    id: "268",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The slope is in lowest terms (draws such as 3/15 used to appear). The
    // old explanation called (-2, 0) the x-intercept, which it is not, and two
    // choices used 1/denominator for no reason.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let numerator = 1, denominator = 5;
    do {
      numerator = getRandomInt(1, 3);
      denominator = getRandomInt(5, 15);
    } while (gcd(numerator, denominator) !== 1);

    const c = getRandomInt(2, 5);
    const intercept = -c;
    const slopeTex = `\\frac{${numerator}}{${denominator}}`;

    // x-intercept: (numerator/denominator) x = c, so x = c * denominator / numerator.
    const g = gcd(c * denominator, numerator);
    const xTop = (c * denominator) / g, xBottom = numerator / g;
    const xIntTex = xBottom === 1 ? `${xTop}` : `\\frac{${xTop}}{${xBottom}}`;

    const optionsData = [
      { text: `$(${intercept}, 0)$`, isCorrect: false, reason: `it reverses the coordinates of the $y$-intercept; the point $(${intercept}, 0)$ is on the $x$-axis, not the $y$-axis` },
      { text: `$(0, ${intercept})$`, isCorrect: true, reason: '' },
      { text: `$\\left(0, ${slopeTex}\\right)$`, isCorrect: false, reason: `$${slopeTex}$ is the slope of the graph, not the $y$-coordinate of its $y$-intercept` },
      { text: `$\\left(${xIntTex}, 0\\right)$`, isCorrect: false, reason: `$\\left(${xIntTex}, 0\\right)$ is the $x$-intercept of the graph, where $f(x) = 0$, not the $y$-intercept` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${slopeTex}x - ${c}$. What is the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$(0, ${intercept})$`,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept of the graph is the point where $x = 0$. Substituting 0 for $x$ in the given function yields $f(0) = ${slopeTex}(0) - ${c}$, or $f(0) = ${intercept}$. Therefore, the $y$-intercept is $(0, ${intercept})$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
