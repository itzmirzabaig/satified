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
      { text: `If ${xVal} triangles are constructed, then ${yVal} rectangles are constructed.`, isCorrect: true },
      { text: `If ${xVal} triangles are constructed, then ${yVal} straws are used.`, isCorrect: false, reason: "confuses rectangles with a different quantity" },
      { text: `If ${yVal} triangles are constructed, then ${xVal} rectangles are constructed.`, isCorrect: false, reason: "swaps the roles of x and y" },
      { text: `If ${yVal} triangles are constructed, then ${xVal} straws are used.`, isCorrect: false, reason: "swaps the variables and mislabels the quantity" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `In the equation $3x + 4y = ${total}$, the value of x is the number of triangles constructed and the value of y is the number of rectangles constructed. What is the meaning of the solution $(x, y) = (${xVal}, ${yVal})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In the ordered pair $(x, y) = (${xVal}, ${yVal})$, the first coordinate is the value of x (the number of triangles) and the second coordinate is the value of y (the number of rectangles). So ${xVal} triangles correspond to ${yVal} rectangles. Substituting confirms $3(${xVal}) + 4(${yVal}) = ${total}$. The other choices either swap the two coordinates or relabel the number of rectangles as a different quantity.`
    };
  }
};
