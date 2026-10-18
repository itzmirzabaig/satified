import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 196
 *
 * ORIGINAL ANALYSIS: [Parallel slope from Mafs graph]
 */

export const generator_196 = {
  metadata: {
    id: "196",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Slope 2-4 and intercept -4 to -1 keep both (0, b) and (1, b + m) inside
    // the -5..5 window, so the slope can be read from two marked grid points.
    // (The old ranges put the y-intercept as high as 8, off the graph.)
    const m = getRandomInt(2, 4);
    const b = getRandomInt(-4, -1);

    const mafsCode = `<Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
  />
  <Plot.OfX y={(x) => ${m} * x + ${b}} color="var(--mafs-blue)" />
  <Point x={0} y={${b}} color="var(--mafs-blue)" />
  <Point x={1} y={${b + m}} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `Line $j$ is shown in the $xy$-plane. Line $k$ is parallel to line $j$. What is the slope of line $k$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: m.toString(),
      explanation: `Line $j$ passes through the points $(0, ${b})$ and $(1, ${b + m})$, so its slope is $\\frac{${b + m} - (${b})}{1 - 0} = ${m}$. Parallel lines have equal slopes, so the slope of line $k$ is also ${m}.`
    };
  }
};
