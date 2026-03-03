import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f890dc20
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: small integers 2-11]
 * - Difficulty factors: [Finding median of ordered data set]
 * - Distractor patterns: [2=mode, 4=another common value, 9=average of min/max]
 * - Constraints: [Must have odd number of values for single median]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table with randomized values]
 */

export const generator_f890dc20 = {
  metadata: {
    // id: "f890dc20",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const baseValue = getRandomInt(2, 4);
    const middleValue = baseValue + getRandomInt(1, 2);
    const upperValue = middleValue + getRandomInt(1, 2);
    const outlier = upperValue + getRandomInt(5, 8);

    const dataValues = [
      baseValue,
      baseValue,
      baseValue,
      middleValue,
      upperValue,
      upperValue,
      outlier
    ];

    const median = dataValues;
    const mode = baseValue;

    const tableCode = `
      <table>
        <tr><th>Data Values</th></tr>
        ${dataValues.map(val => `<tr><td>${val}</td></tr>`).join('')}
      </table>
    `;

    const optionsData = [
      { text: mode.toString(), isCorrect: false },
      { text: median.toString(), isCorrect: true },
      { text: upperValue.toString(), isCorrect: false },
      { text: Math.round((baseValue + outlier) / 2).toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "What is the median of the seven data values shown?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: median.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The median of a data set is the middle value when the data values are ordered from least to greatest. Since there are seven data values, the median is the fourth value in the ordered list. The data values given are already ordered: ${dataValues.join(', ')}. The fourth value is ${median}.`
    };
  }
};

/**
 * Question ID: 29fa7970
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-axis: 0-23, y-axis: frequency 0-7]
 * - Difficulty factors: [Reading bar graph, interpreting frequency]
 * - Distractor patterns: [0=confusing with no bars, 1=minimum non-zero, 4=rough estimate]
 * - Constraints: [Must have bar at 0 kWh with visible height]
 * - Question type: [Bar Graph→Multiple Choice Text]
 * - Figure generation: [Mafs bar chart with randomized frequencies]
 */