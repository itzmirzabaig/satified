import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1258
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 24, 1, 6, 1, constants: 48, 72]
 * - Difficulty factors: [Large coefficients, subtraction elimination]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Solution must be clean integer]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two lines intersecting, point marked]
 *
 * REBUILD NOTES:
 * Answer-first construction. The solution (x_sol, y_sol) is chosen as clean
 * integers, and the two equations a1*x + y = c1, a2*x + y = c2 are built from
 * it (c1 = a1*x_sol + y_sol, c2 = a2*x_sol + y_sol). This guarantees a unique
 * integer solution for every draw with NO retry loop, so the generator can
 * never throw. Elimination by subtraction: (a1-a2)x = c1-c2, and a1 > a2 is
 * enforced so the subtracted x-coefficient is a positive integer.
 */

export const generator_1258 = {
  metadata: {
    id: "1258",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Answer-first: choose the integer solution, then derive the constants.
    const xSol = getRandomInt(2, 8);          // clean positive integer x
    const ySol = getRandomInt(10, 40);        // clean positive integer y

    // Two large leading coefficients with a1 > a2 (subtraction elimination).
    const a2 = getRandomInt(4, 9);
    const a1 = getRandomInt(a2 + 6, a2 + 18);  // guarantees a1 > a2 and a gap

    // Constants derived from the solution -> integer, self-consistent system.
    const c1 = a1 * xSol + ySol;
    const c2 = a2 * xSol + ySol;

    // Elimination bookkeeping (all integers by construction).
    const coeffDiff = a1 - a2;   // > 0
    const constDiff = c1 - c2;   // = coeffDiff * xSol

    const eq1 = `${a1}x + y = ${c1}`;
    const eq2 = `${a2}x + y = ${c2}`;

    return {
      questionText:
        `The solution to the given system of equations is $(x,\\ y)$. ` +
        `What is the value of $y$?\n\n$${eq1}$\n\n$${eq2}$`,
      figureCode: null,
      options: [],
      correctAnswer: ySol.toString(),
      explanation:
        `Subtract the second equation from the first to eliminate $y$: ` +
        `$(${a1} - ${a2})x = ${c1} - ${c2}$, which is $${coeffDiff}x = ${constDiff}$, ` +
        `so $x = ${xSol}$. Substitute $x = ${xSol}$ into the second equation: ` +
        `$${a2}(${xSol}) + y = ${c2}$, giving $${a2 * xSol} + y = ${c2}$, ` +
        `so $y = ${ySol}$.`
    };
  }
};
