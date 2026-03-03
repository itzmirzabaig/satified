import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 869a32f1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [temps: 78-85 range]
 * - Difficulty factors: [Identifying which stat equals/doesn't equal target]
 * - Distractor patterns: [Median, Mean, Mode all same, Range different]
 * - Constraints: [Range is different from others]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_869a32f1 = {
  metadata: {
    // id: "869a32f1",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate temperatures where mode, median, mean are equal but range is different
    const baseTemp = getRandomInt(78, 83);
    const temps = [baseTemp, baseTemp - 1, baseTemp, baseTemp, baseTemp + 1];

    const tableCode = `
      <table>
        <tr><th>Day</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
        <tr><td>Temp (°F)</td><td>${temps[0]}</td><td>${temps[1]}</td><td>${temps[2]}</td><td>${temps[3]}</td><td>${temps[4]}</td></tr>
      </table>
    `;

    const optionsData = [
      { text: "Median", isCorrect: false },
      { text: "Mean", isCorrect: false },
      { text: "Mode", isCorrect: false },
      { text: "Range", isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Over this 5-day period, which of the following is NOT equal to ${baseTemp}°F?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "Range",
      explanation: `Choice ${correctOption.letter} is correct. Range is max-min (${Math.max(...temps)}-${Math.min(...temps)}=${Math.max(...temps)-Math.min(...temps)}). Mean, Median, and Mode are all ${baseTemp}.`
    };
  }
};

/**
 * Question ID: 6670e407
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [interns: 40-90 range]
 * - Difficulty factors: [Comparing means and medians from table]
 * - Distractor patterns: [I only, II only, I and II, Neither]
 * - Constraints: [Foothill decreasing, Valley increasing]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */
