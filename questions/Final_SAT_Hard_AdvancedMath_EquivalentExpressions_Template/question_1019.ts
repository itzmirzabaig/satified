import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1019
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: small integers, constants: small integers]
 * - Difficulty factors: [Polynomial expansion, coefficient comparison, system of equations]
 * - Distractor patterns: [Wrong products, wrong signs, partial solutions]
 * - Constraints: [Equation must hold for all x, so coefficients must match exactly]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic manipulation only]
 *
 * FORM (mirrors the real SAT item):
 *   (a x + m)(n x^2 - b x + p) = [cubic]x^3 + [c2]x^2 + [c1]x + [c0]
 * where m, n, p and the right-hand coefficients are shown as NUMBERS and
 * a, b are the unknown CONSTANTS the student must find. The student recovers
 *   a = cubic / n            (from the x^3 coefficient)
 *   b = (m n - c2) / a       (from the x^2 coefficient)
 * and reports ab. Both a and b are uniquely determined by the visible
 * equation, so the question is well-posed for every draw.
 */

export const generator_1019 = {
  metadata: {
    id: "1019",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate the underlying (true) values. a and b stay symbolic in
    // the stem; m, n, p and the expanded coefficients are shown as numbers.
    let a = 0, n = 0, m = 0, p = 0, b = 0, coeffX2 = 0, coeffX1 = 0;

    // Before: only zero coefficients were blocked, so the stem could show
    // "+1x^{2}" or "-1x". Now coefficients of magnitude 0 or 1 are redrawn.
    // The explanation also used markdown style lines and display math with
    // no "The correct answer is" opening.
    for (let tries = 0; tries < 500; tries++) {
      a = getRandomInt(2, 6);
      n = getRandomInt(3, 7);
      m = getRandomInt(2, 5);
      p = getRandomInt(2, 5);
      b = getRandomInt(2, 6);
      // Expanded coefficients of (a x + m)(n x^2 - b x + p):
      //   = a n x^3 + (-a b + m n) x^2 + (a p - m b) x + m p
      coeffX2 = -a * b + m * n;
      coeffX1 = a * p - m * b;
      if (Math.abs(coeffX2) > 1 && Math.abs(coeffX1) > 1) break;
      if (tries === 499) {
        // Known good fallback: x^2 coefficient 12 - 6 = 6, x coefficient 6 - 4 = 2
        a = 2; n = 4; m = 3; p = 3; b = 3;
        coeffX2 = -a * b + m * n;
        coeffX1 = a * p - m * b;
      }
    }

    const cubicCoeff = a * n;     // x^3 coefficient (shown)
    const constant = m * p;       // constant term (shown)

    // Correct answer: a * b (computed live).
    const correctAnswer = (a * b).toString();

    // STEP 2: Sign/magnitude helpers for the RHS terms.
    const signed = (c: number) => (c >= 0 ? `+${c}` : `-${Math.abs(c)}`);

    // STEP 3: Build question text.
    const questionText = `The equation $(ax+${m})(${n}x^{2}-bx+${p})=${cubicCoeff}x^{3}${signed(coeffX2)}x^{2}${signed(coeffX1)}x+${constant}$ is true for all $x$, where $a$ and $b$ are constants. What is the value of $ab$?`;

    // STEP 4: Explanation (one paragraph, inline math).
    const explanation = `The correct answer is ${correctAnswer}. Since the equation is true for all $x$, the coefficients of like terms on the two sides must be equal. Expanding the left side gives $${n}ax^{3} + (${m * n} - ab)x^{2} + (${p}a - ${m}b)x + ${constant}$. Matching the $x^{3}$ coefficients gives $${n}a = ${cubicCoeff}$, so $a = ${a}$. Matching the $x^{2}$ coefficients gives $${m * n} - ab = ${coeffX2}$, so $ab = ${m * n} - ${coeffX2 < 0 ? `(${coeffX2})` : coeffX2} = ${correctAnswer}$. (This gives $b = ${b}$, and the $x$ coefficient checks: $${p}(${a}) - ${m}(${b}) = ${coeffX1}$.)`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
