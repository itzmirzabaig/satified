import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1154
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-3, 21, 84 (coefficients)]
 * - Difficulty factors: [No solution condition with parameter p]
 * - Constraints: [Coefficient of x must be 0, constant must be non-zero]
 * - Question type: [Equation -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: a*x + b*p*x = c  =>  x*(a + b*p) = c.
 * With c != 0 the equation has NO solution iff the coefficient of x is 0,
 * i.e. a + b*p = 0  =>  p = -a/b. Since a in [-8,-2] and b in [10,30],
 * p = (-a)/b is a positive proper fraction (numerator in [2,8] < denominator).
 *
 * Previously two choices were a random fraction and a random integer, and the
 * explanation used a bulleted list. Every wrong choice is now a real slip.
 */

export const generator_1154 = {
  metadata: {
    id: "1154",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));
    // Reduced fraction with the sign in front; a whole number when it reduces to one.
    const frac = (n: number, d: number): string => {
      const sign = n * d < 0 ? '-' : '';
      const g = gcd(Math.abs(n), Math.abs(d));
      const rn = Math.abs(n) / g;
      const rd = Math.abs(d) / g;
      return rd === 1 ? `${sign}${rn}` : `${sign}\\frac{${rn}}{${rd}}`;
    };

    // STEP 1: Draw coefficients, redrawing until all four choices differ in value.
    let a = 0, b = 0, c = 0;
    let correctP = '', signSlip = '', reciprocal = '', setToConstant = '';
    do {
      a = getRandomInt(-8, -2);   // negative coefficient of the bare x term
      b = getRandomInt(10, 30);   // coefficient attached to p
      c = getRandomInt(40, 100);  // non-zero constant on the right
      correctP = frac(-a, b);
      signSlip = frac(a, b);               // solves bp = a instead of bp = -a
      reciprocal = frac(b, -a);            // divides the wrong way
      setToConstant = frac(c - a, b);      // sets a + bp equal to c instead of 0
    } while (new Set([correctP, signSlip, reciprocal, setToConstant]).size < 4);

    const absA = Math.abs(a);
    const rawP = `\\frac{${absA}}{${b}}`;
    // Show the reduction step only when the raw fraction actually reduces.
    const pReductionStr = rawP === correctP ? correctP : `${rawP} = ${correctP}`;

    // STEP 2: Each wrong choice is a specific slip.
    const optionsData = [
      { text: correctP, isCorrect: true, reason: '' },
      {
        text: signSlip,
        isCorrect: false,
        reason: `$${signSlip}$ comes from a sign slip when isolating $p$, writing $${b}p = ${a}$ instead of $${b}p = ${absA}$`
      },
      {
        text: reciprocal,
        isCorrect: false,
        reason: `$${reciprocal}$ is the reciprocal of the correct value, from dividing $${b}$ by $${absA}$ instead of $${absA}$ by $${b}$`
      },
      {
        text: setToConstant,
        isCorrect: false,
        reason: `$${setToConstant}$ comes from setting the coefficient of $x$ equal to $${c}$ instead of $0$, and with that value $x = 1$ is a solution`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Factoring $x$ out of the left side of the given equation gives $x(${a} + ${b}p) = ${c}$. An equation of the form $kx = m$ with $m \\neq 0$ has no solution exactly when $k = 0$, because it then states that $0 = m$, which is false. Since $${c} \\neq 0$, the coefficient of $x$ must be zero, so $${a} + ${b}p = 0$. Adding $${absA}$ to both sides gives $${b}p = ${absA}$, and dividing both sides by $${b}$ gives $p = ${pReductionStr}$. With this value of $p$, the equation becomes $0 = ${c}$, which is false for every $x$, so the equation has no solution. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `$$${a}x + ${b}px = ${c}$$ In the given equation, $p$ is a constant. The equation has no solution. What is the value of $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctP,
      explanation: explanation
    };
  }
};
