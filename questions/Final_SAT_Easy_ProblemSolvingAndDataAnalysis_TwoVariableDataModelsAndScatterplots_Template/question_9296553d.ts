import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9296553d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1, intercept: 6]
 * - Difficulty factors: [Identifying negative slope from scatterplot trend]
 * - Distractor patterns: [Wrong intercept sign (B), wrong slope magnitude and sign (C,D)]
 * - Constraints: [Negative slope, positive intercept around 6]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative trend and line of best fit]
 */

export const generator_9296553d = {

  metadata: {
    // id: "9296553d",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const slope = -1 * getRandomInt(1, 2);
    const intercept = getRandomInt(5, 8);

    const points = [
      { x: 1, y: (intercept + slope * 1 + Math.random()).toFixed(1) },
      { x: 2, y: (intercept + slope * 2 + Math.random()).toFixed(1) },
      { x: 3, y: (intercept + slope * 3 + Math.random()).toFixed(1) },
      { x: 4, y: (intercept + slope * 4 + Math.random()).toFixed(1) }
    ];

    const pointElements = points.map(p => `<Point x={${p.x}} y={${p.y}} />`).join('\n ');

    const mafsCode = `
      <Coordinates.Cartesian />
      ${pointElements}
      <Plot.OfX y={(x) => ${slope} * x + ${intercept}} color="#ff2a7a" />
    `;

    const optionsData = [
      { text: `\\(y = ${slope}x + ${intercept}\\)`, isCorrect: true },
      { text: `\\(y = ${slope}x - ${intercept}\\)`, isCorrect: false },
      { text: `\\(y = ${intercept}x + 1\\)`, isCorrect: false },
      { text: `\\(y = ${intercept}x - 1\\)`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: "Which of the following could be an equation for a line of best fit for the data in the scatterplot?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `y=${slope}x+${intercept}`,
      explanation: `Choice ${correctLetter} is correct. The trend shows a negative slope and a y-intercept near ${intercept}. Choice ${correctLetter} fits these criteria.`
    };

  }

};

/**
 * Question ID: d6121490
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed: 30-50 mph, braking distance: 100-225 feet]
 * - Difficulty factors: [Reading values from quadratic model and calculating difference]
 * - Distractor patterns: [Partial calculations (A,C,D)]
 * - Constraints: [Quadratic relationship, positive values]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Quadratic curve with marked points at 30 and 50 mph]
 */