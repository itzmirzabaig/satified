import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 32
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 2-5, b: 2-5, d: -5 to -2]
 * - Difficulty factors: [Polynomial multiplication, FOIL method]
 * - Distractor patterns: [wrong sign on middle term, wrong sign on last term, adds a+d instead of multiplying]
 * - Constraints: [middle coefficient a*d+b != 0; sum distractor a+b+d != 0 and != +/-(a*d+b) so all options stay distinct]
 */

export const generator_32 = {
  metadata: {
    id: "32",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let a = getRandomInt(2, 5);
    let b = getRandomInt(2, 5);
    let d = getRandomInt(-5, -2);

    // Guards: keep the x^4 coefficient nonzero (so a "wrong middle sign"
    // distractor exists), and keep the add-instead-of-multiply distractor
    // coefficient nonzero and different from +/-(a*d+b) so no option collides.
    const isBad = (): boolean => {
      const c4 = a * d + b;
      const s = a + b + d;
      return c4 === 0 || s === 0 || s === c4 || s === -c4;
    };
    let tries = 0;
    while (isBad() && tries++ < 50) {
      a = getRandomInt(2, 5);
      b = getRandomInt(2, 5);
      d = getRandomInt(-5, -2);
    }
    if (isBad()) { a = 3; b = 2; d = -4; } // deterministic safe fallback

    const coeff6 = a;            // >= 2
    const coeff4 = a * d + b;    // nonzero (guarded), may be +/-1
    const coeff2 = b * d;        // always negative
    const sumCoeff = a + b + d;  // nonzero (guarded)
    const dAbs = Math.abs(d);

    // Renders one term of the polynomial with correct sign and no "1x".
    const term = (coef: number, variable: string, leading: boolean): string => {
      const mag = Math.abs(coef);
      const magStr = mag === 1 ? '' : String(mag);
      if (leading) return `${coef < 0 ? '-' : ''}${magStr}${variable}`;
      return ` ${coef < 0 ? '-' : '+'} ${magStr}${variable}`;
    };
    const poly = (c6: number, c4: number, c2: number): string =>
      term(c6, 'x^6', true) + term(c4, 'x^4', false) + term(c2, 'x^2', false);

    const correctPoly = poly(coeff6, coeff4, coeff2);
    const coeff4Disp = coeff4 === 1 ? '' : coeff4 === -1 ? '-' : String(coeff4);

    const optionsData = [
      {
        text: `$${poly(coeff6, -coeff4, coeff2)}$`,
        isCorrect: false,
        reason: `the sign of the $x^{4}$-term is reversed`
      },
      {
        text: `$${poly(coeff6, coeff4, -coeff2)}$`,
        isCorrect: false,
        reason: `the sign of the $x^{2}$-term is reversed`
      },
      {
        text: `$${poly(coeff6, sumCoeff, coeff2)}$`,
        isCorrect: false,
        reason: `its $x^{4}$ coefficient comes from adding ${a} and ${d} instead of multiplying them in the Outer step`
      },
      { text: `$${correctPoly}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    const distractorNotes = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect because ${opt.reason}.`)
      .join(' ');

    return {
      questionText: `$$(${a}x^{3} + ${b}x)(x^{3} - ${dAbs}x)$$

Which of the following is equivalent to the expression above?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctPoly}$`,
      explanation: `Choice ${correctOption.letter} is correct. Multiply each term of the first polynomial by each term of the second polynomial (FOIL):

1. **First:** $(${a}x^{3})(x^{3}) = ${a}x^{6}$
2. **Outer:** $(${a}x^{3})(-${dAbs}x) = ${a * d}x^{4}$
3. **Inner:** $(${b}x)(x^{3}) = ${b}x^{4}$
4. **Last:** $(${b}x)(-${dAbs}x) = ${coeff2}x^{2}$

Combine the $x^{4}$ terms: $(${a * d}+${b})x^{4} = ${coeff4Disp}x^{4}$, so $(${a}x^{3}+${b}x)(x^{3}-${dAbs}x) = ${correctPoly}$. ${distractorNotes}`
    };
  }
};
