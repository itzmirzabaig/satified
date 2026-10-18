import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 233
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yIntercept: 3-9, xIntercept: 2-8]
 * - Difficulty factors: [Reading y-intercept]
 * - Distractor patterns: [x-intercept, reversed coordinates, x-intercept value as y]
 * - Constraints: [xIntercept !== yIntercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_233 = {
  metadata: {
    id: "233",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Both intercepts are whole numbers, so the line crosses each axis on a
    // gridline. The old distractors were the origin, the rounded x-intercept
    // written as a y-intercept, and the negated answer, and the window started
    // at y = 0, which cut off the x-axis labels.
    let yIntercept = 6, xIntercept = 4;
    do {
      yIntercept = getRandomInt(3, 9);
      xIntercept = getRandomInt(2, 8);
    } while (xIntercept === yIntercept);

    const mafsCode = `<Mafs viewBox={{ x: [-2, ${xIntercept + 2}], y: [-1.5, ${yIntercept + 2}] }}>
  <Coordinates.Cartesian 
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
  />
  <Plot.OfX y={(x) => (-${yIntercept} * x) / ${xIntercept} + ${yIntercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `$(${xIntercept}, 0)$`, isCorrect: false, reason: `$(${xIntercept}, 0)$ is the $x$-intercept of the graph, where the graph crosses the $x$-axis` },
      { text: `$(${yIntercept}, 0)$`, isCorrect: false, reason: `it reverses the coordinates of the $y$-intercept; the point $(${yIntercept}, 0)$ is on the $x$-axis, not the $y$-axis` },
      { text: `$(0, ${xIntercept})$`, isCorrect: false, reason: `it uses ${xIntercept}, the $x$-coordinate of the $x$-intercept, as the $y$-coordinate; the graph crosses the $y$-axis at $y = ${yIntercept}$` },
      { text: `$(0, ${yIntercept})$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The graph of the linear function $f$ is shown in the $xy$-plane, where $y = f(x)$. What is the $y$-intercept of the graph of $f$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$(0, ${yIntercept})$`,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept of a graph is the point where the graph crosses the $y$-axis, which is where $x = 0$. The graph shown crosses the $y$-axis at the point $(0, ${yIntercept})$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
