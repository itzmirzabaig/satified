import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1079
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [line: cy=d (like 2y=4.5), parabola: y=-ax²+bx, b is positive]
 * - Difficulty factors: [Horizontal line intersects parabola at exactly one point, discriminant = 0]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Horizontal line gives constant y, discriminant must be 0 for single intersection, b > 0]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1079 = {
  metadata: {
    id: "1079",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Answer-first construction: pick the parabola y = -a x^2 + b x with the
    // integer answer b, then build the tangent horizontal line from it.
    const a = getRandomInt(2, 5); // coefficient of x^2 (displayed negated)
    const b = getRandomInt(3, 9); // the positive constant students solve for

    // Tangency: y = k meets y = -ax^2 + bx once  ⇔  ax^2 - bx + k = 0 has
    // discriminant b^2 - 4ak = 0  ⇔  k = b^2/(4a).
    // Present the line as (lineC)y = (lineD) using the reduced integer form
    // of b^2/(4a), so every displayed value is an integer (no float artifacts).
    const gcd = (m: number, n: number): number => (n === 0 ? m : gcd(n, m % n));
    const g = gcd(b * b, 4 * a);
    let lineC = (4 * a) / g;
    let lineD = (b * b) / g;
    if (lineC === 1) { lineC = 2; lineD *= 2; } // keep the "cy = d" form when k is an integer

    // k = lineD/lineC exactly; lineC divides 4a, so 4a·k = (4a/lineC)·lineD = b².
    const kIsInt = lineD % lineC === 0;
    const kTex = kIsInt ? `${lineD / lineC}` : `\\frac{${lineD}}{${lineC}}`;

    return {
      questionText: `In the $xy$-plane, the line with equation $\\,${lineC}y=${lineD}$ intersects the parabola with equation $y=-${a}x^2+bx$, where $b$ is a positive constant, at exactly one point. What is the value of $b$?`,
      figureCode: null,
      options: null,
      correctAnswer: b.toString(),
      explanation: `The correct answer is $\\,${b}$. Dividing both sides of the line's equation by $\\,${lineC}$ shows that the line is horizontal: $y=${kTex}$. Substituting $\\,${kTex}$ for $y$ in the parabola's equation gives $\\,${kTex}=-${a}x^2+bx$, which can be rewritten as $\\,${a}x^2-bx+${kTex}=0$. The line and the parabola intersect at exactly one point precisely when this quadratic equation has exactly one solution, which happens when its discriminant is zero: $b^2-4(${a})\\left(${kTex}\\right)=b^2-${b * b}=0$. Therefore $b^2=${b * b}$, and since $b$ is positive, $b=${b}$.`
    };
  }
};
