import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 426
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [egg counts: 130s-150s]
 * - Difficulty factors: [Comparing means after adding outlier]
 * - Distractor patterns: [A=original>new, B=original < new]
 * - Constraints: [Added value must be smaller than all original values]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_426 = {
  metadata: {
    id: "426",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The original mean is a whole number so it can be compared directly.
    // The added nest is below every original value, above every original
    // value, or exactly the original mean, so all three true statements
    // occur. The old version always added a smaller value.
    let values: number[];
    let sum: number;
    do {
      values = shuffle([135, 138, 141, 144, 147, 150, 153, 156].map(v => v + getRandomInt(-2, 2))).slice(0, 5);
      sum = values.reduce((a, b) => a + b, 0);
    } while (sum % 5 !== 0 || new Set(values).size < 5);
    const mean = sum / 5;
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const kind = getRandomInt(0, 2); // 0 smaller, 1 larger, 2 equal to mean
    const newValue = kind === 0 ? minVal - getRandomInt(5, 15) : kind === 1 ? maxVal + getRandomInt(5, 15) : mean;
    const newMean = (sum + newValue) / 6;
    const newMeanStr = Number.isInteger(newMean) ? `${newMean}` : `\\frac{${sum + newValue}}{6} \\approx ${newMean.toFixed(2)}`;

    const tableCode = `
      <table>
        <tr><th>Nest</th><th>Number of Eggs</th></tr>
        ${values.map((v, i) => `<tr><td>${String.fromCharCode(65 + i)}</td><td>${v}</td></tr>`).join('')}
      </table>
    `;

    const relation = kind === 0 ? 'less than' : kind === 1 ? 'greater than' : 'equal to';
    const truth = kind === 0 ? 'greater' : kind === 1 ? 'less' : 'equal';
    const actual = kind === 0 ? 'the mean of the original data set is greater than the mean of the new data set'
      : kind === 1 ? 'the mean of the original data set is less than the mean of the new data set'
      : 'the means of both data sets are equal';
    const optionsData = [
      { text: "The mean of the original data set is greater than the mean of the new data set.", isCorrect: truth === 'greater', reason: actual },
      { text: "The mean of the original data set is less than the mean of the new data set.", isCorrect: truth === 'less', reason: actual },
      { text: "The means of both data sets are equal.", isCorrect: truth === 'equal', reason: actual },
      { text: "There is not enough information to compare the means.", isCorrect: false, reason: 'every value in both data sets is known, so both means can be found and compared' }
    ].map(o => ({ ...o, reason: o.isCorrect ? '' : o.reason }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const effect = kind === 0 ? 'pulls the mean down' : kind === 1 ? 'pulls the mean up' : 'leaves the mean unchanged';

    return {
      questionText: `Five sea turtles each have a nest. The table shows an original data set of the number of eggs that each turtle laid in its nest. If a sixth nest is added with ${newValue} eggs, which of the following statements is true?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The mean of the original data set is $\\frac{${values.join(' + ')}}{5} = \\frac{${sum}}{5} = ${mean}$. Since the added value, ${newValue}, is ${relation} this mean, adding it ${effect}. The mean of the new data set is $\\frac{${sum} + ${newValue}}{6} = ${newMeanStr}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
