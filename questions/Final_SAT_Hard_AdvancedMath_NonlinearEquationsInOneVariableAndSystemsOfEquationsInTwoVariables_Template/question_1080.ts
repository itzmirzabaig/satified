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
    // Fixed: B = 1 printed "1x"; the "sign error" choice was just the answer
    // negated, which no step of the solution produces; fractions showed a negative
    // numerator; the stem said "equation below"; the explanation was multiline and
    // did not lead with the correct choice. Wrong choices now come from real slips.
    const gcd = (m: number, n: number): number => (n === 0 ? m : gcd(n, m % n));
    const texFrac = (n: number, d: number): string => {
      const g = gcd(Math.abs(n), d);
      const nn = n / g;
      const dd = d / g;
      if (dd === 1) return `${nn}`;
      return `${nn < 0 ? '-' : ''}\\frac{${Math.abs(nn)}}{${dd}}`;
    };

    let p = 3, B = 2, C = 1, A = 1, rhsVal = 0, targetNumerator = 1, targetDenominator = 1;
    let values: number[] = [];
    do {
      // Denominator is x^2 - p^2, so x = p and x = -p are excluded values.
      p = getRandomInt(3, 6);

      // Target solution x = num/den (integer or half) with |x| != p.
      const candidates: Array<[number, number]> = [];
      for (const num of [1, -1, 3, -3, 5]) {
        for (const den of [1, 2]) {
          if (Math.abs(num / den) !== p) candidates.push([num, den]);
        }
      }
      [targetNumerator, targetDenominator] = getRandomElement(candidates);

      // Clearing the denominator: A - (Bx + C) = x + p, so x = (A - C - p)/(B + 1).
      // B >= 2 avoids "1x" and keeps B - 1 nonzero; an odd B makes B + 1 even
      // when the target is a half.
      B = targetDenominator === 2 ? getRandomElement([3, 5]) : getRandomInt(2, 5);
      rhsVal = (targetNumerator / targetDenominator) * (B + 1) + p; // integer by construction
      const cPool = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].filter(c => rhsVal + c !== 0 && c !== p);
      C = getRandomElement(cPool);
      A = rhsVal + C;

      values = [
        (A - C - p) / (B + 1), // correct
        (A + C - p) / (B + 1), // negative sign not distributed to C
        (A - C - p) / (B - 1), // x terms combined as (B - 1)x
        (A - C + p) / (B + 1)  // p added instead of subtracted
      ];
    } while (new Set(values.map(v => v.toFixed(6))).size < 4);

    const pSq = p * p;
    const constantLHS = A - C - p;
    const coeffRHS = B + 1;
    const poly = `${B}x${C > 0 ? '+' : '-'}${Math.abs(C)}`;
    const combined = rhsVal === 0 ? `-${B}x` : `${rhsVal}-${B}x`;
    const correctTex = texFrac(constantLHS, coeffRHS);
    const noDistTex = texFrac(A + C - p, B + 1);
    const xTermsTex = texFrac(constantLHS, B - 1);
    const signPTex = texFrac(rhsVal + p, B + 1);
    const bMinusOne = B - 1 === 1 ? '' : `${B - 1}`;

    const optionsData = [
      { text: `$${correctTex}$`, isCorrect: true, reason: '' },
      { text: `$${noDistTex}$`, isCorrect: false, reason: `$${noDistTex}$ results from distributing the negative sign only to $${B}x$, which gives $${A}-${B}x${C > 0 ? '+' : '-'}${Math.abs(C)}=x+${p}$` },
      { text: `$${xTermsTex}$`, isCorrect: false, reason: `$${xTermsTex}$ results from combining the $x$ terms as $${bMinusOne}x$ instead of $${coeffRHS}x$, which gives $${constantLHS}=${bMinusOne}x$` },
      { text: `$${signPTex}$`, isCorrect: false, reason: `$${signPTex}$ results from adding $${p}$ to both sides instead of subtracting it, which gives $${rhsVal + p}=${coeffRHS}x$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $x$ satisfies the given equation?\n\n$$\\frac{${A}}{x^2-${pSq}}-\\frac{${poly}}{x^2-${pSq}}=\\frac{x+${p}}{x^2-${pSq}}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. All three fractions have the denominator $x^2-${pSq}$, which equals $0$ when $x=${p}$ or $x=${-p}$, so those values cannot be solutions. Multiplying both sides of the equation by $x^2-${pSq}$ gives $${A}-(${poly})=x+${p}$. Distributing the negative sign gives $${A}-${B}x${C > 0 ? '-' : '+'}${Math.abs(C)}=x+${p}$, which simplifies to $${combined}=x+${p}$. Adding $${B}x$ to both sides and subtracting $${p}$ from both sides gives $${constantLHS}=${coeffRHS}x$. Dividing both sides by $${coeffRHS}$ gives $x=${correctTex}$. This value is neither $${p}$ nor $${-p}$, so it is a valid solution. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
