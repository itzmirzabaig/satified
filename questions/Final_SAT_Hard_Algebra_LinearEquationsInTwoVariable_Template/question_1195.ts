import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1195
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: a in [3,12], b in [-15,-5], c in [10,30], translate down [2,6]]
 * - Difficulty factors: [Translation down k units affects y, find new x-intercept]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Translation down k: replace y with y+k in ax+by=c, giving ax+by = c - b*k]
 * - Question type: [Text -> Fill in blank]
 * - Figure generation: [None]
 *
 * FIXES:
 *  1. FILLIN_FORMAT: the fill-in correctAnswer is now a plain integer or an
 *     "a/b" string (no LaTeX), so the grader accepts what a student types. The
 *     \frac{} rendering is kept for the explanation's $...$ math only.
 *  2. Question text tells the student to enter a fraction or decimal.
 *  3. Integer-only arithmetic; answer reduced to lowest terms. Because b < 0,
 *     newC = c - b*k = c + |b|*k > 0 for every draw, so the intercept is a
 *     positive value and the sign never lands on the denominator.
 */

export const generator_1195 = {
  metadata: {
    id: "1195",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);

    // STEP 1: Generate random values
    const a = getRandomInt(3, 12);
    const b = -getRandomInt(5, 15); // Negative as in original: b in [-15, -5]
    const c = getRandomInt(10, 30);
    const translation = getRandomInt(2, 6);

    // STEP 2: Original ax + by = c, translated DOWN k units.
    // Down k replaces y with y + k: ax + b(y+k) = c  =>  ax + by = c - b*k.
    const newC = c - b * translation; // = c + |b|*translation > 0 always

    // STEP 3: New x-intercept (set y = 0): x = newC / a, reduced to lowest terms.
    const divisor = gcd(Math.abs(newC), a) || 1;
    const num = newC / divisor; // > 0
    const den = a / divisor;    // > 0

    const isInteger = den === 1;
    // Fill-in answer for the grader: plain integer or "a/b" (no LaTeX).
    const answerStr = isInteger ? `${num}` : `${num}/${den}`;
    // LaTeX-rendered form for use inside the explanation's $...$ math only.
    const answerTex = isInteger ? `${num}` : `\\frac{${num}}{${den}}`;

    // Signed constant added when distributing b*k, formatted for the chain.
    const shift = -b * translation;             // > 0
    const shiftTerm = ` + ${shift}`;            // b<0 so this is always "+ positive"

    // Show the raw intercept fraction, then the reduced form only when it
    // actually differs (avoids a redundant "= \frac{41}{9} = \frac{41}{9}").
    const rawFrac = `\\frac{${newC}}{${a}}`;
    const finalChain = divisor === 1 ? rawFrac : `${rawFrac} = ${answerTex}`;

    return {
      questionText: `The graph of $${a}x ${b}y = ${c}$ is translated down ${translation} units in the $xy$-plane. What is the $x$-coordinate of the $x$-intercept of the resulting graph? (Enter your answer as a fraction or decimal.)`,
      figureCode: null,
      options: [],
      correctAnswer: answerStr,
      explanation: `Translating the graph down ${translation} units replaces $y$ with $y+${translation}$, giving $${a}x ${b}(y+${translation}) = ${c}$. Distributing and simplifying gives $${a}x ${b}y = ${c}${shiftTerm} = ${newC}$. The $x$-intercept is where $y = 0$, so $${a}x = ${newC}$, which gives $x = ${finalChain}$.`
    };
  }
};
