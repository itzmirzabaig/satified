import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 60
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [k: 5-10]
 * - Difficulty factors: [Identifying y-intercept from parabola equation]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Standard form quadratic with b=0]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Parabola plot]
 */

export const generator_60 = {
  metadata: {
    id: "60",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const k = getRandomInt(5, 10);

    const mafsCode = `<Mafs viewBox={{ x: [-5, 5], y: [0, ${k + 5}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => Math.pow(x, 2) + ${k}} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `The parabola shown intersects the y-axis at the point $(x, y)$. What is the value of $y$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: k.toString(),
      explanation: `The y-intercept occurs when $x=0$. Substituting $0$ for $x$ in the equation $y = x^2 + ${k}$ yields $y = 0^2 + ${k} = ${k}$.`
    };
  }
};
