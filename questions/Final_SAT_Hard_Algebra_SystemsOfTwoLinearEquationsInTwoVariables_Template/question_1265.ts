import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1265
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions with denominator 2; integer coefficients scaled]
 * - Difficulty factors: [Complex fraction manipulation, no solution condition (parallel lines)]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [After clearing fractions, coefficients must be proportional but constants not]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_1265 = {
  metadata: {
    id: "1265",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Build the reduced standard forms FIRST, then render fractional displays
    // that provably reduce to them (this is what the original generator got
    // wrong: its display did not match the standard form it claimed).
    //
    //   Eq1 (standard form):  A1 x + B1 y = C1
    //   Eq2 (standard form):  A2 x + P  y = D2      (P is the unknown, = p)
    //
    // No solution  <=>  parallel & distinct:
    //   A2/A1 = P/B1        (coefficients proportional)
    //   D2/C1 != A2/A1      (constants NOT proportional).
    // Choose A2 = k*A1 so P = k*B1 is an integer.
    const A1 = getRandomInt(2, 5);
    const B1 = getRandomInt(3, 8);
    const C1 = getRandomInt(2, 9);
    const k = getRandomInt(2, 4);
    const A2 = A1 * k;
    const P = B1 * k;              // the value of p that makes the lines parallel

    // Constant for Eq2's standard form; must NOT be proportional (D2 != C1*k).
    const D2 = C1 * k + getRandomInt(1, 5);   // strictly > C1*k, so never proportional

    // ---- Eq1 display -----------------------------------------------------
    // Split the y-term across both sides so the solver must combine them.
    // Show:  \frac{B1}{2} y + \frac{2 A1}{2} x = \frac{C1}{1} - \frac{B1}{2} y
    //   LHS: (B1/2) y + A1 x ,  RHS: C1 - (B1/2) y
    //   => (B1/2 + B1/2) y + A1 x = C1  =>  A1 x + B1 y = C1   (as claimed)
    const eq1_text =
      `\\frac{${B1}}{2}y + \\frac{${2 * A1}}{2}x = \\frac{${C1}}{1} - \\frac{${B1}}{2}y`;

    // ---- Eq2 display -----------------------------------------------------
    // Show it with the unknown y-coefficient p on the right, constants split so
    // they combine to D2:
    //   \frac{2 A2}{2} x + \frac{e1}{2} = p y + \frac{e2}{2}
    //   with e1/2 + something... choose e2 - e1 = 2*D2 so that moving e1/2 left:
    //   A2 x - p y = (e2 - e1)/2 = D2.
    const e1 = getRandomInt(3, 9);
    const e2 = e1 + 2 * D2;   // => (e2 - e1)/2 = D2
    const eq2_text =
      `\\frac{${2 * A2}}{2}x + \\frac{${e1}}{2} = py + \\frac{${e2}}{2}`;
    //   Reduces to:  A2 x - p y = D2.
    //   Parallel to Eq1 (A1 x + B1 y = C1) needs the y-ratio to equal the
    //   x-ratio k:  (-p)/B1 = A2/A1 = k  =>  p = -k*B1 = -P.
    const answer = -P;   // value of p asked for (negative, since Eq2 has "= p y")

    return {
      questionText: `In the given system of equations, $p$ is a constant. If the system has no solution, what is the value of $p$? $$${eq1_text}$$ $$${eq2_text}$$`,
      figureCode: null,
      options: [],
      correctAnswer: answer.toString(),
      explanation: `A system of two linear equations has no solution when the lines are parallel (equal ratios of $x$- and $y$-coefficients) but distinct (a different ratio of the constants). Clear the fractions in each equation. In the first equation, combine the two $\\frac{${B1}}{2}y$ terms: $\\frac{${B1}}{2}y + \\frac{${2 * A1}}{2}x = ${C1} - \\frac{${B1}}{2}y$ becomes $${A1}x + ${B1}y = ${C1}$. In the second equation, $\\frac{${2 * A2}}{2}x + \\frac{${e1}}{2} = py + \\frac{${e2}}{2}$ becomes $${A2}x - py = ${D2}$. The ratio of the $x$-coefficients is $\\frac{${A2}}{${A1}} = ${k}$, so for parallel lines the $y$-coefficients must satisfy $\\frac{-p}{${B1}} = ${k}$. Solving gives $-p = ${P}$, so $p = ${answer}$. The constants have ratio $\\frac{${D2}}{${C1}} \\neq ${k}$, so the lines are parallel but not identical and the system has no solution.`
    };
  }
};
