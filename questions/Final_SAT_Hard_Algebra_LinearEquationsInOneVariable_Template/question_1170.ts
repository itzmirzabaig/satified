import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1170
 *
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In One Variable
 * - Concept: Zero Product Property.
 * - Equation: (x-a)/b = (x-a)/c.
 * - Logic: If b != c, then x-a must be 0.
 * - Fix: Corrected LaTeX fraction escaping from \\\\frac to \\frac.
 */

export const generator_1170 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // (x-a)/b = (x-a)/c with b != c forces x - a = 0.
    // Before: three of the four pairs never changed (-3 and 3, 4.5 and 5.5,
    // 6.75 and 9.25), the wrong pairs had no reasons, and the explanation was an
    // HTML list. Now each wrong pair brackets a value a student reaches by a real
    // slip: a (the value of x), -a (x - a read as if x were 0), and c - b (the
    // coefficient in (c - b)(x - a) = 0). The redraw keeps a and c - b far enough
    // apart that the pairs never overlap.
    let a!: number, b!: number, c!: number;
    do {
      a = getRandomInt(3, 12);
      b = getRandomInt(4, 9);
      c = getRandomInt(10, 15);
    } while (c - b < 3 || Math.abs(a - (c - b)) < 5);
    const g = c - b;

    // A pair [v - d1, v + d2] around v, with d1 and d2 in 1..2.
    const around = (v: number) => ({ low: v - getRandomInt(1, 2), high: v + getRandomInt(1, 2) });

    const optionsData = [
      { low: -getRandomInt(1, 3), high: getRandomInt(1, 3), isCorrect: true, reason: '' },
      { ...around(a), isCorrect: false, reason: `$${a}$ is the value of $x$, not of $x-${a}$` },
      { ...around(-a), isCorrect: false, reason: `$${-a}$ is the value of $x-${a}$ only when $x = 0$, but $x = 0$ does not satisfy the equation` },
      { ...around(g), isCorrect: false, reason: `$${g}$ is the coefficient in $${g}(x-${a}) = 0$, not the value of $x-${a}$` }
    ].map(o => ({ ...o, text: `$${o.low}$ and $${o.high}$` }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Multiplying both sides of $\\frac{x-${a}}{${b}} = \\frac{x-${a}}{${c}}$ by $${b * c}$ gives $${c}(x-${a}) = ${b}(x-${a})$. Subtracting $${b}(x-${a})$ from both sides gives $${g}(x-${a}) = 0$. Since $${g} \\neq 0$, it follows that $x-${a} = 0$. Of the given pairs, only $${correctOption.low}$ and $${correctOption.high}$ have $0$ between them. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}; $0$ is not between $${o.low}$ and $${o.high}$.`).join(' ')}`;

    return {
      questionText: `If $\\frac{x-${a}}{${b}} = \\frac{x-${a}}{${c}}$, the value of $x-${a}$ is between which of the following pairs of values?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
