import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1023
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic divided by linear, polynomial long division]
 * - Difficulty factors: [Polynomial long division, remainder handling, formatting result]
 * - Distractor patterns: [Wrong quotient, wrong remainder, sign errors]
 * - Constraints: [Must perform division correctly]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1023 = {
  metadata: {
    id: "1023",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Before: the wrong choices were random offsets of the answer (quotient
    // +1 or -(e+2), remainder -3, +2, -6) explained only as "a wrong quotient
    // and wrong remainder"; the stem could show "+0x" or "1x"; and the
    // explanation could show "0x" with TeX outside $...$. Now the three wrong
    // choices come from real division slips, and every term is formatted.

    // ± k as a term after something else ("+3", "-3", or "" for 0)
    const signedConst = (k: number) => (k === 0 ? '' : k > 0 ? `+${k}` : `-${Math.abs(k)}`);
    const signedX = (k: number) => (k === 0 ? '' : k === 1 ? '+x' : k === -1 ? '-x' : k > 0 ? `+${k}x` : `-${Math.abs(k)}x`);
    const coefX = (k: number) => (k === 1 ? 'x' : k === -1 ? '-x' : `${k}x`);

    // STEP 1: (x^2 + Bx + C) / (x - d) = x + e + r/(x - d)
    //   B = e - d, C = r - de
    let d = 0, e = 0, r = 0, B = 0, C = 0;
    let keys: Array<{ q: number; rem: number }> = [];
    for (let tries = 0; tries < 500; tries++) {
      d = getRandomInt(2, 5);
      e = getRandomInt(1, 6);
      r = getRandomInt(1, 5) * (Math.random() < 0.5 ? -1 : 1);
      B = e - d;
      C = r - d * e;
      keys = [
        { q: e, rem: r },                         // correct
        { q: B - d, rem: C - d * (B - d) },       // slip 1: divided using +d (as if by x + d)
        { q: B - d, rem: C + d * (B - d) },       // slip 2: x^2 + Bx minus (x^2 - dx) taken as (B - d)x
        { q: e, rem: C - d * e }                  // slip 3: C - (-de) taken as C - de
      ];
      const distinct = new Set(keys.map(k => `${k.q}|${k.rem}`)).size === 4;
      if (Math.abs(B) >= 2 && B !== d && C !== 0 && distinct && keys.every(k => k.rem !== 0)) break;
      if (tries === 499) {
        // Known good fallback: (x^2 + 3x - 13)/(x - 2) = x + 5 - 3/(x - 2)
        d = 2; e = 5; r = -3; B = 3; C = -13;
        keys = [
          { q: 5, rem: -3 }, { q: 1, rem: -15 }, { q: 1, rem: -11 }, { q: 5, rem: -23 }
        ];
      }
    }

    const render = (k: { q: number; rem: number }) =>
      `$x${signedConst(k.q)}${k.rem < 0 ? '-' : '+'}\\frac{${Math.abs(k.rem)}}{x-${d}}$`;

    const numer = `x^{2}${signedX(B)}${signedConst(C)}`;
    const correctAnswer = render(keys[0]);

    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: render(keys[1]), isCorrect: false, reason: `this expression results from dividing as if the divisor were $x+${d}$ (using $-${d}$ instead of ${d} in synthetic division), which gives the quotient $x${signedConst(keys[1].q)}$ and the remainder $${keys[1].rem}$` },
      { text: render(keys[2]), isCorrect: false, reason: `this expression results from a sign slip in the first subtraction: $(x^{2}${signedX(B)}) - (x^{2}-${d}x)$ was taken as $${coefX(B - d)}$ instead of $${coefX(e)}$, which gives the quotient $x${signedConst(keys[2].q)}$ and the remainder $${keys[2].rem}$` },
      { text: render(keys[3]), isCorrect: false, reason: `this expression results from a sign slip in the last subtraction: $${C} - (-${d * e})$ was computed as $${C} - ${d * e} = ${keys[3].rem}$ instead of $${C} + ${d * e} = ${r}$` }
    ];

    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Question text
    const questionText = `Which of the following expressions is equivalent to $\\frac{${numer}}{x-${d}}$?`;

    // STEP 5: Explanation (one paragraph, inline math)
    const explanation = `Choice ${correctOption.letter} is correct. Use polynomial long division. Dividing $x^{2}$ by $x$ gives $x$, and $x(x-${d}) = x^{2}-${d}x$. Subtracting, $(${numer}) - (x^{2}-${d}x) = ${coefX(e)}${signedConst(C)}$. Dividing $${coefX(e)}$ by $x$ gives $${e}$, and $${e}(x-${d}) = ${coefX(e)}-${d * e}$. Subtracting again, $(${coefX(e)}${signedConst(C)}) - (${coefX(e)}-${d * e}) = ${C} + ${d * e} = ${r}$, which is the remainder. So the quotient is $x+${e}$ with remainder $${r}$, and the expression is equivalent to ${correctAnswer}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
