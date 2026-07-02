import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 517
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 0.9, intercept: 2.2]
 * - Difficulty factors: [Identifying positive slope from scatterplot]
 * - Distractor patterns: [Negative slopes (A,B,C)]
 * - Constraints: [Positive slope]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with positive slope line of best fit]
 */

export const generator_517 = {

  metadata: {
    id: "517",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const slope = (0.5 + Math.random() * 0.8).toFixed(1);
    const intercept = (1 + Math.random() * 3).toFixed(1);

    const points = [
      { x: 1, y: Math.round((parseFloat(slope) * 1 + parseFloat(intercept)) * 10) / 10 },
      { x: 3, y: Math.round((parseFloat(slope) * 3 + parseFloat(intercept)) * 10) / 10 },
      { x: 5, y: Math.round((parseFloat(slope) * 5 + parseFloat(intercept)) * 10) / 10 },
      { x: 9, y: Math.round((parseFloat(slope) * 9 + parseFloat(intercept)) * 10) / 10 }
    ];

    const pointElements = points.map(p => `<Point x={${p.x}} y={${p.y}} />`).join('\n ');

    const mafsCode = `
      <Coordinates.Cartesian />
      ${pointElements}
      <Plot.OfX y={(x) => ${slope} * x + ${intercept}} color="#ff2a7a" />
    `;

    const absSlope = Math.abs(parseFloat(slope));
    const optionsData = [
      { text: `\\( y=-${absSlope} x-${intercept} \\)`, isCorrect: false },
      { text: `\\( y=-${absSlope} x+${intercept} \\)`, isCorrect: false },
      { text: `\\( y=-${absSlope} x \\)`, isCorrect: false },
      { text: `\\( y=${slope} x+${intercept} \\)`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: "Which equation is the most appropriate linear model for this relationship?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `y=${slope}x+${intercept}`,
      explanation: `Choice ${correctLetter} is correct. The scatterplot shows a positive slope. Choice ${correctLetter} is the only option with a positive slope (${slope}).`
    };

  }

};
