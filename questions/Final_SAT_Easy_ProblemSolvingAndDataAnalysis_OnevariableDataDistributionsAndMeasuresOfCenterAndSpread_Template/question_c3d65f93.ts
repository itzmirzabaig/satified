import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c3d65f93
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [egg counts: 130s-150s]
 * - Difficulty factors: [Comparing means after adding outlier]
 * - Distractor patterns: [A=original>new, B=original < new]
 * - Constraints: [Added value must be smaller than all original values]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_c3d65f93 = {
  metadata: {
    // id: "c3d65f93",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minVal = getRandomInt(135, 140);
    const values = [
      minVal + getRandomInt(5, 10),
      minVal + getRandomInt(2, 5),
      minVal + getRandomInt(8, 15),
      minVal,
      minVal + getRandomInt(1, 3)
    ];
    const newValue = minVal - getRandomInt(5, 15);

    const tableCode = `
      <table>
        <tr><th>Nest</th><th>Number of Eggs</th></tr>
        ${values.map((v, i) => `<tr><td>${String.fromCharCode(65 + i)}</td><td>${v}</td></tr>`).join('')}
      </table>
    `;

    const optionsData = [
      { text: "The mean of the original data set is greater than the mean of the new data set.", isCorrect: true },
      { text: "The mean of the original data set is less than the mean of the new data set.", isCorrect: false },
      { text: "The means of both data sets are equal.", isCorrect: false },
      { text: "There is not enough information to compare the means.", isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Five sea turtles each have a nest. The table shows an original data set of the number of eggs that each turtle laid in its nest. If a sixth nest is added with ${newValue} eggs, which of the following statements is true?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Since the added value (${newValue}) is smaller than all values in the original set (minimum ${minVal}), the overall mean will decrease, meaning the original mean was greater.`
    };
  }
};

/**
 * Question ID: 35bec412
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 70s-90s range]
 * - Difficulty factors: [Finding median of 9 ordered values]
 * - Constraints: [Odd count, already ordered]
 * - Question type: [Raw Data→Fill in Blank]
 * - Figure generation: [No figure]
 */