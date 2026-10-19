import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 319
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 1 and -1, intercept: 0 and 4]
 * - Difficulty factors: [Symmetric lines, finding intersection]
 * - Constraints: [Intersection at integer coordinates]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Perpendicular diagonal lines]
 */

export const generator_319 = {
  metadata: {
    id: "319",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(3, 6) * 2;
    const finalX = intercept / 2;
    const finalY = finalX;

    // A window around the intersection and both intercepts, with a gridline at
    // every whole number (the graph used to have no window).
    const mafsCode = `<Mafs viewBox={{ x: [-2, ${intercept + 2}], y: [-2, ${intercept + 2}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => n }}
    yAxis={{ lines: 1, labels: (n) => n }}
  />
  <Plot.OfX y={(x) => x} color="#1a7cff" />
  <Plot.OfX y={(x) => -x + ${intercept}} color="#ff2a7a" />
</Mafs>`;

    const optionsData = [
      { text: `$(0, ${intercept})$`, isCorrect: false, reason: `$(0, ${intercept})$ is the $y$-intercept of the line that slopes down, which is not on the other line` },
      { text: `$(${finalX}, ${finalY})$`, isCorrect: true, reason: '' },
      { text: `$(${intercept}, 0)$`, isCorrect: false, reason: `$(${intercept}, 0)$ is the $x$-intercept of the line that slopes down, which is not on the other line` },
      { text: `$(${intercept}, ${intercept})$`, isCorrect: false, reason: `$(${intercept}, ${intercept})$ is on the line that slopes up, but not on the line that slopes down` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The solution to a system of two linear equations is the point where their graphs intersect. The two lines shown intersect at $(${finalX}, ${finalY})$, so the solution is $(${finalX}, ${finalY})$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The graph of a system of two linear equations is shown. What is the solution $(x, y)$ to the system?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$(${finalX}, ${finalY})$`,
      explanation: explanation
    };
  }
};
