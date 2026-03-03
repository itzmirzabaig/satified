import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b8fa27db
 *
 * ORIGINAL ANALYSIS: [Parallel slope from Mafs graph]
 */

export const generator_b8fa27db = {
  metadata: {
    // id: "b8fa27db",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = getRandomInt(2, 6);
    const b = getRandomInt(2, 8);
    
    const mafsCode = `<Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }}>
  <Coordinates.Cartesian 
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
  />
  <Plot.OfX y={(x) => ${m} * x + ${b}} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `Line $j$ is shown. Line $k$ is parallel to $j$. What is the slope of $k$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: m.toString(),
      explanation: `Parallel lines have equal slopes. Line $j$ has slope ${m}, so $k$ also has slope ${m}.`
    };
  }
};

/**
 * Question ID: 8368afd1
 *
 * ORIGINAL ANALYSIS: [Reading value from Mafs graph]
 */