import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 66
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cVal: -5 to 5, aVal: -5 to 5]
 * - Difficulty factors: [Identifying y-intercept of a higher-degree polynomial from its graph]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Polynomial of degree 4]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Polynomial plot]
 */

export const generator_66 = {
  metadata: {
    id: "66",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const cVal = getRandomInt(-5, 5);

    const aVal = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);

    const mafsCode = `<Mafs viewBox={{ x: [-3, 3], y: [-20, 20] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${cVal} + ${aVal} * Math.pow(x, 4)} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `The graph of the polynomial function $f$, where $y=f(x)$, is shown. The y-intercept of the graph is $(0, y)$. What is the value of $y$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: cVal.toString(),
      explanation: `The y-intercept of the graph is the point where it crosses the y-axis ($x=0$). From the figure, the graph crosses at $(0, ${cVal})$.`
    };
  }
};
