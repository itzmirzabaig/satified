import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1159
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [0.8, 0.46, 8, 0.001, 1.9 (decimals)]
 * - Difficulty factors: [Decimal arithmetic, careful distribution]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 *
 * Previously the answer was the solution rounded to 3 or 4 places and shown as
 * exact, d could be 0, a could be 1.0, and the explanation added b to both
 * sides when it should have moved it the other way. The equation is now built
 * from an exact answer t = -T/100, working in thousandths so every number shown
 * is exact.
 */

export const generator_1159 = {
  metadata: {
    id: "1159",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Exact decimal from an integer count of thousandths (or tenths).
    const dec = (n: number, places: number): string =>
      (n / 10 ** places).toFixed(places).replace(/0+$/, '').replace(/\.$/, '');

    // Equation: a t - b = c(t - d) + e, with
    //   a = A/10, b = B/1000, d = D/1000, e = E/10, t = -T/100.
    // Then (a - c)t = (e - cd) + b, and in thousandths
    //   B = (10c - A)T + cD - 100E.
    let A = 0, c = 0, D = 0, E = 0, T = 0, B = 0;
    do {
      A = getRandomInt(3, 18);   // a from 0.3 to 1.8
      c = getRandomInt(5, 15);
      D = getRandomInt(2, 9);    // d from 0.002 to 0.009
      E = getRandomInt(5, 35);   // e from 0.5 to 3.5
      T = getRandomInt(5, 95);   // t from -0.05 to -0.95
      B = (10 * c - A) * T + c * D - 100 * E;
    } while (A === 10 || B < 100 || B > 900);

    const a = dec(A, 1);
    const b = dec(B, 3);
    const d = dec(D, 3);
    const e = dec(E, 1);
    const t = `-${dec(T, 2)}`;

    const cd = dec(c * D, 3);                     // c times d
    const eMinusCd = dec(100 * E - c * D, 3);     // e - cd (always positive)
    const rhs = dec((10 * c - A) * T, 3);         // (e - cd) + b
    const aMinusC = `-${dec(10 * c - A, 1)}`;     // a - c (always negative)

    const explanation = `The correct answer is ${t}. Distributing $${c}$ on the right side of the equation gives $${a}t - ${b} = ${c}t - ${cd} + ${e}$, which simplifies to $${a}t - ${b} = ${c}t + ${eMinusCd}$. Subtracting $${c}t$ from both sides gives $${aMinusC}t - ${b} = ${eMinusCd}$. Adding $${b}$ to both sides gives $${aMinusC}t = ${rhs}$. Dividing both sides by $${aMinusC}$ gives $t = \\frac{${rhs}}{${aMinusC}} = ${t}$.`;

    return {
      questionText: `What value of $t$ is the solution to the equation $${a}t - ${b} = ${c}(t - ${d}) + ${e}$?`,
      figureCode: null,
      options: [],
      correctAnswer: t,
      explanation: explanation
    };
  }
};
