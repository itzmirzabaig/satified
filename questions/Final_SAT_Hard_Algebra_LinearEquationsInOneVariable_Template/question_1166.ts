import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1166
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [6, 3, 13 (small integers)]
 * - Difficulty factors: [Recognizing x+6=0 is the only solution, value is 0]
 * - Distractor patterns: [B contains 0, others don't]
 * - Constraints: [x+6 must equal 0]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1166 = {
  metadata: {
    id: "1166",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // (x+a)/b = (x+a)/c with b != c forces x + a = 0.
    // Before: the three wrong pairs were fixed or arbitrary ranges with no
    // reasons. Now each wrong pair brackets a value a student reaches by a real
    // slip: -a (the value of x), a (x + a read as if x were 0), and c - b (the
    // coefficient in (c - b)(x + a) = 0). A redraw keeps a and c - b far enough
    // apart that the pairs never overlap.
    let a!: number, b!: number, c!: number;
    do {
      a = getRandomInt(3, 10);
      b = getRandomInt(2, 5);
      c = getRandomInt(8, 15);
    } while (Math.abs(a - (c - b)) < 5);
    const g = c - b;

    // A pair [v - d1, v + d2] around v, with d1 and d2 in 1..2.
    const around = (v: number) => ({ low: v - getRandomInt(1, 2), high: v + getRandomInt(1, 2) });

    const optionsData = [
      { low: -getRandomInt(1, 3), high: getRandomInt(1, 3), isCorrect: true, reason: '' },
      { ...around(-a), isCorrect: false, reason: `$${-a}$ is the value of $x$, not of $x+${a}$` },
      { ...around(a), isCorrect: false, reason: `$${a}$ is the value of $x+${a}$ only when $x = 0$, but $x = 0$ does not satisfy the equation` },
      { ...around(g), isCorrect: false, reason: `$${g}$ is the coefficient in $${g}(x+${a}) = 0$, not the value of $x+${a}$` }
    ].map(o => ({ ...o, text: `$${o.low}$ and $${o.high}$` }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Multiplying both sides of $\\frac{x+${a}}{${b}} = \\frac{x+${a}}{${c}}$ by $${b * c}$ gives $${c}(x+${a}) = ${b}(x+${a})$. Subtracting $${b}(x+${a})$ from both sides gives $${g}(x+${a}) = 0$. Since $${g} \\neq 0$, it follows that $x+${a} = 0$. Of the given pairs, only $${correctOption.low}$ and $${correctOption.high}$ have $0$ between them. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}; $0$ is not between $${o.low}$ and $${o.high}$.`).join(' ')}`;

    return {
      questionText: `If $\\frac{x+${a}}{${b}} = \\frac{x+${a}}{${c}}$, the value of $x+${a}$ is between which of the following pairs of values?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
