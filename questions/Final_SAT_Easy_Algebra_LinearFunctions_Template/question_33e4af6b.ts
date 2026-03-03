import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 33e4af6b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-6, yIntercept: 2-6 negative]
 * - Difficulty factors: [Identifying y-intercept from graph]
 * - Distractor patterns: [incorrect coordinate, wrong sign]
 * - Constraints: [Ensure negative y-intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_33e4af6b = {
  metadata: {
    // id: "33e4af6b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 6);
    const yIntercept = -getRandomInt(2, 6);

    // Zoomed view centered on y-intercept area
    // x: -2 to 2 (close to y-axis), y: yIntercept-1 to 2 (shows intercept clearly)
    const mafsCode = `<Mafs viewBox={{ x: [-2, 2], y: [${yIntercept - 1}, 2] }}>
  <Coordinates.Cartesian 
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${yIntercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `(0, ${Math.floor(yIntercept / 4)})`, isCorrect: false, reason: "uses an incorrect y-coordinate" },
      { text: `(0, ${yIntercept})`, isCorrect: true },
      { text: `(0, ${Math.abs(yIntercept)})`, isCorrect: false, reason: "uses the wrong sign" },
      { text: `(0, ${-yIntercept})`, isCorrect: false, reason: "uses the opposite sign" }
    ];

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
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept is where the graph crosses the $y$-axis, at point $(0, ${yIntercept})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 7b17f86a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 5-15, numerator: 1 to den-1, xValue: 1-10]
 * - Difficulty factors: [Fraction arithmetic in function evaluation]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */