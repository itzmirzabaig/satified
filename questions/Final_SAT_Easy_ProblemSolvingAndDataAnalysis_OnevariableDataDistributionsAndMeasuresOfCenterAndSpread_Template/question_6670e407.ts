import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 6670e407
 *
 * ORIGINAL ANALYSIS: [Comparing means and medians from table - two schools over 5 years]
 * - Number ranges: [Foothill decreasing: 70-95, Valley increasing: 55-75]
 * - Difficulty factors: [Comparing mean and median between two data sets from a table]
 * - Constraints: [Easy - Foothill always decreasing, Valley always increasing, Foothill > Valley throughout]
 * - Question type: [Table → Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_6670e407 = {
  metadata: {
    // id: "6670e407",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Foothill: starts high, decreases over 5 years
    const fhStart = getRandomInt(82, 95);
    const fhDecrement = getRandomInt(2, 5);
    const fh = [fhStart, fhStart - fhDecrement, fhStart - 2*fhDecrement, fhStart - 3*fhDecrement, fhStart - 4*fhDecrement];

    // Valley: starts low, increases over 5 years
    const vlyStart = getRandomInt(55, 68);
    const vlyIncrement = getRandomInt(2, 5);
    const vly = [vlyStart, vlyStart + vlyIncrement, vlyStart + 2*vlyIncrement, vlyStart + 3*vlyIncrement, vlyStart + 4*vlyIncrement];

    // Compute means and medians (fh is sorted descending, vly ascending)
    const fhMean = (fh.reduce((a, b) => a + b, 0) / 5).toFixed(1);
    const vlyMean = (vly.reduce((a, b) => a + b, 0) / 5).toFixed(1);
    const fhMedian = fh[2]; // middle of 5 sorted values
    const vlyMedian = vly[2];

    const tableCode = `
      <table>
        <tr><th>High School</th><th>2008</th><th>2009</th><th>2010</th><th>2011</th><th>2012</th></tr>
        <tr><td>Foothill</td><td>${fh.join('</td><td>')}</td></tr>
        <tr><td>Valley</td><td>${vly.join('</td><td>')}</td></tr>
      </table>
    `;

    const optionsData = [
      { text: "I only", isCorrect: false },
      { text: "II only", isCorrect: false },
      { text: "I and II", isCorrect: true },
      { text: "Neither I nor II", isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "I. The mean number of interns at Foothill is greater than at Valley.\nII. The median number of interns at Foothill is greater than at Valley.\nWhich of the following statements is true?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "I and II",
      explanation: `Choice ${correctOption.letter} is correct. Foothill Mean: ${fhMean}, Valley Mean: ${vlyMean}. Foothill Median: ${fhMedian}, Valley Median: ${vlyMedian}. Both statements are true.`
    };
  }
};

