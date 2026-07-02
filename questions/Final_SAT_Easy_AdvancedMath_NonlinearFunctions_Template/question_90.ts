import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 90
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yIntercept: 1-9, a: 1-2]
 * - Difficulty factors: [Identifying y-intercept from a graph]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Graph must cross y-axis at yIntercept]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Quadratic plot]
 */

export const generator_90 = {
  metadata: {
    id: "90",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yIntercept = getRandomInt(1, 9);
    const a = getRandomInt(1, 2); // Small coefficient keeps curve gentle

    // y = a*x^2 + yIntercept
    // Vertex at (0, yIntercept) - clearly shows y-intercept as minimum/maximum

    const xMin = -4;
    const xMax = 4;
    const yMax = yIntercept + a * 16 + 1; // Calculate max y at x=±4
    const yMin = yIntercept - 2;

    const mafsCode = `<Mafs viewBox={{ x: [${xMin}, ${xMax}], y: [${yMin}, ${yMax}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${a} * x * x + ${yIntercept}} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `What is the y-coordinate of the y-intercept of the graph shown?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: yIntercept.toString(),
      explanation: `The y-intercept occurs where $x=0$. Looking at the graph, when $x=0$, the value of $y$ is ${yIntercept}.`
    };
  }
};
