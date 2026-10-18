import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 56
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [aVal: 1-3, hVal: 1-5, kVal: 10-40]
 * - Difficulty factors: [Identifying y-intercept of a parabola from its plot]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Function must have clear intercept]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Parabola plot]
 */

export const generator_56 = {
  metadata: {
    id: "56",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const aVal = getRandomInt(1, 3);

    const hVal = getRandomInt(1, 5);

    // The answer is read off the graph, so it has to land on a labeled
    // gridline: pick the vertex height so the y-intercept is a multiple of 10,
    // and draw the y gridlines 10 apart. Without this the y-axis put a label
    // at every unit up to 120 or so and the labels piled into an unreadable
    // column.
    const lift = aVal * hVal * hVal;
    const kChoices: number[] = [];
    for (let k = 10; k <= 40; k++) if ((lift + k) % 10 === 0) kChoices.push(k);
    const kVal = kChoices[getRandomInt(0, kChoices.length - 1)];

    const yIntVal = lift + kVal;

    const mafsCode = `<Mafs viewBox={{ x: [-2, 10], y: [0, ${yIntVal + 20}] }}>
  <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 10 }} />
  <Plot.OfX y={(x) => ${aVal} * Math.pow(x - ${hVal}, 2) + ${kVal}} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `The y-intercept of the graph shown is $(x, y)$. What is the value of $y$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: yIntVal.toString(),
      explanation: `The y-intercept is the point where the graph crosses the y-axis, which is where $x=0$. The graph shown crosses the y-axis at the point $(0, ${yIntVal})$, so the value of $y$ is $${yIntVal}$.`
    };
  }
};
