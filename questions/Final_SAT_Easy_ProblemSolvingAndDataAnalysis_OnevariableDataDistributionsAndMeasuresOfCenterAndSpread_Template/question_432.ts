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
    // Re-roll the five low temperatures until the four answer-choice values
    // are pairwise distinct. Dividing an integer sum by 5 always terminates at
    // one decimal place (tenths in {.0,.2,.4,.6,.8}), so .toFixed(1) is exact
    // with no float artifact. We also require the mean to be non-integer so the
    // "rounded to the nearest whole degree" distractor is genuinely different.
    let lowTemps: number[] = [];
    let highTemps: number[] = [];
    let sumLow = 0;
    let meanLow = 0;
    let roundedMean = 0;
    let tries = 0;
    do {
      lowTemps = [getRandomInt(35, 50), getRandomInt(30, 45), getRandomInt(35, 50), getRandomInt(45, 60), getRandomInt(55, 70)];
      highTemps = lowTemps.map(l => l + getRandomInt(10, 25));
      sumLow = lowTemps.reduce((a, b) => a + b, 0);
      meanLow = sumLow / 5;
      roundedMean = Math.round(meanLow);
    } while (
      (sumLow % 5 === 0 ||
        new Set([
          meanLow.toFixed(1),
          roundedMean.toFixed(1),
          (meanLow + 10).toFixed(1),
          (meanLow - 5).toFixed(1),
        ]).size < 4) &&
      tries++ < 50
    );

    const tableCode = `
      <table>
        <tr><th>Day</th><th>High temp</th><th>Low temp</th></tr>
        ${["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => `<tr><td>${d}</td><td>${highTemps[i]}</td><td>${lowTemps[i]}</td></tr>`).join('')}
      </table>
    `;

    const optionsData = [
      { text: meanLow.toFixed(1), isCorrect: true },
      { text: roundedMean.toFixed(1), isCorrect: false },
      { text: (meanLow + 10).toFixed(1), isCorrect: false },
      { text: (meanLow - 5).toFixed(1), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The table below shows the high and low temperatures in a city during a five-day period. What was the mean low temperature, in degrees, during the five-day period?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: meanLow.toFixed(1),
      explanation: `Choice ${correctOption.letter} is correct. The sum of the five low temperatures is ${sumLow}. Dividing by 5 days gives a mean of ${sumLow} ÷ 5 = ${meanLow.toFixed(1)} degrees.`
    };
  }
};
