import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 71
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yInt: -8 to -5, k: yInt + 1]
 * - Difficulty factors: [Identifying y-intercept of a rational function from a graph]
 * - Distractor patterns: [x-intercept, origin, random point]
 * - Constraints: [Graph must clearly pass through yInt]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Rational function plot]
 */

export const generator_71 = {
  metadata: {
    id: "71",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yInt = -getRandomInt(5, 8);

    const k = yInt + 1;

    const mafsCode = `<Mafs viewBox={{ x: [-2, 8], y: [${yInt - 5}, 5] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${k} - 4 / (x + 4)} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `$(0, ${yInt})$`, isCorrect: true },
      { text: `$(${yInt}, 0)$`, isCorrect: false },
      { text: `$(0, 0)$`, isCorrect: false },
      { text: `$(-5, -5)$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `What is the y-intercept of the graph shown?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The y-intercept is the point where the graph crosses the y-axis ($x=0$). Looking at the graph, this happens at $y=${yInt}$, so the point is $(0, ${yInt})$.`
    };
  }
};
