import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 438
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 250, percentage: 6%]
 * - Difficulty factors: [Small percentage of total, decimal multiplication]
 * - Distractor patterns: [6 = raw percentage, 75 = 30% error, 244 = 250-6]
 * - Constraints: [Result must be integer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_438 = {
  metadata: {
    id: "438",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // total is a multiple of 100 in [200, 900] and percentage is 2..15, so
    // percentage% of total = percentage * (total / 100) is ALWAYS an integer,
    // so the count of birch trees is a whole number.
    const percentage = getRandomInt(2, 15);
    const total = getRandomInt(2, 9) * 100;
    const result = (percentage * total) / 100; // integer count of birch trees

    // Wrong choices: the percent used as a count, the trees that are not
    // birch, and the percent subtracted from the total. The second used to be
    // 30% of the total, a percent that appears nowhere in the question.
    const optionsData = [
      { text: `${result}`, isCorrect: true, reason: '' },
      { text: `${percentage}`, isCorrect: false, reason: `${percentage} is the percent of the trees that are birch trees, not the number of birch trees` },
      { text: `${total - result}`, isCorrect: false, reason: `${total - result} is the number of trees that are not birch trees, ${100 - percentage}% of ${total}` },
      { text: `${total - percentage}`, isCorrect: false, reason: `${total - percentage} results from subtracting ${percentage} from ${total} instead of finding ${percentage}% of ${total}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `There are ${total} trees in a park. Of these trees, ${percentage}% are birch trees. How many birch trees are in the park?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. The number of birch trees is ${percentage}% of ${total}, which is $\\frac{${percentage}}{100} \\times ${total} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
