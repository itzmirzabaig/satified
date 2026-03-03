import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8baf2118
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -0.8 (negative), y-intercept: 13.5]
 * - Difficulty factors: [Identifying slope and y-intercept from line of best fit]
 * - Distractor patterns: [Wrong slope sign (A), wrong intercept sign (C,D), both wrong (D)]
 * - Constraints: [Negative slope, positive y-intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative slope line of best fit]
 */

export const generator_8baf2118 = {

  metadata: {
    // id: "8baf2118",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const slope = -(0.5 + Math.random() * 0.5).toFixed(1);
    const yIntercept = getRandomInt(10, 16);
    const numPoints = getRandomInt(8, 12);

    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const x = getRandomInt(1, 14);
      const yBase = parseFloat(slope) * x + yIntercept;
      const variation = getRandomInt(-3, 3);
      points.push({ x, y: Math.round(yBase + variation) });
    }

    const pointElements = points.map(p => `<Point x={${p.x}} y={${p.y}} />`).join('\n ');

    const mafsCode = `
      <Coordinates.Cartesian />
      <Plot.OfX y={(x) => ${yIntercept} + (${slope}) * x} color="#1a7cff" />
      ${pointElements}
    `;

    const absSlope = Math.abs(parseFloat(slope));
    const optionsData = [
      { text: `$y = ${yIntercept} + ${absSlope}x$`, isCorrect: false },
      { text: `$y = ${yIntercept} ${parseFloat(slope) >= 0 ? '+' : ''}${slope}x$`, isCorrect: true },
      { text: `$y = -${yIntercept} + ${absSlope}x$`, isCorrect: false },
      { text: `$y = -${yIntercept} ${parseFloat(slope) >= 0 ? '+' : ''}${slope}x$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "Which of the following equations best represents the line of best fit shown?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `y = ${yIntercept} ${parseFloat(slope) >= 0 ? '+' : ''}${slope}x`,
      explanation: `Choice ${correctLetter} is correct. The line of best fit shown intersects the y-axis at a positive y-value and has a negative slope. The graph of an equation of the form $y=a+bx$, where $a$ and $b$ are constants, intersects the y-axis at a y-value of $a$ and has a slope of $b$. Of the given choices, only choice ${correctLetter} represents a line that intersects the y-axis at a positive y-value, ${yIntercept}, and has a negative slope, ${slope}. Choice ${incorrectOptions[0].letter} is incorrect because this equation represents a line that has a positive slope, not a negative slope. Choice ${incorrectOptions[1].letter} is incorrect because this equation represents a line that intersects the y-axis at a negative y-value, not a positive y-value, and has a positive slope, not a negative slope. Choice ${incorrectOptions[2].letter} is incorrect because this equation represents a line that intersects the y-axis at a negative y-value, not a positive y-value.`
    };

  }

};

/**
 * Question ID: ac5b6558
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [elevation: 6200-9100 feet, temperature: 36-45°F]
 * - Difficulty factors: [Reading value from line of best fit at specific x-coordinate]
 * - Distractor patterns: [Lowest value (A), wrong elevation reading (C,D)]
 * - Constraints: [Negative correlation, linear trend]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Elevation vs temperature scatterplot with line of best fit]
 */