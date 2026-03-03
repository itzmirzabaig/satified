import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e9aed539
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h: 1-3, k: -3 to -1, shift: 4-10]
 * - Difficulty factors: [Vertical translation of a parabola]
 * - Distractor patterns: [Down shift, Left shift, Right shift]
 * - Constraints: [New vertex must be clearly distinguishable]
 * - Question type: [Figure→Multiple Choice Figure]
 * - Figure generation: [Parabola with vertex (h, k)]
 */

export const generator_e9aed539 = {
  metadata: {
    // id: "e9aed539",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const h = getRandomInt(1, 3);
    const k = -getRandomInt(1, 3);
    const shift = getRandomInt(4, 10); // Random shift between 4 and 10
    const newK = k + shift;

    const buildMafs = (vertexH: number, vertexK: number) => `<Mafs viewBox={{ x: [${vertexH - 5}, ${vertexH + 5}], y: [${vertexK - 5}, ${vertexK + 5}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => Math.pow(x - ${vertexH}, 2) + ${vertexK}} color="var(--mafs-blue)" />
</Mafs>`;

    const originalGraph = buildMafs(h, k);

    const optionsData = [
      { figureCode: buildMafs(h, newK), isCorrect: true },
      { figureCode: buildMafs(h, k - shift), isCorrect: false },
      { figureCode: buildMafs(h - shift, k), isCorrect: false },
      { figureCode: buildMafs(h + shift, k), isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The graph of $y=f(x)$ will be translated ${shift} units up. Which of the following will be the resulting graph?`,
      figureCode: originalGraph,
      options: shuffled.map(o => o.figureCode),
      correctAnswer: correctOption.figureCode,
      explanation: `Choice ${correctOption.letter} is correct. Translating a graph up by ${shift} units increases the y-coordinate of every point by ${shift}. The original vertex is $(${h}, ${k})$. Adding ${shift} to the y-coordinate results in a new vertex at $(${h}, ${newK})$. Only the graph in Choice ${correctOption.letter} reflects this vertical shift.`
    };
  }
};

/**
 * Question ID: 4fbffc0a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0.8-1.2, y: 4.0-5.5, coeff: 5.76]
 * - Difficulty factors: [Interpretation of a specific point on a projectile motion graph]
 * - Distractor patterns: [Swapping x and y, interpretation of vertex, interpretation of intercept]
 * - Constraints: [Point must lie on the parabola]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parabola representing height over time]
 */