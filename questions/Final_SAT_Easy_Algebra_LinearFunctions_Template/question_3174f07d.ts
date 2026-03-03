import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 3174f07d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: neg fractional, yIntercept: 6-10]
 * - Difficulty factors: [Reading y-intercept]
 * - Distractor patterns: [origin, calculated wrong, wrong sign]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_3174f07d = {
  metadata: {
    // id: "3174f07d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = -getRandomInt(1, 3) - 0.5;
    const yIntercept = getRandomInt(6, 10);

    const mafsCode = `<Mafs viewBox={{ x: [-5, 5], y: [0, ${yIntercept + 2}] }}>
  <Coordinates.Cartesian 
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${yIntercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: "(0, 0)", isCorrect: false, reason: "is the origin" },
      { text: `(0, ${Math.round(-yIntercept / slope)})`, isCorrect: false, reason: "calculates an incorrect value" },
      { text: `(0, ${-yIntercept})`, isCorrect: false, reason: "uses the wrong sign" },
      { text: `(0, ${yIntercept})`, isCorrect: true }
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
      correctAnswer: `(0, ${yIntercept})`,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept is where the graph intersects the $y$-axis at $(0, ${yIntercept})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 12345
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-10 negative, x: -2]
 * - Difficulty factors: [Evaluation with negative input]
 * - Distractor patterns: [arithmetic error, sign error, addition instead of multiplication]
 * - Constraints: [Ensure negative input]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */