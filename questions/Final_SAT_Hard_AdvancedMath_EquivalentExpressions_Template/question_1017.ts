import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1017
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [negative and fractional exponents]
 * - Difficulty factors: [Exponent rules, combining exponents]
 * - Distractor patterns: [Wrong exponent arithmetic, sign errors, dropped terms]
 * - Constraints: [x > 1, y > 1]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 *
 * The expression is  x^{-A} y^{E/F} / ( x^{C/D} y^{-G} ).
 *   x-exponent = -A - C/D  (always negative)
 *   y-exponent = E/F + G   (always positive)
 * Both the correct answer and every distractor are computed LIVE from the
 * drawn exponents, rendered in a fraction-of-powers form that is exactly
 * equivalent to the expression for every possible draw.
 */

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, Math.abs(a % b)));

// Reduce a fraction to lowest terms, keeping the sign on the numerator.
function reduceFrac(num: number, den: number): { num: number; den: number } {
  const g = gcd(Math.abs(num), Math.abs(den)) || 1;
  let n = num / g;
  let d = den / g;
  if (d < 0) { n = -n; d = -d; }
  return { num: n, den: d };
}

// Render base^(num/den) with a positive exponent. Assumes num > 0, den > 0.
function renderPow(base: string, num: number, den: number): string {
  if (den === 1) {
    if (num === 1) return base;
    return `${base}^{${num}}`;
  }
  return `${base}^{\\frac{${num}}{${den}}}`;
}

// Render base^(-num/den) with a negative exponent, cleanly. num,den > 0.
function renderNegPow(base: string, num: number, den: number): string {
  if (den === 1) return `${base}^{-${num}}`;
  return `${base}^{-\\frac{${num}}{${den}}}`;
}

export const generator_1017 = {
  metadata: {
    id: "1017",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate exponents - all randomized.
    // Require the fractional exponents C/D and E/F to be genuine reduced
    // fractions (not integers, not unreduced like 4/2) so the stem always
    // shows clean fractional exponents. Bounded retries.
    const A = getRandomInt(1, 4);          // x^{-A} in numerator
    const G = getRandomInt(1, 3);          // y^{-G} in denominator

    let C = getRandomInt(1, 3);
    let D = getRandomInt(2, 4);
    let tries = 0;
    while (gcd(C, D) !== 1 && tries++ < 50) { C = getRandomInt(1, 3); D = getRandomInt(2, 4); }

    let E = getRandomInt(1, 3);
    let F = getRandomInt(2, 4);
    tries = 0;
    while (gcd(E, F) !== 1 && tries++ < 50) { E = getRandomInt(1, 3); F = getRandomInt(2, 4); }

    // STEP 2: Combine exponents (quotient rule).
    // x-exponent = -A - C/D = (-A*D - C)/D  -> always negative
    const xExp = reduceFrac(-A * D - C, D);           // xExp.num < 0
    // y-exponent = E/F + G = (E + G*F)/F              -> always positive
    const yExp = reduceFrac(E + G * F, F);            // yExp.num > 0

    // Magnitude of the x-exponent (for placing x in the denominator).
    const xMagNum = Math.abs(xExp.num);
    const xMagDen = xExp.den;
    const yNum = yExp.num;
    const yDen = yExp.den;

    // STEP 3: Build the correct answer as a fraction of powers.
    const correctAnswer = `$\\frac{${renderPow('y', yNum, yDen)}}{${renderPow('x', xMagNum, xMagDen)}}$`;

    // STEP 4: Distractors.
    // Before: every wrong choice was explained with a generic line ("an
    // arithmetic error when combining the exponents"), and some came from
    // made up patterns (x exponent A + C as an integer, a +1 "bump"
    // fallback). Now each candidate is a named slip with its own reason, and
    // the pool always holds at least three distinct values: the y slips and
    // the x slips change different parts of the answer, so they never match.
    type Frac = { n: number; d: number };
    type Key = { y: Frac; x: Frac; reason: string };
    const cNorm = (num: number, den: number): Frac => {
      const r = reduceFrac(Math.abs(num), Math.abs(den));
      return { n: r.num, d: r.den };
    };
    const keyStr = (k: { y: Frac; x: Frac }) => `${k.y.n}/${k.y.d}|${k.x.n}/${k.x.d}`;
    const texFrac = (f: Frac) => f.d === 1 ? `${f.n}` : `\\frac{${f.n}}{${f.d}}`;

    const candidates: Key[] = [];
    // Slip 1: adding the x exponents instead of subtracting, -A + C/D. Only
    // usable when that sum is negative, so x stays in the denominator.
    if (A * D - C > 0) {
      const x1 = cNorm(A * D - C, D);
      candidates.push({ y: cNorm(yNum, yDen), x: x1, reason: `this expression results from adding the exponents of $x$ instead of subtracting them, $-${A} + \\frac{${C}}{${D}} = -${texFrac(x1)}$` });
    }
    // Slip 2: writing A + C/D as (A + C)/D, adding A to the numerator only.
    const x2 = cNorm(A + C, D);
    candidates.push({ y: cNorm(yNum, yDen), x: x2, reason: `this expression results from writing $${A} + \\frac{${C}}{${D}}$ as $\\frac{${A} + ${C}}{${D}}$, so the exponent of $x$ becomes $-${texFrac(x2)}$ instead of $-${texFrac(cNorm(xMagNum, xMagDen))}$` });
    // Slip 3: ignoring the factor y^{-G} in the denominator.
    const y3 = cNorm(E, F);
    candidates.push({ y: y3, x: cNorm(xMagNum, xMagDen), reason: `this expression ignores the factor $y^{-${G}}$ in the denominator and keeps $y^{\\frac{${E}}{${F}}}$ unchanged` });
    // Slip 4: writing E/F + G as (E + G)/F, adding G to the numerator only.
    const y4 = cNorm(E + G, F);
    candidates.push({ y: y4, x: cNorm(xMagNum, xMagDen), reason: `this expression results from writing $\\frac{${E}}{${F}} + ${G}$ as $\\frac{${E} + ${G}}{${F}}$, so the exponent of $y$ becomes $${texFrac(y4)}$ instead of $${texFrac(cNorm(yNum, yDen))}$` });

    const correctKey = { y: cNorm(yNum, yDen), x: cNorm(xMagNum, xMagDen) };
    const seen = new Set<string>([keyStr(correctKey)]);
    const chosen: Key[] = [];
    for (const k of shuffle(candidates)) {
      const s = keyStr(k);
      if (!seen.has(s)) {
        seen.add(s);
        chosen.push(k);
        if (chosen.length === 3) break;
      }
    }

    const renderKey = (k: { y: Frac; x: Frac }) =>
      `$\\frac{${renderPow('y', k.y.n, k.y.d)}}{${renderPow('x', k.x.n, k.x.d)}}$`;

    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      ...chosen.map(k => ({ text: renderKey(k), isCorrect: false, reason: k.reason }))
    ];

    // STEP 5: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 6: Question text
    const questionText = `The expression $\\frac{x^{-${A}}y^{\\frac{${E}}{${F}}}}{x^{\\frac{${C}}{${D}}}y^{-${G}}}$, where $x > 1$ and $y > 1$, is equivalent to which of the following?`;

    // STEP 7: Explanation (one paragraph, every number from the live draw).
    // gcd(C, D) = 1 and gcd(E, F) = 1, so both combined fractions are
    // already in lowest terms with denominators D and F.
    const xLine = renderNegPow('x', xMagNum, xMagDen);
    const yLine = renderPow('y', yNum, yDen);

    const explanation = `Choice ${correctOption.letter} is correct. Apply the quotient rule $\\frac{a^{m}}{a^{n}} = a^{m-n}$ to the $x$ factors and the $y$ factors separately. For $x$: $\\frac{x^{-${A}}}{x^{\\frac{${C}}{${D}}}} = x^{-${A} - \\frac{${C}}{${D}}} = x^{-\\frac{${A * D}}{${D}} - \\frac{${C}}{${D}}} = ${xLine}$. For $y$: $\\frac{y^{\\frac{${E}}{${F}}}}{y^{-${G}}} = y^{\\frac{${E}}{${F}} + ${G}} = y^{\\frac{${E}}{${F}} + \\frac{${G * F}}{${F}}} = ${yLine}$. Because the exponent on $x$ is negative, the $x$ factor moves to the denominator with a positive exponent, giving $${correctAnswer.slice(1, -1)}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
