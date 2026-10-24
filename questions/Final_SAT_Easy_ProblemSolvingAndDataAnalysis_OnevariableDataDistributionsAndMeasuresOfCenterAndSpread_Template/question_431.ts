import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 431
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: small integers 2-11]
 * - Difficulty factors: [Finding median of ordered data set]
 * - Distractor patterns: [2=mode, 4=another common value, 9=average of min/max]
 * - Constraints: [Must have odd number of values for single median]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table with randomized values]
 */

export const generator_431 = {
  metadata: {
    id: "431",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Wrong choices are the mode, the mean, and the midrange (the average of
    // the least and greatest values). Redraw until the mean and midrange are
    // whole numbers and all four choices differ. The old fourth choice was a
    // rounded midrange and the third was an unexplained data value.
    let baseValue = 0, middleValue = 0, upperValue = 0, outlier = 0, sum = 0;
    do {
      baseValue = getRandomInt(2, 6);
      middleValue = baseValue + getRandomInt(1, 3);
      upperValue = middleValue + getRandomInt(1, 3);
      outlier = upperValue + getRandomInt(4, 12);
      sum = 3 * baseValue + middleValue + 2 * upperValue + outlier;
    } while (
      sum % 7 !== 0 || (baseValue + outlier) % 2 !== 0 ||
      new Set([baseValue, middleValue, sum / 7, (baseValue + outlier) / 2]).size < 4
    );

    const dataValues = [
      baseValue,
      baseValue,
      baseValue,
      middleValue,
      upperValue,
      upperValue,
      outlier
    ];

    const median = dataValues[3];
    const mode = baseValue;
    const mean = sum / 7;
    const midrange = (baseValue + outlier) / 2;

    const tableCode = `
      <table>
        <tr><th>Data values</th></tr>
        ${dataValues.map(val => `<tr><td>${val}</td></tr>`).join('')}
      </table>
    `;

    const optionsData = [
      { text: `${median}`, isCorrect: true, reason: '' },
      { text: `${mode}`, isCorrect: false, reason: `${mode} is the mode, the value that occurs most often, not the middle value` },
      { text: `${mean}`, isCorrect: false, reason: `${mean} is the mean of the data values, $\\frac{${sum}}{7} = ${mean}$, not the middle value` },
      { text: `${midrange}`, isCorrect: false, reason: `${midrange} is halfway between the least value, ${baseValue}, and the greatest value, ${outlier}; the median is the middle value of the ordered list` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "What is the median of the seven data values shown?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${median}`,
      explanation: `Choice ${correctOption.letter} is correct. The median of a data set is the middle value when the data values are ordered from least to greatest. Since there are seven data values, the median is the fourth value in the ordered list. The data values given are already ordered: ${dataValues.join(', ')}. The fourth value is ${median}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
