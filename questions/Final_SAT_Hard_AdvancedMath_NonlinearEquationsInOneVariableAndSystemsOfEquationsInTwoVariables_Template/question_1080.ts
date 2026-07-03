import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1080
 *
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Rational Equations
 * - Difficulty: Hard
 * - Logic: Solve rational equation with common denominator. Check for extraneous solutions.
 * - Form: A/(x^2-p^2) - (Bx+C)/(x^2-p^2) = (x+p)/(x^2-p^2)
 * - Solution: Linear equation resulting from numerators, checking denom != 0.
 */

export const generator_1080 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // 1. Setup Parameters
    // Denominator is x^2 - p^2, so x = p and x = -p are excluded values.
    const p = getRandomInt(3, 6);
    const pSq = p * p;

    // 2. Determine Target Solution (x = num/den, integer or half)
    // Construct the candidate pool so |x| can NEVER equal p (no retry needed).
    const candidates: Array<[number, number]> = [];
    for (const num of [1, -1, 3, -3, 5]) {
      for (const den of [1, 2]) {
        if (Math.abs(num / den) !== p) candidates.push([num, den]);
      }
    }
    const [targetNumerator, targetDenominator] = getRandomElement(candidates);
    const targetX = targetNumerator / targetDenominator;

    // 3. Work Backwards to find coefficients
    // Equation: A/(x^2-p^2) - (Bx+C)/(x^2-p^2) = (x+p)/(x^2-p^2)
    // Clearing the denominator: A - (Bx + C) = x + p
    //   => A - C - p = (B + 1)x  =>  x = (A - C - p)/(B + 1)
    // Pick B so (B+1)*targetX is an integer:
    // if target denominator is 2, make B odd so B+1 is even.
    const B = targetDenominator === 2
      ? getRandomElement([1, 3, 5])
      : getRandomInt(2, 5);

    // Need A - C = targetX*(B+1) + p; pick a nonzero C that keeps A nonzero.
    const rhsVal = targetX * (B + 1) + p; // always an integer by construction
    const cPool = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].filter(c => rhsVal + c !== 0);
    const C = getRandomElement(cPool);
    const A = rhsVal + C;

    // 4. Formatting
    const formatPoly = (coef: number, constant: number) => {
      const sign = constant >= 0 ? '+' : '-';
      return `${coef}x ${sign} ${Math.abs(constant)}`;
    };

    const fractionX = targetDenominator === 1
      ? `${targetNumerator}`
      : `\\frac{${targetNumerator}}{${targetDenominator}}`;

    const equation = `$$
    \\frac{${A}}{x^2 - ${pSq}} - \\frac{${formatPoly(B, C)}}{x^2 - ${pSq}} = \\frac{x + ${p}}{x^2 - ${pSq}}
    $$`;

    // 5. Options (each is guaranteed distinct for every draw:
    //    |targetX| != p by construction, so targetX and -targetX can never
    //    equal p or -p, and targetX != -targetX since targetX != 0.)
    type Opt = { text: string; isCorrect: boolean };
    const optCorrect: Opt = {
      text: targetDenominator === 1 ? `$${targetNumerator}$` : `$\\frac{${targetNumerator}}{${targetDenominator}}$`,
      isCorrect: true
    };
    const optExtraneous1: Opt = { text: `$${p}$`, isCorrect: false };   // makes denominator zero
    const optExtraneous2: Opt = { text: `$${-p}$`, isCorrect: false };  // makes denominator zero
    const optSignError: Opt = {
      text: targetDenominator === 1 ? `$${-targetNumerator}$` : `$\\frac{${-targetNumerator}}{${targetDenominator}}$`,
      isCorrect: false
    };

    const shuffledOptions = shuffle<Opt>([optCorrect, optExtraneous1, optExtraneous2, optSignError]);
    const letterOf = (opt: Opt) => String.fromCharCode(65 + shuffledOptions.indexOf(opt));
    const correctLetter = letterOf(optCorrect);

    // 6. Explanation (all numbers computed from the live variables above)
    const constantLHS = A - C - p;   // left side after collecting constants
    const coeffRHS = B + 1;          // x-coefficient after collecting x terms
    const distributeStep = `${A} - ${B}x ${C >= 0 ? '-' : '+'} ${Math.abs(C)} = x + ${p}`;
    const finalStep = (coeffRHS === targetDenominator && constantLHS === targetNumerator)
      ? `$$ x = ${fractionX} $$`
      : `$$ x = \\frac{${constantLHS}}{${coeffRHS}} = ${fractionX} $$`;

    return {
      questionText: `What value of $x$ satisfies the equation below?\n${equation}`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: optCorrect.text,
      explanation: `
        Every term has the same denominator, $x^2 - ${pSq}$, which equals zero when $x = ${p}$ or $x = ${-p}$; those values must be excluded. Multiplying both sides of the equation by $x^2 - ${pSq}$ leaves an equation of the numerators:
        $$ ${A} - (${formatPoly(B, C)}) = x + ${p} $$
        Distribute the negative sign:
        $$ ${distributeStep} $$
        Combine the constants on the left side:
        $$ ${A - C === 0 ? `-${B}x` : `${A - C} - ${B}x`} = x + ${p} $$
        Collect the $x$ terms on the right side and the constants on the left side:
        $$ ${constantLHS} = ${coeffRHS}x $$
        Divide both sides by ${coeffRHS}:
        ${finalStep}
        Because this value is neither ${p} nor ${-p}, it does not make a denominator zero, so it is not extraneous. Choice ${correctLetter} is correct.
        Choice ${letterOf(optExtraneous1)} is incorrect because $x = ${p}$ makes each denominator zero, so it cannot be a solution. Choice ${letterOf(optExtraneous2)} is incorrect because $x = ${-p}$ also makes each denominator zero. Choice ${letterOf(optSignError)} is incorrect because it results from a sign error when distributing the negative sign across the second numerator.
      `
    };
  }
};
