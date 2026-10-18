import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 231
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-4, intercept: 15-25]
 * - Difficulty factors: [Reading y-intercept from graph]
 * - Constraints: [None]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Plot.OfX]
 */

export const generator_231 = {
  metadata: {
    id: "231",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(1, 4);

    // Intercept is a multiple of 5 so it lands on a gridline. It used to be only
    // 15, 20 or 25, so regenerating often repeated the answer; it now ranges
    // over 10 to 45 (eight values).
    const intercept = getRandomInt(2, 9) * 5;

    // Gridlines every 5 dollars (labels every 10) put the intercept on a line.
    // The window starts a little below and left of the axes so the x-axis labels
    // are not cut off at the bottom edge (it used to start at exactly 0).
    const xMax = 10;
    const yMax = slope * xMax + intercept + 10;

    const mafsCode = `<Mafs viewBox={{ x: [-0.6, ${xMax}], y: [${-Math.round(yMax * 0.08)}, ${yMax}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n > 0 ? n : "" }}
    yAxis={{ lines: 5, labels: (n) => n > 0 && n % 10 === 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${intercept}} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `A savings account was opened with an initial deposit, and then the same amount was deposited into the account each week. The graph shows the estimated balance $y$, in dollars, in the account $x$ weeks after it was opened. To the nearest whole dollar, what is the amount of the initial deposit estimated by the graph?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: intercept.toString(),
      explanation: `The initial deposit is the balance when $x = 0$, which is the $y$-coordinate of the $y$-intercept of the graph. The graph crosses the $y$-axis at $(0, ${intercept})$, so the initial deposit is ${intercept} dollars.`
    };
  }
};
