import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 91
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [root: 4-10]
 * - Difficulty factors: [Identifying x-intercept from a vertex-form parabola]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Vertex must be on the x-axis]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Parabola plot]
 */

export const generator_91 = {
  metadata: {
    id: "91",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const root = getRandomInt(4, 10);

    const mafsCode = `<Mafs viewBox={{ x:, y: [-5, 10] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => Math.pow(x - ${root}, 2)} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `The x-intercept of the graph shown is $(x, 0)$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: root.toString(),
      explanation: `The x-intercept is the point where the graph touches the x-axis ($y=0$). From the graph, the vertex of the parabola sits on the x-axis at $x=${root}$.`
    };
  }
};
