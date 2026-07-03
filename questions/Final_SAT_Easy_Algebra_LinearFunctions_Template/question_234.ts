import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 234
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-6, yIntercept: 2-6 negative]
 * - Difficulty factors: [Identifying y-intercept from graph]
 * - Distractor patterns: [incorrect coordinate, wrong sign]
 * - Constraints: [Ensure negative y-intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_234 = {
  metadata: {
    id: "234",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // slope > 0, yIntercept < 0 (constraint: negative y-intercept).
    // The distractors reuse |b|, the slope, and the swapped coordinate, which
    // can coincide for some draws (e.g. slope === |yIntercept|). Re-draw with a
    // bounded retry until all four option strings are distinct.
    let slope = getRandomInt(2, 6);
    let yIntercept = -getRandomInt(2, 6);

    const buildOptions = () => [
      { text: `(0, ${yIntercept})`, isCorrect: true },
      { text: `(0, ${-yIntercept})`, isCorrect: false, reason: "uses the opposite sign for the y-coordinate" },
      { text: `(${yIntercept}, 0)`, isCorrect: false, reason: "places the intercept value on the x-axis instead of the y-axis" },
      { text: `(0, ${slope})`, isCorrect: false, reason: "uses the slope of the line instead of the y-intercept" }
    ];

    let tries = 0;
    while (new Set(buildOptions().map(o => o.text)).size !== 4 && tries++ < 50) {
      slope = getRandomInt(2, 6);
      yIntercept = -getRandomInt(2, 6);
    }

    // Zoomed view centered on the y-intercept area.
    // x: -2 to 2 (close to y-axis); y: yIntercept-1 to 2 (shows the intercept).
    const mafsCode = `<Mafs viewBox={{ x: [-2, 2], y: [${yIntercept - 1}, 2] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${yIntercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = buildOptions();

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The graph of the function $f$ is shown in the $xy$-plane, where $y=f(x)$. What is the $y$-intercept of the graph?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `(0, ${yIntercept})`,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept is the point where the graph crosses the $y$-axis, which occurs at $x=0$. From the graph, that point is $(0, ${yIntercept})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
