import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 74
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [aVal: 1-3, bVal: 1-5]
 * - Difficulty factors: [Identifying the vertex of a parabola from its graph]
 * - Distractor patterns: [Opposite sign for intercept, offset intercept]
 * - Constraints: [Vertex occurs at x=0]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parabola plot]
 */

export const generator_74 = {
  metadata: {
    id: "74",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const aVal = getRandomInt(1, 3);

    const bVal = getRandomInt(1, 5);

    const mafsCode = `<Mafs viewBox={{ x: [-5, 5], y: [-2, ${bVal + 10}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${aVal} * Math.pow(x, 2) + ${bVal}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `$(0, ${bVal})$`, isCorrect: true },
      { text: `$(0, -${bVal})$`, isCorrect: false },
      { text: `$(0, -${bVal + 1})$`, isCorrect: false },
      { text: `$(0, ${bVal + 1})$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The graph of the quadratic function $y = f(x)$ is shown. What is the vertex of the graph?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In the graph shown, the vertex (the minimum point) occurs at $(0, ${bVal})$.`
    };
  }
};
