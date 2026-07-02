import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 94
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [k: 1-9]
 * - Difficulty factors: [Identifying the graph of a quadratic from its equation]
 * - Distractor patterns: [Wrong vertex, downward opening, wrong intercept]
 * - Constraints: [Parabola vertex at (0, k)]
 * - Question type: [Multiple Choice Figure]
 * - Figure generation: [Parabola plots]
 */

export const generator_94 = {
  metadata: {
    id: "94",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const k = getRandomInt(1, 9);

    const buildMafs = (fnStr: string) => `<Mafs viewBox={{ x: [-5, 5], y: [-2, ${k + 5}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${fnStr}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { figureCode: buildMafs(`Math.pow(x, 2) + ${k}`), isCorrect: true },
      { figureCode: buildMafs(`Math.pow(x - 1, 2) + ${k}`), isCorrect: false },
      { figureCode: buildMafs(`-Math.pow(x, 2) + ${k}`), isCorrect: false },
      { figureCode: buildMafs(`Math.pow(x, 2) + ${k === 1 ? 3 : k - 1}`), isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x)=x^2+${k}$. Which of the following graphs in the xy-plane could be the graph of $y=f(x)$?`,
      figureCode: null,
      options: shuffled.map(o => o.figureCode),
      correctAnswer: correctOption.figureCode,
      explanation: `Choice ${correctOption.letter} is correct. For the quadratic $f(x)=x^2+${k}$, the vertex is $(0, ${k})$. Only Choice ${correctOption.letter} shows an upward-opening parabola with a vertex at $(0, ${k})$.`
    };
  }
};
