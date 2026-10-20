import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 415
 *
 * ORIGINAL ANALYSIS: [Comparing means and medians from table - two schools over 5 years]
 * - Number ranges: [Foothill decreasing: 70-95, Valley increasing: 55-75]
 * - Difficulty factors: [Comparing mean and median between two data sets from a table]
 * - Constraints: [Easy - Foothill always decreasing, Valley always increasing, Foothill > Valley throughout]
 * - Question type: [Table → Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_415 = {
  metadata: {
    id: "415",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The old data were two arithmetic sequences, so each mean equaled its
    // median and "I and II" was correct on every draw. Now a target outcome is
    // chosen at random and yearly counts are redrawn until they produce it:
    // statement I compares the means and statement II the medians.
    const target = getRandomElement(['both', 'I', 'II', 'neither'] as const);
    const median5 = (v: number[]) => [...v].sort((a, b) => a - b)[2];
    const sum5 = (v: number[]) => v.reduce((a, b) => a + b, 0);
    let fh: number[] = [], vly: number[] = [];
    let iTrue = false, iiTrue = false;
    do {
      fh = Array.from({ length: 5 }, () => getRandomInt(55, 100));
      vly = Array.from({ length: 5 }, () => getRandomInt(55, 100));
      const sf = sum5(fh), sv = sum5(vly), mf = median5(fh), mv = median5(vly);
      if (sf === sv || mf === mv) continue;
      iTrue = sf > sv;
      iiTrue = mf > mv;
    } while (
      (target === 'both' && !(iTrue && iiTrue)) ||
      (target === 'I' && !(iTrue && !iiTrue)) ||
      (target === 'II' && !(!iTrue && iiTrue)) ||
      (target === 'neither' && !(!iTrue && !iiTrue)) ||
      sum5(fh) === sum5(vly) || median5(fh) === median5(vly)
    );

    const fhMean = sum5(fh) / 5;   // a sum of whole numbers over 5: at most one decimal place
    const vlyMean = sum5(vly) / 5;
    const fhMedian = median5(fh);
    const vlyMedian = median5(vly);

    const tableCode = `
      <table>
        <tr><th>High School</th><th>2008</th><th>2009</th><th>2010</th><th>2011</th><th>2012</th></tr>
        <tr><td>Foothill</td><td>${fh.join('</td><td>')}</td></tr>
        <tr><td>Valley</td><td>${vly.join('</td><td>')}</td></tr>
      </table>
    `;

    const correctText = iTrue && iiTrue ? "I and II" : iTrue ? "I only" : iiTrue ? "II only" : "Neither I nor II";
    const iWord = iTrue ? 'true' : 'false';
    const iiWord = iiTrue ? 'true' : 'false';
    const optionsData = ["I only", "II only", "I and II", "Neither I nor II"].map(text => ({
      text,
      isCorrect: text === correctText,
      reason: text === correctText ? '' : `statement I is ${iWord} and statement II is ${iiWord}`
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const sorted = (v: number[]) => [...v].sort((a, b) => a - b).join(', ');

    return {
      questionText: "The table shows the number of interns at two high schools, Foothill and Valley, each year from 2008 to 2012. Which of the following statements is true?\nI. The mean number of interns per year at Foothill is greater than at Valley.\nII. The median number of interns per year at Foothill is greater than at Valley.",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The mean number of interns per year is $\\frac{${sum5(fh)}}{5} = ${fhMean}$ at Foothill and $\\frac{${sum5(vly)}}{5} = ${vlyMean}$ at Valley, so statement I is ${iWord}. Listed in order, the numbers are ${sorted(fh)} at Foothill and ${sorted(vly)} at Valley, so the medians are ${fhMedian} and ${vlyMedian}, and statement II is ${iiWord}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};

