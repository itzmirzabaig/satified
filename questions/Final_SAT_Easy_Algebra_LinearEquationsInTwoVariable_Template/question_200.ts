import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 200
 *
 * ORIGINAL ANALYSIS: [Interpretation of solution point]
 * - The equation 3x + 4y = total models x triangles and y rectangles.
 * - The point (xVal, yVal) must be a genuine solution, so build the total
 *   FROM the chosen x and y: total = 3*xVal + 4*yVal (exact integer).
 * - Correct interpretation: xVal triangles => yVal rectangles.
 */

export const generator_200 = {
  metadata: {
    id: "200",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first: choose the solution point, then derive the total so the
    // point provably satisfies 3x + 4y = total for every draw.
    const xVal = getRandomInt(10, 50);
    // Keep yVal distinct from xVal so the "swap x and y" distractors can never
    // read identically to the correct choice.
    let yVal = getRandomInt(10, 50);
    let tries = 0;
    while (yVal === xVal && tries++ < 50) yVal = getRandomInt(10, 50);
    if (yVal === xVal) yVal = xVal === 50 ? 49 : xVal + 1;
    const total = 3 * xVal + 4 * yVal;

    const optionsData = [
      { text: `If ${xVal} triangles are constructed, then ${yVal} rectangles are constructed.`, isCorrect: true, reason: '' },
      { text: `If ${xVal} triangles are constructed, then ${yVal} straws are used.`, isCorrect: false, reason: `${yVal} is the number of rectangles, not the number of straws; a total of ${total} straws are used` },
      { text: `If ${yVal} triangles are constructed, then ${xVal} rectangles are constructed.`, isCorrect: false, reason: `it swaps the values of $x$ and $y$; $x = ${xVal}$ is the number of triangles` },
      { text: `If ${yVal} triangles are constructed, then ${xVal} straws are used.`, isCorrect: false, reason: `it swaps the values of $x$ and $y$ and describes ${xVal} as a number of straws instead of a number of triangles` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `A student uses straws to construct triangles and rectangles. Each triangle uses 3 straws, and each rectangle uses 4 straws. The equation $3x + 4y = ${total}$ represents this situation, where $x$ is the number of triangles constructed, $y$ is the number of rectangles constructed, and ${total} is the total number of straws used. What is the best interpretation of the solution $(x, y) = (${xVal}, ${yVal})$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In the ordered pair $(x, y) = (${xVal}, ${yVal})$, the value of $x$, the number of triangles, is ${xVal}, and the value of $y$, the number of rectangles, is ${yVal}. Substituting confirms $3(${xVal}) + 4(${yVal}) = ${total}$. So if ${xVal} triangles are constructed, then ${yVal} rectangles are constructed. ${shuffledOptions.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
