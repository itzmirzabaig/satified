import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
// Removed duplicate import

/**
 * Question ID: d11910d6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 0.5-2.5, yIntercept: 1-6]
 * - Difficulty factors: [Reading y-intercept from graph]
 * - Distractor patterns: [x-intercept, swapped coordinates, wrong sign]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_d11910d6 = {
  metadata: {
    // id: "d11910d6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(1, 5) / 2;
    const yIntercept = getRandomInt(1, 6);
    const xIntercept = -yIntercept / slope;

    // Added Mafs wrapper with Coordinates for y-axis grid lines every 1 unit
    const mafsCode = `<Mafs>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => (n % 2 === 0 ? n : "") }}
    yAxis={{ lines: 1, labels: (n) => n }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${yIntercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `(${Math.round(xIntercept)}, 0)`, isCorrect: false, reason: "is the x-intercept, not the y-intercept" },
      { text: `(${yIntercept}, 0)`, isCorrect: false, reason: "swaps the coordinates" },
      { text: `(0, ${yIntercept})`, isCorrect: true },
      { text: `(0, ${-yIntercept})`, isCorrect: false, reason: "uses the wrong sign for the y-intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The graph of the linear function $f$ is shown in the $xy$-plane. What is the $y$-intercept of the graph of $y = f(x)$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `(0, ${yIntercept})`,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept is the point where the graph intersects the $y$-axis, which occurs at $(0, ${yIntercept})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 0eae6be1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [difference: 30-100]
 * - Difficulty factors: [Translating word problem to equation]
 * - Distractor patterns: [addition, division, multiplication]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */