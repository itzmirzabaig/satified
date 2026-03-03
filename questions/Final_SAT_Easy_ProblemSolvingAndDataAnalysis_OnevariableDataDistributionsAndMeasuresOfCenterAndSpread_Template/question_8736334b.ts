import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8736334b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values: 60s-80s range, means around 74]
 * - Difficulty factors: [Calculating mean, solving for missing value]
 * - Distractor patterns: [77=close to mean, 85=highest in set B, 95=too high]
 * - Constraints: [Both means must be equal, x must be realistic]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_8736334b = {
  metadata: {
    // id: "8736334b",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const meanTarget = getRandomInt(70, 78);
    const sumTarget = meanTarget * 5;

    const a2 = getRandomInt(meanTarget - 3, meanTarget + 1);
    const a3 = a2;
    const a4 = getRandomInt(meanTarget, meanTarget + 4);
    const a5 = a4;
    const a1 = sumTarget - (a2 + a3 + a4 + a5);

    const b1 = getRandomInt(meanTarget - 15, meanTarget - 8);
    const b2 = getRandomInt(meanTarget - 12, meanTarget - 5);
    const b3 = getRandomInt(meanTarget - 2, meanTarget + 2);
    const b4 = getRandomInt(meanTarget + 8, meanTarget + 15);
    const sumB4 = b1 + b2 + b3 + b4;
    const xValue = sumTarget - sumB4;

    const tableCode = `
      <table>
        <tr><th>Set</th><th>Values</th></tr>
        <tr><td>Data set A</td><td>${a1}, ${a2}, ${a3}, ${a4}, ${a5}</td></tr>
        <tr><td>Data set B</td><td>${b1}, ${b2}, ${b3}, ${b4}, x</td></tr>
      </table>
    `;

    const optionsData = [
      { text: (xValue - 9).toString(), isCorrect: false },
      { text: b4.toString(), isCorrect: false },
      { text: xValue.toString(), isCorrect: true },
      { text: (xValue + 9).toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "Data set A and data set B each contain 5 numbers. If the mean of data set A is equal to the mean of data set B, what is the value of x?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: xValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The mean of data set A is ${meanTarget}. Therefore, the sum of values in set B must also be ${meanTarget} × 5 = ${sumTarget}. ${b1} + ${b2} + ${b3} + ${b4} + x = ${sumTarget}, so ${sumB4} + x = ${sumTarget}, which means x = ${xValue}.`
    };
  }
};

/**
 * Question ID: c88e0663
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [10 students, 90 boxes]
 * - Difficulty factors: [Statistical reasoning, what can be calculated]
 * - Distractor patterns: [Median, Max, Min all require individual data]
 * - Constraints: [Only aggregate data provided]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [No figure]
 */