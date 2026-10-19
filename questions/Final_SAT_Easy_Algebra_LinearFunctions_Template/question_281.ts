import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
// Removed duplicate import

/**
 * Question 281
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yIntercept: 2-6, xIntercept: -1 to -5]
 * - Difficulty factors: [Reading y-intercept from graph]
 * - Distractor patterns: [x-intercept, reversed coordinates, opposite sign]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_281 = {
  metadata: {
    id: "281",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Both intercepts are whole numbers so the line crosses each axis on a
    // gridline. The x-intercept choice used to be Math.round of a value such
    // as -1.5, so the explanation called (-1, 0) the x-intercept when the line
    // crossed at -1.5, and the graph had no window, so y-intercepts of 6 could
    // fall outside the default view.
    let yIntercept = 3, run = 2;
    do {
      yIntercept = getRandomInt(2, 6);
      run = getRandomInt(1, 5);
    } while (run === yIntercept);
    const xIntercept = -run;

    const mafsCode = `<Mafs viewBox={{ x: [${xIntercept - 2}, 3], y: [-2, ${yIntercept + 2}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => n }}
    yAxis={{ lines: 1, labels: (n) => n }}
  />
  <Plot.OfX y={(x) => (${yIntercept} * x) / ${run} + ${yIntercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `$(${xIntercept}, 0)$`, isCorrect: false, reason: `$(${xIntercept}, 0)$ is the $x$-intercept of the graph, where the graph crosses the $x$-axis` },
      { text: `$(${yIntercept}, 0)$`, isCorrect: false, reason: `it reverses the coordinates of the $y$-intercept; the point $(${yIntercept}, 0)$ is on the $x$-axis, not the $y$-axis` },
      { text: `$(0, ${yIntercept})$`, isCorrect: true, reason: '' },
      { text: `$(0, ${-yIntercept})$`, isCorrect: false, reason: `the graph crosses the $y$-axis above the $x$-axis, at $y = ${yIntercept}$, not below it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The graph of the linear function $f$ is shown in the $xy$-plane. What is the $y$-intercept of the graph of $y = f(x)$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$(0, ${yIntercept})$`,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept is the point where the graph intersects the $y$-axis, which is where $x = 0$. The graph shown crosses the $y$-axis at the point $(0, ${yIntercept})$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
