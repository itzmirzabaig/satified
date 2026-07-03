import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1081
 *
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Equations (Quadratic)
 * - Concept: Sum of roots (Vieta's Formulas)
 * - Equation: x² + bx + c = 0. Sum = -b/a.
 * - Fix: correctAnswer now equals the option text; distractors are principled
 *   (0, -b/(2a) vertex value, sign-error b) and provably distinct every draw.
 */

export const generator_1081 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // 1. Generate coefficients
    // Equation: x^2 + bx + c = 0 with a = 1.
    // b is a negative EVEN integer so the sum of roots (-b) is a positive even
    // integer and -b/2 (the vertex-value distractor) is a whole number.
    const b = -2 * getRandomInt(15, 30); // -30..-60, even
    let c = getRandomInt(-20, 20);
    if (c === 0) c = 7; // keep a full trinomial appearance

    const sumOfRoots = -b; // a = 1, so sum = -b/a = -b (30..60)
    const halfSum = sumOfRoots / 2; // integer since b is even
    // Note: discriminant b^2 - 4c >= 900 - 80 > 0 for every draw, so the
    // equation always has two real solutions.

    // 2. Format Equation String
    const signB = b < 0 ? "-" : "+";
    const valB = Math.abs(b);
    const signC = c < 0 ? "-" : "+";
    const valC = Math.abs(c);
    const equation = `x^2 ${signB} ${valB}x ${signC} ${valC} = 0`;

    // 3. Options — pairwise distinct for every draw:
    // sumOfRoots in 30..60, halfSum in 15..30 (equal to sum only if sum = 0),
    // b in -60..-30, and 0 differs from all of them.
    type Opt = { text: string; isCorrect: boolean };
    const optCorrect: Opt = { text: `${sumOfRoots}`, isCorrect: true };
    const optZero: Opt = { text: "0", isCorrect: false };          // assumes the solutions cancel
    const optHalf: Opt = { text: `${halfSum}`, isCorrect: false }; // -b/(2a), the vertex x-value
    const optSign: Opt = { text: `${b}`, isCorrect: false };       // sign error: b/a instead of -b/a

    const shuffledOptions = shuffle<Opt>([optCorrect, optZero, optHalf, optSign]);
    const letterOf = (opt: Opt) => String.fromCharCode(65 + shuffledOptions.indexOf(opt));
    const correctLetter = letterOf(optCorrect);

    // 4. Explanation
    const explanation = `
      For a quadratic equation in the form $ax^2 + bx + c = 0$, the sum of the solutions is given by the formula $-\\frac{b}{a}$.
      <br/>
      In the given equation $${equation}$:
      <ul>
        <li>$a = 1$</li>
        <li>$b = ${b}$</li>
        <li>$c = ${c}$</li>
      </ul>
      Using the formula:
      $$ \\text{Sum} = -\\frac{${b}}{1} = -(${b}) = ${sumOfRoots} $$
      Choice ${correctLetter} is correct.
      Choice ${letterOf(optZero)} is incorrect because the two solutions add to zero only when $b = 0$, which is not the case here.
      Choice ${letterOf(optHalf)} is incorrect because it is $-\\frac{b}{2a}$, the $x$-coordinate of the vertex (the average of the solutions), not their sum.
      Choice ${letterOf(optSign)} is incorrect because it results from a sign error, using $\\frac{b}{a}$ instead of $-\\frac{b}{a}$.
    `;

    return {
      questionText: `What is the sum of the solutions to the given equation?\n\n$$${equation}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: optCorrect.text,
      explanation: explanation
    };
  }
};
