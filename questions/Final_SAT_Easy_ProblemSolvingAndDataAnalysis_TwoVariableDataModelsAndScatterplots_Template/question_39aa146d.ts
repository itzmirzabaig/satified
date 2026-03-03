import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 39aa146d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: ~0.4375, points: (0,0.25) and (4,2)]
 * - Difficulty factors: [Calculating slope from two points on line]
 * - Distractor patterns: [Negative slopes (A,B), reciprocal (D)]
 * - Constraints: [Positive slope less than 1]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Line graph with marked points]
 */

export const generator_39aa146d = {

  metadata: {
    // id: "39aa146d",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const run = getRandomInt(3, 6);
    const rise = getRandomInt(1, 3);
    const slope = (rise / run).toFixed(2);
    const yIntercept = (Math.random() * 0.5).toFixed(2);
    const x2 = run;
    const y2 = (parseFloat(slope) * run + parseFloat(yIntercept)).toFixed(2);

    const mafsCode = `
      <Coordinates.Cartesian />
      <Plot.OfX y={(x) => ${slope} * x + ${yIntercept}} color="#1a7cff" />
    `;

    const negSlope = (-parseFloat(slope)).toFixed(2);
    const recipSlope = (1 / parseFloat(slope)).toFixed(2);

    const optionsData = [
      { text: negSlope, isCorrect: false },
      { text: negSlope, isCorrect: false },
      { text: slope, isCorrect: true },
      { text: recipSlope, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: "Which is closest to the slope of the line of best fit?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: slope,
      explanation: `Choice ${correctLetter} is correct. Using points (0, ${yIntercept}) and (${x2}, ${y2}), the slope is approximately ${slope}.`
    };

  }

};

/**
 * Question ID: 8d63b6f1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [weight: 50 pounds, offspring: 6]
 * - Difficulty factors: [Reading specific point from scatterplot]
 * - Distractor patterns: [Other y-values (A,B,D)]
 * - Constraints: [Discrete data points]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with marked point]
 */