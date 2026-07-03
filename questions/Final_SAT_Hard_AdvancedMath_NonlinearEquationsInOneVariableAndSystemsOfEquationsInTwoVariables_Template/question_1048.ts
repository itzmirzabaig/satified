import { getRandomInt, getRandomElement, getFactors } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1048
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-16x²-8x+c=0, exactly one solution, find c]
 * - Difficulty factors: [Negative leading coefficient, discriminant = 0]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Discriminant calculation with negative a; inputs chosen so c is an integer]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1048 = {
  metadata: {
    id: "1048",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Answer-first construction. Displayed equation: ax^2 - 2h·x + c = 0 with
    // a = -A negative and linear coefficient bCoef = -2h. Exactly one solution
    // means the discriminant is zero:
    //   (-2h)^2 - 4ac = 4h^2 + 4Ac = 0  =>  c = -h^2/A.
    // Picking A as a divisor of h^2 makes c an exact negative integer.
    const h = getRandomInt(2, 10);
    // Divisors of h^2 in [4, 20]; nonempty for every h in [2, 10]
    // (h=2:{4}, 3:{9}, 4:{4,8,16}, 5:{5}, 6:{4,6,9,12,18}, 7:{7}, 8:{4,8,16}, 9:{9}, 10:{4,5,10,20}).
    const divisors = getFactors(h * h).filter(d => d >= 4 && d <= 20);
    const A = getRandomElement(divisors);
    const a = -A; // negative leading coefficient in [-20, -4]
    const bCoef = -2 * h; // linear coefficient in [-20, -4]
    const cValue = -(h * h) / A; // exact negative integer

    return {
      questionText: `$${a}x^2 - ${2 * h}x + c = 0$\n\nIn the given equation, $c$ is a constant. The equation has exactly one solution. What is the value of $c$?`,
      figureCode: null,
      options: [],
      correctAnswer: cValue.toString(),
      explanation: `The correct answer is $${cValue}$. A quadratic equation has exactly one solution when its discriminant, $b^2 - 4ac$, is equal to zero. In the given equation, $a = ${a}$ and $b = ${bCoef}$, so the discriminant is $(${bCoef})^2 - 4(${a})c = ${4 * h * h} + ${-4 * a}c$. Setting the discriminant equal to zero gives $c = -\\frac{${4 * h * h}}{${-4 * a}} = ${cValue}$.`
    };
  }
};
