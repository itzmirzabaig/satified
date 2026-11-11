import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1013
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic divided by linear, simplifying to linear]
 * - Difficulty factors: [Factoring numerator, canceling common factors, finding a+d]
 * - Distractor patterns: [Wrong factorization, not canceling, calculation errors in a+d]
 * - Constraints: [x ≠ -7, a and d are integers]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 *
 * FIXED (review):
 * - a was always 1, the middle coefficient could print as "+0x" or "1x", and
 *   two distractors were arbitrary ("answer - 6" and a fixed "1"). Now
 *   a is 2..5, d is any nonzero integer, the polynomial is formatted term by
 *   term, and every wrong choice is a real slip with its own reason, guarded
 *   by a redraw loop so all four values differ.
 * - The explanation used markdown bullets, display math and literal newlines;
 *   it is now plain sentences in the standard format.
 */

export const generator_1013 = {
  metadata: {
    id: "1013",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Numerator = (ax + d)(x + r) = ax^2 + (ar + d)x + dr
    let a = 0, d = 0, r = 0;
    let values: number[] = [];
    do {
      a = getRandomInt(2, 5);
      d = getRandomInt(-9, 9);
      r = getRandomInt(2, 9);
      values = [a + d, d, a - d, a + d * r];
    } while (d === 0 || new Set(values).size < 4);

    const B = a * r + d;   // coefficient of x
    const C = d * r;       // constant term
    const correctSum = a + d;

    // Term-by-term formatting so there is never "1x", "+0x" or "+-".
    const xTerm = (k: number) => {
      if (k === 0) return '';
      const sign = k < 0 ? '-' : '+';
      const mag = Math.abs(k) === 1 ? '' : `${Math.abs(k)}`;
      return `${sign}${mag}x`;
    };
    const constTerm = (k: number) => (k === 0 ? '' : k < 0 ? `-${Math.abs(k)}` : `+${k}`);
    const numerator = `${a}x^{2}${xTerm(B)}${constTerm(C)}`;
    const linearPart = `${a}x${constTerm(d)}`;

    const optionsData = [
      { value: correctSum, isCorrect: true, reason: '' },
      { value: d, isCorrect: false, reason: `${d} is the value of $d$ alone; it leaves out $a=${a}$` },
      { value: a - d, isCorrect: false, reason: `${a - d} comes from a sign error that takes $d$ to be $${-d}$ instead of $${d}$` },
      { value: a + d * r, isCorrect: false, reason: `${a + d * r} uses the constant term of the numerator, $${C}$, as $d$ instead of dividing it by $${r}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const questionText = `The equation $\\frac{${numerator}}{x+${r}}=ax+d$ is true for all $x \\neq -${r}$, where $a$ and $d$ are integers. What is the value of $a+d$?`;

    const explanation = `Choice ${correctOption.letter} is correct. Since the equation is true for all $x \\neq -${r}$, multiplying both sides by $x+${r}$ gives $${numerator}=(ax+d)(x+${r})$. Expanding the right side gives $ax^{2}+(${r}a+d)x+${r}d$. The coefficients of $x^{2}$ must be equal, so $a=${a}$. The constant terms must be equal, so $${r}d=${C}$, which gives $d=${d}$. As a check, the coefficient of $x$ is $${r}(${a})${d < 0 ? `+(${d})` : `+${d}`}=${B}$, which matches. So the expression is equivalent to $${linearPart}$, and $a+d=${a}${d < 0 ? `+(${d})` : `+${d}`}=${correctSum}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `${o.value}` })),
      correctAnswer: `${correctSum}`,
      explanation
    };
  }
};
