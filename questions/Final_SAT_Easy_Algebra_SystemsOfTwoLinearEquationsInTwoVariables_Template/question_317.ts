import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 317
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: -3 and -0.5, intercepts: 3 and -2]
 * - Difficulty factors: [Negative y-coordinate, finding intersection]
 * - Constraints: [Intersection at integer coordinates]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Lines with negative slopes]
 */

export const generator_317 = {
  metadata: {
    id: "317",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // x is even so the second line's y-intercept, y + x/2, is a whole number;
    // the old choice used Math.floor of it, which was not on the line. The
    // "incorrect nearby point" choice is replaced by the reversed point.
    const x = 2 * getRandomInt(1, 3);
    const y = -1 * getRandomInt(3, 6);
    const m1 = -3;
    const b1 = y - m1 * x;
    const m2 = -0.5;
    const b2 = y - m2 * x;

    // A window around the intersection and both y-intercepts, with a gridline
    // at every whole number. The graph used to have no window, so it
    // auto-scaled to about -30 to 50 on the y-axis.
    const mafsCode = `<Mafs viewBox={{ x: [-2, ${x + 3}], y: [${y - 3}, ${b1 + 2}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => n }}
    yAxis={{ lines: 1, labels: (n) => n % 2 === 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => -3 * x + ${b1}} color="#1a7cff" />
  <Plot.OfX y={(x) => -0.5 * x + ${b2}} color="#ff2a7a" />
</Mafs>`;

    const optionsData = [
      { text: `$(${y}, ${x})$`, isCorrect: false, reason: `it reverses the coordinates of the intersection point, $(${x}, ${y})$` },
      { text: `$(0, ${b1})$`, isCorrect: false, reason: `$(0, ${b1})$ is the $y$-intercept of one of the lines, not the point where the two lines intersect` },
      { text: `$(0, ${b2})$`, isCorrect: false, reason: `$(0, ${b2})$ is the $y$-intercept of one of the lines, not the point where the two lines intersect` },
      { text: `$(${x}, ${y})$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

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
