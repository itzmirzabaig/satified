import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1122
 *
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions (Equivalent Forms)
 * - Logic: Identify which equivalent form displays the y-coordinate of the
 *   y-intercept as a single visible constant or coefficient.
 * - Function: f(x) = A(B)^x, so the y-intercept value is f(0) = A.
 * - A form that displays it:       A(B^k)^(x/k), coefficient A.
 * - A form that does not:          (A*B^n)(B)^(x-n), coefficient A*B^n != A.
 * - Each equation is drawn independently, so all four answers occur.
 * - A is drawn from {5,7,11,13}, which never equals B, B^k, n, k or A*B^n, so a
 *   displayed number can never match the intercept by accident.
 *
 * Before, the stem called a a constant though it never appeared in f, b stayed
 * an unknown exponent, the answer was always "Neither I nor II", and the wrong
 * choices had no reasons.
 */

export const generator_1122 = {
  metadata: {
    id: "1122",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // 1. Randomize parameters.
    const A = getRandomElement([5, 7, 11, 13]);
    const B = getRandomElement([2, 3, 4]);
    const showsI = getRandomElement([true, false]);
    const showsII = getRandomElement([true, false]);

    // Equation I uses k = 2 or n = 1; equation II uses k = 3 or n = 2, so the
    // two equations are never identical.
    const build = (name: string, shows: boolean, k: number, n: number) => {
      if (shows) {
        const inner = B ** k;
        return {
          eq: `${name}(x)=${A}(${inner})^{\\frac{x}{${k}}}`,
          work: `$${name}(0)=${A}(${inner})^{0}=${A}$, and ${A} appears as the coefficient, so this equation displays the $y$-coordinate of the $y$-intercept`,
          coef: A
        };
      }
      const coef = A * B ** n;
      return {
        eq: `${name}(x)=${coef}(${B})^{x-${n}}`,
        work: `$${name}(0)=${coef}(${B})^{-${n}}=${A}$, but the coefficient shown is ${coef}, so this equation does not display the $y$-coordinate of the $y$-intercept`,
        coef
      };
    };
    const eqI = build('g', showsI, 2, 1);
    const eqII = build('h', showsII, 3, 2);

    let correctText: string;
    if (showsI && showsII) correctText = 'I and II';
    else if (showsI) correctText = 'I only';
    else if (showsII) correctText = 'II only';
    else correctText = 'Neither I nor II';

    // Each wrong choice names exactly which equation it gets wrong.
    const reasonFor = (claimsI: boolean, claimsII: boolean): string => {
      const parts: string[] = [];
      if (claimsI && !showsI) parts.push(`equation I shows the coefficient ${eqI.coef} rather than the $y$-coordinate ${A}`);
      if (!claimsI && showsI) parts.push(`it leaves out equation I, whose coefficient ${A} is the $y$-coordinate of the $y$-intercept`);
      if (claimsII && !showsII) parts.push(`equation II shows the coefficient ${eqII.coef} rather than the $y$-coordinate ${A}`);
      if (!claimsII && showsII) parts.push(`it leaves out equation II, whose coefficient ${A} is the $y$-coordinate of the $y$-intercept`);
      return parts.join(', and ');
    };

    // 2. Options.
    const optionsData = [
      { text: `I only`, isCorrect: correctText === 'I only', reason: reasonFor(true, false) },
      { text: `II only`, isCorrect: correctText === 'II only', reason: reasonFor(false, true) },
      { text: `I and II`, isCorrect: correctText === 'I and II', reason: reasonFor(true, true) },
      { text: `Neither I nor II`, isCorrect: correctText === 'Neither I nor II', reason: reasonFor(false, false) }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // 3. Build response.
    return {
      questionText: `The function $f$ is defined by $f(x)=${A}(${B})^{x}$. The functions $g$ and $h$ are equivalent to function $f$. Which of the following equations displays the $y$-coordinate of the $y$-intercept of the graph of $y=f(x)$ as a constant or coefficient?
      <br/><br/>
      I. $${eqI.eq}$
      <br/>
      II. $${eqII.eq}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-coordinate of the $y$-intercept is $f(0)=${A}(${B})^{0}=${A}$. For equation I, ${eqI.work}. For equation II, ${eqII.work}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
