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
 *   (product c, -b/(2a) average of the solutions, sign-error b) and distinct every draw.
 */

export const generator_1081 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Fixed: the explanation used HTML lists and several lines and did not lead
    // with the correct choice; the choice 0 was not a real slip, so it is replaced
    // by c, the product of the solutions (a common mix up with the sum).
    // b is a negative EVEN integer so -b/2 is a whole number.
    const b = -2 * getRandomInt(15, 30); // -30..-60, even
    const sumOfRoots = -b; // a = 1, so sum = -b/a = -b (30..60)
    const halfSum = sumOfRoots / 2; // 15..30

    // c is nonzero and differs from every other choice. The discriminant
    // b^2 - 4c >= 900 - 80 > 0, so there are always two real solutions.
    let c = 0;
    do {
      c = getRandomInt(-20, 20);
    } while (c === 0 || c === halfSum);

    const equation = `x^2 - ${Math.abs(b)}x ${c < 0 ? '-' : '+'} ${Math.abs(c)} = 0`;

    const optionsData = [
      { text: `${sumOfRoots}`, isCorrect: true, reason: '' },
      { text: `${halfSum}`, isCorrect: false, reason: `$${halfSum}$ is $-\\frac{b}{2a}$, the average of the two solutions, not their sum` },
      { text: `${b}`, isCorrect: false, reason: `$${b}$ is the coefficient $b$ itself, which leaves out the negative sign in the formula $-\\frac{b}{a}$` },
      { text: `${c}`, isCorrect: false, reason: `$${c}$ is the constant term, which equals $\\frac{c}{a}$, the product of the solutions, not their sum` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the sum of the solutions to the given equation?\n\n$$${equation}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. For a quadratic equation in the form $ax^2+bx+c=0$, the sum of the solutions is $-\\frac{b}{a}$. In the given equation, $a=1$ and $b=${b}$, so the sum of the solutions is $-\\frac{${b}}{1}=${sumOfRoots}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
