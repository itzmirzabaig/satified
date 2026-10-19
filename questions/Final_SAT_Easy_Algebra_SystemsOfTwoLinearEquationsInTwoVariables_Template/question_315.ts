import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 315
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 1 and -1, intercepts: 1 and -7]
 * - Difficulty factors: [Intersection in negative quadrant]
 * - Constraints: [Integer intersection coordinates]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Lines intersecting in third quadrant]
 */

export const generator_315 = {
  metadata: {
    id: "315",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // x and y differ so the reversed-coordinates choice is a different point.
    let x = -3, y = -2;
    do {
      x = -1 * getRandomInt(3, 6);
      y = -1 * getRandomInt(2, 5);
    } while (x === y);
    const b1 = y - x;
    const b2 = y + x;

    // A window around the intersection and both y-intercepts, with a gridline
    // at every whole number. The graph used to have no window.
    const yLo = Math.min(y, b2) - 3, yHi = Math.max(y, b1) + 3;
    const mafsCode = `<Mafs viewBox={{ x: [${x - 4}, 3], y: [${yLo}, ${yHi}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => n }}
    yAxis={{ lines: 1, labels: (n) => n % 2 === 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => x + ${b1}} color="#1a7cff" />
  <Plot.OfX y={(x) => -x + ${b2}} color="#ff2a7a" />
</Mafs>`;

    // The old wrong choices included the floor of the average of the two
    // intercepts ("an incorrect intercept value").
    const optionsData = [
      { text: `$(0, ${b2})$`, isCorrect: false, reason: `$(0, ${b2})$ is the $y$-intercept of one of the lines, not the point where the two lines intersect` },
      { text: `$(0, ${b1})$`, isCorrect: false, reason: `$(0, ${b1})$ is the $y$-intercept of one of the lines, not the point where the two lines intersect` },
      { text: `$(${x}, ${y})$`, isCorrect: true, reason: '' },
      { text: `$(${y}, ${x})$`, isCorrect: false, reason: `it reverses the coordinates of the intersection point, $(${x}, ${y})$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // The explanation used to read "Setting x + 0 = -x + -10".
    const explanation = `Choice ${correctOption.letter} is correct. The solution to a system of two linear equations is the point where their graphs intersect. The two lines shown intersect at $(${x}, ${y})$, so the solution is $(${x}, ${y})$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The graph of a system of linear equations is shown. What is the solution $(x, y)$ to the system?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$(${x}, ${y})$`,
      explanation: explanation
    };
  }
};
