import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 432
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [temps: 30s-80s range]
 * - Difficulty factors: [Calculating mean from table]
 * - Distractor patterns: [48.8=correct, 49=rounded, 59=high temp mean, 59.1=overall mean]
 * - Constraints: [5 days of data]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_432 = {
  metadata: {
    id: "432",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Wrong choices are real slips: the mean high temperature, the mean of
    // all ten temperatures, and the median low temperature. They used to be
    // the mean rounded, plus 10, and minus 5. Sums divided by 5 or 10 end in
    // at most one decimal place, so toFixed(1) is exact. Redraw until the
    // mean low is not a whole number and the four choices differ.
    let lowTemps: number[] = [];
    let highTemps: number[] = [];
    let sumLow = 0, sumHigh = 0, medianLow = 0;
    do {
      lowTemps = [getRandomInt(35, 50), getRandomInt(30, 45), getRandomInt(35, 50), getRandomInt(45, 60), getRandomInt(55, 70)];
      highTemps = lowTemps.map(l => l + getRandomInt(10, 25));
      sumLow = lowTemps.reduce((a, b) => a + b, 0);
      sumHigh = highTemps.reduce((a, b) => a + b, 0);
      medianLow = [...lowTemps].sort((a, b) => a - b)[2];
    } while (
      sumLow % 5 === 0 ||
      new Set([(sumLow / 5).toFixed(1), (sumHigh / 5).toFixed(1), ((sumLow + sumHigh) / 10).toFixed(1), medianLow.toFixed(1)]).size < 4
    );
    const meanLow = (sumLow / 5).toFixed(1);
    const meanHigh = (sumHigh / 5).toFixed(1);
    const meanAll = ((sumLow + sumHigh) / 10).toFixed(1);

    const tableCode = `
      <table>
        <tr><th>Day</th><th>High temperature (°F)</th><th>Low temperature (°F)</th></tr>
        ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d, i) => `<tr><td>${d}</td><td>${highTemps[i]}</td><td>${lowTemps[i]}</td></tr>`).join('')}
      </table>
    `;

    const optionsData = [
      { text: meanLow, isCorrect: true, reason: '' },
      { text: meanHigh, isCorrect: false, reason: `${meanHigh} is the mean high temperature, $\\frac{${sumHigh}}{5} = ${meanHigh}$, not the mean low temperature` },
      { text: meanAll, isCorrect: false, reason: `${meanAll} is the mean of all ten temperatures in the table, both high and low` },
      { text: medianLow.toFixed(1), isCorrect: false, reason: `${medianLow} is the median low temperature, the middle value when the five low temperatures are listed in order, not the mean` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "The table shows the high and low temperatures, in degrees Fahrenheit (°F), in a city during a five-day period. What was the mean low temperature, in °F, during the five-day period?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: meanLow,
      explanation: `Choice ${correctOption.letter} is correct. The low temperatures are ${lowTemps.join(', ')}, and their sum is $${lowTemps.join(' + ')} = ${sumLow}$. Dividing by the 5 days gives a mean low temperature of $\\frac{${sumLow}}{5} = ${meanLow}$, or ${meanLow}°F. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
