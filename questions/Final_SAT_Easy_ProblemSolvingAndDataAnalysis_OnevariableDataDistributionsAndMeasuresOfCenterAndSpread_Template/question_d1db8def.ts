import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d1db8def
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [frequencies: 20-80]
 * - Difficulty factors: [Adding frequencies from table]
 * - Distractor patterns: [single category, sum of wrong pair]
 * - Constraints: [Two specific categories to sum]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_d1db8def = {
  metadata: {
    // id: "d1db8def",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate random frequencies
    const never = getRandomInt(20, 40);
    const almostNever = getRandomInt(40, 60);
    const sometimes = getRandomInt(60, 80);
    const often = getRandomInt(30, 50);
    const total = never + almostNever + sometimes + often;
    const targetSum = never + almostNever;

    const tableCode = `
      <table>
        <tr><th>Response</th><th>Frequency</th></tr>
        <tr><td>Never</td><td>${never}</td></tr>
        <tr><td>Almost never</td><td>${almostNever}</td></tr>
        <tr><td>Sometimes</td><td>${sometimes}</td></tr>
        <tr><td>Often</td><td>${often}</td></tr>
        <tr><td>Total</td><td>${total}</td></tr>
      </table>
    `;

    const optionsData = [
      { text: never.toString(), isCorrect: false },
      { text: almostNever.toString(), isCorrect: false },
      { text: targetSum.toString(), isCorrect: true },
      { text: (sometimes + often).toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "How many people responded either 'never' or 'almost never'?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: targetSum.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Summing the two frequencies: ${never} + ${almostNever} = ${targetSum}.`
    };
  }
};

/**
 * Question ID: 55cfaf22
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Set X: 4 values, Set Y: 5 values with one outlier]
 * - Difficulty factors: [Comparing means, outlier effect]
 * - Distractor patterns: [A=X>Y, B=X < Y]
 * - Constraints: [Outlier must pull mean up]
 * - Question type: [Raw Data→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
