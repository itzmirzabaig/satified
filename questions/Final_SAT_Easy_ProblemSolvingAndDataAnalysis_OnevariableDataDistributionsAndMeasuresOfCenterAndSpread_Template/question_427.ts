import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 427
 *
 * ORIGINAL ANALYSIS: [Calculating range from table - wheels per production period]
 * - Number ranges: [wheels per period: 15-35, 11 periods, Easy difficulty]
 * - Difficulty factors: [Identifying range (max - min) from a data table]
 * - Constraints: [Easy - small integer values, range is a whole number between 3-10]
 * - Question type: [Table → Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_427 = {
  metadata: {
    id: "427",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate 11 wheel counts with a clear range
    const minWheels = getRandomInt(15, 25);
    const rangeVal = getRandomInt(4, 9);
    const maxWheels = minWheels + rangeVal;
    
    // Generate 11 values between min and max, ensuring min and max appear
    let wheels: number[];
    do {
      wheels = [minWheels, maxWheels];
      for (let i = 0; i < 9; i++) {
        wheels.push(getRandomInt(minWheels, maxWheels));
      }
      const m = [...wheels].sort((a, b) => a - b)[5];
      if (m !== minWheels && m !== maxWheels) break;
    } while (true);
    // Shuffle the order for the table
    for (let i = wheels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wheels[i], wheels[j]] = [wheels[j], wheels[i]];
    }

    const range = Math.max(...wheels) - Math.min(...wheels);
    const sorted = [...wheels].sort((a, b) => a - b);
    const median = sorted[5];

    const tableCode = `
      <table>
        <tr><th>Hour</th><th>Number of wheels</th></tr>
        ${wheels.map((w, i) => `<tr><td>${i + 1}</td><td>${w}</td></tr>`).join('')}
      </table>
    `;

    // Wrong choices are other values a student might report: the greatest
    // value, the least value, and the median. They used to be the range plus
    // 1.5, minus 1.5, and minus 1, all shown with a needless ".0". The
    // generate loop keeps the median apart from the least and greatest values.
    const optionsData = [
      { text: `${range}`, isCorrect: true, reason: '' },
      { text: `${maxWheels}`, isCorrect: false, reason: `${maxWheels} is the greatest number of wheels made in an hour; the least number, ${minWheels}, must be subtracted from it` },
      { text: `${minWheels}`, isCorrect: false, reason: `${minWheels} is the least number of wheels made in an hour, not the range` },
      { text: `${median}`, isCorrect: false, reason: `${median} is the median number of wheels, the middle value when the 11 values are listed in order, not the range` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "A machine makes wheels for toy cars. The table shows the number of wheels the machine made in each of 11 one-hour periods. What is the range of the number of wheels made for the 11 one-hour periods?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${range}`,
      explanation: `Choice ${correctOption.letter} is correct. The range of a data set is the greatest value minus the least value. The greatest number of wheels made in an hour is ${maxWheels} and the least is ${minWheels}, so the range is $${maxWheels} - ${minWheels} = ${range}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};

