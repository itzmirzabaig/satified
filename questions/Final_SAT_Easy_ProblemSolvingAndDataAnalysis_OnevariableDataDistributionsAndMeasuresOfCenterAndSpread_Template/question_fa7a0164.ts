import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: fa7a0164
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [temps: 30s-80s range]
 * - Difficulty factors: [Calculating mean from table]
 * - Distractor patterns: [48.8=correct, 49=rounded, 59=high temp mean, 59.1=overall mean]
 * - Constraints: [5 days of data]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_fa7a0164 = {
  metadata: {
    // id: "fa7a0164",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const lowTemps = [getRandomInt(35, 50), getRandomInt(30, 45), getRandomInt(35, 50), getRandomInt(45, 60), getRandomInt(55, 70)];
    const highTemps = lowTemps.map(l => l + getRandomInt(10, 25));
    const sumLow = lowTemps.reduce((a, b) => a + b, 0);
    const meanLow = sumLow / 5;

    const tableCode = `
      <table>
        <tr><th>Day</th><th>High temp</th><th>Low temp</th></tr>
        ${["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => `<tr><td>${d}</td><td>${highTemps[i]}</td><td>${lowTemps[i]}</td></tr>`).join('')}
      </table>
    `;

    const optionsData = [
      { text: meanLow.toFixed(1), isCorrect: true },
      { text: Math.round(meanLow).toString(), isCorrect: false },
      { text: (meanLow + 10).toFixed(1), isCorrect: false },
      { text: (meanLow - 5).toFixed(1), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The table below shows the high and low temperatures in Houston, Texas, during a five-day period. What was the mean low temperature during the five-day period?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: meanLow.toFixed(1),
      explanation: `Choice ${correctOption.letter} is correct. The sum of the low temperatures is ${sumLow}. Dividing by 5 days gives a mean of ${meanLow.toFixed(1)}.`
    };
  }
};

/**
 * Question ID: 708590d7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 1-7 range]
 * - Difficulty factors: [Comparing means of two data sets]
 * - Distractor patterns: [A=mean 2, B=mean 4, C=AB]
 * - Constraints: [Set A has higher values than Set B]
 * - Question type: [Raw Data→Multiple Choice Text]
 * - Figure generation: [No figure]
 */