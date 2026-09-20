import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1241
 * Skill: Systems Of Two Linear Equations In Two Variables
 * Difficulty: Hard
 *
 * Intent (from original analysis):
 * - System in variables w and r with a constant p.
 * - The system has NO SOLUTION -> the two lines are parallel but distinct.
 * - Fill-in-the-blank: find the value of p.
 *
 * Math:
 *   eq1:  p*w - den*r = b1
 *   eq2:  num*w - den*r = c2
 *   Both equations share the r-coefficient (-den), so parallel-lines
 *   requires the w-coefficients to match: p/num = (-den)/(-den) = 1  =>  p = num.
 *   Distinct (no solution, not infinitely many) requires b1 != c2, which is
 *   guaranteed by constructing c2 = b1 + positive offset.
 *
 * Fixes vs. corrupted original:
 * - Repaired import path (../../study/types).
 * - eq1 now shows the literal symbol p (was hard-coded to the numeric answer).
 * - Removed the SVG figure per review — the system is stated in the stem as
 *   display math, so the question remains fully answerable; the graph-building
 *   code went with it.
 * - Removed dangling duplicate comment block at end of file.
 */

export const generator_1241 = {
  metadata: {
    id: "1241",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Shared r-coefficient (den) forces p = num for parallel lines.
    const den = getRandomInt(5, 9);
    const num = getRandomInt(8, 15);   // coefficient of w in eq2  => p = num
    const p_answer = num;

    // Constants: keep them distinct so the lines are parallel-but-not-identical
    // (no solution). Constructing c2 above b1 guarantees b1 !== c2.
    const b1 = getRandomInt(2, 6);
    const c2 = b1 + getRandomInt(4, 9); // c2 in [6, 15], always > b1

    const eq1 = `pw - ${den}r = ${b1}`;
    const eq2 = `${num}w - ${den}r = ${c2}`;

    return {
      questionText: `In the given system of equations, $p$ is a constant. If the system has no solution, what is the value of $p$? $$${eq1}$$ $$${eq2}$$`,
      figureCode: null,
      options: [],
      correctAnswer: p_answer.toString(),
      explanation: `For a system of two linear equations to have no solution, the lines must be parallel: the $w$- and $r$-coefficients are proportional while the constants are not. Both equations already have the same $r$-coefficient $(-${den})$, so the $w$-coefficients must be equal as well. Setting $\\frac{p}{${num}} = \\frac{-${den}}{-${den}} = 1$ gives $p = ${p_answer}$. With $p = ${p_answer}$ the two equations are $${num}w - ${den}r = ${b1}$ and $${num}w - ${den}r = ${c2}$, which are parallel and distinct (since $${b1} \\ne ${c2}$), so the system has no solution.`
    };
  }
};