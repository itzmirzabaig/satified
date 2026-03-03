import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a03b7e02
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0-3, f(x): 3-6]
 * - Difficulty factors: [Identifying linear function from table and pattern]
 * - Distractor patterns: [Decreasing options (A,C), exponential (D)]
 * - Constraints: [Constant rate of change = linear]
 * - Question type: [Figure/Table→Multiple Choice Text]
 * - Figure generation: [Points plotted from table data]
 */

export const generator_a03b7e02 = {

  metadata: {
    // id: "a03b7e02",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const slope = getRandomInt(1, 3);
    const intercept = getRandomInt(2, 5);
    const xValues = [0, 1, 2, 3];
    const yValues = xValues.map(x => slope * x + intercept);

    const pointElements = xValues.map((x, i) => `<Point x={${x}} y={${yValues[i]}} />`).join('\n ');


    // Fixed: Added border styles to table, no fill color
    const tableCode = `
      <table style="border-collapse: collapse; margin: 0 auto;">
        <tr><th style="border: 1px solid black; padding: 8px 12px;">$x$</th><th style="border: 1px solid black; padding: 8px 12px;">$f(x)$</th></tr>
        ${xValues.map((x, i) => `<tr><td style="border: 1px solid black; padding: 8px 12px;">$${x}$</td><td style="border: 1px solid black; padding: 8px 12px;">$${yValues[i]}$</td></tr>`).join('')}
      </table>
    `;

    const optionsData = [
      { text: "Decreasing linear", isCorrect: false },
      { text: "Increasing linear", isCorrect: true },
      { text: "Decreasing exponential", isCorrect: false },
      { text: "Increasing exponential", isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: "Which describes function $f$?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "Increasing linear",
      // Fixed: Use proper LaTeX formatting with $...$ for math expressions
      explanation: `Choice ${correctLetter} is correct. The function increases at a constant rate of $${slope}$ for each unit increase in $x$, making it increasing linear. The table shows $f(x) = ${slope}x + ${intercept}$.`
    };

  }

};

/**
 * Question ID: bc59c2d9
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [elevation: 4000 feet, temperature: 35°F]
 * - Difficulty factors: [Reading value from line of best fit]
 * - Distractor patterns: [Intercept (A), wrong values (C,D)]
 * - Constraints: [Linear model with negative slope]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Line graph with marked point]
 */