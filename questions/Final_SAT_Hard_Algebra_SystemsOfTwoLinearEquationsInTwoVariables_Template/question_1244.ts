import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1244
 * Skill: Systems Of Two Linear Equations In Two Variables
 * Difficulty: Hard
 *
 * Intent: A system of two linear equations in x and y where the second
 * equation contains a constant parameter r. The system has NO solution, so
 * the two lines are parallel (equal slopes) but distinct (different
 * intercepts). Solve for r. Fill-in-the-blank.
 *
 * Rebuild notes (was IMPORT_FAIL):
 * - Original figure used nested IIFEs with a corrupted expression
 *   (`const y = ((num);`) that failed to parse — rebuilt as a plain SVG
 *   template literal drawing the two ACTUAL parallel lines.
 * - Original answer (r = -2*den) was mathematically wrong; the slope-match
 *   condition gives r = 4*den. Re-derived below.
 * - Removed the SVG figure per review — the system is stated in the stem as
 *   display math, so the question remains fully answerable; the graph-building
 *   code went with it.
 */

export const generator_1244 = {
  metadata: {
    id: "1244",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Slope of both lines is num/den.
    const num = getRandomInt(2, 6);   // 2..6
    const den = getRandomInt(2, 5);   // 2..5
    const b1 = getRandomInt(1, 5);    // eq1 constant driver (positive)
    const c2 = getRandomInt(1, 5);    // eq2 constant (positive)

    // Displayed system:
    //   eq1:  (2*num)x - (2*den)y = 2*b1   ->  y = (num/den)x - (b1/den),  slope num/den
    //   eq2:  -(4*num)x + r*y = c2         ->  y = (4*num/r)x + (c2/r),    slope 4*num/r
    // No solution => slopes equal and lines distinct.
    //   num/den = 4*num/r  =>  r = 4*den   (num != 0 always).
    // Distinctness: intercepts differ because -b1/den < 0 < c2/(4*den) for all
    // draws (b1, c2 > 0), so the lines are never identical -> exactly one
    // "no solution" case for every draw. GCD/collision guards unnecessary.
    const r_answer = 4 * den;

    const a1 = 2 * num;   // >= 4
    const b1coef = 2 * den; // >= 4
    const c1 = 2 * b1;    // >= 2
    const a2 = 4 * num;   // >= 8

    const eq1 = `${a1}x - ${b1coef}y = ${c1}`;
    const eq2 = `-${a2}x + ry = ${c2}`;

    return {
      questionText: `In the given system of equations, $r$ is a constant. If the system has no solution, what is the value of $r$? $$\\begin{aligned} ${eq1} \\\\ ${eq2} \\end{aligned}$$`,
      figureCode: null,
      options: [],
      correctAnswer: r_answer.toString(),
      explanation: `A linear system has no solution when the two lines are parallel but distinct: the slopes are equal while the $y$-intercepts differ. Solving the first equation for $y$ gives $y = \\frac{${num}}{${den}}x - \\frac{${b1}}{${den}}$, so its slope is $\\frac{${num}}{${den}}$. Solving the second equation for $y$ gives $y = \\frac{${a2}}{r}x + \\frac{${c2}}{r}$, so its slope is $\\frac{${a2}}{r}$. Setting the slopes equal gives $\\frac{${num}}{${den}} = \\frac{${a2}}{r}$, and cross-multiplying gives $r \\cdot ${num} = ${a2} \\cdot ${den}$, so $r = \\frac{${a2} \\cdot ${den}}{${num}} = ${r_answer}$. With $r = ${r_answer}$ the two $y$-intercepts are $-\\frac{${b1}}{${den}}$ and $\\frac{${c2}}{${r_answer}}$, which are unequal, so the lines are parallel and distinct and the system has no solution.`
    };
  }
};