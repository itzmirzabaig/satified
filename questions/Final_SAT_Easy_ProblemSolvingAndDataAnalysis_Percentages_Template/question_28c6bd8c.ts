import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 28c6bd8c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 1,200, percentage1: 63%, percentage2: 13%]
 * - Difficulty factors: [Table reading, summing percentages, applying to total]
 * - Distractor patterns: [865 = doctor+magazines (wrong pair), 887 = ~74%, 926 = ~77%]
 * - Constraints: [Must use table data]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_28c6bd8c = {
  metadata: {
    // id: "28c6bd8c",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const totalSurveyed = getRandomInt(800, 1500);
    const mainSourcePercent = getRandomInt(55, 70);
    const secondarySourcePercent = getRandomInt(10, 20);
    const combinedPercent = mainSourcePercent + secondarySourcePercent;
    const result = Math.round((combinedPercent / 100) * totalSurveyed);

    const tableCode = `
<table>
  <thead>
    <tr>
      <th>Source</th>
      <th>Percent of those surveyed</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Doctor</td><td>${mainSourcePercent}%</td></tr>
    <tr><td>Internet</td><td>${secondarySourcePercent}%</td></tr>
    <tr><td>Magazines/brochures</td><td>9%</td></tr>
    <tr><td>Pharmacy</td><td>6%</td></tr>
    <tr><td>Television</td><td>2%</td></tr>
    <tr><td>Other/none of the above</td><td>7%</td></tr>
  </tbody>
</table>`;

    const wrongCombo1 = Math.round(((mainSourcePercent + 9) / 100) * totalSurveyed);
    const wrongCombo2 = Math.round(((combinedPercent - 2) / 100) * totalSurveyed);
    const wrongCombo3 = Math.round(((combinedPercent + 1) / 100) * totalSurveyed);

    const optionsData = [
      { text: `${wrongCombo1}`, isCorrect: false, reason: "is about ${mainSourcePercent + 9}% (the percent from a doctor or magazines/brochures), not ${combinedPercent}%, of ${totalSurveyed}" },
      { text: `${wrongCombo2}`, isCorrect: false, reason: "is about ${combinedPercent - 2}%, not ${combinedPercent}%, of ${totalSurveyed}" },
      { text: `${result}`, isCorrect: true },
      { text: `${wrongCombo3}`, isCorrect: false, reason: "is about ${combinedPercent + 1}%, not ${combinedPercent}%, of ${totalSurveyed}" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table above shows a summary of ${totalSurveyed} responses to a survey question. Based on the table, how many of those surveyed get most of their medical information from either a doctor or the Internet?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. According to the table, ${mainSourcePercent}% of survey respondents get most of their medical information from a doctor and ${secondarySourcePercent}% get most of their medical information from the Internet. Therefore, ${combinedPercent}% of the ${totalSurveyed} survey respondents get their information from either a doctor or the Internet, and ${combinedPercent}% of ${totalSurveyed} is ${result}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 3a6ed720
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 900,000 (6-digit), part: 828,000 (6-digit), percentage: 92%]
 * - Difficulty factors: [Large number percentage, fraction simplification]
 * - Distractor patterns: [8% = complement, 36% and 72% = calculation errors]
 * - Constraints: [Result must be clean percentage]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */