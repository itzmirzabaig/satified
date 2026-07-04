import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1250
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [proportional coefficients, ratio of parameters]
 * - Difficulty factors: [Infinitely many solutions condition, ratio of parameters]
 * - Distractor patterns: [None - fill in blank, fraction format]
 * - Constraints: [Coefficients must be proportional: A1/A2 = B1/B2 = C1/C2]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 *
 * FIXED (WRONG_ANSWER):
 * - The old version asked for g/k but NEITHER g nor k appeared anywhere in the
 *   rendered system (all coefficients were numeric) — the answer referenced
 *   phantom symbols. Worse, the "infinitely many solutions" premise was FALSE:
 *   the constant term used an unrelated random denominator, so the constant
 *   ratio never matched the coefficient ratio -> the lines were parallel and
 *   distinct (NO solution), making the premise impossible.
 *   Root fix: rebuilt so g and k are GENUINE symbols — the x- and y-coefficients
 *   of the second equation. The first equation has known integer coefficients,
 *   and the second equation is an exact scalar multiple t of the first
 *   (g = t*A, k = t*B, RHS = t*C), so the system truly has infinitely many
 *   solutions and g/k = A/B (reduced) for every draw. Answer is a clean reduced
 *   fraction; stem tells the student to enter a fraction or decimal.
 */

export const generator_1250 = {
  metadata: {
    id: "1250",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;

    while (attempts < maxAttempts && !result) {
      attempts++;

      // First equation: A x + B y = C  (known integer coefficients).
      const A = getRandomInt(2, 6);
      const B = getRandomInt(2, 6);
      const C = getRandomInt(3, 12);

      // For infinitely many solutions the second equation must be an exact
      // scalar multiple t of the first:  g = t*A,  k = t*B,  RHS = t*C.
      const t = getRandomInt(2, 4);
      const g = t * A;
      const k = t * B;
      const rhs2 = t * C;

      // Answer g/k = (t*A)/(t*B) = A/B, reduced to lowest terms.
      const div = gcd(A, B);
      const gFinal = A / div;
      const kFinal = B / div;

      // Keep the answer a clean, non-trivial fraction (avoid g/k = 1 collisions
      // and avoid whole-number ratios so the "enter a fraction" framing fits).
      if (gFinal === kFinal) continue; // ratio would be 1
      const answer = `${gFinal}/${kFinal}`;

      const eq1 = `${A}x + ${B}y = ${C}`;
      const eq2 = `gx + ky = ${rhs2}`;

      // Show the reduction step only when A/B is not already in lowest terms.
      const ratioTeX = (div === 1)
        ? `\\frac{${A}}{${B}}`
        : `\\frac{${A}}{${B}} = \\frac{${gFinal}}{${kFinal}}`;

      result = {
        questionText: `In the given system of equations, $g$ and $k$ are constants. If the system has infinitely many solutions, what is the value of $\\frac{g}{k}$? Enter your answer as a fraction or decimal. $$${eq1}$$ $$${eq2}$$`,
        figureCode: null,
        options: [],
        correctAnswer: answer,
        explanation: `A system of two linear equations has infinitely many solutions only when the two equations represent the same line, so every coefficient of the second equation is the same multiple of the corresponding coefficient of the first. Comparing the $x$- and $y$-coefficients gives $\\frac{g}{${A}} = \\frac{k}{${B}}$, which rearranges to $\\frac{g}{k} = ${ratioTeX}$. Here the second equation is exactly ${t} times the first, since $g = ${t} \\times ${A} = ${g}$, $k = ${t} \\times ${B} = ${k}$, and $${rhs2} = ${t} \\times ${C}$. Therefore $\\frac{g}{k} = \\frac{${gFinal}}{${kFinal}}$.`
      };
    }

    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }

    return result;
  }
};
