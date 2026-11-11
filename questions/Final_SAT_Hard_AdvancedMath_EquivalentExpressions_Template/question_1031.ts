import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1031
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: small integers, constants: varied]
 * - Difficulty factors: [Distribution, combining like terms, setting up equation from coefficient comparison]
 * - Distractor patterns: [Calculation errors, wrong distribution, sign errors]
 * - Constraints: [Must expand and compare all coefficients]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1031 = {
  metadata: {
    id: "1031",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // The wrong choices used to be p - 4, p + 6, and p + 148, with reasons
    // that only restated the expression. They are now the values of p that
    // come from real slips, and the parameters are redrawn until each slip
    // gives an integer:
    //   L = 3p - n(p + k) = (3 - n)p - nk is the x coefficient (always < 0 since n >= 5).
    //   slip 1: -nx(p + k) -> -npx - k (k not multiplied by nx): p1 = p + nk/(n - 3)
    //   slip 2: -nx(p + k) -> -npx + nkx (sign error):            p2 = p + 2nk/(n - 3)
    //   slip 3: 3(px) -> px (3 not distributed to px):            p3 = (n - 3)p/(n - 1)
    // p3 < p < p1 < p2, so all four choices are distinct.
    let p = 0, k = 0, m = 0, n = 0;
    do {
      p = getRandomInt(5, 15);
      k = getRandomInt(2, 6);
      m = getRandomInt(5, 12);
      n = getRandomInt(5, 15); // n = 4 would show "-1p"
    } while ((n * k) % (n - 3) !== 0 || ((n - 3) * p) % (n - 1) !== 0);

    const L = (3 - n) * p - n * k; // negative for n >= 4
    const constant = 3 * m;
    const p1 = p + (n * k) / (n - 3);
    const p2 = p + (2 * n * k) / (n - 3);
    const p3 = ((n - 3) * p) / (n - 1);

    const optionsData = [
      { text: `${p}`, isCorrect: true, reason: '' },
      { text: `${p1}`, isCorrect: false, reason: `${p1} results from distributing $-${n}x$ to $p$ but not to ${k}, which gives $${3 - n}p = ${L}$` },
      { text: `${p2}`, isCorrect: false, reason: `${p2} results from a sign error when distributing $-${n}x$, writing $+${n * k}x$ instead of $-${n * k}x$, which gives $${3 - n}p + ${n * k} = ${L}$` },
      { text: `${p3}`, isCorrect: false, reason: `${p3} results from not distributing the 3 to $px$, which gives $p - ${n}p - ${n * k} = ${L}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const questionText = `In the expression $3(2x^{2} + px + ${m}) - ${n}x(p + ${k})$, $p$ is a constant. This expression is equivalent to the expression $6x^{2} - ${-L}x + ${constant}$. What is the value of $p$?`;

    const explanation = `Choice ${correctOption.letter} is correct. Distributing 3 gives $3(2x^{2} + px + ${m}) = 6x^{2} + 3px + ${constant}$, and distributing $-${n}x$ gives $-${n}x(p + ${k}) = -${n}px - ${n * k}x$. So the expression is equivalent to $6x^{2} + (3p - ${n}p - ${n * k})x + ${constant}$, or $6x^{2} + (${3 - n}p - ${n * k})x + ${constant}$. Since this is equivalent to $6x^{2} - ${-L}x + ${constant}$, the coefficients of $x$ must be equal, so $${3 - n}p - ${n * k} = ${L}$. Adding ${n * k} to both sides gives $${3 - n}p = ${L + n * k}$, and dividing both sides by $${3 - n}$ gives $p = ${p}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: p.toString(),
      explanation: explanation
    };
  }
};
