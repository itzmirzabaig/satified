import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 573
 *
 * ORIGINAL ANALYSIS:
 * - Type: Cubic equation x-intercepts
 * - Number ranges: Roots from -8 to 15 (three distinct integer roots)
 * - Difficulty: Medium - reading roots off a factored cubic
 * - Fill-in requires a single answer, so the question asks for the GREATEST
 *   x-coordinate of an x-intercept; root3 (9..15) is always strictly greater
 *   than root1 (2..8) and root2 (negative), so the answer is unique.
 */

export const generator_573 = {
  metadata: {
    id: "573",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Three distinct integer roots; root3 is always strictly the greatest.
    const root1 = getRandomInt(2, 8);
    const root2 = getRandomInt(-8, -2);
    const root3 = getRandomInt(9, 15);
    const leading = getRandomInt(2, 5); // nonzero constant factor

    // Format factors cleanly (root2 is always negative, so it shows as "+")
    const factor1 = `(x - ${root1})`;
    const factor2 = `(x + ${Math.abs(root2)})`;
    const factor3 = `(x - ${root3})`;

    const questionText = `In the xy-plane, the graph of $y=${leading}${factor1}${factor2}${factor3}$ has three x-intercepts. What is the greatest x-coordinate of an x-intercept of the graph?`;

    const correctAnswer = `${root3}`;

    const explanation = `The correct answer is ${root3}. The x-intercepts of the graph are the points where $y = 0$. Because the constant factor ${leading} is never zero, the product equals zero exactly when one of the factors equals zero. Solving each factor: $${factor1} = 0$ gives $x = ${root1}$; $${factor2} = 0$ gives $x = ${root2}$; and $${factor3} = 0$ gives $x = ${root3}$. The x-coordinates of the x-intercepts are therefore ${root2}, ${root1}, and ${root3}, and the greatest of these is ${root3}.`;
    
    return {
      questionText,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer,
      explanation
    };
  }
};
