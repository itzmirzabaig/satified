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
    // and 30% of total is always an integer as well.
    const percentage = getRandomInt(2, 15);
    const total = getRandomInt(2, 9) * 100;
    const result = (percentage * total) / 100; // integer count of birch trees

    // Distractors mirror common errors and are all distinct from the answer and
    // from each other for every draw in these ranges:
    //   A = percentage      (uses the percent number as a raw count)
    //   C = 30% of total    (applies the wrong percentage)
    //   D = total - percentage (subtracts instead of taking a percentage)
    const distractorA = percentage;
    const distractorC = (30 * total) / 100;
    const distractorD = total - percentage;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: `uses the percent number (${percentage}) as the count and ignores the total of ${total} trees` },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: `is 30% of ${total}, not ${percentage}% of ${total}` },
      { text: `${distractorD}`, isCorrect: false, reason: `subtracts ${percentage} from ${total}, which does not find a percentage` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `There are $${total}$ trees in a park. Of these trees, ${percentage}% are birch trees. How many birch trees are in the park?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. To find the number of birch trees, calculate ${percentage}% of ${total}: $\\frac{${percentage}}{100} \\times ${total} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
