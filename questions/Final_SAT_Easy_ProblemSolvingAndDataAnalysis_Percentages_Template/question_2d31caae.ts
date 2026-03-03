import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2d31caae
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table data with specific values, 1-star calls: 16, total: 145]
 * - Difficulty factors: [Table reading, fraction to percentage, rounding]
 * - Distractor patterns: [3% = 16/500, 16% = raw number, 32% = miscalculation]
 * - Constraints: [Must round to nearest whole percent]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_2d31caae = {
  metadata: {
    // id: "2d31caae",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const employeeATotal = getRandomInt(140, 160);
    const star1Count = getRandomInt(14, 20);
    const percentage = (star1Count / employeeATotal) * 100;
    const roundedPercent = Math.round(percentage);
    const grandTotal = 500;

    const tableCode = `
<table>
  <thead>
    <tr>
      <th>Employee</th>
      <th>1 Star</th>
      <th>2 Stars</th>
      <th>3 Stars</th>
      <th>4 Stars</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Employee A</td><td>${star1Count}</td><td>49</td><td>72</td><td>8</td><td>${employeeATotal}</td></tr>
    <tr><td>Employee B</td><td>4</td><td>10</td><td>22</td><td>34</td><td>70</td></tr>
    <tr><td>Employee C</td><td>8</td><td>56</td><td>45</td><td>16</td><td>125</td></tr>
    <tr><td>Employee D</td><td>22</td><td>42</td><td>84</td><td>12</td><td>160</td></tr>
    <tr><td>Total</td><td>50</td><td>157</td><td>223</td><td>70</td><td>${grandTotal}</td></tr>
  </tbody>
</table>`;

    const distractorA = Math.round((star1Count / grandTotal) * 100);
    const distractorC = star1Count;
    const distractorD = Math.round(percentage * 2.9);

    const optionsData = [
      { text: `${distractorA}%`, isCorrect: false, reason: "likely results from dividing the number of 1-star calls for Employee A (${star1Count}) by the total number of calls for all employees (${grandTotal})" },
      { text: `${roundedPercent}%`, isCorrect: true },
      { text: `${distractorC}%`, isCorrect: false, reason: "is simply the raw number of 1-star calls, not the percentage" },
      { text: `${distractorD}%`, isCorrect: false, reason: "could be a miscalculation" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A supervisor at a call center reviewed $${grandTotal}$ calls taken by four employees and rated the employees' performance on each call on a scale from $1$ star to $4$ stars. The ratings for each employee are shown in the table above. According to the table, to the nearest whole percent, what percent of Employee A's calls received a rating of $1$ star?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${roundedPercent}%`,
      explanation: `Choice ${correctOption.letter} is correct. To find the percent of Employee A's calls that received a rating of $1$ star, divide the number of $1$-star calls by the total number of calls for Employee A: $\\frac{${star1Count}}{${employeeATotal}} \\approx ${percentage.toFixed(4)}$, which is approximately ${roundedPercent}% when rounded to the nearest whole percent. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1c2f50a6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [discount: 20%, original price: $50]
 * - Difficulty factors: [Discount calculation, two methods possible]
 * - Distractor patterns: [12 = random, 30 = 40% off, 36 = miscalc]
 * - Constraints: [Clean dollar amounts]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */