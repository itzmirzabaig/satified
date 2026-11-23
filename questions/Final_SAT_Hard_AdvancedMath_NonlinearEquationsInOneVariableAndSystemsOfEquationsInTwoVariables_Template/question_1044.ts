import { getRandomInt, shuffle, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1044
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5x²+10x+16=0, discriminant=100-320=-220]
 * - Difficulty factors: [Calculate discriminant, identify sign]
 * - Distractor patterns: [A: one, B: two, C: infinite, D: zero/correct]
 * - Constraints: [Discriminant negative means no real solutions]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// Signed term for TeX, never "1x" or "+ -3".
const term = (coef: number, v: string, first = false): string => {
  const abs = Math.abs(coef);
  const body = v && abs === 1 ? v : `${abs}${v}`;
  if (first) return coef < 0 ? `-${body}` : body;
  return coef < 0 ? ` - ${body}` : ` + ${body}`;
};

export const generator_1044 = {
  metadata: {
    id: "1044",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Before: the answer was always "Zero", the wrong choice reasons were
    // generic ("would require a positive discriminant") and the explanation
    // was split over several lines. Now the case (zero, one or two real
    // solutions) is randomized and each wrong choice names a real slip with
    // the number the student would get.
    const kind = getRandomElement(['zero', 'one', 'two'] as const);
    let a = 0, b = 0, c = 0, m = 1, n = 1, k = 1;
    if (kind === 'zero') {
      // b^2 < 4ac with a, b, c positive.
      a = getRandomInt(2, 6);
      b = getRandomInt(5, 15);
      c = Math.floor((b * b) / (4 * a)) + 1 + getRandomInt(0, 8);
    } else if (kind === 'one') {
      // k(mx - n)^2 expanded, so the discriminant is exactly 0; b < 0.
      do {
        k = getRandomInt(1, 3);
        m = getRandomInt(1, 3);
        n = getRandomInt(1, 5);
        a = k * m * m;
      } while (a < 2 || (m > 1 && n % m === 0));
      b = -2 * k * m * n;
      c = k * n * n;
    } else {
      // c < 0, so b^2 - 4ac = b^2 + 4a|c| > 0. Also b^2 < 4a|c|, so a student
      // who ignores the sign of c gets a negative value.
      do {
        a = getRandomInt(2, 6);
        b = getRandomInt(3, 12);
        c = -getRandomInt(2, 12);
      } while (b * b >= 4 * a * Math.abs(c));
    }
    const disc = b * b - 4 * a * c;
    const fourAC = 4 * a * c;
    const fourACabs = Math.abs(fourAC);

    const eq = `${term(a, 'x^2', true)}${term(b, 'x')}${term(c, '')} = 0`;
    const discLine = `$\\Delta = (${b})^2 - 4(${a})(${c}) = ${b * b} ${fourAC < 0 ? '+' : '-'} ${fourACabs} = ${disc}$`;

    const infReason = `infinitely many solutions occur only for an equation that is true for every value of $x$, but an equation with a nonzero $x^2$ term has at most two solutions`;
    let zeroReason = '', oneReason = '', twoReason = '', conclusion = '';
    if (kind === 'zero') {
      conclusion = `Since $\\Delta < 0$, the equation has zero distinct real solutions.`;
      oneReason = `exactly one real solution requires $\\Delta = 0$, but $\\Delta = ${disc}$`;
      twoReason = `exactly two results from using $q^2 + 4pr$ instead of $q^2 - 4pr$: $${b * b} + ${fourACabs} = ${b * b + fourACabs}$ is positive, but the correct value is $${disc}$`;
    } else if (kind === 'one') {
      // gcd(m, n) = 1 by the redraw loop, so n/m is already reduced.
      const root = m === 1 ? `${n}` : `\\frac{${n}}{${m}}`;
      const square = `${k === 1 ? '' : k}(${m === 1 ? '' : m}x - ${n})^2`;
      conclusion = `Since $\\Delta = 0$, the equation has exactly one distinct real solution. Indeed, the left side equals $${square}$, which is zero only at $x = ${root}$.`;
      zeroReason = `zero results from squaring $${b}$ as $-${b * b}$ instead of $${b * b}$, which gives $-${b * b} - ${fourACabs} = ${-b * b - fourACabs}$, a negative discriminant`;
      twoReason = `exactly two counts the repeated root twice, but $\\Delta = 0$ means both roots equal the same number, so there is only one distinct solution`;
    } else {
      conclusion = `Since $\\Delta > 0$, the equation has exactly two distinct real solutions.`;
      zeroReason = `zero results from ignoring the negative sign of the constant term: $${b * b} - 4(${a})(${Math.abs(c)}) = ${b * b - fourACabs}$ is negative, but the constant term is $${c}$, so the discriminant is $${disc}$`;
      oneReason = `exactly one real solution requires $\\Delta = 0$, but $\\Delta = ${disc}$`;
    }

    const optionsData = [
      { text: `Zero`, isCorrect: kind === 'zero', reason: zeroReason },
      { text: `Exactly one`, isCorrect: kind === 'one', reason: oneReason },
      { text: `Exactly two`, isCorrect: kind === 'two', reason: twoReason },
      { text: `Infinitely many`, isCorrect: false, reason: infReason }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The number of distinct real solutions of $px^2 + qx + r = 0$ is determined by the discriminant $\\Delta = q^2 - 4pr$. Here ${discLine}. ${conclusion} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `$${eq}$\n\nHow many distinct real solutions does the given equation have?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
