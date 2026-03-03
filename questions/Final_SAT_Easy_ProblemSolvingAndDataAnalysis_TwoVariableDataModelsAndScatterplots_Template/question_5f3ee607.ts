import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5f3ee607
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1.9, intercept: 10.1]
 * - Difficulty factors: [Identifying negative slope and positive intercept]
 * - Distractor patterns: [Wrong signs (A,C,D)]
 * - Constraints: [Negative slope, positive intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative slope line of best fit]
 */

export const generator_5f3ee607 = {

  metadata: {
    // id: "5f3ee607",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const slope = -(1 + Math.random() * 2).toFixed(1);
    const intercept = (8 + Math.random() * 4).toFixed(1);
    const absSlope = Math.abs(parseFloat(slope));

    const points = [
      { x: 1, y: (parseFloat(slope) * 1 + parseFloat(intercept)).toFixed(1) },
      { x: 3, y: (parseFloat(slope) * 3 + parseFloat(intercept)).toFixed(1) },
      { x: 5, y: (parseFloat(slope) * 5 + parseFloat(intercept)).toFixed(1) }
    ];

    const pointElements = points.map(p => `<Point x={${p.x}} y={${p.y}} />`).join('\n ');

    const mafsCode = `
      <Coordinates.Cartesian />
      ${pointElements}
      <Plot.OfX y={(x) => ${slope} * x + ${intercept}} color="#ff2a7a" />
    `;

    const optionsData = [
      { text: `$y = ${slope}x - ${intercept}$`, isCorrect: false },
      { text: `$y = ${slope}x + ${intercept}$`, isCorrect: true },
      { text: `$y = ${absSlope}x - ${intercept}$`, isCorrect: false },
      { text: `$y = ${absSlope}x + ${intercept}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: "Which equation is the most appropriate linear model?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `y=${slope}x+${intercept}`,
      explanation: `Choice ${correctLetter} is correct. The data shows a negative slope (${slope}) and a positive y-intercept (${intercept}).`
    };

  }

};

/**
 * Question ID: 661dfddd
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [elevation: varies, temperature: 25-65°F]
 * - Difficulty factors: [Interpreting negative correlation from line graph]
 * - Distractor patterns: [Opposite relationship (A,C), no relationship (D)]
 * - Constraints: [Negative slope = inverse relationship]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Line graph showing elevation vs temperature]
 */