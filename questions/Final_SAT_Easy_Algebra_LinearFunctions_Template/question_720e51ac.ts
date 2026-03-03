import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 720e51ac
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-3, intercept: 80-120, xValue: 50-70 ending in 0 or 5]
 * - Difficulty factors: [Reading value from graph]
 * - Distractor patterns: [fixed cost, arbitrary value, overestimate]
 * - Constraints: [xValue must end in 0 or 5 to align with grid lines]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_720e51ac = {
  metadata: {
    // id: "720e51ac",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(1, 3);
    const intercept = getRandomInt(80, 120);
    // xValue ends in 0 or 5: 50, 55, 60, 65, 70
    const xValue = getRandomInt(10, 14) * 5; // 50, 55, 60, 65, 70
    const yValue = slope * xValue + intercept;

    // Starting view: show full context from 0 to target + padding
    const xMax = xValue + 10;
    const yMax = yValue + 20;
    
    // Grid steps: x by 5 (so 50, 55, 60, 65, 70 are visible), y by 10
    const xGridStep = 5;
    const yGridStep = 10;

    const mafsCode = `<Mafs viewBox={{ x: [0, ${xMax}], y: [0, ${yMax}] }}>
  <Coordinates.Cartesian 
    xAxis={{ lines: ${xGridStep}, labels: (n) => n % ${xGridStep} === 0 ? n : "" }}
    yAxis={{ lines: ${yGridStep}, labels: (n) => n % ${yGridStep} === 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${intercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: intercept.toString(), isCorrect: false, reason: "is the fixed cost, not the total cost" },
      { text: (slope * 100).toString(), isCorrect: false, reason: "is an arbitrary value" },
      { text: yValue.toString(), isCorrect: true },
      { text: (yValue + 50).toString(), isCorrect: false, reason: "is an overestimate" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The cost, in dollars, for a manufacturer to make rings is represented by the line shown. What is the cost, in dollars, for the manufacturer to make ${xValue} rings?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: yValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. From the graph, when $x = ${xValue}$, the corresponding $y$-coordinate is ${yValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 4e97f862
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-10 negative, x: 5-10]
 * - Difficulty factors: [Evaluation with negative intercept]
 * - Distractor patterns: [wrong intercept sign, forgot intercept, sign error]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */