import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 437
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 760, percentage: 10%]
 * - Difficulty factors: [10% calculation, real-world context]
 * - Distractor patterns: [66 = subtraction error, 84 = miscalculation, 86 = 76+10]
 * - Constraints: [Ends in 0 for clean 10% calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_437 = {
  metadata: {
    id: "437",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The harvest is a multiple of 10 in [500, 900] and the percent is 10, 20,
    // or 30, so the answer is a whole number. Wrong choices are real slips: a
    // tenth of the percent (decimal point moved one place too far), the
    // potatoes not saved, and the percent subtracted as a count. They used to
    // be the answer minus 10, plus 8, and plus 10.
    const roundedTotal = 10 * getRandomInt(50, 90);
    const pct = [10, 20, 30][getRandomInt(0, 2)];
    const result = (roundedTotal * pct) / 100;
    const tenth = result / 10;

    const optionsData = [
      { text: `${result}`, isCorrect: true, reason: '' },
      { text: `${tenth}`, isCorrect: false, reason: `${tenth} is ${pct / 10}% of ${roundedTotal}, not ${pct}%` },
      { text: `${roundedTotal - result}`, isCorrect: false, reason: `${roundedTotal - result} is the number of potatoes the gardener did not save, ${100 - pct}% of the harvest` },
      { text: `${roundedTotal - pct}`, isCorrect: false, reason: `${roundedTotal - pct} results from subtracting ${pct} potatoes from the harvest instead of finding ${pct}% of it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A gardener grows potatoes. This year, they harvested ${roundedTotal} potatoes and saved ${pct}% of them to plant next year. How many of the harvested potatoes did the gardener save to plant next year?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. The gardener saved ${pct}% of ${roundedTotal} potatoes, which is $\\frac{${pct}}{100} \\times ${roundedTotal} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
