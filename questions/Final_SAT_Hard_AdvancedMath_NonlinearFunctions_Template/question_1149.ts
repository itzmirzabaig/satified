import { getRandomInt, getRandomElement, getFactors } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1149
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area = x², base = 2x+b, height = x-h]
 * - Difficulty factors: [Triangle area, quadratic equation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must solve ½(2x+b)(x-h) = x²]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1149 = {
  metadata: {
    id: "1149",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Setup: (1/2)(2x + b)(x - h) = x^2.
    // Multiply by 2: (2x + b)(x - h) = 2x^2 -> (b - 2h)x = bh -> x = bh/(b - 2h).
    // Answer-first construction guarantees an integer x:
    //   let q = x - h = 2h^2 / (b - 2h). Choosing q as a divisor of 2h^2 makes
    //   b = 2h + 2h^2/q and x = h + q both positive integers for every draw.
    const h = getRandomInt(6, 12);
    const twoHsq = 2 * h * h;
    // q must divide 2h^2 (so b is an integer) and stay in a reasonable range.
    const qChoices = getFactors(twoHsq).filter(q => q >= 2 && q <= 40);
    const q = getRandomElement(qChoices);
    const g = twoHsq / q;      // g = b - 2h (positive integer divisor)
    const b = 2 * h + g;       // base offset
    const x = h + q;           // the answer (positive integer)

    return {
      questionText: `A triangle has area $x^2$ square cm. The base is $(2x+${b})$ cm and the height is $(x-${h})$ cm. What is the value of $x$?`,
      figureCode: null,
      options: [],
      correctAnswer: x.toString(),
      explanation: `The area of a triangle is $\\frac{1}{2}(\\text{base})(\\text{height})$, so $\\frac{1}{2}(2x+${b})(x-${h})=x^2$. Multiplying both sides by 2 gives $(2x+${b})(x-${h})=2x^2$. Expanding the left side and cancelling the matching $(2x^2)$ term on both sides leaves $(${b - 2 * h})x=${b * h}$. Therefore $x=\\frac{${b * h}}{${b - 2 * h}}=${x}$.`
    };
  }
};
