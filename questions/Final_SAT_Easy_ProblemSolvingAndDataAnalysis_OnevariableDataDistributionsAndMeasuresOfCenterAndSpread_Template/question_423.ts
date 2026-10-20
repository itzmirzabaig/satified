import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 423
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values: 60s-80s range, means around 74]
 * - Difficulty factors: [Calculating mean, solving for missing value]
 * - Distractor patterns: [77=close to mean, 85=highest in set B, 95=too high]
 * - Constraints: [Both means must be equal, x must be realistic]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_423 = {
  metadata: {
    id: "423",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const meanTarget = getRandomInt(70, 78);
    const sumTarget = meanTarget * 5;

    const a2 = getRandomInt(meanTarget - 3, meanTarget + 1);
    const a3 = a2;
    const a4 = getRandomInt(meanTarget, meanTarget + 4);
    const a5 = a4;
    const a1 = sumTarget - (a2 + a3 + a4 + a5);

    // Redraw when x would equal the mean, since the mean is a wrong choice.
    let b1 = 0, b2 = 0, b3 = 0, b4 = 0, sumB4 = 0, xValue = meanTarget;
    while (xValue === meanTarget) {
      b1 = getRandomInt(meanTarget - 15, meanTarget - 8);
      b2 = getRandomInt(meanTarget - 12, meanTarget - 5);
      b3 = getRandomInt(meanTarget - 2, meanTarget + 2);
      b4 = getRandomInt(meanTarget + 8, meanTarget + 15);
      sumB4 = b1 + b2 + b3 + b4;
      xValue = sumTarget - sumB4;
    }

    const tableCode = `
      <table>
        <tr><th>Set</th><th>Values</th></tr>
        <tr><td>Data set A</td><td>${a1}, ${a2}, ${a3}, ${a4}, ${a5}</td></tr>
        <tr><td>Data set B</td><td>${b1}, ${b2}, ${b3}, ${b4}, x</td></tr>
      </table>
    `;

    // The wrong choices are quantities from the solution that a student might
    // stop at; they used to be the answer minus 9, plus 9, and plus 18. The
    // mean (70 to 78) differs from x by the loop above, and the two sums
    // (over 250) are far from x and from each other.
    const optionsData = [
      { text: meanTarget.toString(), isCorrect: false, reason: `${meanTarget} is the mean of each data set, not the value of $x$` },
      { text: sumTarget.toString(), isCorrect: false, reason: `${sumTarget} is the sum of the values in data set B, including $x$, not the value of $x$` },
      { text: xValue.toString(), isCorrect: true, reason: '' },
      { text: sumB4.toString(), isCorrect: false, reason: `${sumB4} is the sum of the four known values in data set B; it must be subtracted from ${sumTarget} to find $x$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "The table shows two data sets, A and B, each containing 5 numbers. If the mean of data set A is equal to the mean of data set B, what is the value of x?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: xValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The mean of data set A is $\\frac{${a1} + ${a2} + ${a3} + ${a4} + ${a5}}{5} = \\frac{${sumTarget}}{5} = ${meanTarget}$. For data set B to have the same mean, the sum of its 5 values must also be ${sumTarget}. So $${b1} + ${b2} + ${b3} + ${b4} + x = ${sumTarget}$, or $${sumB4} + x = ${sumTarget}$, which gives $x = ${xValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
