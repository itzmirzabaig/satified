import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 311
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 2 and -2, intercepts: -7 and 9]
 * - Difficulty factors: [Reading x-coordinate from graph intersection]
 * - Constraints: [Intersection at integer x-coordinate]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Two lines with opposite slopes]
 */

export const generator_311 = {
  metadata: {
    id: "311",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m1 = getRandomInt(2, 4);
    const m2 = -m1;
    const xIntersect = getRandomInt(3, 6);
    const yIntersect = getRandomInt(1, 5);
    const b1 = yIntersect - m1 * xIntersect;
    const b2 = yIntersect - m2 * xIntersect;

    // A window around the intersection with a gridline at every whole number.
    // The graph used to have no window, so it auto-scaled to about -45 to 25
    // on the y-axis with crowded gridlines.
    const mafsCode = `<Mafs viewBox={{ x: [-1, ${xIntersect + 4}], y: [${yIntersect - 7}, ${yIntersect + 7}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => n }}
    yAxis={{ lines: 1, labels: (n) => n }}
  />
  <Plot.OfX y={(x) => ${m1} * x + ${b1}} color="#1a7cff" />
  <Plot.OfX y={(x) => ${m2} * x + ${b2}} color="#ff2a7a" />
</Mafs>`;

    // The explanation used to solve equations the question never gives.
    return {
      questionText: `The graph of a system of linear equations is shown. The solution to the system is $(x,y)$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: xIntersect.toString(),
      explanation: `The correct answer is ${xIntersect}. The solution to a system of two linear equations is the point where the graphs of the equations intersect. The two lines shown intersect at the point $(${xIntersect}, ${yIntersect})$, so the solution is $(${xIntersect}, ${yIntersect})$, and the value of $x$ is ${xIntersect}.`
    };
  }
};
