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
    // Since the x-exponent is negative it moves to the denominator with a
    // positive exponent; the y-exponent is positive so y stays on top.
    const correctAnswer = `$\\frac{${renderPow('y', yNum, yDen)}}{${renderPow('x', xMagNum, xMagDen)}}$`;

    // STEP 4: Build distractors from well-defined WRONG error patterns.
    // Each is stored as {yN,yD,xN,xD} (all exponents positive, y over x) so
    // we can guard against collisions numerically before rendering.
    type Frac = { n: number; d: number };
    const cNorm = (num: number, den: number): Frac => {
      const r = reduceFrac(Math.abs(num), Math.abs(den));
      return { n: r.num, d: r.den };
    };
    const correctKey = {
      y: cNorm(yNum, yDen),
      x: cNorm(xMagNum, xMagDen)
    };
    const keyStr = (k: { y: Frac; x: Frac }) => `${k.y.n}/${k.y.d}|${k.x.n}/${k.x.d}`;

    // Distractor A: sign error on x in the denominator — treats x^{-A} as x^{+A}
    //   so x-exponent = A - C/D = (A*D - C)/D. If that is positive, x stays in
    //   the denominator with that exponent; if negative/zero we fall through to
    //   another pattern below via the collision guard.
    const dxA = reduceFrac(A * D - C, D);
    // Distractor B: forgets to add the +G from the negative y exponent —
    //   uses y-exponent = E/F only, and correct x.
    const dyB = reduceFrac(E, F);
    // Distractor C: adds instead of subtracts the denominator x-exponent —
    //   x-exponent magnitude = A + ... but drops the /D denominator wrongly to
    //   A + C (integer). Combined with correct y.
    // Distractor D (fallback pool): swaps numerator/denominator sizes.
    const candidateKeys: Array<{ y: Frac; x: Frac }> = [];

    // Pattern 1: x sign error (only if it yields a positive x-exponent).
    if (dxA.num > 0) {
      candidateKeys.push({ y: cNorm(yNum, yDen), x: cNorm(dxA.num, dxA.den) });
    }
    // Pattern 2: dropped the +G on y.
    candidateKeys.push({ y: cNorm(dyB.num, dyB.den), x: cNorm(xMagNum, xMagDen) });
    // Pattern 3: x-exponent treated as integer A + C.
    candidateKeys.push({ y: cNorm(yNum, yDen), x: cNorm(A + C, 1) });
    // Pattern 4: y dropped-G AND x integer error (compound).
    candidateKeys.push({ y: cNorm(dyB.num, dyB.den), x: cNorm(A + C, 1) });
    // Pattern 5: x magnitude uses den D only on the fractional part but adds
    //   A as if same denominator: (A + C)/D.
    candidateKeys.push({ y: cNorm(yNum, yDen), x: cNorm(A + C, D) });
    // Pattern 6: y-exponent uses E/F + G but reduced against wrong denom -> E+G over F wrong: (E+G)/F
    candidateKeys.push({ y: cNorm(E + G, F), x: cNorm(xMagNum, xMagDen) });

    // Select three distinct distractors that do not collide with the correct
    // answer or with each other (bounded, deterministic order + shuffle).
    const seen = new Set<string>([keyStr(correctKey)]);
    const chosen: Array<{ y: Frac; x: Frac }> = [];
    for (const k of shuffle(candidateKeys)) {
      const s = keyStr(k);
      if (!seen.has(s)) {
        seen.add(s);
        chosen.push(k);
        if (chosen.length === 3) break;
      }
    }
    // Safety net: if we somehow have < 3 distinct distractors, synthesize
    // guaranteed-distinct ones by bumping the x-denominator exponent.
    let bump = 1;
    while (chosen.length < 3 && bump < 50) {
      const k = { y: cNorm(yNum, yDen), x: cNorm(xMagNum + bump, xMagDen) };
      const s = keyStr(k);
      if (!seen.has(s)) { seen.add(s); chosen.push(k); }
      bump++;
    }

    const renderKey = (k: { y: Frac; x: Frac }) =>
      `$\\frac{${renderPow('y', k.y.n, k.y.d)}}{${renderPow('x', k.x.n, k.x.d)}}$`;

    const optionsData = [
      { text: correctAnswer, isCorrect: true },
      { text: renderKey(chosen[0]), isCorrect: false, reason: "results from an arithmetic error when combining the exponents" },
      { text: renderKey(chosen[1]), isCorrect: false, reason: "results from mishandling the negative exponents in the quotient" },
      { text: renderKey(chosen[2]), isCorrect: false, reason: "results from an error in finding a common denominator for the exponents" }
    ];

    // STEP 5: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 6: Question text
    const questionText = `The expression $\\frac{x^{-${A}}y^{\\frac{${E}}{${F}}}}{x^{\\frac{${C}}{${D}}}y^{-${G}}}$, where $x > 1$ and $y > 1$, is equivalent to which of the following?`;

    // STEP 7: Explanation (every number computed from the live draw).
    const xCombinedNum = -A * D - C;      // over D, before reduction
    const yCombinedNumRaw = E + G * F;    // over F, before reduction

    const explanation = `Choice ${correctLetter} is correct. Apply the quotient rule $\\frac{a^{m}}{a^{n}} = a^{m-n}$ to the $x$ factors and the $y$ factors separately.

For $x$: $\\frac{x^{-${A}}}{x^{\\frac{${C}}{${D}}}} = x^{-${A} - \\frac{${C}}{${D}}} = x^{\\frac{${xCombinedNum}}{${D}}} = ${renderNegPow('x', xMagNum, xMagDen)}$

For $y$: $\\frac{y^{\\frac{${E}}{${F}}}}{y^{-${G}}} = y^{\\frac{${E}}{${F}} + ${G}} = y^{\\frac{${yCombinedNumRaw}}{${F}}} = ${renderPow('y', yNum, yDen)}$

Because the exponent on $x$ is negative, the $x$ factor moves to the denominator with a positive exponent, giving $\\frac{${renderPow('y', yNum, yDen)}}{${renderPow('x', xMagNum, xMagDen)}}$.

Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
