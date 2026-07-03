import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 101
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yInt: 6-10, baseVal: 0-4]
 * - Difficulty factors: [Identifying y-intercept of a shifted exponential function]
 * - Distractor patterns: [x-intercept, shift value, origin]
 * - Constraints: [Graph must cross y-axis at yInt]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Exponential growth plot]
 *
 * FIXED:
 * - yInt now 7-10 (was 6-10): yInt = 6 made the correct option $(0, 6)$
 *   duplicate the distractor $(0, 6)$ and $(-yInt, 0)$ duplicate $(-6, 0)$,
 *   and it flattened the plot into a horizontal line (baseVal = 0).
 * - Explanation now covers each distractor using letters from the
 *   shuffled array.
 */

export const generator_101 = {
  metadata: {
    id: "101",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // yInt in [7, 10] keeps the correct point (0, yInt) distinct from the
    // distractor (0, 6) and keeps baseVal >= 1 so the plot is truly exponential.
    const yInt = getRandomInt(7, 10);

    const baseVal = yInt - 6; // 1..4; the plotted curve is baseVal * 2^(x/2) + 6, so f(0) = yInt

    const mafsCode = `<Mafs viewBox={{ x: [-5, 5], y: [0, ${yInt + 5}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${baseVal} * Math.pow(2, x / 2) + 6} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { id: 'correct', text: `$(0, ${yInt})$`, isCorrect: true },
      { id: 'xFlip', text: `$(-${yInt}, 0)$`, isCorrect: false },
      { id: 'xSix', text: `$(-6, 0)$`, isCorrect: false },
      { id: 'asymptote', text: `$(0, 6)$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const letterOf = (id: string) => shuffled.find(o => o.id === id)!.letter;

    return {
      questionText: `The graph of an exponential function is shown. What is the y-intercept of the graph?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The y-intercept is the point where the graph crosses the y-axis, which occurs where $x = 0$. The graph shown crosses the y-axis at $(0, ${yInt})$. Choice ${letterOf('xFlip')} is incorrect; it places the point on the x-axis, but the graph shown stays above the x-axis for every value of $x$. Choice ${letterOf('xSix')} is incorrect for the same reason; the graph never crosses the x-axis. Choice ${letterOf('asymptote')} is incorrect; $y = 6$ is the value the graph approaches as $x$ decreases, not the value where it crosses the y-axis.`
    };
  }
};
