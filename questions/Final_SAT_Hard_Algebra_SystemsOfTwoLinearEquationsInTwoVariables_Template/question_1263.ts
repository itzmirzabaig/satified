import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1263
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, -6, 10, -2, constant: 2, fractions]
 * - Difficulty factors: [No solution with elimination, parameter in y coefficient]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [After elimination, y coefficients must be equal for no solution]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_1263 = {
  metadata: {
    id: "1263",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a1 = getRandomInt(3, 6);
    const b1_base = getRandomInt(2, 4);
    const c1 = getRandomInt(1, 5);

    const mult = getRandomInt(2, 4);
    // Moving the mult*y term from the right side to the left side of eq1
    // turns the y-coefficient into (b1_base + mult), NOT (b1_base + 2*mult).
    const b1_total = b1_base + mult;

    // k is the ratio between the two x-coefficients (a2 = k * a1).
    const k = getRandomInt(1, 3);
    const a2 = k * a1;

    // c2 must NOT be proportional to c1 by the same ratio k, otherwise the
    // system would have infinitely many solutions instead of no solution.
    let c2 = getRandomInt(1, 10);
    let guard = 0;
    while (c2 === k * c1 && guard++ < 50) {
      c2 = getRandomInt(1, 10);
    }

    // For no solution, the coefficients of x and y must be proportional while
    // the constants are not. Eq1 (rearranged): a1*x - b1_total*y = c1.
    // Eq2 (rearranged): a2*x - (t/2)*y = c2. Proportionality (t/2)/b1_total =
    // a2/a1 = k gives t = 2*k*b1_total.
    const t_answer = 2 * k * b1_total;

    const eq1 = `${a1}x - ${b1_base}y = ${mult}y + ${c1}`;
    const eq2 = `${a2}x + \\frac{${c2}}{2} = \\frac{t}{2}y + \\frac{${c2 * 3}}{2}`;

    return {
      questionText: `In the given system of equations, $t$ is a constant. If the system has no solution, what is the value of $t$? $$${eq1}$$ $$${eq2}$$`,
      figureCode: null,
      options: [],
      correctAnswer: t_answer.toString(),
      explanation: `Rewrite the first equation by moving the $${mult}y$ term to the left side: $${a1}x - ${b1_total}y = ${c1}$. Rewrite the second equation by subtracting $\\frac{${c2}}{2}$ from both sides and multiplying by $2$: $${2 * a2}x - ty = ${2 * c2}$. To eliminate $x$, multiply the first equation by $${2 * k}$: $${2 * a2}x - ${t_answer}y = ${2 * k * c1}$. Subtracting the second equation gives $(t - ${t_answer})y = ${2 * k * c1 - 2 * c2}$. For no solution, the coefficient of $y$ must be zero while the constant is nonzero, so $t - ${t_answer} = 0$, meaning $t = ${t_answer}$.`
    };
  }
};
