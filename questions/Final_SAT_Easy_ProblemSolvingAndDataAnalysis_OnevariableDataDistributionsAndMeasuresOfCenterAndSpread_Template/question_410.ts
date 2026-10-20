import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 410
 * FIXED:
 * - Removed hardcoded values.
 * - Randomly selects countries and assigns random areas with realistic variance.
 * - dynamic HTML table with "currentColor" styling for theme adaptability.
 * - Dynamic distractor generation based on the new random values.
 */

export const generator_410 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Dynamic Data Generation
    
    // The old version gave real countries random areas (Monaco "0.57",
    // Liechtenstein "73"), which misstated real facts. These are the
    // countries' approximate land areas in square kilometers; five are chosen
    // at random. The draw is redone until the median and the mean round to
    // different whole numbers.
    const countries = [
      { name: "Monaco", area: 2.02 },
      { name: "Nauru", area: 21 },
      { name: "Tuvalu", area: 26 },
      { name: "San Marino", area: 61 },
      { name: "Liechtenstein", area: 160 },
      { name: "Marshall Islands", area: 181 },
      { name: "Saint Kitts and Nevis", area: 261 },
      { name: "Maldives", area: 298 },
      { name: "Malta", area: 316 },
      { name: "Grenada", area: 344 }
    ];
    let tableData = countries.slice(0, 5);
    let sum = 0, mean = 0, roundedMean = 0, roundedMedian = 0;
    do {
      tableData = shuffle(countries).slice(0, 5);
      sum = Math.round(tableData.reduce((acc, curr) => acc + curr.area, 0) * 100) / 100;
      mean = sum / tableData.length;
      roundedMean = Math.round(mean);
      roundedMedian = Math.round([...tableData].map(d => d.area).sort((a, b) => a - b)[2]);
    } while (roundedMedian === roundedMean);

    // 2. Calculations
    const count = tableData.length;
    const sortedAreas = [...tableData].map(d => d.area).sort((a, b) => a - b);
    const maxVal = Math.round(sortedAreas[4]);
    const roundedSum = Math.round(sum);

    // 3. Generate HTML Table
    // Using inline styles with currentColor to ensure visibility in dark/light mode
    const tableCode = `
      <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 14px; margin-top: 10px; margin-bottom: 10px;">
        <thead>
          <tr>
            <th style="border: 1px solid currentColor; padding: 8px; text-align: left; background-color: rgba(127, 127, 127, 0.1);">Country</th>
            <th style="border: 1px solid currentColor; padding: 8px; text-align: left; background-color: rgba(127, 127, 127, 0.1);">Area (sq km)</th>
          </tr>
        </thead>
        <tbody>
          ${tableData.map(row => `
            <tr>
              <td style="border: 1px solid currentColor; padding: 8px;">${row.name}</td>
              <td style="border: 1px solid currentColor; padding: 8px;">${row.area}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // 4. Generate Options. The mean, median, greatest value, and sum are
    // distinct: the loop above separates the mean and the median, the sum is
    // more than 4 times the mean, and the greatest value is above the mean.
    // (The old version filled any gap with the mean plus a random offset.)
    const optionsData = [
      { text: roundedMean.toString(), isCorrect: true, reason: '' },
      { text: roundedMedian.toString(), isCorrect: false, reason: `${roundedMedian} is the median land area, the middle value when the areas are listed in order, not the mean` },
      { text: maxVal.toString(), isCorrect: false, reason: `${maxVal} is the greatest land area in the table, not the mean` },
      { text: roundedSum.toLocaleString('en-US'), isCorrect: false, reason: `${roundedSum.toLocaleString('en-US')} is the sum of the land areas, to the nearest square kilometer; the sum must be divided by ${count}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table shown lists the approximate land areas, in square kilometers, of ${count} countries. What is the mean land area of these countries, to the nearest square kilometer?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: roundedMean.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The mean of a data set is the sum of the values divided by the number of values. The sum of the land areas is $${tableData.map(d => d.area).join(' + ')} = ${sum.toLocaleString('en-US')}$, so the mean is $\\frac{${sum.toLocaleString('en-US')}}{${count}} ${Math.abs(mean * 100 - Math.round(mean * 100)) < 1e-9 ? '=' : '\\approx'} ${parseFloat(mean.toFixed(2))}$. To the nearest square kilometer, the mean land area is ${roundedMean}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};