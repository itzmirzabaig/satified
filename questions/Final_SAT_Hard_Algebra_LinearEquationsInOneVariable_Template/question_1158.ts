import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1158
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2-12, constant: 2-12, a, b (parameters)]
 * - Difficulty factors: [No solution conditions with multiple statements to evaluate]
 * - Constraints: [a = coefficient necessary, b != const/coefficient necessary, b = const not necessary]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Previously the answer was always "I and III only", the fraction const/coeff
 * was never reduced (b != 6/3), wrong choices had no reasons, and the
 * explanation used markdown. The three statements are now shuffled into the
 * labels I, II, III so the answer changes between draws.
 */

export const generator_1158 = {
  metadata: {
    id: "1158",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));

    // Equation: coeff*x + constVal = a(x + b)
    const coeff = getRandomInt(2, 12);
    const constVal = getRandomInt(2, 12);

    // b must differ from constVal/coeff, written in lowest terms.
    const g = gcd(constVal, coeff);
    const bBad = coeff / g === 1 ? `${constVal / g}` : `\\frac{${constVal / g}}{${coeff / g}}`;

    // STEP 1: Shuffle the three statements into the labels I, II, III.
    const statements = shuffle([
      { key: 'coef', tex: `a = ${coeff}` },
      { key: 'example', tex: `b = ${constVal}` },
      { key: 'const', tex: `b \\neq ${bBad}` }
    ]);
    const labels = ['I', 'II', 'III'];
    const labelOf = (key: string): string => labels[statements.findIndex(s => s.key === key)];
    const pair = (k1: string, k2: string): string => {
      const [x, y] = [labelOf(k1), labelOf(k2)].sort((p, q) => labels.indexOf(p) - labels.indexOf(q));
      return `${x} and ${y} only`;
    };

    const lCoef = labelOf('coef');
    const lExample = labelOf('example');
    const lConst = labelOf('const');
    const correctText = pair('coef', 'const');

    // STEP 2: Each wrong choice is a specific slip.
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      {
        text: 'None',
        isCorrect: false,
        reason: `none overlooks that an equation with no solutions must have the same coefficient of $x$ on both sides, so statement ${lCoef} must be true`
      },
      {
        text: `${lCoef} only`,
        isCorrect: false,
        reason: `${lCoef} only forgets that the constant terms must also differ: if $b = ${bBad}$, both sides become $${coeff}x + ${constVal}$ and the equation has infinitely many solutions, so statement ${lConst} must be true`
      },
      {
        text: pair('coef', 'example'),
        isCorrect: false,
        reason: `${pair('coef', 'example')} treats $b = ${constVal}$, one value of $b$ that works, as required, even though any value other than $${bBad}$ works, and it leaves out statement ${lConst}, which must be true`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Distributing the right side of the equation gives $${coeff}x + ${constVal} = ax + ab$. A linear equation has no solutions when the coefficients of $x$ on the two sides are equal and the constant terms are different. The coefficients of $x$ must be equal, so $a = ${coeff}$, and statement ${lCoef} must be true. With $a = ${coeff}$, the constant term on the right side is $${coeff}b$, and it must differ from $${constVal}$. So $${coeff}b \\neq ${constVal}$, which means $b \\neq ${bBad}$, and statement ${lConst} must be true. Statement ${lExample} says $b = ${constVal}$. That value makes the right side $${coeff}x + ${coeff * constVal}$, so the equation has no solutions, but $b$ could be any other value except $${bBad}$, so statement ${lExample} need not be true. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The equation $${coeff}x + ${constVal} = a(x + b)$, where $a$ and $b$ are constants, has no solutions. Which of the following must be true?\n\n${statements.map((s, i) => `${labels[i]}. $${s.tex}$`).join('\n')}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
