import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d230e963
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y-intercept: 2.8, slope: 1.7]
 * - Difficulty factors: [Identifying positive slope and y-intercept from graph]
 * - Distractor patterns: [Wrong slope sign (B), wrong intercept sign (C,D)]
 * - Constraints: [Positive slope, positive y-intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Line graph with positive slope]
 */

export const generator_d230e963 = {

  metadata: {
    // id: "d230e963",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const yIntercept = (1 + Math.random() * 3).toFixed(1);
    const slope = (1 + Math.random() * 2).toFixed(1);

    const points = [];
    for (let x = 2; x <= 8; x += 2) {
      const y = parseFloat(slope) * x + parseFloat(yIntercept);
      points.push({ x, y: Math.round(y * 10) / 10 });
    }

    const pointElements = points.map(p => `<Point x={${p.x}} y={${p.y}} />`).join('\n ');

    const mafsCode = `
      <Coordinates.Cartesian />
      <Plot.OfX y={(x) => ${yIntercept} + ${slope} * x} color="#1a7cff" />
      ${pointElements}
    `;

    const optionsData = [
      { text: `\\(y=${yIntercept}+${slope}x\\)`, isCorrect: true },
      { text: `\\(y=${yIntercept}-${slope}x\\)`, isCorrect: false },
      { text: `\\(y=-${yIntercept}+${slope}x\\)`, isCorrect: false },
      { text: `\\(y=-${yIntercept}-${slope}x\\)`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: "Which of the following equations best represents the line of best fit shown?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `y=${yIntercept}+${slope}x`,
      explanation: `Choice ${correctLetter} is correct. The line has a positive y-intercept (${yIntercept}) and a positive slope (${slope}).`
    };

  }

};

/**
 * Question ID: 13f67ddc
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [days: Tue-Fri, probability: varies with 30% target]
 * - Difficulty factors: [Reading specific value from line graph]
 * - Distractor patterns: [Other days with different probabilities]
 * - Constraints: [Line graph showing probability over days]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Line graph with days on x-axis, probability on y-axis]
 */