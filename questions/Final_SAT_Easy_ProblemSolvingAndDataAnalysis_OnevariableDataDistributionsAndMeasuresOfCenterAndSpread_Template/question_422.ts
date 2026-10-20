import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 422
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [temps: 78-85 range]
 * - Difficulty factors: [Identifying which stat equals/doesn't equal target]
 * - Distractor patterns: [Median, Mean, Mode all same, Range different]
 * - Constraints: [Range is different from others]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_422 = {
  metadata: {
    id: "422",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate temperatures where mode, median, mean are equal but range is different
    // Three days at the base temperature and two days k degrees below and
    // above it, in a random order, so the mean, median, and mode all equal
    // the base temperature and the range is 2k. The old data were always
    // base, base - 1, base, base, base + 1 in that order.
    const baseTemp = getRandomInt(78, 83);
    const k = getRandomInt(1, 3);
    const temps = shuffle([baseTemp, baseTemp - k, baseTemp, baseTemp, baseTemp + k]);

    const tableCode = `
      <table>
        <tr><th>Day</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
        <tr><td>Temp (°F)</td><td>${temps[0]}</td><td>${temps[1]}</td><td>${temps[2]}</td><td>${temps[3]}</td><td>${temps[4]}</td></tr>
      </table>
    `;

    const sorted = [...temps].sort((a, b) => a - b);
    const sum = temps.reduce((a, b) => a + b, 0);
    const optionsData = [
      { text: "Median", isCorrect: false, reason: `listed in order, the temperatures are ${sorted.join(', ')}, so the median is the middle value, ${baseTemp}°F` },
      { text: "Mean", isCorrect: false, reason: `the mean is $\\frac{${sum}}{5} = ${baseTemp}$, or ${baseTemp}°F` },
      { text: "Mode", isCorrect: false, reason: `${baseTemp}°F occurs 3 times, more often than any other temperature, so it is the mode` },
      { text: "Range", isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table shows the high temperature, in degrees Fahrenheit (°F), in a city on each of 5 days. Over this 5-day period, which of the following is NOT equal to ${baseTemp}°F?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "Range",
      explanation: `Choice ${correctOption.letter} is correct. The range of a data set is the greatest value minus the least value. The range of these temperatures is $${baseTemp + k} - ${baseTemp - k} = ${2 * k}$, or ${2 * k}°F, which is not equal to ${baseTemp}°F. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
