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
    let a = getRandomInt(2, 6);
    let n = getRandomInt(3, 7);
    let m = getRandomInt(2, 5);
    let p = getRandomInt(2, 5);
    let b = getRandomInt(2, 6);

    // Expanded coefficients of (a x + m)(n x^2 - b x + p):
    //   = a n x^3 + (-a b + m n) x^2 + (a p - m b) x + m p
    let coeffX2 = -a * b + m * n;
    let coeffX1 = a * p - m * b;

    // Guard: avoid zero x^2 / x coefficients so the shown polynomial never
    // renders a "+0x^2" or "+0x" term. Bounded retries.
    let tries = 0;
    while ((coeffX2 === 0 || coeffX1 === 0) && tries++ < 50) {
      a = getRandomInt(2, 6);
      n = getRandomInt(3, 7);
      m = getRandomInt(2, 5);
      p = getRandomInt(2, 5);
      b = getRandomInt(2, 6);
      coeffX2 = -a * b + m * n;
      coeffX1 = a * p - m * b;
    }

    const cubicCoeff = a * n;     // x^3 coefficient (shown)
    const constant = m * p;       // constant term (shown)

    // Correct answer: a * b (computed live).
    const correctAnswer = (a * b).toString();

    // STEP 2: Sign/magnitude helpers for the RHS terms.
    const absCoeffX2 = Math.abs(coeffX2);
    const signCoeffX2 = coeffX2 >= 0 ? '+' : '-';
    const absCoeffX1 = Math.abs(coeffX1);
    const signCoeffX1 = coeffX1 >= 0 ? '+' : '-';

    // STEP 3: Build question text. a and b appear as literal symbols; the
    // second factor is (n x^2 - b x + p) with b symbolic.
    const questionText = `The equation $(ax+${m})(${n}x^{2}-bx+${p})=${cubicCoeff}x^{3}${signCoeffX2}${absCoeffX2}x^{2}${signCoeffX1}${absCoeffX1}x+${constant}$ is true for all $x$, where $a$ and $b$ are constants. What is the value of $ab$?`;

    // STEP 4: Explanation — derive a and b from the VISIBLE coefficients.
    // a from the x^3 coefficient, b from the x^2 coefficient.
    const explanation = `Expand the left side and match coefficients with the right side, since the equation is true for all $x$.

Expanding $(ax+${m})(${n}x^{2}-bx+${p})$ gives:
$$(${n}a)x^{3} + (${m}\\cdot${n} - ab)x^{2} + (${p}a - ${m}b)x + ${m}\\cdot${p}$$

Compare the $x^{3}$ coefficients: $a \\cdot ${n} = ${cubicCoeff}$, so $a = ${a}$.

Compare the $x^{2}$ coefficients: $${m} \\cdot ${n} - ab = ${coeffX2}$, so $${m * n} - ${a}b = ${coeffX2}$, giving $${a}b = ${m * n - coeffX2}$ and $b = ${b}$.

Therefore, $ab = ${a} \\times ${b} = ${correctAnswer}$.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
