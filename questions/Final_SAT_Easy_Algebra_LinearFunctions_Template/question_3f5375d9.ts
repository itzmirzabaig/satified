import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 3f5375d9
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-4, intercept: 2-5]
 * - Difficulty factors: [Calculating slope from graph]
 * - Distractor patterns: [miscalculation, y-intercept as slope, total cost for one mile]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_3f5375d9 = {
  metadata: {
    // id: "3f5375d9",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(1, 4);
    const intercept = getRandomInt(2, 5);

    const mafsCode = `<Mafs viewBox={{ x: [-1, 5], y: [0, ${slope * 5 + intercept + 2}] }}>
  <Coordinates.Cartesian 
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n >= 0 ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${intercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: slope.toFixed(2), isCorrect: true },
      { text: (slope + 0.6).toFixed(2), isCorrect: false, reason: "results from a miscalculation of the slope" },
      { text: intercept.toFixed(2), isCorrect: false, reason: "is the y-intercept (base cost), not the cost per mile" },
      { text: (slope + intercept).toFixed(2), isCorrect: false, reason: "is the total cost for one mile, not the rate" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The line graphed in the $xy$-plane above models the total cost, in dollars, for a cab ride, $y$, based on the number of miles traveled, $x$. What is the cost for each additional mile traveled?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: slope.toFixed(2),
      explanation: `Choice ${correctOption.letter} is correct. The cost for each additional mile is represented by the slope of the line. Using the points $(0, ${intercept})$ and $(1, ${slope + intercept})$, the slope is $\\frac{${slope + intercept} - ${intercept}}{1 - 0} = ${slope}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};